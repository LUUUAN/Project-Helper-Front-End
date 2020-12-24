<template>
  <v-container id="addProjForm" fluid tag="section">
    <section class="mb-12 text-center">
      <h1 class="font-weight-light mb-2 headline">Add New Course</h1>
    </section>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-6">
          <v-row>
            <v-col cols="12" md="6">
              <div class="my-3" />
              <base-subheading>Name</base-subheading>
              <v-text-field v-model="course.course_name" color="secondary" label="Course Name*" />
              <div class="my-3" />

              <base-subheading>Term</base-subheading>
              <v-row justify="start" align-content="space-between">
                <v-col cols="12" md="6">
                  <v-select :items="semesters" label="Semester" v-model="semesterRes">
                  </v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select :items="acaYear" label="Academic Year" v-model="acaYearRes">
                  </v-select>
                </v-col>
              </v-row>

              <base-subheading>Department</base-subheading>
              <v-text-field color="secondary" label="Department*" v-model="course.department"/>

              <base-subheading>Course Size</base-subheading>
              <v-text-field color="secondary" label="Course Size*" v-model="courseSizeString" type="number"/>
            </v-col>
            <v-col cols="12" md="6">

              <base-subheading>Course Time</base-subheading>
              <v-row justify="start" align-content="space-between">
                <v-col cols="6">
                  <v-select :items="days" label="Course Day" v-model="course.course_time[0].weekday">
                  </v-select>
                </v-col>
                <v-col cols="6">
                  <v-select :items="weekTypes" label="Week Type" @change="course.course_time[0].weektype = weekTypes.indexOf($event)">
                  </v-select>
                </v-col>
                <v-col cols="6" >
                  <v-menu
                    v-model="timeMenu0"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    min-width="290px"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="course.course_time[0].start_time"
                        color="secondary"
                        label="Start Time"
                        readonly
                        v-on="on"
                      />
                    </template>

                    <v-time-picker color="secondary" landscape scrollable v-model="time" format="24hr">
                      <v-spacer />
                      <v-btn color="secondary" large @click="confirmTime0">OK</v-btn>
                    </v-time-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6" >
                  <v-menu
                    v-model="timeMenu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    min-width="290px"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="course.course_time[0].end_time"
                        color="secondary"
                        label="End Time"
                        readonly
                        v-on="on"
                      />
                    </template>

                    <v-time-picker color="secondary" landscape scrollable v-model="time" format="24hr">
                      <v-spacer />
                      <v-btn color="secondary" large @click="confirmTime1">OK</v-btn>
                    </v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <br>
              <v-row justify="start" align-content="space-between">
                <v-col cols="6">
                  <v-select :items="days" label="Course Day" v-model="course.course_time[1].weekday">
                  </v-select>
                </v-col>
                <v-col cols="6">
                  <v-select :items="weekTypes" label="Week Type" @change="course.course_time[1].weektype = weekTypes.indexOf($event)">
                  </v-select>
                </v-col>
                <v-col cols="6" >
                  <v-menu
                    v-model="timeMenu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    min-width="290px"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="course.course_time[1].start_time"
                        color="secondary"
                        label="Start Time"
                        readonly
                        v-on="on"
                      />
                    </template>

                    <v-time-picker color="secondary" landscape scrollable v-model="time" format="24hr">
                      <v-spacer />
                      <v-btn color="secondary" large @click="confirmTime2">OK</v-btn>
                    </v-time-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6" >
                  <v-menu
                    v-model="timeMenu3"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    min-width="290px"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="course.course_time[1].end_time"
                        color="secondary"
                        label="End Time"
                        readonly
                        v-on="on"
                      />
                    </template>

                    <v-time-picker color="secondary" landscape scrollable v-model="time" format="24hr">
                      <v-spacer />
                      <v-btn color="secondary" large @click="confirmTime3">OK</v-btn>
                    </v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
            <v-row align="center" justify="space-around">
              <v-col cols="10">
                <base-subheading class="mb-6">Labs</base-subheading>
                <AddLab
                  v-for="field in labs"
                  :key="field.id"
                  :days="field.days"
                  :labSizeString="field.labSizeString"
                  :weekTypes="field.weekTypes"
                  @deleteLab="deleteLab(field.id)"
                  v-model="field.lab"
                ></AddLab>
                <v-btn type="button" v-on:click="addLab">Add Labs</v-btn>
              </v-col>
            </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-btn class="ma-3" color="success" large @click="createCourse">
        <v-icon>mdi-check</v-icon>Create Project
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/utils";
import AddLab from "../dashboard/accessory/AddLab.vue";

export default {
  components: { AddLab },
  name: "DashboardFormsExtendedForms",

  data: () => ({
    labs: [],
    count: 0,
    timeMenu0: false,
    timeMenu1: false,
    timeMenu2: false,
    timeMenu3: false,
    semesters: ["Spring", "Fall", "Summer"],
    acaYear: [2020, 2021, 2022, 2023],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    weekTypes: ["All Week", "Single Week", "Double Week"],
    weekTypeDict: [{ "All Week": 0, "Single Week": 1, "Double Week": 2 }],
    courseTime: ["1-2", "3-4", "5-6", "7-8", "9-10"],
    semesterRes: "",
    acaYearRes: "",
    time: "",
    courseSizeString: "",
    course: {
      course_name: "",
      semester: "",
      department: "",
      course_size: 0,
      course_time: [
        {
          start_time: "",
          end_time: "",
          weektype: "",
          weekday: ""
        },
        {
          start_time: "",
          end_time: "",
          weektype: "",
          weekday: ""
        }
      ]
    }
  }),
  methods: {
    confirmTime0() {
      this.course.course_time[0].start_time = this.time;
      this.timeMenu0 = false;
    },
    confirmTime1() {
      this.course.course_time[0].end_time = this.time;
      this.timeMenu1 = false;
    },
    confirmTime2() {
      this.course.course_time[1].start_time = this.time;
      this.timeMenu2 = false;
    },
    confirmTime3() {
      this.course.course_time[1].end_time = this.time;
      this.timeMenu3 = false;
    },
    addLab() {
      this.labs.push({
        type: AddLab,
        id: this.count++,
        days: this.days,
        weekTypes: this.weekTypes,
        labSizeString: "",
        lab: {
          lab_name: "",
          course_id: 0,
          lab_description: "",
          lab_size: 0,
          lab_time: [
            {
              start_time: "10:20",
              end_time: "12:10",
              weektype: 0,
              weekday: "Mon"
            },
          ]
        },
      });
      console.log(this.labs)
    },
    deleteLab(id) {
      let index = 0;
      for (; index < this.labs.length; index++) {
        if (this.labs[index].id === id) {
          break;
        }
      }
      this.labs.splice(index, 1);
    },
    createCourse() {
      this.course.semester = `${this.acaYearRes} ${this.semesterRes}`;
      // eslint-disable-next-line radix
      this.course.course_size = parseInt(this.courseSizeString);
      axios.post(`/course`, this.course).then((response) => {
        const { course_id } = response.data;
        // eslint-disable-next-line camelcase
        console.log(`COURSE ID : ${course_id}`)
        for (let j = 0; j < this.labs.length; j++) {
          // eslint-disable-next-line radix
          console.log(this.labs[j])
          // eslint-disable-next-line camelcase
          axios.post(`/course/${course_id}/lab`, this.labs[j].lab).then((resp) => {
            if (resp.status === 200) {
              alert("Add Success");
            }
          })
        }
      });
    }
  },
};
</script>
