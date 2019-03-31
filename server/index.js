const express = require('express');
const app = express();
const Router = express.Router();

const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require("cors");

const USERS = mongoose.model("users", require("./models/modelUsers"));

const Route = require('./route/route');
const Auth = require('./auth/auth');

const { PORT, SESSION_SECRET, DATABASE } = require("./config/keys");

/****************************************************************************/
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },

});

const upload = multer({ storage })
/******************************************************************************/

app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

/*********************************************/

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(DATABASE, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Databases connected");
    app.post('/api/taskWithPhoto', upload.single('taskImage'), async (req, res) => {
      const newdata = {
        taskNumber: Number(req.body.taskNumber),
        taskName: req.body.taskName,
        taskDescribe: req.body.taskDescribe,
        taskStatus: Boolean(req.body.taskStatus),
        Date: Date.now(),
        taskImage: req.file.path
      }
      const User = await USERS.findById(req.body._id);
      User.todolist = [newdata, ...User.todolist];
      User.number = User.number + 1;
      await User.save();
      res.status(201).json(newdata);
    })

    app.post('/api/taskOutPhoto', async (req, res) => {
      const newdata = {
        taskNumber: Number(req.body.taskNumber),
        taskName: req.body.taskName,
        taskDescribe: req.body.taskDescribe,
        taskStatus: Boolean(req.body.taskStatus),
        Date: Date.now(),
        taskImage: "dist\\images\\NoImageAvailable.jpg"
      }
      const User = await USERS.findById(req.body._id);
      User.todolist = [newdata, ...User.todolist];
      User.number = User.number + 1;
      await User.save();
      res.status(201).json(newdata);
    });

    Auth(USERS);
    Route(Router, USERS);
    app.use("/api/todolist", Router);

    app.listen(PORT || 3000, () => {
      console.log("Listening on port " + PORT);
    });
  })
  .catch(err => console.log(err));




