import express, { Router } from 'express';
import ensureAuthenticated from '../middlewares/Auth.js';
const route = express.Router();

route.get('/', ensureAuthenticated, (req,res) => {
    console.log('-------logged in user details-------',req.user)
    res.status(200).json(
        [
        {
        name: "mobile",
        price: 10000
        },
        {
        name: "TV",
        price: 20000
        }
    
    ]
    )
})

export default route;