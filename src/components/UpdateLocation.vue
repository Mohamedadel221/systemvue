<template>
  <div
    class="addnewrest mt-4 d-flex justify-center align-center"
    style="min-height: 100vh"
  >
    <v-card title="Update Your Data" width="400" theme="dark">
      <v-card-text>
        <v-sheet>
          <v-form @submit.prevent>
            <div class="name">
              <v-text-field
                type="text"
                label="Resturant Name"
                variant="outlined"
                elevation="0"
                color="green"
                v-model.trim="state.name"
              >
              </v-text-field>
              <span class="error-feedback" v-if="v$.name.$error">{{
                v$.name.$errors[0].$message
              }}</span>
            </div>
            <div class="email">
              <v-text-field
                type="number"
                label="Phone Number"
                variant="outlined"
                elevation="0"
                color="green"
                v-model.trim="state.phone"
                rounded="1"
              >
              </v-text-field>
              <span class="error-feedback" v-if="v$.phone.$error">{{
                v$.phone.$errors[0].$message
              }}</span>
            </div>
            <div class="password">
              <v-text-field
                type="text"
                label="Resturant Location"
                variant="outlined"
                elevation="0"
                color="green"
                v-model.trim="state.adress"
              >
              </v-text-field>
              <span
                class="error-feedback text-center"
                v-if="v$.adress.$error"
                >{{ v$.adress.$errors[0].$message }}</span
              >
            </div>
            <div class="success-message">
              <p class="text-success">
                {{ successMessage }}
              </p>
            </div>
            <div class="user-not-found">
              <h2 class="not-found-error">{{ userNotFound }}</h2>
            </div>
          </v-form>
        </v-sheet>
        <v-btn
          text="Update"
          @click="updateYourLocation()"
          color="green"
        ></v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "UpdateLocation",
  setup() {
    const state = reactive({
      name: "",
      phone: "",
      adress: "",
    });
    const ruels = computed(() => {
      return {
        name: { required, minLength: minLength(2) },
        phone: { required, minLength: minLength(11) },
        adress: { required, minLength: minLength(2) },
      };
    });
    const v$ = useVuelidate(ruels, state);
    return {
      state,
      v$,
    };
  },
  data() {
    return {
      locationId: "",
      userId: "",
      successMessage: "",
      userNotFound: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userId = JSON.parse(user).id;
      this.locationId = this.$route.params.locationId;
      this.canCurrentUserAccesThisLocation();
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async canCurrentUserAccesThisLocation() {
      let result = await axios.get(
        `http://localhost:3000/location?id=${this.locationId}&userId=${this.userId}`
      );
      if (result.status == 200 && result.data.length > 0) {
        this.locationData = result.data;
        this.state.name = this.locationData[0].name;
        this.state.phone = this.locationData[0].phone;
        this.state.adress = this.locationData[0].adress;
      } else {
        this.redirectTo({ val: "home" });
      }
    },
    async updateYourLocation() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.put(
          `http://localhost:3000/location/${this.locationId}`,
          {
            name: this.state.name,
            phone: this.state.phone,
            adress: this.state.adress,
            userId: this.userId,
          }
        );
        if (result.status == 200) {
          (this.userNotFound = ""),
            (this.successMessage = "Your Update Is Success");
          setTimeout(() => {
            this.redirectTo({ val: "home" });
          }, 1000);
        } else {
          this.userNotFound = "Something Went Wrong, Try Agin";
        }
      } else {
        (this.successMessage = ""),
          (this.userNotFound = "Plese Required All Fields");
      }
    },
  },
};
</script>
<style scoped>
.error-feedback {
  color: red;
  font-size: 12px;
  transition: 0.5s;
  text-align: center;
}
.not-found-error {
  color: red;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.success-message {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
