import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function Profile(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState(state.userName);
  const [userName, setUserName] = useState(state.userName);
  const [isAdmin, setIsAdmin] = useState(0);
  const [firstName, setFirstName] = useState(state.firstName);
  const [lastName, setLastName] = useState(state.lastName);
  const [pronouns, setPronouns] = useState(null);
  const [campus, setCampus] = useState(null);
  const [course, setCourses] = useState([]);
  const [major, setMajor] = useState(null);
  const [bio, setBio] = useState(null);
  const [year, setYear] = useState(null);
  const [genderPreference, setGenderPreference] = useState(null);
  const [register, setRegister] = useState(false);
  const [courseIds, setCourseIds] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "http://localhost:8080/api/students/update",
      data: {
        id,
        userName,
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
        navigate("/account", { state: { userName: userName } });
      })
      .catch((error) => {
        console.log(error);
        error = new Error();
      });
  };

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

  return (
    <>
      <Container>
        <h4>
          Welcome {firstName} {lastName}!
        </h4>
        <div>
          Please fill out your preferences so that we can get your matches in!
        </div>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formPronouns}">
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
          <Form.Group className="mb-3" controlId="formCampus}">
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
          <Form.Group className="mb-3" controlId="formYearsinCollege">
            <Form.Label># Years in College</Form.Label>
            <Form.Control
              type="year"
              name="year"
              value={Number(year)}
              onChange={(e) => setYear(e.target.value)}
              placeholder="# Years in College"
            />
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
      </Container>
    </>
  );
}
export default Profile;
