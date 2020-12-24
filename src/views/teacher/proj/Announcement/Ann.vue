<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" lg="12" md="12">
        <base-material-card color="warning" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">{{ansmt.title}}</div>

            <div class="subtitle-1 font-weight-light">{{ansmt.time}}</div>
          </template>
          <v-card-text>{{ansmt.content}}</v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="space-around">
      <v-btn color="success"  @click="$router.go(-1)">Go Back</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    ansmt: {
      course: "OOAD",
      time: "2020-12-04",
      title: "Announcement Title",
      content: "Some content for the announcement",
    },
  }),
  methods: {},
};
</script>
