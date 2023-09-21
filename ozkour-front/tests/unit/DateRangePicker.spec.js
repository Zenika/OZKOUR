import { render, screen, userEvent } from "@/../test-utils";
import DateRangePicker from "@/components/DateRangePicker.vue";

describe("When I first render my date range picker", () => {
  test("I should have the first and last day of the current month in the input", async () => {
    render(DateRangePicker);

    const input = await screen.findByLabelText("Datepicker input");
    const today = new Date();
    const firstDayOfTheCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    ).toLocaleDateString("fr");
    const lastDayOfTheCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).toLocaleDateString("fr");

    expect(input.value).toBe(
      `${firstDayOfTheCurrentMonth} - ${lastDayOfTheCurrentMonth}`
    );
  });
});

describe("When I click on the input of the date range picker and change the date", () => {
  test("I should have the new date in the input", async () => {
    render(DateRangePicker);

    const input = await screen.findByLabelText("Datepicker input");
    await userEvent.click(input);
    const two = screen.getByText("2");
    await userEvent.click(two);
    const seventeen = screen.getByText("17");
    await userEvent.click(seventeen);
    const today = new Date();
    const day2 = new Date(
      today.getFullYear(),
      today.getMonth(),
      2
    ).toLocaleDateString("fr");
    const day17 = new Date(
      today.getFullYear(),
      today.getMonth(),
      17
    ).toLocaleDateString("fr");

    expect(input.value).toBe(`${day2} - ${day17}`);
  });
});
