import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const NavBar = (props) => {
    const{state} = useLocation();
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
    const [userName, setUserName] = useState(state.userName);
    const [password, setPassword] = useState(state.password);
  
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
  
    const handleMatch = (event) => {
      navigate("/matches", {
        state: {
          id: userName,
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          pronouns: pronouns,
          campus: campus,
          course: course,
          major: major,
          bio: bio,
          year: year,
          genderPreference: genderPreference,
        },
      });
    };

    
    const handleUpdate = (e) => {
        navigate("/profile", { state: { id: userName, userName: userName, firstName:firstName, lastName:lastName } });
      };
      const handleViewStudyBuddies = (e) => {
        navigate("/viewstudybuddies", { state: { id: userName, userName: userName } });
      };

      const handleRequests = (e) => {
        navigate("/viewrequests", { state: { id: userName, userName: userName } });
      };
    
      const logout = () => {
        setUserName("")
        setPassword("")
        navigate("/")
    }
return(
    <ul>
    <li><a href="/account">Account</a></li>
    <li><a href="/profile" onClick={(e) => handleUpdate(e)}>
      Update Profile
    </a></li>
    <li><a href="/viewstudybuddies" onClick={(e) => handleViewStudyBuddies(e)}>
      View Study Buddies
    </a></li>
    <li><a href="/matches" onClick={(e) => handleMatch(e)}>
      View Matches
    </a></li>
    <li><a href="/viewrequests" onClick={(e) => handleRequests(e)}>
      View Requests
    </a></li>
    <li><a href="/" onClick={(e) => logout(e)}>
      Logout
    </a></li>
    </ul>

)
    
    


};
export default NavBar;