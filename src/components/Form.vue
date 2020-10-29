<template>
  <v-container
    fill-height
    fluid
  >
    <v-row
      class="fill-height"
      no-gutters
    >
      <v-col class="first-col" cols="12" sm="6"></v-col>
      <v-col cols="12" sm="6">
        <div class="form-container">
          <h2 class="blue--text darken-4">Appetiser App</h2>
          <slot name="title"></slot>
          <slot name="form"></slot>

          <div class="buttons">
            <v-btn
              class="ma-2"
              outlined
              color="indigo"
              :to="buttonLink"
            >
              {{ buttonOneText }}
            </v-btn>
            <v-btn
              color="primary"
              dark
              @click="submitForm"
              :disabled="!isValid"
            >
              {{ buttonTwoText }}
            </v-btn>
          </div>
          <slot name="error"></slot>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    buttonOneText: String,
    buttonTwoText: String,
    buttonLink: String,
    isValid: Boolean
  },
  methods: {
    submitForm () {
      this.$emit('formSubmit')
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding: 0;
  }

  .first-col {
    background-image: url(../assets/featured.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .form-container {
    padding: 0 15px;
    max-width: 400px;
    margin: 0 auto;
    padding-top: 40px;
  }

  .theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: rgba(0,0,0,.12)!important;
    color: gray !important;
  }

  .buttons {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  small {
    display: block;
    color: #ff5252 !important;
  }
</style>
