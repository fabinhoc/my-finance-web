<template>
  <q-page class="row items-center justify-evenly" align="center">
    <div class="col-md-3 col-sm-6 col-xs-10">
      <q-img src="/src/assets/logo.png" class="q-mb-lg" style="max-width: 100px"></q-img>
      <q-form class="q-gutter-y-lg" @submit.prevent="handleLogin">
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
        <q-btn type="submit" :label="$t('page.login.login')" outline rounded class="full-width" color="primary" />
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import useAuthService from 'src/services/auth.service';
import { useAuthStore } from 'src/stores/auth.store';
import { LoginType } from 'src/types/Login.type';
import { defineComponent, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const service = useAuthService()
    const router = useRouter()

    const form: Ref<LoginType> = ref({
      email: null,
      password: null
    })

    const handleLogin = async () => {
      try {
        const response = await service.login(form.value)

        if (response) {
          router.push({name: 'dashboard'})
        }
        
      } catch (error) {
        console.log(error)
      }
    }
   
    return {
      form,
      isPwd: ref(true),
      handleLogin
    }
  }
});
</script>
