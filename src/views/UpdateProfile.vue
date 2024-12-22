<template>
  <Navbar />
  <div class="parent-update-profile">
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
        <h2 class="text-capitalize text-center text-light">
          Update your profile
        </h2>
        <v-form @submit.prevent>
          <div class="name">
            <v-text-field
              type="text"
              label="Name"
              variant="outlined"
              elevation="0"
              style="--v-theme-primary: white; color: white"
              outlined
              :color="white"
              v-model="name"
            >
            </v-text-field>
            <span class="error-feedback" v-if="v$.name.$error">{{
              v$.name.$errors[0].$message
            }}</span>
          </div>
          <div class="email">
            <v-text-field
              type="email"
              label="Email"
              variant="outlined"
              elevation="0"
              style="--v-theme-primary: white; color: white"
              outlined
              :color="white"
              v-model="email"
              rounded="1"
            >
            </v-text-field>
            <span class="error-feedback" v-if="v$.email.$error">{{
              v$.email.$errors[0].$message
            }}</span>
          </div>
          <div class="password">
            <v-text-field
              type="password"
              label="Password"
              variant="outlined"
              elevation="0"
              style="--v-theme-primary: white; color: white"
              outlined
              :color="white"
              v-model="pass"
            >
            </v-text-field>
            <span class="error-feedback" v-if="v$.pass.$error">{{
              v$.pass.$errors[0].$message
            }}</span>
          </div>
          <div class="btn d-flex justify-content-center">
            <v-btn
              @click="updateProfileNow()"
              class="mr-5 text-capitalize"
              type="submit"
              color="green"
              elevation="0"
              >update profile</v-btn
            >
            <div class="user-not-found">
              <h2 class="not-found-error">{{ userNotFound }}</h2>
            </div>
          </div>
        </v-form>
      </v-sheet>
    </v-container>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Navbar from "@/components/Navbar.vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";
export default {
  name: "UpdateProfile",
  components: {
    Navbar,
  },
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      email: "",
      pass: "",
      userId: "",
      userNotFound: "",
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(10) },
      pass: { required, minLength: minLength(8) },
      email: { required, email },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.name = JSON.parse(user).name;
      this.email = JSON.parse(user).email;
      this.pass = JSON.parse(user).pass;
      this.userId = JSON.parse(user).id;
    } else {
      this.redirectTo({ val: "signup" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async updateProfileNow() {
      this.v$.$validate();
      if (!this.v$.$error) {
        // put //
        let result = await axios.put(
          `http://localhost:3000/user/${this.userId}`,
          {
            name: this.name,
            email: this.email,
            pass: this.pass,
          }
        );
        if (result.status == 200) {
          localStorage.setItem("user-info", JSON.stringify(result.data));
          this.redirectTo({ val: "profile-page" });
        } else {
          this.userNotFound = "Not Updated";
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
.error-feedback {
  color: red;
  font-size: 12px;
  transition: 0.5s;
}
.not-found-error {
  color: red;
  font-size: 20px;
}
.parent-update-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("../assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.parent-update-profile::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: 0001;
  opacity: 0.2;
  z-index: -1;
}
</style>
