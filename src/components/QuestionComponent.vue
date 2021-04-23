<template>
  <b-row class="h-100">
    <b-col
      v-for='answer in answers'
      v-bind:key='answer.id'
      sm="12" md="6"
      class="mt-md-3 mt-sm-1">
        <b-button
          v-on:click='selectAnswer'
          :value='answer.id'
          :class="selectedAnswer === answer.id? 'answer-selected' : 'answer-not-selected'"
          class="col-12 h-100">
            {{ answer.title }}
        </b-button>
    </b-col>
  </b-row>
</template>

<style scoped>
  .answer-selected {
    background-color: #0ddda4;
    color: black;
  }

  .answer-not-selected {
    background-color: #448183;
    color: white;
  }
</style>

<script>
export default {
  name: 'QuestionComponent',
  props: {
    title: String,
    id: Number,
    answers: Array,
    selectedAnswer: Number,
  },
  methods: {
    selectAnswer(event) {
      this.$emit('clicked', event.target.value);
    },
  },
};
</script>
