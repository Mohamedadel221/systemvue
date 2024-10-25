<template>
  <div class="parent-login">
    <v-container>
      <v-sheet
        class="mx-auto"
        max-width="400"
        elevation="0"
        style="
          background: transparent;
          border: 1px solid #fff;
          padding: 10px;
          border-radius: 8px;
        "
      >
        <v-form @submit.prevent>
          <h2 class="text-capitalize text-center text-light">Login</h2>
          <v-text-field
            type="email"
            label="Email"
            elevation="0"
            v-model="state.email"
            style="--v-theme-primary: white; color: white"
            outlined
            :color="white"
          >
          </v-text-field>
          <span
            class="error-feedback d-flex justify-content-center"
            v-if="v$.email.$error"
          >
            {{ v$.email.$errors[0].$message }}
          </span>
          <v-text-field
            type="password"
            label="Password"
            elevation="0"
            v-model="state.pass"
            style="--v-theme-primary: white; color: white"
            outlined
            :color="white"
          >
          </v-text-field>
          <span
            class="error-feedback d-flex justify-content-center"
            v-if="v$.pass.$error"
            >{{ v$.pass.$errors[0].$message }}</span
          >
          <div class="btn d-flex justify-content-center">
            <v-btn
              @click="userLogIn()"
              class="mr-5 text-capitalize"
              type="submit"
              color="green"
              >Log In</v-btn
            >
            <v-btn
              @click="redirectTo({ val: 'signup' })"
              class="mr-5 text-capitalize"
              type="button"
              color="green"
              variant="outlined"
              elevation="0"
              >sign In</v-btn
            >
          </div>
          <div class="user-not-found">
            <h2 class="not-found-error">{{ userNotFound }}</h2>
          </div>
        </v-form>
      </v-sheet>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { reactive } from "vue";
export default {
  name: "LogInForm",
  setup() {
    const state = reactive({
      pass: "",
      email: "",
    });
    let ruels = () => {
      return {
        pass: { required, minLength: minLength(8) },
        email: { required, email },
      };
    };
    const v$ = useVuelidate(ruels, state);
    return {
      state,
      v$,
    };
  },
  data() {
    return {
      userNotFound: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.redirectTo({ val: "home" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async userLogIn() {
      this.v$.$validate();
      {
        if (!this.v$.$error) {
          let result = await axios.get(
            `http://localhost:3000/user?email=${this.state.email}&pass${this.state.pass}`
          );
          if (result.status == 200 && result.data.length > 0) {
            localStorage.setItem("user-info", JSON.stringify(result.data[0]));
            this.redirectTo({ val: "home" });
          } else {
            this.userNotFound = "User Not Found";
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.parent-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("../signup/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
}

.parent-login::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: 0001;
  opacity: 0.2;
  z-index: -1;
}

.v-text-field input {
  border-radius: 8px !important;
  margin-left: 10px;
}
.error-feedback {
  color: red;
  font-size: 18px;
  transition: 0.5s;
  margin-bottom: 4px;
  background: #fff;
}
.not-found-error {
  color: red;
  font-size: 20px;
}
</style>
