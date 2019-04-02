import axios from 'axios';

export default function (file, obj) {
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        const formData = new FormData();
        formData.append('_id', obj._id);
        formData.append('taskImage', file);
        formData.append('taskNumber', obj.taskNumber);
        formData.append('oldImage', obj.oldImage);
        formData.append('Date', obj.Date);
        formData.append('taskName', obj.taskName);
        formData.append('taskDescribe', obj.taskDescribe);
        formData.append('taskStatus', obj.taskStatus);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return axios.post("http://localhost:5000/api/updated/taskWithPhoto", formData, config);
    }
    else {
        return axios.post("http://localhost:5000/api/updated/taskOutPhoto", obj);
    }
};