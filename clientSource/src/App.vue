<template>
  <VApp
    id="sandbox"
    :dark="$store.state.dark"
  >
    <VNavigationDrawer
      v-model="primaryDrawerModel"
      :permanent="primaryDrawerType === 'permanent'"
      :temporary="primaryDrawerType === 'temporary'"
      :clipped="primaryDrawerClipped"
      :floating="primaryDrawerFloating"
      :mini-variant="primaryDrawerMini"
      absolute
      overflow
      app
    >
      <VList
        two-line
        :dense="primaryDrawerDense"
      >
        <VSubheader>
          Signal Broker
        </VSubheader>
        <VDivider />
        <VListTile
          avatar
          to="/selection"
        >
          <VListTileAvatar>
            <VIcon>
              nature
            </VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>
              Selection tree
            </VListTileTitle>
            <VListTileSubTitle>
              Choose traffic to monitor
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
        <VListTile
          avatar
          to="/monitor"
        >
          <VListTileAvatar>
            <VIcon>
              traffic
            </VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>
              Traffic Monitor
            </VListTileTitle>
            <VListTileSubTitle>
              Observe signal traffic
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
        <VListTile
          avatar
          to="/diagnostics"
        >
          <VListTileAvatar>
            <VIcon>
              bug_report
            </VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>
              Diagnostics
            </VListTileTitle>
            <VListTileSubTitle>
              Query OBD-II PIDs
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
        <VListTile
          avatar
          to="/publish"
        >
          <VListTileAvatar>
            <VIcon>
              publish
            </VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>
              Publish
            </VListTileTitle>
            <VListTileSubTitle>
              Generate traffic
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
        <!-- <VListTile
          avatar
          to="/sequences"
          disabled
        >
          <VListTileAvatar>
            <VIcon disabled>
              linear_scale
            </VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>
              Sequences
            </VListTileTitle>
            <VListTileSubTitle>
              Create signal chains
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile> -->
        <!-- <VSubheader>
          Reference
        </VSubheader>
        <VDivider />
        <VListTile
          avatar
          to="/"
          disabled
        >
          <VListTileAvatar>
            <VIcon disabled>
              school
            </VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>
              Quick Guide
            </VListTileTitle>
            <VListTileSubTitle>
              Onboarding
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
        <VListTile
          avatar
          to="/about"
          disabled
        >
          <VListTileAvatar>
            <VIcon disabled>
              help
            </VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>
              About SB
            </VListTileTitle>
            <VListTileSubTitle>
              Signal Broker
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
        <VListTile
          avatar
          to="/log"
          disabled
        >
          <VListTileAvatar>
            <VIcon disabled>
              event_note
            </VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>
              Session Log
            </VListTileTitle>
            <VListTileSubTitle>
              Event history
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile> -->
        <VSubheader>
          Settings
        </VSubheader>
        <VDivider />
        <VListTile
          avatar
          to="/interface"
        >
          <VListTileAvatar>
            <VIcon>
              settings
            </VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>
              Interface
            </VListTileTitle>
            <VListTileSubTitle>
              Layout preferences
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
        <!-- <VListTile
          avatar
          to="/controllers"
          disabled
        >
          <VListTileAvatar>
            <VIcon disabled>
              videogame_asset
            </VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>
              Controllers
            </VListTileTitle>
            <VListTileSubTitle>
              External peripherals
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
        <VListTile
          avatar
          to="/test"
        >
          <VListTileAvatar>
            <VIcon>
              settings_remote
            </VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>
              Conectivity Test
            </VListTileTitle>
            <VListTileSubTitle>
              Test the conection
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile> -->
      </VList>
    </VNavigationDrawer>
    <VToolbar
      :clipped-left="primaryDrawerClipped"
      :dense="toolbarDense"
      :flat="toolbarFlat"
      extended
    >
      <VToolbarSideIcon
        v-if="primaryDrawerType !== 'permanent'"
        @click.stop="primaryDrawerModel = !primaryDrawerModel"
      />
      <VToolbarTitle>
        {{ title }}
      </VToolbarTitle>
    </VToolbar>
    <VContent>
      <VContainer fluid>
        <VLayout
          align-center
          justify-center
        >
          <VFlex xs12>
            <RouterView />
          </VFlex>
        </VLayout>
      </VContainer>
    </VContent>
    <VFooter
      :inset="footerInset"
      app
      :absolute="footerFloating"
    >
      <span>
        <VBtn
          slot="activator"
          depressed
          :color="connectionStatus"
          @click="dialog = true"
        >
          Broker Envoy: {{ brokerServerIp }}
        </VBtn>
      </span>
    </VFooter>
    <VSnackbar
      v-model="dialog"
      bottom
      right
      multi-line
      hide-actions
      :timeout="0"
    >
      <VTextField
        v-model="brokerServerIp"
        label="Broker Envoy IP:Port"
      />
      <VBtn
        flat
        @click.native="dialog = false;"
      >
        <VIcon>
          close
        </VIcon>
      </VBtn>
    </VSnackbar>
  </VApp>
