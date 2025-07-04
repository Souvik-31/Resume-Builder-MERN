import React, { useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { dashboardStyles } from '../assets/dummystyle.js'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LucideFilePlus, LucideTrash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { ResumeSummaryCard } from '../components/cards.jsx';
import moment from 'moment';
import Modal from '../components/Modal.jsx';
import CreateResumeForm from '../components/CreateResumeForm.jsx';
import axiosInstance from '../utils/axiosInstance.js';
import { API_PATHS } from '../utils/apiPaths.js';

const DashboardPage = () => {

    const navigate = useNavigate();
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [allResumes, setAllResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resumeToDelete, setResumeToDelete] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Completion percentage
    const calculateCompletion = (resume) => {
        let completedFields = 0;
        let totalFields = 0;

        // Profile Info
        totalFields += 3;
        if (resume.profileInfo?.fullName) completedFields++;
        if (resume.profileInfo?.designation) completedFields++;
        if (resume.profileInfo?.summary) completedFields++;

        // Contact Info
        totalFields += 2;
        if (resume.contactInfo?.email) completedFields++;
        if (resume.contactInfo?.phone) completedFields++;

        // Work Experience
        resume.workExperience?.forEach(exp => {
            totalFields += 5;
            if (exp.company) completedFields++;
            if (exp.role) completedFields++;
            if (exp.startDate) completedFields++;
            if (exp.endDate) completedFields++;
            if (exp.description) completedFields++;
        });

        // Education
        resume.education?.forEach(edu => {
            totalFields += 4;
            if (edu.degree) completedFields++;
            if (edu.institution) completedFields++;
            if (edu.startDate) completedFields++;
            if (edu.endDate) completedFields++;
        });

        // Skills
        resume.skills?.forEach(skill => {
            totalFields += 2;
            if (skill.name) completedFields++;
            if (skill.progress > 0) completedFields++;
        });

        // Projects
        resume.projects?.forEach(project => {
            totalFields += 4;
            if (project.title) completedFields++;
            if (project.description) completedFields++;
            if (project.github) completedFields++;
            if (project.liveDemo) completedFields++;
        });

        // Certifications
        resume.certifications?.forEach(cert => {
            totalFields += 3;
            if (cert.title) completedFields++;
            if (cert.issuer) completedFields++;
            if (cert.year) completedFields++;
        });

        // Languages
        resume.languages?.forEach(lang => {
            totalFields += 2;
            if (lang.name) completedFields++;
            if (lang.progress > 0) completedFields++;
        });

        // Interests
        totalFields += (resume.interests?.length || 0);
        completedFields += (resume.interests?.filter(i => i?.trim() !== "")?.length || 0);

        return Math.round((completedFields / totalFields) * 100);
    };

    const fetchAllResumes = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL)
            const resumeWithCompletion = response.data.map(resume => ({
                ...resume,
                completion: calculateCompletion(resume)
            }))

            setAllResumes(resumeWithCompletion)
            setLoading(false)
        } catch (error) {
            console.log('Error fetching resumes', error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllResumes()
    }, [])

    const handleDeleteResume = async () => {
        if (!resumeToDelete) return;
        try {
            await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeToDelete))
            toast.success('Resume deleted successfully')
            fetchAllResumes()
        } catch (error) {
            console.log('Error deleting resume', error)
            toast.error('Error deleting resume')

        }
        finally {
            setResumeToDelete(null)
            setShowDeleteConfirm(false)
        }
    }

    const handleDeleteClick = (id) => {
        setResumeToDelete(id)
        setShowDeleteConfirm(true)
    }

    return (
        <DashboardLayout>
            <div className={dashboardStyles.container}>
                <div className={dashboardStyles.headerWrapper}>
                    <div>
                        <h1 className={dashboardStyles.headerTitle}>My Resumes</h1>
                        <p className={dashboardStyles.headerSubtitle}>Welcome to your dashboard</p>
                        <p className={dashboardStyles.headerSubtitle}>
                            {allResumes.length > 0 ? `You have ${allResumes.length} resume${allResumes.length > 1 ? "s" : ""}` : "You have no resumes yet. Create your first resume now!"}
                        </p>
                    </div>
                    <div className='flex gap-4'>
                        <button className={dashboardStyles.createButton} onClick={() => setOpenCreateModal(true)}>
                            <div className={dashboardStyles.createButtonOverlay}></div>
                            <span className={dashboardStyles.createButtonContent}>
                                Create Now
                                <LucideFilePlus className='group-hover:translate-x-1 transition-transform' size={20} />
                            </span>
                        </button>
                    </div>
                </div>
                {/* Loading */}
                {loading && (
                    <div className={dashboardStyles.spinnerWrapper}>
                        <div className={dashboardStyles.spinner}></div>
                    </div>
                )}
                {/* No Resumes */}
                {allResumes.length === 0 && !loading && (
                    <div className={dashboardStyles.emptyStateWrapper}>
                        <div className={dashboardStyles.emptyIconWrapper}>
                            <LucideFilePlus size={32} className='text-violet-600' />
                        </div>
                        <h3 className={dashboardStyles.emptyTitle}>No resumes found</h3>
                        <p className={dashboardStyles.emptyText}>
                            You have no resumes yet. Create your first resume now!
                        </p>
                        <button className={dashboardStyles.createButton} onClick={() => setOpenCreateModal(true)}>
                            <div className={dashboardStyles.createButtonOverlay}></div>
                            <span className={dashboardStyles.createButtonContent}>
                                Create your first Resume
                            </span>

                        </button>
                    </div>
                )}
                {/* Resumes */}
                {allResumes.length > 0 && !loading && (
                    <div className={dashboardStyles.grid}>
                        <div className={dashboardStyles.newResumeCard} onClick={() => setOpenCreateModal(true)}>
                            <div className={dashboardStyles.newResumeIcon}>
                                <LucideFilePlus size={32} className='text-white' />
                            </div>
                            <h3 className={dashboardStyles.newResumeTitle}>Create Your Resume</h3>
                            <p className={dashboardStyles.newResumeText}>Create a new resume to get started</p>
                        </div>

                        {allResumes.map(resume => (
                            <ResumeSummaryCard key={resume._id} imgUrl={resume.thumbnailLink} title={resume.title} createdAt={resume.createdAt} updatedAt={resume.updatedAt}
                                onSelect={() => navigate(`/resume/${resume._id}`)}
                                onDelete={() => handleDeleteClick(resume._id)}
                                completion={resume.completion || 0}
                                isPremium={resume.isPremium}
                                isNew={moment().diff(moment(resume.createdAt), 'days') < 7}
                            />
                        ))}
                    </div>
                )}

            </div>

            <Modal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} hideHeader maxWidth='max-w-2xl'>
                <div className='p-6'>
                    <div className={dashboardStyles.modalHeader}>
                        <h3 className={dashboardStyles.modalTitle}>Create New Resume</h3>
                        <button onClick={() => setOpenCreateModal(false)} className={dashboardStyles.modalCloseButton}>
                            X
                        </button>
                    </div>
                    <CreateResumeForm onSuccess={() => {
                        setOpenCreateModal(false)
                        fetchAllResumes()
                    }}/>
                </div>
            </Modal>


            {/* Delete Modal */}
            <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title='Confirm Deletion'
                showActionBtn actionBtnText='Delete' actionBtnClassName='bg-red-600 hover:bg-red-700' onActionClick={handleDeleteResume}>
                    <div className='p-4'>
                        <div className='flex flex-col items-center text-center'>
                        <div className={dashboardStyles.deleteIconWrapper}>
                            <LucideTrash2 size={32} className='text-orange-600' />
                        </div>
                        <h3 className={dashboardStyles.deleteTitle}>Delete Resume?</h3>
                        <p className={dashboardStyles.deleteText}>
                            Are you sure you want to delete this resume? This action cannot be undone.
                        </p>
                    </div>
                    </div>
            </Modal>
        </DashboardLayout>
    )
}

export default DashboardPage
