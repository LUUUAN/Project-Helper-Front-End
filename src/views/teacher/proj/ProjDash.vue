<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
<!--      <v-col cols="6" lg="6" md="6">-->
<!--        <div v-if="proj!=null">-->
<!--          <base-material-card color="warning" class="px-5 py-3">-->
<!--            <template v-slot:heading>-->
<!--              <div class="display-2 font-weight-light">Project Info</div>-->
<!--            </template>-->
<!--            <v-card-text class="pa-6">-->
<!--              <v-row justify="start">-->
<!--                <v-col cols="12" lg="3" md="3" sm="3">-->
<!--                  <p class="text-h6">Course:</p>-->
<!--                </v-col>-->
<!--                <v-col cols="12" lg="9" md="9" sm="9" justify="start">-->
<!--                  <p class="text-h6 font-weight-light">-->
<!--                    {{ this.proj.class }}-->
<!--                  </p>-->
<!--                </v-col>-->
<!--              </v-row>-->
<!--              <v-row justify="start">-->
<!--                <v-col cols="12" lg="3" md="3" sm="3">-->
<!--                  <p class="text-h6">Project Name:</p>-->
<!--                </v-col>-->
<!--                <v-col cols="12" lg="9" md="9" sm="9" justify="start">-->
<!--                  <p class="text-h6 font-weight-light">-->
<!--                    {{ proj.name }}-->
<!--                  </p>-->
<!--                </v-col>-->
<!--              </v-row>-->
<!--              <v-row justify="start">-->
<!--                <v-col cols="12" lg="3" md="3" sm="3">-->
<!--                  <p class="text-h6">Group Size:</p>-->
<!--                </v-col>-->
<!--                <v-col cols="12" lg="9" md="9" sm="9" justify="start">-->
<!--                  <p class="text-h6 font-weight-light">-->
<!--                    {{ proj.projNum[0] }}~{{ proj.projNum[1] }}-->
<!--                  </p>-->
<!--                </v-col>-->
<!--              </v-row>-->
<!--              <v-row justify="start">-->
<!--                <v-col cols="12" lg="3" md="3" sm="3">-->
<!--                  <p class="text-h6">Description:</p>-->
<!--                </v-col>-->
<!--                <v-col cols="12" lg="9" md="9" sm="9" justify="start">-->
<!--                  <p class="text-h6 font-weight-light">-->
<!--                    {{ proj.discription }}-->
<!--                  </p>-->
<!--                </v-col>-->
<!--              </v-row>-->
<!--              <v-row justify="center">-->
<!--                <v-dialog v-model="changeProjDialog"-->
<!--                          persistent-->
<!--                          max-width="1200px">-->
<!--                  <template v-slot:activator="{ on, attrs }">-->
<!--                    <v-btn-->
<!--                      color="primary"-->
<!--                      dark-->
<!--                      v-bind="attrs"-->
<!--                      v-on="on"-->
<!--                    >-->
<!--                      Change-->
<!--                    </v-btn>-->
<!--                  </template>-->
<!--                  <v-card class="pa-6">-->
<!--                    <v-row>-->
<!--                      <v-col cols="12" md="6">-->
<!--                        <base-subheading>Course</base-subheading>-->

<!--                        <v-select color="secondary" item-color="secondary" :items="classes">-->
<!--                          <template v-slot:item="{ attrs, item, on }">-->
<!--                            <v-list-item-->
<!--                              v-bind="attrs"-->
<!--                              active-class="secondary elevation-4 white&#45;&#45;text"-->
<!--                              class="mx-3 mb-3 v-sheet"-->
<!--                              elevation="0"-->
<!--                              v-on="on"-->
<!--                            >-->
<!--                              <v-list-item-content>-->
<!--                                <v-list-item-title v-text="item" />-->
<!--                              </v-list-item-content>-->
<!--                            </v-list-item>-->
<!--                          </template>-->
<!--                        </v-select>-->

<!--                        <div class="my-3" />-->
<!--                        <base-subheading>Name</base-subheading>-->
<!--                        <v-text-field color="secondary" label="Project Name*" />-->
<!--                        <div class="my-3" />-->

