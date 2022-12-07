import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";

import App from "./App";

test("sample", () => {
  render(<App />);
  const button = screen.getAllByText(/Login/i);
});

test("student register page", () => {
  render(<App />);

  const buttonLog = screen.getByText("Student Register");
  fireEvent.click(buttonLog);
  expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
});

test("student login page", () => {
  render(<App />);

  const buttonLog = screen.getByText("Login");
  fireEvent.click(buttonLog);
  expect(screen.getByText(/Email Address/i)).toBeInTheDocument();
});

test("home --> student register page", () => {
  render(<App />);

  const buttonLog = screen.getByText("Student Register");
  fireEvent.click(buttonLog);
  expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
});

test("register --> student profile page", () => {
  render(<App />);

  const buttonLog = screen.getByText("Register");
  fireEvent.click(buttonLog);
  expect(screen.getByText(/Create/i)).toBeInTheDocument();
});

test("profile --> home page profile", () => {
  render(<App />);

  const buttonLog = screen.getByText("Submit");
  fireEvent.click(buttonLog);
  expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
});

test("home page profile --> edit profile", () => {
  render(<App />);

  const buttonLog = screen.getByText("Edit Profile");
  fireEvent.click(buttonLog);
  expect(
    screen.getByText(
      /Please fill out this form so that we can get your matches in!/i
    )
  ).toBeInTheDocument();
});

test("edit profile --> account home", () => {
  render(<App />);

  const buttonLog = screen.getByText("Submit");
  fireEvent.click(buttonLog);
  expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
});

test("account home --> view study buddies", () => {
  render(<App />);

  const buttonLog = screen.getByText("View Study Buddies");
  fireEvent.click(buttonLog);
  expect(screen.getByText(/View your Study Buddies!/i)).toBeInTheDocument();
});

test("view study buddies --> view requests", () => {
  render(<App />);

  const buttonLog = screen.getByText("View Requests");
  fireEvent.click(buttonLog);
  expect(screen.getByText(/View your Requests/i)).toBeInTheDocument();
});

test("view requests --> view matches", () => {
  render(<App />);

  const buttonLog = screen.getByText("View Matches");
  fireEvent.click(buttonLog);
  expect(screen.getByText(/Welcome !/i)).toBeInTheDocument();
});

test("view matches --> view profile", () => {
  render(<App />);

  const buttonLog = screen.getByText("View Matches");
  fireEvent.click(buttonLog);
  expect(screen.getByText(/View Profile/i)).toBeInTheDocument();
});
