const express = require('express');
const router = express.Router();
const CRUD_Controller = require("../controllers/grud_controller");

const upload = CRUD_Controller.UploadsFileForImage;
router.post('/removeTask', CRUD_Controller.RemoveTask);
router.post('/deleteTasks', CRUD_Controller.DeleteTasks);
router.post('/created/taskWithPhoto', upload.single('taskImage'), CRUD_Controller.CreateTaskWithPhoto);
router.post('/created/taskOutPhoto', CRUD_Controller.CreateTaskOutPhoto);
router.post('/updated/taskWithPhoto', upload.single('taskImage'), CRUD_Controller.UpdateTaskWithPhoto);
router.post('/updated/taskOutPhoto', CRUD_Controller.UpdateTaskOutPhoto);

module.exports = router;