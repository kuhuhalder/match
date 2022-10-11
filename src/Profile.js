import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
//import axios from "axios";
import Dropdown from "./components/Dropdown";
import CustomListDropDown from "./CustomDropdownList";
import Courses from "./Courses";
function Profile() 
{
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [campus, setCampus] = useState("");
  const [className, setClassName] = useState("");
  const [register, setRegister] = useState(false);

  const handleCampus= (event) => {
    setCampus(event.target.value);
  };
  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // // set configurations
    // const configuration = {
    //   method: "post",
    //   url: "http://localhost:8080/api/students",
    //   data: {
    //     firstName,
    //     password,
    //   },
    // };

    // // make the API call
    // axios(configuration)
    //   .then((result) => {
    //     setRegister(true);
    //   })
    //   .catch((error) => {
    //     error = new Error();
    //   });
  };
  return (
    <>
      <h2>Your Profile</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* first name*/}
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter name"
          />
        </Form.Group>

        {/* password */}
        {/* <Form.Group controlId="formBasicPassword"> */}
          {/* <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group> */}
        <Dropdown
        label="Campus"
        options={[
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
      <br></br>
        {/* submit button */}
        
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </Button>
        </Form>
    </>
    
  );
}
export default Profile;