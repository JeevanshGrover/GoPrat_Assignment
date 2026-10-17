import mongoose, { Schema } from 'mongoose';

const baseSchema = new Schema(
    {
        event: {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            type: {
                type: String,
                required: true,
            },
            dateMode: {
                type: String,
                required: true,
                enum: ['single', 'range'],
            },
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
            },
            location: {
                type: String,
                required: true,
                trim: true,
            },
            venue: {
                type: String,
                trim: true,
            },
        },
        status: {
            type: String,
            default: 'submitted',
        },
    },
    {
        timestamps: true,
        discriminatorKey: 'category',
    }
);

baseSchema.index({ category: 1, createdAt: -1 });

export const Requirement = mongoose.model('Requirement', baseSchema);

const plannerSchema = new Schema({
    details: {
        expectedGuests: {
            type: Number,
            required: true,
            min: 1,
        },
        budgetMin: {
            type: Number,
            required: true,
            min: 0,
        },
        budgetMax: {
            type: Number,
            required: true,
            min: 0,
        },
        services: {
            type: [String],
            validate: (v) => v.length > 0,
        },
        notes: {
            type: String,
            trim: true,
            maxlength: 500,
        },
    },
});

export const Planner = Requirement.discriminator('planner', plannerSchema);

const performerSchema = new Schema({
    details: {
        performerType: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            trim: true,
        },
        numberOfPerformers: {
            type: Number,
            required: true,
            min: 1,
        },
        durationMinutes: {
            type: Number,
            required: true,
            min: 15,
        },
        equipmentRequired: {
            type: [String],
            default: [],
        },
        notes: {
            type: String,
            trim: true,
            maxlength: 500,
        },
    },
});

export const Performer = Requirement.discriminator('performer', performerSchema);

const crewSchema = new Schema({
    details: {
        roles: {
            type: [String],
            validate: (v) => v.length > 0,
        },
        crewCount: {
            type: Number,
            required: true,
            min: 1,
        },
        numberOfDays: {
            type: Number,
            required: true,
            min: 1,
        },
        shiftHours: {
            type: Number,
            required: true,
            min: 1,
            max: 24,
        },
        notes: {
            type: String,
            trim: true,
            maxlength: 500,
        },
    },
});

export const Crew = Requirement.discriminator('crew', crewSchema);

export const modelByCategory = {
    planner: Planner,
    performer: Performer,
    crew: Crew,
};