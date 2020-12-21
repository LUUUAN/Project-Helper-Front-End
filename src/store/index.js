import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/utils';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
    drawer: null,
    user: {},
    token: '',
    labs: {},
    projects: {},
    courses: {},
    project: null,
    student: true,
  },

  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload
    },
    SET_SCRIM(state, payload) {
      state.barColor = payload
    },
    SET_TOKEN: (state, data) => {
      state.token = data
      window.sessionStorage.setItem('token', data)
    },
    LOGOUT: (state) => {
      // 登出的时候要清除token
      state.token = null
      state.user = null
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('user')
    }
  },

  actions: {
    async FETCH_USER({ state }, id) {
      return axios.get(`/user?user_id=${id}`).then(resp => {
        const { data } = resp;
        // console.log(data);
        // console.log(resp.data);
        state.user = data;
      });
    },
    async FETCH_LABS({ state }) {
      return axios.get("/labs").then(resp => {
        const { data } = resp.data;
        state.labs = data;
      });
    },
    async FETCH_PROJECT({ state }) {
      return axios.get("/projects").then(resp => {
        const { data } = resp.data;
        state.projects = data;
        console.log(state.projects);
      });
    },
    async FETCH_COURSE({ state }) {
      return axios.get("/courses").then(resp => {
        const { data } = resp.data;
        state.courses = data;
      });
    },
    async NEW_PROJECT({ dispatch }, project) {
      return axios.post(`/project`, project).then(() => {
        dispatch("FETCH_PROJECTS");
        });
    },
    async DELETE_PROJECT({ dispatch }, { name }) {
      return axios.delete(`/project/${name}`).then(() => {
        dispatch("FETCH_PROJECTS");
      });
    },
    async UPDATE_PROJECT({ dispatch }, { name, project }) {
      return axios.patch(`/project/${name}`, project).then(() => {
        dispatch("FETCH_PROJECTS");
      });
    },
    async UPDATE_LABS({ dispatch }, { name, lab }) {
      return axios.patch(`/lab/${name}`, lab).then(() => {
        dispatch("FETCH_LABS");
      });
    },
  },
  getters: {}
})

export default store;


// import Vue from 'vue'
// import Vuex from 'vuex'
//
// Vue.use(Vuex)
//
// export default new Vuex.Store({
//   state: {
//     barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
//     barImage: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
//     drawer: null
//   },
//   mutations: {
//     SET_BAR_IMAGE(state, payload) {
//       state.barImage = payload
//     },
//     SET_DRAWER(state, payload) {
//       state.drawer = payload
//     },
//     SET_SCRIM(state, payload) {
//       state.barColor = payload
//     }
//   },
//   actions: {
//
//   }
// })
