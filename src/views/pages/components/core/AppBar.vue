<template>
  <v-app-bar
    absolute
    color="transparent"
    flat
    height="85"
  >
    <v-container>
      <v-row align="center">
        <v-toolbar-title
          class="font-weight-light"
          v-text="title"
        />

        <v-spacer />
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'PagesCoreAppBar',

    data: () => ({
      titles: {
        '/pages/lock': 'Lock Page',
        '/pages/login': 'Login Page',
        '/pages/pricing': 'Pricing Page',
        '/pages/register': 'Register Page'
      }
    }),

    computed: {
      title() {
        return this.titles[this.$route.path]
      }
    }
  }
</script>
