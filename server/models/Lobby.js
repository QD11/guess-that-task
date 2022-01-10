import mongoose from 'mongoose'

const LobbySchema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Players'
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Players'
    }]
}, {
    timestamps: true,
    collection: "lobbies"
});

export default mongoose.model('Lobbies', LobbySchema)