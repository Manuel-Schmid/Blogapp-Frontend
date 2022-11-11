<script lang="ts">
export default {
  name: "RegistrationConfirmationComponent",
  props: ["usedEmail", "resendSuccess", "alreadyVerified"],
  setup(props: {}, { emit }: any) {
    const onResendEmail = (email: string) => {
      emit("resendActivationEmail", email);
    };

    return { onResendEmail };
  },
};
</script>

<template>
  <div class="mt-[9vh] h-[91vh]">
    <div class="w-full h-full flex justify-center items-center text-left">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
          >
            Account activation email was sent to:
            <div>{{ usedEmail }}</div>
          </h1>
          <div>
            <p v-if="alreadyVerified" class="text-red-600">
              This account has already been verified
            </p>
            <div v-else>
              <p v-if="resendSuccess" class="text-green-500">
                Activation email was sent again
              </p>
              <p
                @click="onResendEmail(usedEmail)"
                class="dark:text-white underline cursor-pointer"
              >
                Send activation link again
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
