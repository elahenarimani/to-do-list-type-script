import { useRef, useEffect } from "react";
interface ISelectOption {
  value: string | number | null;
  label: string | null;
}
interface IViewModalParameter {
  taskName: string | number;
  // priority: string;
  // status: string;
  priority: ISelectOption | null | string;
  status: ISelectOption | null | string;
  deadline: number;
  taskDetails: string | number;
  viewOpen: boolean;
  setViewOpen: Function;
  closeViewModal: Function;
}
function ViewModal({
  taskName,
  priority,
  status,
  deadline,
  taskDetails,
  viewOpen,
  closeViewModal,
}: IViewModalParameter) {
  const modalRef = useRef<any>();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeViewModal();
    }
  };
  if (!viewOpen) return null;
  return (
    <div className="modal-wrapper w-[100vw] h-[100vh] fixed top-0 left-0 bg-white bg-opacity-[70%] flex items-center justify-center z-10">
      <div
        className="modal w-full md:w-[500px] overflow-y-scroll overflow-x-hidden md:overflow-y-hidden h-[500px]  bg-white rounded-[10px] pl-[30px] pr-[30px] pt-[20px] pb-[20px] ml-[25px] mr-[25px] "
        ref={modalRef}
      >
        <p className="text-[20px] text-left pb-[5px]">View task</p>
        <div className=" w-full h-full  grid grid-cols-1 md:grid-cols-3 gap-y-[50px] gap-x-[10px] pl-[10px] pr-[10px]   ">
          <div className="w-full md:w-[400px]  md:col-start-1 md:col-end-4 border-gray-500 rounded-[5px] border-[1px] h-[40px]">
            <p className="w-full h-full text-left pl-[15px] text-[17px] ">
              {taskName}
            </p>
          </div>

          {/* <div className="w-[400px] h-[40px] flex justify-between items-center "> */}
          <div className="priority-drop-down-container w-full md:w-[120px] h-[40px]  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
            <p className="w-full h-full pl-[15px] text-[17px] border-none outline-none text-left">
              {priority
                ? typeof priority === "string"
                  ? priority
                  : priority?.label || ""
                : "No priority"}
            </p>
          </div>
          <div className=" w-full md:w-[120px] h-[40px]  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
            <p className="w-full h-full pl-[15px] text-[17px] text-left">
              {status
                ? typeof status === "string"
                  ? status
                  : status?.label || ""
                : "No priority"}
            </p>
          </div>
          <div className=" w-full md:w-[120px] h-[40px]  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
            <p className="w-full h-full pl-[15px] text-[17px] text-left ">
              {deadline}
            </p>
          </div>
          {/* </div> */}
          <div className="w-full md:w-[400px] h-[150px] md:col-start-1 md:col-end-4 border-gray-500 border-[1px] rounded-[5px] flext justify-stert items-start">
            <p className="w-full h-full pl-[15px] text-[17px]  text-left text-top">
              {taskDetails}
            </p>
          </div>
          <div className="w-[400px] h-[40px] flex justify-between items-center "></div>
        </div>
      </div>
    </div>
  );
}
export default ViewModal;
