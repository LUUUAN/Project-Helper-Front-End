<template>
  <v-container id="addAsgmtForm" fluid tag="section">
    <section class="mb-12 text-center">
      <h1 class="font-weight-light mb-2 headline">Add New Assignment</h1>

<!--      <span class="font-weight-light subtitle-1">Create class first if you haven't</span>-->
    </section>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-6">
          <v-row>
            <v-col cols="12" md="6">
              <div class="my-3" />
              <base-subheading>Assignment Name</base-subheading>
              <v-text-field color="secondary" label="Project Name*" />
              <div class="my-3" />
              <base-subheading>Description</base-subheading>
              <v-textarea solo name="input-new-proj-info" hint="Enter Project Description Here" />
            </v-col>
            <v-col cols="12" md="6">
              <base-subheading class="mb-6">File Upload</base-subheading>

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
              <base-subheading class="mb-6">Deadline</base-subheading>
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
              <v-col cols="10">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="time"
                  transition="scale-transition"
                  min-width="290px"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="time"
                      color="secondary"
                      label="Select DDL Time"
                      prepend-icon="mdi-calendar-outline"
                      readonly
                      v-on="on"
                    />
                  </template>

                  <v-time-picker v-model="time" color="secondary" landscape scrollable>
                    <v-spacer />
                    <v-btn color="secondary" large @click="menu2 = false">Cancel</v-btn>

                    <v-btn color="secondary" large @click="$refs.menu2.save(time)">OK</v-btn>
                  </v-time-picker>
                </v-menu>
              </v-col>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-btn class="ma-3" color="success" large>
        <v-icon>mdi-check</v-icon>Create Project
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashboardFormsExtendedForms",

  data: () => ({
    menu: false,
    menu2: false,
    menu3: false,
    fields: [],
    ddlCount: 0,
    projNum: [1, 3],
    date: "",
    time: "",
    files: [],
  }),
  methods: {
  },
};
</script>
