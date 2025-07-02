import fs from 'fs';
import path from 'path';
import Resume from '../models/resumeModel.js';
import upload from '../middleware/uploadMiddleware.js';

export const uploadResumeImages = async (req, res) => {
    try {
        upload.fields([
            {name: "thumbnail"},
            {name: "profileImg"}
        ]) (req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "Failed to upload images", error: err.message });
            }

            const resumeId = req.params.id;
            const resume = await Resume.findOne(
                { _id: resumeId, userId: req.userId }
            );
            if (!resume) {
                return res.status(404).json({ message: "Resume not found" });
            }

            //to locate uploads folder
            const uploadsFolder = path.join(process.cwd(), "uploads");
            const baseUrl = `${req.protocol}://${req.get("host")}`;

            const newThumbnail = req.files.thumbnail ?.[0];
            const newProfileImg = req.files.profileImg ?.[0];

            if(newThumbnail) {
                if(resume.thumbnailLink) {
                    const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
                    if (fs.existsSync(oldThumbnailPath)) {
                        fs.unlinkSync(oldThumbnailPath);
                    }
                }
            }

            // Profile Preview Image
            if(newProfileImg) {
                if(resume.profileInfo?.profilePreviewUrl) {
                    const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
                    if (fs.existsSync(oldProfile)) {
                        fs.unlinkSync(oldProfile);
                    }
                }
                resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImg.filename}`;
            }
            await resume.save();
            res.status(200).json({
                message: "Images uploaded successfully",
                thumbnailLink: resume.thumbnailLink,
                profilePreviewUrl: resume.profileInfo.profilePreviewUrl
            });
        })
    }
    catch (error) {
        res.status(500).json({ message: "Failed to upload images", error: error.message });
    }
}