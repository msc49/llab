import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const signIn = () => {
  userEvent.click(screen.getByText(/Log In/i))
  userEvent.type(screen.getByLabelText(/Username/i), 'Bob')
  userEvent.type(screen.getByLabelText(/Password/i), '12345')
  userEvent.click(screen.getByRole(/button/i))
}

export const listItem = () => {
  userEvent.click(screen.getByText(/large blue plus icon/i))
  userEvent.type(screen.getByLabelText(/Item name/i), 'Screwdriver')
  userEvent.type(screen.getByLabelText(/Item description/i), 'Works well')
  userEvent.click(screen.getByRole(/button/i))
}