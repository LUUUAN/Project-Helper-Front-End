<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props"/>
    </template>

    <v-list-item two-line>
      <v-list-item-avatar>
        <v-img src="https://pbs.twimg.com/profile_images/1128205573290201088/ubtJr521.png"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-uppercase font-weight-regular display-2">Wendi Luan</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list expand nav>

      <div/>

      <template v-for="(item, i) in computedItems_all">
        <base-item-group v-if="item.children" :key="`group-${i}`" :item="item"/>
        <base-item v-else :key="`item-${i}`" :item="item"/>
      </template>
      <div v-if="roles=== 'teacher'">
        <template v-for="(item, i) in computedItems_TA">
          <base-item-group v-if="item.children" :key="`group1-${i}`" :item="item"/>
          <base-item v-else :key="`item1-${i}`" :item="item"/>
        </template>
      </div>
      <div v-if="this.$store.state.project!=null">
        <div v-if="roles === 'student'">
          <template v-for="(item, i) in computedItems_proj_stu">
            <base-item-group v-if="item.children" :key="`group2-${i}`" :item="item"/>
            <base-item v-else :key="`item2-${i}`" :item="item"/>
          </template>
        </div>
        <div v-else>
          <template v-for="(item, i) in computedItems_proj">
            <base-item-group v-if="item.children" :key="`group2-${i}`" :item="item"/>
            <base-item v-else :key="`item2-${i}`" :item="item"/>
          </template>
        </div>
      </div>
      <div/>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from "vuex";
// import Icons from "../../component/Icons.vue";

export default {
  name: "DashboardCoreDrawer",
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    items_all: [
      {
        icon: "mdi-view-dashboard",
        title: "DASHBOARD",
        to: "/dashboard",
      },
      {
        icon: "mdi-calendar-month",
        title: "CALENDAR",
        to: "/calendar",
      },
    ],
    items_stu: [
      {
        icon: "mdi-image",
        title: "Optional Projects",
        to: "/optionalProj"
      }
    ],
    items_TA: [
      {
        title: "ADD COURSE",
        to: "/add-course",
        icon: "mdi-folder-plus",
      },
      {
        title: "ADD PROJECT",
        to: "/add-proj",
        icon: "mdi-folder-plus",
      },
    ],
    items_proj: [
      {
        group: "/proj",
        icon: "mdi-image",
        title: "PROJECT",
        children: [
          {
            title: "PROJECT HOME",
            to: "home",
            icon: "mdi-view-dashboard",
          },
          {
            title: "ANNOUNCEMENT",
            to: "announcements",
            icon: "mdi-archive-arrow-up-outline",
          },
          {
            title: "ASSIGNMENT",
            to: "assignment-list",
            icon: "mdi-lead-pencil",
          },
          {
            title: "GROUP",
            to: "groups",
            icon: "mdi-account-group",
          },

          {
            title: "STUDENT",
            to: "students",
            icon: "mdi-account-box-multiple",
          },
        ],
      },
    ],
    items_proj_stu: [
      {
        group: "/proj",
        icon: "mdi-image",
        title: "PROJECT",
        children: [
          {
            title: "PROJECT HOME",
            to: "dash",
            icon: "mdi-view-dashboard",
          },
          {
            title: "ANNOUNCEMENT",
            to: "announcements",
            icon: "mdi-archive-arrow-up-outline",
          },
          {
            title: "MEMBERS",
            to: "members",
            icon: "mdi-account-box-multiple"
          },
          {
            title: "SUBMISSIONS",
            to: "submissions",
            icon: "mdi-folder",
          },
        ],
      },
    ],
  }),

  computed: {
    ...mapState(["barColor", "barImage"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
    computedItems_all() {
      return this.items_all.map(this.mapItem);
    },
    computedItems_TA() {
      return this.items_TA.map(this.mapItem);
    },
    computedItems_stu() {
      return this.items_stu.map(this.mapItem);
    },
    computedItems_proj() {
      return this.items_proj.map(this.mapItem);
    },
    computedItems_proj_stu() {
      return this.items_proj_stu.map(this.mapItem);
    },
    roles() {
      return window.localStorage.getItem('roles');
    }
  },

  watch: {
    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    },
  },

  methods: {
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title),
      };
    },
  },
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important

      .v-list-group--sub-group
        display: block !important

    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
        margin-right: 24px
        margin-left: 12px !important

        +rtl()
        margin-left: 24px
        margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
        padding-left: 8px

        +rtl()
        padding-right: 8px

      .v-list-group__header
        +ltr()
        padding-right: 0

        +rtl()
        padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
          margin-right: 8px

          +rtl()
          margin-left: 8px
</style>
