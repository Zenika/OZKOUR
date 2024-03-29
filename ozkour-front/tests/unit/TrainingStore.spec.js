import { api } from "@/api/apiConfig";
import { setActivePinia, createPinia } from "pinia";
import { dataSetFactory } from "./dataset/trainings.dataset";
import { useTrainingStore } from "@/stores/trainings";

jest.mock("@/api/apiConfig");

describe("Training Store", () => {
  /** @type{ ReturnType< import('./dataset/trainings.dataset.js').dataSetFactory> } */
  let trainingsDataSet;
  beforeEach(() => {
    trainingsDataSet = dataSetFactory();
    setActivePinia(createPinia());
  });

  it("updateTrainings", () => {
    const training = useTrainingStore();
    expect(training.retrieved.length).toBe(0);
    training.updateTrainings(trainingsDataSet.allTrainings, undefined, 200);
    expect(training.retrieved.length).toBe(
      trainingsDataSet.allTrainings.length
    );
    expect(training.retrieved).toStrictEqual(trainingsDataSet.allTrainings);
  });

  it("getSelectedTrainings give all trainings by default ", () => {
    const training = useTrainingStore();
    expect(training.retrieved.length).toBe(0);
    training.updateTrainings(trainingsDataSet.allTrainings, undefined, 200);
    expect(training.getSelectedTrainings.length).toBe(
      trainingsDataSet.allTrainings.length
    );
    expect(training.retrieved).toStrictEqual(trainingsDataSet.allTrainings);
  });

  it("getSelectedTrainingsTitle give all trainingTitles by default ", () => {
    const training = useTrainingStore();
    expect(training.retrieved.length).toBe(0);
    training.updateTrainings(trainingsDataSet.allTrainings, undefined, 200);
    expect(training.getSelectedTrainingsTitle.length).toBe(
      trainingsDataSet.allTrainings.length
    );
    expect(training.getSelectedTrainingsTitle).toStrictEqual(
      trainingsDataSet.allTrainings.map((el) => el.title)
    );
  });

  describe("generateSlidesForSelectedTrainings action", () => {
    it("should return the doc's link given status code to be 200", async () => {
      const training = useTrainingStore();

      training.updateTrainings(trainingsDataSet.allTrainings);

      api.post.mockResolvedValueOnce({
        data: {
          link: "https://monliendedoc.com",
          message: "Created !",
        },
      });
      const res = await training.generateVisualForSelectedTrainings(
        "E-mailing"
      );

      expect(res).toEqual({
        link: "https://monliendedoc.com",
        message: "Created !",
      });
    });
    it("should return null when the visual is unknown", async () => {
      const training = useTrainingStore();

      training.updateTrainings(trainingsDataSet.allTrainings);

      const res = await training.generateVisualForSelectedTrainings("blblblb");

      expect(res).toBe(null);
    });
  });
  describe("getTrainings action (200 response)", () => {
    it("should return the retrieved trainings", async () => {
      const training = useTrainingStore();
      api.get.mockResolvedValueOnce({
        status: 200,
        data: trainingsDataSet.allTrainings.map((el) => {
          return {
            date: el.date,
            title: el.title,
            universe: el.universe,
            duration: el.duration,
            price: el.price,
            url: el.url,
            indexLine: el.indexLine,
          };
        }),
      });
      const res = await training.getTrainings();
      expect(res).toStrictEqual(trainingsDataSet.allTrainings);
    });
  });

  describe("getTrainings action (206 response)", () => {
    it("should return the retrieved trainings", async () => {
      const training = useTrainingStore();
      api.get.mockResolvedValue({
        status: 206,
        data: trainingsDataSet.allTrainingsWithPartialDatas,
      });
      const response = await training.getTrainings();
      expect(response).toStrictEqual(trainingsDataSet.allTrainings);
    });
  });

  describe("changeSelectionTraining action", () => {
    it("should inverse the checked attributed", async () => {
      const training = useTrainingStore();
      training.updateTrainings(trainingsDataSet.allTrainings, undefined, 200);
      training.changeSelectionTraining(trainingsDataSet.allTrainings[0]);
      expect(training.retrieved[0].checked).toBe(false);
    });
  });
  xdescribe("sort action", () => {
    it("should return the sorted training according to a key", async () => {
      const training = useTrainingStore();
      const valueEmitted = {
        selectedColumnKey: "trainingTitle",
        orderIsAscending: true,
        events: trainingsDataSet.allTrainings,
      };

      const trainingsOrdered = trainingsDataSet.allTrainings;
      api.post.mockResolvedValueOnce({
        status: 200,
        data: trainingsOrdered,
      });
      await training.sort(valueEmitted);
      expect(training.retrieved.res).toStrictEqual(trainingsOrdered);
    });
  });
});
