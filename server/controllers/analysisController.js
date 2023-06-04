

const playedInfos = require('../models/playedInfos');
const mongoose = require("mongoose");
const Urls = require("../models/urls");


exports.getCount=(req,res)=>{
     const url = decodeURIComponent(req.query.url);

     const query = playedInfos.countDocuments({url:url});
     query.exec().then(counts=>{
          const result = {count:counts};
          res.json(result);
     })
}

exports.getResolution = (req, res)=>{
     const url = decodeURIComponent(req.query.url);
     console.log("url", url);
     const query = playedInfos.find({url:url}).select("-_id type width height bitrate");
     query.exec().then((result)=>{
          const data = {
               type:"",
               resolution:[],
               bitrate:[]
          }
          console.log(result);
          result.map((_,i)=>{
               data.type = result[i].type;
               resolution = `${result[i].width}x${result[i].height}`;
               data.resolution.push(resolution);
               data.bitrate.push(result[i].bitrate);
          })
          const processedData = {
               type:"",
               resolution:{},
               bitrate:{}
          }
          processedData.type = data.type;
          data.resolution.map((_,i)=>{
               if(processedData.resolution.hasOwnProperty(data.resolution[i])){
                    processedData.resolution[data.resolution[i]] +=1;
               }
               else{
                    processedData.resolution[data.resolution[i]] = 1;
               }
          })
          data.bitrate.map((_,i)=>{
               if(processedData.bitrate.hasOwnProperty(data.bitrate[i])){
                    processedData.bitrate[data.bitrate[i]] +=1;
               }
               else{
                    processedData.bitrate[data.bitrate[i]] = 1;
               }
          })
          res.json(processedData);
     })
}
