<template>
  <div>
    <VCard class="marginToolbar">
      <VToolbar
        card
        color="transparent"
      >
        <VIcon>
          bug_report
        </VIcon>
        <VToolbarTitle>
          Diagnostics
        </VToolbarTitle>
      </VToolbar>
      <VCardText class="py-3">
        <div
          v-if="selectedSignals.length === 0"
          class="title font-weight-light grey--text pa-3 text-xs-center my-4"
        >
          You have no selected signals at this time. Select an Uplink followed by a Downlink <br>
          <RouterLink to="/selection">
            <VBtn
              flat
              depressed
            >
              <VIcon left>
                nature
              </VIcon> Selection Tree
            </VBtn>
          </RouterLink>
        </div>
        <VLayout
          v-if="selectedSignals.length > 0"
          mt-4
          mb-5
          row
          wrap
        >
          <VFlex class="my-3">
            <h3>
              Uplink:
            </h3>
            <VChip
              small
              :label="selectedSignals[0].isParent"
              class="transitionNone"
              close
              @input="remove(0)"
            >
              {{ selectedSignals[0].name }}
            </VChip>
            <span class="caption grey--text"> {{ selectedSignals[0].namespace }}</span>
            <div
              v-if="!selectedSignals[0].isParent"
              class="title font-weight-light grey--text pa-3 my-4 error--text"
            >
              Not a valid uplink <br>
              <RouterLink to="/selection">
                <VBtn
                  flat
                  depressed
                >
                  <VIcon left>
                    nature
                  </VIcon> Selection Tree
                </VBtn>
              </RouterLink>
            </div>
          </VFlex>
          <div
            v-if="selectedSignals.length === 1"
            class="title font-weight-light grey--text pa-3 my-4"
          >
            Select a Downlink <br>
            <RouterLink to="/selection">
              <VBtn
                flat
                depressed
              >
                <VIcon left>
                  nature
                </VIcon> Selection Tree
              </VBtn>
            </RouterLink>
          </div>
          <VFlex
            v-if="selectedSignals.length > 1"
            class="my-3"
          >
            <h3>
              Downlink:
            </h3>
            <VChip
              small
              close
              :label="selectedSignals[1].isParent"
              class="transitionNone"
              @input="remove(1)"
            >
              {{ selectedSignals[1].name }}
            </VChip>
            <span class="caption grey--text"> {{ selectedSignals[1].namespace }}</span>
            <div
              v-if="!selectedSignals[1].isParent"
              class="title font-weight-light grey--text pa-3 my-4 error--text"
            >
              Not a valid downlink <br>
              <RouterLink to="/selection">
                <VBtn
                  flat
                  depressed
                >
                  <VIcon left>
                    nature
                  </VIcon> Selection Tree
                </VBtn>
              </RouterLink>
            </div>
          </VFlex>
        </VLayout>
        <VLayout
          justify-end
          mb-5
        >
          <VSlider
            v-model.number.lazy="service"
            :max="255"
            :min="0"
            :step="1"
          />
          <VTextField
            v-if="hexDec === 'dec'"
            v-model.number.lazy="service"
            class="mt-0 ml-3 shrink monoSpace"
            type="number"
            label="Service ID"
          />
          <VTextField
            v-if="hexDec === 'hex'"
            v-model.lazy="serviceConvert"
            class="mt-0 ml-3 shrink monoSpace"
            label="Service ID"
            type="string"
          />
        </VLayout>
        <VLayout mb-5>
          <VRangeSlider
            v-model="pid"
            :max="255"
            :min="-1"
            :step="1"
          />
          <VTextField
            v-if="hexDec === 'dec'"
            v-model.number.lazy="pid[0]"
            class="mt-0 ml-3 shrink monoSpace"
            type="number"
            label="PID1 Min"
          />
          <VTextField
            v-if="hexDec === 'dec'"
            v-model.number.lazy="pid[1]"
            class="mt-0 ml-3 shrink monoSpace"
            type="number"
            label="PID1 Max"
          />
          <VTextField
            v-if="hexDec === 'hex'"
            v-model="pid1MinConvert"
            class="mt-0 ml-3 shrink monoSpace"
            type="string"
            label="PID1 Min"
          />
          <VTextField
            v-if="hexDec === 'hex'"
            v-model="pid1MaxConvert"
            class="mt-0 ml-3 shrink monoSpace"
            type="string"
            label="PID1 Max"
          />
        </VLayout>
        <VLayout mb-4>
          <VSlider
            v-model.number="pid2"
            :max="255"
            :min="-1"
            :step="1"
          />
          <VTextField
            v-if="hexDec === 'dec'"
            v-model.number="pid2"
            class="mt-0 ml-3 shrink monoSpace"
            type="number"
            label="PID2"
          />
          <VTextField
            v-if="hexDec === 'hex'"
            v-model.lazy="pid2Convert"
            class="mt-0 ml-3 shrink monoSpace"
            type="string"
            label="PID2"
          />
        </VLayout>
        <VLayout row>
          <VSpacer />
          <VRadioGroup
            v-model="hexDec"
            hide-actions
            hide-details
            row
          >
            <VRadio
              label="Hexadecimal"
              value="hex"
            />
            <VRadio
              label="Decimal"
              value="dec"
            />
          </VRadioGroup>
          <VSwitch
            v-model="showEmptyResults"
            label="Show empty results"
          />
        </VLayout>
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
          <div class="mx-1">
            <VTooltip bottom>
              <template v-slot:activator="{on}">
                <VBtn
                  depressed
                  flat
                  class="mx-1"
                  :disabled="selectedSignals.length === 0"
                  v-on="on"
                  @click="scanResults = []"
                >
                  <VIcon>
                    clear_all
                  </VIcon>
                </VBtn>
              </template>
              <span>Clear results</span>
            </VTooltip>
          </div>
          <VBtn
            depressed
            color="success"
            @click="scanObd"
          >
            OBD Scan
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
    <VDataTable
      :headers="headers"
      :items="scanResults"
      hide-actions
      item-key="date"
      class="mt-4 elevation-2"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td>
            {{ props.item.date | toDate }}
          </td>
          <td class="text-xs-left monoSpace">
            <span class="monoSpace">
              <span
                v-for="(byte, i) in props.item.serviceId "
                :key="i"
              >
                <span v-if="hexDec === 'hex'">
                  <span v-if=" (rawStringLength(byte) < 2)">0</span>{{ byte | rawStringFilter }}
                </span>
                <span v-if="hexDec === 'dec'">
                  <span v-if="byte < 10">00</span><span v-else-if="byte < 100">0</span>{{ byte }}
                </span>
              </span>
            </span>
          </td>
          <td class="text-xs-left monoSpace">
            <span class="monoSpace">
              <span
                v-for="(byte, i) in props.item.pIdHex "
                :key="i"
              >
                <span v-if="hexDec === 'hex'">
                  <span v-if=" (rawStringLength(byte) < 2)">0</span>{{ byte | rawStringFilter }}
                </span>
                <span v-if="hexDec === 'dec'">
                  <span v-if="byte < 10">00</span><span v-else-if="byte < 100">0</span>{{ byte }}
                </span>
              </span>
            </span>
          </td>
          <td class="text-xs-left monoSpace">
            <span class="monoSpace">
              <span
                v-for="(byte, i) in props.item.data"
                :key="i"
              >
                <span
                  v-if="hexDec === 'hex'"
                  class="monoSpace"
                >
                  <span v-if=" (rawStringLength(byte) < 2)">0</span>{{ byte | rawStringFilter }}
                </span>
                <span v-if="hexDec === 'dec'">
                  <span v-if="byte < 10">00</span><span v-else-if="byte < 100">0</span>{{ byte }}
                </span>
              </span>
            </span>
          </td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <table style="width:100%">
          <tr>
            <th class="text-xs-left grey--text">
              Uplink
            </th>
            <th class="text-xs-left grey--text">
              Downlink
            </th>
            <th class="text-xs-left grey--text">
              Namespace
            </th>
            <th class="text-xs-left grey--text">
              Description
            </th>
          </tr>
          <tr>
            <td
              class="text-xs-left grey--text text--lighten-2 body-1"
              style="width:15%"
            >
              {{ props.item.uplink }}
            </td>
            <td
              class="text-xs-left grey--text text--lighten-2 body-1"
              style="width:15%"
            >
              {{ props.item.downlink }}
            </td>
            <td
              class="text-xs-left grey--text text--lighten-2 body-1"
              style="width:15%"
            >
              {{ props.item.namespace }}
            </td>
            <td
              class="text-xs-left grey--text text--lighten-2 body-1"
              style="width:55%"
            >
              {{ props.item.description }}
            </td>
          </tr>
        </table>
        <VDivider />
      </template>
    </VDataTable>
  </div>
