<template>
  <v-container id="addProjForm" fluid tag="section">
    <section class="mb-12 text-center">
      <h1 class="font-weight-light mb-2 headline">Add New Project</h1>

      <span class="font-weight-light subtitle-1">Create course first if you haven't</span>
    </section>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-6">
          <v-row>
            <v-col cols="12" md="6">
              <base-subheading>Course</base-subheading>

              <v-select color="secondary" item-color="secondary" :items="allCourse.map(c => c.course_name)" v-model="courseNameSelected">
                <template v-slot:item="{ attrs, item, on }">
                  <v-list-item
                    v-bind="attrs"
                    active-class="secondary elevation-4 white--text"
                    class="mx-3 mb-3 v-sheet"
                    elevation="0"
                    v-on="on"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="item" />
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-select>

              <div class="my-3" />
              <base-subheading>Name</base-subheading>
              <v-text-field color="secondary" label="Project Name*" v-model="proj.project_name"/>
              <div class="my-3" />

              <base-subheading>Grouping Rule</base-subheading>
              <v-range-slider
                label="Allowed Group Size"
                v-model="projNum"
                step="1"
                :max="10"
                :min="1"
                thumb-label="always"
                track-color="success"
                color="warning"
              ></v-range-slider>
              <v-switch
                v-model="acrossLab"
                inset
                :label="`Allow grouping across lab: ${acrossLab.toString()}`"
              ></v-switch>
              <div class="my-3" />
              <base-subheading>Description</base-subheading>
              <v-textarea solo name="input-new-proj-info" hint="Enter Project Description Here" v-model="proj.project_description"/>
            </v-col>
            <v-col cols="12" md="6">
              <base-subheading>Skill Tags</base-subheading>

              <v-combobox v-model="projectTags" color="secondary" multiple>
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    color="secondary"
                    close
                    small
                    @click="select"
                    @click:close="remove(item)"
                  >{{ item }}</v-chip>
                </template>
              </v-combobox>

              <base-subheading class="mb-6">Grouping Deadline</base-subheading>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                min-width="290px"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="proj.project_end_grouping_time"
                    color="secondary"
                    label="Select Grouping DDL"
                    prepend-icon="mdi-calendar-outline"
                    readonly
                    v-on="on"
                  />
                </template>

                <v-date-picker v-model="date" color="secondary" landscape scrollable>
                  <v-spacer />
                  <v-btn color="secondary" large @click="menu = false">Cancel</v-btn>

                  <v-btn color="secondary" large @click="saveGroupingDDL">OK</v-btn>
                </v-date-picker>
              </v-menu>
              <base-subheading class="mb-6">
                Max Group Allowed
              </base-subheading>
              <v-text-field type="number" v-model="proj.project_team_number"></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-btn class="ma-3" color="success" large @click="createNewProject">
        <v-icon>mdi-check</v-icon>Create Project
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/utils"

export default {
  name: "DashboardFormsExtendedForms",

  data: () => ({
    menu: false,
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
    projectTags: ["Javascript", "SpringBoot", "UI Design", "Vue.js"],
    acrossLab: false,
    allCourse: [],
    courseNameSelected: "",
    proj: {
      course_id: 0,
      project_name: "",
      max_project_size: 5,
      min_project_size: 2,
      project_description: "",
      project_team_number: 10,
      project_end_grouping_time: "",
      project_across_lab: 0,
    }
  }),
  methods: {
    remove (item) {
      this.projectTags.splice(this.projectTags.indexOf(item), 1)
      this.projectTags = [...this.projectTags]
    },
    saveGroupingDDL() {
      this.proj.project_end_grouping_time = this.date;
      this.menu = false;
    },
    createNewProject() {
      [this.proj.min_project_size, this.proj.max_project_size] = this.projNum
      if (this.acrossLab === false) {
        this.proj.project_across_lab = 0
      } else {
        this.proj.project_across_lab = 1
      }
      for (let i = 0; i < this.allCourse.length; i++) {
        if (this.allCourse[i].course_name === this.courseNameSelected) {
          this.proj.course_id = this.allCourse[i].course_id
        }
      }
      axios.post(`/course/${this.proj.course_id}/project`, this.proj).then((response) => {
        const projectID = response.data.project_id;
        // eslint-disable-next-line camelcase
        axios.post(`/course/${this.proj.course_id}/project/${projectID}/tag`, {
          project_id: projectID,
          project_tag_name: this.projectTags
        }).then((resp) => {
          if (resp.status === 200) {
            alert("Add Success")
          }
        })
      })
    }
  },
  created() {
    axios.get(`/teacher/${this.$store.state.user.user_id}/course`).then((response) => {
      const allCourseId = response.data.courses;
      const promises = allCourseId.map(id => axios.get(`/course/${id}`).then(resp => resp.data));
      Promise.all(promises).then(courses => {
        this.allCourse = courses;
      })
    })
  }
};
</script>
