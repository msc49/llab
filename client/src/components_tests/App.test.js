import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../components/App";
import {signIn, listItem} from './testHelpers';
import { server, rest } from '../testServer';

// Test behaviours that span multiple App components

describe("App", () => {

  test('user can sign in', async () => {
    render(<App />);
    signIn()
    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent('bob'))
  })

  test('user can sign up', async () => {
    server.use(
      rest.post('/users', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(
            {"user": {"handle":"bob", "password":"12345"}}
          )
        )
      })
    )
    render(<App />)
    userEvent.click(screen.getByText(/Log In/i))
    userEvent.click(screen.getByText(/Sign Up/i))
    userEvent.type(screen.getByLabelText(/Username/i), 'bob')
    userEvent.type(screen.getByLabelText("Password"), '12345')
    userEvent.type(screen.getByLabelText("Confirm Password"), '12345')
    userEvent.click(screen.getByRole(/button/i))
    expect(await screen.findByText(/Registration Successful/i)).toBeInTheDocument() 
  })

  test('user can sign out', async () => {
    render(<App />);
    signIn()
    userEvent.click(await screen.findByText('Log Out')) //Need to double-check that
    expect(screen.getByTestId('user')).toHaveTextContent('Log In')
  })

  test('user can list an item and is redirected to item feed', async () => {
    server.use(
      rest.post('/items', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(
            {
              "id": 3,
              "name": "Screwdriver",
              "description": "works well"
            }
        ))};
    );

    render(<App />)
    signIn()
    expect(await screen.findByText('Log Out')).toBeInTheDocument()
    userEvent.click(screen.getByText(/large blue plus icon/i))
    userEvent.type(screen.getByLabelText(/Item name/i), 'Screwdriver')
    userEvent.type(screen.getByLabelText(/Item description/i), 'works well')
    userEvent.click(screen.getByRole(/button/i))
  );

});