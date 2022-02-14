import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogIn from "../components/Users/LogIn";

describe("LogIn", () => {

  test("renders Log In form by default", () => {
    render(<LogIn />);
    expect(screen.getByRole("heading")).toHaveTextContent(/Log into your account/i);
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/Log In/i);
  });

  test("allows user to toggle between 'Log In' and 'Sign Up' forms", () => {
    render(<LogIn />);
    // loads log in by default
    expect(screen.getByRole("heading")).toHaveTextContent(/Log In/i);
    // user clicks sign up
    userEvent.click(screen.getByText(/Create new account/i))
    expect(screen.getByRole("heading")).toHaveTextContent(/Sign Up/i);
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Location")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/Sign up/i);
    // user clicks sign in
    userEvent.click(screen.getByText(/Log In/i))
    expect(screen.getByRole("heading")).toHaveTextContent(/Log into your account/i);
  });

});