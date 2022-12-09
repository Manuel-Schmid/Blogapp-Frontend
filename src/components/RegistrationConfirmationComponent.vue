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
            {{ this.$t("components.registration-confirmation.title") }}
            <div>{{ usedEmail }}</div>
          </h1>
          <div>
            <p v-if="alreadyVerified" class="text-color-error">
              {{
                this.$t("components.registration-confirmation.already-verified")
              }}
            </p>
            <div v-else>
              <p v-if="resendSuccess" class="text-color-success">
                {{
                  this.$t(
                    "components.registration-confirmation.sent-email-again"
                  )
                }}
              </p>
              <p
                @click="onResendEmail(usedEmail)"
                class="dark:text-white underline cursor-pointer"
              >
                {{
                  this.$t(
                    "components.registration-confirmation.send-email-again"
                  )
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
