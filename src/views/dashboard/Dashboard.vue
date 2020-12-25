<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" lg="12" md="12">
        <base-material-card color="success" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Enrolled Project</div>

            <!-- <div class="subtitle-1 font-weight-light">15th September, 2020</div> -->
          </template>
          <v-card-text>
            <v-row justify="space-around">
              <v-col cols="4" md="4" lg="4" v-for="(proj, i) in this.$store.state.projects" :key="i">
                <base-material-card color="info" class="px-5 py-3" >
                  <template v-slot:heading>
                    <div class="text-h6 font-weight-light">{{proj.project_name}}</div>
                  </template>
                  <v-card-text>
                    <div class="text-h6 font-weight-black">{{proj.project_course}}</div>
                    <br />
                    <span class="text-h6 font-weight-black">Teammates:&#160;</span>
                    <span class="text-h6 font-weight-orginal">Student A, Student B</span>
                    <br />
                    <span class="text-h6 font-weight-black">Recent Deadline:&#160;</span>
                    <span class="text-h6 font-weight-orginal">Nov.26th -- Milestone 2</span>
                    <br />
                    <br />

                    <v-row justify="center">
                      <v-btn @click="toProject(proj.project_id)" class="ma-1" color="info">
                        View
                      </v-btn>
                    </v-row>

                  </v-card-text>
                </base-material-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="success" class="mr-0">Previous Project</v-btn>
          </v-card-actions>
        </base-material-card>
      </v-col>

      <v-col cols="6" md="6" lg="6">
        <base-material-card color="secondary">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Calender</div>
          </template>
          <v-card-text>
            <v-sheet tile height="54" class="d-flex">
              <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-select
                v-model="type"
                :items="types"
                dense
                outlined
                hide-details
                class="ma-2"
                label="type"
              ></v-select>
              <v-select
                v-model="mode"
                :items="modes"
                dense
                outlined
                hide-details
                label="event-overlap-mode"
                class="ma-2"
              ></v-select>
              <v-select
                v-model="weekday"
                :items="weekdays"
                dense
                outlined
                hide-details
                label="weekdays"
                class="ma-2"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-sheet>
            <v-sheet height="600">
              <v-calendar
                ref="calendar"
                v-model="value"
                :weekdays="weekday"
                :type="type"
                :events="events"
                :event-overlap-mode="mode"
                :event-overlap-threshold="30"
                :event-color="getEventColor"
                @change="getEvents"
              ></v-calendar>
            </v-sheet>
          </v-card-text>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="6">
        <base-material-card color="warning">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Recent Announcement</div>

            <div class="subtitle-1 font-weight-light">15th September, 2020</div>
          </template>
          <v-card-text>
            <v-timeline align-top dense>
              <v-timeline-item
                v-for="(timeline, i) in timelines"
                :key="i"
                :color="timeline.color"
                :icon="timeline.icon"
                fill-dot
                large
              >
                <v-card class="pa-6">
                  <v-chip :color="timeline.color" class="overline mb-3" small>
                    {{
                    timeline.chip[0]
                    }}
                  </v-chip>
                  <v-chip :color="timeline.color" class="overline mb-3" small>
                    {{
                    timeline.chip[1]
                    }}
                  </v-chip>

                  <p class="subtitle-1" v-text="timeline.text" />

                  <div class="text-uppercase body-2" v-text="timeline.subtext" />

<!--                  <template v-if="timeline.action">-->
<!--                    <v-divider class="mb-3" />-->

<!--                    <v-menu-->
<!--                      v-model="menu"-->
<!--                      bottom-->
<!--                      offset-y-->
<!--                      origin="top left"-->
<!--                      right-->
<!--                      transition="scale-transition"-->
<!--                    >-->
<!--                      <template v-slot:activator="{ attrs, on }">-->
<!--                        <v-btn v-bind="attrs" :color="timeline.action" default v-on="on">-->
<!--                          <v-icon left v-text="timeline.actionIcon" />-->
<!--                          <v-icon right>-->
<!--                            {{-->
<!--                            menu ? "mdi-menu-up" : "mdi-menu-down"-->
<!--                            }}-->
<!--                          </v-icon>-->
<!--                        </v-btn>-->
<!--                      </template>-->

