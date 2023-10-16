"use strict"

const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

module.exports= {

    login: async (req, res)=>{

        const {email, password} = req.body

        if (email && password){

            const user = await User.findOne({email, password})

            if(user){

                res.send({
                    error: false,
                    message: "login succesfull",
                    token: {
                                access: jwt.sign(user.toJSON(), process.env.SECRET_KEY, { expiresIn: '10m' }),
                                refresh: jwt.sign({ _id: user._id, password: user.password }, process.env.SECRET_KEY, { expiresIn: '3d' }),
                            }
                })

            }else{
                res.errorStatusCode = 401
            throw new Error('Wrong email and password.')
            }


        } else {
            res.errorStatusCode = 401
            throw new Error('Please enter email and password.')

        }
    }
}