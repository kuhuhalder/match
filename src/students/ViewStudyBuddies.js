import React, { useState, useEffect } from "react";
import SideBar from "../components/Sidebar";
import { Form, Button, Container, Col, Row, Table } from "react-bootstrap";
import "./Match.css";
import axios from "axios";
import NavBar from "../components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { TableBody, TableHead } from "@mui/material";
const ViewStudyBuddies = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(location.state.firstName);
  const [lastName, setLastName] = useState(location.state.lastName);
  const [usernames, setUsernames] = useState([]);

  const configuration = {
    method: "get",
    url:
      "http://localhost:8080/api/students/findConfirmedMatches/" + location.state.userName,
  };
  console.log(configuration);

  axios(configuration)
    .then((result) => {
      setUsernames(result.data);
    })
    .catch((error) => {
      console.log(error);
      error = new Error();
    });

  // const handleViewProfile = (e) => {
  //   // e.preventDefault();
  //   navigate("/viewprofile", { state: { userName: e } });
  // };

  return (
      // {/* <div className="Match">
      //   <div id="page-wrap"> */}
          <Container>

        <NavBar></NavBar>
          <h2>View your Study Buddies!</h2>
          {/* <table> */}
          <Table striped hover>
            <thead>
            <tr>
            <th>Username</th>
              {/* <th>Name</th>
              <th>Course</th>
              <th>Year</th>
              <th>Major</th>
              <th>Pronouns</th>
              <th>View Profile</th> */}
            </tr>
            </thead>
            <tbody>
            {usernames.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val} accepted your request. Chat with them!</td>
                    {/* <td>{val.firstName}</td>
                    <td>{val.course}</td>
                    <td>{val.year}</td>
                    <td>{val.major}</td>
                    <td>{val.pronouns}</td> */}
                    {/* <td><a href="View Profile">{val.userName}</a></td> */}
                  {/* <a onClick={handleViewProfile(val.userName)}>View Profile</a> */}

                    {/* <Button
                      type="submit"
                      onClick={() => handleViewProfile(val.userName)}
                    >
                      View Profile
                    </Button> */}
  
                    {/* <button onClick={()=>{handleViewProfile(val.userName)}}>View Profile </button> */}
                  </tr>
                );
              })
              }
              </tbody>
          {/* </table> */}
          </Table>
          </Container>
      //   {/* </div>
      // </div> */}
  );
};
export default ViewStudyBuddies;
