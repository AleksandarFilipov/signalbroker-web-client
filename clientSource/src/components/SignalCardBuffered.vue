<template>
  <VFadeTransition>
    <VFlex
      v-if="visible"
      xs12
      sm12
      md12
      lg6
      xl4
    >
      <VCard>
        <VCardTitle>
          <VExpandXTransition>
            <VIcon
              v-show="highlight"
              small
              left
              color="primary"
            >
              label
            </VIcon>
          </VExpandXTransition>
          <h4>
            {{ name }}
          </h4>
          <VSpacer />
        </VCardTitle>
        <VContainer
          fluid
          fill-height
          ma-0
          pa-0
          color="transparent"
        >
          <VSparkline
            :auto-draw="animate"
            :auto-draw-duration="drawDuration"
            :value="chartDataValueArrayCache"
            color="grey"
            :height="chartHeight"
            :line-width="lineWidth"
            :type="chartType"
            :padding="padding"
            :smooth="radius"
            :fill="fill"
            stroke-linecap="round"
            :auto-line-width="autoLineWidth"
          />
        </VContainer>
        <VDivider />
        <VList
          dense
          color="transparent"
        >
          <VListTile v-if="!isParent">
            <VListTileContent class="grey--text text-uppercase font-weight-black">
              {{ dataType || 'Data type' }}:
            </VListTileContent>
            <VListTileContent class="align-end text-xs-right">
              <span class="monoSpace text-truncate ">
                {{ chartDataValueArrayCache[chartDataValueArrayCache.length - 1] }}
              </span>
            </VListTileContent>
          </VListTile>
          <VListTile v-else>
            <VListTileContent class="grey--text text-uppercase font-weight-black">
              Raw:
            </VListTileContent>
            <VListTileContent class="align-end text-xs-right">
              <span class="monoSpace text-truncate text-uppercase">
                <span
                  v-for="(byte, i) in lastRawEntry"
                  :key="i"
                >
                  {{ byte | rawStringFilter }}
                </span>
              </span>
            </VListTileContent>
          </VListTile>
        </VList>
        <VCardActions>
          <VLayout>
            <VBtn
              block
              flat
              @click="showLog = !showLog"
            >
              <VIcon
                small
                :color="showLog ? 'grey lighten-2' : 'grey darken-1' "
              >
                view_list
              </VIcon>
            </VBtn>
            <VBtn
              block
              flat
              @click="showAdditionalInfo = !showAdditionalInfo"
            >
              <VIcon
                small
                :color="showAdditionalInfo ? 'grey lighten-2' : 'grey darken-1' "
              >
                info
              </VIcon>
            </VBtn>
            <VBtn
              block
              flat
              @click="showConfiguration = !showConfiguration"
            >
              <VIcon
                small
                :color="showConfiguration ? 'grey lighten-2' : 'grey darken-1' "
              >
                settings
              </VIcon>
            </VBtn>
          </VLayout>
        </VCardActions>
        <VSlideYTransition>
          <VCardText
            v-show="showLog"
            class="
        pa-0
        ma-0
        "
          >
            <VDataTable
              :items="entryLogCache"
              item-key="id"
              :pagination.sync="pagination"
              hide-headers
            >
              <template v-slot:items="props">
                <tr class="monoSpace text-uppercase grey--text text--lighten-1">
                  <td class="px-3">
                    {{ props.item.timestamp | toDate }}
                  </td>
                  <td
                    v-if="!isParent"
                    class="text-xs-right text-truncate px-3 grey--text text--lighten-1"
                  >
                    {{ props.item.data }}
                  </td>
                  <td
                    v-if="isParent && props.item.data.length"
                    class="text-xs-right text-truncate px-3 grey--text text--lighten-1"
                  >
                    <span
                      v-for="(byte, i) in props.item.data"
                      :key="i"
                    >
                      {{ byte | rawStringFilter }}
                    </span>
                  </td>
                </tr>
              </template>
            </VDataTable>
          </VCardText>
        </VSlideYTransition>
        <VSlideYTransition>
          <VCardText
            v-show="showAdditionalInfo"
            class="
        pa-0
        ma-0
        "
          >
            <VDivider />
            <VList
              dense
              class="grey--text text--lighten-1"
            >
              <VListTile>
                <VListTileContent>
                  Messages/second:
                </VListTileContent>
                <VListTileContent class="align-end monoSpace">
                  {{ messagesPerSecondCache | padNumber }}
                </VListTileContent>
              </VListTile>
              <VListTile>
                <VListTileContent>
                  Refresh rate:
                </VListTileContent>
                <VListTileContent class="align-end monoSpace">
                  {{ cacheDelay }} FPS
                </VListTileContent>
              </VListTile>
              <VListTile>
                <VListTileContent>
                  Bus:
                </VListTileContent>
                <VListTileContent class="align-end">
                  {{ nameSpace }}
                </VListTileContent>
              </VListTile>
              <!--
              <VListTile v-if="!isParent && description">
                <VListTileContent>
                  Description:
                </VListTileContent>
                <VListTileContent class="align-end">
                  {{ description }}
                </VListTileContent>
              </VListTile>
              <VListTile v-if="!isParent && min">
                <VListTileContent>
                  Minimum value:
                </VListTileContent>
                <VListTileContent class="align-end">
                  {{ min }}
                </VListTileContent>
              </VListTile>
              <VListTile v-if="!isParent && max">
                <VListTileContent>
                  Maximum value:
                </VListTileContent>
                <VListTileContent class="align-end">
                  {{ max }}
                </VListTileContent>
              </VListTile>
              <VListTile v-if="!isParent && unit">
                <VListTileContent>
                  Unit:
                </VListTileContent>
                <VListTileContent class="align-end">
                  {{ unit }}
                </VListTileContent>
              </VListTile>
              <VListTile v-if="!isParent && size">
                <VListTileContent>
                  Size:
                </VListTileContent>
                <VListTileContent class="align-end">
                  {{ size }}
                </VListTileContent>
              </VListTile> -->
            </VList>
          </VCardText>
        </VSlideYTransition>
        <VSlideYTransition>
          <VCardText
            v-show="showConfiguration"
            class="
            grey--text text--lighten-2
        pa-0
        ma-0
        "
          >
            <VDivider />
            <VList
              dense
            >
              <VListTile>
                <VListTileContent>
                  <VContainer px-0>
                    <VLayout row>
                      <VFlex>
                        <VSlider
                          v-model="uniqueFilter"
                          hide-actions
                          hide-details
                          label="Filter strength"
                          max="30"
                          min="1"
                          step="1"
                        />
                      </VFlex>
                      <VFlex
                        shrink
                        headline
                        pt-4
                      >
                        {{ uniqueFilter }}
                      </VFlex>
                    </VLayout>
                  </VContainer>
                </VListTileContent>
              </VListTile>
              <VListTile>
                <VListTileContent>
                  <VContainer px-0>
                    <VLayout row>
                      <VFlex>
                        <VSlider
                          v-model="dataHistoryLocal"
                          hide-actions
                          hide-details
                          label="History"
                          max="12000"
                          min="100"
                          step="100"
                        />
                      </VFlex>
                      <VFlex
                        shrink
                        headline
                        pt-4
                      >
                        {{ dataHistoryLocal }}
                      </VFlex>
                    </VLayout>
                  </VContainer>
                </VListTileContent>
              </VListTile>
              <VListTile>
                <VListTileContent>
                  <VContainer px-0>
                    <VRadioGroup
                      v-model="chartType"
                      row
                      hide-actions
                      hide-details
                    >
                      <VRadio
                        label="Trend line"
                        value="trend"
                      />
                      <VRadio
                        label="Bar graph"
                        value="bar"
                      />
                    </VRadioGroup>
                  </VContainer>
                </VListTileContent>
              </VListTile>
              <VListTile>
                <VListTileContent>
                  <VContainer px-0>
                    <VLayout row>
                      <VFlex>
                        <VSlider
                          v-model="lineWidth"
                          hide-actions
                          hide-details
                          label="Line width"
                          max="4"
                          min="0.01"
                          step="0.01"
                        />
                      </VFlex>
                      <VFlex
                        shrink
                        headline
                        pt-4
                      >
                        {{ lineWidth }}
                      </VFlex>
                    </VLayout>
                  </VContainer>
                </VListTileContent>
              </VListTile>
              <VListTile>
                <VListTileContent>
                  <VContainer px-0>
                    <VLayout row>
                      <VFlex>
                        <VSlider
                          v-model="radius"
                          hide-actions
                          hide-details
                          label="Smoothing"
                          max="3"
                          min="0"
                          step="0.01"
                        />
                      </VFlex>
                      <VFlex
                        shrink
                        headline
                        pt-4
                      >
                        {{ radius }}
                      </VFlex>
                    </VLayout>
                  </VContainer>
                </VListTileContent>
              </VListTile>
              <VListTile>
                <VListTileContent>
                  <VContainer px-0>
                    <VLayout row>
                      <VFlex>
                        <VSlider
                          v-model="padding"
                          hide-actions
                          hide-details
                          label="Padding"
                          max="8"
                          min="0"
                          step="0.01"
                        />
                      </VFlex>
                      <VFlex
                        shrink
                        headline
                        pt-4
                      >
                        {{ padding }}
                      </VFlex>
                    </VLayout>
                  </VContainer>
                </VListTileContent>
              </VListTile>
              <VListTile>
                <VListTileContent>
                  <VContainer px-0>
                    <VSwitch
                      v-model="autoLineWidth"
                      hide-actions
                      hide-details
                      label="Auto line width"
                    />
                  </VContainer>
                </VListTileContent>
              </VListTile>
              <VListTile>
                <VListTileContent>
                  <VContainer px-0>
                    <VSwitch
                      v-model="fill"
                      hide-actions
                      hide-details
                      label="Fill"
                    />
                  </VContainer>
                </VListTileContent>
              </VListTile>
              <VListTile>
                <VListTileContent>
                  <VContainer px-0>
                    <VSwitch
                      v-model="animate"
                      hide-actions
                      hide-details
                      label="Animate"
                    />
                  </VContainer>
                </VListTileContent>
              </VListTile>
              <VListTile>
                <VListTileContent>
                  <VContainer px-0>
                    <VLayout row>
                      <VFlex>
                        <VSlider
                          v-model="drawDuration"
                          hide-actions
                          hide-details
                          label="Draw duration"
                          max="800"
                          min="100"
                          step="1"
                        />
                      </VFlex>
                      <VFlex
                        shrink
                        headline
                        pt-4
                      >
                        {{ drawDuration }}
                      </VFlex>
                    </VLayout>
                  </VContainer>
                </VListTileContent>
              </VListTile>
            </VList>
          </VCardText>
        </VSlideYTransition>
      </VCard>
    </VFlex>
  </VFadeTransition>
