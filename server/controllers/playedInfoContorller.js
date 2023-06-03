

const playedInfos = require('../models/playedInfos');
const mongoose = require("mongoose");
const Urls = require("../models/urls");


exports.postPlayedInfos = (req, res) => {
    const body = req.body;
    const regExUrl = new RegExp(body.url);
    const query = Urls.findOne({url:{"$regex":regExUrl}}).select("-_id type");
    query.exec().then((result)=>{
        if(result){
            body.type = result.type;
        }
    }).then(()=>{

        playedInfo = new playedInfos(body);
        delete playedInfo.__v;
        playedInfo.save()
            .then(()=>{
                console.log("Success")
            })
            .catch(err=>{
                console.log(err);
            });
        });
    res.send(200);
};

