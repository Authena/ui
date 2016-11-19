import VueRouter from 'vue-router'

const Paper = resolve => require.ensure(['./routes/Paper'], (require) => {
  resolve(require('./routes/Paper'))
})

const routes = [
  { path: '/paper', component: Paper },
]

const router = new VueRouter({ mode: 'history', routes })

export default router
