import React, { useState } from "react";
import SideBar from './components/Sidebar';
import { Form, Button } from "react-bootstrap";
import "./Account.css";
import axios from "axios";
import Match from "./Match";
import Profile from "./Profile"
const Account = (props) => {

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  //added by SJ
  const [pronouns, setPronouns] = useState("");
  const [campus, setCampus] = useState("");
  const [course, setCourse] = useState("");
  const [className, setClassName] = useState("");
  const [major, setMajor] = useState("");
  const [bio, setBio] = useState("");
  const [year, setYear] = useState(0);
  const [genderPreference, setGenderPreference] = useState(null);

  const configuration = {
    method: "get",
    url: "http://localhost:8080/api/students/getStudent/" + props.userName,
  };
  console.log(configuration);

  // make the API call
  
  axios(configuration)
    .then((result) => {
        setFirstName(result.data.firstName);
        setLastName(result.data.lastName);

        //added by SJ
        setPronouns(result.data.pronouns);
        setCampus(result.data.campus);
        setClassName(result.data.className);
        setMajor(result.data.major);
        setBio(result.data.bio);
        setYear(result.data.year);
        setGenderPreference(result.data.genderPreference);

      })
    .catch((error) => {
      console.log(error)
      error = new Error();
    });

    const handleMatch= (event) => {
      const element = <Match userName = {props.userName} firstName = {firstName} lastName = {lastName} pronouns = {pronouns} campus = {campus} className = {className} 
      major = {major} bio = {bio} year = {year} genderPreference = {genderPreference} root = {props.root}/>;

      props.root.render(element);
    };

    const handleUpdate = (e) => {
      const element = <Profile userName = {props.userName} root = {props.root}/>;
      props.root.render(element);
    }

  return (
    <>
    <div id="Account">
      <SideBar />
      <div id="page-wrap">
        <h1>Account</h1>

        <section id="navigation">
            <a href="/">Home </a>
            <a href="/account">Account</a>
            <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleUpdate(e)}
        >
          Update Profile
        </Button>
          </section>


        <h2>Welcome {firstName} {lastName}!</h2>

        <div>Click here to see students who are a great match for you -> 

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleMatch(e)}
        >
          Go match!
        </Button>
        </div>

        <div> Your information
          <h4> First Name:  {firstName}</h4>
          <h4> Last Name:  {lastName}</h4>
          <h4> Pronouns:  {pronouns}</h4>
          <h4> Campus:  {campus}</h4>
          <h4> Courses:  {course}</h4>
          <h4> Major:  {major}</h4>
          <h4> Bio:  {bio}</h4>
          <h4> Year: {year}</h4>
          <h4> Gender Preference:  {genderPreference}</h4>

        </div>
    
      </div>
    </div>

    </>
  );
}
export default Account;
