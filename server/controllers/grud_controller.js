const mongoose = require('mongoose');
const USERS = mongoose.model("users", require("../models/modelUsers"));
const fs = require("fs");
const multer = require('multer');

/****************************************************************************/
exports.UploadsFileForImage =
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads/');
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + file.originalname);
            },
        })
    });

/****************************************************************************/
exports.CreateTaskWithPhoto = async (req, res) => {
    const User = await USERS.findById(req.body._id);
    User.tasksKeyCount += 1;
    const newdata = {
        taskNumber: Number(req.body.taskNumber),
        taskName: req.body.taskName,
        taskDescribe: req.body.taskDescribe,
        taskStatus: req.body.taskStatus,
        Date: Date.now(),
        taskImage: req.file.path,
        taskKey: User.tasksKeyCount
    }
    User.todolist = [newdata, ...User.todolist];
    User.number += 1;
    await User.save();
    res.status(200).json(newdata);
};


/****************************************************************************/
exports.CreateTaskWithPhoto = async (req, res) => {
    const User = await USERS.findById(req.body._id);
    User.tasksKeyCount += 1;
    const newdata = {
        taskNumber: Number(req.body.taskNumber),
        taskName: req.body.taskName,
        taskDescribe: req.body.taskDescribe,
        taskStatus: req.body.taskStatus,
        Date: Date.now(),
        taskImage: req.file.path,
        taskKey: User.tasksKeyCount
    }
    User.todolist = [newdata, ...User.todolist];
    User.number += 1;
    await User.save();
    res.status(200).json(newdata);
};

/****************************************************************************/
exports.CreateTaskOutPhoto = async (req, res) => {
    const User = await USERS.findById(req.body._id);
    User.tasksKeyCount += 1;
    const newdata = {
        taskNumber: Number(req.body.taskNumber),
        taskName: req.body.taskName,
        taskDescribe: req.body.taskDescribe,
        taskStatus: req.body.taskStatus,
        Date: Date.now(),
        taskImage: "dist\\images\\NoImageAvailable.jpg",
        taskKey: User.tasksKeyCount
    }
    User.todolist = [newdata, ...User.todolist];
    User.number += 1;
    await User.save();
    res.status(200).json(newdata);
};

/****************************************************************************/
exports.RemoveTask = async (req, res) => {
    const User = await USERS.findById(req.body._id);
    User.todolist.forEach(function (item, index, object) {
        if (item.taskNumber === req.body.taskNumber) {
            object.splice(index, 1);
            if (item.taskImage.slice(0, 4) !== "dist") { fs.unlinkSync(item.taskImage); }
        }
    });
    await User.save();
    res.status(200).json({ message: "Task removed from DB" });
};
/****************************************************************************/
exports.UpdateTaskWithPhoto = async (req, res) => {
    if (req.body.oldImage.slice(0, 4) !== "dist") { fs.unlinkSync(req.body.oldImage); }
    const User = await USERS.findById(req.body._id);
    User.tasksKeyCount += 1;
    const newdata = {
        taskNumber: Number(req.body.taskNumber),
        taskName: req.body.taskName,
        taskDescribe: req.body.taskDescribe,
        taskStatus: req.body.taskStatus,
        Date: Number(req.body.Date),
        taskImage: req.file.path,
        taskKey: User.tasksKeyCount
    };
    User.todolist.forEach(function (item, index, object) {
        if (item.taskNumber === Number(req.body.taskNumber)) {
            object.splice(index, 1, newdata);
        }
    });
    await User.save();
    res.status(201).json(newdata);
};
/****************************************************************************/
exports.UpdateTaskOutPhoto = async (req, res) => {
    const User = await USERS.findById(req.body._id);
    User.tasksKeyCount += 1;
    const newdata = {
        taskNumber: Number(req.body.taskNumber),
        taskName: req.body.taskName,
        taskDescribe: req.body.taskDescribe,
        taskStatus: req.body.taskStatus,
        Date: Number(req.body.Date),
        taskImage: req.body.oldImage,
        taskKey: User.tasksKeyCount
    };
    User.todolist.forEach(function (item, index, object) {
        if (item.taskNumber === Number(req.body.taskNumber)) {
            object.splice(index, 1, newdata);
        }
    });
    await User.save();
    res.status(201).json(newdata);
};
/****************************************************************************/
exports.DeleteTasks = async (req, res) => {
    const User = await USERS.findById(req.body.Id);
    User.todolist.forEach((item) => {
        if (item.taskImage.slice(0, 4) !== "dist") { fs.unlinkSync(item.taskImage); }
    });
    User.number = 0;
    User.todolist = [];
    await User.save();
    res.status(200).json({ message: "Tasks deleted from DB" });
};
/****************************************************************************/

