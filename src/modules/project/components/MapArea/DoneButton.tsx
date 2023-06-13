import { createControlComponent } from "@react-leaflet/core";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

interface DoneButtonOptions extends L.ControlOptions {
  clickHandler?: () => void;
}

class DoneButton extends L.Control {
  private clickHandler: () => void;

  constructor(options?: DoneButtonOptions) {
    super(options);
    this.clickHandler =
      options?.clickHandler ||
      (() => console.log("Done button default handler"));
  }

  onAdd(_map: L.Map): HTMLElement {
    const btn = L.DomUtil.create("button", "done-button");
    btn.innerText = "Done";
    btn.onclick = this.clickHandler;
    return btn;
  }
}

const createDoneButtonInstance = (options: DoneButtonOptions) =>
  new DoneButton(options);

export const DoneControl = createControlComponent<
  DoneButton,
  DoneButtonOptions
>(createDoneButtonInstance);
