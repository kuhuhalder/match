import React, { useState } from "react";
import SideBar from './components/Sidebar';
import { Form, Button } from "react-bootstrap";
import "./Account.css";
import axios from "axios";
import Match from "./Match";
const Account = (props) => {

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

    const handleMatch= (event) => {
      const element = <Match userName = {props.userName} firstName = {firstName} lastName = {lastName} root = {props.root}/>;
      props.root.render(element);
    };

  return (
    <>
    <div id="Account">
      <SideBar />
      <div id="page-wrap">
        <h1>Account</h1>
        <h2>Welcome {firstName} {lastName}!</h2>

        <div>Click here to see students who are a great match for you -> 

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleMatch(e)}
        >
          Go match!
        </Button>
        </div>
    
      </div>
    </div>

    </>
  );
}
export default Account;