</template>
<script>
  import './../grpc/dist/api.js'
  import services from './../assets/pid.js'
  export default {
    name: "Diagnostic",
    filters: {
      rawStringFilter (input) {
        return input.toString(16)
      },
      toDate (input) {
        const date = new Date(input)
        return date.toLocaleTimeString({}, { hour12: false })
      },
    },
    data: () => { return {
      snackbarDisplayed: false,
      service: 1,
      pid: [0, 24],
      pid2: -1,
      chipValue: [],
      showEmptyResults: true,
      subscribed: false,
      request: '',
      hexDec: 'hex',
      diagnosticsQuery: null,
      dataHistory: 52,
      snackbarMessage: 'Not connected',
      snackbarIcon: 'warning',
      snackbarColor: 'error',
      responseArray: [],
      signalDataList: [],
      firstRun: true,
      chipOnline: [],
      selected: false,
      diagnosticsServiceClient: null,
      responsePayload: null,
      scanResults: [],
      headers: [
        {
          text: 'Date',
          value: 'date',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Service ID',
          value: 'serviceId',
          align: 'left',
          sortable: true,
        },
        {
          text: 'PID',
          value: 'pIdHex',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Raw Response Data',
          value: 'data',
          class: 'grow',
          align: 'left',
          sortable: true,
        },
      ],
    } },
    computed: {
      serviceConvert: {
        get () {
          const service = this.service.toString(16).toUpperCase()
          if (service.length < 2) {
            return '0x0' + service
          } else {
            return '0x' + service
          }
        },
        set (value) {
          const converted = parseInt(value)
          this.service = converted
        },
      },
      pid1MinConvert: {
        get () {
          const pid1Min = this.pid[0].toString(16).toUpperCase()
          if (this.pid[0] < 0) {
            return '-0x01'
          } else if (pid1Min.length < 2) {
            return '0x0' + pid1Min
          } else {
            return '0x' + pid1Min
          }
        },
        set (value) {
          const converted = parseInt(value)
          const result = [converted, this.pid[1]]
          this.pid = result
        },
      },
      pid1MaxConvert: {
        get () {
          const pid1Max = this.pid[1].toString(16).toUpperCase()
          if (this.pid[1] < 0) {
            return '-0x01'
          } else if (pid1Max.length < 2) {
            return '0x0' + pid1Max
          } else {
            return '0x' + pid1Max
          }
        },
        set (value) {
          const converted = parseInt(value)
          const result = [this.pid[0], converted]
          this.pid = result
        },
      },
      pid2Convert: {
        get () {
          const pid2 = this.pid2.toString(16).toUpperCase()
          if (this.pid2 < 0) {
            return '-0x01'
          } else if (pid2.length < 2) {
            return '0x0' + pid2
          } else {
            return '0x' + pid2
          }
        },
        set (value) {
          const converted = parseInt(value)
          this.pid2 = converted
        },
      },
      hexPidIndex: {
        get () {
          return '' + this.scanPidIndex.toString(16)
        },
      },
      hexServiceIndex: {
        get () {
          return '' + this.scanServiceIndex.toString(16)
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
    },
    beforeDestroy () {
      const currentStatus = this.connectionStatus
      this.stopdiagnosticsQuery()
      this.connectionStatus = currentStatus
    },
    methods: {
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
      queryObdInteractive () {
        this.request = 'Query OBD'
        const signals = [];
        this.selectedSignals.forEach(signal => {
          if (signal.signalId) {
            signals.push(signal.signalId)
          }
        })
        // eslint-disable-next-line no-undef
        const request = new api.default.DiagnosticsRequest()
        request.setDownlink(signals[0])
        request.setUplink(signals[1])
        const serviceId = new Uint8Array(1)
        serviceId[0] = 0x01
        request.setServiceid(serviceId)
        const dataId = new Uint8Array(1)
        dataId[0] = 0x42
        request.setDataidentifier(dataId)
        this.diagnosticsRequest(request)
      },
      scanObd () {
        for (let scanPidIndex = this.pid[0]; scanPidIndex < this.pid[1]; scanPidIndex += 1) {
          this.request = 'OBD Scan'
          // eslint-disable-next-line no-undef
          const request = new api.default.DiagnosticsRequest()
          const signals = [];
          this.selectedSignals.forEach(signal => {
            if (signal.signalId) {
              signals.push(signal.signalId)
            }
          })
          request.setUplink(signals[0])
          request.setDownlink(signals[1])
          const serviceId = new Uint8Array(1)
          serviceId[0] = '0x' + this.service.toString(16)
          request.setServiceid(serviceId)
          if (scanPidIndex > -1) {
            if (this.pid[0] === this.pid[1]) {
              this.pid[1] = this.pid[0] + 1
            }
            let dataIdLength = 1
            if (this.pid2 > -1) {
              dataIdLength = 2
            }
            const dataId = new Uint8Array(dataIdLength)
            dataId[0] = '0x' + scanPidIndex.toString(16)
            if (this.pid2 > -1) {
              dataId[1] = '0x' + this.pid2.toString(16)
            }
            request.setDataidentifier(dataId)
          }
          this.diagnosticsRequest(request)
        }
      },
      diagnosticsRequest (request) {
        // eslint-disable-next-line no-undef
        const diagnosticsClient = new api.default.DiagnosticsServiceClient(this.brokerServerIp)
        this.diagnosticsQuery = diagnosticsClient.sendDiagnosticsQuery(request)
        this.diagnosticsQuery.on('data', response => {
          this.responseQuery(response, request)
          if (this.connectionStatus !== 'success--text') {
            this.connectionStatus = 'success--text'
          }
        });
        this.diagnosticsQuery.on('end', () => {
          this.snackbarDisplayed = false;
        })
        this.diagnosticsQuery.on('status', (status) => {
          if (status.details.length > 1) {
            this.snackbar('info', status.details, 'info')
            this.subscribed = false;
          }
        })
        this.diagnosticsQuery.on('error', (error) => {
          this.snackbar('error', error.message, 'warning')
          this.connectionStatus = 'error--text'
        })
        this.$store.commit('updateRequestHistory', this.requestHistory)
      },
      stopdiagnosticsQuery () {
        this.request = 'Cancel Subscription';
        this.subscribed = false;
        this.$store.commit('updateRequestHistory', this.requestHistory)
      },
      responseQuery (response, request) {
        this.subscribed = false;
        const index = parseInt(request.getDataidentifier().toString(16), 10)
        const serviceId = parseInt(request.getServiceid_asU8().toString(16), 10)
        const descriptionArray = services()[serviceId]
        const downlink = request.getDownlink().getName()
        const uplink = request.getUplink().getName()
        const namespace = request.getDownlink().getNamespace()
          .getName()
        const entry = {
          name: this.request,
          data: response.getRaw_asU8(),
          date: Date.now(),
          uplink: uplink,
          downlink: downlink,
          namespace: namespace,
          description: descriptionArray[index] || '',
          serviceId: request.getServiceid_asU8(),
          pIdHex: request.getDataidentifier_asU8(),
        }
        if (this.showEmptyResults) {
          this.scanResults.push(entry)
        } else if (entry.data.length > 0) {
          this.scanResults.push(entry)
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
</style>
