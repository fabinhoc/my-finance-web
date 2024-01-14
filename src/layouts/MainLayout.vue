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

        <q-btn
          icon="account_circle"
          flat
          round
          @click="$router.push({ name: 'profile' })"
        />
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
      <q-img class="absolute-top" src="/bg-user.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">{{ user?.name }}</div>
          <div>{{ user?.email }}</div>
        </div>
      </q-img>
      <q-scroll-area class="scroll-area">
        <q-list>
          <q-item-label header>
            {{ $t('menu.notebooks') }}
            <div class="col-1 column items-end" style="margin-top: -30px">
              <q-btn round flat icon="add" @click="toggleDialog = true"></q-btn>
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
              <q-btn
                round
                flat
                icon="add"
                @click="toggleTagDialog = true"
              ></q-btn>
            </div>
          </q-item-label>

          <MenuTag
            v-for="tag in tags"
            :key="tag.id"
            v-bind="tag"
            @edit-tag="setTagToEdit"
            @remove-tag="removeTag"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component, route }">
        <transition
          enter-active-class="animated fadeIn slower"
          leave-active-class="animated fadeOut slower"
        >
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </q-page-container>

    <q-dialog
      v-model="toggleDialog"
      persistent
      :maximized="$q.platform.is.mobile"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <FormNotebook @toggle-dialog="loadNotebooks" />
    </q-dialog>

    <q-dialog
      v-model="toggleTagDialog"
      persistent
      :maximized="$q.platform.is.mobile"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <FormTag @toggle-dialog="loadTags" v-model:tag="tag" />
    </q-dialog>
  </q-layout>
</template>

<script lang="ts">
import { Ref, defineComponent, onMounted, ref, watch, computed } from 'vue';
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
import FormNotebook from 'src/components/FormNotebook.vue';
import FormTag from 'src/components/FormTag.vue';
import { useMenuStore } from 'src/stores/menu.store';
import { storeToRefs } from 'pinia';
import useNotify from 'src/composables/UseNotify';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { useTagStore } from 'src/stores/tag.store';

export default defineComponent({
  name: 'MainLayout',

  components: {
    SelectLanguage,
    MenuNotebook,
    MenuTag,
    FormNotebook,
    FormTag,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const authService = useAuthService();
    const router = useRouter();
    const user = computed(() => {
      const { user } = useAuthStore();
      return user;
    });
    const notebookService = useNotebookService();
    const tagService = useTagService();
    let notebooks = ref<NotebookType[]>([]);
    let tags = ref<TagType[]>([]);
    const toggleDialog = ref(false);
    const { setUpdateMenuNotebook } = useMenuStore();
    const { menuNotebookData } = storeToRefs(useMenuStore());
    const toggleTagDialog: Ref<boolean> = ref(false);
    const tag: Ref<TagType | undefined> = ref();
    const notify = useNotify();
    const { t } = useI18n();
    const $q = useQuasar();
    const { setIsRemovedTag } = useTagStore();

    const handleLogout = async () => {
      await authService.logout();
      router.push({ name: 'login' });
    };

    onMounted(async () => {
      loadNotebooks();
      tags.value = await tagService.all();
    });

    watch([menuNotebookData, user], async () => {
      if (menuNotebookData.value) {
        loadNotebooks();
      }
    });

    const loadNotebooks = async () => {
      notebooks.value = await notebookService.all();
      toggleDialog.value = false;
      setUpdateMenuNotebook(false);
    };

    const loadTags = async () => {
      tags.value = await tagService.all();
      toggleTagDialog.value = false;
    };

    const setTagToEdit = async (id: number) => {
      tag.value = await tagService.get(id);
      toggleTagDialog.value = true;
    };

    const removeTag = async (id: number) => {
      const title = t('page.notebook.confirmText');
      const message = t('page.notebook.confirmMessage');
      $q.dialog({
        title: title,
        message: message,
        cancel: {
          text: t('page.notebook.cancel'),
        },
        persistent: true,
      }).onOk(async () => {
        await tagService.remove(id);
        notify.success(t('success'));
        loadTags();
        setIsRemovedTag(true);
      });
    };

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      handleLogout,
      user,
      notebooks,
      tags,
      toggleDialog,
      loadNotebooks,
      toggleTagDialog,
      loadTags,
      tag,
      setTagToEdit,
      removeTag,
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
