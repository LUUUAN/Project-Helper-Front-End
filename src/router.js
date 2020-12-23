import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: 'Lock',
          path: 'pages/lock',
          component: () => import('@/views/pages/Lock')
        },
        {
          name: 'Pricing',
          path: 'pages/pricing',
          component: () => import('@/views/pages/Pricing')
        },
        {
          name: 'Register',
          path: 'pages/register',
          component: () => import('@/views/pages/Register'),
        },
        {
          name: 'Login',
          path: '',
          component: () => import('@/views/pages/Login')
        },
      ]
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '/dashboard',
          component: () => import('@/views/dashboard/Dashboard'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'UserProfile',
          path: '/profile',
          component: () => import('@/views/dashboard/User'),
          meta: {
            requireAuth: true
          }
        },
        // Pages
        {
          name: 'Calendar',
          path: '/calendar',
          component: () => import('@/views/dashboard/Calendar'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'Calendar',
          path: '/calendar',
          component: () => import('@/views/dashboard/Calendar'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'Add Project',
          path: '/add-proj',
          component: () => import('@/views/dashboard/AddProj'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'Add Course',
          path: '/add-course',
          component: () => import('@/views/dashboard/AddCourse'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'Announcements',
          path: '/proj/announcements',
          component: () => import('@/views/dashboard/proj/Announcement/Anns'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'AnnouncementDetail',
          path: '/proj/announcement',
          component: () => import('@/views/dashboard/proj/Announcement/Ann'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'Assignment Grading',
          path: '/proj/assignment-grading',
          component: () => import('@/views/dashboard/proj/Assignment/AsgmtGrade'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'Assignment List',
          path: '/proj/assignment-list',
          component: () => import('@/views/dashboard/proj/Assignment/AsgmtList'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'Assignment Info',
          path: '/proj/assignment-info',
          component: () => import('@/views/dashboard/proj/Assignment/AsgmtInfo'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'NewAssignment',
          path: '/proj/newAssignment',
          component: () => import('@/views/dashboard/proj/Assignment/NewAsgmt'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'Groups',
          path: '/proj/groups',
          component: () => import('@/views/dashboard/proj/Groups'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'Project Dashboard',
          path: '/proj/home',
          component: () => import('@/views/dashboard/proj/ProjDash'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'Students',
          path: '/proj/students',
          component: () => import('@/views/dashboard/proj/Students'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'Project Dashboard',
          path: '/proj/dash',
          component: () => import('@/views/student/proj/ProjDash'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'Project Announcements',
          path: '/proj/announcement',
          component: () => import('@/views/student/proj/Announcement/Anns'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'Announcement Detail',
          path: '/proj/announcedetail',
          component: () => import('@/views/student/proj/Announcement/Ann'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'Members',
          path: '/proj/members',
          component: () => import('@/views/student/proj/members'),
          meta: {
            requireAuth: true
          }
        },
        {
          name: 'Submissions',
          path: '/proj/submissions',
          component: () => import('@/views/student/proj/Submissions'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '*',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: '404 Error',
          path: '',
          component: () => import('@/views/pages/Error')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (window.localStorage.getItem('token')) {
      next()
    } else {
      // next()
      console.log('该页面需要登陆')
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router;
