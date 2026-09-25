import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Sign from './Sign';
import UserContext from '../context/UserContext';

const mockCreateUserWithEmailAndPassword = jest.fn(() =>
  Promise.resolve({
    user: {
      email: 'test@example.com',
      uid: 'user-123',
    },
  })
);

jest.mock('firebase/compat/app', () => ({
  __esModule: true,
  default: {
    auth: () => ({
      createUserWithEmailAndPassword: (...args) => mockCreateUserWithEmailAndPassword(...args),
    }),
  },
}));

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

describe('Sign page', () => {
  it('uses a separate confirm password field and submits matching credentials', async () => {
    const setUser = jest.fn();

    render(
      <UserContext.Provider value={{ user: null, setUser }}>
        <Sign />
      </UserContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'secret123' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'secret123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'secret123');
    });
  });
});
