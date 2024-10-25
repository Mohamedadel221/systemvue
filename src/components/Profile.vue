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
        <h2 class="text-capitalize text-center">Update your profile</h2>
        <v-form @submit.prevent>
          <div class="name">
            <v-text-field
              disabled
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
          </div>
          <div class="email">
            <v-text-field
              disabled
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
          </div>
          <div class="password">
            <v-text-field
              disabled
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
          </div>
        </v-form>
      </v-sheet>
    </v-container>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Navbar from "./Navbar.vue";
export default {
  name: "profile-page",
  components: {
    Navbar,
  },
  data() {
    return {
      name: "",
      email: "",
      pass: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.name = JSON.parse(user).name;
      this.email = JSON.parse(user).emai;
      this.pass = JSON.parse(user).pass;
    } else {
      this.redirectTo({ val: "signup" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    updateProfileNow() {
      this.redirectTo({ val: "update-profile" });
    },
  },
};
</script>
<style scoped lang="scss">
.parent-update-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("../assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  top: -19px;
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
