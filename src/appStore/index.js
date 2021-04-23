import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: null,
    selectedQuiz: null,
    quizOptions: [],
    totalQuestions: 0,
    totalCorrectAnswers: 0,
  },
  getters: {
    userName: (state) => state.userName,
    selectedQuiz: (state) => state.selectedQuiz,
    availableQuizOptions: (state) => state.quizOptions,
    totalQuestions: (state) => state.TotalQuestions,
    totalCorrectAnswers: (state) => state.totalCorrectAnswers,
  },
  mutations: {
    changeUsername(state, newUsername) {
      state.userName = newUsername;
    },
    changeSelectedQuiz(state, newQuiz) {
      state.selectedQuiz = newQuiz;
    },
    changeQuizOptions(state, newOptions) {
      state.quizOptions = newOptions;
    },
    changeTotalQuestionCount(state, newCount) {
      state.totalQuestions = newCount;
    },
    changeTotalCorrectAnswers(state, newTotal) {
      state.totalCorrectAnswers = newTotal;
    },
  },
  actions: {
    changeUsername(context, newUsername) {
      context.commit('changeUsername', newUsername);
    },
    changeSelectedQuiz(context, newQuiz) {
      context.commit('changeSelectedQuiz', newQuiz);
    },
    changeQuizOptions(context, newOptions) {
      context.commit('changeQuizOptions', newOptions);
    },
    changeTotalQuestionCount(contex, newCount) {
      contex.commit('changeTotalQuestionCount', newCount);
    },
    changeTotalCorrectAnswers(context, newTotal) {
      context.commit('changeTotalCorrectAnswers', newTotal);
    },
  },
});
