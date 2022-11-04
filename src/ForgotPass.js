import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Login from "./Login";

const ForgotPass = (props) => {
  // const navigate = useNavigate();
  const [id, setId] = useState(props.userName);
  const [userName, setUserName] = useState(props.userName);
  const [password, setPassword] =useState("");

//   const handleResetPassword = (e) => {
//     Axios.post("http://localhost:8080/api/students/update", {
//     userName: userName,
//     password: password,    
//     })
//     .then(function (response) {
//       const element = <Login userName={userName} root={props.root} />;
//       props.root.render(element);
//     })
// };

const handleResetPassword = (e) => {
  // prevent the form from refreshing the whole page
  e.preventDefault();

  // set configurations
  const configuration = {
    method: "post",
    url: "http://localhost:8080/api/students/update",
    data: {
      id,
      userName,
      password,
    },
  };
  console.log(configuration);

  // make the API call

  axios(configuration)
    .then((result) => {
      // const element = <Login userName={userName} root={props.root} />;
      // props.root.render(element);
    })
    .catch((error) => {
      console.log(error);
      error = new Error();
    });
};
  return (
    <>
      <h2>Forgot Password</h2>
      <label> Enter new password </label>
        <input 
            type="password" 
            placeholder='Enter password'
            onChange={(event) => {
                setPassword(event.target.value);
            }}
        />

    <button onClick={handleResetPassword}>Reset Password </button>


    </>
  );
}
export default ForgotPass;