import { createControlComponent } from "@react-leaflet/core";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

interface Props extends L.ControlOptions {
  position: L.ControlPosition;
  drawCircle?: boolean;
  oneBlock?: boolean;
  onCreate: (layer: MyLayer) => void;
  onRemove: (layer: MyLayer) => void;
  onUpdate: (layer: MyLayer) => void;
}

interface MyLayer extends L.Layer {
  _leaflet_id?: string;
}

class Geoman extends L.Control {
  options: Props;

  constructor(options: Props) {
    super(options);
    this.options = options;
  }

  onAdd(map: L.Map): HTMLElement {
    if (map.pm) {
      map.pm.addControls({
        position: this.options.position,
        oneBlock: this.options.oneBlock,
        drawCircleMarker: false,
        drawMarker: false,
        drawPolyline: false,
        drawText: false,
        drawCircle: false,
      });

      // When a layer is created by drawing or importing data
      map.on("pm:create", (e: { layer: MyLayer }) => {
        if (this.options.onCreate) {
          this.options.onCreate(e.layer);
        }
      });

      // When a layer is updated
      map.on("pm:update", (e: { layer: MyLayer }) => {
        if (this.options.onUpdate) {
          console.log("pm:update", e.layer); // For Debugging
          this.options.onUpdate(e.layer);
        }
      });

      // When a layer is updated
      map.on("pm:change", (e: { layer: MyLayer }) => {
        if (this.options.onUpdate) {
          this.options.onUpdate(e.layer);
        }
      });

      // When a layer is dragged
      map.on("pm:dragend", (e: { layer: MyLayer }) => {
        if (this.options.onUpdate) {
          this.options.onUpdate(e.layer);
        }
      });

      // When a layer's vertices are edited
      map.on("pm:edit", (e: { layer: MyLayer }) => {
        if (this.options.onUpdate) {
          this.options.onUpdate(e.layer);
        }
      });

      // When a layer's vertices are edited
      map.on("pm:vertexadded", (e: { layer: MyLayer }) => {
        if (this.options.onUpdate) {
          console.log("pm:vertexadded", e.layer); // For Debugging
          this.options.onUpdate(e.layer);
        }
      });

      // When a layer is cut, edited, or dragged
      map.on("pm:cut", (e: { layer: L.Layer }) => {
        if (this.options.onUpdate) {
          this.options.onUpdate(e.layer);
        }
      });
    }
    return L.DomUtil.create("div");
  }

  onRemove(map: L.Map): void {
    if (map.pm) {
      map.pm.removeControls();
    }

    map.off("pm:create");
    map.off("pm:update");
    map.off("pm:update");
    map.off("pm:dragend");
    map.off("pm:edit");
    map.off("pm:vertexadded");
    map.off("pm:cut");

    map.on("pm:remove", (e: { layer: MyLayer }) => {
      if (this.options.onRemove) {
        this.options.onRemove(e.layer);
      }
    });
  }
}

const createGeomanInstance = (props: Props) => new Geoman(props);

export const GeomanControl = createControlComponent(createGeomanInstance);
