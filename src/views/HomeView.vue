<template>
  <div class="container">
    <Navbar />
    <v-container class="d-flex justify-space-between align-center">
      <router-link :to="{ name: 'profile-page' }">
        <v-btn color="green" variant="outlined">profile</v-btn>
      </router-link>
      <p class="">
        {{ userName }}
      </p>
    </v-container>
  </div>

  <AddnewLocation />
  <UserLocations :allLocations="listOfLocations" />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import AddnewLocation from "@/components/AddnewLocation.vue";
import UserLocations from "@/components/UserLocations.vue";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "HomeView",
  components: {
    Navbar,
    AddnewLocation,
    UserLocations,
  },
  data() {
    return {
      userName: "",
      listOfLocations: [],
      userId: "",
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userName = JSON.parse(user).name;
      this.userId = JSON.parse(user).id;
    }
    let result = await axios.get(
      `http://localhost:3000/location?userId=${this.userId}`
    );
    if (result.status == 200 && result.data.length > 0) {
      // console.log(result.data);
      this.listOfLocations = result.data;
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>
