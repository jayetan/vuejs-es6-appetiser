<template>
  <Form
    :buttonOneText="'Back'"
    :buttonTwoText="'Sign up'"
    :buttonLink="'/'"
    :isValid="valid"
    @formSubmit="onFormSubmit"
  >
    <template v-slot:title>
      <h1>New Account</h1>
    </template>
    <template v-slot:form>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <Input
          :label="'Email'"
          :type="'text'"
          :rules="[emailRules, requiredRules]"
          @inputChange="onInputChange($event, 'email')"
        />
        <Input
          :label="'Full Name'"
          :type="'text'"
          :rules="[requiredRules]"
          @inputChange="onInputChange($event, 'fullName')"
        />
        <Input
          :label="'Password'"
          :type="'password'"
          :rules="[requiredRules]"
          @inputChange="onInputChange($event, 'password')"
        />
        <Input
          :label="'Confirm Password'"
          :type="'password'"
          :rules="[requiredRules, passwordConfirmationRule]"
          @inputChange="onInputChange($event, 'confirmPassword')"
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
  computed: {
    passwordConfirmationRule () {
      return () => (this.password === this.confirmPassword) || 'Password must match'
    }
  },
  data: () => ({
    emailRules: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    },
    requiredRules: value => !!value || 'Required.',
    valid: true,
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    errorMessage: ''
  }),
  methods: {
    async onFormSubmit () {
      const response = await Api.onSignUp(this.email, this.fullName, this.password, this.confirmPassword)

      if (response.http_status === 200) {
        this.$router.push({ path: '/verification' })
      } else {
        const { errors } = response
        this.errorMessage = errors ? Object.entries(errors).map(([_key, value]) => value[0]) : [response.message]
      }
    },
    onInputChange (value, type) {
      this[type] = value
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
