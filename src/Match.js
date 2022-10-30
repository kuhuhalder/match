import React, { useState } from "react";
import SideBar from './components/Sidebar';
import "./Account.css";
import axios from "axios";
const Match = (props) => {

  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [ids, setIds] = useState([]);

  const configuration = {
    method: "get",
    url: "http://localhost:8080/api/students/matches/" + props.userName,
  };
  console.log(configuration);

  // make the API call
  
  axios(configuration)
    .then((result) => {
        setIds(result.data);
      })
    .catch((error) => {
      console.log(error)
      error = new Error();
    });


  return (
    <>
    <div id="Account">
      <SideBar />
      <div id="page-wrap">
        <h1>Account</h1>
        <h2>Welcome {firstName} {lastName}!</h2>
        
        <div className="Match">
          <table>
            <tr>
              <th>Name</th>
              <th>Year</th>
              <th>Pronouns</th>
            </tr>
            {ids.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.firstName}</td>
                  <td>{val.year}</td>
                  <td>{val.pronouns}</td>
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
