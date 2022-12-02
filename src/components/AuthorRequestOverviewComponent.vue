<script lang="ts">
import { formatDateShort } from "../helper/helper";
import { Status } from "../api/models";

export default {
  name: "AuthorRequestOverviewComponent",
  props: ["authorRequestsData", "activePage"],
  setup(props: {}, { emit }: any) {
    const updateAuthorRequest = (user: string, status: Status) => {
      emit("updateAuthorRequest", user, status);
    };

    return { formatDateShort, Status, updateAuthorRequest };
  },
};
</script>

<template>
  <div class="site-container p-12 dark:text-white">
    <div class="content-container m-auto w-full">
      <p
        class="text-3xl tracking-wide leading-5 text-black font-bold mb-10 mt-4 mt-9 dark:text-white"
      >
        Author Requests:
      </p>
      <table
        class="table-auto m-auto text-sm text-left text-gray-700 dark:text-gray-300 w-max text-center"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-50"
        ></thead>
        <tbody>
          <tr class="table-row">
            <th>Username</th>
            <th>Email</th>
            <th>Date opened</th>
            <th>Date closed</th>
            <th>Status</th>
            <th>Actions</th>
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
                Pending
                <font-awesome-icon icon="fa-regular fa-clock" class="ml-1" />
              </div>
              <div
                v-else-if="authorRequest.status === 'ACCEPTED'"
                class="h-6 pr-2 text-color-success"
              >
                Accepted
                <font-awesome-icon
                  icon="fa-regular fa-circle-check"
                  class="ml-1"
                />
              </div>
              <div
                v-else-if="authorRequest.status === 'REJECTED'"
                class="h-6 pr-2 text-color-error"
              >
                Rejected
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
                Accept
              </button>
              <button
                @click="
                  updateAuthorRequest(authorRequest.user.id, Status.Rejected)
                "
                class="p-2 mx-1 bg-4"
              >
                Reject
              </button>
            </td>
            <td v-else></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
