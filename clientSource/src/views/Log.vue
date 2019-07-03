<template>
  <VCard class="marginToolbar">
    <VToolbar
      card
      color="transparent"
    >
      <VIcon>
        event_note
      </VIcon>
      <VToolbarTitle>
        Session Log
      </VToolbarTitle>
    </VToolbar>
    <VDataTable
      :headers="headers"
      :items="requestHistory"
      hide-actions
      class="elevation-1"
    >
      <template
        slot="items"
        slot-scope="props"
      >
        <td>
          {{ new Date(props.item.date).toLocaleDateString() }}
        </td>
        <td>
          {{ props.item.request }}
        </td>
        <td>
          {{ props.item.response }}
        </td>
      </template>
    </VDataTable>
  </vCard>
</template>
  <script>
  export default {
    data: () => {
      return {
        headers: [{ value: 'date', text: 'Date' }, { value: 'request', text: 'Request' }, { value: 'response', text: 'Response' }],
      }
    },
    computed: {
      requestHistory: {
        get () {
          return this.$store.state.requestHistory
        },
        set (value) {
          this.$store.commit('updateRequestHistory', value)
        },
      },
    },
  }
</script>
<style>
.marginToolbar {
  margin-top: -64px;
}
</style>
