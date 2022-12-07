import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const ViewAllMatches = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const [userName, setUserName] = useState(location.state.userName);
  const [delete1, setDeleteOne] = useState(false);
  const [deleteBoth, setDeleteBoth] = useState(false);

  const [ids, setIds] = useState([]);

  const configuration = {
    method: "get",
    url: "http://localhost:8080/api/students/getAllConfirmedMatches",
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

  const deleteStudyBuddy = (userName1, userName2) => {
    const configuration1 = {
      method: "delete",
      url:
        "http://localhost:8080/api/students/deleteMatch/" +
        userName1 +
        "+" +
        userName2,
    };
    console.log(configuration1);
    axios(configuration1)
      .then((result) => {
        setDeleteOne(true);
      })
      .catch((error) => {
        console.log(error);
        error = new Error();
      });

    const configuration2 = {
      method: "delete",
      url:
        "http://localhost:8080/api/students/deleteMatch/" +
        userName2 +
        "+" +
        userName1,
    };
    console.log(configuration2);
    axios(configuration2)
      .then((result) => {
        setDeleteBoth(true);
      })
      .catch((error) => {
        console.log(error);
        error = new Error();
      });
  };
  // const logout = () => {
  //   setUserName("");
  //   setPassword("");
  //   navigate("/");
  // };
  return (
    <>
      <div className="Match">
        <div id="page-wrap">
          <ul>
            <li>
              <a href="/viewaccount">Account</a>
            </li>
            <li>
              <a href="/viewallstudents">View All Students</a>
            </li>
            <li>
              <a href="/viewallmatches">View All Study Buddies</a>
            </li>
            {/* <li>
              <a href="/" onClick={(e) => logout(e)}>
                Logout
              </a>
            </li> */}
          </ul>
          <h2> View All Study Buddies</h2>
          <Table>
            <thead>
              <tr>
                <th>Username 1</th>
                <th>Username 2</th>
              </tr>
            </thead>
            <tbody>
              {ids.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.userOneId}</td>
                    <td>{val.userTwoId}</td>
                    <td>
                      <Button
                        type="submit"
                        onClick={() =>
                          deleteStudyBuddy(val.userOneId, val.userTwoId)
                        }
                      >
                        Delete Study Buddy Match
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default ViewAllMatches;
