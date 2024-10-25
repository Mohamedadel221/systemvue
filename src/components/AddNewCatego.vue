<template>
  <Navbar />
  <div class="text-center">
    <v-container class="d-flex justify-content-between align-center">
      <router-link
        :to="{ name: 'ViewCategories', params: { locationId: locationId } }"
      >
        <v-btn
          type="button"
          color="green"
          variant="outlined"
          class="text-capitalize"
        >
          back to catego
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
  <div class="d-flex justify-content-center align-center mt-4">
    <v-card title="Add New Catego" class="text-center" width="500">
      <v-card-text>
        <v-sheet>
          <v-form @submit.prevent>
            <div class="name">
              <v-text-field
                type="name"
                label="Add New Categor"
                variant="outlined"
                elevation="0"
                color="green"
                v-model.trim="name"
              >
              </v-text-field>
              <span
                class="error-feedback text-center"
                color="red"
                v-if="v$.name.$error"
                >{{ v$.name.$errors[0].$message }}</span
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
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Add Now" @click="getCatego()" color="green"></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import Navbar from "./Navbar.vue";
import axios from "axios";
export default {
  name: "AddNewCategory",
  components: {
    Navbar,
  },
  data() {
    return {
      v$: useVuelidate(),
      locationId: this.$route.params.locationId,
      userId: "",
      locationName: "",
      locationAdress: "",
      name: "",
      successMessage: "",
      userNotFound: "",
      displayUserCatego: [],
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(3), maxLength: maxLength(15) },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");

    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userName = JSON.parse(user).name;
      this.userId = JSON.parse(user).id;
    }
    this.getLocationInfo(this.userId, this.locationId);
    this.loadUserCatego(this.userId, this.locationId);
  },
  methods: {
    ...mapMutations(["isUserLoggedInUser", "displayAllCatego"]),
    async loadUserCatego(uId, locId) {
      let result = await axios.get(
        `http://localhost:3000/Catego?userId=${uId}&locationId=${locId}`
      );
      if (result.status == 200) {
        this.displayUserCatego = result.data;
      }
    },
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
    async getCatego() {
      this.v$.$validate();
      let filterCategoryName = this.displayUserCatego.filter(
        (v) => v.name.toLocaleLowerCase() === this.name.toLocaleLowerCase()
      );
      if (!this.v$.$error) {
        if (filterCategoryName.length > 0) {
          this.userNotFound = "The Category Name Is Already Used";
          this.successMessage = "ُ";
        } else {
          let result = await axios.post("http://localhost:3000/Catego", {
            name: this.name,
            userId: this.userId,
            locationId: this.locationId,
          });
          if (result.status == 201) {
            this.userNotFound = "";
            this.successMessage = "The Name Is Available";
            setTimeout(() => {
              this.$router.push({
                name: "ViewCategories",
                params: { locationId: this.locationId },
              });
            }, 1000);
          } else {
            this.userNotFound = "لقد حدث خطاء ما من فضلك حاول مره اخري";
            this.successMessage = "";
          }
        }
      } else {
        this.userNotFound = "من فضلك قم بادخال البيانات بشكل صحيحح";
        this.successMessage = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.error-feedback {
  color: red;
  font-size: 12px;
  transition: 0.5s;
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
