import React, { useState } from "react";
import SideBar from './components/Sidebar';
import "./Account.css";
import axios from "axios";
const Match = (props) => {

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const configuration = {
    method: "get",
    url: "http://localhost:8080/api/students/getStudent/" + props.userName,
  };
  console.log(configuration);

  // make the API call
  
  axios(configuration)
    .then((result) => {
        setFirstName(result.data.firstName);
        setLastName(result.data.lastName);
      })
    .catch((error) => {
      console.log(error)
      error = new Error();
    });
  return (
    <>
    <div id="Account">
      <SideBar />
      <div id="page-wrap">
        <h1>Account</h1>
  <h2>Welcome {firstName} {lastName}!</h2>
      </div>
    </div>

    </>
  );
}
export default Match;
