<template>
  <v-container id="timeline" fluid tag="section">
    <section class="mb-12 text-center">
      <h1 class="font-weight-light mb-2" style="color:#3c4858; font-size:24px">Announcements</h1>

      <span
        class="font-weight-light"
        style="font-size: 16px; color: #3c4858"
      >For OOAD Project "Project Helper"</span>
    </section>
    <v-row justify="center">
      <v-dialog v-model="addAnnDialog"
                persistent
                max-width="1200px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            New Announcement
          </v-btn>
        </template>
        <v-card class="pa-6">
          <v-row justify="center" align-content="space-around">
            <v-col cols="12" lg="11" md="11" sm="11">
              <base-subheading>Title</base-subheading>
              <v-text-field
                counter="40"
                hint="Enter Announcement Title Here"
                label="Regular"
              ></v-text-field>
              <base-subheading>Description</base-subheading>
              <v-textarea solo auto-grow name="input-new-ann-info" hint="Enter Project Description Here" />
              <base-subheading>File Attachment</base-subheading>
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
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="addAnnDialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="addAnnDialog = false"
            >
              Save
            </v-btn>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row>
      <v-col>
        <v-timeline align-top>
          <v-timeline-item
            v-for="(timeline, i) in timelines"
            :key="i"
            :color="timeline.color"
            :icon="timeline.icon"
            fill-dot
            large
          >
            <v-card class="pa-6">
              <v-chip :color="timeline.color" class="overline mb-3" small>{{ timeline.chip }}</v-chip>

              <p class="subtitle-1 font-weight-light" v-text="timeline.text" />

              <div class="text-uppercase body-2" v-text="timeline.subtext" />

              <template v-if="timeline.to">
                <v-divider class="mb-3" />

                <v-btn
                  v-bind="attrs"
                  :color="timeline.color"
                  large
                  rounded
                  v-on="on"
                  to="/proj/announcement"
                >View Detail</v-btn>
              </template>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashboardPagesTimeline",

  data: () => ({
    addAnnDialog: false,
    timelines: [
      {
        chip: "Some title",
        color: "error",
        icon: "mdi-briefcase",
        text: `Wifey made the best Father's Day meal ever. So thankful so happy so blessed. Thank you for making my family We just had fun with the “future” theme !!! It was a fun night all together ... The always rude Kanye Show at 2am Sold Out Famous viewing @ Figueroa and 12th in downtown.`,
        subtext: "11 hours ago via twitter",
        to: "/proj/announcement",
      },
      {
        chip: "Another one",
        color: "success",
        icon: "mdi-puzzle",
        text: `Thank God for the support of my wife and real friends. I also wanted to point out that it’s the first album to go number 1 off of streaming!!! I love you Ellen and also my number one design rule of anything I do from shoes to music to homes is that Kim has to like it....`,
        to: "/proj/announcement",
      },
      {
        chip: "Another title",
        color: "info",
        icon: "mdi-fingerprint",
        text: `Called I Miss the Old Kanye That’s all it was Kanye And I love you like Kanye loves Kanye Famous viewing @ Figueroa and 12th in downtown LA 11:10PM. What if Kanye made a song about Kanye Royère doesn't make a Polar bear bed but the Polar bear couch is my favorite piece of furniture we own It wasn’t any Kanyes Set on his goals Kanye`,
        action: "info",
        actionIcon: "mdi-wrench",
        actions: ["Action", "Another Action", "Something else here"],
        to: "/proj/announcement",
      },
      {
        chip: "Another one",
        color: "warning",
        icon: "mdi-airplane-landing",
        text: `Tune into Big Boy's 92.3 I'm about to play the first single from Cruel Winter also to Kim’s hair and makeup Lorraine jewelry and the whole style squad at Balmain and the Yeezy team. Thank you Anna for the invite thank you to the whole Vogue team`,
        to: "/proj/announcement",
      },
    ],
  }),
};
</script>
