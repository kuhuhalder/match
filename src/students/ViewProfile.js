import React, { useState } from "react";
import SideBar from "../components/Sidebar";
import { Form, Button } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./Account.css";
import axios from "axios";
import Match from "./Match";
import Profile from "./Profile";
import NavBar from "../components/NavBar";
const ViewProfile = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [pronouns, setPronouns] = useState("");
  const [campus, setCampus] = useState("");
  const [course, setCourse] = useState([null]);
  const [major, setMajor] = useState("");
  const [bio, setBio] = useState("");
  const [year, setYear] = useState(0);
  const [genderPreference, setGenderPreference] = useState(null);
  const [userName, setUserName] = useState(location.state.userName);
  const [userName2, setUserName2] = useState(location.state.userName2);

  const [id, setId] = useState(location.state.userName2+"+"+userName);

  const [password, setPassword] = useState(location.state.password);
  const [match, setMatch] = useState(false);

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

const handleRequestMatch =(e)=>{
    <div>You have requested to match with this student: {e}</div>
    const configuration = {
      method: "post",
      url: "http://localhost:8080/api/students/matchAdd",
      data: {
        id,
        userOneId:userName2,
        userTwoId:userName
      },
    };
    console.log(configuration);
    axios(configuration)
      .then((result) => {
        setMatch(true);
      })
      .catch((error) => {
        error = new Error();
      });
  }

  return (
    <>
      <div id="ViewProfile">
        {/* <SideBar /> */}
        <div id="page-wrap">

          <div>
            <h4> First Name: {firstName}</h4>
            <h4> Last Name: {lastName}</h4>
            <h4> Pronouns: {pronouns}</h4>
            <h4> Campus: {campus}</h4>
            <h4> Courses: {course}</h4>
            <h4> Major: {major}</h4>
            <h4> Year: {year}</h4>
            <h4> Gender Preference: {genderPreference}</h4>
            <h4> Bio: {bio}</h4>
            {/* <button onClick={()=>{handleRequestMatch(userName)}}>Match </button> */}
            <Button
                      type="submit"
                      onClick={() => handleRequestMatch()}
                    >
                    Match
                    </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewProfile;
