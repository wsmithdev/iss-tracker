import React, { useState, useEffect } from "react";
import "./App.css";
import Mapbox from "./components/Mapbox";
import Infobox from "./components/Infobox";

function App() {
  // useState
  const [units, updateUnits] = useState("kilometers");
  const [data, updataData] = useState({
    name: "iss",
    id: 25544,
    latitude: 0.0,
    longitude: 0.0,
    altitude: 0.0,
    velocity: 0.0,
    visibility: "daylight",
    footprint: 0.0,
    timestamp: 0,
    daynum: 0.0,
    solar_lat: 0.0,
    solar_lon: 0.0,
    units: "kilometers",
  });
  const [counter, updateCounter] = useState();

  // Function
  //
  // API call to retrieve ISS position
  const getData = () => {
    let URL = `https://api.wheretheiss.at/v1/satellites/25544/?units=${units}`;
    console.log(URL);
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        updataData(data);
      });
  };
  // Called every time interval counter updates or when units change
  useEffect(() => {
    getData();
  }, [counter, units]);

  // Called once on page load to start interval counter
  useEffect(() => {
    interval();
  }, []);

  // Interval counter to trigger API fetch
  let intervalCounter = 0;
  const interval = () => {
    setTimeout(() => {
      intervalCounter++;
      updateCounter(intervalCounter);
      interval();
    }, 5000);
  };


  return (
    <>
      <div className="container">
        <div id="heading">
          <h1>I.S.S Tracker</h1>
        </div>
        <div className="info-container">
          <Infobox data={data} />
        </div>
        <div className="map-container">
          <Mapbox data={data} />
        </div>
        <div className="spacer"></div>
        <div className="mute-btn" >
          <img src="https://img.icons8.com/flat_round/64/000000/mute.png" />
        </div>
      </div>
    </>
  );
}

export default App;
