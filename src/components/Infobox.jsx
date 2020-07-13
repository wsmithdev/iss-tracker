import React, { useState, useEffect } from "react";

function Infobox(props) {
  // State
  const [lgn, updateLng] = useState();
  const [lat, updateLat] = useState();
  const [passData, updatePassData] = useState();
  const [crewMembers, updateCrewMembers] = useState([]);

  // Functions
  //

  // Get user location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      updateLng(position.coords.longitude);
      updateLat(position.coords.latitude);
    });
  };

  // Get overhead pass time
  const getPasses = () => {
    if (!lgn || !lat) {
      return;
    } else {
      let URL = `http://www.n2yo.com/rest/v1/satellite/visualpasses/25544/${lat}/${lgn}/0/10/300/&apiKey=LYFLJY-PTWWYL-XKV96K-4HKF`;
      console.log(URL);
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          const startUnix = data.passes[0].startUTC;
          const passDate = new Date(startUnix * 1000);
          updatePassData(passDate.toString().slice(0, 24));
        });
    }
  };

  const getNames = () => {
    fetch("http://api.open-notify.org/astros.json")
      .then((response) => response.json())
      .then((data) => {
        updateCrewMembers(data.people);
        console.log(data.people);
      });
  };

  useEffect(() => {
    getLocation();
    getNames();
  }, []);

  useEffect(() => {
    getPasses();
  }, [lgn, lat]);

  return (
    <div className="info">
      <h2>ISS Information</h2>
      <p>
        <span>
          Altitude: {props.data.altitude.toFixed(2)}
          {props.data.units === "kilometers" ? " km" : " miles"}
        </span>
        <br />
        <span>
          Velocity: {props.data.velocity.toFixed(2)}
          {props.data.units === "kilometers" ? " km/h" : " mph"}
        </span>
        <br />
        <span>Lat: {props.data.latitude.toFixed(5)}</span>
        <br />
        <span>Lng: {props.data.longitude.toFixed(5)}</span>
        <br />
        <span>Next Visible Pass: {passData ? passData : "Loading..."}</span>
        <br />
        <br />
        <span>Crew Onboard:</span>
        <ol>
          {crewMembers.map(function (item, i) {
            return <li>{item.name}</li>;
          })}
        </ol>
      </p>
    </div>
  );
}

export default Infobox;