</template>
<script>
  export default {
    data: () => {
      return {
        dialog: false,
      }
    },
    computed: {
      selectedSignals: {
        get () {
          return this.$store.state.selectedSignals
        },
        set (value) {
          this.$store.commit('updateSelectedSignals', value)
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
          localStorage.setItem('signalBrokerEnvoyIP', value)
          this.$store.commit('updateBrokerServerIp', value)
        },
      },
      title: {
        get () {
          return this.$store.state.title
        },
        set (value) {
          this.$store.commit('updateTitle', value)
        },
      },
      primaryDrawerModel: {
        get () {
          return this.$store.state.primaryDrawer.model
        },
        set (value) {
          this.$store.commit('updatePrimaryDrawerModel', value)
        },
      },
      primaryDrawerType: {
        get () {
          return this.$store.state.primaryDrawer.type
        },
        set (value) {
          this.$store.commit('updatePrimaryDrawerType', value)
        },
      },
      primaryDrawerClipped: {
        get () {
          return this.$store.state.primaryDrawer.clipped
        },
        set (value) {
          this.$store.commit('updatePrimaryDrawerClipped', value)
        },
      },
      primaryDrawerFloating: {
        get () {
          return this.$store.state.primaryDrawer.floating
        },
        set (value) {
          this.$store.commit('updatePrimaryDrawerFloating', value)
        },
      },
      primaryDrawerMini: {
        get () {
          return this.$store.state.primaryDrawer.mini
        },
        set (value) {
          this.$store.commit('updatePrimaryDrawerMini', value)
        },
      },
      toolbarFlat: {
        get () {
          return this.$store.state.toolbar.flat
        },
        set (value) {
          this.$store.commit('updateToolbarFlat', value)
        },
      },
      toolbarDense: {
        get () {
          return this.$store.state.toolbar.dense
        },
        set (value) {
          this.$store.commit('updateToolbarDense', value)
        },
      },
      footerInset: {
        get () {
          return this.$store.state.footer.inset
        },
        set (value) {
          this.$store.commit('updateFooterInset', value)
        },
      },
      footerFloating: {
        get () {
          return this.$store.state.footer.floating
        },
        set (value) {
          this.$store.commit('updateFooterFloating', value)
        },
      },
      primaryDrawerDense: {
        get () {
          return this.$store.state.primaryDrawer.dense
        },
        set (value) {
          this.$store.commit('updatePrimaryDrawerDense', value)
        },
      },
    },
    mounted () {
      const envoyIP = localStorage.getItem('signalBrokerEnvoyIP')
      if (envoyIP !== null) {
        this.brokerServerIp = envoyIP
      }
    },
  }
</script>
<style>
@font-face {
  font-family: "Volvo Broad";
  font-style: normal;
  font-weight: 500;
  src: url("./assets/fonts/VolvoBroad.ttf") format("truetype");
}
.v-toolbar__title {
  font-size: 2.2rem;
  font-family: "Volvo Broad";
}
.v-list__tile__title {
  font-family: "Volvo Broad";
  font-size: 1.4rem;
  letter-spacing: 1.01px;
}
</style>
