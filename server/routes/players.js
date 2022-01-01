import express from 'express';
import Player from '../models/Player.js';
const router = express.Router();

//ALL Players
router.get('/', async (req, res) => {
    try{
        const players = await Player.find();
        res.json(players)
    }catch(err){
        res.json({message:err})
    }
});

//Get specific player
router.get('/:playerId', async (req,res) => {
    try{
        const player = await Player.findById(req.params.playerId)
        res.json(player);
    }catch (err) {
        res.json({message:err})
    }
})

//Submits a player
router.player('/', async (req, res) => {
    const player = new Player({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savedPlayer = await player.save();
        res.json(savedPlayer);
    }catch(err){
        res.json({message: err })
    }
})

//Delete Player
router.delete('/:playerId', async (req,res) => {
    try{
        const removePlayer = await Player.remove({_id: req.params.playerId })
        res.json(removePlayer)
    }catch(err){
        res.json({message: err })
    }
});

//Update
router.patch('/:playerId', async (req,res) => {
    try{
        const updatedPlayer = await Player.updateOne(
            {_id: req.params.playerId }, 
            { $set : {title: req.body.title}}
        );
        res.json(updatedPlayer);
    }
    catch(err){
        res.json({message: err })
    }
})

export default router;