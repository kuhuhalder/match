import axios from "axios";
import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.jpeg";
/**
 * NavBar component is to display the navigation bar.
 * @param {*} props 
 * @returns React component
 */
const NavBar = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [pronouns, setPronouns] = useState("");
  const [campus, setCampus] = useState("");
  const [course, setCourse] = useState(null);
  const [major, setMajor] = useState("");
  const [bio, setBio] = useState("");
  const [year, setYear] = useState("");
  const [genderPreference, setGenderPreference] = useState(null);
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
      setPronouns(result.data.pronouns);
      setCampus(result.data.campus);
      setCourse(result.data.course);
      setMajor(result.data.major);
      setBio(result.data.bio);
      setYear(result.data.year);
      setGenderPreference(result.data.genderPreference);
    })
    .catch((error) => {
      console.log(error);
      error = new Error();
    });
  const handleAccount = (e) => {
    navigate("/account", {
      state: {
        userName: userName,
      },
    });
  };
  const handleMatch = (event) => {
    navigate("/matches", {
      state: {
        id: userName,
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        pronouns: pronouns,
        campus: campus,
        course: course,
        major: major,
        bio: bio,
        year: year,
        genderPreference: genderPreference,
      },
    });
  };

  const handleUpdate = (e) => {
    navigate("/profile", {
      state: {
        id: userName,
        userName: userName,
        firstName: firstName,
        lastName: lastName,
      },
    });
  };
  const handleViewStudyBuddies = (e) => {
    navigate("/viewstudybuddies", {
      state: { id: userName, userName: userName },
    });
  };

  const handleRequests = (e) => {
    navigate("/viewrequests", { state: { id: userName, userName: userName } });
  };

  const handleRequestsSent = (e) => {
    navigate("/requestssent", { state: { id: userName, userName: userName } });
  };
  const logout = () => {
    setUserName("");
    setPassword("");
    navigate("/");
  };
  return (
    <Navbar className="color-nav" variant="light">
      <Container>
        <Navbar.Brand href="/home" className="justify-content-start">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Match
        </Navbar.Brand>

        <Nav className="justify-content-center">
          <Nav.Link href="/account" onClick={(e) => handleAccount(e)}>
            Account
          </Nav.Link>
          <Nav.Link href="/profile" onClick={(e) => handleUpdate(e)}>
            Update Profile
          </Nav.Link>
          <Nav.Link href="/matches" onClick={(e) => handleMatch(e)}>
            View Potential Matches
          </Nav.Link>
          <Nav.Link href="/viewrequests" onClick={(e) => handleRequests(e)}>
            View Your Requests
          </Nav.Link>
          <Nav.Link href="/requestssent" onClick={(e) => handleRequestsSent(e)}>
            View Requests Sent
          </Nav.Link>
          <Nav.Link
            href="/viewstudybuddies"
            onClick={(e) => handleViewStudyBuddies(e)}
          >
            View Study Buddies
          </Nav.Link>
        </Nav>

        <Nav className="justify-content-end">
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default NavBar;
