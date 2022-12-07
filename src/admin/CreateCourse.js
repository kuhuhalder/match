import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function CreateCourse(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [courseName, setCourseName] = useState("");
  const [id, setId] = useState("");
  const [addCourse, setAddCourse] = useState(false);

  const handleAddCourse = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "http://localhost:8080/api/students/addCourse",
      data: {
        id,
        courseName,
      },
    };
    console.log(configuration);
    axios(configuration)
      .then((result) => {
        setAddCourse(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };

  if(addCourse){
    return(
      <div>
        <p className="text-success">
          Course Added!
        </p>
    <Link
            to="/viewaccount"
            state={{userName:state.userName}}
          >
            Go back to account
          </Link>
      </div>
    )
  }

  return (
    <>
      <h2>Create a Course</h2>
      <Form onSubmit={(e) => handleAddCourse(e)}>
        <Form.Label>Course Id</Form.Label>
        <Form.Control
          type="courseId"
          name="courseId"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter course id"
        />
        <Form.Label>Course Name</Form.Label>
        <Form.Control
          type="courseName"
          name="courseName"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Enter course name"
        />

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleAddCourse(e)}
        >
          Create Course
        </Button>

        {addCourse ? (
          <div>
            <p className="text-success">Course Added!</p>

            <Button
              onClick={navigate("/viewaccount", {
                state: { userName: state.userName },
              })}
            >
              Go back to account
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-danger">Course not added successfully</p>
          </div>
        )}
      </Form>
    </>
  );
}
