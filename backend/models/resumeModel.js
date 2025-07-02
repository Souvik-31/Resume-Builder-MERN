import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumbnailLink: {
        type: String,
    },
    template: {
        theme: String,
        colorpalette: [String]
    },

    profileInfo: {
        profilePreviewUrl: String,
        fullname: String,
        designation: String,
        summary: String,
    },

    contactInfo: {
        email: String,
        phone: String,
        location: String,
        linkedin: String,
        github: String,
        website: String,
    },

    workExperience: [{
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String,
    }],

    education: [{
        degree: String,
        institution: String,
        startDate: Date,
        endDate: Date,
    }],

    skills: [{
        name: String,
        progress: String
    }],

    projects: [{
        title: String,
        description: String,
        github: String,
        liveDemo: String,
    }],

    certifications: [{
        title: String,
        issuer: String,
        year: String,
    }],

    languages: [{
        name: String,
        progress: String
    }],

    interests: [String],

},
{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

export default mongoose.model("Resume", resumeSchema);