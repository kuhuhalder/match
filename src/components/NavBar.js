import React, { useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [year, setYear] = useState(0);
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

  const logout = () => {
    setUserName("");
    setPassword("");
    navigate("/");
  };
  return (
    <ul>
      <li>
        <a href="/account" onClick ={(e)=>navigate("/account", {state:{userName:userName}})}>Account</a>
      </li>
      <li>
        <a href="/profile" onClick={(e) => handleUpdate(e)}>
          Update Profile
        </a>
      </li>
      <li>
        <a href="/viewstudybuddies" onClick={(e) => handleViewStudyBuddies(e)}>
          View Study Buddies
        </a>
      </li>
      <li>
        <a href="/matches" onClick={(e) => handleMatch(e)}>
          View Matches
        </a>
      </li>
      <li>
        <a href="/viewrequests" onClick={(e) => handleRequests(e)}>
          View Requests
        </a>
      </li>
      <li>
        <a href="/" onClick={(e) => logout(e)}>
          Logout
        </a>
      </li>
    </ul>
    //   <Navbar bg="dark" variant="dark">
    //   <Container>
    //     <Navbar.Brand href="/home">
    //       {/* <img
    //         alt=""
    //         src={Logo}
    //         width="30"
    //         height="30"
    //         className="d-inline-block align-top"
    //       />{' '} */}
    //      Match
    //     </Navbar.Brand>

    //     <Nav className="me-auto">
    //       {/* <Nav.Link href="/account">About Us</Nav.Link>
    //       <Nav.Link onClick={goLogin}>Login</Nav.Link>
    //       <Nav.Link  onClick={goRegister}>Register</Nav.Link> */}
    //       <Nav.Link href="/account">Account</Nav.Link>
    //   <Nav.Link href="/profile" onClick={(e) => handleUpdate(e)}>
    //    Update Profile
    //   </Nav.Link>
    //   <Nav.Link href="/viewstudybuddies" onClick={(e) => handleViewStudyBuddies(e)}>
    //      View Study Buddies
    //   </Nav.Link>
    //   <Nav.Link href="/matches" onClick={(e) => handleMatch(e)}>
    //      View Matches
    //   </Nav.Link>
    //   <Nav.Link href="/viewrequests" onClick={(e) => handleRequests(e)}>
    //      View Requests
    //   </Nav.Link>
    //   {/* <Nav.Link href="/" onClick={(e) => logout(e)}>
    //     Logout
    //   </Nav.Link> */}
    //     </Nav>

    //     <Nav className="justify-content-end">
    //       <Nav.Link onClick={logout}>Logout</Nav.Link>
    //     </Nav>
    //   </Container>
    // </Navbar>
  );
};
export default NavBar;
