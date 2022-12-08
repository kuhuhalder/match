import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./Home";
import Login from "./students/Login";
import Register from "./students/Register";
import RegisterAdmin from "./admin/Register";
import LoginAdmin from "./admin/Login";
import Profile from "./students/Profile";
import Account from "./students/Account";
import Match from "./students/Match";
import ForgotPass from "./students/ForgotPass";
import ViewRequests from "./students/ViewRequests"
import ViewAccount from "./admin/ViewAccount";
import ViewAllStudents from "./admin/ViewAllStudents"
import ViewAllMatches from "./admin/ViewAllMatches"
import UpdateProfile from "./admin/UpdateProfile"
import ViewProfileStudent from "./admin/ViewProfileStudent"
import ViewCourses from "./admin/ViewCourses";
import CreateStudent from "./admin/CreateStudent"
import ViewStudyBuddies from "./students/ViewStudyBuddies";
import CreateCourse from "./admin/CreateCourse";
import EditProfile from "./admin/EditProfile"
import ViewProfileRequests from "./students/ViewProfileRequests";
import ViewProfileStudyBuddies from "./students/ViewProfileStudyBuddies";
import ViewProfileMatches from "./students/ViewProfileMatches";
import AboutUs from "./AboutUs";
const App = () => {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>MATCH</h1>
          </Col>
      </Row>

  <div style={styles}>
    <Router>
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/home" element={<AboutUs />} />
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/register" element={<Register />} />
    <Route exact path="/profile" element={<Profile />} />
    <Route exact path="/account" element={<Account />} />
    <Route exact path="/matches" element={<Match/>} />
    <Route exact path="/forgotpass" element={<ForgotPass/>} />
    <Route exact path="/viewprofilematches" element={<ViewProfileMatches/>} />
    <Route exact path="/viewrequests" element={<ViewRequests/>} />
    <Route exact path="/viewstudybuddies" element={<ViewStudyBuddies/>} />
    <Route exact path="/viewprofilerequests" element={<ViewProfileRequests/>} />
    <Route exact path="/viewprofilestudybuddies" element={<ViewProfileStudyBuddies/>} />


    <Route exact path="/registeradmin" element={<RegisterAdmin />} />
    <Route exact path="/viewprofilestudent" element={<ViewProfileStudent />} />
    <Route exact path="/updateprofile" element={<UpdateProfile />} />
    <Route exact path="/editprofile" element={<EditProfile />} />

    <Route exact path="/loginadmin" element={<LoginAdmin />} />
    <Route exact path="/viewaccount" element={<ViewAccount/>} />
    <Route exact path="/viewallstudents" element={<ViewAllStudents/>} />
    <Route exact path="/viewallmatches" element={<ViewAllMatches/>} />
    <Route exact path="/viewcourses" element={<ViewCourses/>} />
    <Route exact path="/createaccount" element={<CreateStudent/>} />
    <Route exact path="/createcourse" element={<CreateCourse/>} />
    </Routes>
    </Router>
    </div>
    </Container>
  );
};

export default App;

const styles = {
  app: {
    padding: 50,
  },
};