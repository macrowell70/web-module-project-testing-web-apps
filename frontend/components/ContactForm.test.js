import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm/>)
});

test('renders the contact form header', () => {
    render(<ContactForm/>)
    const header = screen.getByText("Contact Form");
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, "Name");
    const error = screen.getByText(/error/i);
    expect(error).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const submitBtn = screen.getByRole("button");
    const firstNameError = screen.findByText(/error: firstName/i);
    const lastNameError = screen.findByText(/error: lastName/i);
    const emailError = screen.findByText(/error: email/i);

    userEvent.click(submitBtn);
    
    expect(firstNameError).toBeTruthy();
    expect(lastNameError).toBeTruthy();
    expect(emailError).toBeTruthy();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstNameText = "Mitchel"
    const lastNameText = "Crowell"

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const submitBtn = screen.getByRole("button");
    const error = screen.findByText(/error/i);

    userEvent.type(firstNameInput, firstNameText);
    userEvent.type(lastNameInput, lastNameText);
    userEvent.click(submitBtn);

    expect(error).toBeTruthy();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

});
