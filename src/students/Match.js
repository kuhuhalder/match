import React, { useState } from "react";
import { Form, Button, Table, Container, Col, Row,  } from "react-bootstrap";
import "./Match.css";
import axios from "axios";
import NavBar from "../components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
const Match = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(location.state.firstName);
  const [lastName, setLastName] = useState(location.state.lastName);
  const [userName2, setUserName2] = useState(location.state.userName);

  const [ids, setIds] = useState([]);

  const configuration = {
    method: "get",
    url:
      "http://localhost:8080/api/students/matches/" + location.state.userName,
  };
  console.log(configuration);
  axios(configuration)
    .then((result) => {
      setIds(result.data);
    })
    .catch((error) => {
      console.log(error);
      error = new Error();
    });

  const handleViewProfile = (e) => {
    // e.preventDefault();
    navigate("/viewprofile", { state: { userName: e, userName2: userName2, firstName:firstName,lastName:lastName } });
  };

  return (
    <Container>
      {/* <div className="Match"> */}
        {/* <div id="page-wrap"> */}
        <Col>
                <NavBar></NavBar>
            </Col>
            <Col>
            <Container>
      {/* <div className="Match">
        <div id="page-wrap"> */}
        {/* <NavBar></NavBar> */}
          <h2>
            {firstName} {lastName}, View Your Matches!
          </h2>
          {/* <table> */}
          <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Year</th>
              <th>Major</th>
              <th>Pronouns</th>
              <th>View Profile</th>
            </tr>
            </thead>
            <tbody>

            
            {ids.map((val, key) => {
                return (
                  <tr key={key}>

                    <td>{val.firstName}</td>
                    <td>{val.course}</td>
                    <td>{val.year}</td>
                    <td>{val.major}</td>
                    <td>{val.pronouns}</td>
                    {/* <td><a href="View Profile">{val.userName}</a></td> */}
                  {/* <a onClick={handleViewProfile(val.userName)}>View Profile</a> */}

                    <Button
                      type="submit"
                      onClick={() => handleViewProfile(val.userName)}
                    >
                      View Profile
                    </Button>
  
                    {/* <button onClick={()=>{handleViewProfile(val.userName)}}>View Profile </button> */}
                  </tr>
                );
              })
              }
              </tbody>
               </Table>
        {/* </div>
      </div> */}
      </Container>
      </Col>
    </Container>
              
      //     {/* </table>
      //   </div>
      // </div> */}
  );
};
export default Match;
