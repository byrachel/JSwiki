
function isLoggedIn(req,res,next) {
    if(req.user) {
        return next()}
    else {
        res.status(401).json({message: 'unauthorized'})
    }
}

module.exports = isLoggedIn;