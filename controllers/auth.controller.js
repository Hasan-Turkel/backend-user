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
    },

    refresh: async (req, res)=>{

        const refreshToken = req.body?.token?.refresh

        if (refreshToken){

            jwt.verify(refreshToken, process.env.SECRET_KEY, async function(err, userData){

                if (userData){

                    const {_id, password} = userData

                    if(_id && password){

                        const user = await User.findOne({ _id })

                        if (user && user.password == password){

                            res.send({
                                error: false,
                                message: "refresh succesfull",
                                token: {
                                            access: jwt.sign(user.toJSON(), process.env.SECRET_KEY, { expiresIn: '10m' }),
                                            
                                        }
                            })

                        } else{
                            res.errorStatusCode = 401
                            throw new Error('Wrong id or password.')
                        }

                    }else{
                        res.errorStatusCode = 401
                        throw new Error('Please enter id and password.')
                    }


                } else{
                    
                    res.errorStatusCode = 401
                    throw err
                }
            })

        } else{
            res.errorStatusCode = 401
            throw new Error('Please enter token.refresh')
        }
  
}}