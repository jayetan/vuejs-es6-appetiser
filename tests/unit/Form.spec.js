import { shallowMount } from '@vue/test-utils'
import Form from '@/components/Form.vue'

describe('Form.vue', () => {
  const wrapper = shallowMount(Form)

  it('should emit formSubmit', async () => {
    wrapper.vm.submitForm()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().formSubmit).toBeTruthy()
  })
})
