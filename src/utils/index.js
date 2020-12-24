import Axios from 'axios';
import MockAdapter from "axios-mock-adapter"
// import store from '@/store';

// production
// export default axios;
const axios = Axios.create({
  baseURL: `http://project-helper.com/api`,
});
axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  request.headers = {
    ...request.headers,
    token: `Bearer ${window.localStorage.getItem("token")}`
  }
  return request
});

axios.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2))
  if (response.status === 401) {
    window.localStorage.removeItem('token')
  }
  return response
});


const mock = new MockAdapter(axios);

mock.onPost("/user", { username: "stu01", password: "stu01" }).reply(200);
mock.onPost("/user", { username: "TA01", password: "TA01" }).reply(200);

mock.onGet("/user?username=stu01").reply(
  200, {
    user_id: 1111
  }
)
mock.onGet("/user?username=TA01").reply(
  200, {
    user_id: 2222
  }
)

mock.onGet("/user?user_id=1111").reply(
  200, {
    user_id: 1111,
    username: "Student 1",
    password: "stu01",
    is_teacher: false,
  }
)

mock.onGet("/user?user_id=2222").reply(
  200, {
    user_id: 2222,
    username: "Teacher 1",
    password: "TA01",
  }
)


mock.onGet("/user?user_id=4").reply(
  200, {
    user_id: 1114,
    username: "Student 4",
    password: "stu04",
    is_teacher: false,
  }
)
mock.onGet("/user?user_id=3").reply(
  200, {
    user_id: 1113,
    username: "Student 3",
    password: "stu03",
    is_teacher: false,
  }
)
mock.onGet("/user?user_id=1").reply(
  200, {
    user_id: 1111,
    username: "Student 1",
    password: "stu01",
    is_teacher: false,
  }
)
mock.onGet("/user?user_id=2").reply(
  200, {
    user_id: 1112,
    username: "Student 2",
    password: "stu02",
    is_teacher: false,
  }
)

mock.onGet("/user/role?username=TA01").reply(
  200, {
    roles: 'teacher'
  }
)


mock.onGet("/user/role?username=stu01").reply(
  200, {
    roles: 'student'
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
mock.onPost("/lab").reply(200, (config) => {
  const data = JSON.parse(config.data);
  this.$store.labs.add(data);
})

mock.onPost("/course").reply(200, {
  course_id: 1
});
mock.onGet("/teacher?user_id=2222/course").reply(200, {
  courses: [1, 2, 3, 4]
})
mock.onGet("/course?course_id=1").reply(200, {
  course_name: "This is course 1",
  course_id: 1
})
mock.onGet("/course?course_id=2").reply(200, {
  course_name: "This is course 2",
  course_id: 2
})
mock.onGet("/course?course_id=3").reply(200, {
  course_name: "This is course 3",
  course_id: 3
})
mock.onGet("/course?course_id=4").reply(200, {
  course_name: "This is course 4",
  course_id: 4
})

mock.onGet(`course/project/1/team`).reply(200, [1, 2])
mock.onGet(`/project/1/team/1`).reply(200, {
  team_id: 1,
  team_name: "tem1",
  team_description: "this is a description",
  team_is_locked: 0,
  team_size: 1,
  team_setAutomatch: 1,
  leader_id: 1
})

mock.onGet(`/project/1/team/2`).reply(200, {
  team_id: 2,
  team_name: "tem2",
  team_description: "this is a description",
  team_is_locked: 0,
  team_size: 1,
  team_setAutomatch: 1,
  leader_id: 1
})

mock.onGet(`/project/1/team/1/student`).reply(200, [1,2])
mock.onGet(`/project/1/team/2/student`).reply(200, [3,4])

// //
// // mock.onGet('/project/1234').reply(200, {
// //   proj: {
// //     class: "Object Oriented Analysis and Design",
// //     name: "Project Helper",
// //     discription: "Some Text Here",
// //     disable: "false",
// //     menu: false,
// //     menu2: false,
// //     menu3: false,
// //     fields: [],
// //     ddlCount: 0,
// //     projNum: [1, 3],
// //     date: "",
// //     files: [],
// //     items: ["Javascript", "SpringBoot", "UI Design", "Vue.js"],
// //     classes: [
// //       "Object Oriented Analysis and Design",
// //       "Cyptography and Network Security",
// //       "Computer Network",
// //       "Embedded System",
// //       "Artifitial Intelligence",
// //     ],
// //   },
// // })
export default axios;
