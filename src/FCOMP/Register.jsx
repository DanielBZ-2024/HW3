import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


export default function Register() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [date, setDate] = useState(null);
    const [mail, setMail] = useState('');


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

    const handlepassConfirmation = (event) => {
        const { value } = event.target;
        const newErrors = { ...errors };

        if (value.trim() === '') {
            newErrors.passwordConfirm = 'Password confirmation is required';
        } else if (value != password) {
            newErrors.passwordConfirm = 'Passwords do not match';
        } else {
            newErrors.passwordConfirm = ' ';
        }
        setPasswordConfirm(value);
        setErrors(newErrors);
    };
    const handleChangeFirstName = (event) => {
        const { value } = event.target;
        const newErrors = { ...errors };

        if (value.trim() === '') {
            newErrors.password = 'First name is required ';
        }
        else if (!/^[a-zA-Z\s]+$/.test(value)) {
            newErrors.firstName = 'First name must contain only letters and spaces';
        } else {
            newErrors.firstName = '';
        }

        setFirstName(value);
        setErrors(newErrors);
    };

    const handleChangeLastName = (event) => {
        const { value } = event.target;
        const newErrors = { ...errors };
        if (value.trim() === '') {
            newErrors.password = 'Last name is required ';
        }
        else if (!/^[a-zA-Z\s]+$/.test(value)) {
            newErrors.lastName = 'Last name must contain only letters and spaces';
        } else {
            newErrors.lastName = '';
        }

        setLastName(value);
        setErrors(newErrors);
    };

    const handleChangeStreet = (event) => {
        const { value } = event.target;
        const newErrors = { ...errors };

        if (!/^[\u0590-\u05FF]+$/.test(value)) {
            newErrors.street = 'Street must contain only Hebrew letters';
        } else {
            delete newErrors.street;
        }

        setStreet(value);
        setErrors(newErrors);
    };
    const handlevalidateDate = (event) => {
        const inp = event.target.value;
        const newErrors = { ...errors };

        const birthDate = new Date(inp);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (!(age >= 18 && age <= 120)) {
            newErrors.date = 'Age must be between 18 and 120';
        }
        else {
            newErrors.date = '';
        }
        setDate(age);
        setErrors(newErrors);

    };

    const handleChangeNumber = (event) => {
        const { value } = event.target;
        const newErrors = { ...errors };

        if (value === '') {
            newErrors.number = 'Number is required';
        } else if (value < 0) {
            newErrors.number = 'Number must be positive';
        } else {
            // Ensure value is a valid number
            const parsedNumber = Number(value);
            if (isNaN(parsedNumber)) {
                newErrors.number = 'Invalid number format';
            } else {
                setNumber(parsedNumber); // Store parsed number in state
                delete newErrors.number;
            }
        }
        setNumber(value);
        setErrors(newErrors);
    };
    const handlevalidateEmail = (event) => {
        const { value } = event.target;
        const newErrors = { ...errors };
        
        const regexEmail = /^[^\s@]+@[^\s@]+\.(?:com)$/;
        if(!regexEmail.test(value)){
            newErrors.mail ='follow the format abc@abc.com';
        }else{
            newErrors.mail ='';
        }
        setMail(value);
        setErrors(newErrors);
    };

    const handleSubmit = (event) => {
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
                <TextField
                    label="Password Confirmation"
                    variant="standard"
                    type="password"
                    value={passwordConfirm}
                    onBlur={handlepassConfirmation}
                    error={!!errors.passwordConfirm}
                    helperText={errors.passwordConfirm}
                />                    <br />
                <TextField label="First Name" variant="standard" value={firstName}
                    onChange={handleChangeFirstName}
                    error={!!errors.firstName}
                    helperText={errors.firstName} />
                <br />
                <TextField label="Last Name"
                    variant="standard"
                    value={lastName}
                    onChange={handleChangeLastName}
                    error={!!errors.lastName}
                    helperText={errors.lastName} />
                <br />
                <TextField label="Mail" variant="standard" type="email" 
                value={mail}
                onChange={handlevalidateEmail}
                error={!!errors.mail}
                helperText={errors.mail} />
                <br />
                <TextField label="Image" variant="standard" type="file"
                />
                <br />
                <label>Birth Date</label>  <br />
                <TextField label="" variant="standard" type="Date" value={date} onBlur={handlevalidateDate} error={!!errors.date}
                    helperText={errors.date} />
                <br />
                <TextField label="City" variant="standard" type="text" />
                <br />
                <TextField label="street" variant="standard" type="text" value={street}
                    onChange={handleChangeStreet}
                    error={!!errors.street}
                    helperText={errors.street} /> <br />
                <TextField label="number" variant="standard" type="number" value={number} // Use parsed number in value
                    onChange={handleChangeNumber}
                    error={!!errors.number}
                    helperText={errors.number} />

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