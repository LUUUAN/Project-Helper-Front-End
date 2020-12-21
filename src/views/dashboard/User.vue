<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Edit Profile</div>
            <div class="subtitle-1 font-weight-light">
              Complete your profile
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" lg="4" md="4">
                  <v-card flat >
                    <v-card-text>
                      <v-row>
                        <v-spacer></v-spacer>
                        <v-avatar size="150">
                          <img
                            src="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
                          >
                        </v-avatar>
                        <v-spacer></v-spacer>
                      </v-row>
                      <br>
                      <v-row>
                        <v-spacer></v-spacer>
                        <v-file-input
                          label="Photo"
                          accept="image/png, image/jpeg, image/bmp"
                          filled
                          prepend-icon="mdi-camera"
                          v-model="files"
                        ></v-file-input>
                        <v-spacer></v-spacer>
                      </v-row>
                      <v-row>
                        <v-spacer></v-spacer>
                        <p class="text-h5 font-weight-medium">
                          {{user.username}}
                        </p>
                        <v-spacer></v-spacer>
                      </v-row>
                      <v-row>
                        <v-spacer></v-spacer>
                        <p class="text-subtitle-1 font-weight-regular">
                          {{user.user_id}}
                        </p>
                        <v-spacer></v-spacer>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" lg="8" md="8">
                  <v-card flat>
                    <v-card-text>
                      <v-text-field label="Email Address" class="purple-input" :value="profile.email"/>
                      <br>
                      <v-textarea label="Description" class="purple-input" :value="profile.description"/>
                      <br>
                      <v-row align="center" justify="space-around">
                        <v-dialog
                          v-model="openChangePass"
                          persistent
                          max-width="600px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              color="warning"
                              dark
                              v-bind="attrs"
                              v-on="on"
                            >
                              <v-icon left>mdi-key</v-icon>
                              Change Password
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="headline">Change Password</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12">
                                    <v-text-field
                                      label="Old Password"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                    <v-text-field
                                      label="New Password"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                    <v-text-field
                                      label="New Password Again"
                                      type="password"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="openChangePass = false"
                              >
                                Close
                              </v-btn>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="openChangePass = false"
                              >
                                Change
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-btn class="ma-1" color="success" @click="submitPhoto">
                          <v-icon left>mdi-check-circle</v-icon>
                          Save Changes
                        </v-btn>
                      </v-row>

                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import BaseMaterialTestimony from "@/components/base/MaterialTestimony";
import axios from '@/store';

export default {
  components: { },
  data: () => ({
    files: null,
    openChangePass: false,
    profile: {
      name: "Wendi Luan",
      id: "11712532",
      email: "11712532@mail.sustech.edu.cn",
      description: "lalalalalallalalalalallalalalalal",
      password: "password"
    }
  }),
  methods: {
    submitPhoto() {
      if (this.files) {
        console.log(this.files);
        const formData = new window.FormData();
        formData.append("photo", this.files);
        axios
          .post("/profile_photo", formData)
          .then(response => {
            console.log("Success!");
            console.log({ response });
          })
          .catch(error => {
            console.log({ error });
          });
      } else {
        console.log("there are no files.");
      }
    }
  },
  computed: {
    user: function() { return this.$store.state.user }
  }
};
</script>
