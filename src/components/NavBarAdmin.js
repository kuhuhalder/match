import axios from "axios";
import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
const NavBarAdmin = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(state.userName);
  const [password, setPassword] = useState(state.password);

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
  const handleAccount = (e) => {
    navigate("/viewaccount", {
      state: {
        userName: userName,
      },
    });
  };

  const handleViewMatches = (e) => {
    navigate("/viewallmatches", {state:{userName:userName}});
  };
  const handleViewStudents = (e) => {
    navigate("/viewallstudents", {state:{userName:userName}});
  };

  const logout = () => {
    setUserName("");
    setPassword("");
    navigate("/");
  };
  return (
    <Navbar className="color-nav" variant="light">
      <Container>
        <Navbar.Brand href="/home">
          {/* <img
            alt=""
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '} */}
          Match
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link href="/viewaccount" onClick={(e) => handleAccount(e)}>
            Account
          </Nav.Link>
          <Nav.Link
            href="/createaccount"
            onClick={(e) => {
              navigate("/createaccount", {
                state: { id: userName, userName: userName },
              });
            }}
          >
            Create an Account
          </Nav.Link>
          <Nav.Link
            href="/updateprofile"
            onClick={(e) => {
              navigate("/updateprofile", {
                state: { id: userName, userName: userName, firstName:firstName, lastName:lastName },
              });
            }}
          >
            Update your Profile
          </Nav.Link>
          <Nav.Link
            href="/createcourse"
            onClick={(e) => {
              navigate("/createcourse", {
                state: { id: userName, userName: userName },
              });
            }}
          >
            Create a Course
          </Nav.Link>
          <Nav.Link
            href="/viewallstudents"
            onClick={(e) => handleViewStudents(e)}
          >
            View All Students
          </Nav.Link>
          <Nav.Link
            href="/viewallmatches"
            onClick={(e) => handleViewMatches(e)}
          >
            View All Study Buddies
          </Nav.Link>
          <Nav.Link
            href="/viewcourses"
            onClick={(e) => {
              navigate("/viewcourses", {state: { id: userName, userName: userName }});
            }}
          >
            View All Courses
          </Nav.Link>
        </Nav>

        <Nav className="justify-content-end">
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default NavBarAdmin;
