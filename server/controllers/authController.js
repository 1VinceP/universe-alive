module.exports = {
   login: async (req, res) => {
      const { uid, remember } = req.body;
      const isAdmin = uid === process.env.ADMIN_1;

      req.session.uid = uid;
      req.session.remember = remember;
      req.session.isAdmin = isAdmin;
      res.sendStatus(200);
   },

   testSession: (req, res) => {
      if (req.session.checks) ++req.session.checks;
      else req.session.checks = 1;
      res.send(`${req.session.checks} checks`);
   },

   checkSession: (req, res) => {
      const { uid } = req.session;
      if (uid) res.status(200).send({ uid });
      else res.status(404).send({ uid: null });
   },

   logout: (req, res, cookieName) => {
      req.session = null;
      res.clearCookie(cookieName);
      res.status(200).send('Logout success.');
   },
};
