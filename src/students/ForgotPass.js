import { Navigate, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const ForgotPass = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState(location.state.userName);
  const [userName, setUserName] = useState(location.state.userName);
  const [password, setPassword] =useState("");
  const [passwordReset, setPasswordReset] = useState(false)

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

  axios(configuration)
    .then(function(result) {
      setPasswordReset(true)
    })
    .catch((error) => {
      console.log(error);
      error = new Error();
    });
};

if(passwordReset){
  return(
    <div>
      
    </div>
  )
}
  return (
    <div>
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
    </div>
  );

}
export default ForgotPass;