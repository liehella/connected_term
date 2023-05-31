

const Urls = require('../models/urls');


exports.getUser = (req, res) => {
    const type = req.query.type;
    const query = Urls.find({type:type}).select("-_id url")
    query.exec().then((urls)=>{
        result = {urls:[]}
        urls.map((elem)=>{
            result.urls.push(elem.url);
        })
        res.json(result);
    });

};

