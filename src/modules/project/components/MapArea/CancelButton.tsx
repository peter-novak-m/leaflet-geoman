import { createControlComponent } from "@react-leaflet/core";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

class CancelButton extends L.Control {
  onAdd(_map: L.Map): HTMLElement {
    const btn = L.DomUtil.create("button", "cancel-button");
    btn.innerText = "Cancel";
    btn.onclick = () => {
      // log the layers here (if you have them stored somewhere, you didn't provide details on this)
      // redirect
      console.log("CANCEL");
    };

    return btn;
  }
}

const createCancelButtonInstance = () =>
  new CancelButton({ position: "topleft" });

export const CancelControl = createControlComponent(createCancelButtonInstance);
