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
                v-if="signalSelectionItems.length === 1"
                class="overflowY
                 py-4
                 pl-4
                 "
              >
                <VExpandTransition>
                  <VTreeview
                    v-model="selectedSignalsLocal"
                    :search="search"
                    itemid="id"
                    :items="signalSelectionItems"
                    selectable
                    transition
                    :open.sync="treeOpenItems"
                    return-object
                    @input="selectSignals"
                  />
                </VExpandTransition>
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
                v-for="(selection, index) in selectedSignalsChip"
                :key="index"
              >
                <VSpacer
                  v-if="selection.isParent"
                  class="my-4"
                />
                <VChip
                  v-ripple
                  small
                  :label="selection.isParent"
                  @input="remove(index)"
                >
                  {{ selection.name }}
                </VChip>
                <span
                  v-if="selection.isParent"
                  class="caption grey--text"
                > {{ selection.namespace }}</span>
                <VSpacer
                  v-if="selection.isParent"
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
                    :disabled="selectedSignalsChip === selectedSignals || signalSelectionItems.length === 0"
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
                    :disabled="selectedSignalsLength === 0 || selectedSignalsChip !== selectedSignals"
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
                    :disabled="selectedSignalsLength === 0 || selectedSignalsChip !== selectedSignals"
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
                    :disabled="selectedSignalsLength === 0 || selectedSignalsChip !== selectedSignals"
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
              label="Export/Import Presets"
            />
            <VTooltip bottom>
              <template v-slot:activator="{on}">
                <VBtn
                  class="mx-3"
                  flat
                  icon
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
  export default {
    data: () => {
      return {
        request: '',
        snackbarDisplayed: false,
        treeOpenItems: [],
        selectedSignalsLocal: [],
        selectedSignalsChip: [],
        snackbarMessage: 'Not connected',
        snackbarIcon: 'warning',
        snackbarUrl: '',
        retrievedStorage: '',
        presetName: '',
        presetState: '',
      }
    },
    computed: {
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
      remove (index) {
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
      selectSignals () {
        this.selectedSignalsChip = this.selectedSignalsLocal
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
        this.selectedSignals = this.selectedSignalsChip
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
          this.populateParents(response.getNetworkinfoList())
        } else if (err) {
          this.snackbar('error--text', 'The broker envoy is offline.', 'https://github.com/volvo-cars/signalbroker-web-client/tree/master/configuration/grpc_web')
        }
      },
      populateParents (namespaceList) {
        let globalIndex = 0
        const signals = {
          id: 'Signal Buses',
          name: 'Signal Buses',
          children: [],
        }
        namespaceList.forEach(list => {
          const exportedChild = {
            id: list.getNamespace().getName() + globalIndex,
            name: list.getNamespace().getName(),
            children: this.listNamespaceSignals(list),
          }
          globalIndex += 1
          signals.children.push(exportedChild)
        })
        this.signalSelectionItems = [signals]
      },
      listNamespaceSignals (namespaceName) {
        const frameGroup = []
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
        SystemService.listSignals(request, {}, function listSignalsCallback (err, response) {
          if (response) {
            let childIndex = 0
            const frames = response.getFrameList()
            frames.forEach(frame => {
              const frameMetaData = frame.getSignalinfo().getMetadata()
              const frameSignalId = frame.getSignalinfo().getId()
              const frameName = frameSignalId
                .getName()
              const frameChildInfo = frame.getChildinfoList()
              const frameChildGroup = []
              frameChildInfo.forEach(frameChild => {
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
                }
                childIndex += 1
                frameChildGroup.push(frameChildLabel)
              })
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
            })
          }
          if (err) {
            console.log('error', err)
          }
        })
        return frameGroup
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
</style>
