<template>
  <Navbar />
  <div class="btn-categ">
    <v-container class="d-flex justify-content-between align-center">
      <router-link
        :to="{ name: 'AddNewCatego', params: { locationId: locationId } }"
      >
        <v-btn
          type="button"
          color="green"
          variant="outlined"
          class="text-capitalize"
        >
          add new catego
        </v-btn>
      </router-link>
      <router-link :to="{ name: 'Menu', params: { locationId: locationId } }">
        <v-btn
          type="button"
          color="red"
          variant="outlined"
          class="text-capitalize"
        >
          <v-icon>mdi-arrow-left</v-icon>
          back to menu
        </v-btn>
      </router-link>
    </v-container>
  </div>
  <div class="print text-center">
    <h1 class="mb-0">{{ locationName }}</h1>
    <p class="mb-0">{{ locationAdress }}</p>
  </div>
  <div class="table-data mt-5">
    <v-container>
      <v-row>
        <div class="d-flex justify-between align-center mb-2">
          <h6>Catego Adedd ({{ listOfCategories.length }})</h6>
        </div>
        <v-table class="w-100" v-if="listOfCategories.length > 0">
          <thead
            class="bg-dark text-center w-100"
            style="color: white !important"
          >
            <tr scope="row">
              <th>CategoName</th>
              <th>acion</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cat, i) in listOfCategories" :key="i">
              <td>{{ cat.name }}</td>

              <td>
                <router-link
                  :to="{
                    name: 'updateCategory',
                    params: { catId: cat.id, locationId: cat.loctionId },
                  }"
                >
                  <v-btn color="green" class="ml-2" variant="outlined">
                    <v-icon>mdi-pen</v-icon>
                  </v-btn>
                </router-link>

                <v-btn
                  color="red"
                  class="ml-2"
                  variant="outlined"
                  @click="deleteItem"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div
          v-else
          class="alert alert-warning text-capitalize text-center"
          role="alert"
        >
          <span>No location Added Yet</span>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Navbar from "./Navbar.vue";
import axios from "axios";
export default {
  name: "viewCatego",
  components: {
    Navbar,
  },
  data() {
    return {
      locationId: this.$route.params.locationId,
      catId: this.$route.params.catId,
      userId: "",
      locationName: "",
      locationAdress: "",
      name: "",
      allItemsIdIs: [],
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
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userName = JSON.parse(user).name;
      this.userId = JSON.parse(user).id;
    }
    this.displayAllCatego({
      userIdIs: this.userId,
      locationIdIs: this.locationId,
    });

    this.getLocationInfo(this.userId, this.locationId);
    // this.deleteItem(this.locationId);
  },

  methods: {
    ...mapMutations([
      "isUserLoggedInUser",
      "displayAllCatego",
      // "listOfCategories",
    ]),
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
    // async deleteItem() {
    //   let result = await axios.delete(
    //     `http://localhost:3000/Catego/${this.locationId}`
    //   );
    //   if (result.status == 200) {
    //     console.log("Done");
    //   } else {
    //     console.log("Error");
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped></style>
