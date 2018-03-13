module.exports = function (req,res,next) {
  //check if user is authenticated
  if(!req.session.user){
      return res.status(401).json({
          message: "Authenticated is required"
      });
  }

  next();
};