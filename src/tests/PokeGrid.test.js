import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PokeGrid from '../components/PokeGrid';

const mockResponse = {
  results: Array.from({ length: 300 }, (_, index) => ({
    name: `pokemon-${index + 1}`,
  })),
};

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders loading state initially', () => {
  render(
    <MemoryRouter>
      <PokeGrid />
    </MemoryRouter>
  );
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('displays Pokémon list after loading', async () => {
  render(
    <MemoryRouter>
      <PokeGrid />
    </MemoryRouter>
  );
  await waitFor(() => expect(screen.getByText('pokemon-1')).toBeInTheDocument());
  
  for (let i = 1; i <= 30; i++) {
    expect(screen.getByText(`pokemon-${i}`)).toBeInTheDocument();
  }
});

test('filters Pokémon by name', async () => {
  render(
    <MemoryRouter>
      <PokeGrid />
    </MemoryRouter>
  );

  await waitFor(() => expect(screen.getByText('pokemon-1')).toBeInTheDocument());

  fireEvent.change(screen.getByPlaceholderText('Filter by name'), {
    target: { value: 'pokemon-1' },
  });

  await waitFor(() => {
    expect(screen.getByText('pokemon-1')).toBeInTheDocument();
    expect(screen.queryByText('pokemon-2')).not.toBeInTheDocument();
  });
});

test('pagination works correctly', async () => {
  render(
    <MemoryRouter>
      <PokeGrid />
    </MemoryRouter>
  );

  await waitFor(() => expect(screen.getByText('pokemon-1')).toBeInTheDocument());

  fireEvent.click(screen.getByText('2'));

  await waitFor(() => {
    expect(screen.queryByText('pokemon-1')).not.toBeInTheDocument();
    expect(screen.getByText('pokemon-31')).toBeInTheDocument();
  });
});

test('changes page correctly', async () => {
  render(
    <MemoryRouter>
      <PokeGrid />
    </MemoryRouter>
  );

  await waitFor(() => expect(screen.getByText('pokemon-1')).toBeInTheDocument());

  fireEvent.click(screen.getByText('2'));

  await waitFor(() => {
    expect(screen.queryByText('pokemon-1')).not.toBeInTheDocument();
    expect(screen.getByText('pokemon-31')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText('1'));

  await waitFor(() => {
    expect(screen.getByText('pokemon-1')).toBeInTheDocument();
    expect(screen.queryByText('pokemon-31')).not.toBeInTheDocument();
  });
});

test('shows all Pokémon when filter is cleared', async () => {
  render(
    <MemoryRouter>
      <PokeGrid />
    </MemoryRouter>
  );

  await waitFor(() => expect(screen.getByText('pokemon-1')).toBeInTheDocument());

  fireEvent.change(screen.getByPlaceholderText('Filter by name'), {
    target: { value: 'pokemon-1' },
  });

  await waitFor(() => {
    expect(screen.getByText('pokemon-1')).toBeInTheDocument();
    expect(screen.queryByText('pokemon-2')).not.toBeInTheDocument();
  });

  fireEvent.change(screen.getByPlaceholderText('Filter by name'), {
    target: { value: '' },
  });

  await waitFor(() => {
    expect(screen.getByText('pokemon-1')).toBeInTheDocument();
    expect(screen.getByText('pokemon-2')).toBeInTheDocument();
  });
});
