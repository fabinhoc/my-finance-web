<template>
  <q-page class="row items-center justify-evenly" align="center">
    <div class="col-md-3 col-sm-6 col-xs-10">
      <FormSignUp />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormSignUp from 'src/components/FormSignUp.vue';

export default defineComponent({
  name: 'SignUpPage',
  components: {
    FormSignUp,
  },
  setup() {
    return {};
  },
});
</script>
