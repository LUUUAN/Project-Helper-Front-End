<template>
  <v-card>
    <v-row justify="space-around">
      <v-col cols="10">
        <v-text-field color="secondary" label="Milestone Name" />
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col cols="10">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          min-width="290px"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              color="secondary"
              label="Select DDL Date"
              prepend-icon="mdi-calendar-outline"
              readonly
              v-on="on"
            />
          </template>

          <v-date-picker v-model="date" color="secondary" landscape scrollable>
            <v-spacer />
            <v-btn color="secondary" large @click="menu = false">Cancel</v-btn>

            <v-btn color="secondary" large @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-btn @click="$emit('deleteddl', idx)" class="ma-1" color="warning">
        <v-icon>mdi-close</v-icon>Delete
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    menu: false,
    date: "",
    id: "",
  },
  data: function () {
    return {
      idx: this.$vnode.key,
    };
  },
  methods: {},
};
</script>