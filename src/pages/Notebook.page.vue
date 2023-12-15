<template>
  <q-page padding>
    <q-card bordered flat>
      <q-card-section>
        <NotebookPageCardTitle
          :title="notebook?.name"
          :description="notebook?.description"
          :id="notebook?.id ?? 0"
          @edit-notebook="dialogNotebook = true"
          @remove-notebook="deleteNotebook"
        />
      </q-card-section>
      <q-separator class="q-mt-md" inset />
      <q-card-section>
        <CarouselYear />
      </q-card-section>
      <q-separator
        class="centered"
        size="2px"
        width="35%"
        style="margin: 0 auto"
      />
      <q-card-section>
        <CarouselMonth />
      </q-card-section>
      <q-separator
        class="centered"
        size="2px"
        width="35%"
        style="margin: 0 auto"
      />
      <q-card-section padding class="q-mt-lg">
        <transition
          enter-active-class="animated backInLeft slower"
          leave-active-class="animated backOutRight slower"
        >
          <TableBills
            v-show="showBills"
            :bills="bills"
            @edit-bill-event="setBillToEdit"
            @delete-bill-event="deleteBill"
            @mark-bill-as-paid="markBillAsPaid"
          />
        </transition>
      </q-card-section>
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="warning" @click="setNewBill()" />
    </q-page-sticky>

    <q-dialog
      v-model="toggleDialog"
      persistent
      :maximized="$q.platform.is.mobile"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <FormBill @toggleDialog="setToggleDialog" :bill="billToEdit" />
    </q-dialog>

    <q-dialog
      v-model="dialogNotebook"
      persistent
      :maximized="$q.platform.is.mobile"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <FormNotebook @toggleDialog="toogleNotebookDialog" :notebook="notebook" />
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from 'vue';
import CarouselYear from 'src/components/CarouselYear.vue';
import CarouselMonth from 'src/components/CarouselMonth.vue';
import NotebookPageCardTitle from 'src/components/NotebookPageCardTitle.vue';
import { storeToRefs } from 'pinia';
import { useMonth } from 'src/stores/month.store';
import { useYear } from 'src/stores/year.store';
import useBillService from 'src/services/Bill.service';
import { useRoute, useRouter } from 'vue-router';
import lodash from 'lodash';
import TableBills from 'src/components/TableBills.vue';
import { TaggableBillType } from 'src/types/TaggableBill.type';
import { BillType } from 'src/types/Bill.type';
import { MonthType } from 'src/types/Month.type';
import FormBill from 'src/components/FormBill.vue';
import dateHelper from 'src/helpers/date.helper';
import { useQuasar } from 'quasar';
import useNotify from 'src/composables/UseNotify';
import { useI18n } from 'vue-i18n';
import FormNotebook from 'src/components/FormNotebook.vue';
import { NotebookType } from 'src/types/Notebook.type';
import useNotebookService from 'src/services/Notebook.service';
import { useMenuStore } from 'src/stores/menu.store';
import { useTagStore } from 'src/stores/tag.store';

