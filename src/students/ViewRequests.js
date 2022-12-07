import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
const ViewRequests = (props) => {
  const { state } = useLocation();
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
    setDeleteRequest(false);
    return (
      <div>
        <Alert>Match request deleted</Alert>
        {/* <Link
          to="/viewrequests"
          state={{
            userName: userName,
          }}
        >
          Go back to requests
        </Link>
        <ViewRequests></ViewRequests> */}

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
      <h2>View your Requests</h2>
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
