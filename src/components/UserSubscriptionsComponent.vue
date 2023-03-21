<script lang="ts">
import SortableTableHeaderContainer from "../container/SortableTableHeaderContainer.vue";
import { formatDatePrecise, formatFullname } from "../helper/helper";

export default {
  name: "UserSubscriptionsComponent",
  components: {
    SortableTableHeaderContainer,
  },
  props: ["subscriptions"],

  setup(props: {}, { emit }: any) {
    const deleteSubscription = (author: number) => {
      emit("deleteSubscription", author);
    };
    return {
      formatDatePrecise,
      formatFullname,
      deleteSubscription,
    };
  },
};
</script>

<template>
  <div class="site-container p-12 dark:text-white">
    <div class="content-container m-auto w-full">
      <p class="page-title mb-10">
        {{ this.$t("shared.subscriptions-title") }}
      </p>
      <table class="table-list m-auto p-5">
        <thead class="table-list-head"></thead>
        <tbody>
          <tr class="table-row">
            <th>
              <SortableTableHeaderContainer
                :text="this.$t('components.subscriptions.table.author')"
                sort-param="author"
              ></SortableTableHeaderContainer>
            </th>
            <th>
              <SortableTableHeaderContainer
                :text="this.$t('shared.date_created')"
                sort-param="date_created"
              ></SortableTableHeaderContainer>
            </th>
            <th>{{ this.$t("shared.actions") }}</th>
          </tr>
          <tr
            v-for="subscription in subscriptions"
            :key="subscription.id"
            class="table-row px-2"
          >
            <td>
              {{
                formatFullname(
                  subscription.author.firstName,
                  subscription.author.lastName
                )
              }}
            </td>
            <td>{{ formatDatePrecise(subscription.dateCreated) }}</td>
            <td>
              <button
                @click="deleteSubscription(subscription.author.id)"
                class="p-2 mx-1 bg-1"
              >
                {{ this.$t("shared.unsubscribe") }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
td {
  @apply p-1;
}
</style>
