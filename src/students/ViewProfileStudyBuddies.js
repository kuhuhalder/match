import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
const ViewProfileStudyBuddies = (props) => {
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
  const [loggedInUser, setLoggedInUser] = useState(location.state.loggedInUser);

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

  return (
    <div id="ViewProfile">
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
          <Button
            type="submit"
            onClick={() =>
              navigate("/viewstudybuddies", {
                state: { userName: loggedInUser },
              })
            }
          >
            Go back to study buddies
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ViewProfileStudyBuddies;
