import mongoose from 'mongoose'

const graphSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            default: "Untitled Graph"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        nodes: {
            type: Array,
            default: []
        },
        edges: {
            type: Array,
            default: []
        },
        isDirected: {
            type: Boolean,
            default: false
        },
        isWeighted: {
            type: Boolean,
            default: false
        },
        isPublic: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Graph", graphSchema)