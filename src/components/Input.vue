<template>
  <v-text-field
    :label="label"
    :type="type"
    :rules="rules"
    hide-details="auto"
    color="red"
    @input="onInputChange"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    label: String,
    type: String,
    rules: Array
  },
  methods: {
    onInputChange (value) {
      this.$emit('inputChange', value)
    }
  }
}
</script>

<style>
.error--text {
  color: #ff5252 !important;
  caret-color: #ff5252 !important;
}
</style>
