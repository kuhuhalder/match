import { fireEvent, render, screen } from "@testing-library/react";

import App from "./App";

//a test suite has been created to test the test cases
describe("button click events on home page", () => {
  //a button that opens up the "learn about us" tab
  test("learn about us", () => {
    render(<App />);
    screen.findByRole("button", { name: "Learn about us" });
    expect(screen.getByText(/MATCH/i)).toBeInTheDocument();
  });

  //successfully confirms that the student register button opens up
  test("student register", () => {
    render(<App />);
    screen.findByRole("button", { name: "Student Register" });
  });

  //successfully confirms that the student login button opens up
  test("student login", () => {
    render(<App />);
    screen.findByRole("button", { name: "Student Login" });
  });

  //successfully confirms that the admin register button opens up
  test("admin register", () => {
    render(<App />);
    screen.findByRole("button", { name: "Admin Register" });
  });

  //successfully confirms that the admin login button opens up
  test("admin login", () => {
    render(<App />);
    screen.findByRole("button", { name: "Admin Login" });
  });

  //confirms that the tabs within the document are correct
  test("student text", () => {
    render(<App />);
    expect(screen.getByText(/Students/i)).toBeInTheDocument();
  });

  //confirms that the tabs within the document are correct
  test("admin text", () => {
    render(<App />);
    expect(screen.getByText(/Admins/i)).toBeInTheDocument();
  });

  //a button that opens up the "learn about us" tab
  test("learn about us", () => {
    render(<App />);
    screen.findByRole("button", { name: "Learn about us" });
    expect(screen.getByText(/MATCH/i)).toBeInTheDocument();
  });

  //confirms that the tabs within the document are correct
  test("match text", () => {
    render(<App />);
    expect(screen.getByText(/MATCH/i)).toBeInTheDocument();
  });
});

//fire click flow of buttons from home page till the end
test("student register button to create an account", () => {
  render(<App />);
  const buttonLog = screen.getByText("Student Register");
  fireEvent.click(buttonLog);
  expect(screen.getByText(/MATCH/i)).toBeInTheDocument();
});

test("create an account --> student profile page", () => {
  render(<App />);
  const buttonLog = screen.getByText("Register");
  fireEvent.click(buttonLog);
  expect(screen.getByText(/MATCH/i)).toBeInTheDocument();
});

test("student profile--> account", () => {
  render(<App />);
  const buttonLog = screen.getByText("MATCH");
  fireEvent.click(buttonLog);
  expect(screen.getByText(/MATCH/i)).toBeInTheDocument();
});

test("account --> matches", () => {
  render(<App />);
  const buttonLog = screen.getByText("MATCH");
  fireEvent.click(buttonLog);
  expect(screen.getByText(/MATCH/i)).toBeInTheDocument();
});
