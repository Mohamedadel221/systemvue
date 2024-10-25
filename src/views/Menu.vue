<template>
  <Navbar />
  <div class="parent-menu">
    <div class="two-btns">
      <v-container class="d-flex justify-space-between align-center">
        <router-link
          :to="{ name: 'ViewCategories', params: { locationId: locationId } }"
        >
          <v-btn
            type="button"
            color="blue"
            variant="outlined"
            class="text-capitalize"
          >
            view/add categories
          </v-btn>
        </router-link>
        <router-link
          :to="{ name: 'AddNewItem', params: { locationId: locationId } }"
        >
          <v-btn
            type="button"
            color="green"
            variant="outlined"
            class="text-capitalize"
          >
            add new items
          </v-btn>
        </router-link>
      </v-container>
      <div class="print text-center">
        <h1 class="mb-0 text-light">{{ locationName }}</h1>
        <p class="mb-0 text-light">{{ locationAdress }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import axios from "axios";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Menu-Page",
  components: {
    Navbar,
  },
  data() {
    return {
      userName: "",
      userId: "",
      locationId: (this.locationId = this.$route.params.locationId),
      locationName: "",
      locationAdress: "",
    };
  },
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "loggedInUser",
      "numberOfCategories",
      "listOfCategories",
    ]),
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userName = JSON.parse(user).name;
      this.userId = JSON.parse(user).id;
      this.isUserLoggedInUser();
      this.displayAllCatego({
        userIdIs: this.userId,
        locationIdIs: this.locationId,
      });
      this.getLocationInfo(this.userId, this.locationId);
      // this.canUserAccessThisLocation({
      //   userIdIs: this.userId,
      //   locationIdIs: this.locationId,
      //   redirectToPage: "home",
      // });
    }
  },
  methods: {
    ...mapMutations(["isUserLoggedInUser", "displayAllCatego"]),
    ...mapActions(["redirectTo"]),
    async getLocationInfo(uId, locId) {
      let result = await axios.get(
        `http://localhost:3000/location?userId=${uId}&id=${locId}`
      );
      let locDetails = [];
      if (result.status == 200) {
        locDetails = result.data;
        this.locationName = locDetails[0].name;
        this.locationAdress = locDetails[0].adress;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.parent-menu {
  background: #100f0f;
  min-height: 100vh;
  position: relative;
  top: -19px;
  z-index: 1;
}
.parent-menu::before,
.parent-menu::after {
  position: absolute;
  content: "";
  top: 0;
  right: 0%;
  height: 100%;
  width: 50%;
  background: rgb(205, 221, 221);
  opacity: 0.7;
  z-index: -1;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 100%);
}
</style>
