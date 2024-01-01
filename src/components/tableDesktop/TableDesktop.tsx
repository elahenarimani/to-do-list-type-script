import './tableDeaktop.css'
import { FaArrowUp } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
function TableDesktop() {
  return (
    <div className='w-full'>
      <table className="w-full h-full  ">
        <tr className="w-full h-[50px] border-b-[2px] border-[#E0E0E0]">
          <th className="w-[25%] text-left h-full text-[#666666] border-r-[2px] border-[#E0E0E0] pl-[15px]">Task</th>
          <th className='text-center h-full'>
            <div className="flex  justify-center gap-[2px] items-center">
              <p className=" text-[#666666]">Priority</p>
              <FaArrowUp />
            </div>
          </th >
          <th >
            <div className="status   flex  justify-center gap-[2px] items-center">
              <p className=" text-[#666666]">Status</p>
              <FaArrowUp />
            </div>
          </th>
          <th >
            <div className="deadline  flex justify-center gap-[2px] items-center">
              <p className=" text-[#666666]">Deadline</p>
              <FaArrowUp />
            </div>
          </th>
          <th className="  text-center text-[#666666]  ">Action</th>
        </tr>
        <tr className="to-do-wrapper w-[25%] h-[40px] border-b-[2px] border-[#E0E0E0]">
          <td className="border-r-[2px] border-[#E0E0E0] text-[#1F1F1F] text-left  pl-[15px]">Call mom</td>
          <td className="text-white ">
            <div className='flex justify-center items-center'>
             <p className='h-[25px] w-[50px] bg-[#A2A2A2] rounded-[20px]'>High</p>
            </div>
          </td>
          <td className="text-white">
            <div className='flex justify-center items-center'>
                <p className='h-[25px] w-[62px] bg-[#FF9C0A] rounded-[20px]'>Doing</p>
            </div>
          </td>
          <td className="text-[#F44438]">
            <div className='flex justify-center items-center'>
            <p className='h-[25px] w-[85px] border-[1px] border-[#F44438] rounded-[20px]'>2021/02/04</p>
            </div>
          </td>
          <td className="h-[50px] pt-[15px] pb-[15px]" >
            <div className=" flex justify-center items-center gap-[12px]">
              <button><IoEyeSharp color={'#757575'} /></button>
              <button><BsFillPencilFill color={'#757575'} /></button>
              <button><FaTrash color={'#757575'} /></button>
            </div>
          </td>
        </tr>

      </table>

    </div>
  )
}
export default TableDesktop