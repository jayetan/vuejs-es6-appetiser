<template>
  <Form
    :buttonOneText="'Back'"
    :buttonTwoText="'Verify'"
    :buttonLink="'/'"
    :isValid="valid"
    @formSubmit="onFormSubmit"
  >
    <template v-slot:title>
      <h1>Email Verification</h1>
    </template>
    <template v-slot:form>
      <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      >
        <Input
          :label="'Code'"
          :type="'text'"
          :rules="[requiredRules]"
          @inputChange="onInputChange($event, 'code')"
        />
        <Input
          :label="'Email'"
          :type="'text'"
          :rules="[emailRules, requiredRules]"
          @inputChange="onInputChange($event, 'email')"
        />
      </v-form>
    </template>
    <template v-slot:error v-if="errorMessage">
      <small>{{ errorMessage }}</small>
    </template>
  </Form>
</template>

<script>
import Form from '../components/Form'
import Input from '../components/Input'
import Api from '../api'

export default {
  components: {
    Form,
    Input
  },
  data: () => ({
    emailRules: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    },
    requiredRules: value => !!value || 'Required.',
    email: '',
    code: '',
    valid: true,
    errorMessage: ''
  }),
  methods: {
    onInputChange (value, type) {
      this[type] = value
    },
    async onFormSubmit () {
      this.$refs.form.validate()
      const response = await Api.onVerify(this.code, this.email)

      if (response.http_status === 200) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.errorMessage = response.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
