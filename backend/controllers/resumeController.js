import Resume from '../models/resumeModel.js';
import fs from 'fs';
import path from 'path';

export const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        // Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };
        const newResume = await Resume.create({
            userId: req.user.id,
            title,
            ...defaultResumeData,
            ...req.body, // Merge with any additional data provided
        });
        res.status(201).json(newResume);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating resume', error: error.message });
    }
}

export const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user.id }).sort({ updated_at: -1 });
        res.json(resumes);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching resumes', error: error.message });
    }
}

export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.json(resume);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching resume', error: error.message });
    }
}

export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        Object.assign(resume, req.body); // Update resume with new data
        const savedResume = await resume.save();
        res.json(savedResume);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating resume', error: error.message });
    }
}

export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        const uploadsFolder = path.join(process.cwd(), 'uploads');
        // Delete thumbnail if exists
        if (resume.thumbnailLink) {
            const oldthumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
            if (fs.existsSync(oldthumbnail)) {
                fs.unlinkSync(oldthumbnail);
            }
        }
        // Delete profile preview if exists
        if (resume.profileInfo?.profilePreviewUrl) {
            const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
            if (fs.existsSync(oldProfile)) {
                fs.unlinkSync(oldProfile);
            }
        }
        // Delete the resume document
        await Resume.deleteOne({ _id: req.params.id, userId: req.user._id });
        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting resume', error: error.message });
    }
}