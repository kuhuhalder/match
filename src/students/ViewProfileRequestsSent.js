import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
/**
 * ViewProfileRequestsSent component is to display the profile of the student who the logged in user has sent requests to.
 * @param {*} props 
 * @returns React component
 */
const ViewProfileRequestsSent = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [pronouns, setPronouns] = useState("");
  const [campus, setCampus] = useState("");
  const [course, setCourse] = useState([null]);
  const [major, setMajor] = useState("");
  const [bio, setBio] = useState("");
  const [year, setYear] = useState("");
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
          <h4>
            {" "}
            First Name: <b>{firstName} </b>
          </h4>
          <h4>
            {" "}
            Last Name: <b>{lastName}</b>
          </h4>
          <h4> Pronouns: {pronouns}</h4>
          <h4>
            {" "}
            Campus: <b>{campus}</b>
          </h4>
          <h4>
            {" "}
            Courses:{" "}
            <b>
              {course ? (
                course.map((val) => (
                  <ul>
                    <li>- {val}</li>
                  </ul>
                ))
              ) : (
                <p></p>
              )}
            </b>
          </h4>
          <h4>
            {" "}
            Major: <b>{major}</b>
          </h4>
          <h4>
            {" "}
            Year: <b>{year}</b>
          </h4>
          <h4>
            {" "}
            Gender Preferences: <b>{genderPreference}</b>
          </h4>
          <h4> Bio: {bio}</h4>
          <Button
            type="submit"
            onClick={() =>
              navigate("/requestssent", { state: { userName: loggedInUser } })
            }
          >
            Go back to requests sent.
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ViewProfileRequestsSent;
