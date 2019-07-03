<template>
  <VCard
    color="transparent"
    flat
  >
    <VCardTitle primary-title>
      Quick Guide
    </VCardTitle>
    <VCardText>
      <VStepper v-model="stepperValue">
        <VStepperHeader>
          <VStepperStep
            step="1"
            :complete="stepperValue > 1"
          >
            Name of step 1
          </VStepperStep>
          <VDivider />
          <VStepperStep
            step="2"
            :complete="stepperValue > 2"
          >
            Name of step 2
          </VStepperStep>
        </VStepperHeader>
        <VStepperItems>
          <VStepperContent step="1">
            <VCard
              flat
              class="mb-5"
              height="200px"
            />
            <VBtn
              color="primary"
              @click.native="stepperValue = 2"
            >
              Continue
            </VBtn>
            <VBtn flat>
              Cancel
            </VBtn>
          </VStepperContent>
          <VStepperContent step="2">
            <VCard
              flat
              color="grey lighten-1"
              class="mb-5"
              height="200px"
            />
            <VBtn
              color="primary"
              @click.native="stepperValue = 3"
            >
              Continue
            </VBtn>
            <VBtn flat>
              Cancel
            </VBtn>
          </VStepperContent>
        </VStepperItems>
      </VStepper>
    </VCardText>
  </VCard>
</template>
<script>
  // import * as api from "./../grpc/dist/api.js";
// import "./../grpc/dist/api.js";
// import "./../grpc/client.js";
// console.log(
//   'run instance 2', api.default
// );
  export default {
    name: 'Home',
    components: {
    },
    data: () => {
      return {
        stepperValue: 0,
        response: '',
        request: '',
      }
    },
    created () {
    // this.listSignals('ChassisCANhs')
    },
    methods: {
    },
  }
</script>
