import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Account from "./Account"
import ProtectedRoutes from "./ProtectedRoutes";
const App = () => {
  return (
    // <div style={styles.app}>
    //   <Router>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/register" element={<Register />} />
    //       {/* <Route path="/profile" element={<Profile />} /> */}
    //     </Routes>
    //   </Router>
    // </div>
    <Container>
      <Row>
        <Col className="text-center">
          <h1>MATCH</h1>

          <section id="navigation">
            <a href="/">Home </a>
            <a href="/account">Account</a>
            {/* <a href="/profile">Profile</a> */}
            {/* <a href="/auth">Auth Component</a> */}
          </section>
        </Col>
      </Row>

      {/* create routes here */}
      {/* <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/free" component={FreeComponent} /> */}
        {/* <ProtectedRoutes path="/profile" component={Profile} />
      </Switch> */}

  <div style={styles.app}>
    <Router>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    {/* <ProtectedRoutes path="/profile" element={Profile} /> */}
    <Route path="/profile" element={<Profile />} />
    <Route path="/account" element={<Account />} />
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