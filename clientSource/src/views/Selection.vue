<template>
  <VLayout
    row
    wrap
  >
    <VFlex
      lg8
      xl7
      xs12
      mb-5
      pb-5
    >
      <VCard class="marginToolbar">
        <VToolbar
          card
          color="transparent"
        >
          <VIcon>
            nature
          </VIcon>
          <VToolbarTitle>
            Selection tree
          </VToolbarTitle>
          <VSpacer />
        </VToolbar>
        <VLayout
          row
          wrap
        >
          <VFlex
            xs12
            sm12
            md6
          >
            <VCardText class="tree py-0 px-0">
              <VSheet
                class="mb-3 pl-3"
                color="transparent"
              >
                <VLayout row>
                  <VTextField
                    v-model.trim.lazy="search"
                    :disabled="signalSelectionItems.length === 0"
                    label="Filter busses, frames and signals"
                    flat
                    hide-details
                    clearable
                    prepend-icon="search"
                    @focus="collapseTree"
                    @blur="openTree"
                  />
                  <VTooltip bottom>
                    <template v-slot:activator="{on}">
                      <VBtn
                        icon
                        class="mt-3"
                        flat
                        v-on="on"
                        @click="fetchLists"
                      >
                        <VIcon>
                          cached
                        </VIcon>
                      </VBtn>
                    </template>
                    <span>Refresh</span>
                  </VTooltip>
                </VLayout>
              </VSheet>
              <VDivider class="hidden-md-and-up" />
              <VSheet
                v-if="signalSelectionItems.length > 0"
                ref="signal-list"
                class="overflowY
                 py-4
                 pl-4
                 "
              >
                <!--
                <VExpandTransition>
                <VTreeview
                  itemid="id"
                  :items="filteredSignals.slice(0,100)"
                  selectable
                  transition
                  :open.sync="treeOpenItems"
                  return-object
                  open-all
                  loading-icon="search"
                  @input="selectSignals"
                />
                -->
                <VirtualList
                  :size="52"
                  :remain="10"
                >
                  <div
                    v-for="(signal, index) in filteredSignals"
                    :key="index"
                    name="000"
                    class="d-flex"
                  >
                    <div>
                      <VCheckbox
                        :name="index"
                        :input-value="signalIsSelected(signal.id)"
                        class="mx-2 my-1"
                        :label="signal.name"
                        :messages="signal.namespace"
                        @change="selectSignals(signal)"
                      />
                    </div>
                    <span class="description">{{ signal.name }}</span>
                  </div>
                </VirtualList>
                <!--
                </VExpandTransition>
                -->
              </VSheet>
              <VCardText
                v-else
                pt-3
              >
                <VContainer>
                  <VLayout
                    align-center
                    justify-center
                  >
                    <VIcon
                      large
                      disabled
                    >
                      sync_problem
                    </VIcon>
                  </VLayout>
                </VContainer>
              </VCardText>
            </VCardText>
          </VFlex>
          <VFlex
            xs12
            sm12
            md6
            class=""
          >
            <VDivider class="hidden-md-and-up" />
            <div
              v-if="selectedSignalsLocalLength === 0"
              key="title"
              class="title font-weight-light grey--text pa-3 text-xs-center mt-2"
            >
              Select signals/frames to be analyzed and controlled
            </div>
            <div
              v-else
              class="px-3 pb-5 pt-3 overflowY2"
            >
              <span
                v-for="(selection, index) in selectedSignalsLocal"
                :key="index"
              >
                <VSpacer
                  class="my-2"
                />
                <VChip
                  v-ripple
                  small
                  close
                  @input="remove(index)"
                >
                  {{ selection.name }}
                </VChip>
                <span
                  class="caption grey--text"
                > {{ selection.namespace }}</span>
                <VSpacer
                  class="my-0"
                />
              </span>
            </div>
          </VFlex>
        </VLayout>
        <VDivider />
        <VCardActions>
          <VLayout
            row
            wrap
          >
            <VSpacer />
            <VTooltip bottom>
              <template v-slot:activator="{on}">
                <VBtn
                  :disabled="selectedSignalsLocalLength === 0"
                  flat
                  class="mx-1"
                  v-on="on"
                  @click="clear"
                >
                  <VIcon>
                    clear_all
                  </VIcon>
                </VBtn>
              </template>
              <span>Clear selection</span>
            </VTooltip>
            <div class="mx-1">
              <VTooltip bottom>
                <template v-slot:activator="{on}">
                  <VBtn
                    :disabled="JSON.stringify(selectedSignalsLocal) === JSON.stringify(selectedSignals) || signalSelectionItems.length === 0"
                    color="success"
                    depressed
                    v-on="on"
                    @click="saveSignalState"
                  >
                    <VIcon>
                      save
                    </VIcon>
                  </VBtn>
                </template>
                <span>Save</span>
              </VTooltip>
            </div>
            <div class="mx-1">
              <VTooltip bottom>
                <template v-slot:activator="{on}">
                  <VBtn
                    :disabled="selectedSignalsLength === 0 || JSON.stringify(selectedSignalsLocal) !== JSON.stringify(selectedSignals)"
                    color="info"
                    depressed
                    to="monitor"
                    v-on="on"
                  >
                    <VIcon>
                      traffic
                    </VIcon>
                  </VBtn>
                </template>
                <span>Traffic monitor</span>
              </VTooltip>
            </div>
            <div class="mx-1">
              <VTooltip bottom>
                <template v-slot:activator="{on}">
                  <VBtn
                    :disabled="selectedSignalsLength === 0 || JSON.stringify(selectedSignalsLocal) !== JSON.stringify(selectedSignals)"
                    color="info"
                    depressed
                    to="diagnostics"
                    v-on="on"
                  >
                    <VIcon>
                      bug_report
                    </VIcon>
                  </VBtn>
                </template>
                <span>Diagnostics</span>
              </VTooltip>
            </div>
            <div class="mx-1">
              <VTooltip bottom>
                <template v-slot:activator="{on}">
                  <VBtn
                    :disabled="selectedSignalsLength === 0 || JSON.stringify(selectedSignalsLocal) !== JSON.stringify(selectedSignals)"
                    color="info"
                    depressed
                    to="publish"
                    v-on="on"
                  >
                    <VIcon>
                      publish
                    </VIcon>
                  </VBtn>
                </template>
                <span>Publish</span>
              </VTooltip>
            </div>
          </VLayout>
        </VCardActions>
      </VCard>
    </VFlex>
    <VFlex
      lg3
      offset-lg1
      xl4
      offset-xl1
      xs12
    >
      <VCard class="marginToolbar">
        <VToolbar
          card
          color="transparent"
        >
          <VIcon>
            library_books
          </VIcon>
          <VToolbarTitle>
            Selection presets
          </VToolbarTitle>
          <VSpacer />
        </VToolbar>
        <VContainer>
          <VLayout
            row
            wrap
          >
            <VFlex>
              <VTextField
                v-model="presetName"
                label="Preset name"
              />
            </VFlex>
            <VFlex
              shrink
            >
              <div class="mx-1">
                <VTooltip bottom>
                  <template v-slot:activator="{on}">
                    <VBtn
                      color="success"
                      :disabled="presetName === ''"
                      depressed
                      v-on="on"
                      @click="savePreset"
                    >
                      <VIcon>
                        library_add
                      </VIcon>
                    </VBtn>
                  </template>
                  <span>Add preset</span>
                </VTooltip>
              </div>
            </VFlex>
            <VFlex
              xs12
              my-5
            >
              <VChip
                v-for="(preset, index) in retrievedStorage.presets"
                :key="index"
                close
                @click="selectPreset(preset)"
                @input="remove(index)"
              >
                {{ preset.name }}
              </VChip>
            </VFlex>
          </VLayout>
        </VContainer>
        <VDivider />
        <VCardActions>
          <VLayout
            row
            wrap
          >
            <VTextField
              v-model.trim="presetState"
              hide-actions
              hide-details
              class="ml-3 mb-3"
              label="Import/Export Presets"
            />
            <VTooltip bottom>
              <template v-slot:activator="{on}">
                <VBtn
                  class="mx-3"
                  flat
                  large
                  v-on="on"
                  @click="savePresets"
                >
                  <VIcon large>
                    import_export
                  </VIcon>
                </VBtn>
              </template>
              <span>Import/Export presets</span>
            </VTooltip>
          </VLayout>
        </VCardActions>
      </VCard>
    </VFlex>
    <VSnackbar
      v-model="snackbarDisplayed"
      bottom
      right
      color="error"
      :timeout="8000"
    >
      <VLayout>
        <VIcon left>
          {{ snackbarIcon }}
        </VIcon>
        {{ snackbarMessage }}
      </VLayout>
      <VBtn
        v-if="snackbarUrl.length > 1"
        flat
        :href="snackbarUrl"
      >
        <VIcon>
          help
        </VIcon>
      </VBtn>
      <VBtn
        flat
        @click.native="value = false"
      >
        <VIcon>
          close
        </VIcon>
      </VBtn>
    </VSnackbar>
  </VLayout>
