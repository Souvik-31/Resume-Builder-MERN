import React from 'react'
import { authStyles as styles } from '../assets/dummystyle.js'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import axiosInstance from '../utils/axiosInstance.js';
import { API_PATHS } from '../utils/apiPaths.js';
import Input from './inputs.jsx';

const Login = ({
    setCurrentPage
}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('All fields are required');
            return;
        }
        setError(null);
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
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
            setError(error.response?.data?.message || 'An error occurred during login');
            console.error('Login error:', error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerWrapper}>
                <h3 className={styles.title}>Welcome Back</h3>
                <p className={styles.subtitle}>Log in to continue</p>
            </div>
            <form onSubmit={handleLogin} className={styles.form}>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label='Email'
                    placeholder='Email'
                    type='email'
                />
                <Input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                />
                {error && <div className={styles.errorMessage}>{error}</div>}
                <button type='submit' className={styles.submitButton}>Log In</button>
                <p className={styles.switchText}>
                    Don't have an account? 
                    <span className={styles.switchButton} onClick={() => setCurrentPage('signup')}> Sign Up</span>
                </p>
                
            </form>
        </div>
    )
}

export default Login
