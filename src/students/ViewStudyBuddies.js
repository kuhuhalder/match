import axios from "axios";
import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
/**
 * ViewStudyBuddies component is to view the list of confirmed matches/ study buddies for the current logged in user.
 * @param {*} props
 * @returns React component
 */
const ViewStudyBuddies = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(location.state.firstName);
  const [lastName, setLastName] = useState(location.state.lastName);
  const [usernames, setUsernames] = useState([]);

  const configuration = {
    method: "get",
    url:
      "http://localhost:8080/api/students/findConfirmedMatches/" +
      location.state.userName,
  };
  console.log(configuration);

  axios(configuration)
    .then((result) => {
      setUsernames(result.data);
    })
    .catch((error) => {
      console.log(error);
      error = new Error();
    });
  // handleViewProfile function to redirect the user to view the profile of the student who sent the request
  const handleViewProfile = (e) => {
    navigate("/viewprofilestudybuddies", {
      state: { userName: e, loggedInUser: location.state.userName },
    });
  };

  return (
    <Container>
      <NavBar></NavBar>
      <h2>View your Study Buddies!</h2>
      <h5>
        {" "}
        You view the contact information/ email addresses of your study buddies
        in their profiles.
      </h5>
      <Table striped hover>
        <thead>
          <tr>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {usernames.map((val, key) => {
            return (
              <tr key={key}>
                <td>
                  {val.firstName} {val.lastName} and you are study buddies. Chat
                  with them!
                </td>
                <td>
                  <Button
                    type="submit"
                    onClick={() => handleViewProfile(val.userName)}
                  >
                    View their Profile
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
export default ViewStudyBuddies;
