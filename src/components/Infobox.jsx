import React, { useState, useEffect } from "react";
import Switch from "react-switch";

function Infobox(props) {
  // State
  const [lgn, updateLng] = useState();
  const [lat, updateLat] = useState();
  const [passData, updatePassData] = useState();
  const [crewMembers, updateCrewMembers] = useState([]);
  const [toggle, setToggle] = useState(false);

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
      });
  };

  useEffect(() => {
    getLocation();
    getNames();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getPasses();
    // eslint-disable-next-line
  }, [lgn, lat]);

  useEffect(() => {
    props.unitToggle();
    // eslint-disable-next-line
  }, [toggle]);

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
      </p>
      <div className="toggle-switch">
        <label htmlFor="material-switch">
          Imperial
          <Switch
            checked={toggle}
            onChange={() => setToggle(!toggle)}
            onColor="#fff"
            onHandleColor="#A0A0A0"
            offColor="#fff"
            offHandleColor="#A0A0A0"
            handleDiameter={20}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={15}
            width={35}
            className="react-switch"
            id="material-switch"
          />
          Metric
        </label>
      </div>
      <span>Crew Onboard:</span>
      <ol>
        {crewMembers.map(function (item, i) {
          return <li key={i}>{item.name}</li>;
        })}
      </ol>
    </div>
  );
}

export default Infobox;
