import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { TextFields } from '@mui/icons-material';


export default function Register() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});


    const handleChangeUname = (event) => {
        const { name, value } = event.target;
        const newErrors = { ...errors };

        if (value.trim() === '') {
            newErrors.userName = 'Username is required';
        } else if (!/^[a-zA-Z0-9-_.\s]+$/.test(value)) {
            newErrors.userName = 'Invalid username format';
        } else if (value.length > 60) {
            newErrors.userName = 'Username must be less than 60 characters';
        } else {
            delete newErrors.userName;
        }
        setUserName(value);
        setErrors(newErrors);
    };

    const handleChangePass = (event) => {
        const { pass, value } = event.target;
        const newErrors = { ...errors };

      
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{7,12}$/;
        
          if (value.trim() === '') {
            newErrors.password = 'Password is required';
          }else if (value.length < 7) {
            newErrors.password = 'Password must be at least 7 characters long';}
          else if (value.length > 12) {
            newErrors.password = 'Password must be no more than 12 characters long';
        }else if (!passwordRegex.test(value)) {
            newErrors.password = 'Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character';
          }
        

        setPassword(value);
        setErrors(newErrors);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        if (Object.keys(errors).length === 0) {
            // Handle form submission here
            console.log('Username:', userName);
            console.log('Password:', password);
        } else {
            // Display error messages using Typography
            alert('Please fix the following errors:');
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
            <form onSubmit={handleSubmit} >
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
                />                    <br />
                <TextField label="First Name" variant="standard" />
                <br />
                <TextField label="Last Name" variant="standard" />
                <br />
                <TextField label="Mail" variant="standard" type="email" />
                <br />
                <TextField label="Image" variant="standard" type="file" />
                <br />
                <label>Birth Date</label>  <br />
                <TextField label="" variant="standard" type="Date" />
                <br />
                <TextField label="City" variant="standard" type="text" />
                <br />
                <TextField label="street" variant="standard" type="text" /> <br />
                <TextField label="number" variant="standard" type="number" />

                <br />
                <button type="submit">Submit</button>
                <br />
                {/* Conditionally render Typography elements for errors */}
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