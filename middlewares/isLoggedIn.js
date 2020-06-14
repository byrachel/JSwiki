
const isLoggedIn = {
    check: (req, res, next) => {
        if(req.user) {
            next()
        }
        else {
            res.status(401).json({message: 'unauthorized'})
        }
    }
}

module.exports = isLoggedIn;