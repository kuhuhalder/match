import axios from "axios";
import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import NavBarAdmin from "../components/NavBarAdmin";
// ViewAccount component is to display the admin's information
const ViewAccount = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(location.state.firstName);
  const [lastName, setLastName] = useState(location.state.lastName);
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

  return (
    <div className="ViewAccount">
      <NavBarAdmin></NavBarAdmin>
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
