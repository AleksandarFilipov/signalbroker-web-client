<template>
  <div>
    <VCard class="marginToolbar">
      <VToolbar
        card
        color="transparent"
      >
        <VIcon>
          traffic
        </VIcon>
        <VToolbarTitle>
          Traffic Monitor
        </VToolbarTitle>
      </VToolbar>
      <VContainer
        fill-height
        fluid
        class="my-0 py-0"
      >
        <VLayout
          row
          wrap
        >
          <VSlider
            v-model.number="filterStrength"
            label="Filter strength"
            max="12"
            min="0"
            step="1"
            thumb-label
            class="mr-4"
            hide-actions
            hide-details
          />
          <VSlider
            v-model.number="dataHistory"
            hide-details
            hide-actions
            label="History"
            max="4000"
            min="100"
            step="100"
            thumb-label
          />
          <VSwitch
            v-model="charts"
            label="Show charts"
            class="pl-3"
            @change="childMessagesPerSecond = 30"
          />
        </VLayout>
      </VContainer>
      <VCardText class="overflowY py-3">
        <div
          v-if="selectedSignals.length === 0"
          class="title font-weight-light grey--text pa-3 text-xs-center my-4"
        >
          You have no selected signals at this time<br>
          <VBtn
            to="/selection"
            flat
            depressed
          >
            <VIcon left>
              nature
            </VIcon> Selection Tree
          </VBtn>
        </div>
        <span
          v-for="(selection, i) in selectedSignals"
          :key="i"
        >
          <VSpacer
            v-if="selection.isParent"
            class="my-4"
          />
          <VChip
            small
            :color="responseIncludes(selection.name, selection.namespace) ? 'success' : ''"
            close
            :selected="selection.highlight"
            :label="selection.isParent"
            class="transitionNone"
            @input="remove(i)"
            @click.stop="highlight(selection.name, i)"
          >
            {{ selection.name }}
          </VChip>
          <span
            v-if="selection.isParent"
            class="caption grey--text"
          > {{ selection.namespace }}</span>
          <VSpacer v-if="selection.isParent" />
        </span>
      </VCardText>
      <VDivider />
      <VCardActions>
        <VLayout
          row
          wrap
        >
          <div class="mx-1">
            <VTooltip bottom>
              <template v-slot:activator="{on}">
                <VBtn
                  flat
                  color="grey"
                  depressed
                  to="selection"
                  v-on="on"
                >
                  <VIcon>
                    nature
                  </VIcon>
                </VBtn>
              </template>
              <span>Selection tree</span>
            </VTooltip>
          </div>
          <VSpacer />
          <VBtn
            disabled
            flat
            class="monoSpace"
          >
            Messages/second: {{ messagesPerSecondCache | padNumber }}
          </VBtn>
          <VBtn
            v-if="!subscribed"
            :disabled="selectedSignals.length === 0"
            color="green"
            depressed
            @click="streamSetup"
          >
            Subscribe
          </VBtn>
          <VBtn
            v-else
            color="error"
            depressed
            @click="stopStream"
          >
            Unsubscribe
          </VBtn>
        </VLayout>
      </VCardActions>
    </VCard>
    <VContainer
      fluid
      grid-list-lg
      mt-1
      px-0
    >
      <VDataIterator
        hide-actions
        :items="signalDataList"
        content-class="layout row wrap"
        item-key="name"
        :pagination.sync="pagination"
      >
        <template v-slot:item="props">
          <SignalCardBuffered
            v-if="charts || props.item.highlight"
            :name="props.item.name"
            :data-records="props.item.dataRecords"
            :data-type="props.item.dataType"
            :name-space="props.item.nameSpace"
            :highlight="props.item.highlight"
            :data-history="dataHistory"
            :unique-filter-global="filterStrength"
            :raw-data="props.item.rawData"
            :is-parent="props.item.isParent"
          />
        </template>
      </VDataIterator>
    </VContainer>
    <VSnackbar
      v-model="snackbarDisplayed"
      bottom
      right
      :color="snackbarColor"
      :timeout="8000"
    >
      <VLayout>
        <VIcon left>
          {{ snackbarIcon }}
        </VIcon>
        {{ snackbarMessage }}
      </VLayout>
      <VBtn
        flat
        @click.native="value = false"
      >
        <VIcon>
          close
        </VIcon>
      </VBtn>
    </VSnackbar>
  </div>
