import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Account from "./Account";
import Match from "./Match";
import ProtectedRoutes from "./ProtectedRoutes";
const App = () => {
  return (

    <Container>
      <Row>
        <Col className="text-center">
          <h1>MATCH</h1>
          </Col>
      </Row>

  <div style={styles.app}>
    <Router>
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/register" element={<Register />} />
    <Route exact path="/profile" element={<Profile />} />
    <Route exact path="/account" element={<Account />} />
    <Route exact path="/matches" element={<Match/>} />
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