import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from "react-icons/bs";
import { useEffect , useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { IoMdArrowDropdown , } from "react-icons/io";
import Select, {
  components,
  DropdownIndicatorProps,
  StylesConfig,
} from "react-select";

import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../editModal/EditModal";
import Button from "../button/Button";
import ViewModal from "../viewModal/ViewModal";
import Edite2Modal from "../edite2Modal/Edite2Modal";
import { DataContext } from "../../App";
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
interface ITableMobileParameter {
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
  interface ISelectedData {
    value: string | number | null;
    label: string | null;
  }
  const [openEdite, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [viewOpen, setViewOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<string | null>(null);
  interface IIdModeParameter {
    id: null | number;
    mode: string;
  }
  const [idMode, setIdMode] = useState<IIdModeParameter>({
    id: null,
    mode: "add",
  });
  const DataUse = useContext(DataContext);
  
  interface IViewParameter {
    id: null | number;
  }
  const [viewId, setViewId] = useState<IViewParameter>({
    id: null,
  });

  interface IPriorityParameter {
    priority: ISelectOption | null | string;
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
 
  interface IStatusParameter {
    status: ISelectOption | null | string;
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

  const CaretDownIcon = () => {
    
    return (
      <button className="dropBTN">
        {" "}
        <IoMdArrowDropdown size={25} color={"#757575"} />
      </button>
    );
  };
  const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => {
    console.log(selectedData)
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
       
    );
  };
  const formatOptionLabel = ({ label }: { label: string }) => (
   
    <div style={{ textAlign: 'left' }}>{label}</div>
  );
  const customStyles: StylesConfig = {
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    control: (provided, state) => ({
      ...provided,
      width: '100%',
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
  
  // function sortData(sortBy: string | null){
  //   if (!sortBy) return;
  //   let sortedData:Idata[] = [...data];
  //   console.log( sortedData?.priority)
  //   switch (sortBy) {
  //     case 'Priority':
  //       sortedData.sort((a, b) => {
          
      
  //         if (data.priority === "High") {
  //           return a.priority === b.priority ? 0 : a.priority === 'High' ? -1 : 1;
  //         } else if (DataUse?.data.priority === 'Medium') {
  //           return a.priority === b.priority ? 0 : a.priority === 'Medium' ? -1 : 1;
  //         } else if (DataUse?.data?.priority === 'Low') {
  //           return a.priority === b.priority ? 0 : a.priority === 'Low' ? -1 : 1;
  //         }
  //         return 0;
  //       });
  //       break;
  //     case 'Status':
  //       const statusOrder: { [key: string]: number } = { 'Doing': 1, 'Done': 2, 'To do': 3 };
  //       sortedData.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  //       break;
  //     case 'Deadline':
  //       sortedData.sort((a, b) => a.deadline - b.deadline);
  //       break;
  //     default:
  //       break;
  //   }


  return (
    <div>
      <table className="w-full flex flex-col justify-between ">
        <th className="border-b-[1px] border-[#ECECEC] pb-[8px] pl-[13px] pr-[13px]">
          <p className="text-left text-[#747474] text-[10px]  mb-[1px]">
            Sort by
          </p>
          <div className="w-full md:hidden">
            <Select
              onChange={(e: any) => {
                setSelectedData(e.label);
                console.log(e.label);
              }}
              placeholder={<div style={{ textAlign: 'left' }}>Deadline</div>}
              components={{ DropdownIndicator }}
              styles={customStyles}
              options={[
                { value: 1, label: "Priority" },
                { value: 2, label: "Status" },
                { value: 3, label: "Deadline" },
              ]}
            />
            <ul>
       
      </ul>
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
