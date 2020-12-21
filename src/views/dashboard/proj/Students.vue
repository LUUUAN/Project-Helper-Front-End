<template>
  <v-container id="regular-tables" fluid tag="section">
    <div class="py-3" />

    <base-material-card icon="mdi-account-box-multiple" title="Students Info" class="px-5 py-3">
      <br />
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search By Student ID / Group ID / Student Name"
        class="hidden-sm-and-down pl-4 pr-4"
      ></v-text-field>
      <br />

      <v-data-table :headers="headers" :items="Records" class="elevation-1">
        <template v-slot:item.view="{ item }">
          <v-icon>{{ item.view }}</v-icon>
        </template>
        <template v-slot:item.proposal="{ item }">
          <v-chip :color="getColor(item.proposal)" dark>{{ getText(item.proposal) }}</v-chip>
        </template>
        <template v-slot:item.milestone1="{ item }">
          <v-chip :color="getColor(item.milestone1)" dark>{{ getText(item.milestone1) }}</v-chip>
        </template>
      </v-data-table>
      <br />
      <v-row align="center" align-content="center" justify="space-around">
        <v-dialog v-model="changeDialog"
                  persistent
                  max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="success"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Add Students
            </v-btn>
          </template>
          <v-card class="pa-6">
            <v-card-title>
              Add Students
            </v-card-title>
            <br>
            <v-card-subtitle>
              Select import methods
            </v-card-subtitle>
            <v-card-text>Account will be created if account not exist, with default password identical to the student ID</v-card-text>
            <br>
            <br>
            <v-row align="center" justify="space-around" align-content="center">
              <v-dialog v-model="fileAddDialog"
                        persistent
                        max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="success"
                    dark
                    @click="changeDialog=false; fileAddDialog=true"
                  >
                    Upload File
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>Upload Student Info File</v-card-title>
                  <v-form v-model="valid">
                    <v-container>
                      <v-row align="center" justify="center">
                        <v-col cols="10">
                          <v-file-input></v-file-input>
                        </v-col>
                      </v-row>
                      <v-row justify="center" align="center">
                        <v-btn @click="fileAddDialog=false" color="success">
                          Add
                        </v-btn>
                        <v-btn @click="fileAddDialog=false" color="waning">
                          Close
                        </v-btn>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card>
              </v-dialog>
              <v-dialog v-model="manuAddDialog"
                        persistent
                        max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="success"
                    dark
                    @click="changeDialog=false; manuAddDialog=true"
                  >
                    Add manually
                  </v-btn>
                </template>
                <v-card>
                <v-card-title>Input Student Info</v-card-title>
                  <v-form v-model="valid">
                    <v-container>
                      <v-row align="center" justify="center">
                        <v-col
                          cols="10"
                        >
                          <v-text-field
                            v-model="firstname"
                            :rules="nameRules"
                            :counter="10"
                            label="First name"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col
                          cols="10"
                        >
                          <v-text-field
                            v-model="lastname"
                            :rules="nameRules"
                            :counter="10"
                            label="Last name"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col
                          cols="10"
                        >
                          <v-text-field
                            v-model="stuID"
                            label="Student ID"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="10"
                        >
                          <v-text-field
                            v-model="lab"
                            label="Lab"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row justify="center" align="center">
                        <v-btn @click="manuAddDialog=false" color="success">
                          Add
                        </v-btn>
                        <v-btn @click="manuAddDialog=false" color="waning">
                          Close
                        </v-btn>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card>
              </v-dialog>
              <v-btn
                color="warning"
                dark
                @click="changeDialog=false"
              >
                Close
              </v-btn>
            </v-row>
          </v-card>
        </v-dialog>
      </v-row>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      changeDialog: false,
      manuAddDialog: false,
      fileAddDialog: false,
      Records: [
        {
          name: "Name1",
          stuid: "11810000",
          groupid: 11,
          proposal: 90,
          milestone1: false,
          view: "mdi-magnify-plus",
        },
        {
          name: "Name2",
          stuid: "11810001",
          groupid: 4,
          proposal: 99,
          milestone1: false,
          view: "mdi-magnify-plus",
        },
        {
          name: "Name3",
          stuid: "11810002",
          groupid: 9,
          proposal: 94,
          milestone1: false,
          view: "mdi-magnify-plus",
        },
        {
          name: "Name4",
          stuid: "11810003",
          groupid: 2,
          proposal: 88,
          milestone1: true,
          view: "mdi-magnify-plus",
        },
      ],
      headers: [
        { text: "Name", value: "name" },
        { text: "Student ID", value: "stuid" },
        { text: "Group ID", value: "groupid" },
        { text: "Proposal", value: "proposal" },
        { text: "MileStone 1", value: "milestone1" },
        { text: "View", value: "view" },
      ],
    };
  },
  methods: {
    getColor(state) {
      if (state === false) return "red";
      else if (state === true) return "orange";
      else return "green";
    },
    getText(state) {
      if (state === false) return "Unfinished";
      else if (state === true) return "Need Grading";
      else return state;
    },
  },
};
</script>
