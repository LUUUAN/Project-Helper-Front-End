<template>
  <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
    <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
      <v-icon v-if="value">mdi-view-quilt</v-icon>

      <v-icon v-else>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-toolbar-title class="hidden-sm-and-down font-weight-light" v-text="$route.name" />

    <v-spacer />

    <v-text-field :label="$t('search')" color="secondary" hide-details style="max-width: 165px;">
      <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
        <v-btn class="mt-n2" elevation="1" fab small>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <div class="mx-3" />

    <v-btn class="ml-2" min-width="0" text to="/">
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img
              src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
              alt="logo"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Wendi Luan</v-list-item-title>
            <v-list-item-subtitle>11712532</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn class="ml-2" min-width="0" text to="/profile">
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item link  href="/calendar">
          <v-list-item-title>Calendar</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout">
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
// Components
// import { VHover, VListItem } from "vuetify/lib";

// Utilities
import { mapState, mapMutations } from "vuex";

export default {
  name: "DashboardCoreAppBar",

  components: {
    // AppBarItem: {
    //   render(h) {
    //     return h(VHover, {
    //       scopedSlots: {
    //         default: ({ hover }) => {
    //           return h(
    //             VListItem,
    //             {
    //               attrs: this.$attrs,
    //               class: {
    //                 "black--text": !hover,
    //                 "white--text secondary elevation-12": hover,
    //               },
    //               props: {
    //                 activeClass: "",
    //                 dark: hover,
    //                 link: true,
    //                 ...this.$attrs,
    //               },
    //             },
    //             this.$slots.default
    //           );
    //         },
    //       },
    //     });
    //   },
    // },
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    notifications: [
      "Mike John Responded to your email",
      "You have 5 new tasks",
      "You're now friends with Andrew",
      "Another Notification",
      "Another one",
    ],
  }),

  computed: {
    ...mapState(["drawer"]),
  },

  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),
    logout() {
      this.$store.commit('LOGOUT');
      this.$router.push({ name: 'Login' })
    }
  },
};
</script>
