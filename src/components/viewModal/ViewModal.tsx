import { useRef, useEffect } from "react";
interface IViewModalParameter {
  taskName: string | number;
  priority: string;
  status: string;
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
    <div className="modal-wrapper w-[100vw] h-[100vh] fixed top-0 left-0 bg-white bg-opacity-[50%] flex items-center justify-center">
      <div
        className=" w-[500px] h-[500px]  bg-white rounded-[5px] pl-[30px] pr-[30px] pt-[20px] pb-[20px]"
        ref={modalRef}
      >
        <p className="text-[20px] text-left pb-[5px]">View task</p>
        <div className="modal w-full h-full flex flex-col justify-around items-center pl-[10px] pr-[10px] gap-[1px] ">
          <div className="w-[400px] border-gray-500 rounded-[5px] border-[1px] h-[40px]">
            <p className="w-full h-full pl-[15px] text-[17px] ">{taskName}</p>
          </div>
          <div className="w-[400px] h-[40px] flex justify-between items-center ">
            <div className="priority-drop-down-container w-[120px] h-full  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
              <p className="w-full h-full pl-[15px] text-[17px] border-none outline-none">
                {priority}
              </p>
            </div>
            <div className=" w-[120px] h-full  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
              <p className="w-full h-full pl-[15px] text-[17px] ">{status}</p>
            </div>
            <div className=" w-[120px] h-full border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
              <p className="w-full h-full pl-[15px] text-[17px] ">{deadline}</p>
            </div>
          </div>
          <div className="w-[400px] h-[150px] border-gray-500 border-[1px] rounded-[5px] flext justify-stert items-start">
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
