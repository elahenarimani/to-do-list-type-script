import { createContext, useContext, useState } from "react";
import Input from "../input/Input";
import DateInput from "../dateInput/DateInput";
import Button from "../button/Button";
import { IoMdArrowDropdown } from "react-icons/io";
import Select, {
  components,
  DropdownIndicatorProps,
  StylesConfig,
} from "react-select";
import { DataContext } from "../../App";
// interface ISelectOption {
//   value: string | number | null;
//   label: string | null;
// }
// interface Idata {
//   id: number;
//   taskName: string | number;
//   priority: ISelectOption | null | string;
//   status: ISelectOption | null | string;
//   deadline: number | undefined;
//   taskDetails: string | number;
// }
interface IIdModeParameter {
  id: null | number;
  mode: string;
}
interface ISelectMobile {
  value: "Priority" | "Status" | "Deadline";
  label: string | null;
}
interface ISelectOption {
  value:  number | null;
  label: string | null;
}
interface IEditModalParameter {
  openEdite: boolean;
  setOpenEdit: Function;
  // data: Idata[];
  // setData: Function;
  idMode: IIdModeParameter;
  setIdMode: Function;
  taskName: string | number;
  priority: ISelectOption |null;
  status: ISelectOption |null;
  deadline: number;
  taskDetails: string | number;
}
function Edit2ModalMob({
  openEdite,
  setOpenEdit,
  // data,
  // setData,
  idMode,
  setIdMode,
  taskName,
  priority,
  status,
  deadline,
  taskDetails,
}: IEditModalParameter) {
  const DataUse = useContext(DataContext);
  const [inpvalEdit, setInpvalEdit] = useState<string | number>(taskName);
  const [selectedOptionPriorityEdit, setSelectedOptionPriorityEdite] = useState<
  ISelectOption 
>({
  value:   null,
  label: null
});
const [selectedOptionStatusEdit, setSelectedOptionStatusEdit] = useState<
  ISelectOption
>({
  value:   null,
  label: null
});
  const [inpvalDateEdit, setInpvalDateEdit] = useState<number>(deadline);
  const [inpvalDetailEdit, setInpvalDetailEdit] = useState<string | number>(
    taskDetails
  );
  const editId: null | number = idMode.id;

  interface IEditTodoParameter {
    editId: number | null;
    newTaskName: string | number;
    newPriority: ISelectOption |null ;
    newStatus: ISelectOption |null ;
    newDeadline: number ;
    newTaskDetails: string | number;
  }
  function editTodo({
    editId,
    newTaskName,
    newPriority,
    newStatus,
    newDeadline,
    newTaskDetails,
  }: IEditTodoParameter) {
    DataUse?.setData(
      DataUse?.data.map((item) => {
        if (item.id == editId) {
          item.taskName = newTaskName;
          item.priority = newPriority;
          item.status = newStatus;
          item.deadline = newDeadline;
          item.taskDetails = newTaskDetails;
          console.log(status);
          return item;
        } else {
          return item;
        }
      })
    );
    setIdMode({ id: null, mode: "add" });
  }

  const CaretDownIcon = () => {
    return (
      <button className="dropBTN">
        {" "}
        <IoMdArrowDropdown size={25} color={"#757575"} />
      </button>
    );
  };
  const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    );
  };
  const customStyles: StylesConfig = {
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    control: (provided, state) => ({
      ...provided,
      width: 120,
      height: 40,
      borderColor: "#757575",
    }),
    menu: (provided) => ({
      ...provided,
      textAlign: "left",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "inherit",
      backgroundColor: state.isSelected ? "#3091E7" : "transparent",
      "&:hover": {
        backgroundColor: "#A8A8A8",
        color: "inherit",
      },
    }),
  };
  function handleClose() {
    setOpenEdit(false);
  }
  if (!openEdite) return null;
  return (
    <div className="modal-wrapper w-[100vw] h-[100vh] fixed top-0 left-0 bg-white bg-opacity-[70%] flex items-center justify-center z-[3]">
      <div className="modal w-full  overflow-y-scroll  h-[500px]  bg-white rounded-[10px] pl-[30px] pr-[30px] pt-[20px] pb-[20px] ml-[25px] mr-[25px] ">
        <p className="text-[20px] text-left pb-[5px]">Edit task </p>
        <div className=" w-full h-full  grid grid-cols-1  gap-y-[50px] gap-x-[10px] pl-[10px] pr-[10px]   ">
          <div className="w-full    border-gray-500 rounded-[5px] border-[1px] h-[40px] pt-[4px]">
            <Input
              valueState={inpvalEdit}
              type="text"
              inputHandler={(e: any) => setInpvalEdit(e.target.value)}
              placeholder="Task Name"
              className="add-modal w-full h-full pl-[15px] text-[17px] border-none outline-none"
            />
          </div>
          {/* <div className="w-[400px] h-[40px] flex  flex-row justify-between items-center "> */}
          <div className="w-full ">
            <Select
              onChange={(e: any) => {
                setSelectedOptionPriorityEdite(e);
              }}
              defaultValue={
                editId
                  ? {
                      value: DataUse?.data
                        .find((item) => item.id === editId)
                        ?.priority?.toString(),
                      label: DataUse?.data.find((item) => item.id === editId)?.priority,
                    }
                  : null
              }
              placeholder={"Priority"}
              components={{ DropdownIndicator }}
              styles={customStyles}
              options={[
                { value: 1, label: "High" },
                { value: 2, label: "Medium" },
                { value: 3, label: "Low" },
              ]}
            />
          </div>

          <div className="w-full ">
            <Select
              onChange={(e: any) => {
                setSelectedOptionStatusEdit(e);
                console.log(e)
              }}
              defaultValue={
                editId
                  ? {
                      value: DataUse?.data
                        .find((item) => item.id === editId)
                        ?.status?.toString(),
                      label: DataUse?.data.find((item) => item.id === editId)?.status,
                    }
                  : null
              }
              placeholder={"status"}
              components={{ DropdownIndicator }}
              styles={customStyles}
              options={[
                { value: 1, label: "To do" },
                { value: 2, label: "Doing" },
                { value: 3, label: "Done" },
              ]}
            />
          </div>
          <div className=" w-full  h-[40px]  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
            <DateInput
              valueState={inpvalDateEdit}
              type="date"
              inputHandler={(e: any) => setInpvalDateEdit(e.target.value)}
              placeholder="Deadline"
              className="w-full h-full pl-[15px] text-[17px] border-none outline-none"
            />
          </div>
          <div className="w-full  h-[150px]   border-gray-500 border-[1px] rounded-[5px] flext justify-stert items-start pt-[4px]">
            <Input
              valueState={inpvalDetailEdit}
              type="text"
              inputHandler={(e: any) => setInpvalDetailEdit(e.target.value)}
              placeholder="Task Details (Optional)"
              className="taske-Details w-full h-full pl-[15px] text-[17px] border-none outline-none text-left text-top"
            />
          </div>
          <div className="w-full   h-[40px] flex justify-between items-center pb-[20px]">
            <Button
              onClickHandler={() => handleClose()}
              className=" text-[#3091E7] text-[14px] "
            >
              CANCEL
            </Button>
            <Button
              onClickHandler={() =>
                editTodo({
                  editId: idMode.id,
                  newTaskName: inpvalEdit,
                  newPriority: selectedOptionPriorityEdit,
                  newStatus: selectedOptionStatusEdit,
                  newDeadline: inpvalDateEdit,
                  newTaskDetails: inpvalDetailEdit,
                })
              }
              className="w-[70px] h-full rounded-[5px] bg-[#3091E7] text-[#ffffff] text-[14px] "
            >
              SAVE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Edit2ModalMob;
