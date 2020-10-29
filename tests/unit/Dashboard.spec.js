import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import flushPromises from 'flush-promises'
import Api from '@/api'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

jest.mock('@/api', () => ({
  onLogout () {
    return {}
  },
  verifyToken () {
    return true
  }
}))

describe('Dashboard.vue', () => {
  const wrapper = shallowMount(Dashboard, {
    localVue,
    router
  })

  it('should call verifyAuthentication on mount', async () => {
    const spy = jest.spyOn(wrapper.vm, 'verifyAuthentication')
    wrapper.vm.verifyAuthentication()
    await flushPromises()
    expect(spy).toHaveBeenCalled()
  })

  it('should logout', async () => {
    const spy = jest.spyOn(wrapper.vm, 'onLogout')
    wrapper.vm.onLogout()
    expect(spy).toHaveBeenCalled()
  })

  it('should redirect on mount if user is not authenticated', async () => {
    Api.verifyToken = () => false
    wrapper.vm.verifyAuthentication()
    const spy = jest.spyOn(wrapper.vm, 'onLogout')
    await flushPromises()
    expect(spy).toHaveBeenCalled()
  })
})
