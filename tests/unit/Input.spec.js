import { shallowMount } from '@vue/test-utils'
import Input from '@/components/Input.vue'

describe('Input.vue', () => {
  const wrapper = shallowMount(Input)

  it('should emit inputChange', async () => {
    wrapper.vm.onInputChange(123)
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().inputChange[0]).toEqual([123])
  })
})
