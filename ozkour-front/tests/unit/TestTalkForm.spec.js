import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import TalkForm from '@/views/TalkForm'

describe('TalkForm component', () => {
  const _buildTalkForm = (options = {}) => {
    const { data } = options

    return mount(TalkForm, {
      shallow: true,
      data () {
        return data
      },
      global: {
        plugins: [createTestingPinia()]
      }
    })
  }

  describe('Recap modal behavior', () => {
    describe('When the component is mounted', () => {
      it('should hide the modal', () => {
        const talkForm = _buildTalkForm()

        expect(talkForm.find('#talk-recap-modal').exists()).toBe(false)
      })
    })

    it('should display the modal when the generate button is clicked', async () => {
      const talkForm = _buildTalkForm()

      await talkForm.find('primary-btn-stub').trigger('click')

      expect(talkForm.find('#talk-recap-modal')).toBeTruthy()
    })

    it('should hide the modal when the Modal component emit a close event', async () => {
      const talkForm = _buildTalkForm({ data: { isModalVisible: true } })

      await talkForm.find('#talk-recap-modal').trigger('close')

      expect(talkForm.find('#talk-recap-modal').exists()).toBe(false)
    })
  })
})
