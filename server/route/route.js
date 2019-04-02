const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function (router, USERS) {

  router.get('/', (req, res) => {
    res.status(200).json({ _id: "" });
  });


  router.post('/login', passport.authenticate('local', { failureRedirect: '/api/todolist' }), (req, res) => {
    const answer = { _id: req.user._id, username: req.user.username, todolist: req.user.todolist, number: req.user.number };
    res.status(200).json(answer);
  });


  router.post('/register', (req, res, next) => {
    USERS.findOne({ username: req.body.username }, function (err, user) {
      if (err) {
        next(err);
      } else if (user) {
        res.redirect('/api/todolist');
      } else {
        const hash = bcrypt.hashSync(req.body.password, 12);
        const data = {
          username: req.body.username,
          password: hash,
          todolist: [],
          number: 0,
          tasksKeyCount: 0
        };
        const newuser = new USERS(data);
        newuser.save().then(() => next(null, newuser)).catch((err) => res.redirect('/api/todolist'))
      }
    })
  },
    passport.authenticate('local', { failureRedirect: '/api/todolist' }),
    (req, res, next) => {
      res.status(200).json({ username: req.user.username, _id: req.user._id, todolist: [], number: 0 });
    }
  );

  router.use((req, res, next) => {
    res.status(404).json({ page: "Not Found" });
  });

}