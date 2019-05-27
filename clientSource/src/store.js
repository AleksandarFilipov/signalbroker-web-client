import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  // strict: true,
  state: {
    brokerServerIp: 'http://10.251.177.205:8081',
    // brokerServerIp: 'http://10.40.162.50:8081',
    // brokerServerIp: 'http://10.251.177.209:8081',
    // brokerServerIp: 'http://10.251.183.250:8081',
    connectionStatus: '',
    search: '',
    childMessagesPerSecond: 30,
    title: 'Signal Broker',
    dark: true,
    toolbar: {
      dense: false,
      flat: true,
    },
    primaryDrawer: {
      model: null,
      type: 'temporary',
      clipped: false,
      floating: false,
      mini: false,
      dense: true,
    },
    footer: {
      inset: true,
      floating: false,
    },
    requestHistory: [],
    selectedSignals: [],
    signalSelectionItems: [],
    signalDataList: [],
  },
  mutations: {
    updateSignalDataList (state, value) {
      state.signalDataList = value
    },
    updateSearch (state, value) {
      state.search = value
    },
    updateSignalSelectionItems (state, value) {
      state.signalSelectionItems = value
    },
    updateConnectionStatus (state, value) {
      state.connectionStatus = value
    },
    updateSelectedSignals (state, value) {
      state.selectedSignals = value
    },
    updateBrokerServerIp (state, value) {
      state.brokerServerIp = value
    },
    updateRequestHistory (state, value) {
      state.requestHistory = value
    },
    updateDark (state, value) {
      state.dark = value
    },
    updateTitle (state, value) {
      state.title = value
    },
    updateToolbarDense (state, value) {
      state.toolbar.dense = value
    },
    updateToolbarFlat (state, value) {
      state.toolbar.flat = value
    },
    updatePrimaryDrawerModel (state, value) {
      state.primaryDrawer.model = value
    },
    updatePrimaryDrawerType (state, value) {
      state.primaryDrawer.type = value
    },
    updatePrimaryDrawerClipped (state, value) {
      state.primaryDrawer.clipped = value
    },
    updatePrimaryDrawerFloating (state, value) {
      state.primaryDrawer.floating = value
    },
    updatePrimaryDrawerMini (state, value) {
      state.primaryDrawer.mini = value
    },
    updatePrimaryDrawerDense (state, value) {
      state.primaryDrawer.dense = value
    },
    updateFooterInset (state, value) {
      state.footer.inset = value
    },
    updateFooterFloating (state, value) {
      state.footer.floating = value
    },
    updateChildMessagesPerSecond (state, value) {
      state.childMessagesPerSecond = value
    },
  },
  actions: {
  },
})
