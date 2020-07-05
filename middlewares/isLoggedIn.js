const isLogged = {
    check: (req, res, next) => {
        if(req.user) {
            next()
        }
        else {
            res.status(401).json({ isLogged: false })
        }
    }
}

module.exports = isLogged;