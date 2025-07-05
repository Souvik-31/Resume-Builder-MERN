import React from 'react'
import { authStyles as styles } from '../assets/dummystyle.js'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import Input from './Inputs.jsx';
import axiosInstance from '../utils/axiosInstance.js';
import { API_PATHS } from '../utils/apiPaths.js';

const SignUp = ({ setCurrentPage }) => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!fullName || !email || !password) {
            setError('All fields are required');
            return;
        }
        setError(null);
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
                name: fullName,
                email,
                password
            });
            const { token } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                updateUser(response.data);
                navigate('/dashboard');
            }
        }
        catch (error) {
            setError(error.response?.data?.message || 'An error occurred during sign up');
            console.error('Sign up error:', error);
        }
    }


    return (
        <div className={styles.signupContainer}>
            <div className={styles.headerWrapper}>
                <h3 className={styles.signupTitle}>Create Account</h3>
                <p className={styles.signupSubtitle}>Sign up to start building your resume</p>
            </div>

            <form onSubmit={handleSignUp} className={styles.signupForm}></form>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='John Doe' label='Full Name' type='text'/>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email@example.com' label='Email' type='email'/>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='******' label='Password' type='password'/>
                { error && <p className={styles.errorMessage}>{error}</p>}
                <button type='submit' className={styles.signupSubmit}>Sign Up</button>
                <p className={styles.switchText}>Already have an account? <span className={styles.signupSwitchButton} onClick={() => setCurrentPage('login')}>Log In</span></p>
        </div>
    )
}

export default SignUp
