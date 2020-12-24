<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" lg="12" md="12">
        <base-material-card color="warning" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">{{asgmt.title}}</div>

            <div class="subtitle-1 font-weight-light">{{asgmt.time}}</div>
          </template>
          <v-card-text>{{asgmt.content}}</v-card-text>
          <base-subheading>Upload</base-subheading>
              <v-textarea solo name="input-ass-info" hint="Enter texts" />
          <v-file-input
                v-model="files"
                color="deep-purple accent-4"
                counter
                label="File input"
                multiple
                placeholder="Select your files"
                prepend-icon="mdi-paperclip"
                outlined
                :display-size="1000"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>{{ text }}</v-chip>
                  <span
                    v-else-if="index === 2"
                    class="overline grey--text text--darken-3 mx-2"
                  >+{{ files.length - 2 }} File(s)</span>
                </template>
              </v-file-input>
        </base-material-card>
      </v-col>
    </v-row>
    <v-row>
      <v-btn large v-on="on" @click="$router.go(-1)">Go Back</v-btn>
      <v-btn large v-on="on" color="success">
            <v-icon>mdi-upload</v-icon>
              Submit
              </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    asgmt: {
      course: "OOAD",
      time: "2020-12-04",
      title: "Assignment Title",
      content: "Some content for the submission",
    },
  }),
  methods: {}
}
</script>
