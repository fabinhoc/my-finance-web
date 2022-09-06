<template>
  <q-page class="row items-center justify-evenly" align="center">
    <div class="col-md-3 col-sm-6 col-xs-10">
      <q-img src="/src/assets/logo.png" class="q-mb-lg" style="max-width: 100px"></q-img>
      <q-form class="q-gutter-y-lg">
        <q-input v-model="form.email" :label="$t('page.login.email')" />
        <q-input v-model="form.password" :type="isPwd ? 'password' : 'text'" :label="$t('page.login.password')">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-btn :label="$t('page.login.login')" outline rounded class="full-width" color="primary" />
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const form = ref({
      'email': null,
      'password': null
    })
   
    return {
      form,
      isPwd: ref(true),
    }
  }
});
</script>
