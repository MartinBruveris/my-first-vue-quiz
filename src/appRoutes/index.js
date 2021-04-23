import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '../pages/LandingPage/LandingPage.vue';
import QuestionsPage from '../pages/QuestionsPage/QuestionsPage.vue';
import ResultsPage from '../pages/ResultsPage/ResultsPage.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: LandingPage,
    },
    {
      path: '/questionsPage',
      component: QuestionsPage,
    },
    {
      path: '/resultsPage',
      component: ResultsPage,
    },
  ],
});

export default router;
