import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { TextFields } from '@mui/icons-material';


export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});

    const handleChangeUname = (event) => {
        const { name, value } = event.target;
        const newErrors = { ...errors };

        if (value.trim() === '') {
            newErrors.userName = 'Username is required ';
        } else if (!/^[a-zA-Z0-9-_.\s]+$/.test(value)) {
            newErrors.userName = 'Invalid username format ';
        } else if (value.length > 60) {
            newErrors.userName = 'Username must be less than 60 characters ';
        } else {
            delete newErrors.userName;
        }
        setUserName(value);
        setErrors(newErrors);
    };

    const handleChangePass = (event) => {
        const { pass, value } = event.target;
        const newErrors = { ...errors };

        if (value.trim() === '') {
            newErrors.password = 'Password is required ';
        } else if (value.length < 7) {
            newErrors.password = 'Password must be at least 7 characters long ';
        }
        else if (value.length > 12) {
            newErrors.password = 'Password must be no more than 12 characters long ';
        } else if (!(/^(?=.*[0-9])/).test(value)) {
            newErrors.password = 'Password must contain at least one digit ';
        } else if (!(/^(?=.*[A-Z])/).test(value)) {
            newErrors.password = 'Password must contain at least one uppercase letter ';
        } else if (!(/^(?=.*[!@#$%^&*()])/).test(value)) {
            newErrors.password = 'Password must contain at least one special character ';
        } else {
            newErrors.password = ' ';
        }


        setPassword(value);
        setErrors(newErrors);
    };
    const handleLogIn = (event) => {
        event.preventDefault();

        if (Object.keys(errors).length === 0) {
            // Handle form submission here
         
        } else {
            // Display error messages using Typography
            alert('Please fix the following errors: ');
            Object.values(errors).forEach((error) => {
                console.error(error);
                <Typography variant="caption" color="error" key={error}>
                    {error}
                </Typography>;
            });
        }

    };
    return (
        <div>
            <form onSubmit={handleLogIn}>
            <TextField
                    label="User Name"
                    variant="standard"
                    value={userName}
                    onChange={handleChangeUname}
                    error={!!errors.userName}
                    helperText={errors.userName}
                />
                <br />
                <TextField
                    label="Password"
                    variant="standard"
                    type="password"
                    value={password}
                    onChange={handleChangePass}
                    error={!!errors.password}
                    helperText={errors.password}
                />    <br />
                    <button>Log In</button>
                <br />
                    {Object.keys(errors).length > 0 && (
                    <Typography variant="caption" color="error">
                        Please fix the following errors:
                    </Typography>
                )}
                {Object.values(errors).map((error) => (
                    <Typography variant="caption" color="error" key={error}>
                        {error}
                    </Typography>
                ))}
            </form>
        </div>
    )
}