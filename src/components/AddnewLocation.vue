<template>
  <div class="addnewrest text-center mt-4">
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="red"
          text="Add New Rest"
          variant="flat"
          class="text-center"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Add New Resturant">
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
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text="Close"
              color="red"
              @click="isActive.value = false"
            ></v-btn>

            <v-btn text="Add" @click="addYourLocation()" color="green"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "AddNewLocation",
  setup() {
    const state = reactive({
      name: "",
      phone: "",
      adress: "",
    });
    const ruels = computed(() => {
      return {
        name: { required, minLength: minLength(2) },
        phone: { required, minLength: minLength(11), maxLength: maxLength(11) },
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
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async addYourLocation() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.post("http://localhost:3000/location", {
          name: this.state.name,
          phone: this.state.phone,
          adress: this.state.adress,
          userId: this.userId,
        });
        if (result.status == 201) {
          (this.userNotFound = ""),
            (this.successMessage = "You Update Is Success");
          this.state.name = "";
          this.state.phone = "";
          this.state.adress = "";
          this.v$.$reset();
          setTimeout(() => {
            this.redirectTo({ val: "home" });
          }, 1000);
        } else {
          this.userNotFound = "Wrong Update";
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
