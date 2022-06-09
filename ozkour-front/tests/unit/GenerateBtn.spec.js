import GenerateBtn from "@/components/Buttons/GenerateBtn.vue"
import { setActivePinia, createPinia } from "pinia";
import { useTalkStore } from "../../src/stores/talks";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";


describe("Generate Button", () => {
    beforeEach(() => {
      // creates a fresh pinia and make it active so it's automatically picked
      // up by any useStore() call without having to pass it to it:
      // `useStore(pinia)`
      setActivePinia(createPinia());
    }),
      it("click on button update the Store", () => {
        const wrapper = mount(GenerateBtn, {
            global: {
              plugins: [createTestingPinia()],
            },
          });
        
        const talk = useTalkStore();

        wrapper.find('button').trigger('click');
        expect(talk.blur).toHaveBeenCalledTimes(1);
      }),
      it("button is blured when clicked", () => {
        const wrapper = mount(GenerateBtn, {
            global: {
              plugins: [createTestingPinia({
                initialState: {
                  talk: { blured: true },
                },
              }),],
            },
          });
        
        expect( wrapper.find('button').classes('blurClass')).toBe(true);
      }),
      it("button is not blured by default", () => {
        const wrapper = mount(GenerateBtn, {
            global: {
              plugins: [createTestingPinia()],
            },
          });
        
          expect( wrapper.find('button').classes('blurClass')).toBe(false);
      })
});