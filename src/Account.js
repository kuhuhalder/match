import React from 'react';
import { useNavigate } from "react-router-dom";
import SideBar from './components/Sidebar';
import "./Account.css";
const Account = (props) => {
    const navigate = useNavigate();

  return (
    <>
    <div id="Account">
      <SideBar />
      <div id="page-wrap">
        <h1>Account</h1>
        <h2></h2>
      </div>
    </div>

    </>
  );
}
export default Account;
