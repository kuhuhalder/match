import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Dropdown from "./components/Dropdown";
import CustomListDropDown from "./CustomDropdownList";
import Courses from "./Courses";
import Cookies from "universal-cookie";
import Account from "./Account";
import ReactDOM from "react-dom/client";

const cookies = new Cookies();

function Profile(props) 
{
  const [id, setId] = useState(props.userName);
  const [userName, setUserName] = useState(props.userName);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [pronouns, setPronouns] = useState(null);
  const [campus, setCampus] = useState(null);
  const [className, setClassName] = useState(null);
  const [major, setMajor] = useState(null);
  const [bio, setBio] = useState(null);
  const [year, setYear] = useState(null);
  const [genderPreference, setGenderPreference] = useState(null);
  const [register, setRegister] = useState(false);

  const handleCampus= (event) => {
    setCampus(event.target.value);
  };
  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
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
        major,
        bio,
        year,
        genderPreference
      }
    };
    console.log(configuration);

    // make the API call
    
    axios(configuration)
      .then((result) => {
        setRegister(true);
        const element = <Account userName = {userName} root = {props.root}/>;
        props.root.render(element);
        })
      .catch((error) => {
        console.log(error)
        error = new Error();
      });
    
  };
  return (
    <>
      <h4>Welcome {userName}!</h4>
      <div>Please fill out this form so that we can get your matches in!</div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* first name*/}
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
            <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />

          <Form.Label>Pronouns</Form.Label>
          <Form.Control
            type="pronouns"
            name="pronouns"
            value={pronouns}
            onChange={(e) => setPronouns(e.target.value)}
            placeholder="Enter Pronouns"
          />

<Dropdown
        label="Campus"
        options={[
          {label: 'Select', value:null},
          { label: 'Livingston', value: 'Livi' },
          { label: 'College Avenue', value: 'CA' },
          { label: 'Busch', value: 'B' },
          { label: 'Cook/Douglass', value: 'C/D' },
        ]}
        value={campus}
        onChange={handleCampus}
      />
      <CustomListDropDown></CustomListDropDown>
      <Courses></Courses>
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
                  <Form.Label>Gender Preferences</Form.Label>
          <Form.Control
            type="genderPreference"
            name="genderPreference"
            value={genderPreference}
            onChange={(e) => setGenderPreference(e.target.value)}
            placeholder="Gender Preferences"
          />

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
export default Profile;