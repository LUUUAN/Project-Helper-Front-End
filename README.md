# Project Helper Front End (Teacher)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Connect with backend

Inside **'Project-Helper-Front-End/src/util/index.js'**, there is an mock adapter that mock API response.

Currently only following response have been correctly implemented:

```js
mock.onPost("/user", { userID: "1111", password: "1111" }).reply(200, {
  userID: 1111
});

mock.onGet("/user?user_id=1111").reply(
  200, {
    user_id: 1111,
    username: "Sam",
    password: "123",
    is_teacher: false,
    description: "Personal Description!"
  }
)
```

The API should be implemented in similar manner.

### Testing of API

Above API is used in **Login** and **User Profile**, if correctly implemented, the login should be successful and User Profile should display User Name and ID correctly

(邮件和描述为固定值，因为给定的API里面没有看见邮件信息)