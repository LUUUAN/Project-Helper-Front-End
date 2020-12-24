<template>
  <v-card>
    <v-row justify="space-around">
      <v-form @change="$emit('change', lab)">
        <v-col cols="10">
          <div class="my-3"/>
          <base-subheading>Name</base-subheading>
          <v-text-field v-model="lab.lab_name" color="secondary" label="Lab Name*"/>
          <div class="my-3"/>
          <base-subheading>Lab Size</base-subheading>
          <v-text-field color="secondary" label="Lab Size*" v-model="lab.lab_size" type="number"/>

          <base-subheading>Lab Time</base-subheading>
          <v-row justify="start" align-content="space-between">
            <v-col cols="6">
              <v-select :items="days" label="Course Day" v-model="lab.lab_time[0].weekday">
              </v-select>
            </v-col>
            <v-col cols="6">
              <v-select :items="weekTypes" label="Week Type"
                        @change="lab.lab_time[0].weektype = weekTypes.indexOf($event)">
              </v-select>
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="timeMenu0"
                :close-on-content-click="false"
                transition="scale-transition"
                min-width="290px"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="lab.lab_time[0].start_time"
                    color="secondary"
                    label="Start Time"
                    readonly
                    v-on="on"
                  />
                </template>

                <v-time-picker color="secondary" landscape scrollable v-model="time" format="24hr">
                  <v-spacer/>
                  <v-btn color="secondary" large @click="confirmTime0">OK</v-btn>
                </v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="timeMenu1"
                :close-on-content-click="false"
                transition="scale-transition"
                min-width="290px"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="lab.lab_time[0].end_time"
                    color="secondary"
                    label="End Time"
                    readonly
                    v-on="on"
                  />
                </template>

                <v-time-picker color="secondary" landscape scrollable v-model="time" format="24hr">
                  <v-spacer/>
                  <v-btn color="secondary" large @click="confirmTime1">OK</v-btn>
                </v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
          <br>
        </v-col>
      </v-form>
    </v-row>
    <v-row justify="space-around">
      <v-btn @click="$emit('deleteLab', idx)" class="ma-1" color="warning">
        <v-icon>mdi-close</v-icon>
        Delete
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ['lab', 'days', 'weekTypes', 'id'],
  data: function () {
    return {
      time: "",
      menu: false,
      date: null,
      timeMenu0: false,
      timeMenu1: false,
      timeMenu2: false,
      timeMenu3: false,
      idx: this.$vnode.key,
    };
  },
  model: {
    prop: "lab",
    event: "change"
  },
  created() {
  },
  methods: {
    confirmTime0() {
      this.lab.lab_time[0].start_time = this.time;
      this.timeMenu0 = false;
    },
    confirmTime1() {
      this.lab.lab_time[0].end_time = this.time;
      this.timeMenu1 = false;
    },
    confirmTime2() {
      this.lab.lab_time[1].start_time = this.time;
      this.timeMenu2 = false;
    },
    confirmTime3() {
      this.lab.lab_time[1].end_time = this.time;
      this.timeMenu3 = false;
    }
  },
};
</script>
