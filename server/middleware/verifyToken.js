const jwt=require('jsonwebtoken');

//

exports.verifyToken=(req,res,next)=>{
    let token=req.query.token;
    jwt.verify(token,process.env.SEED,(err,dec)=>{
            if(err){
                return res.status(401).json({
                    ok:false,
                    err:{mess:'token is not valid'}
                });
            }
            req.usuario=dec.usuario;
            next();
    });
};


