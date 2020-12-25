<template>
  <v-container id="regular-tables" fluid tag="section">
    <div class="py-3"/>
    <base-material-card icon="mdi-account-group" title="Group Info" class="px-5 py-3">
      <br/>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        v-model="search"
        label="Search By Student ID / Group ID / Student Name"
        class="hidden-sm-and-down pl-4 pr-4"
      ></v-text-field>
      <br/>

      <v-data-table :headers="headers" :items="groups"
                    :search="search" v-model="selected"
                    item-key="team_id" :single-select="false"
                    class="elevation-1" show-select>
        <template v-slot:top>
          <v-dialog v-model="changeMenu">
            <v-card>
              <v-card-title> Edit Group </v-card-title>
              <v-card-text>
                <v-data-table item-key="user_id" :headers="subheaders" :items="groupInfo">
                  <template v-slot:item.actions="{ item }">
                    <v-icon
                      small
                      @click="deleteStu(item)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.action="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="changeGroupInfo(item)"
              >
                mdi-pencil
              </v-icon>
        </template>
      </v-data-table>
      <br/>
      <v-row align="end" align-content="center" justify="space-around">
        <v-spacer></v-spacer>
        <v-btn
          class="ma-2"
          color="warning"
          :disabled="selected.length === 0"
          @click="deleteGroup"
        >Delete
        </v-btn>
        <v-btn
          class="ma-2"
          color="success"
        >Grouping
        </v-btn>
      </v-row>
    </base-material-card>
  </v-container>
</template>

<script>
import axios from '@/utils'

export default {
  data() {
    return {
      selected: [],
      changeMenu: false,
      editedIndex: 0,
      editedItem: null,
      search: '',
      dialog: false,
      // Records: [
      //   {
      //     groupId: 11,
      //     proposal: 90,
      //     milestone1: false,
      //     view: "mdi-magnify-plus",
      //   },
      //   {
      //     groupId: 4,
      //     proposal: 99,
      //     milestone1: false,
      //     view: "mdi-magnify-plus",
      //   },
      //   {
      //     groupId: 9,
      //     proposal: 94,
      //     milestone1: false,
      //     view: "mdi-magnify-plus",
      //   },
      //   {
      //     groupId: 2,
      //     proposal: 88,
      //     milestone1: true,
      //     view: "mdi-magnify-plus",
      //   },
      // ],
      headers: [
        { text: "Group ID", value: "team_id" },
        { text: "Group Name", value: "team_name" },
        { text: "Member", value: "members" },
        { text: "Description", value: "team_description" },
        { text: "Action", value: "action" },
      ],
      groups: [],
      subheaders: [
        { text: "Student ID", value: "user_id" },
        { text: "Name", value: "username" },
        // { text: "Description", value: "description" },
      ],
      groupInfo: [],
    };
  },
  methods: {
    deleteGroup () {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Are you sure you want to delete this item?')) {
        for (let i = 0; i < this.selected.length; i++) {
          const index = this.groups.indexOf(this.selected[i]);
          axios.post(`course/project/team/${this.groups[index].team_id}`)
          this.groups.splice(index, 1);
        }
      }
    },
    deleteStu(item) {
      const index = this.groups.indexOf(item);
      axios.post(`course/project/team/${this.groups[index].team_id}`)
      this.groups.splice(index, 1);
    },
    changeGroupInfo(item) {
      this.editedIndex = this.groups.indexOf(item);
      console.log("ITEM::: "+ JSON.stringify(item));
      this.editedItem = item;
      this.changeMenu = true;
      this.getAllStuInfo(this.editedItem);
    },
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
    getAllTeam() {
      (async () => {
        const teamIds = await axios.get(`course/project/${this.$store.state.project.project_id}/team`).then(resp => resp.data);
        teamIds.forEach(async (id) => {
          const team = await axios.get(`/project/${this.$store.state.project.project_id}/team/${id}`).then(resp => resp.data);
          const memberIds = await axios.get(`/project/${this.$store.state.project.project_id}/team/${id}/student`).then(resp => resp.data);
          team.memberIds = memberIds;
          team.members = [];
          console.log(memberIds);
          for (let i = 0; i < memberIds.length; i++) {
            const mid = memberIds[i];
            const member = axios.get(`/user?user_id=${mid}`).then(resp => resp.data.username);
            team.members.push(member);
          }
          this.groups.push(team);
        })
      })().then(() => {
        console.log(this.groups)
      });
    },
    getAllStuInfo(item) {
        this.groupInfo = []
        const stuIds = item.memberIds;
        stuIds.forEach(async (id) => {
          const stuInfo = await axios.get(`/user?user_id=${id}`).then(resp => resp.data);
          this.groupInfo.push(stuInfo);
        })().then(() => {
        console.log("GROUPPPP: " + JSON.stringify(this.groupInfo))
      });
    },
    // grouping(){
    //   //
    // }
  },
  created() {
    this.getAllTeam();
  }
};
</script>
