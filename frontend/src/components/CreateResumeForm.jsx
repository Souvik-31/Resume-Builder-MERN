import React, { useState } from 'react'
import Input from './Inputs'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

const CreateResumeForm = () => {

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);

    const handleCreateResume = async (e) => {
        e.preventDefault();
        if (!title) {
            setError('All fields are required');
            return;
        }
        setError(null);
        try {
            const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
                title
            });
            if (response.data?._id) {
                navigate(`/resume/${response.data?._id}`);
            }
        }
        catch (error) {
            setError(error.response?.data?.message || 'An error occurred during resume creation');
            console.error('Resume creation error:', error);
        }
    }

    return (
        <div className='w-full max-w-md p-8 bg-white rounded-2xl border-gray-100 shadow-lg'>
            <h3 className='text-2xl font-bold text-gray-900 mb-2'>Create New Resume</h3>
            <p className='text-gray-600 mb-6'>Enter a title for your resume</p>
            <form onSubmit={handleCreateResume}>
                <Input
                    type="text"
                    placeholder="Resume Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {error && <p className='text-red-500 text-sm'>{error}</p>}
                <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-rose-200 transition-all text-lg"
                >Create</button>
            </form>


        </div>
    )
}

export default CreateResumeForm
