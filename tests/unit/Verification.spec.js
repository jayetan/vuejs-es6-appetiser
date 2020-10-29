import { shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import VueRouter from 'vue-router'
import Verification from '@/views/Verification.vue'
import Api from '@/api'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

jest.mock('@/api', () => ({
  onVerify () {
    return { http_status: 200 }
  }
}))

const VueFormStub = {
  render: () => {},
  methods: {
    validate: () => {}
  }
}

describe('Verification.vue', () => {
  const wrapper = shallowMount(Verification, {
    localVue,
    router,
    stubs: {
      'v-form': VueFormStub
    }
  })

  it('should update email', () => {
    wrapper.vm.onInputChange('test@test.com', 'email')
    expect(wrapper.vm.email).toBe('test@test.com')
  })

  it('should update code', () => {
    wrapper.vm.onInputChange('1234', 'code')
    expect(wrapper.vm.code).toBe('1234')
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

  it('should submit form and redirect to dashboard', async () => {
    wrapper.vm.onInputChange('1234', 'code')
    wrapper.vm.onInputChange('test@test.com', 'email')
    wrapper.vm.onFormSubmit('1234', 'test@test.com')
    await flushPromises()
    expect(wrapper.vm.$route.path).toBe('/dashboard')
  })

  it('should return error message if submitted', async () => {
    Api.onVerify = () => ({ http_status: 422, message: 'unauthorized' })
    wrapper.vm.onFormSubmit()
    await flushPromises()
    expect(wrapper.vm.errorMessage).toStrictEqual('unauthorized')
  })
})
