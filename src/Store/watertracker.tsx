import {
  completeWaterTrackerData,
  ControlsWatertracker,
  Year,
} from "../Types/Watertracker";

export default class WaterTrackerData {
  controls: ControlsWatertracker;
  data: Year;
  constructor(completeData: completeWaterTrackerData) {
    this.controls = completeData.controls;
    this.data = completeData.data;
  }
}
