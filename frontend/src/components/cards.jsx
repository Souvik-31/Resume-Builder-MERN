import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { cardStyles } from '../assets/dummystyle.js';

// Profile Info Card Component
export const ProfileInfoCard = () => {
    const Navigate = useNavigate();
    const { user,clearUser } = useContext(UserContext);
    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        Navigate('/');
    };

    return (
        user && (
            <div className='cardStyles.profileCard'>
                <div className='cardStyles.profileInitialsContainer'>
                    <span className='cardStyles.profileInitialsText'>
                        {user.name? user.name.charAt(0).toUpperCase() : ""}
                    </span>
                </div>

                <div className='cardStyles.profileName'>
                    {user.name || ""}
                </div>
                <button className='cardStyles.logoutButton' onClick={handleLogout}>
                    Logout
                </button>
            </div>


    )
)
}   
