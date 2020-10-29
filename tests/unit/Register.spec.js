import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Register from '@/views/Register.vue'
import flushPromises from 'flush-promises'
import Api from '@/api'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

jest.mock('@/api', () => ({
  onSignUp () {
    return { http_status: 200 }
  }
}))

describe('Register.vue', () => {
  const wrapper = shallowMount(Register, {
    localVue,
    router
  })

  it('should update email', () => {
    wrapper.vm.onInputChange('test@test.com', 'email')
    expect(wrapper.vm.email).toBe('test@test.com')
  })

  it('should validate email', () => {
    const emailPassed = wrapper.vm.emailRules('test@test.com')
    expect(emailPassed).toEqual(true)

    const emailFailed = wrapper.vm.emailRules('test')
    expect(emailFailed).toBe('Invalid e-mail.')
  })

  it('should validate password', () => {
    const passwordPassed = wrapper.vm.requiredRules('mysecurepassword')
    expect(passwordPassed).toEqual(true)

    const passwordFailed = wrapper.vm.requiredRules('')
    expect(passwordFailed).toBe('Required.')
  })

  it('should validate password', () => {
    wrapper.vm.onInputChange('test', 'password')
    wrapper.vm.onInputChange('test', 'confirmPassword')
    const passwordConfirmPassed = wrapper.vm.passwordConfirmationRule()
    expect(passwordConfirmPassed).toEqual(true)

    wrapper.vm.onInputChange('testing', 'confirmPassword')
    const passwordConfirmFailed = wrapper.vm.passwordConfirmationRule()
    expect(passwordConfirmFailed).toEqual('Password must match')
  })

  it('should redirect to verification page on successfull registration', async () => {
    wrapper.vm.onFormSubmit('test@test.com', 'Test User', 'password', 'password')
    await flushPromises()
    expect(wrapper.vm.$route.path).toBe('/verification')
  })

  it('should return errors if registration failed', async () => {
    Api.onSignUp = () => ({ http_status: 422, errors: { email: ['test'] } })
    wrapper.vm.onFormSubmit()
    await flushPromises()
    expect(wrapper.vm.errorMessage).toStrictEqual(['test'])
  })

  it('should return error message if submitted', async () => {
    Api.onSignUp = () => ({ http_status: 422, message: 'email required' })
    wrapper.vm.onFormSubmit()
    await flushPromises()
    expect(wrapper.vm.errorMessage).toStrictEqual(['email required'])
  })
})
