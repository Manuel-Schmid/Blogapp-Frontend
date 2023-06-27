<script lang="ts">
import { formatDateShort } from "../helper/helper";
import { Status } from "../api/models";
import PaginationComponent from "./PaginationComponent.vue";
import SortableTableHeaderContainer from "../container/SortableTableHeaderContainer.vue";
import { useRoute } from "vue-router";
import router from "../router/router";

export default {
  name: "AuthorRequestOverviewComponent",
  components: {
    PaginationComponent,
    SortableTableHeaderContainer,
  },
  props: ["authorRequestsData", "activePage"],
  setup(props: {}, { emit }: any) {
    const updateAuthorRequest = (user: string, status: Status) => {
      emit("updateAuthorRequest", user, status);
    };
    const route = useRoute();
    let selectedFilter = route.query.status ? String(route.query.status) : "";

    const onFilterChange = (event: any) => {
      const status = event.target.value;
      const query = { ...route.query, status: status ? status : undefined };

      router.push({
        name: String(route.name),
        query: query,
      });
    };

    return {
      formatDateShort,
      Status,
      selectedFilter,
      updateAuthorRequest,
      onFilterChange,
    };
  },
};
</script>

<template>
  <div class="site-container p-12 dark:text-white">
    <div class="content-container m-auto w-full">
      <p class="page-title mb-10">
        {{ this.$t("shared.author-request-title") }}
      </p>
      <table class="table-list">
        <thead class="table-list-head"></thead>
        <tbody>
          <tr class="table-row">
            <th>
              <SortableTableHeaderContainer
                :text="this.$t('components.author-request-overview.table.user')"
                sort-param="user"
              ></SortableTableHeaderContainer>
            </th>
            <th>{{ this.$t("shared.email") }}</th>
            <th>
              <SortableTableHeaderContainer
                :text="
                  this.$t(
                    'components.author-request-overview.table.date_opened'
                  )
                "
                sort-param="date_opened"
              >
              </SortableTableHeaderContainer>
            </th>
            <th>
              <SortableTableHeaderContainer
                :text="
                  this.$t(
                    'components.author-request-overview.table.date_closed'
                  )
                "
                sort-param="date_closed"
              >
              </SortableTableHeaderContainer>
            </th>
            <th class="dark:text-white">
              <select
                @change="onFilterChange($event)"
                class="dark:bg-gray-800 text-center"
              >
                <option :selected="selectedFilter === ''" value="">
                  {{ this.$t("components.author-request-overview.status.all") }}
                </option>
                <option
                  :selected="selectedFilter === 'accepted'"
                  value="accepted"
                >
                  {{
                    this.$t(
                      "components.author-request-overview.status.accepted"
                    )
                  }}
                </option>
                <option
                  :selected="selectedFilter === 'pending'"
                  value="pending"
                >
                  {{
                    this.$t("components.author-request-overview.status.pending")
                  }}
                </option>
                <option
                  :selected="selectedFilter === 'rejected'"
                  value="rejected"
                >
                  {{
                    this.$t(
                      "components.author-request-overview.status.rejected"
                    )
                  }}
                </option>
              </select>
            </th>
            <th>
              {{ this.$t("shared.actions") }}
            </th>
          </tr>
          <tr
            v-for="authorRequest in authorRequestsData.authorRequests"
            :key="authorRequest.id"
            class="table-row"
          >
            <td class="table-row-value">{{ authorRequest.user.username }}</td>
            <td>{{ authorRequest.user.email }}</td>
            <td>{{ formatDateShort(authorRequest.dateOpened) }}</td>
            <td>
              {{
                authorRequest.dateClosed
                  ? formatDateShort(authorRequest.dateClosed)
                  : "-"
              }}
            </td>
            <td>
              <div
                v-if="authorRequest.status === 'PENDING'"
                class="h-6 pr-2 text-color-pending"
              >
                {{
                  this.$t("components.author-request-overview.status.pending")
                }}
                <font-awesome-icon icon="fa-regular fa-clock" class="ml-1" />
              </div>
              <div
                v-else-if="authorRequest.status === 'ACCEPTED'"
                class="h-6 pr-2 text-color-success"
              >
                {{
                  this.$t("components.author-request-overview.status.accepted")
                }}
                <font-awesome-icon
                  icon="fa-regular fa-circle-check"
                  class="ml-1"
                />
              </div>
              <div
                v-else-if="authorRequest.status === 'REJECTED'"
                class="h-6 pr-2 text-color-error"
              >
                {{
                  this.$t("components.author-request-overview.status.rejected")
                }}
                <font-awesome-icon
                  icon="fa-regular fa-circle-xmark"
                  class="ml-1"
                />
              </div>
            </td>
            <td v-if="authorRequest.status === 'PENDING'">
              <button
                @click="
                  updateAuthorRequest(authorRequest.user.id, Status.Accepted)
                "
                class="p-2 mx-1 bg-4"
              >
                {{ this.$t("components.author-request-overview.table.accept") }}
              </button>
              <button
                @click="
                  updateAuthorRequest(authorRequest.user.id, Status.Rejected)
                "
                class="p-2 mx-1 bg-4"
              >
                {{ this.$t("components.author-request-overview.table.reject") }}
              </button>
            </td>
            <td v-else></td>
          </tr>
        </tbody>
      </table>
      <PaginationComponent
        v-if="authorRequestsData.numPages > 1"
        :num-pages="authorRequestsData.numPages"
        :active-page="activePage"
      ></PaginationComponent>
    </div>
  </div>
</template>

<style scoped></style>
