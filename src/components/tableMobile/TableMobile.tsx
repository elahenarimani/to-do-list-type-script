import { IoMdArrowDropdown } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

// import { IoEyeSharp } from "react-icons/io5";
// import { BsFillPencilFill } from "react-icons/bs";
// import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../editModal/EditModal";
import Button from "../button/Button";
import ViewModal from "../viewModal/ViewModal";
import Edite2Modal from "../edite2Modal/Edite2Modal";
interface Idata {
  id: number;
  taskName: string | number;
  priority: string;
  status: string;
  deadline: number;
  taskDetails: string | number;
}
interface ITableMobileParameter {
  data: Idata[];
  setData: Function;
  taskName: string | number;
  priority: string;
  status: string;
  deadline: number;
  taskDetails: string | number;
  id: number;
  removeId: number;
}
function TableMobile({ data,
  setData,
  taskName,
  priority,
  status,
  deadline,
  taskDetails,
  id,
  removeId,
}: ITableMobileParameter)  {
  const [openEdite, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [viewOpen, setViewOpen] = useState<boolean>(false);
  interface IIdModeParameter {
    id: null | number;
    mode: string;
  }
  const [idMode, setIdMode] = useState<IIdModeParameter>({
    id: null,
    mode: "add",
  });
  // const [idMode, setIdMode] = useState<IIdModeParameter>({
  //   id: null,
  //   mode: "add",
  // });
  interface IViewParameter {
    id: null | number;
  }
  const [viewId, setViewId] = useState<IViewParameter>({
    id: null,
  });

  interface IPriorityParameter {
    priority: number | string;
  }
  function renderPriority({ priority }: IPriorityParameter) {
    if (priority === "High") {
      return (
        <p className="h-[25px] w-[55px] bg-[#F44A3E] rounded-[20px]">High </p>
      );
    } else if (priority === "Medium") {
      return (
        <p className="h-[25px] w-[70px] bg-[#FFEC43] rounded-[20px]">Medium</p>
      );
    } else {
      return (
        <p className="h-[25px] w-[50px] bg-[#A2A2A2] rounded-[20px]"> Low</p>
      );
    }
  }
  interface IRemoveTodoParameter {
    removeId: number;
  }
  function removeTodo({ removeId }: IRemoveTodoParameter) {
    setData(data.filter((item) => item.id !== removeId));
    console.log(removeId);
  }
  interface IHandleRemoveTodoButton {
    removeId: number;
  }
  interface IchangeToEditModeParameter {
    id: null | number;
    mode: string;
  }
  // interface IchangeToEditModeParameter {
  //   editId: number;
  // }
  // function changeToEdit2Mode({ editId }: IchangeToEditModeParameter) {
  //   setIdMode({ id: editId, mode: "edit" });
  //   setOpenEdit(true);
  //   console.log("test");
  // }
  // const [idMode, setIdMode] = useState<IIdModeParameter>({
  //   id: null,
  //   mode: "add",
  // });
  // function handleButtonClick({ removeId }: IHandleRemoveTodoButton) {
  //   removeTodo({ removeId: removeId });
  //   handleClose();
  // }
  interface IStatusParameter {
    status: string | number;
  }
  function renderStatus({ status }: IStatusParameter) {
    if (status === "To do") {
      return (
        <p className="h-[25px] w-[55px] bg-[#2A9AF3] rounded-[20px]">To do </p>
      );
    } else if (status === "Doing" ) {
      return (
        <p className="h-[25px] w-[55px] bg-[#FF9C0A] rounded-[20px]">Doing</p>
      );
    } else {
      return (
        <p className="h-[25px] w-[55px] bg-[#53B257] rounded-[20px]">Done</p>
      );
    }
  }
  // function handleDeleteOpen() {
  //   setDeleteOpen(true);
  // }
  // function handleClose() {
  //   setDeleteOpen(false);
  // }
  // interface IchangeToEditModeParameter {
  //   editId: number;
  // }
  function changeToEditMode( editId : number) {
    setIdMode({ id: editId, mode: "edit" });
    setOpenEdit(true);
    console.log("test");
  }
  interface IchangeToViewbtnParameter {
    viewId: number;
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
  interface IHandleRemoveTodoButton {
    removeId: number;
  }
  function handleButtonClick({ removeId }: IHandleRemoveTodoButton) {
    removeTodo({ removeId: removeId });
    handleClose();
  }
  return (
    <div>
      <table className="w-full flex flex-col justify-between ">
        <th className="border-b-[1px] border-[#ECECEC] pb-[8px] pl-[13px] pr-[13px]">
          <p className="text-left text-[#747474] text-[10px]  mb-[1px]">
            Sort by
          </p>
          <div className="flex justify-between items-center pl-[10px] border-b-[2px] border-[#E0E0E0] pb-[4px]">
            <button className="w-[100px]  bg-[#E0E0E0] rounded-[10px] pt-[2px] pb-[2px]">
              Deadline
            </button>
            <IoMdArrowDropdown color={"#757575"} />
          </div>
        </th>
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
              <p>{renderPriority({ priority })}</p>
            </div>
          </td>
          <td className="h-[50px] pt-[15px] pb-[15px]">
            <div className="flex justify-between items-center ">
              <p className="font-bold">Status</p>
              <p>{renderStatus({ status })}</p>
            </div>
          </td>
          <td className="h-[50px] pt-[15px] pb-[15px]">
            <div className="flex justify-between items-center ">
              <p className="font-bold">Deadline</p>
              <p>{deadline}</p>
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
      {data.map((item) => {
        if (item.id == idMode.id)
          return (
            <Edite2Modal
              openEdite={openEdite}
              setOpenEdit={setOpenEdit}
              data={data}
              setData={setData}
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
      {data.map((item) => {
        if (item.id == viewId.id)
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