</template>
<script>
  import './../grpc/dist/api.js'
  import virtualList from 'vue-virtual-scroll-list'
  export default {
    components: { 'VirtualList': virtualList },
    data: () => {
      return {
        request: '',
        snackbarDisplayed: false,
        treeOpenItems: [],
        selectedSignalsLocal: [],
        snackbarMessage: 'Not connected',
        snackbarIcon: 'warning',
        snackbarUrl: '',
        retrievedStorage: '',
        presetName: '',
        presetState: '',
      }
    },
    computed: {
      filteredSignals () {
        return this.signalSelectionItems.filter((signal) => {
          return signal.id.toLowerCase().includes(this.search ? this.search.toLowerCase() : '')
        })
      },
      selectedSignalsLength () {
        return this.selectedSignals.length
      },
      selectedSignalsLocalLength () {
        return this.selectedSignalsLocal.length
      },
      search: {
        get () {
          return this.$store.state.search
        },
        set (value) {
          this.$store.commit('updateSearch', value)
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
      signalSelectionItems: {
        get () {
          return this.$store.state.signalSelectionItems
        },
        set (value) {
          this.$store.commit('updateSignalSelectionItems', value)
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
      if (this.signalSelectionItems.length === 0) {
        this.fetchLists()
      }
      this.reset()
      this.selectedSignalsLocal = this.selectedSignals
      this.getPresets()
      this.savePresets()
    },
    methods: {
      deepCopyArrOfObjects (arr) {
        return arr.map(obj => {
          return JSON.parse(JSON.stringify(obj))
        })
      },
      signalIsSelected (id) {
        return this.selectedSignalsLocal.filter(signal => {
          return signal.id === id
        }).length
      },
      remove (index) {
        this.selectedSignalsLocal = this.selectedSignalsLocal.slice(0, index).concat(this.selectedSignalsLocal.slice(index + 1))
        this.retrievedStorage.presets.splice(index, 1)
        this.updatePresetState()
      },
      getPresets () {
        if (localStorage.getItem('signalBroker') !== null) {
          this.retrievedStorage = JSON.parse(localStorage.getItem('signalBroker'))
        } else {
          const signalBroker = { presets: [] }
          this.retrievedStorage = signalBroker
        }
      },
      savePreset () {
        const existingPresetIndex = this.retrievedStorage.presets.findIndex((preset) => { return preset.name === this.presetName })
        if (existingPresetIndex === -1) {
          this.retrievedStorage.presets.push({ name: this.presetName, signals: this.selectedSignalsLocal })
        } else {
          this.retrievedStorage.presets[existingPresetIndex].signals = this.selectedSignalsLocal
        }
        this.updatePresetState()
      },
      updatePresetState () {
        const stringified = JSON.stringify(this.retrievedStorage)
        this.presetState = stringified
        localStorage.setItem('signalBroker', stringified)
      },
      selectPreset (preset) {
        this.selectedSignalsLocal = preset.signals
        this.presetName = preset.name
      },
      savePresets () {
        if (this.presetState === '') {
          const stringified = JSON.stringify(this.retrievedStorage)
          this.presetState = stringified
        } else {
          this.retrievedStorage = JSON.parse(this.presetState)
        }
      },
      collapseTree () {
        this.treeOpenItems = []
      },
      openTree () {
        const resultingArray = []
        resultingArray.push({ name: 'CAN Buses', id: 'CAN Buses', children: [] })
        this.selectedSignalsLocal.forEach(signal => {
          resultingArray[0].children.push({ name: signal.name, id: signal.id, children: signal.children })
        })
        this.treeOpenItems = resultingArray
      },
      // Checkbox changed in the signal view
      selectSignals (signal) {
        if (!signal) return
        if (this.selectedSignalsLocal.filter(localSignal => {
          return signal.id === localSignal.id
        }).length) {
          const indexOfSignal = this.selectedSignalsLocal.map(s => { return s.id }).indexOf(signal.id)
          this.selectedSignalsLocal = this.selectedSignalsLocal.slice(0, indexOfSignal).concat(this.selectedSignalsLocal.slice(indexOfSignal + 1))
        } else {
          this.selectedSignalsLocal = [...this.deepCopyArrOfObjects(this.selectedSignalsLocal), JSON.parse(JSON.stringify(signal))]
        }
      },
      clear () {
        // this.search = null;
        this.selectedSignalsLocal = []
      },
      reset () {
        const resultingArray = []
        resultingArray.push({ name: 'Signal Buses', id: 'Signal Buses', children: [] })
        this.selectedSignals.forEach(signal => {
          resultingArray[0].children.push({ name: signal.name, id: signal.id, children: signal.children })
        })
        this.treeOpenItems = resultingArray
      },
      snackbar (color, snackbarMessage, url) {
        this.connectionStatus = color
        this.snackbarMessage = snackbarMessage
        this.snackbarDisplayed = true
        if (url) {
          this.snackbarUrl = url
        } else {
          this.snackbarUrl = ''
        }
      },
      saveSignalState () {
        this.selectedSignals = this.deepCopyArrOfObjects(this.selectedSignalsLocal)
      },
      fetchLists () {
        this.request = 'Fetch lists'
        // eslint-disable-next-line no-undef
        const SystemService = new api.default.SystemServiceClient(this.brokerServerIp)
        // eslint-disable-next-line no-undef
        const request = new api.default.Empty()
        SystemService.getConfiguration(request, {}, this.fetchListsCallback)
      },
      fetchListsCallback (err, response) {
        if (response) {
          if (this.connectionStatus !== 'success--text') {
            this.connectionStatus = 'success--text'
          }
          response.getNetworkinfoList().forEach(namespace => {
            this.listNamespaceSignals(namespace)
          })
        } else if (err) {
          this.snackbar('error--text', 'The broker envoy is offline.', 'https://github.com/volvo-cars/signalbroker-web-client/tree/master/configuration/grpc_web')
        }
      },
      listNamespaceSignals (namespaceName) {
        const frameGroup = []
        const signalIds = {}
        const parentName = namespaceName.getNamespace().getName()
        this.request = 'Fetch signals'
        // eslint-disable-next-line no-undef
        const SystemService = new api.default.SystemServiceClient(this.brokerServerIp)
        // eslint-disable-next-line no-undef
        const request = new api.default.NameSpace()
        request.setName(parentName)
        if (this.connectionStatus !== 'success--text') {
          this.connectionStatus = 'success--text'
        }
        this.requestHistory.push({ date: Date.now(), request: this.request, response: 'List signals' })
        SystemService.listSignals(request, {}, (err, response) => {
          if (response) {
            let childIndex = 0
            const frames = response.getFrameList()
            frames.forEach(frame => {
              // const frameMetaData = frame.getSignalinfo().getMetadata()
              const frameSignalId = frame.getSignalinfo().getId()
              // eslint-disable-next-line
              // debugger
              // const frameName = frameSignalId
              //  .getName()
              const frameChildInfo = frame.getChildinfoList()
              // const frameChildGroup = []
              frameChildInfo.forEach(frameChild => {
                // eslint-disable-next-line
                // debugger
                const frameChildSignalId = frameChild.getId()
                const frameChildMetaData = frameChild.getMetadata()
                const frameChildName = frameChildSignalId.getName()
                const frameChildLabel = {
                  id: parentName + frameChildName + childIndex,
                  name: frameChildName,
                  namespace: parentName,
                  children: [],
                  signalId: frameChildSignalId,
                  min: frameChildMetaData.getMin(),
                  max: frameChildMetaData.getMax(),
                  size: frameChildMetaData.getSize(),
                  unit: frameChildMetaData.getUnit(),
                  description: frameChildMetaData.getDescription(),
                  isParent: false,
                  frameSignalId,
                }
                // eslint-disable-next-line
                // debugger
                childIndex += 1
                // frameChildGroup.push(frameChildLabel)
                if (!signalIds[frameChildLabel.signalId]) {
                  signalIds[frameChildLabel.signalId] = true
                  frameGroup.push(frameChildLabel)
                }
                // frameGroup.push(frameChildLabel)
              })
              /*
              frameGroup.push({
                id: parentName + frameName + childIndex,
                name: frameName,
                namespace: parentName,
                children: frameChildGroup,
                signalId: frameSignalId,
                min: frameMetaData.getMin(),
                max: frameMetaData.getMax(),
                size: frameMetaData.getSize(),
                unit: frameMetaData.getUnit(),
                description: frameMetaData.getDescription(),
                isParent: true,
              })
              childIndex += 1
              */
            })
          }
          if (err) {
            console.log('error', err)
          } else {
            this.signalSelectionItems = [...this.deepCopyArrOfObjects(this.signalSelectionItems), ...this.deepCopyArrOfObjects(frameGroup)]
          }
        })
      },
    },
  }
</script>
<style scoped>
.overflowY {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: calc(88vh - 180px);
}
.overflowY2 {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: calc(88vh - 106px);
}
.marginToolbar {
  margin-top: -64px;
}
.tree {
  overflow-x: visible;
}
.description {
  color: #bbb;
  font-size: 12px;
  text-align: right;
  padding-top: 8px;
}
</style>
