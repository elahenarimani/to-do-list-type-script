import "./tableDeaktop.css";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import TableMobile from "../tableMobile/TableMobile"
import EditModal from "../editModal/EditModal";
import Button from "../button/Button";
import ViewModal from "../viewModal/ViewModal";
import Edite2Modal from "../edite2Modal/Edite2Modal"
interface ISelectOption {
  value: string | number | null;
  label: string | null;
}
interface Idata {
  id: number;
  taskName: string | number;
  // priority: string;
  // status: string;
  priority: ISelectOption | null | string;
  status: ISelectOption | null | string;
  deadline: number;
  taskDetails: string | number;
}
interface ITableDesktopParameter {
  data: Idata[];
  setData: Function;
  taskName: string | number;
  priority: ISelectOption | null | string;
  status: ISelectOption | null | string;
  deadline: number;
  taskDetails: string | number;
  id: number;
  removeId: number;
}
function TableDesktop({
  data,
  setData,
  taskName,
  priority,
  status,
  deadline,
  taskDetails,
  id,
  removeId,
}: ITableDesktopParameter) {
  interface IViewParameter {
    id: null | number;
  }
  const [viewId, setViewId] = useState<IViewParameter>({
    id: null,
  });
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
 
  
  interface IPriorityParameter {
    priority: ISelectOption | null | string;
  }
  function renderPriority({ priority }: IPriorityParameter) {
    if (priority === "High") {
      return (
        <div className="h-[25px] w-[55px] bg-[#F44A3E] rounded-[20px] flex justify-center items-center">
             <p >High </p>
        </div>
      
      );
    } else if (priority === "Medium") {
      return (
        <div className="h-[25px] w-[70px] bg-[#FFEC43] rounded-[20px] flex justify-center items-center">
              <p>Medium</p>
        </div>
       
      );
    } else if (priority === "Low"){
      return (
        <div  className="h-[25px] w-[50px] bg-[#A2A2A2] rounded-[20px] flex justify-center items-center">
             <p> Low</p>
        </div>
       
      );
    }else {
      return (
        <p> </p>
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
  function handleButtonClick({ removeId }: IHandleRemoveTodoButton) {
    removeTodo({ removeId: removeId });
    handleClose();
  }
  interface IStatusParameter {
    status: ISelectOption | null | string;
  }
  function renderStatus({ status }: IStatusParameter) {
    if (status === "To do") {
      return (
        <div className="h-[25px] w-[55px] bg-[#2A9AF3] rounded-[20px]  flex justify-center items-center">
           <p >To do </p>
        </div>
       
      );
    } else if (status === "Doing" ) {
      return (
        <div className="h-[25px] w-[55px] bg-[#FF9C0A] rounded-[20px]  flex justify-center items-center">
           <p >Doing</p>
        </div>
       
      );}
      else if (status === "Done" ) {
        return (
          <div className="h-[25px] w-[55px] bg-[#53B257] rounded-[20px]  flex justify-center items-center">
             <p >Done</p>
          </div>
         
        );} else {
      return (
        <p></p>
      );
    }
  }
  function handleDeleteBTN() {
    setOpenDelete(true);
  }
  function handleClose() {
    setOpenDelete(false);
  }
  interface IchangeToEditModeParameter {
    editId: number;
  }
  function changeToEdit2Mode({ editId }: IchangeToEditModeParameter) {
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
      {/* {data.map((item) => {
        if (item.id == idMode.id)
          return (
            <EditModal
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
      })} */}
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
  );
}
export default TableDesktop;
