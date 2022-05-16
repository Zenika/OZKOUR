import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import PopUp from "@/components/RecapModal.vue"

// describe("RecapModal Component", () => {
//     it("Display the template chosen", async () => {
//         const wrapper = mount(PopUp, {
//             global: {
//               plugins: [createTestingPinia()],
//             },
//         });

//         const template = wrapper.find('name="template"');

//         await template.setValue("E-mailing")

//         expect(template.element.value).toBe("E-mailing");
//     })

//     it("Display the start date and end date chosen", async () => {

//     }),

//     it("Display a list of the chosen talks, only their titles", async () => {

//     })
// })