import passport from "passport";

export const passportError = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};


//Recibo un rol y establezco la capacidad del usuario
export const authorization = (role) =>{
    return async (req, res, next) =>{
        if(!req.user){
            return res.status(401).json({
                message: "unauthorized user"
            })
        }
        if(req.user.user.role != role){
            return res.status(403).json({
                message: "the user does not have the necessary permissions"
            })
        }
        next()
    }
}