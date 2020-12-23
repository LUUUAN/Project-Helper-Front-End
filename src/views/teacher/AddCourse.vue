<template>
  <v-container id="addProjForm" fluid tag="section">
    <section class="mb-12 text-center">
      <h1 class="font-weight-light mb-2 headline">Add New Course</h1>

      <span class="font-weight-light subtitle-1">Create class first if you haven't</span>
    </section>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-6">
          <v-row>
            <v-col cols="12" md="6">
              <div class="my-3" />
              <base-subheading>Name</base-subheading>
              <v-text-field color="secondary" label="Course Name*" />
              <div class="my-3" />

              <base-subheading>Term</base-subheading>
              <v-row justify="start" align-content="space-between">
                <v-col cols="12" md="6">
                  <v-select :items="semesters" label="Semester">
                  </v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select :items="acaYear" label="Academic Year">
                  </v-select>
                </v-col>
              </v-row>

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

              <base-subheading>Course Time</base-subheading>
              <v-row justify="start" align-content="space-between">
                <v-col cols="12" md="4">
                  <v-select :items="days" label="Course Day">
                  </v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select :items="courseTime" label="Course Time">
                  </v-select>
                </v-col>
                <v-col cols="12" md="4">
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
                        label="Select end date of course"
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

              <base-subheading class="mb-6">Labs</base-subheading>
              <Deadline
                v-for="field in fields"
                :key="field.id"
                :menu="field.menu"
                :date="field.date"
                :id="field.id"
                @deleteddl="deleteDDL"
              ></Deadline>
              <v-btn type="button" v-on:click="addDDL()">Add Labs</v-btn>
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
import Deadline from "../dashboard/accessory/Deadline.vue";

export default {
  components: { Deadline },
  name: "DashboardFormsExtendedForms",

  data: () => ({
    menu: false,
    menu2: false,
    menu3: false,
    semesters: ["Spring", "Fall", "Summer"],
    acaYear: [2020, 2021, 2022, 2023],
    days: ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."],
    courseTime: ["1-2", "3-4", "5-6", "7-8", "9-10"],
    fields: [],
    ddlCount: 0,
    projNum: [1, 3],
    date: "",
    dropdown: [
      {
        id: 1,
        text: "Action",
      },
      {
        id: 2,
        text: "Another Action",
      },
      {
        id: 3,
        text: "A Third Action",
      },
    ],
    files: [],
    items: ["Javascript", "SpringBoot", "UI Design", "Vue.js"],
    classes: [
      "Object Oriented Analysis and Design",
      "Cyptography and Network Security",
      "Computer Network",
      "Embedded System",
      "Artifitial Intelligence",
    ],
    acrossLab: false,
  }),
  methods: {
    addDDL: function () {
      this.fields.push({
        type: Deadline,
        id: this.count++,
        date: "",
        menu: false,
      });
    },
    deleteDDL(id) {
      let index = 0;
      for (; index < this.fields.length; index++) {
        if (this.fields[index].id === id) {
          break;
        }
      }
      this.fields.splice(index, 1);
    },
  },
};
</script>
