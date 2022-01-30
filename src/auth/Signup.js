import React,{useState} from 'react';
// import * as yup from 'yup';

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    Alert
} from '@mui/material'
import {LockOutlined } from '@mui/icons-material'

import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {

    const [error,setError] = useState()
    const [loading,setLoading] = useState(false)

    const {signup} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const user = {
            email: data.get('email'),
            password:data.get('password'),
            passwordConfirm: data.get('passwordConfirm')
        }
        console.log(user)

        if(user.password !== user.passwordConfirm) {
            return setError('Passwords do not match')
        }
        if(user.password.length < 8) {
            return setError('Password should be at least 8 characters')
        }

        try {
            setError('')
            setLoading(true)
            await signup(user.email,user.password)
            navigate('/')
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
        
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
            
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                { error && <Alert severity='error'>{error}</Alert>}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                // autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                // autoFocus
                                
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                // autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                
                                // autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                               
                                // autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="passwordConfirm"
                                label="Confirm Password"
                                type="password"
                                id="password2"
                                
                                // autoComplete="passwordConfirm"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        disabled={loading}
                        color='secondary'
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                        <Link href="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>   
    );
}