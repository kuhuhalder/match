import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Dropdown from "../components/Dropdown";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

function EditProfile(props) {
  const location = useLocation();
  const navigate = useNavigate();
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
        isAdmin
      },
    };
    console.log(configuration);

    axios(configuration)
      .then((result) => {
        setRegister(true);
        navigate('/accountadmin', {state:{userName:userName}});
      })
      .catch((error) => {
        console.log(error);
        error = new Error();
      });
  };
  return (
    <>
      <h4>Edit {userName}!</h4>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            required
          />
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            required
          />

          {/* <Form.Label>Pronouns</Form.Label> */}
          {/* <Form.Control
            type="pronouns"
            name="pronouns"
            value={pronouns}
            onChange={(e) => setPronouns(e.target.value)}
            placeholder="Enter Pronouns"
          /> */}
           <Dropdown
            label="Pronouns"
            options={[
              { label: "Select", value: null },
              { label: "she/her/hers", value: "she/her/hers" },
              { label: "he/him/his", value: "he/him/his" },
              { label: "they/them", value: "they/them" },
            ]}
            value={pronouns}
            onChange={(e) => setPronouns(e.target.value)}
          />
          <br></br>
          <Dropdown
            label="Campus"
            options={[
              { label: "Select", value: null},
              { label: "Livingston", value: "Livingston" },
              { label: "College Avenue", value: "College Avenue" },
              { label: "Busch", value: "Busch" },
              { label: "Cook/Douglass", value: "Cook/Douglass" },
            ]}
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
          />
          {/* <CustomListDropDown></CustomListDropDown>
      <Courses></Courses> */}
          <br>
          </br>
          <Dropdown
            label="Course"
            options={[
              { label: "Select", value: "none"},
              {
                label: "Introduction to Computer Science",
                value: "Introduction to Computer Science",
              },
              { label: "Data Structures", value: "Data Structures" },
              {
                label: "Computer Architecture",
                value: "Computer Architecture",
              },
              {
                label: "Discrete Structures I",
                value: "Discrete Structures I",
              },
            ]}
            value={course}
            onChange={(e) => setCourses(course =>course.concat(e.target.value))}
          />

{/* <Form.Group className="mb-3" controlId="formInsuranceType">
                    <Form.Label>Insurance Type</Form.Label>
                    <Form.Select
                        onChange={handleInsuranceType}>
                        <option value=""> Select Insurance Type </option>
                        {
                            insuranceTypeList.map((val, key) => {
                                return (
                                    <option key={key}> {val} </option>
                                ) 
                            })
                        }
                    </Form.Select>
                    </Form.Group> */}
          <br></br>
          <Form.Label># Years in College</Form.Label>
          <Form.Control
            type="year"
            name="year"
            value={Number(year)}
            onChange={(e) => setYear(e.target.value)}
            placeholder="# Years in College"
          />
          <Form.Label>Major</Form.Label>
          <Form.Control
            type="major"
            name="major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder="Major"
          />
          {/* <Form.Label>Gender Preferences</Form.Label>
          <Form.Control
            type="genderPreference"
            name="genderPreference"
            value={genderPreference}
            onChange={(e) => setGenderPreference(e.target.value)}
            placeholder="Gender Preferences"
          /> */}
          <Dropdown
            label="Gender Preferences"
            options={[
              { label: "Select", value: null },
              { label: "Female", value: "Female" },
              { label: "Male", value: "Male" },
              { label: "Non-binary", value: "Non-binary" },
            ]}
            value={genderPreference}
            onChange={(e) => setGenderPreference(e.target.value)}
            />
            <br></br>

          <Form.Label>Bio</Form.Label>
          <Form.Control
            type="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter bio"
          />

          <Button
            variant="primary"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}
export default EditProfile;