</template>
<script>
  export default {
    name: 'SignalCardBuffered',
    filters: {
      toDate (input) {
        const date = new Date(input / 1000)
        const localized = date.toLocaleTimeString({}, { hour12: false })
        const milliseconds = date.getMilliseconds().toString()
          .padStart(3, '0')
        return localized + '.' + milliseconds
      },
      toString (input) {
        return input.toString()
      },
      rawStringFilter (input) {
        return input.toString(16).padStart(2, '0')
      },
      padNumber (input) {
        return input.toString().padStart(3, '0')
      },
    },
    props: {
      name: { type: String, default: null },
      dataRecords: { type: Array, default: null },
      rawData: { type: Array, default: null },
      dataType: { type: String, default: null },
      nameSpace: { type: String, default: null },
      highlight: { type: Boolean },
      dataHistory: { type: Number, default: null },
      uniqueFilterGlobal: { type: Number, default: null },
      isParent: { type: Boolean },
    },
    data () {
      return {
        pagination: {
          sortBy: 'timestamp',
          descending: true,
        },
        cacheDelay: 1,
        showAdditionalInfo: false,
        showConfiguration: false,
        entryLog: [],
        entryLogCache: [],
        deltaTime: null,
        showLog: false,
        animate: false,
        drawDuration: 100,
        enableAdaptiveCharting: true,
        radius: 0.2,
        padding: 1,
        dataHistoryLocal: 2,
        lineWidth: 0.8,
        chartHeight: 48,
        chartType: 'bar',
        typeOptions: ['trend', 'bar'],
        chartDataValueArray: [],
        chartDataValueArrayCache: [],
        fill: false,
        lastUpdate: '',
        isBinary: false,
        autoLineWidth: false,
        uniqueFilter: 0,
        messagesDeltaTime: null,
        messagesPerSecond: 0,
        messagesPerSecondCache: 0,
        lastRawEntry: null,
      }
    },
    computed: {
      dataRecordsLength () { return this.dataRecords.length },
      dataLength () {
        return this.chartDataValueArray.length
      },
      entryLogLength () {
        return this.entryLog.length
      },
      dataSetLength () {
        return this.dataSet.size
      },
      dataSet () {
        return new Set(this.chartDataValueArrayCache)
      },
      visible () {
        if (this.dataSetLength < this.uniqueFilter && this.uniqueFilter > 1 && this.dataLength > 1) {
          return false
        } else {
          return true
        }
      },
      childMessagesPerSecond: {
        get () {
          return this.$store.state.childMessagesPerSecond
        },
        set (value) {
          this.$store.commit('updateChildMessagesPerSecond', value)
        },
      },
    },
    watch: {
      rawData: {
        handler () {
          if (this.isParent) {
            this.countMessages()
            this.processData()
            if (this.entryLogCache[this.entryLogLength - 1] !== undefined) {
              this.lastRawEntry = this.entryLogCache[this.entryLogLength - 1].data
            }
            if (this.enableAdaptiveCharting) {
              this.adaptiveCharting()
            }
          }
        },
      },
      messagesPerSecondCache () {
        if (this.messagesPerSecondCache < this.cacheDelay) {
          this.cacheDelay = this.messagesPerSecondCache
        } else if (this.messagesPerSecondCache > this.cacheDelay && this.messagesPerSecondCache < 30) {
          this.cacheDelay = this.messagesPerSecondCache
        }
        if (this.childMessagesPerSecond !== this.messagesPerSecondCache) {
          this.childMessagesPerSecond = this.messagesPerSecondCache
        }
      },
      uniqueFilterGlobal () {
        this.uniqueFilter = this.uniqueFilterGlobal
      },
      dataRecords: {
        handler () {
          if (!this.isParent) {
            this.countMessages()
            this.processData()
            if (this.enableAdaptiveCharting) {
              this.adaptiveCharting()
            }
          }
        },
      },
      dataHistory () {
        this.dataHistoryLocal = this.dataHistory
        if (this.chartType === this.typeOptions[1] && this.dataHistoryLocal < 30) {
          this.autoLineWidth = true
        } else {
          this.autoLineWidth = false
        }
      },
    },
    created () {
      // this.chartDataValueArray = new Array(this.dataHistoryLocal)
      // this.chartDataValueArray = new Array(1)
      // this.chartDataValueArray.fill(0)
      // this.entryLog = new Array(this.dataHistoryLocal)
      // this.entryLog.fill({ timestamp: 0, data: 0 })
    },
    mounted () {
      this.dataHistoryLocal = this.dataHistory
      this.uniqueFilter = this.uniqueFilterGlobal
      setTimeout(() => {
        this.enableAdaptiveCharting = false
      }, 10000)
    },
    methods: {
      countMessages () {
        let now = Date.now()
        if (this.messagesDeltaTime + 1000 < now) {
          this.messagesDeltaTime = now
          this.messagesPerSecondCache = this.messagesPerSecond
          this.messagesPerSecond = 0
        }
        this.messagesPerSecond += 1
      },
      processData () {
        if (this.isParent === false) {
          const newChartValues = this.dataRecords.map(item => { return item.data })
          this.chartDataValueArray.push(...newChartValues)
          if (this.dataLength > this.dataHistoryLocal) {
            const difference = this.dataLength - this.dataHistoryLocal
            this.chartDataValueArray.splice(0, difference)
          }
          this.entryLog.push(...this.dataRecords)
          if (this.entryLogLength > this.dataHistoryLocal) {
            const difference = this.entryLogLength -
              this.dataHistoryLocal
            this.entryLog.splice(0, difference)
          }
        } else {
          const newChartValues = this.dataRecords.map(item => { return item.data })
          this.chartDataValueArray.push(...newChartValues)
          if (this.dataLength > this.dataHistoryLocal) {
            const difference = this.dataLength - this.dataHistoryLocal
            this.chartDataValueArray.splice(0, difference)
          }
          this.entryLog.push(...this.rawData)
          if (this.entryLogLength > this.dataHistoryLocal) {
            const difference = this.entryLogLength - this.dataHistoryLocal
            this.entryLog.splice(0, difference)
          }
        }
        const now = Date.now()
        if ((this.deltaTime + (1000 / this.cacheDelay)) < now) {
          this.deltaTime = now
          this.entryLogCache = this.entryLog.slice(0)
          this.chartDataValueArrayCache = this.chartDataValueArray.slice(0)
        }
      },
      setBar () {
        if (this.chartType !== this.typeOptions[1]) {
          this.chartType = this.typeOptions[1]
          this.lineWidth = 0.5
          this.radius = 0
        }
      },
      setLine () {
        if (this.chartType !== this.typeOptions[0]) {
          this.chartType = this.typeOptions[0]
          this.lineWidth = 0.6
          this.radius = 0.1
          this.autoLineWidth = false
        }
      },
      adaptiveCharting () {
        if (this.dataLength > 1500 && this.isBinary && this.dataSetLength > 3) {
          this.fill = true
        } else if (this.dataLength < 800) {
          this.fill = false
        }
        if (this.dataLength < 2000 && this.chartType !== this.typeOptions[2]) {
          this.isBinary = true
          this.setBar()
        } else {
          if (this.chartType !== this.typeOptions[0] && !this.isParent && this.dataLength < 1000) {
            this.setLine()
          }
        }
        if (!this.isBinary && this.dataLength < 300) {
          this.isBinary = false
          this.setLine()
        }
      },
      rawStringLength (input) {
        return input.toString(16).length
      },
    },
  }
</script>
