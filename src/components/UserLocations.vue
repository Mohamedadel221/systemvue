<template>
  <div class="table-data mt-5">
    <v-container>
      <v-row>
        <div class="d-flex justify-between align-center mb-2">
          <h6>Resturant Added ({{ allLocations.length }})</h6>
        </div>
        <v-table class="w-100 text-center" v-if="allLocations.length > 0">
          <v-btn
            class="text-capitalize text-center ml-3"
            color="red"
            variant="outlined"
            @click="deleteAlLocations()"
            >delete all</v-btn
          >
          <thead class="bg-dark text-center" style="color: white !important">
            <tr class="text-center" style="text-align: center !important">
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(loc, i) in allLocations" :key="i">
              <td scope="row">{{ loc.name }}</td>
              <td>{{ loc.phone }}</td>
              <td>{{ loc.adress }}</td>
              <td>
                <v-btn
                  color="red"
                  variant="outlined"
                  @click="deleteMetadata(loc.id)"
                >
                  <v-icon>mdi-delete</v-icon>
                  <v-tooltip
                    activator="parent"
                    location="start"
                    text="Are You Sure To Delete ?"
                    theme="red"
                    variant="outliend"
                  ></v-tooltip>
                </v-btn>
                <router-link
                  :to="{
                    name: 'Update-Location',
                    params: { locationId: loc.id },
                  }"
                >
                  <v-btn color="green" class="ml-2" variant="outlined">
                    <v-icon>mdi-pen</v-icon>
                  </v-btn>
                </router-link>
                <router-link
                  :to="{
                    name: 'Menu',
                    params: { locationId: loc.id },
                  }"
                >
                  <v-btn color="green" class="ml-2" variant="outlined">
                    <v-icon>mdi-menu</v-icon>
                    <v-tooltip
                      text="Add Menu"
                      activator="parent"
                      location="start"
                    >
                    </v-tooltip>
                  </v-btn>
                </router-link>
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
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "userLocations",
  props: ["allLocations"],
  data() {
    return {
      id: "",
      userId: "",
      successMessage: "",
      userNotFound: "",
      allLocationId: [],
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userId = JSON.parse(user).id;
      let result = await axios.get(
        `http://localhost:3000/location?userId=${this.userId}`
      );
      let resultLeng = result.data.length;
      for (var i = 0; i < resultLeng; i++) {
        this.allLocationId.push(result.data[i].id);
      }
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async deleteMetadata() {
      let result = await axios.delete(
        `http://localhost:3000/location/${this.id}`
      );
      if (result.status == 200) {
        console.log("DeleteComp");
      }
    },
    async deleteAlLocations() {
      let allResults = [];
      for (var i = 0; i < this.allLocationId.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/location?userId=${this.allLocationId[i]}`
        );
        if (result.status == 200) {
          allResults.push(true);
        } else {
          allResults.push(false);
        }
      }
    },
  },
};
</script>
<style></style>
