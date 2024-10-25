import { createStore } from "vuex";
import axios from "axios";
import router from "@/router/index";
const state = {
  isUserLoggedIn: "",
  loggedInUser: "",
  numberOfCategories: "",
  listOfCategories: [],
  listOfItem: [],
  // listOfLocaion: [],
  locationId: "",
};
const getters = {};
const mutations = {
  redirectTo(state, payload) {
    router.push({ name: payload });
  },
  isUserLoggedInUser(state) {
    let user = localStorage.getItem("user-info");
    if (user) {
      state.isUserLoggedIn = true;
      state.loggedInUser = JSON.parse(user).id;
    } else {
      state.isUserLoggedIn = false;
    }
  },
  async displayAllCatego(state, payload) {
    try {
      let result = await axios.get(
        `http://localhost:3000/Catego?userId=${payload.userIdIs}&locationId=${payload.locationIdIs}`
      );

      if (result.status === 200) {
        state.listOfCategories = result.data;
        state.numberOfCategories = state.listOfCategories.length;
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
  // async canUserAcessThisItem(state, payload) {
  //   try {
  //     let result = await axios.get(
  //       `http://localhost:3000/item?userId=${payload.userIdIs}&locationId=${payload.itemIdIs}`
  //     );

  //     if (result.status === 200) {
  //       state.listOfCategories = result.data;
  //       if(state.listOfItem.length)
  //     }
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // },
};
const actions = {
  redirectTo({ commit }, payload) {
    commit("redirectTo", payload.val);
  },
};
export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
