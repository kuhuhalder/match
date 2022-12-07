import React, { useState } from "react";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Form, Button, Table, Container, Alert } from "react-bootstrap";
import axios from "axios";
const ViewRequests = (props) => {
  const { state } = useLocation();
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
  const [ids, setIds] = useState([]);
  const [studyBuddies, setStudyBuddies] = useState(false);
  const [deleteRequest, setDeleteRequest] = useState(false);

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

  const handleAcceptMatch = (e) => {
    const configuration = {
      method: "post",
      url: "http://localhost:8080/api/students/matchAdd",
      data: {
        id: userName + "+" + e,
        userOneId: userName,
        userTwoId: e,
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
  };

  const handleDenyMatch = (e) => {
    const configuration = {
      method: "delete",
      url: "http://localhost:8080/api/students/deleteMatch/" + e,
    };
    console.log(configuration);
    axios(configuration)
      .then((result) => {
        setDeleteRequest(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };

  if (deleteRequest) {
    return (
      <div>
        <Alert>Matched deleted</Alert>
        <Link
          to="/viewrequests"
          state={{
            userName: userName,
          }}
        >
          Go back to requests
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* <div className="Match">
        <div id="page-wrap"> */}
      <Container>
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
                  <td>
                  <Button
                    type="submit"
                    onClick={() =>
                      navigate("/viewprofilerequests", {
                        state: { userName: val, loggedInUser:userName },
                      })
                    }
                  >
                    View Profile
                  </Button>

                  <Button type="submit" onClick={() => handleAcceptMatch(val)}>
                    Accept
                  </Button>

                  <Button type="submit" onClick={() => handleDenyMatch(val)}>
                    Deny
                  </Button>
                  </td>

                  {/* <button onClick={()=>{handleViewProfile(val.userName)}}>View Profile </button> */}
                </tr>
              );
            })}
          </tbody>
          {/* </table> */}
        </Table>
        {/* </div>
      </div> */}
      </Container>
    </>
  );
};
export default ViewRequests;
