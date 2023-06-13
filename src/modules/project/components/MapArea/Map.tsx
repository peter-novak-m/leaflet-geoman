import "leaflet/dist/leaflet.css";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { v4 as uuidv4 } from "uuid";

import React, { useState } from "react";
import type { FC } from "react";
import * as L from "leaflet";
import { GeomanControl } from "./GeomanControl";
import { DoneControl } from "./DoneButton";
import { CancelControl } from "./CancelButton";

interface IMapProps {
  isDone: boolean;
  setIsDone: (isDone: boolean) => void;
}

interface MyLayer extends L.Layer {
  _leaflet_id?: string;
  coords:
    | L.LatLngExpression[]
    | L.LatLngExpression[][]
    | L.LatLngExpression[][][];
}

const Map: FC<IMapProps> = ({ isDone, setIsDone }) => {
  const washingtonDC = L.latLng(38.9072, -77.0369);
  const mapStyle = { height: "100vh", width: "100%", padding: 0 };

  const [polygons, setPolygons] = useState<
    {
      id: string;
      coords:
        | L.LatLngExpression[]
        | L.LatLngExpression[][]
        | L.LatLngExpression[][][];
    }[]
  >([]);

  console.log("COORDS");
  console.log(polygons);

  console.log(isDone);
  return (
    <React.Fragment>
      <MapContainer
        center={washingtonDC}
        zoom={8}
        zoomControl={false}
        style={mapStyle}
        //whenReady={() => {}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <GeomanControl
          position="bottomleft"
          oneBlock
          onCreate={(layer) => {
            // Get the layer's coordinates and update the state variable
            const latlngs = (layer as L.Polygon).getLatLngs();

            // Generate a unique ID for the polygon
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const id = uuidv4() as string;

            // Add the polygon to the state
            setPolygons((prevPolygons) => [
              ...prevPolygons,
              { id, coords: latlngs },
            ]);

            // Assign the ID to the layer
            (layer as MyLayer)._leaflet_id = id;
          }}
          onUpdate={(layer) => {
            const latlngs = (layer as L.Polygon).getLatLngs();
            const id = (layer as MyLayer)._leaflet_id;

            console.log("Updated coordinates:", latlngs);
            setPolygons((prevPolygons) =>
              prevPolygons.map((polygon) =>
                polygon.id === id ? { id, coords: latlngs } : polygon
              )
            );
          }}
          onRemove={(layer) => {
            const id = (layer as MyLayer)._leaflet_id;

            setPolygons((prevPolygons) =>
              prevPolygons.filter((polygon) => polygon.id !== id)
            );
          }}
        />
        <DoneControl
          position="topright"
          clickHandler={() => {
            console.log("Done button clicked!");
            setIsDone(true);
            console.log("isDone: ", isDone);
          }}
        />
        <CancelControl />

        {/* Display different map layers */}
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
              zIndex={1}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxNativeZoom={19}
              maxZoom={25}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="MapBox.Satellite">
            <TileLayer
              zIndex={1}
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
              url={`https://api.mapbox.com/styles/v1/${"mapbox/satellite-streets-v11"}/tiles/{z}/{x}/{y}?access_token=${
                process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""
              }`}
              maxNativeZoom={21}
              maxZoom={25}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="MapBox.Outdoors">
            <TileLayer
              zIndex={1}
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
              url={`https://api.mapbox.com/styles/v1/${"mapbox/outdoors-v11"}/tiles/{z}/{x}/{y}?access_token=${
                process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""
              }`}
              maxNativeZoom={21}
              maxZoom={25}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </React.Fragment>
  );
};

export default Map;

// https://stackblitz.com/edit/nextjs-3paj5o?file=pages%2FMap.jsx
// https://www.bekk.christmas/post/2020/13/a-hot-chocolate-map-with-react-leaflet-and-typescript
