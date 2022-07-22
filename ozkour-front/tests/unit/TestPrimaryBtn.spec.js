import { shallowMount } from "@vue/test-utils";
import '@testing-library/jest-dom/extend-expect';
import PrimaryBtn from '@/components/Buttons/PrimaryBtn';

describe("PrimaryBtn component",  () => {

  it('should disable the modal when the props is true', () => {
    const wrapper = shallowMount(PrimaryBtn, {
      props : {
        disabled : true,
      }
    });
    expect(wrapper.find('button').element).toBeDisabled()
  })

  it('should change the class of the button when the props is true', () => {
    const wrapper = shallowMount(PrimaryBtn, {
      props : {
        disabled : true,
      }
    });
    expect(wrapper.find('button').element).toHaveClass('primary-btn__disabled')
  })
})