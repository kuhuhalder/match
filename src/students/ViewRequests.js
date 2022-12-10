import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
// ViewRequests component is to view the match requests sent by other students
const ViewRequests = (props) => {
  const { state } = useLocation();
  const { width, height } = useWindowSize()
  const navigate = useNavigate();
  const [userName, setUserName] = useState(state.userName);
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

  // handleAcceptMatch function is to accept the match request sent by a student
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
  if(studyBuddies)
  {
    return(
      <div>
    <Confetti
      width={width}
      height={height}
    />
    <Alert>
          You have accepted the match.
        </Alert>
        <Link
          to="/viewrequests"
          state={{
            userName: userName,
          }}
        >
          Go back to requests.
        </Link>
    </div>
    );
  }
  // handleDenyMatch function is to deny the match request sent by a student
  const handleDenyMatch = (e) => {
    const configuration = {
      method: "delete",
      url:
        "http://localhost:8080/api/students/deleteMatch/" + e + "+" + userName,
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
    // setDeleteRequest(false);
    return (
      <div>
        <Alert>Match request deleted</Alert>
        {/* <ViewRequests></ViewRequests> */}

        <Button
          type="submit"
          onClick={() =>
            navigate("/viewrequests", { state: { userName: userName } })
          }
        >
          Go back to requests
        </Button>
      </div>
    );
  }

  return (  
    <Container>
      <NavBar></NavBar>
      <h2>View your Requests!</h2>
      <Table striped hover>
        <thead>
          <tr>
            <th>Username</th>
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
                        state: { userName: val, loggedInUser: userName },
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
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};
export default ViewRequests;
