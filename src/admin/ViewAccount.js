import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewAccount = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState(location.state.userName);
  const [password, setPassword] = useState(location.state.password);

  const configuration = {
    method: "get",
    url: "http://localhost:8080/api/students/getStudent/" + userName,
  };
  console.log(configuration);

  axios(configuration)
    .then((result) => {
      setFirstName(result.data.firstName);
      setLastName(result.data.lastName);
    })
    .catch((error) => {
      console.log(error);
      error = new Error();
    });
  const handleViewMatches = (e) => {
    Navigate("/viewallmatches");
  };
  const handleViewStudents = (e) => {
    Navigate("/viewallstudents");
  };

  const logout = () => {
    setUserName("")
    setPassword("")
    Navigate("/")
}
  return (
    <div className="ViewAccount">
      <ul>
        <li>
          <a href="/viewaccount">Account</a>
        </li>
        <li>
          <a href="/updateprofile" onClick={(e) => {navigate("/updateprofile", {state:{id:userName, userName:userName}})}}>Update Profile</a>
        </li>
        <li>
          <a href="/viewallstudents" onClick={(e) => handleViewStudents(e)}>
            View All Students
          </a>
        </li>
        <li>
          <a href="/viewallmatches" onClick={(e) => handleViewMatches(e)}>
            View All Matches
          </a>
        </li>
        <li>
          <a href="/" onClick={(e) => logout(e)}>
            Logout
          </a>
        </li>
      </ul>
      <h2>
        Welcome {firstName} {lastName}!
      </h2>
      <h2>Your Information</h2>
      <h4>Username: {userName} </h4>
      <h4>First Name: {firstName} </h4>
      <h4>Last Name: {lastName} </h4>
    </div>
  );
};
export default ViewAccount;
