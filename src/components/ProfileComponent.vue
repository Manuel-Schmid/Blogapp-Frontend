<script lang="ts">
import PasswordChangeFormContainer from "../container/PasswordChangeFormContainer.vue";
import { ref } from "vue";
import { formatDateShort } from "../helper/helper";

export default {
  name: "profileComponent",
  components: { PasswordChangeFormContainer },
  props: [
    "userData",
    "authorRequest",
    "firstNameEditable",
    "lastNameEditable",
    "emailChangeEmailSent",
  ],

  setup(props: {}, { emit }: any) {
    const newFirstName = ref("");
    const newLastName = ref("");
    const passwordChangeFormActive = ref(false);

    const onUpdateAccount = () => {
      emit("updateAccount", newFirstName.value, newLastName.value);
    };
    const onEmailChange = (email: string) => {
      emit("sendEmailChangeEmail", email);
    };
    const onLogout = () => {
      emit("logout");
    };
    const createAuthorRequest = () => {
      emit("createAuthorRequest");
    };
    const setLanguage = (event: any) => {
      emit("setLanguage", event.target.value);
    };

    return {
      newFirstName,
      newLastName,
      passwordChangeFormActive,
      localStorage,
      onUpdateAccount,
      onEmailChange,
      onLogout,
      createAuthorRequest,
      setLanguage,
      formatDateShort,
    };
  },
};
</script>

