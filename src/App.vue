<template>
  <router-view />
</template>

<script>
  function initStore(store) {
    store.dispatch('FETCH_LABS').catch(() => {
      console.log(`FETCH_LABS Failed!`);
    });
    store.dispatch('FETCH_PROJECT').catch(() => {
      console.log(`FETCH_LABS Failed!`);
    });
  }
  export default {
    name: 'App',
    created() {
      initStore(this.$store);
      console.log("App init");
      // this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  }
</script>

<style lang="scss">
@import "./assets/css/app";
</style>
