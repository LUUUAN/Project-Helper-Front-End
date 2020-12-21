<template>
  <v-container id="regular-tables" fluid tag="section">
    <div class="py-3" />

    <base-material-card icon="mdi-account-box-multiple" title="Students Info" class="px-5 py-3">
      <br />
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search By Student ID / Student Name"
        class="hidden-sm-and-down pl-4 pr-4"
      ></v-text-field>
      <br />

      <v-data-table :headers="headers" :items="Records" class="elevation-1">
        <template v-slot:item.view="{ item }">
          <v-icon>{{ item.view }}</v-icon>
        </template>
      </v-data-table>
      <br />
      <v-row align="center" align-content="center" justify="space-around">
        <v-dialog v-model="changeDialog"
                  persistent
                  max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="success"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Add Member
            </v-btn>
          </template>
          <v-card class="pa-6">
            <v-card-title>
              Add Member
            </v-card-title>
            <br>
            <br>
            <v-text-field
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search By Student ID / Student Name / Tag"
              class="hidden-sm-and-down pl-4 pr-4"
            ></v-text-field>
            <br />
            <v-data-table :headers="stuheaders" :single-select=false show-select item-key="stuid" :items="students" class="elevation-1">
              <template v-slot:item.view="{ item }">
                <v-icon>{{ item.view }}</v-icon>
              </template>
            </v-data-table>
            <v-row align="center" justify="space-around" align-content="center">
              <v-btn
                color="success"
                dark
                @click="changeDialog=false"
              >
                Add
              </v-btn>
              <v-btn
                color="warning"
                dark
                @click="changeDialog=false"
              >
                Close
              </v-btn>
            </v-row>
          </v-card>
        </v-dialog>
      </v-row>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      changeDialog: false,
      manuAddDialog: false,
      fileAddDialog: false,
      Records: [
        {
          name: "Name1",
          stuid: "11810000",
          distribution: "Leader",
          tags: ["Java", "Database"],
          view: "mdi-magnify-plus",
        },
        {
          name: "Name2",
          stuid: "11810001",
          distribution: "",
          tags: ["Java", "System Building", "Factory"],
          view: "mdi-magnify-plus",
        },
        {
          name: "Name3",
          stuid: "11810002",
          distribution: "",
          tags: ["JavaScript", "Vue", "Framework"],
          view: "mdi-magnify-plus",
        },
        {
          name: "Name4",
          stuid: "11810003",
          distribution: "",
          tags: ["JavaScript", "TypeScript", "Vue", "Optimization"],
          view: "mdi-magnify-plus",
        },
      ],
      headers: [
        { text: "Name", value: "name" },
        { text: "Student ID", value: "stuid" },
        { text: "Distribution", value: "distribution" },
        { text: "Tags", value: "tags" },
        { text: "View", value: "view" },
      ],
      students: [
        {
          name: "Name1",
          stuid: "11810000",
          tags: ["Java", "Database"],
          view: "mdi-magnify-plus",
        },
        {
          name: "Name2",
          stuid: "11810001",
          tags: ["Java", "System Building", "Factory"],
          view: "mdi-magnify-plus",
        },
        {
          name: "Name3",
          stuid: "11810002",
          tags: ["JavaScript", "Vue", "Framework"],
          view: "mdi-magnify-plus",
        },
        {
          name: "Name4",
          stuid: "11810003",
          tags: ["JavaScript", "TypeScript", "Vue", "Optimization"],
          view: "mdi-magnify-plus",
        },
      ],
      stuheaders: [
        { text: "Name", value: "name" },
        { text: "Student ID", value: "stuid" },
        { text: "Tags", value: "tags" },
      ],
    };
  },
  methods: {
    getColor(state) {
      if (state === false) return "red";
      else if (state === true) return "orange";
      else return "green";
    },
    getText(state) {
      if (state === false) return "Unfinished";
      else if (state === true) return "Need Grading";
      else return state;
    },
  },
};
</script>
