import { render, screen } from '@testing-library/react';
import App from './App'; // Ensure this path is correct
import logo from './logo.svg'; // Import logo to verify in the test

describe('App Component', () => {
  test('renders logo image', () => {
    render(<App />);
    const logoElement = screen.getByAltText(/logo/i);
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', expect.stringContaining('logo.svg'));
  });

  test('renders edit instruction', () => {
    render(<App />);
    const instructionElement = screen.getByText(/Edit src\/App.tsx and save to reload/i);
    expect(instructionElement).toBeInTheDocument();
  });

  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Learn React/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://reactjs.org');
  });
});
