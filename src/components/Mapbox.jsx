import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Leaf from "leaflet";

function Mapbox(props) {
  //Pointer icon
  const pointerIcon = new Leaf.Icon({
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg",
    iconSize: [70, 70],
  });

  return (
    <>
      <Map
        id="map"
        center={[props.data.latitude, props.data.longitude]}
        zoom="1.5"
        style={{
          height: "100%",
          width: "100%",
          border: "5px solid white",
        }}
      >
        
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2lsbHNtaXRoMTUwNSIsImEiOiJja2d2cHQxOGswMm9kMndwaXdsN2QwM2FlIn0.DPXuIqGl5Sr4-2og3O6hlw"
        />
        <Marker
          center={[props.data.latitude, props.data.longitude]}
          position={[props.data.latitude, props.data.longitude]}
          icon={pointerIcon}
        >
          <Popup>
            <h4>Current Position:</h4>
            <p>
              Latitude:{" "}
              {props.data.latitude ? props.data.latitude.toFixed(5) : ""}
              <br />
              Longitude:{" "}
              {props.data.longitude ? props.data.longitude.toFixed(5) : ""}
            </p>
          </Popup>
        </Marker>
      </Map>
    </>
  );
}

export default Mapbox;
