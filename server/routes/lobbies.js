import express from 'express';
import Lobby from '../models/Lobby.js';

const router = express.Router();

//ALL Lobbys
router.get('/', async (req, res) => {
    try{
        const lobbies = await Lobby.find()
            .populate("owner","-__v")
            .populate("players","-__v");
        res.json(lobbies)
    }catch(err){
        res.json({message:err})
    }
});

//Get specific lobby
router.get('/:lobbyId', async (req,res) => {
    try{
        const lobby = await Lobby.find({code : req.params.lobbyId})
            .populate("owner","-__v")
            .populate("players","-__v");
        res.json(lobby);
    }catch (err) {
        res.json({message:err})
    }
})

//Submits a lobby
router.post('/', async (req, res) => {
    const lobby = new Lobby({
        code: req.body.code,
        owner: req.body.owner,
        players: [req.body.owner]
    });
    try{
        const savedLobby = await lobby.save();
        res.json(savedLobby);
    }catch(err){
        res.json({message: err })
    }
})

//Delete Lobby
router.delete('/:lobbyId', async (req,res) => {
    try{
        const removeLobby = await Lobby.remove({_id: req.params.lobbyId })
        res.json(removeLobby)
    }catch(err){
        res.json({message: err })
    }
});

//Add Player
router.patch('/:lobbyId/:playerId', async (req,res) => {
    try{
        const lobby = await Lobby.findById(req.params.lobbyId)
        // const player = await Player.findById(req.params.playerId)

        const updatedLobby = await Lobby.updateOne(
            {_id: req.params.lobbyId }, 
            { $push: {players: req.body.playerId}}
        )
        res.json(updatedLobby);
    }catch (err) {
        res.json({message:err})
    }
})

//Update
// router.patch('/:lobbyId', async (req,res) => {
//     try{
//         const updatedLobby = await Lobby.updateOne(
//             {_id: req.params.lobbyId }, 
//             { $set : {: req.body.title}}
//         );
//         res.json(updatedLobby);
//     }
//     catch(err){
//         res.json({message: err })
//     }
// })

export default router;