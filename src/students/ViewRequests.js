import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Form, Button, Table } from "react-bootstrap";
import axios from "axios";
const ViewRequests = (props) => {
  const location = useLocation();
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
  const [userName, setUserName] = useState(location.state.userName);

  const [password, setPassword] = useState(location.state.password);
  const [ids, setIds] = useState([]);
  const [studyBuddies, setStudyBuddies]=useState(false)

  const configuration = {
    method: "get",
    url: "http://localhost:8080/api/students/findRequests/" + userName,
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

    const handleAcceptMatch=(e)=>{
      <div>You have requested to match with this student: {e}</div>
      const configuration = {
        method: "post",
        url: "http://localhost:8080/api/students/matchAdd",
        data: {
          id:userName+"+"+e,
          userOneId:userName,
          userTwoId:e
        },
      };
      console.log(configuration);
      axios(configuration)
        .then((result) => {
          setStudyBuddies(true);
        })
        .catch((error) => {
          error = new Error();
        });
    }


  return (
    <>
      <div className="Match">
        <div id="page-wrap">
          <NavBar></NavBar>
          <h2>View your Requests</h2>
      <Table striped hover>
            <thead>
            <tr>
              <th>Username</th>
              {/* <th>Name</th>
                <th>Course</th>
                <th>Year</th>
                <th>Major</th>
                <th>Pronouns</th>
                <th>View Profile</th> */}
            </tr>
            </thead>
            <tbody>
            {ids.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val}</td>
                  <Button type="submit" onClick={() =>     navigate("/viewprofilerequests", { state: { userName: val} })
}>Accept</Button>

                  <Button type="submit" onClick={() => handleAcceptMatch(val)}>Accept</Button>

                  <Button type="submit">Deny </Button>

                  {/* <button onClick={()=>{handleViewProfile(val.userName)}}>View Profile </button> */}
                </tr>
              );
            })}
            </tbody>
          {/* </table> */}
          </Table>
        </div>
      </div>
    </>
  );
};
export default ViewRequests;
