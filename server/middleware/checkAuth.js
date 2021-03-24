module.exports = (req, res, next) => {
   const { uid } = req.session;
   if (!uid) res.status(401).send('You are not authorized to access this endpoint.');
   else next();
};
