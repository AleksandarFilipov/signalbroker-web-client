<template>
  <VFadeTransition>
    <VFlex
      v-if="visible || highlight"
      xs12
      sm6
      md4
      lg3
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
            :value="chartDataValueArray"
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
                {{ data.data }}
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
                  v-for="(byte, i) in raw"
                  :key="i"
                >
                  <span v-if="(rawStringLength(byte) < 2)">0</span>{{ byte | rawStringFilter }}
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
                color="grey"
              >
                view_list
              </VIcon>
              <VIcon
                small
                color="grey"
              >
                {{ showLog ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
              </VIcon>
            </VBtn>
            <VBtn
              block
              flat
              @click="showAdditionalInfo = !showAdditionalInfo"
            >
              <VIcon
                small
                color="grey"
              >
                info
              </VIcon>
              <VIcon
                small
                color="grey"
              >
                {{ showAdditionalInfo ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
              </VIcon>
            </VBtn>
            <VBtn
              block
              flat
              @click="showConfiguration = !showConfiguration"
            >
              <VIcon
                small
                color="grey"
              >
                settings
              </VIcon>
              <VIcon
                small
                color="grey"
              >
                {{ showConfiguration ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
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
              v-if="visible || highlight"
              :items="entryLog"
              item-key="id"
              :pagination.sync="pagination"
              hide-headers
            >
              <template v-slot:items="props">
                <tr class="monoSpace text-uppercase grey--text text--lighten-1">
                  <td class="px-3">
                    {{ props.item.id | toDate }}
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
                      <span v-if="(rawStringLength(byte) < 2)">0</span>{{ byte | rawStringFilter }}
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
              v-if="visible || highlight"
              dense
              class="grey--text text--lighten-2"
            >
              <VListTile>
                <VListTileContent>
                  Description:
                </VListTileContent>
                <VListTileContent class="align-end">
                  {{ description }}
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
              <VListTile v-if="!isParent">
                <VListTileContent>
                  Min:
                </VListTileContent>
                <VListTileContent class="align-end">
                  {{ min }}
                </VListTileContent>
              </VListTile>
              <VListTile v-if="!isParent">
                <VListTileContent>
                  Max:
                </VListTileContent>
                <VListTileContent class="align-end">
                  {{ max }}
                </VListTileContent>
              </VListTile>
              <VListTile v-if="!isParent">
                <VListTileContent>
                  Unit:
                </VListTileContent>
                <VListTileContent class="align-end">
                  {{ unit }}
                </VListTileContent>
              </VListTile>
              <VListTile v-if="!isParent">
                <VListTileContent>
                  Size:
                </VListTileContent>
                <VListTileContent class="align-end">
                  {{ size }}
                </VListTileContent>
              </VListTile>
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
              v-if="visible || highlight"
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
                          max="800"
                          min="2"
                          step="1"
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
                          max="32"
                          min="0.1"
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
                          max="10"
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
                          max="32"
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
    name: 'SignalCard',
    filters: {
      toDate (input) {
        const date = new Date(input / 1000)
        return date.toLocaleTimeString({}, { hour12: false })
      },
      toString (input) {
        return input.toString()
      },
      rawStringFilter (input) {
        return input.toString(16)
      },
    },
    props: {
      name: { type: String, default: null },
      dataType: { type: String, default: null },
      nameSpace: { type: String, default: null },
      unit: { type: String, default: null },
      description: { type: String, default: null },
      data: { type: Object, default: null },
      dataHistory: { type: Number, default: null },
      min: { type: Number, default: null },
      max: { type: Number, default: null },
      size: { type: Number, default: null },
      uniqueFilterGlobal: { type: Number, default: null },
      raw: { type: [String, Uint8Array], default: null },
      highlight: { type: Boolean },
    },
    data () {
      return {
        pagination: {
          sortBy: 'id',
          descending: true,
        },
        showAdditionalInfo: false,
        showConfiguration: false,
        entryLog: [],
        showLog: false,
        animate: false,
        drawDuration: 100,
        radius: 2,
        padding: 6,
        dataHistoryLocal: 2,
        lineWidth: 2.2,
        chartHeight: 64,
        chartType: 'trend',
        typeOptions: ['trend', 'bar'],
        chartDataValueArray: [],
        fill: false,
        lastUpdate: '',
        isParent: false,
        isBinary: false,
        autoLineWidth: false,
        uniqueFilter: 0,
      }
    },
    computed: {
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
        return new Set(this.chartDataValueArray)
      },
      visible () {
        if (this.dataSetLength < this.uniqueFilter && this.uniqueFilter > 1 && this.dataLength > 1) {
          return false
        } else {
          return true }
      },
    },
    watch: {
      uniqueFilterGlobal () {
        this.uniqueFilter = this.uniqueFilterGlobal
      },
      data () {
        if (this.isParent === false) {
          if (this.raw.length > 5) {
            this.isParent = true
          }
          this.chartDataValueArray.push(this.data.data)
          if (this.dataLength > this.dataHistoryLocal) {
            const difference = this.dataLength - this.dataHistoryLocal
            this.chartDataValueArray.splice(0, difference)
          }
          this.entryLog.push({ id: this.data.timestamp, data: this.data.data })
          if (this.entryLogLength > this.dataHistoryLocal) {
            const difference = this.entryLogLength - this.dataHistoryLocal
            this.entryLog.splice(0, difference)
          }
        }
        if (this.dataLength > 86 && this.isBinary && this.dataSetLength > 3) {
          this.fill = true
        } else if (this.dataLength < 87) {
          this.fill = false
        }
        if (!this.isBinary && this.dataLength < 60 && this.chartType !== this.typeOptions[2]) {
          this.isBinary = true
          this.setBar()
        } else {
          if (this.chartType !== this.typeOptions[0] && !this.isParent) {
            this.setLine()
          }
        }
        if (!this.isBinary && this.dataLength < 90) {
          this.isBinary = false
          this.setLine()
        }
      },
      dataHistory () {
        this.dataHistoryLocal = this.dataHistory
        if (this.chartType === this.typeOptions[1] && this.dataHistoryLocal < 30) {
          this.autoLineWidth = true
        } else {
          this.autoLineWidth = false
        }
      },
      raw () {
        if (this.isParent) {
          this.chartDataValueArray.push(this.data.data)
          if (this.dataLength > this.dataHistoryLocal) {
            const difference = this.dataLength - this.dataHistoryLocal
            this.chartDataValueArray.splice(0, difference)
          }
          this.entryLog.push({ id: this.data.timestamp, data: this.raw })
          if (this.entryLogLength > this.dataHistoryLocal) {
            const difference = this.entryLogLength - this.dataHistoryLocal
            this.entryLog.splice(0, difference)
          }
        }
      },
    },
    created () {
      this.chartDataValueArray = new Array(this.dataHistoryLocal)
      // this.chartDataValueArray = new Array(1)
      this.chartDataValueArray.fill(0)
      this.entryLog = new Array(this.dataHistoryLocal)
      this.entryLog.fill({ id: 0, data: 0 })
    },
    methods: {
      setBar () {
        if (this.chartType !== this.typeOptions[1]) {
          this.chartType = this.typeOptions[1]
          this.lineWidth = 4
          this.radius = 0
        }
      },
      setLine () {
        if (this.chartType !== this.typeOptions[0]) {
          this.chartType = this.typeOptions[0]
          this.lineWidth = 1.8
          this.radius = 2
          this.autoLineWidth = false
        }
      },
      rawStringLength (input) {
        return input.toString(16).length
      },
    },
  }
</script>
