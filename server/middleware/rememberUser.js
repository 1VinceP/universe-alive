module.exports = (req, _, next) => {
   if (req.session.remember) req.sessionOptions.maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days
   next();
};
