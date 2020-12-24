<template>
  <v-container
    id="login"
    fill-height
    tag="section"
  >
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="success"
          light
          max-width="100%"
          width="400"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-1 font-weight-light mb-2">
                Project Helper
              </h1>
              <h1 class="display-2 font-weight-light mb-2">
                SUSTech
              </h1>
            </div>
          </template>

          <v-card-text class="text-center">
            <v-form
              ref="loginForm"
              lazy-validation
            >
              <v-alert
                v-if="!this.loginForm.correct"
                v-model="alert"
                border="left"
                close-text="Close Alert"
                color="deep-purple accent-4"
                dark
              >
                Wrong student ID or password, input again!
              </v-alert>
              <v-text-field
                color="secondary"
                label="Student ID"
                prepend-icon="mdi-face"
                class="mt-10"
                :rules="[v => !!v || 'ID is required']"
                required
                v-model="loginForm.username"
              />

              <v-text-field
                class="mb-8"
                color="secondary"
                type="password"
                label="Password"
                prepend-icon="mdi-lock-outline"
                :rules="[v => !!v || 'Password is required']"
                required
                v-model="loginForm.pass"
              />

              <pages-btn
                large
                color=""
                depressed
                class="v-btn--text success--text"
                @click="submitLogin"
              >
                Log In
              </pages-btn>

            </v-form>

          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/utils";

export default {
  name: 'PagesLogin',

  components: {
    PagesBtn: () => import('./components/Btn')
  },

  data: () => ({
    loginForm: {
      username: "",
      pass: "",
      correct: true,
    }
  }),

  methods: {
    submitLogin() {
      console.log("IN Function");
      console.log(this.$refs.loginForm);
      const valid = this.$refs.loginForm.validate;
      if (valid) {
        axios.post('/user', {
          username: this.loginForm.username,
          password: this.loginForm.pass
        })
          .then((response) => {
            console.log("RECEIVE RESPONSE")
            if (response.status === 200) {
              this.$store.commit('SET_TOKEN', "ThisIsAToken")
              console.log('token is set to:', window.localStorage.getItem('token'))
              // eslint-disable-next-line no-shadow
              axios.get(`/user?username=${this.loginForm.username}`).then((response) => {
                if (response.status === 200) {
                  const { user_id } = response.data;
                  this.$store.dispatch('FETCH_USER', user_id)
                }
              });
              axios.get(`/user/role?username=${this.loginForm.username}`).then((response2) => {
                if (response2.status === 200) {
                  const { roles } = response2.data;
                  this.$store.commit('SET_ROLE', roles)
                }
              }).then(() => {
                this.$router.push({ name: 'Dashboard' })
              })
            }
          })
          .catch((error) => {
            console.log(error);
            this.loginForm.correct = false;
          })
      } else {
        console.log('error submit!!')
        return false
      }
    },
  }
}
</script>