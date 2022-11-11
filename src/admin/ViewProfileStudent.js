import React, { useState } from "react";
import {Button} from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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

const deleteStudent =(e)=>{
//     <Popup trigger={<button> Trigger</button>} position="right center">
//     <div>Do you want to delete this student?</div>
//   </Popup>
const configuration = {
    method: "delete",
    url:
      "http://localhost:8080/api/students/delete/" + userName,
  };
  console.log(configuration);
  axios(configuration)
    .then((result) => {
      navigate("/viewallstudents")
    })
    .catch((error) => {
      console.log(error);
      error = new Error();
    });
}

const editProfile = (e) => {
  navigate("/profile", { state: { userName: e } });
};

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
            <Button
                      type="submit"
                      onClick={() => deleteStudent()}
                    >
                    Delete Student
                    </Button>

                    <Button
                      type="submit"
                      onClick={(e) => editProfile(userName)}
                    >
                    Edit Profile
                    </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewProfileStudent;
