import React, { useState } from "react";
import SideBar from './components/Sidebar';
import "./Account.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const Match = (props) => {
  const location = useLocation();
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState(location.state.firstName);
  const [lastName, setLastName] = useState(location.state.lastName);
  const [ids, setIds] = useState([]);

  const configuration = {
    method: "get",
    url: "http://localhost:8080/api/students/matches/" + location.state.userName,
  };
  console.log(configuration);
  axios(configuration)
    .then((result) => {
        setIds(result.data);
      })
    .catch((error) => {
      console.log(error)
      error = new Error();
    });

const handleViewProfile = (e) =>{
  navigate('/account', {state:{userName:e.userName}})
}


  return (
    <>
    <div id="Account">
      <SideBar />
      <div id="page-wrap">

        <h2>Welcome {firstName} {lastName}!</h2>
        
        <div className="Match">
          <table>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Year</th>
              <th>Major</th>
              <th>Pronouns</th>
            </tr>
            {ids.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.firstName}</td>
                  <td>{val.course}</td>
                  <td>{val.year}</td>
                  <td>{val.major}</td>
                  <td>{val.pronouns}</td>
                  <button onClick={()=>{handleViewProfile(val.userName)}}>View Profile </button>
                  {/* <button onClick={()=>{handleViewProfile(val.userName)}}>View Profile </button> */}
                </tr>
              )
            })}
          </table>
        </div>


      </div>
    </div>

    </>
  );
}
export default Match;
