module.exports = (req, _, next) => {
   console.log('request: ', req.url);
   next();
};
