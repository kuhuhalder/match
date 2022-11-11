import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const ViewAllStudents = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ids, setIds] = useState([]);
  const handleViewProfile = (e) => {
    navigate("/viewprofilestudent", { state: { userName: e } });
  };
  const configuration = {
    method: "get",
    url:
      "http://localhost:8080/api/students/getAll/",
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
  
  return (
    <>
      <div className="ViewAllStudents">
        <div id="page-wrap">
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
                    <Button
                      type="submit"
                      onClick={() => handleViewProfile(val.userName)}
                    >
                      View Profile
                    </Button>

                    {/* <Button
                      type="submit"
                      onClick={() => handleViewProfile(val.userName)}
                    >
                      Edit Profile
                    </Button> */}

                
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
export default ViewAllStudents;