export default defineComponent({
  name: 'NotebookPage',
  components: {
    CarouselYear,
    CarouselMonth,
    NotebookPageCardTitle,
    TableBills,
    FormBill,
    FormNotebook,
  },
  setup() {
    const slide = ref('style');
    const { month } = storeToRefs(useMonth());
    const { year } = storeToRefs(useYear());
    const route = useRoute();
    const billService = useBillService();
    const notebookService = useNotebookService();
    const bills: Ref<TaggableBillType[]> = ref([]);
    const showBills: Ref<boolean> = ref(false);
    const toggleDialog: Ref<boolean> = ref(false);
    const billToEdit: Ref<BillType | undefined> = ref();
    const $q = useQuasar();
    const notify = useNotify();
    const { t, locale } = useI18n();
    const dialogNotebook: Ref<boolean> = ref(false);
    const notebook: Ref<NotebookType | undefined> = ref();
    const router = useRouter();
    const { setUpdateMenuNotebook } = useMenuStore();
    const { isRemovedTag } = storeToRefs(useTagStore());
    const { setIsRemovedTag } = useTagStore();

    onMounted(() => {
      if (month.value) {
        setBills(month.value, year.value);
      }
      loadNotebook();
    });

    watch(
      [month, year, isRemovedTag],
      async ([newMonthValue, newYearValue]) => {
        if (newMonthValue || isRemovedTag) {
          setBills(newMonthValue, newYearValue);
          setIsRemovedTag(false);
        }
      }
    );

    const setBills = async (month: MonthType, year: number) => {
      showBills.value = false;
      const { monthInNumber } = month;
      const notebookId: string =
        typeof route.params.id === 'object'
          ? route.params.id[0]
          : route.params.id;
      const response: BillType[] =
        await billService.findByNotebookIdAndYearAndMonth(
          parseInt(notebookId),
          year,
          monthInNumber
        );
      bills.value = response.filter((bill: BillType) => {
        return bill.tag_id === null;
      });
      const taggableBills = getTaggableBills(response);
      const groupedBills = getGroupedBillsByTag(taggableBills);
      for (let tagId in groupedBills) {
        bills.value.push(inverseTaggableBills(groupedBills[tagId]));
      }
      bills.value = lodash.orderBy(bills.value, ['name'], ['asc']);
      showBills.value = true;
    };

    const getTaggableBills = (bills: BillType[]) => {
      return bills.filter((bill: BillType) => {
        return bill.tag_id !== null;
      });
    };

    const getGroupedBillsByTag = (bills: BillType[]) => {
      return lodash.groupBy(bills, (bill: BillType) => bill.tag?.id);
    };

    const inverseTaggableBills = (bills: any) => {
      const isPaidBills = bills.every((bill: BillType) => {
        return bill.is_paid === true;
      });
      const lessDueDate = lodash.orderBy(bills, ['due_date'], ['asc']);
      const totalPriceBills = lodash.sumBy(bills, (bill: BillType) => {
        return parseFloat(bill.price);
      });
      const totalPaid = lodash.sumBy(bills, (bill: BillType) => {
        return parseFloat(bill.total_paid);
      });

      return {
        id: bills[0].tag.id,
        is_paid: isPaidBills,
        name: bills[0].tag.name,
        due_date: lessDueDate[0].due_date,
        price: totalPriceBills.toFixed(2),
        tag_id: bills[0].tag.id,
        color: bills[0].tag.color,
        total_paid: totalPaid,
        bills: bills,
      } as TaggableBillType;
    };

    const setToggleDialog = (toggle) => {
      toggleDialog.value = toggle;
      setBills(month.value, year.value);
    };

    const setBillToEdit = async (id: number) => {
      const output = await billService.get(id);
      output.due_date = dateHelper.formatDateToText(
        output.due_date,
        locale.value
      );
      billToEdit.value = output;
      toggleDialog.value = true;
    };

    const setNewBill = () => {
      toggleDialog.value = true;
      billToEdit.value = undefined;
    };

    const deleteBill = (id: number) => {
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
        await billService.remove(id);
        setBills(month.value, year.value);
        notify.success(t('notify.billRemoved'));
      });
    };

    const markBillAsPaid = async (id: number) => {
      try {
        const payload = {
          is_paid: true,
        };
        await billService.put(id, payload);
        setBills(month.value, year.value);
        notify.success(t('success'));
      } catch (error: any) {
        if (error.response) {
          notify.error(error.response.data.message);
          return;
        }
        let message = error.message;
        if (error.message === 'Network Error') {
          message = t('errors.network');
        }
        notify.error(message);
      }
    };

    const loadNotebook = async () => {
      const notebookId: number =
        typeof route.params.id === 'object'
          ? parseInt(route.params.id[0])
          : parseInt(route.params.id);
      const response: NotebookType = await notebookService.get(notebookId);
      notebook.value = response;
    };

    const toogleNotebookDialog = () => {
      dialogNotebook.value = false;
      loadNotebook();
    };

    const deleteNotebook = () => {
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
        if (notebook.value) {
          await notebookService.remove(notebook.value.id);
          notify.success(t('success'));
          router.push({ name: 'dashboard' });
          setUpdateMenuNotebook(true);
        }
      });
    };

    return {
      slide,
      bills,
      showBills,
      toggleDialog,
      setToggleDialog,
      setBillToEdit,
      billToEdit,
      setNewBill,
      deleteBill,
      markBillAsPaid,
      dialogNotebook,
      loadNotebook,
      toogleNotebookDialog,
      notebook,
      deleteNotebook,
    };
  },
});
</script>
