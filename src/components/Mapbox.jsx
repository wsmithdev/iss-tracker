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
          border: "5px solid white"
        }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGVuaGF0dGVyIiwiYSI6ImNqemQ0MXN0eTAyeTkzZHF0N2hrYXJ0OXAifQ.B1CbsLP5XDiqxf76mLG0EA"
        />
        <Marker
          center={[props.data.latitude, props.data.longitude]}
          position={[props.data.latitude, props.data.longitude]}
          icon={pointerIcon}
        >
          <Popup>
            <h4>Current Position:</h4>
            <p>
              Latitude: {props.data.latitude ? props.data.latitude : ""}
              <br />
              Longitude: {props.data.longitude ? props.data.longitude : ""}
            </p>
          </Popup>
        </Marker>
      </Map>
    </>
  );
}

export default Mapbox;
