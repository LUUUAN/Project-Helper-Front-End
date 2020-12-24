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
            <template v-slot:item.grade="{ item }">
              <v-chip :color="gradeColor(item.grade)" dark>{{ item.grade }}</v-chip>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip :color="getStatus(item.status)" dark>{{ item.status }}</v-chip>
            </template>
            <template v-slot:item.view="{ item }" >
              <v-btn
                class="px-2 ml-1"
                color="warning"
                min-width="0"
                small
                to="submissionInfo"
              >
                <v-icon>{{ item.view }}</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </base-material-card>
    </v-col>
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
          grade: "80",
          status: "Returned",
          comments: "New comments",
          view: "mdi-magnify-plus"
        },
        {
          assName: "Milestone1",
          pubDate: "07/12/2020",
          dueDate: "9/12/2020",
          grade: "unknown",
          status: "Need Grading",
          comments: "New comments",
          view: "mdi-magnify-plus"
        },
        {
          assName: "Milestone2",
          pubDate: "07/12/2020",
          dueDate: "10/12/2020",
          grade: "unknown",
          status: "Need Grading - Delayed",
          comments: "New comments",
          view: "mdi-magnify-plus"
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
        { text: "Grade", value: "grade" },
        { text: "Submit Status", value: "status" },
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
    gradeColor(grade) {
      if (grade >= 60) return "green";
      else return "orange";
    },
    getStatus(status) {
      if (status === "Not Submitted") return "red";
      else if (status === "Need Grading" || status === "Need Grading - Delayed") return "orange";
      else return "green";
    }
  },
};
</script>
