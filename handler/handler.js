exports = module.exports = (model)=>{
    return {
        insert: async (req,res)=>{
            let document;
            try{
                let doc = req.body;
                document = await model.insert(doc);
                res.send(document);
            } catch(e){
                res.send(e.message);
            }
        },
        findAll: async ( req, res ) => {
            let document;
            try {
                document = await model.findAll();
                res.send(document);
            } catch(e){
                res.send(e.message);
            }
        },
        findByAge: async ( req, res ) => {
            let document,
                params = req.params.age;
                console.log(req.params[age])
                try {
                    document = await model.findByAge();
                    res.send(document);
                } catch (e) {
                    res.send(e);
                }
        }
    }
}

exports['@singleton'] = true;
exports['@async'] = false
exports['@require'] = ['model/model']