import { IoMdArrowDropdown } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
function TableMobile() {
    return (
        <div>
            <table className="w-full flex flex-col justify-between ">
                <th className="border-b-[1px] border-[#ECECEC] pb-[8px] pl-[13px] pr-[13px]">
                    <p className="text-left text-[#747474] text-[10px]  mb-[1px]">Sort by</p>
                    <div className="flex justify-between items-center pl-[10px] border-b-[2px] border-[#E0E0E0] pb-[4px]">
                        <button className="w-[100px]  bg-[#E0E0E0] rounded-[10px] pt-[2px] pb-[2px]">Deadline</button>
                        <IoMdArrowDropdown color={"#757575"} />
                    </div>
                </th>
                <tr className="flex flex-col justify-between  border-b-[1px] border-[#ECECEC]  pl-[13px] pr-[13px]">
                    <td className="h-[50px] pt-[15px] pb-[15px]">
                        <div className="flex justify-between items-center ">
                            <p className="font-bold">Task</p>
                            <p>Call mom</p>
                        </div>
                    </td>
                    <td className="h-[50px] pt-[15px] pb-[15px]">
                        <div className="flex justify-between items-center ">
                            <p className="font-bold">Priority</p>
                            <p>Low</p>
                        </div>
                    </td>
                    <td className="h-[50px] pt-[15px] pb-[15px]">
                        <div className="flex justify-between items-center ">
                            <p className="font-bold">Status</p>
                            <p>Doing</p>
                        </div>
                    </td>
                    <td className="h-[50px] pt-[15px] pb-[15px]">
                        <div className="flex justify-between items-center ">
                            <p className="font-bold">Deadline</p>
                            <p>2024/02/09</p>
                        </div>
                    </td>
                    <td className="h-[50px] pt-[15px] pb-[15px]">
                        <div className="flex justify-between items-center ">
                            <p className="font-bold">Action</p>
                            <div className=" flex justify-between items-center gap-[12px]">
                                <button><IoEyeSharp color={'#757575'}/></button>
                                <button><BsFillPencilFill color={'#757575'}/></button>
                                <button><FaTrash color={'#757575'}/></button>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    )
}
export default TableMobile