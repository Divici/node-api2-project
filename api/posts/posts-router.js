// implement your posts router here
const express = require('express')
const PostModel = require('./posts-model');

const router = express.Router();

router.get('/', (req, res) =>{
    PostModel.find()
        .then((posts) => {
            res.json(posts)
        }).catch((err) => {
            res.status(500).json({message: "The posts information could not be retrieved"})
        });
})

router.get('/:id', async (req, res) =>{
    try {
        const post = await PostModel.findById(req.params.id);
        if(!post){
            res.status(404).json({message: "The post with the specified ID does not exist"})  
        }
        res.json(post);
    }
    catch (err) {
        res.status(500).json({message: "The post information could not be retrieved"})  
    }
})

router.post('/', (req, res) =>{

})

router.delete('/:id', (req, res) =>{

})

router.put('/:id', (req, res) =>{

})

router.get('/:id/comments', (req, res) =>{

})


module.exports = router;