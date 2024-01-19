import './tableDeaktop.css'
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
interface Idata{
  id:number
  taskName:string | number
  priority:string 
  status:string
  deadline:number
  taskDetails:string | number
}
interface ITableDesktopParameter {
  data: Idata[] 
  setData :Function
  taskName : string | number
  priority : string
  status : string
  deadline :number
  taskDetails :string | number
}
function TableDesktop({data, setData , taskDetails , taskName , priority , status , deadline }:ITableDesktopParameter) {
  return (
    
        <tr className="to-do-wrapper w-[25%] h-[40px] border-b-[2px] border-[#E0E0E0]">
          <td className="border-r-[2px] border-[#E0E0E0] text-[#1F1F1F] text-left  pl-[15px]">{taskName}</td>
          <td className="text-white ">
            <div className='flex justify-center items-center'>
             <p className='h-[25px] w-[50px] bg-[#A2A2A2] rounded-[20px]'>{priority}</p>
            </div>
          </td>
          <td className="text-white">
            <div className='flex justify-center items-center'>
                <p className='h-[25px] w-[62px] bg-[#FF9C0A] rounded-[20px]'>{status}</p>
            </div>
          </td>
          <td className="text-[#F44438]">
            <div className='flex justify-center items-center'>
            <p className='h-[25px] w-[85px] border-[1px] border-[#F44438] rounded-[20px]'>{deadline}</p>
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
    
  )
}
export default TableDesktop