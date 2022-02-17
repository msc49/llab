import { render, screen, waitFor } from "@testing-library/react";
import ItemList from '../components/Items/ItemList';
import {signIn, listItem} from './testHelpers';

describe('Item Feed', () => {

  beforeEach(() => {
    signIn
    listItem
  });

  test('fetches and displays all available items', async () => {
    render(<ItemList />)
    expect(await screen.findByText("Screwdriver")).toBeInTheDocument()
  });

});