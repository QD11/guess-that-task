import mongoose from 'mongoose'

const PlayerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    lobby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lobby',
        // required: true
    }
}, {
    timestamps: true,
    collection: "players"
});

export default mongoose.model('Players', PlayerSchema)