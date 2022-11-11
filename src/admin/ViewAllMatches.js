import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const ViewAllMatches = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(location.state.userName);
  const [password, setPassword] = useState(location.state.password);

  const [ids, setIds] = useState([]);

  const configuration = {
    method: "get",
    url:
      "http://localhost:8080/api/students/matches/" + location.state.userName,
  };
  console.log(configuration);
  axios(configuration)
    .then((result) => {
      setIds(result.data);
    })
    .catch((error) => {
      console.log(error);
      error = new Error();
    });

  const logout = () => {
    setUserName("")
    setPassword("")
    navigate("/")
}
  return (
    <>
      <div className="Match">
        <div id="page-wrap">
        <ul>
        <li>
          <a href="/viewaccount">Account</a>
        </li>
        <li>
          <a href="/viewallstudents">
            View All Students
          </a>
        </li>
        <li>
          <a href="/viewallmatches">
            View All Matches
          </a>
        </li>
        <li>
          <a href="/" onClick={(e) => logout(e)}>
            Logout
          </a>
        </li>
      </ul>
          <h2> View All Students</h2>
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
                   
  
                    {/* <button onClick={()=>{handleViewProfile(val.userName)}}>View Profile </button> */}
                  </tr>
                );
              })
              }
              
          </table>
        </div>
      </div>
    </>
  );
};
export default ViewAllMatches;
