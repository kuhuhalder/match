import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// ViewProfileStudent component allows the admin to view the profile information of a student.
const ViewProfileStudent = (props) => {
  const location = useLocation();
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
  const [userName, setUserName] = useState(location.state.loggedInUser);
  const [userName2, setUserName2] = useState(location.state.userName);
  const [loggedInUser, setLoggedInUser] = useState(location.state.loggedInUser);
  const [password, setPassword] = useState(location.state.password);
  const [del, setDelete] = useState(false);

  const configuration = {
    method: "get",
    url: "http://localhost:8080/api/students/getStudent/" + userName2,
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

  // deleteStudent function allows the admin to delete a student.
  const deleteStudent = (e) => {
    const configuration = {
      method: "delete",
      url: "http://localhost:8080/api/students/delete/" + userName2,
    };
    console.log(configuration);
    axios(configuration)
      .then((result) => {
        setDelete(true);

        navigate("/viewallstudents", { state: { userName: loggedInUser } });
      })
      .catch((error) => {
        console.log(error);
        error = new Error();
      });
  };

  // editProfile function allows the admin to edit the profile of a student.
  const editProfile = (e) => {
    navigate("/editprofile", {
      state: {
        userName: e,
        loggedInUser: loggedInUser,
        firstName: firstName,
        lastName: lastName,
      },
    });
  };

  return (
    <>
      <div id="ViewProfile">
        <div id="page-wrap">
          <div>
            <h4> Email address: {userName2}</h4>
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
            <b>
              {" "}
              Courses:
              {course.map((val) => (
                <ul>
                  <li>- {val}</li>
                </ul>
              ))}
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
            <Button type="submit" onClick={() => deleteStudent()}>
              Delete Student
            </Button>

            <Button type="submit" onClick={(e) => editProfile(userName2)}>
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewProfileStudent;
