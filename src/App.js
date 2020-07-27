import React, { useState, useEffect } from "react";
import "./App.css";
import Mapbox from "./components/Mapbox";
import Infobox from "./components/Infobox";

function App() {
  // useState
  const [units, updateUnits] = useState("kilometers");
  const [data, updataData] = useState({
    latitude: 0.0,
    longitude: 0.0,
    altitude: 0.0,
    velocity: 0.0,
    units: "kilometers",
  });
  const [counter, updateCounter] = useState(0);
  const [muteImage, updateMuteImage] = useState(
    "https://img.icons8.com/flat_round/64/000000/mute.png"
  );


  // Function
  //
  // API call to retrieve ISS position
  const getData = () => {
    let URL = `https://api.wheretheiss.at/v1/satellites/25544/?units=${units}`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        updataData(data);
      });
  };
  // Called every time interval counter updates or when units change
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [counter, units]);

  // Called once on page load to start interval counter
  useEffect(() => {
    interval();
    // eslint-disable-next-line
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

  // Unit toggle
  const unitToggle = () => {
    if (units === "kilometers") {
      updateUnits("miles");
    } else {
      updateUnits("kilometers");
    }
  };

  // Background audio
  const audioFile = document.querySelector("#audioFile");
  // Audio mute toggle
  const mute = () => {
    if (audioFile.muted) {
      audioFile.muted = false;
      updateMuteImage("https://img.icons8.com/flat_round/64/000000/mute.png");
    } else {
      audioFile.muted = true;
      updateMuteImage(
        "https://img.icons8.com/flat_round/64/000000/low-volume--v1.png"
      );
    }
  };

  return (
    <>
      <div className="container">
        <div id="heading">
          <h1>ISS Tracker</h1>
        </div>
        <div className="info-container">
          <Infobox data={data} unitToggle={unitToggle} />
        </div>
        <div className="map-container">
          <Mapbox data={data} />
        </div>
        <div className="spacer"></div>
        <div className="mute-btn">
          <img src={muteImage} alt="mute button" onClick={mute} />
        </div>
      </div>
      <audio  autoPlay={true} id="audioFile" src="/audio.mp3"/>
    </>
  );
}

export default App;
