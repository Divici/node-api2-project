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
    
    const {title, contents} = req.body;
    if(!title || !contents){
        res.status(400).json({ message: `Please provide title and contents for the post` });  
    }
    else{
        PostModel.findById(req.params.id)
            .then((data) => {
                if(!data){
                    res.status(404).json({ message: `The post with the specified ID does not exist` });
                }
                else{
                    return PostModel.update(req.params.id, req.body);
                }
            })
            .then(something=>{
                if(something){
                    return PostModel.findById(req.params.id)
                }
            })
            .then(post =>{
                if(post){
                    res.json(post)
                }
            })
            .catch((err) => {
                res.status(500).json({message: "The post information could not be modified" });
            });
    } 
})

router.get('/:id/comments', async (req, res) =>{
    try {
        const post = await PostModel.findById(req.params.id)
        
        if(!post){
            res.status(404).json({ message: `The post with the specified ID does not exist` }); 
            return;
        }
        else {
            const comments = await PostModel.findPostComments(req.params.id)
            res.json(comments)
        }
    } 
    catch (error) {
        res.status(500).json({message: "The comments information could not be retrieved" });
    }
})


module.exports = router;