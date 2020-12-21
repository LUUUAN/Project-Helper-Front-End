<template>
  <v-container id="addProjForm" fluid tag="section">
    <section class="mb-12 text-center">
      <h1 class="font-weight-light mb-2 headline">Add New Project</h1>

      <span class="font-weight-light subtitle-1">Create class first if you haven't</span>
    </section>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-6">
          <v-row>
            <v-col cols="12" md="6">
              <base-subheading>Course</base-subheading>

              <v-select color="secondary" item-color="secondary" :items="classes">
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
              <v-text-field color="secondary" label="Project Name*" />
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
              <v-textarea solo name="input-new-proj-info" hint="Enter Project Description Here" />
            </v-col>
            <v-col cols="12" md="6">
              <base-subheading>Skill Tags</base-subheading>

              <v-combobox v-model="items" color="secondary" multiple>
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
              <Deadline
                v-for="field in fields"
                :key="field.id"
                :menu="field.menu"
                :date="field.date"
                :id="field.id"
                @deleteddl="deleteDDL"
              ></Deadline>
              <v-btn type="button" v-on:click="addDDL()">Add Deadline</v-btn>
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
import Deadline from "./accessory/Deadline.vue";

export default {
  components: { Deadline },
  name: "DashboardFormsExtendedForms",

  data: () => ({
    menu: false,
    menu2: false,
    menu3: false,
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