</template>
<script>
  import './../grpc/dist/api.js'
  import SignalCardBuffered from "./../components/SignalCardBuffered.vue"
  export default {
    name: "Monitor",
    components: { SignalCardBuffered },
    filters: {
      padNumber (input) {
        const length = input.toString().length
        if (length === 1) {
          return "00" + input
        } else if (length === 2) {
          return "0" + input
        } else if (length === 0) {
          return "000"
        } else {
          return input
        }
      },
    },
    data: () => { return {
      pagination: {
        sortBy: 'name',
        descending: true,
      },
      snackbarDisplayed: false,
      chipValue: [],
      subscribed: false,
      request: '',
      search: null,
      caseSensitive: false,
      stream: null,
      charts: false,
      dataHistory: 0,
      snackbarMessage: 'Not connected',
      snackbarIcon: 'warning',
      snackbarColor: 'error',
      NetworkService: null,
      subsConfig: null,
      responseArray: [],
      signalDataList: [],
      signalDataListBuffer: [],
      firstRun: true,
      firstRunSubscribed: true,
      chipOnline: [],
      selected: false,
      filterStrength: 0,
      deltaTime: null,
      messagesPerSecond: 0,
      messagesPerSecondCache: 0,
      responseArrayBuffer: [],
      deltaTimeProcessBuffer: null,
      clientName: "SBWebClient" + Date.now(),
    } },
    computed: {
      childMessagesPerSecond: {
        get () {
          return this.$store.state.childMessagesPerSecond
        },
        set (value) {
          this.$store.commit('updateChildMessagesPerSecond', value)
        },
      },
      connectionStatus: {
        get () {
          return this.$store.state.connectionStatus
        },
        set (value) {
          this.$store.commit('updateConnectionStatus', value)
        },
      },
      brokerServerIp: {
        get () {
          return this.$store.state.brokerServerIp
        },
        set (value) {
          this.$store.commit('updateBrokerServerIp', value)
        },
      },
      selectedSignals: {
        get () {
          return this.$store.state.selectedSignals
        },
        set (value) {
          this.$store.commit('updateSelectedSignals', value)
        },
      },
    },
    watch: {
      subscribed () {
        if (this.firstRunSubscribed === true) {
          this.firstRunSubscribed = false
          setTimeout(() => {
            this.dataHistory = 500
          }, 100);
          setTimeout(() => {
            this.charts = true
          }, 100);
          setTimeout(() => {
            this.filterStrength = 2
          }, 2000);
        }
      },
      charts () {
        const cachedFilter = this.filterStrength
        this.filterStrength = 0
        const cachedHistory = this.dataHistory
        this.dataHistory = 0
        setTimeout(() => {
          this.filterStrength = cachedFilter
          this.dataHistory = cachedHistory
        }, 100);
      },
      dataHistory () {
        const filterValue = this.filterStrength * 5 + 10
        if (this.dataHistory < 5) {
          this.filterStrength = 0
        } else if (this.dataHistory < filterValue) {
          this.filterStrength = (this.dataHistory - 10) / 5
        }
      },
      filterStrength () {
        const filterValue = this.filterStrength * 5 + 10
        if (filterValue > this.dataHistory) {
          this.dataHistory = filterValue
        }
      },
    },
    created () {
    },
    mounted () {
      this.streamSetup()
      this.deltaTime = Date.now()
    },
    beforeDestroy () {
      const currentStatus = this.connectionStatus
      this.stopStream()
      this.connectionStatus = currentStatus
    },
    methods: {
      highlight (name, index) {
        const signal = this.signalDataList.findIndex(element => { return element.name === name })
        if (signal !== -1) {
          this.signalDataList[signal].highlight = true
          setTimeout(() => {
            this.signalDataList[signal].highlight = false
          }, 6000);
        }
        if (index) {
          this.selectedSignals[index].highlight = true
          setTimeout(() => {
            this.selectedSignals[index].highlight = false
          }, 6000);
        }
      },
      snackbar (color, snackbarMessage, icon) {
        this.snackbarColor = color
        this.snackbarMessage = snackbarMessage
        this.snackbarIcon = icon || 'warning'
        this.snackbarDisplayed = true
      },
      responseIncludes (name, namespace) {
        if (!this.charts) {
          const findName = this.responseArray.findIndex((element) => {
            return (element.name === name && element.namespace === namespace)
          })
          if (findName === -1) { return false } else { return true }
        } else return false
      },
      remove (index) {
        this.stopStream()
        this.selectedSignals.splice(index, 1)
        this.streamSetup()
        this.firstRun = true
      },
      onlineChip () {
        return this.signalDataList.map(item => { return item.name })
      },
      streamSetup () {
        this.childMessagesPerSecond = 30
        // eslint-disable-next-line no-undef
        this.NetworkService = new api.default.NetworkServiceClient(this.brokerServerIp)
        // eslint-disable-next-line no-undef
        this.subsConfig = new api.default.SubscriberConfig()
        this.request = 'Subscribe'
        const signals = [];
        this.selectedSignals.forEach(signal => {
          if (signal.signalId) {
            signals.push(signal.signalId)
          }
        })
        // eslint-disable-next-line no-undef
        const signalIds = new api.default.SignalIds()
        signalIds.setSignalidList(signals)
        // eslint-disable-next-line no-undef
        const clientId = new api.default.ClientId()
        clientId.setId(this.clientName)
        this.subsConfig.setSignals(signalIds)
        this.subsConfig.setClientid(clientId)
        this.startStream()
      },
      startStream () {
        this.stream = this.NetworkService.subscribeToSignals(this.subsConfig)
        this.stream.on('data', response => {
          this.subscribed = true;
          this.responseArrayBuffer.push(response)
          this.countMessagesPerSecond()
          this.processBuffer()
          //  this.snackbar('success', "Connected", 'check')
          if (this.connectionStatus !== 'success--text') {
            this.connectionStatus = 'success--text'
          }
        });
        this.stream.on('end', () => {
          this.stopStream()
          this.snackbarDisplayed = false;
        })
        this.stream.on('status', (status) => {
          this.snackbar('info', status.details, 'info')
        })
        this.stream.on('error', (error) => {
          this.stopStream();
          //  this.snackbar('error', error.message, 'warning')
          this.connectionStatus = 'error--text'
        })
        // this.$store.commit('updateRequestHistory', this.requestHistory)
      },
      stopStream () {
        this.request = 'Cancel Subscription';
        if (this.stream) {
          this.stream.cancel()
        }
        this.subscribed = false;
        // this.$store.commit('updateRequestHistory', this.requestHistory)
      },
      countMessagesPerSecond () {
        const now = Date.now()
        if (this.deltaTime + 1000 < now) {
          this.deltaTime = now
          this.messagesPerSecondCache = this.messagesPerSecond
          this.messagesPerSecond = 0
        }
        this.messagesPerSecond += 1
      },
      processBuffer () {
        const now = Date.now()
        if (this.deltaTimeProcessBuffer + (1000 / this.childMessagesPerSecond) < now) {
          this.deltaTimeProcessBuffer = now
          this.responseArrayBuffer.forEach(cachedResponses => {
            this.processCachedResponses(cachedResponses)
          })
          this.responseArrayBuffer = []
          this.signalDataList = this.signalDataListBuffer.slice(0)
          this.signalDataListBuffer = []
        }
      },
      processCachedResponses (response) {
        const signalList = response.getSignalList()
        if (!this.charts) {
          this.activityMonitor(signalList)
        } else {
          this.createSignalList(signalList)
        }
        if (this.firstRun) {
          this.firstRun = false
        }
      },
      activityMonitor (signalList) {
        this.responseArray = []
        signalList.forEach(signal => {
          const name = signal.getId().getName()
          const nameSpace = signal.getId().getNamespace()
            .getName()
          this.responseArray.push({ name: name, namespace: nameSpace })
        })
      },
      createSignalList (signalList) {
        signalList.forEach(signal => {
          const name = signal.getId().getName()
          const nameSpace = signal.getId().getNamespace()
            .getName()
          const index = this.signalDataListBuffer.findIndex(signalElement => { return signalElement.name === name && signalElement.nameSpace === nameSpace })
          let signalData = ''
          let rawData
          let dataType = ''
          let isParent = false
          rawData = signal.getRaw_asU8()
          if (signal.hasDouble()) {
            signalData = signal.getDouble()
            dataType = 'Double'
          } else if (signal.hasInteger()) {
            signalData = signal.getInteger()
            dataType = 'Integer'
          } else if (signal.hasArbitration()) {
            signalData = signal.getArbitration()
            dataType = 'Arbitration'
          } else if (signal.hasEmpty()) {
            signalData = signal.getEmpty()
            dataType = 'Empty'
          }
          if (rawData.length > 7) {
            dataType = 'RAW'
            isParent = true
          }
          const timestamp = signal.getTimestamp()
          const newElement = {
            name: name,
            dataRecords: [{ timestamp: timestamp, data: signalData }],
            dataType: dataType,
            nameSpace: nameSpace,
            highlight: false,
            rawData: [{ timestamp: timestamp, data: rawData }],
            isParent: isParent,
          }
          if (index !== -1) { // if the element is found, then push new data records, else push the new element
            let dataListItem = this.signalDataListBuffer[index]
            dataListItem.dataRecords.push({ timestamp: timestamp, data: signalData })
            dataListItem.rawData.push({ timestamp: timestamp, data: rawData })
            dataListItem.isParent = isParent
            dataListItem.name = name
          } else {
            this.signalDataListBuffer.push(newElement)
          }
        });
      },
    },
  }
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono");
.overflowY {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: calc(86vh - 300px);
}
.marginToolbar {
  margin-top: -64px;
}
.monoSpace {
  font-family: "Roboto Mono", monospace;
  font-weight: 400;
  text-transform: uppercase;
}
.transitionNone {
  transition: none;
}
</style>
