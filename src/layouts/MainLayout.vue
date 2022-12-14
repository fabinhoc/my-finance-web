<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-icon name="attach_money" />
          <span class="text-uppercase text-subtitle2">
            {{ $t('app.projectName') }}
          </span>
        </q-toolbar-title>

        <SelectLanguage />

        <q-btn icon="account_circle" flat round />
        <q-btn
          icon="logout"
          flat
          round
          aria-label="Logout"
          @click="handleLogout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-img
        class="absolute-top"
        src="/src/assets/bg-user.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">{{ user.name }}</div>
          <div>{{ user.email }}</div>
        </div>
      </q-img>
      <q-scroll-area class="scroll-area">
        <q-list>
          <q-item-label header>
            {{ $t('menu.notebooks') }}
          </q-item-label>

          <MenuNotebook
            v-for="notebook in notebooks"
            :key="notebook.id"
            v-bind="notebook"
          />

          <!-- <EssentialLink
            v-for="link in notebooks"
            :key="link.name"
            v-bind="link"
          /> -->
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <transition
        enter-active-class="animated fadeIn slower"
        leave-active-class="animated fadeOut slower"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import SelectLanguage from 'src/components/SelectLanguage.vue';
import useAuthService from 'src/services/auth.service';
import useNotebookService from 'src/services/Notebook.service';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth.store';
import { NotebookType } from 'src/types/Notebook.type';
import MenuNotebook from 'src/components/MenuNotebook.vue';

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    SelectLanguage,
    MenuNotebook,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const authService = useAuthService();
    const router = useRouter();
    const { user } = useAuthStore();
    const notebookService = useNotebookService();
    let notebooks = ref<NotebookType[]>([]);

    const handleLogout = async () => {
      await authService.logout();
      router.push({ name: 'login' });
    };

    onMounted(async () => {
      notebooks.value = await notebookService.all();
    });

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      handleLogout,
      user,
      notebooks,
    };
  },
});
</script>

<style scoped>
.scroll-area {
  height: calc(100% - 150px);
  margin-top: 150px;
  border-right: 1px solid #ddd;
}
</style>
