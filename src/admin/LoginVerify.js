import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
/**
 * LoginVerify component is to verify the code.
 * @param {*} props 
 * @returns React component
 */
export default function LoginVerify(props) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  if (message == "4312022") {
    navigate("/loginadmin");
  }

  return (
        <div>
          <label>Please enter the code to verify you are an admin</label>
          <input
            type="password"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
  );
}