<template>
  <div class="site-container">
    <div v-if="userData" class="w-min m-auto mt-36 text-center">
      <div>
        <div
          v-if="userData.userStatus.isAuthor"
          class="author-request-popup max-w-[16rem] dark:text-color-success border-color-success bg-color-success bg-5"
        >
          <div class="popup-content-icon">
            <font-awesome-icon
              icon="fa-regular fa-circle-check"
              class="h-6 pr-2"
            />
          </div>
          <div class="popup-content-text text-right">
            {{ this.$t("components.profile.author-request-widget.is-author") }}
          </div>
        </div>
        <button
          v-else-if="!authorRequest"
          @click="createAuthorRequest"
          class="author-request-layout form-button w-max"
        >
          {{
            this.$t("components.profile.author-request-widget.become-author")
          }}
        </button>
        <div
          v-else-if="authorRequest.status === 'PENDING'"
          class="author-request-popup max-w-[16rem] dark:text-color-pending border-color-pending bg-color-pending bg-5"
        >
          <div class="popup-content-icon">
            <font-awesome-icon icon="fa-regular fa-clock" class="h-6 pr-2" />
          </div>
          <div class="popup-content-text text-left">
            {{
              this.$t(
                "components.profile.author-request-widget.request-pending-before-date"
              )
            }}
            {{ formatDateShort(authorRequest.dateOpened) }}
            {{
              this.$t(
                "components.profile.author-request-widget.request-pending-after-date"
              )
            }}
          </div>
        </div>
        <div
          v-else-if="authorRequest.status === 'REJECTED'"
          class="author-request-popup max-w-[14rem] dark:text-color-error border-color-error bg-color-error bg-5"
        >
          <div class="popup-content-icon">
            <font-awesome-icon
              icon="fa-regular fa-circle-xmark"
              class="h-6 py-2"
            />
          </div>
          <div class="popup-content-text text-left pl-2">
            {{
              this.$t(
                "components.profile.author-request-widget.request-rejected"
              )
            }}
            {{ formatDateShort(authorRequest.dateClosed) }}
          </div>
        </div>
      </div>
      <p class="text-xl mb-8 dark:text-white">
        <font-awesome-icon icon="fa-solid fa-user" class="mr-2" />{{
          this.$t("components.profile.title")
        }}
      </p>
      <div class="w-min">
        <table
          class="table-auto text-sm text-left text-gray-700 dark:text-gray-300 w-max text-center"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-50"
          ></thead>
          <tbody>
            <tr class="table-row">
              <th scope="row">
                {{ this.$t("components.profile.table.username") }}
              </th>
              <td class="table-row-value">
                {{ userData.username }}
              </td>
            </tr>
            <tr class="table-row">
              <th scope="row">
                {{ this.$t("components.profile.table.firstname") }}
              </th>
              <td class="table-row-value">
                <div v-if="firstNameEditable">
                  <input
                    type="text"
                    v-model="newFirstName"
                    class="editable-name-input"
                  />
                  <font-awesome-icon
                    @click="
                      newFirstName = userData.firstName;
                      firstNameEditable = false;
                    "
                    icon="fa-solid fa-xmark"
                    class="input-field-icon ml-2 mr-1"
                  />
                  <font-awesome-icon
                    @click="onUpdateAccount"
                    icon="fa-solid fa-check"
                    class="input-field-icon mx-1"
                  />
                </div>
                <div v-else>
                  {{ userData.firstName }}
                  <font-awesome-icon
                    @click="
                      newFirstName = userData.firstName;
                      newLastName = userData.lastName;
                      firstNameEditable = true;
                      lastNameEditable = false;
                    "
                    icon="fa-regular fa-pen-to-square"
                    class="cursor-pointer pl-2"
                  />
                </div>
              </td>
            </tr>
            <tr class="table-row">
              <th scope="row">
                {{ this.$t("components.profile.table.lastname") }}
              </th>
              <td class="table-row-value">
                <div v-if="lastNameEditable">
                  <input
                    type="text"
                    v-model="newLastName"
                    class="editable-name-input"
                  />
                  <font-awesome-icon
                    @click="lastNameEditable = false"
                    icon="fa-solid fa-xmark"
                    class="input-field-icon ml-2 mr-1"
                  />
                  <font-awesome-icon
                    @click="onUpdateAccount"
                    icon="fa-solid fa-check"
                    class="input-field-icon mx-1"
                  />
                </div>
                <div v-else>
                  {{ userData.lastName }}
                  <font-awesome-icon
                    @click="
                      newFirstName = userData.firstName;
                      newLastName = userData.lastName;
                      firstNameEditable = false;
                      lastNameEditable = true;
                    "
                    icon="fa-regular fa-pen-to-square"
                    class="cursor-pointer pl-2"
                  />
                </div>
              </td>
            </tr>
            <tr class="table-row">
              <th scope="row">{{ this.$t("shared.email") }}</th>
              <td class="table-row-value">
                {{ userData.email }}
                <font-awesome-icon
                  @click="
                    firstNameEditable = false;
                    lastNameEditable = false;
                    onEmailChange(userData.email);
                  "
                  icon="fa-regular fa-pen-to-square"
                  class="cursor-pointer pl-2"
                />
                <p
                  v-if="emailChangeEmailSent"
                  class="text-color-success max-w-[15rem]"
                >
                  {{ this.$t("components.profile.change-email-success") }}
                </p>
              </td>
            </tr>
            <tr class="table-row">
              <th scope="row">{{ this.$t("components.profile.language") }}</th>
              <td class="table-row-value">
                <select
                  @change="setLanguage($event)"
                  class="dark:bg-gray-800 text-center"
                >
                  <option :selected="localStorage.lang === 'en'" value="en">
                    {{ this.$t("languages.en") }}
                  </option>
                  <option :selected="localStorage.lang === 'de'" value="de">
                    {{ this.$t("languages.de") }}
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="h-max">
          <button
            @click="passwordChangeFormActive = !passwordChangeFormActive"
            class="float-left px-8 profile-button"
          >
            {{ this.$t("components.profile.change-password") }}
          </button>
          <PasswordChangeFormContainer
            v-if="passwordChangeFormActive"
            @toggle-password-change-form="
              passwordChangeFormActive = !passwordChangeFormActive
            "
          ></PasswordChangeFormContainer>
        </div>
        <button @click="onLogout" class="float-right px-6 profile-button">
          {{ this.$t("components.profile.logout") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.author-request-layout {
  top: calc(1.2rem + 9vh);
  @apply absolute right-4;
}
.author-request-popup {
  @apply author-request-layout flex justify-center items-center flex-row rounded-lg font-bold text-sm text-black p-2.5 border-2;
}
.popup-content-icon {
  @apply w-1/6 h-[100%];
}
.popup-content-text {
  @apply w-5/6;
}
.editable-name-input {
  @apply bg-gray-100 dark:bg-slate-700 px-2 max-w-[58%];
}
.input-field-icon {
  @apply text-lg cursor-pointer mb-[-0.125rem];
}
.profile-button {
  @apply mt-6 py-2.5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700;
}
</style>
