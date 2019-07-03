<template>
  <VForm
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <VTextField
      v-model="name"
      label="Name"
      :rules="nameRules"
      :counter="10"
      required
    />
    <VTextField
      v-model="email"
      label="E-mail"
      :rules="emailRules"
      required
    />
    <VSelect
      v-model="select"
      label="Item"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      required
    />
    <VCheckbox
      v-model="checkbox"
      label="Do you agree?"
      :rules="[v => !!v || 'You must agree to continue!']"
      required
    />
    <VBtn
      :disabled="!valid"
      @click="submit"
    >
      submit
    </VBtn>
    <VBtn @click="clear">
      clear
    </VBtn>
  </VForm>
</template>
<script>
  export default {
    data: () => {
      return {
        valid: true,
        name: '',
        nameRules: [v => { return !!v || 'Name is required' }, v => { return (v && v.length <= 10) || 'Name must be less than 10 characters' }],
        email: '',
        emailRules: [v => { return !!v || 'E-mail is required' }, v => { return /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(v) || 'E-mail must be valid' }],
        select: null,
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
        checkbox: false,
      }
    },
    methods: {
      submit () {
      },
      clear () {
        this.$refs.form.reset()
      },
    },
  }
</script>
