<template>
  <v-container id="regular-tables" fluid tag="section">
    <section class="mb-12 text-center">
      <h1 class="font-weight-light mb-2" style="color:#3c4858; font-size:24px">Assignments</h1>

      <span
        class="font-weight-light"
        style="font-size: 16px; color: #3c4858"
      >For OOAD Project "Project Helper"</span>
    </section>
    <div class="py-3" />
    <v-col
      cols="12"
      md="12"
    >
      <base-material-card
        color="warning"
        inline
        class="px-5 py-3"
      >
        <template v-slot:heading>
          <div class="display-2 font-weight-light">
            Submissions
          </div>

          <div class="subtitle-1 font-weight-light">
            {{new Date().toISOString().substr(0, 10)}}
          </div>
        </template>
        <v-card-text>
          <v-data-table :headers="headers" :items="Records" class="elevation-1" >
            <template v-slot:item.dueDate="{ item }">
              <v-chip :color="getColor(item.dueDate)" dark>{{ item.dueDate }}</v-chip>
            </template>
            <template v-slot:item.view="{ item }" >
              <v-btn
                class="px-2 ml-1"
                color="warning"
                min-width="0"
                small
                to="assignment-info"
              >
                <v-icon>{{ item.view }}</v-icon>
              </v-btn>
            </template>
            <template v-slot:item.grade="{ item }">
              <v-btn
                class="px-2 ml-1"
                color="warning"
                min-width="0"
                small
                to="assignment-grading"
              >
                <v-icon>{{ item.grade }}</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </base-material-card>
    </v-col>
    <v-row align="end" align-content="center" justify="space-around">
      <v-btn
        class="ma-2"
        color="success"
      >
        New Assignment
        <v-icon right dark>mdi-cloud-upload</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      Records: [
        {
          assName: "Proposal",
          pubDate: "07/12/2020",
          dueDate: "7/12/2020",
          status: "11/58",
          comments: "New comments",
          view: "mdi-magnify-plus",
          grade: "mdi-account-check",
        },
        {
          assName: "Milestone1",
          pubDate: "07/12/2020",
          dueDate: "9/12/2020",
          status: "11/58",
          comments: "New comments",
          view: "mdi-magnify-plus",
          grade: "mdi-account-check",
        },
        {
          assName: "Milestone2",
          pubDate: "07/12/2020",
          dueDate: "10/12/2020",
          status: "11/58",
          comments: "New comments",
          view: "mdi-magnify-plus",
          grade: "mdi-account-check",
        },
      ],
      headers: [
        {
          text: "Assignment",
          align: "center",
          sortable: false,
          value: "assName",
        },
        { text: "Release Date", value: "pubDate" },
        { text: "Due Date", value: "dueDate" },
        { text: "Submit Status", value: "status" },
        { text: "Comments", value: "comments" },
        { text: "View", value: "view" },
        { text: "Grading", value: "grade" },
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
