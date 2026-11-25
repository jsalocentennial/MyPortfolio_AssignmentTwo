import { fireEvent, render, screen } from '@testing-library/react';
import Contact from './Contact.jsx';
import { afterEach, expect, test, vi } from 'vitest';

afterEach(() => {
    vi.unstubAllGlobals();
});

test('shows an error and keeps the message when sending fails', async () => {
    const errorMessage = 'Please try again later.';

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ message: errorMessage }),
    }));
    render(<Contact isAdmin={() => false} token={null} />);

    const messageField = screen.getByLabelText('Message:');

    fireEvent.change(screen.getByLabelText('First Name:'), {
        target: { value: 'Jordan' },
    });
    fireEvent.change(screen.getByLabelText('Last Name:'), {
        target: { value: 'Example' },
    });
    fireEvent.change(screen.getByLabelText('Email:'), {
        target: { value: 'jordan@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Phone Number:'), {
        target: { value: '416-555-0100' },
    });
    fireEvent.change(messageField, {
        target: { value: 'Could you tell me more about your projects?' },
    });

        fireEvent.click(screen.getByRole('button', { name: /^send/i }));

    const displayedError = await screen.findByText(errorMessage);
    expect(displayedError.textContent).toBe(errorMessage);

    expect(messageField.value).toBe('Could you tell me more about your projects?');
});
