export const CREATE = "CREATE";
export const ADDTASK = "ADDTASK";
export const ENTERID = "ENTERID";
export const SetUSER = (obj) => ({ type: CREATE, payload: obj });
export const SetID = (st) => ({ type: ENTERID, payload: st });
export const AddTASK = (obj) => ({ type: ADDTASK, payload: obj });




