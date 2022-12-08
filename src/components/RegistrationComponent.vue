<script lang="ts">
import { ref } from "vue";
import RegistrationConfirmationContainer from "../container/RegistrationConfirmationContainer.vue";

export default {
  name: "RegistrationComponent",
  components: { RegistrationConfirmationContainer },
  props: ["usedEmail", "signupSuccess"],

  setup(props: {}, { emit }: any) {
    const email = ref("");
    const username = ref("");
    const password1 = ref("");
    const password2 = ref("");

    const onSubmit = () => {
      emit(
        "submitRegistration",
        email.value,
        username.value,
        password1.value,
        password2.value
      );
    };

    return { email, username, password1, password2, onSubmit };
  },
};
</script>

<template>
  <div v-if="signupSuccess">
    <RegistrationConfirmationContainer
      :used-email="usedEmail"
    ></RegistrationConfirmationContainer>
  </div>
  <div v-else class="site-container">
    <div class="flex-container-centered">
      <div class="form-wrapper">
        <div class="form-layout">
          <h1 class="form-title">Create a new account</h1>
          <form ref="signupForm" class="form-inner-spacing" @submit.prevent="">
            <div>
              <label for="email" class="form-label">Your email</label>
              <input
                type="email"
                name="email"
                v-model="email"
                id="email"
                class="form-input"
                placeholder="john.doe@example.com"
                required=""
              />
            </div>
            <div>
              <label for="username" class="form-label">Your Username</label>
              <input
                type="text"
                name="username"
                v-model="username"
                id="username"
                class="form-input"
                placeholder="Username"
                required=""
              />
            </div>
            <div>
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                name="password1"
                v-model="password1"
                id="password1"
                placeholder="••••••••"
                class="form-input"
                required=""
              />
            </div>
            <div>
              <label for="password" class="form-label">Confirm Password</label>
              <input
                type="password"
                name="password2"
                v-model="password2"
                id="password2"
                placeholder="••••••••"
                class="form-input"
                required=""
              />
            </div>
            <button @click="onSubmit" class="form-button">Sign up</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <router-link
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                :to="{ name: 'login' }"
                >Sign in</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
