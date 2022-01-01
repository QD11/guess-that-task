import mongoose from 'mongoose'

const LobbySchema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }]
}, {
    timestamps: true
});

export default mongoose.model('Lobbies', LobbySchema)