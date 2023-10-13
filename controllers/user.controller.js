"use strict"

const User = require("../models/user.model")

module.exports = {

    list : async (req, res) => {

        const data = await req.getModelList(User)
        res.status(200).send({
            error:false,
            count:data.length,
            result:data
        })

    },
    create : async (req, res) => {

        const data = await User.create(req.body)
        res.status(201).send({
            error: false,
            body: req.body,
            result: data,
        })
    },
    read : async (req, res) => {

        const data = await User.findOne({_id:req.params.id})
        res.status(200).send({
            error: false,
            result: data
        })
    },
    update : async (req, res) => {
        
        const data = await User.updateOne({id:req.params.id}, req.body, { runValidators: true })
        res.status(202).send({
            error: false,
            body: req.body,
            result: data, // update infos
            newData: await User.findOne({ _id: req.params.userId })
        })
    },
    delete : async (req, res) => {

        const data = await User.deleteOne({id:req.params.id})
        res.status(204).send({
            error: false,
            
        })
    },
}