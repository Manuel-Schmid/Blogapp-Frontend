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
  <div class="site-container">
    <div class="flex-container-centered">
      <div class="form-wrapper">
        <div class="form-layout text-center">
          <h1 class="form-title md:text-xl">
            Account activation email was sent to:
            <div>{{ usedEmail }}</div>
          </h1>
          <div>
            <p v-if="alreadyVerified" class="text-color-error">
              This account has already been verified
            </p>
            <div v-else>
              <p v-if="resendSuccess" class="text-color-success">
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