<!--                      <v-sheet>-->
<!--                        <v-list>-->
<!--                          <v-list-item v-for="a in timeline.actions" :key="a" link>-->
<!--                            <v-list-item-title v-text="a" />-->
<!--                          </v-list-item>-->
<!--                        </v-list>-->
<!--                      </v-sheet>-->
<!--                    </v-menu>-->
<!--                  </template>-->
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/utils"
// import MaterialCard from "../../components/base/MaterialCard.vue";
export default {
  // components: { MaterialCard },
  data: () => ({
    tabs: 0,
    chartData: {
      columns: ["date", "cost", "profit"],
      rows: [
        { date: "01/01", cost: 123, profit: 3 },
        { date: "01/02", cost: 1223, profit: 6 },
        { date: "01/03", cost: 2123, profit: 90 },
        { date: "01/04", cost: 4123, profit: 12 },
        { date: "01/05", cost: 3123, profit: 15 },
        { date: "01/06", cost: 7123, profit: 20 },
      ],
    },
    sections: [
      { label: "Haven't Submit", value: 25, color: "#f4511e" },
      { label: "Evaluated", value: 25, color: "#4caf50" },
      { label: "Need Evaluation", value: 50, color: "#ff9100" },
    ],
    type: "month",
    types: ["month", "week", "day", "4day"],
    mode: "stack",
    modes: ["stack", "column"],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] },
    ],
    value: "",
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Conference",
      "Party",
    ],
    timelines: [
      {
        chip: ["CS305", "Announcement for Milestone"],
        color: "error",
        icon: "mdi-briefcase",
        text: `Wifey made the best Father's Day meal ever. So thankful so happy so blessed. Thank you for making my family We just had fun with the “future” theme !!! It was a fun night all together ... The always rude Kanye Show at 2am Sold Out Famous viewing @ Figueroa and 12th in downtown.`,
        subtext: "11 hours ago via twitter",
      },
      {
        chip: ["CS303A", "Reminder for Project"],
        color: "success",
        icon: "mdi-puzzle",
        text: `Thank God for the support of my wife and real friends. I also wanted to point out that it’s the first album to go number 1 off of streaming!!! I love you Ellen and also my number one design rule of anything I do from shoes to music to homes is that Kim has to like it....`,
      },
      {
        chip: ["CS305", "Assinment Release"],
        color: "info",
        icon: "mdi-fingerprint",
        text: `Called I Miss the Old Kanye That’s all it was Kanye And I love you like Kanye loves Kanye Famous viewing @ Figueroa and 12th in downtown LA 11:10PM. What if Kanye made a song about Kanye Royère doesn't make a Polar bear bed but the Polar bear couch is my favorite piece of furniture we own It wasn’t any Kanyes Set on his goals Kanye`,
        action: "info",
        actionIcon: "mdi-wrench",
        actions: ["Action", "Another Action", "Something else here"],
      },
    ],
  }),
  methods: {
    getEvents({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });
      }

      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    toProject(projectId) {
      this.$router.push({ name: 'Project Dashboard' });
      this.$store.state.project = projectId;
    },
    getProject() {
      let projectID = [];
      console.log("IN getProject()");
      console.log(`/student/${this.$store.state.user.user_id}/project`);
      axios.get(`/student/${this.$store.state.user.user_id}/project`)
        .then(response => (projectID = response.data.proj))
        .catch((error) => {
          console.log(error);
        });
      console.log(projectID);
      projectID.forEach(async (id) => {
        axios.get(`/course/project/${id}`)
        .then(response => (this.$store.state.projects.append(response.data.proj)))
        .catch((error) => {
          console.log(error);
        });
      });
      console.log(`${this.proj}`);
    },
  },
  created() {
    this.getProject();
  }
};
</script>
