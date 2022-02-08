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
    const postBody = req.body;
    if(!postBody.title || !postBody.contents){
        res.status(400).json({ message: `Please provide title and contents for the post` });  
    }
    else{
        PostModel.insert(postBody)
            .then(({id}) => {
                return PostModel.findById(id)
            })
            .then(post =>{
                res.status(201).json(post);
            })
            .catch((err) => {
                res.status(500).json({ message: `There was an error while saving the post to the database` });
            });
    }
})

router.delete('/:id', async (req, res) =>{
    try {
        const post = await PostModel.findById(req.params.id)
        
        if(!post){
            res.status(404).json({ message: `The post with the specified ID does not exist` }); 
            return;
        }
        else{
            await PostModel.remove(req.params.id)
            res.json(post);
        }
    }
    catch(err){
            res.status(500).json({message: "The post could not be removed"});
        }
})

router.put('/:id', (req, res) =>{

})

router.get('/:id/comments', (req, res) =>{

})


module.exports = router;