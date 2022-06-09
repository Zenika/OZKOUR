import { mount } from "@vue/test-utils";
import ChoosingDate from "@/components/ChoosingDate.vue";
import { createTestingPinia } from "@pinia/testing";
import { useTalkStore } from "../../src/stores/talks";
import { isNull } from "test/utils";

describe("ChoosingDate Component", () => {
  it("Select Start Date from input", async () => {
    // Create an instance of our component
    const wrapper = mount(ChoosingDate, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const input = wrapper.find('[id="start"]');

    await input.setValue("2021-01-01");

    expect(input.element.value).toBe("2021-01-01");
  }),
  it("Select End Date from input", async () => {
    // Create an instance of our component
    const wrapper = mount(ChoosingDate, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const input = wrapper.find('[id="end"]');

    await input.setValue("2021-02-01");

    expect(input.element.value).toBe("2021-02-01");
  });
  it("change the inputs update the date picker", async () => {
    // Create an instance of our component
    const wrapper = mount(ChoosingDate, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const inputStart = wrapper.find('[id="start"]');

    await inputStart.setValue("2021-01-01");

    const inputEnd = wrapper.find('[id="end"]');

    await inputEnd.setValue("2021-02-01");

    const datePicker = wrapper.findComponent('[data-test="test"]');

    expect(datePicker.componentVM.modelValue).toStrictEqual([
      "2021-01-01",
      "2021-02-01",
    ]);
  }),
  it("change the datePicker update the inputs", async () => {
    // Create an instance of our component
    const wrapper = mount(ChoosingDate, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const datePicker = wrapper.findComponent('[data-test="test"]');

    await datePicker.setValue(["2021-01-01", "2021-02-01"]);

    const inputStart = wrapper.find('[id="start"]');

    const inputEnd = wrapper.find('[id="end"]');

    expect(inputStart.element.value).toStrictEqual("2021-01-01");
    expect(inputEnd.element.value).toStrictEqual("2021-02-01");
  }),
  it("date begining is before date end", async () => {
    // Create an instance of our component
    const wrapper = mount(ChoosingDate, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const inputStart = wrapper.find('[id="start"]');

    await inputStart.setValue("2021-01-01");

    const inputEnd = wrapper.find('[id="end"]');

    await inputEnd.setValue("2021-02-01");

    await inputStart.setValue("2021-02-03");

    expect(inputStart.element.value).toStrictEqual("2021-02-01");

    await inputEnd.setValue("2021-01-01");

    expect(inputEnd.element.value).toStrictEqual("2021-02-01");
  });
});
