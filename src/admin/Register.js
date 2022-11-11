import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function RegisterAdmin(props) {
  const navigate = useNavigate();
  const [userName, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(1);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [register, setRegister] = useState(false);
  const [accExists, setAccExists] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "http://localhost:8080/api/students/add",
      data: {
        id,
        userName,
        password,
        isAdmin,
      },
    };
    console.log(configuration);
    axios(configuration)
      .then((result) => {
        
        setRegister(true);
        if (result.status == 400) {
          setAccExists(true);
        } else if (result.status == 200) {
          setRegister(true);
        }
      })
      .catch((error) => {
        error = new Error();
      });
  };

  if (register == true && userName.endsWith("@match.com")) {
    <p className="text-success">You Are Registered Successfully as Admin!</p>;
    navigate("/viewaccount", { state: { userName: userName } });
  } else if (!userName.endsWith("@match.com")) {
    <p className="text-danger">Please register with a @match.com email!</p>;
  } else {
    <p className="text-danger">
      Username already exists! Login instead
      <Button
        onClick={() => {
          navigate("/loginadmin");
        }}
      >
        Login
      </Button>
    </p>;
  }

//   if (setAccExists) {
//     return (
//       <p className="text-danger">
//         Username already exists! Login instead
//         <Button
//           onClick={() => {
//             navigate("./loginadmin");
//           }}
//         >
//           Login
//         </Button>
//       </p>
//     );
//   }

  return (
    <>
      <h2>Create an Account</h2>
      <Form onSubmit={(e) => handleRegister(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userName}
            onChange={(e) => {
              setEmail(e.target.value);
              setId(e.target.value);
            }}
            placeholder="Enter email"
          />
        </Form.Group>
        {!userName.endsWith("@match.com") ? (
          <p className="text-danger">Please register with a @match.com email</p>
        ) : (
          <p className="text-success">Email address is valid!</p>
        )}

        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        {/* <label> Account Type </label>
        <div>
          <input
            type="radio"
            name="role"
            value="student"
            id="student"
            onChange={(event) => {
              setIsAdmin(0);
            }}
          />
          <label for="student"> Student </label>
        </div>
        <div>
          <input
            type="radio"
            name="role"
            value="admin"
            id="admin"
            placeholder="Admin"
            onChange={(event) => {
              setIsAdmin(1);
            }}
          />
          <label for="admin"> Admin </label>
        </div> */}

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleRegister(e)}
        >
          Register
        </Button>

        {register ? (
          <div>
            <p className="text-success">
              You Are Registered Successfully. Login here:
            </p>

            {
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => {
                  navigate("/loginadmin");
                }}
              >
                Login
              </Button>
            }

          </div>
        ) : (
          <div>
            <p className="text-danger">
              Username already exists. Login instead
            </p>

            {
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => {
                  navigate("/loginadmin");
                }}
              >
                Login
              </Button>
            }
          </div>
        )}
      </Form>
    </>
  );
}
