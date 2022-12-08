import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import NavBarAdmin from "../components/NavBarAdmin";
// EditProfile is to edit any student's information/ criteria for matching
function EditProfile(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(location.state.loggedInUser);
  const [id, setId] = useState(location.state.userName);
  const [userName, setUserName] = useState(location.state.userName);
  const [isAdmin, setIsAdmin] = useState(0);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [pronouns, setPronouns] = useState(null);
  const [campus, setCampus] = useState(null);
  const [course, setCourses] = useState([]);
  const [major, setMajor] = useState(null);
  const [bio, setBio] = useState(null);
  const [year, setYear] = useState(null);
  const [genderPreference, setGenderPreference] = useState(null);
  const [register, setRegister] = useState(false);
  const [courseIds, setCourseIds] = useState([]);
  const configuration = {
    method: "get",
    url: "http://localhost:8080/api/students/getAllCourses",
  };
  axios(configuration)
    .then(function (result) {
      setCourseIds(result.data);
      console.log(courseIds);
    })
    .catch((error) => {
      console.log(error);
      error = new Error();
    });
  // handleSubmit function is to call the update API to update a student's information
  const handleSubmit = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "http://localhost:8080/api/students/update",
      data: {
        id,
        userName,
        firstName,
        lastName,
        pronouns,
        campus,
        course,
        major,
        bio,
        year,
        genderPreference,
        isAdmin,
      },
    };
    console.log(configuration);

    axios(configuration)
      .then((result) => {
        setRegister(true);
        navigate("/viewallstudents", { state: { userName: loggedInUser } });
      })
      .catch((error) => {
        console.log(error);
        error = new Error();
      });
  };
  // removeCourseSelection is to remove any selected course.
  const removeCourseSelection = (i) => {
    const newCourse = [course];
    newCourse.splice(i, 1);
    setCourses(newCourse);
  };
  return (
    <div>
      <NavBarAdmin></NavBarAdmin>
      <h4>Edit {userName}!</h4>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label required>First Name</Form.Label>
          <Form.Control
            type="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter or change first name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter or change last name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPronouns">
          <Form.Label> Pronouns </Form.Label>
          <Form.Select
            required
            defaultValue={""}
            onChange={(e) => setPronouns(e.target.value)}
          >
            <option value=""> Select Your Pronouns </option>
            <option value="she/her/hers"> she/her/hers </option>
            <option value="he/him/his"> he/him/his </option>
            <option value="they/them"> they/them </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCampus">
          <Form.Label> Campus </Form.Label>
          <Form.Select
            required
            defaultValue={""}
            onChange={(e) => setCampus(e.target.value)}
          >
            <option value=""> Select Campus </option>
            <option value="Livingston"> Livingston </option>
            <option value="College Avenue"> College Avenue </option>
            <option value="Busch"> Busch </option>
            <option value="Cook/Douglass"> Cook/Douglass </option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCourseName">
          <Form.Label>Courses You Want Matches for</Form.Label>
          <Form.Select
            onChange={(e) =>
              setCourses((course) => course.concat(e.target.value))
            }
          >
            <option value=""> Select Course </option>
            {courseIds.map((val, key) => {
              return <option key={val.courseName}> {val.courseName} </option>;
            })}
          </Form.Select>
        </Form.Group>

        <Table striped hover>
          <thead>
            <tr>
              <th>Courses Selected</th>
            </tr>
          </thead>
          <tbody>
            {course.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val}</td>
                  <td>
                    <Button onClick={(e) => removeCourseSelection(key)}>
                      Remove selection
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Form.Group className="mb-3" controlId="formYearsinCollege">
          <Form.Label>Year</Form.Label>
          <Form.Select
            required
            defaultValue={""}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value=""> Select Year </option>
            <option value="Freshman"> Freshman </option>
            <option value="Sophomore"> Sophomore </option>
            <option value="Junior"> Junior </option>
            <option value="Senior"> Senior </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMajor">
          <Form.Label>Major</Form.Label>
          <Form.Control
            type="major"
            name="major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder="Major"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGenderPreferences">
          <Form.Label> Gender Preferences </Form.Label>
          <Form.Select
            required
            defaultValue={""}
            onChange={(e) => setGenderPreference(e.target.value)}
          >
            <option value=""> Select Gender Preferences </option>
            <option value="Female">Female </option>
            <option value="Male"> Male </option>
            <option value="Non-binary">Non-binary </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            type="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter bio"
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default EditProfile;