<!--                        <base-subheading>Group Size</base-subheading>-->
<!--                        <v-range-slider-->
<!--                          label="Allowed Group Size"-->
<!--                          v-model="projNum"-->
<!--                          step="1"-->
<!--                          :max="10"-->
<!--                          :min="1"-->
<!--                          thumb-label="always"-->
<!--                          track-color="success"-->
<!--                          color="warning"-->
<!--                        ></v-range-slider>-->
<!--                        <div class="my-3" />-->
<!--                        <base-subheading>Description</base-subheading>-->
<!--                        <v-textarea solo name="input-new-proj-info" hint="Enter Project Description Here" />-->
<!--                      </v-col>-->
<!--                      <v-col cols="12" md="6">-->
<!--                        <base-subheading>Skill Tags</base-subheading>-->

<!--                        <v-combobox v-model="items" color="secondary" multiple>-->
<!--                          <template v-slot:selection="{ attrs, item, select, selected }">-->
<!--                            <v-chip-->
<!--                              v-bind="attrs"-->
<!--                              :input-value="selected"-->
<!--                              color="secondary"-->
<!--                              close-->
<!--                              small-->
<!--                              @click="select"-->
<!--                              @click:close="remove(item)"-->
<!--                            >{{ item }}</v-chip>-->
<!--                          </template>-->
<!--                        </v-combobox>-->
<!--                        <base-subheading class="mb-6">File Upload</base-subheading>-->

<!--                        <v-file-input-->
<!--                          v-model="files"-->
<!--                          color="deep-purple accent-4"-->
<!--                          counter-->
<!--                          label="File input"-->
<!--                          multiple-->
<!--                          placeholder="Select your files"-->
<!--                          prepend-icon="mdi-paperclip"-->
<!--                          outlined-->
<!--                          :display-size="1000"-->
<!--                        >-->
<!--                          <template v-slot:selection="{ index, text }">-->
<!--                            <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>{{ text }}</v-chip>-->

