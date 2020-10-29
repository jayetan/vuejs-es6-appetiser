<template>
  <Form
    :buttonOneText="'Sign up'"
    :buttonTwoText="'Login'"
    :buttonLink="'/register'"
    :isValid="valid"
    @formSubmit="onFormSubmit"
  >
    <template v-slot:title>
      <h1>Welcome Back</h1>
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
          :label="'Password'"
          :type="'password'"
          :rules="[requiredRules]"
          @inputChange="onInputChange($event, 'password')"
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
    password: '',
    valid: true,
    errorMessage: ''
  }),
  methods: {
    onInputChange (value, type) {
      this[type] = value
    },
    async onFormSubmit () {
      const response = await Api.onLogin(this.email, this.password)
      if (response.http_status === 200) {
        this.$router.push({ path: '/dashboard' })
      } else {
        const { errors } = response
        this.errorMessage = errors ? Object.entries(errors).map(([_key, value]) => value[0]) : [response.message]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
