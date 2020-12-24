<template>
  <v-container id="addProjForm" fluid tag="section">
    <section class="mb-12 text-center">
      <h1 class="font-weight-light mb-2 headline">View optional Projects</h1>

      <span class="font-weight-light subtitle-1">View available groups to join or receive invitations</span>
    </section>
    <v-col cols="12" lg="12" md="12">
        <base-material-card color="success" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Optional Projects</div>

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
                        View Groups
                      </v-btn>
                    </v-row>
                  </v-card-text>
                </base-material-card>
              </v-col>
            </v-row>
          </v-card-text>
        </base-material-card>
      </v-col>

      <v-col cols="12" lg="12" md="12">
        <base-material-card color="success" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Invitations</div>
            <!-- <div class="subtitle-1 font-weight-light">15th September, 2020</div> -->
          </template>
          <v-data-table
            :headers="headers"
            :single-select=false
            item-key="groupid"
            :items="invitations"
            show-expand
            class="elevation-1">
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">{{ item.team_description }}</td>
            </template>
            <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click=""
      >
        mdi-check-bold
      </v-icon>
      <v-icon
        small
        @click=""
      >
        mdi-delete
      </v-icon>
    </template>
            </v-data-table>
        </base-material-card>
      </v-col>
  </v-container>
</template>

<script>
import axios from "@/store"

export default {
  data: () => ({
      headers: [
        { text: "Team Name", value: "team_name" },
        { text: "Team ID", value: "team_id" },
        { text: "Size", value: "team_size" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      invitations: [
        {
            team_name: "大鸟转转转",
            team_size: 3,
            leader: "114514",
            team_description: "Test Group"
        }
      ]
  }),
  methods: {
    getInvitations() {
      let inviteGroups;
      let i = 0;
      const id = this.$store.state.user.user_id;
      console.log("IN getInvitations()");
      console.log(`${this.$store.state.user.user_id}`);
      axios.get(`/student/${id}/application`)
        .then(response => (inviteGroups = response.data))
        .catch((error) => {
          console.log(error);
        });
      for (i; i < inviteGroups.size(); i++) {
        axios.get(`/course/project/team/${inviteGroups[i]}`)
        .then(response => (this.invitations.append(response.data)))
        .catch((error) => {
          console.log(error);
        });
      }
    }
  },
  created() {
    this.getInvitations();
  }
};
</script>
