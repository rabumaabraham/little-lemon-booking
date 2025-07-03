import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders booking form and submits correctly', () => {
  render(<App />);

  // Check if the Book Table button exists
  const button = screen.getByText(/Book Table/i);
  expect(button).toBeInTheDocument();

  // Try submitting without filling fields to trigger errors
  fireEvent.click(button);
  expect(screen.getByText(/Date is required/i)).toBeInTheDocument();

  // Fill date and time, and other fields
  fireEvent.change(screen.getByLabelText(/Date:/i), { target: { value: '2025-07-03' } });
  fireEvent.change(screen.getByLabelText(/Time:/i), { target: { value: '19:00' } });
  fireEvent.change(screen.getByLabelText(/Number of diners:/i), { target: { value: 2 } });
  fireEvent.change(screen.getByLabelText(/First Name:/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText(/Last Name:/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText(/Contact \(Email or phone\):/i), { target: { value: 'john@example.com' } });

  fireEvent.click(button);

  // Check if confirmation message appears
  expect(screen.getByText(/Booking Confirmed!/i)).toBeInTheDocument();
});