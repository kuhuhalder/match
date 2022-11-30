import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const ViewAllStudents = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ids, setIds] = useState([]);
  const [del, setDelete] = useState(false);

  const handleViewProfile = (e) => {
    navigate("/viewprofilestudent", { state: { userName: e } });
  };

  const deleteStudent =(e)=>{
    //     <Popup trigger={<button> Trigger</button>} position="right center">
    //     <div>Do you want to delete this student?</div>
    //   </Popup>
    
    const configuration = {
        method: "delete",
        url:
          "http://localhost:8080/api/students/delete/" + e,
      };
      console.log(configuration);
      axios(configuration)
        .then((result) => {
          setDelete(true)
          navigate("/viewallstudents")
    
    /*       navigate("/viewallstudents")
     */    })
        .catch((error) => {
          console.log(error);
          error = new Error();
        });
    }
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
          {/* <table> */}
          <Table striped bordered hover>
          <thead>
            <tr>
            <th>Username</th>
              <th>Name</th>
              <th>Course</th>
              <th>Year</th>
              <th>Major</th>
              <th>Pronouns</th>
            </tr>
            </thead>
            <tbody>
            {ids.map((val, key) => {

                return (
                  <tr key={key}>
                     <td>{val.userName}</td>
                    <td>{val.firstName}</td>
                    <td>{val.course}</td>
                    <td>{val.year}</td>
                    <td>{val.major}</td>
                    <td>{val.pronouns}</td>
                    <td>
                    <Button
                      type="submit"
                      onClick={() => handleViewProfile(val.userName)}
                    >
                      View Profile
                    </Button>
                    </td>
                    {/* <td>
                    <Button
                      type="submit"
                      onClick={() => deleteStudent(val.userName)}
                    >
                    Delete Student
                    </Button>
                    </td> */}


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
              
          {/* </table> */}
          </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default ViewAllStudents;
