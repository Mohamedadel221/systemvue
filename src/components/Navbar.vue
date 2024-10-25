<template>
  <nav>
    <ul id="nav">
      <router-link :to="{ name: 'home' }" exact>
        <a>Home</a>
      </router-link>
      <a href="#" @click="logOutMe()">Log Out</a>
    </ul>
  </nav>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "NavBar",
  methods: {
    ...mapActions(["redirectTo"]),
    logOutMe() {
      localStorage.clear();
      this.redirectTo({ val: "log-in" });
    },
  },
};
</script>
<style scoped lang="scss">
nav {
  background: #000;
}
$fontColor: darkcyan;
$navColor: #525a5a;
ul {
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
    font-weight: bold;
    padding: 10px;
    color: $fontColor;
  }
}
// a.router-link-exact-active a,
// ul a a:hover {
//   color: $navColor;
// }
</style>
