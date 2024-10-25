<template>
  <div class="parent-sign-in">
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
          <h2
            class="text-capitalize text-center mb-4 text-light"
            style="color: #000"
          >
            Sign Up
          </h2>
          <div class="name">
            <v-text-field
              type="name"
              label="Name"
              elevation="0"
              v-model="email"
              style="--v-theme-primary: white; color: white"
              outlined
              :color="white"
            >
            </v-text-field>
            <span
              class="error-feedback d-flex justify-content-center"
              v-if="v$.name.$error"
              >{{ v$.name.$errors[0].$message }}</span
            >
          </div>
          <div class="email">
            <v-text-field
              type="email"
              label="Email"
              elevation="0"
              v-model="email"
              style="--v-theme-primary: white; color: white"
              outlined
              :color="white"
            >
            </v-text-field>
            <span
              class="error-feedback d-flex justify-content-center"
              v-if="v$.email.$error"
              >{{ v$.email.$errors[0].$message }}</span
            >
          </div>
          <div class="password">
            <v-text-field
              type="password"
              label="Password"
              v-model="pass"
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
          </div>
          <div class="btn text-center d-flex justify-content-center">
            <v-btn
              @click="signUpNow()"
              class="mr-5 text-capitalize"
              type="submit"
              color="green"
              elevation="0"
              >sign In</v-btn
            >
            <v-btn
              class="mr-5 text-capitalize"
              type="button"
              color="green"
              variant="outlined"
              @click="redirectTo({ val: 'log-in' })"
              >Log In</v-btn
            >
          </div>
          <div class="success-message text-center">
            <p color="green">
              {{ successMessage }}
            </p>
          </div>
          <div class="user-not-found text-center">
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
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  name: "SignUpForm",
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      pass: "",
      email: "",
      successMessage: "",
      userNotFound: "",
      displayUserCatego: [],
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(0) },
      pass: { required, minLength: minLength(8) },
      email: { required, email },
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
    async signUpNow() {
      this.v$.$validate();
      let chackUserName = this.displayUserCatego.filter(
        (v) => v.name.toLocaleLowerCase() === this.name.toLocaleLowerCase()
      );
      {
        if (!this.v$.$error) {
          if (chackUserName.length > 0) {
            this.userNotFound = "The Name Is Already Taken By Another User";
            this.successMessage = "";
          } else {
            let result = await axios.post("http://localhost:3000/user", {
              name: this.name,
              email: this.email,
              pass: this.pass,
            });
            if (result.status == 201) {
              localStorage.setItem("user-info", JSON.stringify(result.data));

              this.redirectTo({ val: "home" });
            }
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.error-feedback {
  color: red;
  font-size: 18px;
  transition: 0.5s;
  margin-bottom: 4px;
  background: #fff;
}

.parent-sign-in {
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

.parent-sign-in::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: 0001;
  opacity: 0.2;
  z-index: -1;
}

.not-found-error {
  color: red;
  font-size: 20px;
}

.success-message {
  color: green;
  font-size: 20px;
}
</style>
