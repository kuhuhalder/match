import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

//  Profile component is to enter or update criteria to match with other students.
//  It also updates user information.
function Profile(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState(state.userName);
  const [userName, setUserName] = useState(state.userName);
  const [isAdmin, setIsAdmin] = useState(0);
  const [firstName, setFirstName] = useState(state.firstName);
  const [lastName, setLastName] = useState(state.lastName);
  const [pronouns, setPronouns] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  const [campus, setCampus] = useState(null);
  const [course, setCourses] = useState([]);
  const [major, setMajor] = useState(null);
  const [bio, setBio] = useState(null);
  const [year, setYear] = useState(null);
  const [genderPreference, setGenderPreference] = useState(null);
  const [register, setRegister] = useState(false);
  const [courseIds, setCourseIds] = useState([]);
  const listItems = courseIds.map((number) => <li>{number.courseName}</li>);

  // handleSubmit function is to call the update API and update the critera and information of the logged in user.
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
        contactInfo,
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
        navigate("/account", { state: { userName: userName } });
      })
      .catch((error) => {
        console.log(error);
        error = new Error();
      });
  };
  //  Function to get all the courses to display in the courses dropdown
  const configuration = {
    method: "get",
    url: "http://localhost:8080/api/students/getAllCourses",
  };
  axios(configuration)
    .then(function (result) {
      setCourseIds(result.data);
    })
    .catch((error) => {
      console.log(error);
      error = new Error();
    });
  const removeCourseSelection = (i) => {
    const newCourse = [...course];
    newCourse.splice(i, 1);
    setCourses(newCourse);
  };

  return (
    <Container>
      <NavBar></NavBar>
      <h4>
        Welcome {firstName} {lastName}!
      </h4>
      <h5>
        Please fill out your preferences so that we can get your matches in!
      </h5>
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
            defaultValue={""}
            onChange={(e) => setPronouns(e.target.value)}
          >
            <option value=""> Select Your Pronouns </option>
            <option value="she/her/hers"> she/her/hers </option>
            <option value="he/him/his"> he/him/his </option>
            <option value="they/them"> they/them </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formContactInfo">
          <Form.Label> Contact Information </Form.Label>
          <p>
            {" "}
            Feel free to include your phone number or social media @. These will
            only be shared with your confirmed study buddies to connect.{" "}
          </p>
          <Form.Control
            type="contactInfo"
            name="contactInfo"
            defaultValue={""}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder="Enter contact information"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCampus">
          <Form.Label> Preferred Campus to Study/ Meet </Form.Label>
          <Form.Select
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
          <p>Courses is multi-select</p>
          <p>
            Previous Course Selections will be removed if you don't update
            courses and submit this form.
          </p>
          <Form.Select
            defaultValue={""}
            onChange={(e) =>
              setCourses((course) => course.concat(e.target.value))
            }
          >
            <option value=""> Select Courses </option>
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
          <p>Select your preferred genders (if any) for matching.</p>
          <Form.Select
            defaultValue={""}
            onChange={(e) => setGenderPreference(e.target.value)}
          >
            <option value=""> Select Gender Preferences </option>
            <option value="No Preferences">No Preferences</option>
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
    </Container>
  );
}
export default Profile;
