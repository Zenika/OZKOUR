import EventWarningArray from "@/components/EventWarningArray.vue";
import { mount } from "@vue/test-utils";

describe("EventArrayWarning", () => {
  it("should render the message in plurial", () => {
    const wrapper = mount(EventWarningArray, {
      props: {
        warning: [2, 3],
      },
    });
    expect(wrapper).toBeDefined();
    expect(wrapper.text()).toBe(
      "WARNING : Données manquantes sur les lignes du google sheet : 2, 3."
    );
  });
  it("should render the message in singular", () => {
    const wrapper = mount(EventWarningArray, {
      props: {
        warning: [2],
      },
    });
    expect(wrapper.text()).toBe(
      "WARNING : Données manquantes sur la ligne du google sheet :  2."
    );
  });
  it("should not render the components", () => {
    const wrapper = mount(EventWarningArray, {
      props: {
        warning: [2],
      },
    });
    expect(wrapper.text()).toBe(
      "WARNING : Données manquantes sur la ligne du google sheet :  2."
    );
  });
});
