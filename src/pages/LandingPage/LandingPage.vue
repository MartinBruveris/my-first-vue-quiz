<template>
    <b-row class="justify-content-center h-100 m-0">
      <b-col class="h-100" sm="8" md="4">
        <b-row class="h-100">
          <b-col class="align-self-center p-3 m-auto">
            <b-card>
            <b-row>
              <b-col class="text-center m-4">
                <b-card-title>Technical task</b-card-title>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form @submit="validateForm">
                  <b-row>
                    <b-col>
                      <b-form-input
                        v-model='name'
                        type='text'
                        placeholder='Enter Your Name'>
                      </b-form-input>
                      <div
                        class="error"
                        :hidden='nameInputErrorNotPresent'>
                          * this field is required
                      </div>
                    </b-col>
                  </b-row>
                  <b-row class="mt-1">
                    <b-col>
                      <v-custom-loader :showLoader=quizListNotLoaded></v-custom-loader>
                      <b-form-select
                        v-model="selectedQuiz"
                        :options="quizOptions"
                        :hidden='quizListNotLoaded'>
                      </b-form-select>
                      <div
                        class="error"
                        :hidden='quizSelectionErrorNotPresent'>
                          * this field is required
                        </div>
                    </b-col>
                  </b-row>
                  <b-row class="mt-4">
                    <b-col col-12>
                      <b-button
                        class="col-8 m-auto"
                        type="submit"
                        variant="primary" size='lg' block>
                          Start
                      </b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-col>
            </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
</template>

<style scoped>
  .error {
    color: red;
  }
</style>

<script>
import axios from 'axios';
import CustomLoader from '../../components/CustomLoader.vue';

export default {
  name: 'LandingPage',
  components: {
    'v-custom-loader': CustomLoader,
  },
  data() {
    return {
      quizOptions: [],
      selectedQuiz: null,
      name: null,
      quizListNotLoaded: true,
      quizSelectionErrorNotPresent: true,
      nameInputErrorNotPresent: true,
    };
  },
  mounted() {
    if (this.$store.state.quizOptions.length === 0) {
      this.getQuizes();
    } else {
      this.quizOptions = this.$store.state.quizOptions;
    }
  },
  methods: {

    getQuizes() {
      axios.get('https://printful.com/test-quiz.php?action=quizzes')
        .then((response) => {
          const extractedQuizOptions = response.data.map((optionData) => {
            const option = {
              value: optionData.id,
              text: optionData.title,
            };
            return option;
          });
          this.quizOptions.push({
            value: null,
            text: 'Please select an option',
            disabled: true,
          }, ...extractedQuizOptions);
          this.quizListNotLoaded = false;
        }).catch(() => {
          // eslint-disable-next-line no-alert
          alert('Could not retrieve quizes, please try again');
        });
    },

    validateForm(event) {
      event.preventDefault();
      if (this.selectedQuiz === null) {
        this.quizSelectionErrorNotPresent = false;
      } else {
        this.quizSelectionErrorNotPresent = true;
      }

      if (this.name === null || this.name === '') {
        this.nameInputErrorNotPresent = false;
      } else {
        this.nameInputErrorNotPresent = true;
      }

      if (this.selectedQuiz && this.name) {
        this.quizSelectionErrorNotPresent = true;
        this.nameInputErrorNotPresent = true;
        this.$store.dispatch('changeUsername', this.name);
        this.$store.dispatch('changeSelectedQuiz', this.selectedQuiz);
        this.$store.dispatch('changeQuizOptions', this.quizOptions);
        this.$router.push('questionsPage');
      }
    },
  },
};
</script>
