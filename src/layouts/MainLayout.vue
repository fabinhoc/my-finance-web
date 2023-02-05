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
            <div class="col-1 column items-end" style="margin-top: -30px">
              <q-btn round flat icon="add"></q-btn>
            </div>
          </q-item-label>

          <MenuNotebook
            v-for="notebook in notebooks"
            :key="notebook.id"
            v-bind="notebook"
          />

          <q-item-label header>
            {{ $t('menu.tags') }}
            <div class="col-1 column items-end" style="margin-top: -30px">
              <q-btn round flat icon="add"></q-btn>
            </div>
          </q-item-label>

          <MenuTag v-for="tag in tags" :key="tag.id" v-bind="tag" />
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
import useTagService from 'src/services/Tag.service';
import { TagType } from 'src/types/Tag.type';
import MenuTag from 'src/components/MenuTag.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    SelectLanguage,
    MenuNotebook,
    MenuTag,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const authService = useAuthService();
    const router = useRouter();
    const { user } = useAuthStore();
    const notebookService = useNotebookService();
    const tagService = useTagService();
    let notebooks = ref<NotebookType[]>([]);
    let tags = ref<TagType[]>([]);

    const handleLogout = async () => {
      await authService.logout();
      router.push({ name: 'login' });
    };

    onMounted(async () => {
      notebooks.value = await notebookService.all();
      tags.value = await tagService.all();
      console.log(tags.value);
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      handleLogout,
      user,
      notebooks,
      tags,
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
