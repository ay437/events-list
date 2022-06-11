import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const helloElement = screen.getByText(/Awaiting Colony Events.../i);
  expect(helloElement).toBeInTheDocument();
});
