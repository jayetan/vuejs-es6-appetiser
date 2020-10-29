import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Api from '@/api'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

jest.mock('@/api', () => ({
  onLogin () {
    return { http_status: 200 }
  }
}))

describe('Login.vue', () => {
  const wrapper = shallowMount(Login, {
    localVue,
    router
  })

  it('should update email', () => {
    wrapper.vm.onInputChange('test@test.com', 'email')
    expect(wrapper.vm.email).toBe('test@test.com')
  })

  it('should update password', () => {
    wrapper.vm.onInputChange('testpassword', 'password')
    expect(wrapper.vm.password).toBe('testpassword')
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

  it('should submit form and able to login', async () => {
    wrapper.vm.onInputChange('testpassword', 'password')
    wrapper.vm.onInputChange('test@test.com', 'email')
    wrapper.vm.onFormSubmit('test@test.com', 'testpassword')
    await flushPromises()
    expect(wrapper.vm.$route.path).toBe('/dashboard')
  })

  it('should return errors if submitted', async () => {
    Api.onLogin = () => ({ http_status: 422, errors: { email: ['test'] } })
    wrapper.vm.onFormSubmit()
    await flushPromises()
    expect(wrapper.vm.errorMessage).toStrictEqual(['test'])
  })

  it('should return error message if submitted', async () => {
    Api.onLogin = () => ({ http_status: 422, message: 'email required' })
    wrapper.vm.onFormSubmit()
    await flushPromises()
    expect(wrapper.vm.errorMessage).toStrictEqual(['email required'])
  })
})
