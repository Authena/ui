import VueRouter from 'vue-router'

const Paper = resolve => require.ensure(['./routes/Paper'], (require) => {
  resolve(require('./routes/Paper'))
})

const TouchRipple = resolve => require.ensure(['./routes/TouchRipple'], (require) => {
  resolve(require('./routes/TouchRipple'))
})

const routes = [
  { path: '/paper', component: Paper },
  { path: '/touchripple', component: TouchRipple },
]

const router = new VueRouter({ mode: 'hash', routes })

export default router
