export const CREATE = "CREATE";
export const ADDTASK = "ADDTASK";
export const ENTERID = "ENTERID";
export const REMOVETASK = "REMOVETASK";
export const UPDATETASK = "UPDATETASK";
export const DELETETASKS = "DELETETASKS";
export const SetUSER = (obj) => ({ type: CREATE, payload: obj });
export const SetID = (st) => ({ type: ENTERID, payload: st });
export const AddTASK = (obj) => ({ type: ADDTASK, payload: obj });
export const RemoveTASK = (int) => ({ type: REMOVETASK, payload: int });
export const UpdateTASK = (obj) => ({ type: UPDATETASK, payload: obj });
export const DeleteTASKS = () => ({ type: DELETETASKS });



