<template>
  <Navbar />
  <div class="parent-addnewitem">
    <v-container class="d-flex justify-content-between align-center">
      <router-link :to="{ name: 'Menu' }">
        <v-btn class="mt-4 mb-5 text-capitalize" variant="outlined" color="blue"
          >Back To Menu</v-btn
        >
      </router-link>
      <router-link :to="{ name: 'UpdateItem' }">
        <v-btn
          class="mt-4 mb-5 text-capitalize"
          variant="outlined"
          color="green"
          >update item</v-btn
        >
      </router-link>
    </v-container>
    <div class="print text-center">
      <h1 class="mb-0 text-light">{{ locationName }}</h1>
      <p class="mb-0 text-light">{{ locationAdress }}</p>
    </div>
    <div
      class="parent-addnewitem-two d-flex justify-content-center align-center"
    >
      <div
        class="forma-add-new-item d-flex justify-content-center align-center mt-4"
      >
        <v-card title="Add New Item" class="text-center" width="500">
          <v-card-text>
            <v-sheet>
              <v-form @submit.prevent>
                <div :class="{ 'form-group-error': v$.name.$error }">
                  <v-text-field
                    type="name"
                    label="Enter Item Name"
                    variant="outlined"
                    elevation="0"
                    color="green"
                    v-model="name"
                    class="text-capitalize"
                  >
                  </v-text-field>
                  <span
                    class="error-feedback text-center"
                    color="red"
                    v-if="v$.name.$error"
                    >{{ v$.name.$errors[0].$message }}</span
                  >
                </div>
                <div :class="{ 'form-group-error': v$.addNumbers.$error }">
                  <v-text-field
                    type="number"
                    label="Enter Item Quantities"
                    variant="outlined"
                    elevation="0"
                    color="green"
                    v-model="addNumbers"
                    class="text-capitalize"
                  >
                  </v-text-field>
                  <span
                    class="error-feedback text-center"
                    color="red"
                    v-if="v$.addNumbers.$error"
                    >{{ v$.addNumbers.$errors[0].$message }}</span
                  >
                </div>
                <div :class="{ 'form-group-error': v$.price.$error }">
                  <v-text-field
                    type="number"
                    label="Price 0.00"
                    variant="outlined"
                    elevation="0"
                    color="green"
                    v-model="price"
                    class="text-capitalize"
                  >
                  </v-text-field>
                  <span
                    class="error-feedback text-center"
                    color="red"
                    v-if="v$.price.$error"
                    >{{ v$.price.$errors[0].$message }}</span
                  >
                </div>
                <div :class="{ 'form-group-error': v$.addYourDescri.$error }">
                  <v-textarea
                    label="Enter Your Descriptions"
                    variant="outlined"
                    elevation="0"
                    color="green"
                    v-model="addYourDescri"
                    class="text-capitalize"
                  >
                  </v-textarea>
                  <span
                    class="error-feedback text-center"
                    color="red"
                    v-if="v$.addYourDescri.$error"
                    >{{ v$.addYourDescri.$errors[0].$message }}</span
                  >
                </div>
                <div class="select">
                  <v-select
                    label="Select Item Name"
                    elevation="0"
                    class="text-capitalize"
                    color="green"
                    v-model="picCategory"
                    :items="listOfCategories"
                    item-text="name"
                    item-value="id"
                  >
                    <!-- {{ cat.name }} -->
                  </v-select>
                  <!-- <span
                class="error-feedback text-center"
                color="red"
                v-if="v$.name.$error"
                >{{ v$.name.$errors[0].$message }}</span
              > -->
                </div>
                <div class="success-message text-center">
                  <!-- <v-icon
                    v-if="!$v.email.$invalid && $v.email.$dirty"
                    color="green"
                    >mdi-check-circle</v-icon
                  > -->
                  <p color="green">
                    {{ successMessage }}
                  </p>
                </div>
                <div class="user-not-found text-center">
                  <!-- <v-icon
                    v-else-if="$v.email.$invalid && $v.email.$dirty"
                    color="red"
                    >mdi-alert-circle</v-icon
                  > -->
                  <h2 class="not-found-error">{{ userNotFound }}</h2>
                </div>
              </v-form>
            </v-sheet>
          </v-card-text>

          <v-card-actions class="d-flex justify-content-center align-center">
            <v-btn
              text="Add Now"
              @click="addNewItems()"
              class="text-capitalize"
              color="green"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, between, minLength } from "@vuelidate/validators";
import { mapActions, mapState, mapMutations } from "vuex";
import axios from "axios";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "AddNewItem",
  components: {
    Navbar,
  },
  data() {
    return {
      v$: useVuelidate(),
      userName: "",
      userId: "",
      name: "",
      locationId: (this.locationId = this.$route.params.locationId),
      locationName: "",
      locationAdress: "",
      picCategory: "",
      successMessage: "",
      userNotFound: "",
      addNumbers: null,
      addYourDescri: "",
      price: null,
    };
  },
  validations() {
    return {
      name: { required },
      addNumbers: { required, between: between(1, 100000) },
      addYourDescri: { required, minLength: minLength(100) },
      price: { required, between: between(1, 10000) },
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
    async addNewItems() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.post("http://localhost:3000/item", {
          name: this.name,
          addNumbers: this.addNumbers,
          price: parseFloat(this.price).toFixed(2),
          addYourDescri: this.addYourDescri,
          userId: this.userId,
          locationId: this.locationId,
        });
        if (result.status == 201) {
          this.successMessage = "Items Added Successfully";
          this.userNotFound = "";
          setTimeout(() => {
            this.$router.push({
              name: "Menu",
              params: { locationId: this.locationId },
            });
          }, 1000);
        } else {
          (this.successMessage = ""), (this.userNotFound = "Failed Adedd Item");
        }
      } else {
        (this.successMessage = ""),
          (this.userNotFound =
            "Something Went Wrong, Plese Required All Inputs");
      }
    },
  },
};
</script>
<style scoped lang="scss">
.forma-add-new-item {
  min-height: 60vh;
}
.error-feedback,
.form-group-error {
  color: red;
  font-size: 12px;
  transition: 0.5s;
}

.not-found-error {
  color: #cc190d;
  font-size: 19px;
}
.success-message {
  color: green;
  font-size: 20px;
}
.parent-addnewitem {
  background: #100f0f;
  min-height: 100vh;
  position: relative;
  top: -22px;
  z-index: 1;
}
.parent-addnewitem:before,
.parent-addnewitem:after {
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
