import Axios from 'axios';
import MockAdapter from "axios-mock-adapter"

// production
// export default axios;
const axios = Axios.create();
axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
});

axios.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2))
  return response
});


const mock = new MockAdapter(axios);

mock.onPost("/user", { userID: "1111", password: "1111" }).reply(200);

mock.onGet("/user?user_id=1111").reply(
  200, {
    user_id: 1111,
    username: "Sam",
    password: "123",
    is_teacher: false,
    description: "Personal Description!"
  }
)

mock.onGet("/labs").reply(200, {
  data: [{ lab_id: "1234", lab_name: "CS309 lab1", lab_course: "CS309" }, {
    lab_id: "1234",
    lab_name: "CS309 lab1",
    lab_course: "CS309"
  }]
});

mock.onGet("/projects").reply(200, {
  data: [{ project_id: "1234", project_name: "Project Helper", project_course: "CS309" },
    { project_id: "1235", project_name: "DBOJ", project_course: "CS309" }]
});
mock.onPost("/lab").reply((config) => {
  const data = JSON.parse(config.data);
  this.$store.labs.add(data);
})
mock.onGet('/project/1234').reply(200, {
  proj: {
    class: "Object Oriented Analysis and Design",
    name: "Project Helper",
    discription: "Some Text Here",
    disable: "false",
    menu: false,
    menu2: false,
    menu3: false,
    fields: [],
    ddlCount: 0,
    projNum: [1, 3],
    date: "",
    files: [],
    items: ["Javascript", "SpringBoot", "UI Design", "Vue.js"],
    classes: [
      "Object Oriented Analysis and Design",
      "Cyptography and Network Security",
      "Computer Network",
      "Embedded System",
      "Artifitial Intelligence",
    ],
  },
})
export default axios;