<!--                            <span-->
<!--                              v-else-if="index === 2"-->
<!--                              class="overline grey&#45;&#45;text text&#45;&#45;darken-3 mx-2"-->
<!--                            >+{{ files.length - 2 }} File(s)</span>-->
<!--                          </template>-->
<!--                        </v-file-input>-->
<!--                        <base-subheading class="mb-6">Deadline</base-subheading>-->
<!--                        <Deadline-->
<!--                          v-for="field in fields"-->
<!--                          :key="field.id"-->
<!--                          :menu="field.menu"-->
<!--                          :date="field.date"-->
<!--                          :id="field.id"-->
<!--                          @deleteddl="deleteDDL"-->
<!--                        ></Deadline>-->
<!--                        <v-btn type="button" v-on:click="addDDL()">Add Deadline</v-btn>-->
<!--                      </v-col>-->
<!--                    </v-row>-->
<!--                    <v-row justify="center">-->
<!--                      <v-spacer></v-spacer>-->
<!--                      <v-btn-->
<!--                        color="blue darken-1"-->
<!--                        text-->
<!--                        @click="changeProjDialog = false"-->
<!--                      >-->
<!--                        Close-->
<!--                      </v-btn>-->
<!--                      <v-btn-->
<!--                        color="blue darken-1"-->
<!--                        text-->
<!--                        @click="changeProjDialog = false"-->
<!--                      >-->
<!--                        Save-->
<!--                      </v-btn>-->
<!--                    </v-row>-->
<!--                  </v-card>-->
<!--                </v-dialog>-->
<!--              </v-row>-->
<!--            </v-card-text>-->
<!--&lt;!&ndash;            <v-card-actions>&ndash;&gt;-->
<!--&lt;!&ndash;              <v-btn color="success" class="mr-0" to="announcementDetail">View Details</v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;            </v-card-actions>&ndash;&gt;-->
<!--          </base-material-card>-->
<!--        </div>-->
<!--      </v-col>-->
<!--      <v-col cols="6" md="6" lg="6">-->
<!--        <base-material-card color="secondary">-->
<!--          <template v-slot:heading>-->
<!--            <div class="display-2 font-weight-light">Calender</div>-->
<!--          </template>-->
<!--          <v-card-text>-->
<!--            <v-sheet tile height="54" class="d-flex">-->
<!--              <v-btn icon class="ma-2" @click="$refs.calendar.prev()">-->
<!--                <v-icon>mdi-chevron-left</v-icon>-->
<!--              </v-btn>-->
<!--              <v-select-->
<!--                v-model="type"-->
<!--                :items="types"-->
<!--                dense-->
<!--                outlined-->
<!--                hide-details-->
<!--                class="ma-2"-->
<!--                label="type"-->
<!--              ></v-select>-->
<!--              <v-select-->
<!--                v-model="mode"-->
<!--                :items="modes"-->
<!--                dense-->
<!--                outlined-->
<!--                hide-details-->
<!--                label="event-overlap-mode"-->
<!--                class="ma-2"-->
<!--              ></v-select>-->
<!--              <v-select-->
<!--                v-model="weekday"-->
<!--                :items="weekdays"-->
<!--                dense-->
<!--                outlined-->
<!--                hide-details-->
<!--                label="weekdays"-->
<!--                class="ma-2"-->
<!--              ></v-select>-->
<!--              <v-spacer></v-spacer>-->
<!--              <v-btn icon class="ma-2" @click="$refs.calendar.next()">-->
<!--                <v-icon>mdi-chevron-right</v-icon>-->
<!--              </v-btn>-->
<!--            </v-sheet>-->
<!--            <v-sheet height="600">-->
<!--              <v-calendar-->
<!--                ref="calendar"-->
<!--                v-model="value"-->
<!--                :weekdays="weekday"-->
<!--                :type="type"-->
<!--                :events="events"-->
<!--                :event-overlap-mode="mode"-->
<!--                :event-overlap-threshold="30"-->
<!--                :event-color="getEventColor"-->
<!--                @change="getEvents"-->
<!--              ></v-calendar>-->
<!--            </v-sheet>-->
<!--          </v-card-text>-->
<!--        </base-material-card>-->
<!--      </v-col>-->
<!--      <v-col cols="6" md="6" lg="6">-->
<!--        <base-material-card class="px-5 py-3">-->
<!--          <template v-slot:heading>-->
<!--            <v-tabs v-model="tabs" background-color="transparent" slider-color="white">-->
<!--              <span class="subheading font-weight-light mx-3" style="align-self: center">Stats:</span>-->
<!--              <v-tab class="mr-3">Proposal</v-tab>-->
<!--              <v-tab class="mr-3">Milestone 1</v-tab>-->
<!--              <v-tab>Grouping</v-tab>-->
<!--            </v-tabs>-->
<!--          </template>-->
<!--          <v-tabs-items v-model="tabs" class="transparent">-->
<!--            <v-tab-item v-for="i in 3" :key="i">-->
<!--              <v-card-text>-->
<!--                <chartist-->
<!--                  :data="pie.data"-->
<!--                  :options="pie.options"-->
<!--                  type="Pie"-->
<!--                  style="max-height: 250px;"-->
<!--                />-->
<!--              </v-card-text>-->
<!--            </v-tab-item>-->
<!--          </v-tabs-items>-->
<!--        </base-material-card>-->
<!--      </v-col>-->
    </v-row>
  </v-container>
</template>

<script>
import axios from '@/utils'
import Deadline from '@/views/dashboard/accessory/Deadline'
export default {

  data: () => ({
    changeProjDialog: false,
    tabs: 0,
    pie: {
      data: {
        series: [62, 32, 6]
      },
      options: {
        labelInterpolationFnc: (value) => `${value}%`
      }
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
    proj: null
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
    getProject() {
      console.log("IN getProject()");
      console.log(`${this.$store.state.project}`);
      axios.get(`/project/${this.$store.state.project}`)
        .then(response => (this.proj = response.data.proj))
        .catch((error) => {
          console.log(error);
        });
      console.log(`${this.proj}`);
    },
  },
  created() {
    this.getProject();
  },
};
</script>
