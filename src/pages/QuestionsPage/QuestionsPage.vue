<template>
  <b-row class="justify-content-center h-100 m-0">
    <b-col sm="12" md="7">
      <b-row class="h-100">
        <b-col class="align-self-center p-5 h-100 m-auto">
          <b-card>
            <b-row>
              <b-col class="text-center questionBackground m-3 p-5">
                <v-custom-loader :showLoader=questionTitleNotLoaded></v-custom-loader>
                <b-card-title
                  :hidden='questionTitleNotLoaded'>
                    {{ question }}
                </b-card-title>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <v-custom-loader :showLoader=answersNotLoaded></v-custom-loader>
                <v-question
                  @clicked='selectAnswer'
                  :selectedAnswer='selectedAnswer'
                  :answers='questionAnswers'
                  v-bind='quizQuestions[currentQuestionIndex]'
                  :class="answersNotLoaded? 'hide' : 'show'">
                </v-question>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="mt-md-5 mt-sm-4">
                <b-progress
                  class="progressBarColor"
                  :value="currentQuestionIndex"
                  :max="quizQuestions.length">
                </b-progress>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="mt-md-7 mt-sm-2 col-md-4 mt-sm-5 m-auto">
                <b-button
                  class="col-12 customButtonColor"
                  v-on:click='nextQuestion'
                  :disabled="selectedAnswer == null">
                    Next
                </b-button>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<style scoped>
  .questionBackground {
    background-color: cadetblue;
  }
  .progressBarColor {
    background-color: #444b46;
  }
  .customButtonColor {
    background-color: #05cfbc;
    color: black;
  }
  .customButtonColor:hover:enabled {
    background-color: #009688;
    color: white;
  }
  .customButtonColor:disabled {
    background-color: #ececec;
  }
  .hide {
    min-height: 10rem;
    visibility: hidden;
  }
  .show {
    min-height: 10rem;
    visibility: visible;
  }
</style>

<script>
import axios from 'axios';
import QuestionComponent from '../../components/QuestionComponent.vue';
import CustomLoader from '../../components/CustomLoader.vue';

export default {
  components: {
    'v-question': QuestionComponent,
    'v-custom-loader': CustomLoader,
  },
  name: 'QuestionsPage',
  props: {
    page: String,
  },
  data() {
    return {
      quizQuestions: [],
      currentQuestionIndex: 0,
      selectedQuiz: this.$store.state.selectedQuiz,
      questionAnswers: [],
      selectedAnswer: null,
      correctAnswers: 0,
      question: null,
      questionTitleNotLoaded: true,
      answersNotLoaded: true,
    };
  },
  mounted() {
    this.getQuestions();
  },
  methods: {

    getQuestions() {
      axios.get(`https://printful.com/test-quiz.php?action=questions&quizId=${this.selectedQuiz}`)
        .then((quizQuestions) => {
          this.quizQuestions = quizQuestions.data;
          this.$store.dispatch('changeTotalQuestionCount', this.quizQuestions.length);
          this.questionTitleNotLoaded = false;
          this.getAnswers();
        }).catch(() => {
          // eslint-disable-next-line no-alert
          alert('Could not retrieve quiz questions, please try again');
        });
    },

    getAnswers() {
      this.question = this.quizQuestions[this.currentQuestionIndex].title;
      const questionId = this.quizQuestions[this.currentQuestionIndex].id;
      axios.get(`https://printful.com/test-quiz.php?action=answers&quizId=${this.selectedQuiz}&questionId=${questionId}`)
        .then((answerOptions) => {
          this.questionAnswers = answerOptions.data;
          this.answersNotLoaded = false;
        }).catch(() => {
          // eslint-disable-next-line no-alert
          alert('Could not retrieve quiz question answers, please try again');
        });
    },

    checkCorrectAnswers() {
      axios.get(`https://printful.com/test-quiz.php?action=submit&quizId=${this.selectedQuiz}&answers[]=${this.selectedAnswer}`)
        .then((answers) => {
          this.correctAnswers += answers.data.correct;
          this.$store.dispatch('changeTotalCorrectAnswers', this.correctAnswers);
        }).catch(() => {
          // eslint-disable-next-line no-alert
          alert('Could not retrieve required answers, please try again');
        });
    },

    nextQuestion() {
      if (this.selectedAnswer == null) {
        return;
      }

      this.currentQuestionIndex += 1;
      if (this.currentQuestionIndex === this.quizQuestions.length) {
        // delay to let the progress bar animation to finish after the last
        setTimeout(() => {
          this.$router.push('resultsPage');
        }, 1500);
      } else {
        this.checkCorrectAnswers();
        this.getAnswers();
        this.selectedAnswer = null;
        this.answersNotLoaded = true;
      }
    },

    selectAnswer(id) {
      this.selectedAnswer = parseInt(id, 10);
    },
  },
};
</script>
