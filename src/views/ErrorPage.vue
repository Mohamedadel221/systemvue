<template>
  <div class="error">
    <div class="buttonhomepage">
      <h2>Page Not Found</h2>
      <router-link :to="{ name: 'home' }">
        <v-btn class="mt-5" color="green"> Back To Home Page </v-btn>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Error-Page",
};
</script>
<style scoped lang="scss">
.error {
  background: #cc1a0d67;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
