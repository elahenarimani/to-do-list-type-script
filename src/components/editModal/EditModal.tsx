import { useState} from "react";
import Select from "../select/Select2";
import Input from "../input/Input";
import DateInput from "../dateInput/DateInput";
import Button from "../button/Button";
interface Idata {
  id: number;
  taskName: string | number;
  priority: string;
  status: string;
  deadline: number;
  taskDetails: string | number;
}
interface IIdModeParameter {
  id: null | number;
  mode: string;
}
interface IEditModalParameter {
  openEdite: boolean;
  setOpenEdit: Function;
  data: Idata[];
  setData: Function;
  idMode: IIdModeParameter;
  setIdMode: Function;
  taskName: string | number;
  priority: string;
  status: string;
  deadline: number;
  taskDetails: string | number;
}
function EditModal({
  openEdite,
  setOpenEdit,
  data,
  setData,
  idMode,
  setIdMode,
  taskName,
  priority,
  status,
  deadline,
  taskDetails,
}: IEditModalParameter) {
  const [selectedOptionEdit, setSelectedOptionEdit] = useState<string>(status);
  const [selectedOption2Edit, setSelectedOption2Edit] =
    useState<string>(priority);
  const [inpvalEdit, setInpvalEdit] = useState<string | number>(taskName);
  const [inpvalDateEdit, setInpvalDateEdit] = useState<number>(deadline);
  
  const [inpvalDetailEdit, setInpvalDetailEdit] = useState<string | number>(
    taskDetails
  );
  
  interface IEditTodoParameter {
    editId: number | null;
    newInpval: string | number;
    newSelectedOption2: string;
    newSelectedOption: string;
    newInpvalDate: number;
    newInpvalDetail: string | number;
  }
  function editTodo({
    editId,
    newInpval,
    newSelectedOption2,
    newSelectedOption,
    newInpvalDate,
    newInpvalDetail,
  }: IEditTodoParameter) {
    setData(
      data.map((item) => {
        if (item.id == editId) {
          item.taskName = newInpval;
          item.priority = newSelectedOption2;
          item.status = newSelectedOption;
          item.deadline = newInpvalDate;
          item.taskDetails = newInpvalDetail;
          return item;
        } else {
          return item;
        }
      })
    );
    setIdMode({ id: null, mode: "add" });
  }
  function handleClose() {
    setOpenEdit(false);
  }
  {
    console.log(data);
  }
  if (!openEdite) return null;
  return (
    <div className="modal-wrapper w-[100vw] h-[100vh] fixed top-0 left-0 bg-white bg-opacity-[50%] flex items-center justify-center">
      <div className=" w-[500px] h-[500px]  bg-white rounded-[5px] pl-[30px] pr-[30px] pt-[20px] pb-[20px]">
        <p className="text-[20px] text-left pb-[5px]">Edit task</p>
        <div className="modal w-full h-full flex flex-col justify-around items-center pl-[10px] pr-[10px] gap-[1px] ">
          <div className="w-[400px] border-gray-500 rounded-[5px] border-[1px] h-[40px]">
            <Input
              valueState={inpvalEdit}
              type="text"
              inputHandler={(e: any) => setInpvalEdit(e.target.value)}
              placeholder="Task Name"
              className="w-full h-full pl-[15px] text-[17px] border-none outline-none"
            />
          </div>
          <div className="w-[400px] h-[40px] flex justify-between items-center ">
            <div className="priority-drop-down-container w-[120px] h-full  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
              <Select
                value={selectedOption2Edit}
                handleChange={(e: any) => setSelectedOption2Edit(e)}
                className="w-full h-full pl-[15px] text-[17px] border-none outline-none"
              >
                <>
                  <option value="" disabled>
                    Priority
                  </option>
                  <option value="1">High</option>
                  <option value="2">Medium</option>
                  <option value="3">Low</option>
                </>
              </Select>
            </div>
            <div className=" w-[120px] h-full  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
              <Select
                value={selectedOptionEdit}
                handleChange={(e: any) => setSelectedOptionEdit(e)}
                className="w-full h-full pl-[15px] text-[17px] border-none outline-none"
              >
                <>
                  <option value="" disabled>
                    Status
                  </option>
                  <option value="1">To do</option>
                  <option value="2">Doing</option>
                  <option value="3">Done</option>
                </>
              </Select>
            </div>
            <div className=" w-[120px] h-full border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
              <DateInput
                valueState={inpvalDateEdit}
                type="date"
                inputHandler={(e: any) => setInpvalDateEdit(e.target.value)}
                placeholder="Deadline"
                className="w-full h-full pl-[15px] text-[17px] border-none outline-none"
              />
            </div>
          </div>
          <div className="w-[400px] h-[150px] border-gray-500 border-[1px] rounded-[5px] flext justify-stert items-start">
            <Input
              valueState={inpvalDetailEdit}
              type="text"
              inputHandler={(e: any) => setInpvalDetailEdit(e.target.value)}
              placeholder="Task Details (Optional)"
              className="w-full h-full pl-[15px] text-[17px] border-none outline-none text-left text-top"
            />
          </div>
          <div className="w-[400px] h-[40px] flex justify-between items-center ">
            <Button
              onClickHandler={() => handleClose()}
              className=" text-[#3091E7] text-[17px] "
            >
              CANCEL
            </Button>
            <Button
              onClickHandler={() =>
                editTodo({
                  editId: idMode.id,
                  newInpval: inpvalEdit,
                  newSelectedOption2: selectedOption2Edit,
                  newSelectedOption: selectedOptionEdit,
                  newInpvalDate: inpvalDateEdit,
                  newInpvalDetail: inpvalDetailEdit,
                })
              }
              className="w-[70px] h-full rounded-[5px] bg-[#3091E7] text-[#ffffff] text-[17px]"
            >
              SAVE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditModal;
