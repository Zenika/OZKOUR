import { mount } from "@vue/test-utils";
import ChoosingTemplate from "@/components/ChoosingTemplate.vue";
import "@testing-library/jest-dom/extend-expect";
import { dataSetFactory } from "./dataset/trainings.dataset.js";

describe("ChoosingTemplate", () => {
  let props;
  /** @type{ import('@vue/test-utils').VueWrapper } */
  let wrapper;
  /** @type{ ReturnType< import('./dataset/trainings.dataset.js').dataSetFactory> } */
  let trainingDataSet;
  beforeEach(() => {
    trainingDataSet = dataSetFactory();
    resetTrainingProps();
    resetWrapper();
  });
  it("should mount component", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("should display the templates given in props", () => {
    const inputs = wrapper.findAll("input");
    const labels = wrapper.findAll("label");

    expect(inputs[0].attributes().value).toBe("formezvous");
    expect(labels[0].text()).toBe("FORMEZ-VOUS");
    expect(inputs[2].attributes().value).toBe("trainwithus");
    expect(labels[2].text()).toBe("TRAIN-WITH-US");
  });
  it("should select the selected template given in props", () => {
    const inputSelectedProps = wrapper.get('input[value="trainwithus"]');
    expect(inputSelectedProps.element.checked).toBe(false);
  });
  describe("when a template is NOT validated", () => {
    beforeEach(() => {
      props.visuals = [
        trainingDataSet.templates.EMAILING,
        trainingDataSet.templates.FORMEZ_VOUS,
      ];
      resetWrapper();
    });
    it("should disable the template", () => {
      const inputDisabledProps = wrapper.get('input[value="formezvous"]');
      expect(inputDisabledProps.element).toBeDisabled();
    });
  });
  describe("when a template is validated", () => {
    beforeEach(() => {
      props.visuals = [
        trainingDataSet.templates.EMAILING,
        trainingDataSet.templates.FORMEZ_VOUS,
      ];
      resetWrapper();
    });
    describe("when the user pick a template", () => {
      beforeEach(async () => {
        const radioBtnUnselected = wrapper.get('input[value="formezvous"]');
        await radioBtnUnselected.setChecked();
      });
      it("should select the new template", () => {
        const radioBtnSelected = wrapper.get('input[value="formezvous"]');
        expect(radioBtnSelected.element.checked).toBe(true);
      });
      it("should emit the new template", async () => {
        wrapper.vm.$emit("changeTemplate", trainingDataSet.templates.EMAILING);
        await wrapper.vm.$nextTick(); // Wait until $emits have been handled

        expect(wrapper.emitted("changeTemplate")).toBeTruthy();
        expect(wrapper.emitted().changeTemplate[0][0]).toEqual(
          trainingDataSet.templates.EMAILING
        );
      });
    });
  });

  function resetTrainingProps() {
    props = {
      visuals: [
        trainingDataSet.templates.FORMEZ_VOUS,
        trainingDataSet.templates.EMAILING,
        trainingDataSet.templates.TRAIN_WITH_US,
        trainingDataSet.templates.TRAIN_WITH_US_GREEN,
      ],
      selected: trainingDataSet.templates.EMAILING,
    };
  }

  function resetWrapper() {
    wrapper = mount(ChoosingTemplate, {
      props,
    });
  }
});
