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
        type: Schema.Types.ObjectId,
        ref: 'Lobby',
        required: true
    }
});

export default mongoose.model('Players', PlayerSchema)