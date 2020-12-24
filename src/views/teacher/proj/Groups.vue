<template>
  <v-container id="regular-tables" fluid tag="section">
    <div class="py-3" />
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title>
          Group Info
        </v-card-title>

        <v-card-text>
          <p class="text-subtitle-1">Group Member: </p>
          <p class="text-subtitle-1">Student A, Student B, Student C</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue"
            text
            @click="dialog = false"
          >
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <base-material-card icon="mdi-account-group" title="Group Info" class="px-5 py-3">
      <br />
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        v-model="search"
        label="Search By Student ID / Group ID / Student Name"
        class="hidden-sm-and-down pl-4 pr-4"
      ></v-text-field>
      <br />

      <v-data-table :headers="headers" :items="Records" :search="search" class="elevation-1">
        <template v-slot:item.view="{ item }">
          <v-btn
            class="px-2 ml-1"
            color="warning"
            min-width="0"
            small
            @click="dialog = true"
          >
            <v-icon>{{ item.view }}</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.proposal="{ item }">
          <v-chip :color="getColor(item.proposal)" dark>{{ getText(item.proposal) }}</v-chip>
        </template>
        <template v-slot:item.milestone1="{ item }">
          <v-chip :color="getColor(item.milestone1)" dark>{{ getText(item.milestone1) }}</v-chip>
        </template>
      </v-data-table>
      <br />
      <v-row align="end" align-content="center" justify="space-around">
        <v-spacer></v-spacer>
        <v-btn
          class="ma-2"
          :loading="loading2"
          :disabled="loading2"
          color="success"
          @click="loader = 'loading2'"
        >Grouping</v-btn>
        <v-btn
          :loading="loading3"
          :disabled="loading3"
          color="blue-grey"
          class="ma-2 white--text"
          @click="loader = 'loading3'"
        >Edit</v-btn>
      </v-row>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      dialog: false,
      Records: [
        {
          groupId: 11,
          proposal: 90,
          milestone1: false,
          view: "mdi-magnify-plus",
        },
        {
          groupId: 4,
          proposal: 99,
          milestone1: false,
          view: "mdi-magnify-plus",
        },
        {
          groupId: 9,
          proposal: 94,
          milestone1: false,
          view: "mdi-magnify-plus",
        },
        {
          groupId: 2,
          proposal: 88,
          milestone1: true,
          view: "mdi-magnify-plus",
        },
      ],
      headers: [
        { text: "Group ID", value: "groupId" },
        { text: "Proposal", value: "proposal" },
        { text: "MileStone 1", value: "milestone1" },
        { text: "View", value: "view" },
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
