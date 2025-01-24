import { useContext } from "react";
import { components, DropdownIndicatorProps, StylesConfig } from "react-select";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import DeleteModal from "../DeleteModal/DeleteModal";
import Button from "../button/Button";
import ViewModal from "../viewModal/ViewModal";
import Edit2ModalMob from "../edit2ModalMob/Edit2ModalMob";
import { DataContext } from "../../App";
interface ISelectOption {
  value: string | number | null;
  label: string | null;
}
interface Idata {
  id: number;
  taskName: string | number;
  priority: ISelectOption | null;
  status: ISelectOption | null;
  deadline: number;
  taskDetails: string | number;
}
interface IViewParameter {
  id: null | number;
}
interface IPriorityParameter {
  priority: ISelectOption | null;
}
interface IHandleRemoveTodoButton {
  removeId: number;
}
interface IRemoveTodoParameter {
  removeId: number;
}
interface IStatusParameter {
  status: ISelectOption | null;
}
interface IchangeToViewbtnParameter {
  viewId: number;
}
interface ITableMobileParameter {
  data: Idata[];
  setData: Function;
  taskName: string | number;
  priority: ISelectOption | null;
  status: ISelectOption | null;
  deadline: number;
  taskDetails: string | number;
  id: number;
  removeId: number | null;
}
interface IHandleRemoveTodoButton {
  removeId: number;
}
interface IIdModeParameter {
  id: null | number;
  mode: string;
}
function TableMobile({
  taskName,
  priority,
  status,
  deadline,
  taskDetails,
  id,
  removeId,
}: ITableMobileParameter) {
  const [openEdite, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [viewOpen, setViewOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<string | null>(null);
  const DataUse = useContext(DataContext);
  const [idMode, setIdMode] = useState<IIdModeParameter>({
    id: null,
    mode: "add",
  });
  const [viewId, setViewId] = useState<IViewParameter>({
    id: null,
  });
  function renderPriority({ priority }: IPriorityParameter) {
    if (priority?.label === "High") {
      return (
        <p className="h-[25px] w-[55px] bg-[#F44A3E] rounded-[20px]">High </p>
      );
    } else if (priority?.label === "Medium") {
      return (
        <p className="h-[25px] w-[70px] bg-[#FFEC43] rounded-[20px]">Medium</p>
      );
    } else {
      return (
        <p className="h-[25px] w-[50px] bg-[#A2A2A2] rounded-[20px]"> Low</p>
      );
    }
  }
  function removeTodo({ removeId }: IRemoveTodoParameter) {
    DataUse?.setData(DataUse?.data.filter((item) => item.id !== removeId));
    console.log(removeId);
  }
  function renderStatus({ status }: IStatusParameter) {
    if (status?.label === "To do") {
      return (
        <p className="h-[25px] w-[55px] bg-[#2A9AF3] rounded-[20px]">To do </p>
      );
    } else if (status?.label === "Doing") {
      return (
        <p className="h-[25px] w-[55px] bg-[#FF9C0A] rounded-[20px]">Doing</p>
      );
    } else {
      return (
        <p className="h-[25px] w-[55px] bg-[#53B257] rounded-[20px]">Done</p>
      );
    }
  }
  function changeToEditMode(editId: number) {
    setIdMode({ id: editId, mode: "edit" });
    setOpenEdit(true);
    console.log("test");
  }
  function changeToViewbtn({ viewId }: IchangeToViewbtnParameter) {
    setViewId({ id: viewId });
    setViewOpen(true);
    console.log(id);
  }
  function handleDeleteBTN() {
    setOpenDelete(true);
  }
  function handleClose() {
    setOpenDelete(false);
  }
  function closeViewModal() {
    setViewOpen(false);
  }
  function handleButtonClick({ removeId }: IHandleRemoveTodoButton) {
    removeTodo({ removeId: removeId });
    handleClose();
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
    console.log(selectedData);
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    );
  };
  const formatOptionLabel = ({ label }: { label: string }) => (
    <div style={{ textAlign: "left" }}>{label}</div>
  );
  const customStyles: StylesConfig = {
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    control: (provided, state) => ({
      ...provided,
      width: "100%",
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
  return (
    <div>
      <table className="w-full flex flex-col justify-between ">
        <th className=" pb-[8px] pl-[13px] pr-[13px]"></th>
        <tr className="w-full flex flex-col justify-between  border-b-[1px] border-[#ECECEC]  pl-[13px] pr-[13px]">
          <td className="h-[50px] pt-[15px] pb-[15px]">
            <div className="flex justify-between items-center ">
              <p className="font-bold">Task</p>
              <p> {taskName}</p>
            </div>
          </td>
          <td className="h-[50px] pt-[15px] pb-[15px]">
            <div className="flex justify-between items-center ">
              <p className="font-bold">Priority</p>
              <p className="text-center">{renderPriority({ priority })}</p>
            </div>
          </td>
          <td className="h-[50px] pt-[15px] pb-[15px]">
            <div className="flex justify-between items-center ">
              <p className="font-bold">Status</p>
              <p className="text-center">{renderStatus({ status })}</p>
            </div>
          </td>
          <td className="h-[50px] pt-[15px] pb-[15px]">
            <div className="flex justify-between items-center ">
              <p className="font-bold text-center">Deadline</p>
              <p className="h-[25px] w-[85px] border-[1px] border-[#F44438] rounded-[20px] text-center text-[#F44438]">
                {deadline}
              </p>
            </div>
          </td>
          <td className="h-[50px] pt-[15px] pb-[15px]">
            <div className="flex justify-between items-center ">
              <p className="font-bold">Action</p>
              <div className=" flex justify-between items-center gap-[12px]">
                <Button onClickHandler={() => changeToViewbtn({ viewId: id })}>
                  <IoEyeSharp color={"#757575"} />
                </Button>
                <Button onClickHandler={() => changeToEditMode(id)}>
                  <BsFillPencilFill color={"#757575"} />
                </Button>
                <Button onClickHandler={() => handleDeleteBTN()}>
                  <FaTrash color={"#757575"} />
                </Button>
              </div>
            </div>
          </td>
          <DeleteModal
            openDelete={openDelete}
            removeId={removeId}
            id={id}
            handleButtonClick={handleButtonClick}
            onClose={handleClose}
          />
          {DataUse?.data.map((item) => {
            if (item.id === idMode.id)
              return (
                <Edit2ModalMob
                  openEdite={openEdite}
                  setOpenEdit={setOpenEdit}
                  idMode={idMode}
                  setIdMode={setIdMode}
                  taskName={item.taskName}
                  priority={item.priority}
                  status={item.status}
                  deadline={item.deadline}
                  taskDetails={item.taskDetails}
                />
              );
          })}
          {DataUse?.data.map((item) => {
            if (item.id === viewId.id)
              return (
                <ViewModal
                  taskName={item.taskName}
                  priority={item.priority}
                  status={item.status}
                  deadline={item.deadline}
                  taskDetails={item.taskDetails}
                  viewOpen={viewOpen}
                  setViewOpen={setViewOpen}
                  closeViewModal={closeViewModal}
                />
              );
          })}
        </tr>
      </table>
    </div>
  );
}
export default TableMobile;
