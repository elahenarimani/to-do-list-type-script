import { useContext, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import DeleteModal from "../deleteModal/DeleteModal";
import Button from "../button/Button";
import ViewModal from "../viewModal/ViewModal";
import Edite2ModalDes from "../edite2ModalDes/Edite2ModalDes";
import "./tableDeaktop.css";
import { DataContext } from "../../App";
interface IchangeToViewbtnParameter {
  viewId: number;
}
interface ISelectOption {
  value: number | null;
  label: string | null;
}
interface IchangeToEditModeParameter {
  editId: number;
}
interface IHandleRemoveTodoButton {
  removeId: number;
}
interface IViewParameter {
  id: null | number;
}
interface IPriorityParameter {
  priority: ISelectOption | null;
}
interface IIdModeParameter {
  id: null | number;
  mode: string;
}
interface IRemoveTodoParameter {
  removeId: number;
}
interface ITableDesktopParameter {
  taskName: string | number;
  priority: ISelectOption | null;
  status: ISelectOption | null;
  deadline: number;
  taskDetails: string | number;
  id: number;
  removeId: number | null;
}
interface IStatusParameter {
  status: ISelectOption | null;
}
function TableDesktop({
  taskName,
  priority,
  status,
  deadline,
  taskDetails,
  id,
  removeId,
}: ITableDesktopParameter) {
  const [viewId, setViewId] = useState<IViewParameter>({
    id: null,
  });
  const [openEdite, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [viewOpen, setViewOpen] = useState<boolean>(false);
  const DataUse = useContext(DataContext);
  const [idMode, setIdMode] = useState<IIdModeParameter>({
    id: null,
    mode: "add",
  });
  function renderPriority({ priority }: IPriorityParameter) {
    if (priority?.label === "High") {
      return (
        <div className="h-[25px] w-[55px] bg-[#F44A3E] rounded-[20px] flex justify-center items-center">
          <p>High </p>
        </div>
      );
    } else if (priority?.label === "Medium") {
      return (
        <div className="h-[25px] w-[70px] bg-[#FFEC43] rounded-[20px] flex justify-center items-center">
          <p>Medium</p>
        </div>
      );
    } else if (priority?.label === "Low") {
      return (
        <div className="h-[25px] w-[50px] bg-[#A2A2A2] rounded-[20px] flex justify-center items-center">
          <p> Low</p>
        </div>
      );
    } else {
      return <p> </p>;
    }
  }
  function removeTodo({ removeId }: IRemoveTodoParameter) {
    DataUse?.setData(DataUse?.data.filter((item) => item.id !== removeId));
    console.log(removeId);
  }
  function handleButtonClick({ removeId }: IHandleRemoveTodoButton) {
    removeTodo({ removeId: removeId });
    handleClose();
  }
  function renderStatus({ status }: IStatusParameter) {
    if (status?.label === "To do") {
      return (
        <div className="h-[25px] w-[55px] bg-[#2A9AF3] rounded-[20px]  flex justify-center items-center">
          <p>To do </p>
        </div>
      );
    } else if (status?.label === "Doing") {
      return (
        <div className="h-[25px] w-[55px] bg-[#FF9C0A] rounded-[20px]  flex justify-center items-center">
          <p>Doing</p>
        </div>
      );
    } else if (status?.label === "Done") {
      return (
        <div className="h-[25px] w-[55px] bg-[#53B257] rounded-[20px]  flex justify-center items-center">
          <p>Done</p>
        </div>
      );
    } else {
      return <p></p>;
    }
  }
  function handleDeleteBTN() {
    setOpenDelete(true);
  }
  function handleClose() {
    setOpenDelete(false);
  }
  function changeToEdit2Mode({ editId }: IchangeToEditModeParameter) {
    setIdMode({ id: editId, mode: "edit" });
    setOpenEdit(true);
    console.log("test");
  }
  function changeToViewbtn({ viewId }: IchangeToViewbtnParameter) {
    setViewId({ id: viewId });
    setViewOpen(true);
    console.log(id);
  }
  function closeViewModal() {
    setViewOpen(false);
  }
  return (
    <tr className=" w-[25%] h-[40px] border-b-[2px] border-[#E0E0E0]">
      <td className=" border-r-[2px] border-[#E0E0E0] text-[#1F1F1F] text-left  pl-[15px]">
        {taskName}
      </td>
      <td className="w-[19%] text-white ">
        <div className="flex justify-center items-center">
          <p>{renderPriority({ priority })}</p>
        </div>
      </td>
      <td className=" text-white ">
        <div className="flex justify-center items-center">
          <p>{renderStatus({ status })}</p>
        </div>
      </td>
      <td className=" text-[#F44438] ">
        <div className="flex justify-center items-center">
          <p className="h-[25px] w-[85px] border-[1px] border-[#F44438] rounded-[20px] text-center">
            {deadline}
          </p>
        </div>
      </td>
      <td className=" h-[50px] pt-[15px] pb-[15px]">
        <div className=" flex justify-center items-center gap-[12px]">
          <Button onClickHandler={() => changeToViewbtn({ viewId: id })}>
            <IoEyeSharp color={"#757575"} />
          </Button>
          <Button onClickHandler={() => changeToEdit2Mode({ editId: id })}>
            <BsFillPencilFill color={"#757575"} />
          </Button>
          <Button onClickHandler={() => handleDeleteBTN()}>
            <FaTrash color={"#757575"} />
          </Button>
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
            <Edite2ModalDes
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
  );
}
export default TableDesktop;
