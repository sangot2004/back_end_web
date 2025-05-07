const delay = (req, res, next) => {
    setTimeout(() => {
        if(req.headers.authorrization){
            const token = req.headers.authorrization.split(' ')[1];
            console.log('token: ', token);
        }
        next()
    }, 3000)
}

module.exports = delay;