<template>
  <div>
    <VCard class="marginToolbar">
      <VToolbar
        card
        color="transparent"
      >
        <VIcon>
          publish
        </VIcon>
        <VToolbarTitle>
          Publish
        </VToolbarTitle>
      </VToolbar>
      <VCardText class="py-3">
        <div>
          <div
            v-if="selectedSignals.length === 0"
            class="title font-weight-light grey--text pa-3 text-xs-center my-4"
          >
            You have no selected signals at this time.<br>
            <VBtn
              flat
              to="/selection"
              depressed
            >
              <VIcon left>
                nature
              </VIcon> Selection Tree
            </VBtn>
          </div>
        </div>
        <VContainer
          mt-4
          mb-5
        >
          <VLayout
            v-for="(signal, index) in selectedSignals"
            :key="index"
            justify-start
          >
            <VTextField
              v-model="signalValues[index]"
              class="my-3 text-capitalize"
              :label="signal.name"
              :hint="determineSignalValueType(index)"
              persistent-hint
              @input="parseDataType($event, index)"
            />
            <VSelect
              v-model="signalValueType[index]"
              class="my-3 ml-5 capitalize shrink"
              :items="dataTypes"
              label="Payload Type"
            />
            <VBtn
              large
              class="my-3"
              flat
              @click="remove(index)"
            >
              <VIcon>
                close
              </VIcon>
            </VBtn>
          </VLayout>
        </VContainer>
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
          <VTooltip bottom>
            <template v-slot:activator="{on}">
              <VBtn
                depressed
                flat
                class="mx-2"
                v-on="on"
                @click="readSignals"
              >
                <VIcon>
                  cached
                </VIcon>
              </VBtn>
            </template>
            <span>Refresh</span>
          </VTooltip>
          <VBtn
            depressed
            :disabled="selectedSignals.length < 1"
            color=" success"
            @click="publishSignals"
          >
            <span>
              Publish</span>
          </VBtn>
        </VLayout>
      </VCardActions>
    </VCard>
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
  export default {
    name: 'Publish',
    filters: {
      rawStringFilter (input) {
        return input.toString(16).padStart(2, '0')
      },
      decimalPad (input) {
        return input.toString().padStart(3, '0')
      },
      toDate (input) {
        const date = new Date(input)
        return date.toLocaleTimeString({}, { hour12: false })
      },
      // decimal to binary
      dec2bin (num) {
        function convertBase (num) {
          return {
            from: function (baseFrom) {
              return {
                to: function (baseTo) {
                  return parseInt(num, baseFrom).toString(baseTo)
                    .padStart(8, '0')
                },
              }
            },
          }
        }
        return convertBase(num).from(10)
          .to(2)
      },
      // hexadecimal to binary
      hex2bin (num) {
        function convertBase (num) {
          return {
            from: function (baseFrom) {
              return {
                to: function (baseTo) {
                  return parseInt(num, baseFrom).toString(baseTo)
                },
              }
            },
          }
        }
        return convertBase(num).from(16)
          .to(2)
      },
    },
    data: () => {
      return {
        snackbarDisplayed: false,
        signalValues: [],
        signalValueType: [],
        chipValue: [],
        showEmptyResults: true,
        subscribed: false,
        request: '',
        hexDec: 'hex',
        snackbarMessage: 'Not connected',
        snackbarIcon: 'warning',
        snackbarColor: 'error',
        responseArray: [],
        signalDataList: [],
        firstRun: true,
        chipOnline: [],
        selected: false,
        responsePayload: null,
        dataTypes: ['integer', 'double', 'raw', 'arbitration', 'empty'],
      }
    },
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
    },
    created () {
    },
    mounted () {
      this.readSignals()
      setTimeout(() => {
        this.readSignals()
        setTimeout(() => {
          this.$forceUpdate()
        }, 100)
      }, 600)
    },
    beforeDestroy () {
    },
    methods: {
      parseDataType (input, index) {
        //  dataTypes: ['integer', 'double', 'raw', 'arbitration', 'empty'],
        switch (true) {
          case (!isNaN(input) && parseInt(input).toString() === input):
            // integer
            this.signalValueType[index] = null
            this.signalValueType[index] = this.dataTypes[0]
            break
          case (!isNaN(input) && parseFloat(input).toString() === input):
            // double
            this.signalValueType[index] = null
            this.signalValueType[index] = this.dataTypes[1]
            break
          case (isNaN(input) && input[0] === '0' && input[1] === 'x'):
            // raw
            this.signalValueType[index] = null
            this.signalValueType[index] = this.dataTypes[2]
            break
          case (isNaN(input) && input.toString().length > 0):
            // arbitration
            this.signalValueType[index] = null
            this.signalValueType[index] = this.dataTypes[3]
            break
          case (input.toString() === ''):
            // empty
            this.signalValueType[index] = null
            this.signalValueType[index] = this.dataTypes[4]
            break
          default:
            break
        }
      },
      remove (index) {
        this.selectedSignals.splice(index, 1)
      },
      rawStringLength (input) {
        return input.toString(16).length
      },
      snackbar (color, snackbarMessage, icon) {
        this.snackbarColor = color
        this.snackbarMessage = snackbarMessage
        this.snackbarIcon = icon || 'warning'
        this.snackbarDisplayed = true
      },
      determineSignalValueType (index) {
        if (this.signalValueType[index] !== undefined) {
          return this.signalValueType[index]
        } else {
          return 'Undetermined data type'
        }
      },
      clientName () {
        return 'SBWebClient' + Date.now()
      },
      determineDataType (index, event) {
        // use @input="determineDataType(index, $event)"
        if (event === '' || event === null) {
          this.signalValueType[index] = this.dataTypes[4]
        } else if (event.split('')[0] === '0' && event.split('')[1] === 'x') {
          this.signalValueType[index] = this.dataTypes[2]
        } else if (!isNaN(event)) {
          this.signalValueType[index] = this.dataTypes[1]
          if (Number.isInteger(parseFloat(event))) {
            this.signalValueType[index] = this.dataTypes[0]
          }
        } else if (event.toLowerCase() === 'true' || event.toLowerCase() === 'false') {
          this.signalValueType[index] = this.dataTypes[3]
        } else {
          this.signalValueType[index] = this.dataTypes[4]
        }
      },
      readSignals () {
        // eslint-disable-next-line no-undef
        const NetworkService = new api.default.NetworkServiceClient(this.brokerServerIp)
        // eslint-disable-next-line no-undef
        const SubscriberConfig = new api.default.SubscriberConfig()
        this.request = 'Read'
        const SignalsToRead = []
        this.selectedSignals.forEach(signal => {
          if (signal.signalId) {
            SignalsToRead.push(signal.signalId)
          }
        })
        // eslint-disable-next-line no-undef
        const Signals = new api.default.SignalIds()
        Signals.setSignalidList(SignalsToRead)
        // eslint-disable-next-line no-undef
        const ClientId = new api.default.ClientId()
        ClientId.setId(this.clientName)
        SubscriberConfig.setSignals(Signals)
        SubscriberConfig.setClientid(ClientId)
        const readServiceLocal = NetworkService.subscribeToSignals(SubscriberConfig)
        // readServiceLocal.on('error', error => { return this.snackbar('error', error.message, 'warning') })
        readServiceLocal.on('status', status => {
          return this.snackbar('info', 'Status: ' + status.details, 'info')
        })
        readServiceLocal.on('data', response => {
          readServiceLocal.cancel()
          const signalList = response.getSignalList()
          signalList.forEach(signal => {
            let dataType
            const signalName = signal.getId().getName()
            const index = this.selectedSignals.findIndex(value => { return value.name === signalName })
            const signalStats = { empty: null, arbitration: null, double: null, integer: null }
            //  dataTypes: ['integer', 'double', 'raw', 'arbitration', 'empty'],
            if (signal.hasEmpty()) {
              signalStats.empty = true
              dataType = this.dataTypes[4]
            }
            if (signal.hasArbitration()) {
              signalStats.arbitration = true
              dataType = this.dataTypes[3]
            }
            if (signal.hasDouble()) {
              signalStats.double = true
              dataType = this.dataTypes[1]
            }
            if (signal.hasInteger()) {
              signalStats.integer = true
              dataType = this.dataTypes[0]
            }
            this.signalValueType[index] = dataType
          })
          setTimeout(() => {
            this.$forceUpdate() // to have Vue display correct data values in the component
          }, 100)
        })
      },
      publishSignals () {
        // eslint-disable-next-line no-undef
        const NetworkService = new api.default.NetworkServiceClient(this.brokerServerIp)
        // eslint-disable-next-line no-undef
        const PublisherConfig = new api.default.PublisherConfig()
        this.request = 'Publish'
        const SignalsToPublish = []
        this.selectedSignals.forEach((signal, index) => {
          if (signal.signalId) {
            // eslint-disable-next-line no-undef
            const SignalWithPayload = new api.default.Signal()
            SignalWithPayload.setId(signal.signalId)
            const payload = this.signalValues[index]
            const signalPayloadType = this.signalValueType[index]
            if (payload !== undefined) {
              let signalPayload
              switch (signalPayloadType) {
                case 'integer':
                  signalPayload = parseInt(payload)
                  SignalWithPayload.setInteger(signalPayload)
                  break
                case 'double':
                  signalPayload = parseFloat(payload)
                  SignalWithPayload.setDouble(signalPayload)
                  break
                case 'arbitration':
                  signalPayload = payload.toString().toLowerCase()
                  if (payload === 'true') {
                    SignalWithPayload.setArbitration(true)
                  } else {
                    SignalWithPayload.setArbitration(false)
                  }
                  break
                case 'empty':
                default:
                  SignalWithPayload.setEmpty()
                  break
              }
              SignalsToPublish.push(SignalWithPayload)
            }
          }
        })
        // eslint-disable-next-line no-undef
        const Signals = new api.default.Signals()
        Signals.setSignalList(SignalsToPublish)
        // eslint-disable-next-line no-undef
        const ClientId = new api.default.ClientId()
        ClientId.setId(this.clientName())
        PublisherConfig.setSignals(Signals)
        PublisherConfig.setClientid(ClientId)
        PublisherConfig.setFrequency(0)
        NetworkService.publishSignals(PublisherConfig, {}, this.callback)
      },
      callback (error, response) {
        if (response) {
          this.snackbar('success', 'Signals Published', 'publish')
        }
        if (error !== null) {
          this.snackbar('error', error.message, 'warning')
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
.pointerCursor {
  cursor: pointer;
}
</style>
