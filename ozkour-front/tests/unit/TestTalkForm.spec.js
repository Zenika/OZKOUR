import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import TalkForm from '@/views/TalkForm';

describe("TalkForm component",  () => {
  describe("Recap modal behavior", () => {
    it('should hide the modal when the component is mounted', () => {
      const talkForm = mount(TalkForm, {
        shallow  : true,
        global: {
          plugins: [createTestingPinia()],
        },
      })

      expect(talkForm.find('#talk-recap-modal').exists()).toBe(false)
    })

    it('should display the modal when the generate button is clicked', async () => {
      const talkForm = mount(TalkForm, {
        shallow  : true,
        global: {
          plugins: [createTestingPinia()],
        },
      });

      await talkForm.find('primary-btn-stub').trigger('click');

      expect(talkForm.find('#talk-recap-modal').exists()).toBe(true);
    })

    it('should hide the modal when the Modal component emit a close event', async () => {
      const talkForm = mount(TalkForm, {
        shallow  : true,
        data() {
          return {
            isModalVisible : true
          }
        },
        global: {
          plugins: [createTestingPinia()],
        },
      });

      await talkForm.find('#talk-recap-modal').trigger('close');

      expect(talkForm.find('#talk-recap-modal').exists()).toBe(false);
    })
  })
})