<template>
  <v-container id="regular-tables" fluid tag="section">
    <div class="py-3" />
    <section class="mb-12 text-center">
      <h1 class="font-weight-light mb-2" style="color:#3c4858; font-size:24px">Assignment Grading</h1>

      <span
        class="font-weight-light"
        style="font-size: 16px; color: #3c4858"
      >For "Project Helper" Milestone 1</span>
    </section>
    <base-material-card icon="mdi-lead-pencil" title="Milestone 1" class="px-5 py-3">
      <v-data-table :headers="headers" :items="Records" class="elevation-1" show-select>
        <template v-slot:item.score="{ item }">
          <v-text-field v-model="item.score"></v-text-field>
        </template>
        <template v-slot:item.date="{ item }">
          <v-chip :color="getColor(item.date)" dark>{{ item.date }}</v-chip>
        </template>
        <template v-slot:item.comments="{ item }">
          <v-text-field v-model="item.comments"></v-text-field>
        </template>
        <template v-slot:item.view="{ item }">
          <v-icon>{{ item.view }}</v-icon>
        </template>
      </v-data-table>
      <br />
      <v-row align="end" align-content="center" justify="space-around">
        <v-btn
          class="ma-2"
          color="success"
        >
          Upload Grade
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
        <v-btn
          class="ma-2"
          color="success"
        >
          Download Homework
          <v-icon right dark>mdi-cloud-download</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
        >Discard Changes</v-btn>
        <v-btn
          class="ma-2"
          color="success"
        >
          Submit Changes
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-row>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      Records: [
        {
          assNo: "Proposal",
          name: "Name1",
          id: 34,
          date: "07/12/2020",
          score: 90,
          comments: "New comments",
          view: "mdi-magnify-plus",
        },
        {
          assNo: "Proposal",
          name: "Name6",
          id: 24,
          date: "07/12/2020",
          score: 95,
          comments: "",
          view: "mdi-magnify-plus",
        },
        {
          assNo: "Proposal",
          name: "Name2",
          id: 55,
          date: "07/12/2020",
          score: 94,
          comments: "",
          view: "mdi-magnify-plus",
        },
        {
          assNo: "Proposal",
          name: "Name3",
          id: 11,
          date: "07/15/2020",
          score: 78,
          comments: "Late submission, reduce 20% score",
          view: "mdi-magnify-plus",
        },
        {
          assNo: "Proposal",
          name: "Name4",
          id: 12,
          date: "07/12/2020",
          score: 92,
          comments: "",
          view: "mdi-magnify-plus",
        },
        {
          assNo: "Proposal",
          name: "Name5",
          id: 13,
          date: "07/12/2020",
          score: 88,
          comments: "",
          view: "mdi-magnify-plus",
        },
      ],
      headers: [
        {
          text: "Assignment",
          align: "center",
          sortable: false,
          value: "assNo",
        },
        { text: "Name", value: "name" },
        { text: "Group ID", value: "id" },
        { text: "Submit Date", value: "date" },
        { text: "Score", value: "score" },
        { text: "Comments", value: "comments" },
        { text: "View", value: "view" },
      ],
    };
  },
  methods: {
    getColor(date) {
      if (date === "07/15/2020") return "red";
      else return "green";
    },
  },
};
</script>
