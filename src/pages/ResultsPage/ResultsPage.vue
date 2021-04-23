<template>
  <b-row class="justify-content-center h-100 m-0">
    <b-col sm="12" md="12">
      <b-row class="h-100">
        <b-col class="align-self-center p-5 h-100 m-auto">
          <b-card class="h-50">
            <b-row>
              <b-col class="text-center m-3 p-3">
                <b-card-title><div>Thanks, {{ name }}!</div></b-card-title>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="text-center">
                <div>
                  You responded correctly to {{ totalCorrectAnswers }}
                  out of {{ totalQuestions }} questions
                </div>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'ResultsPage',
  data() {
    return {
      name: this.$store.state.userName,
      totalQuestions: this.$store.state.totalQuestions,
      totalCorrectAnswers: this.$store.state.totalCorrectAnswers,
    };
  },
};
</script>
