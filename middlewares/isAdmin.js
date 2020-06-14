const isAdmin = {
    check: (req, res, next) => {
        if(req.user) {
            if(req.user.admin) {
                next()
            }
        }
        else {
            res.status(401).json({message: 'unauthorized'})
        }
    }
}

module.exports = isAdmin;