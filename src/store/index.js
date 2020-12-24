import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/utils';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
    drawer: null,
    user: JSON.parse(window.localStorage.getItem('user')),
    labs: {},
    projects: {},
    courses: {},
    project: {
      course_id: 0,
      project_id: 1,
      project_name: "Project Helper",
      max_team_size: 5,
      min_team_size: 2,
      project_description: "this is a description",
      project_team_number: 10,
      project_end_grouping_time: "1608296086917",
      project_across_lab: 0,
    },
    groupIDs: [],
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
      window.localStorage.setItem('token', data)
    },
    LOGOUT: (state) => {
      // 登出的时候要清除token
      state.user = null;
      state.project = null;
      window.localStorage.removeItem('token');
    },
    SET_ROLE: (state, data) => {
      window.localStorage.setItem('roles', data)
    }
  },

  actions: {
    async FETCH_USER({ state }, id) {
      return axios.get(`/user?user_id=${id}`).then(resp => {
        const { data } = resp;
        window.localStorage.setItem('user', JSON.stringify(data))
        state.user = data
      });
    },
    async FETCH_LABS({ state }) {
      return axios.get(`/course/${state.project}`).then(resp => {
        const { data } = resp.data;
        state.labs = data;
      });
    },
    async NEW_PROJECT({ dispatch }, project) {
      return axios.post(`/project`, project).then(() => {
        dispatch("FETCH_PROJECTS");
      });
    },
    async FETCH_PROJECT({ state }) {
      return axios.get(`/projects`).then((resp) => {
        state.projects = resp.data;
      })
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
