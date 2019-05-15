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
            max="20"
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
            max="300"
            min="4"
            step="1"
            thumb-label
          />
          <VSwitch
            v-model="charts"
            label="Show charts"
            class="pl-3"
          />
        </VLayout>
      </VContainer>
      <VCardText class="overflowY py-3">
        <div
          v-if="selectedSignals.length === 0"
          key="title"
          class="title font-weight-light grey--text pa-3 text-xs-center my-4"
        >
          Select frames and signals from the <RouterLink to="/selection">
            <a>Selection Tree</a>
          </RouterLink>
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
        item-key="id"
        :rows-per-page-items="rowsPerPageItems"
      >
        <template v-slot:item="props">
          <SignalCard
            v-show="charts"
            :name="props.item.name"
            :data="props.item.data"
            :name-space="props.item.nameSpace"
            :data-type="props.item.dataType"
            :min="props.item.min"
            :max="props.item.max"
            :unit="props.item.unit"
            :size="props.item.size"
            :raw="props.item.raw"
            :description="props.item.description"
            :timestamp="props.item.timestamp"
            :data-history="dataHistory"
            :highlight="props.item.highlight"
            :unique-filter-global="filterStrength"
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
  import SignalCard from "./../components/SignalCard.vue"
  export default {
    name: "Monitor",
    components: { SignalCard },
    data: () => { return {
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
      rowsPerPageItems: [6, 12, 24, -1],
      pagination: {
        rowsPerPage: -1, // infinite rows per page
        descending: false, // sorting order
        sortBy: "id", // sort field for pagination
      },
      signalDataList: [],
      firstRun: true,
      firstRunSubscribed: true,
      chipOnline: [],
      selected: false,
      filterStrength: 0,
    } },
    computed: {
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
      requestHistory: {
        get () {
          return this.$store.state.requestHistory
        },
        set (value) {
          this.$store.commit('updateRequestHistory', value)
        },
      },
    },
    watch: {
      subscribed () {
        if (this.firstRunSubscribed === true) {
          this.firstRunSubscribed = false
          setTimeout(() => {
            this.dataHistory = 36
          }, 2000);
          setTimeout(() => {
            this.charts = true
          }, 4000);
          // setTimeout(() => {
          //   this.filterStrength = 3
          // }, 8400);
        }
      },
      dataHistory () {
        const filterValue = this.filterStrength * 5 + 12
        if (this.dataHistory < 5) {
          this.filterStrength = 0
        } else if (this.dataHistory < filterValue) {
          this.filterStrength = (this.dataHistory - 12) / 5
        }
      },
      filterStrength () {
        const filterValue = this.filterStrength * 5 + 12
        if (filterValue > this.dataHistory) {
          this.dataHistory = filterValue
        }
      },
    },
    created () {
    },
    mounted () {
      this.streamSetup()
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
        const findName = this.responseArray.findIndex((element) => {
          return (element.name === name && element.namespace === namespace)
        })
        if (findName === -1) { return false } else { return true }
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
        clientId.setId("SBWebClient" + Date.now())
        this.subsConfig.setSignals(signalIds)
        this.subsConfig.setClientid(clientId)
        this.startStream()
      },
      startStream () {
        this.stream = this.NetworkService.subscribeToSignals(this.subsConfig)
        this.stream.on('data', response => {
          this.streamResponse(response)
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
        this.$store.commit('updateRequestHistory', this.requestHistory)
      },
      stopStream () {
        this.request = 'Cancel Subscription';
        if (this.stream) {
          this.stream.cancel()
        }
        this.subscribed = false;
        this.$store.commit('updateRequestHistory', this.requestHistory)
      },
      streamResponse (response) {
        this.subscribed = true;
        const signalList = response.getSignalList()
        let streamResult = []
        this.responseArray = []
        signalList.forEach(signal => {
          let signalData = ''
          let dataType = ''
          const nameSpace = signal.getId().getNamespace()
            .getName()
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
          const name = signal.getId().getName()
          this.responseArray.push({ name: name, namespace: nameSpace })
          const timestamp = signal.getTimestamp()
          streamResult.push({
            name: name,
            data: { timestamp: timestamp, data: signalData },
            dataType: dataType,
            nameSpace: nameSpace,
            unit: signal.unit,
            max: signal.max,
            min: signal.min,
            size: signal.size,
            raw: signal.getRaw(),
            highlight: false,
          })
        });
        if (!this.firstRun) {
          streamResult.forEach((streamElement) => {
            const index = this.signalDataList.findIndex(element => { return element.name === streamElement.name })
            if (index !== -1) {
              if (this.signalDataList[index].nameSpace !== undefined) {
                this.signalDataList[index].data = streamElement.data
                this.signalDataList[index].raw = streamElement.raw
              } else {
                this.signalDataList[index] = streamElement } }
            else {
              this.signalDataList.push(streamElement)
            }
          })
        } else {
          this.signalDataList = streamResult
          this.firstRun = false
        }
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
