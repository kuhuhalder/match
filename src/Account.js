import React, { useState } from "react";
import SideBar from "./components/Sidebar";
import { Form, Button } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./Account.css";
import axios from "axios";
import Match from "./Match";
import Profile from "./Profile";
import NavBar from "./components/NavBar";
const Account = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [pronouns, setPronouns] = useState("");
  const [campus, setCampus] = useState("");
  const [course, setCourse] = useState("");
  const [major, setMajor] = useState("");
  const [bio, setBio] = useState("");
  const [year, setYear] = useState(0);
  const [genderPreference, setGenderPreference] = useState(null);
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
    navigate("/profile", { state: { id: userName, userName: userName } });
  };

  const logout = () => {
    setUserName("")
    setPassword("")
    navigate("/")
}
  return (
    <>
      <div id="Account">
        <SideBar />
        <div id="page-wrap">

          {/* <NavBar /> */}
          <ul>
            <li><a href="/">Home </a></li>
            <li><a href="/account">Account</a></li>
            <li><a href="/profile" onClick={(e) => handleUpdate(e)}>
              Update Profile
            </a></li>
            <li><a href="/matches" onClick={(e) => handleMatch(e)}>
              View Matches
            </a></li>
            <li><a href="/" onClick={(e) => logout(e)}>
              Logout
            </a></li>
            </ul>

          <h2>
            Welcome {firstName} {lastName}!
          </h2>

          <div>
            <h2>Your information</h2>
            <h4> First Name: {firstName}</h4>
            <h4> Last Name: {lastName}</h4>
            <h4> Pronouns: {pronouns}</h4>
            <h4> Campus: {campus}</h4>
            <h4> Courses: {course}</h4>
            <h4> Major: {major}</h4>
            <h4> Year: {year}</h4>
            <h4> Gender Preference: {genderPreference}</h4>
            <h4> Bio: {bio}</h4>
          </div>
        </div>
      </div>
    </>
  );
};
export default Account;
