import './tableDeaktop.css'
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { useState } from 'react';
import DeleteModal from '../DeleteModal/DeleteModal'
interface Idata{
  id:number
  taskName:string | number
  priority:number
  status:number
  deadline:number
  taskDetails:string | number
}
interface ITableDesktopParameter {
  data: Idata[] 
  setData :Function
  taskName : string | number
  priority : number
  status : number
  deadline :number
  taskDetails :string | number
  
  id :number
  todoId :number
}
function TableDesktop({data, setData ,taskName , priority ,  status , deadline , taskDetails , id ,todoId}:ITableDesktopParameter) {
  const [open , setOpen] = useState<boolean>(false)
  interface IPriorityParameter{
    priority : number
  }
  function renderPriority({priority} : IPriorityParameter ){
    if( priority ==1){
      return <p className='h-[25px] w-[55px] bg-[#F44A3E] rounded-[20px]' >High </p>;
     }else if(priority == 2){
      return <p className='h-[25px] w-[70px] bg-[#FFEC43] rounded-[20px]'>Medium</p>;   
     } else{
     return  <p className='h-[25px] w-[50px] bg-[#A2A2A2] rounded-[20px]'> Low</p>;
    }
  }
  interface IRemoveTodoParameter{
    todoId : number
  }
  console.log(todoId)
  function removeTodo({todoId} : IRemoveTodoParameter){
   setData(data.filter(item => item.id != todoId))
   console.log(todoId)
  }
  interface IHandleRemoveTodoButton {
    todoId :number 
  }
  function handleButtonClick({todoId}:IHandleRemoveTodoButton){
    removeTodo({todoId:todoId}) 
    handleClose()
  }
  interface IStatusParameter{
   status : number
  }
  function renderStatus({status} : IStatusParameter){
    if( status ==1){
      return <p className='h-[25px] w-[55px] bg-[#2A9AF3] rounded-[20px]' >To do </p>;
     }else if( status == 2){
      return <p className='h-[25px] w-[55px] bg-[#FF9C0A] rounded-[20px]'>Doing</p>;   
     } else{
     return  <p className='h-[25px] w-[55px] bg-[#53B257] rounded-[20px]'>Done</p>;
    }
  }
  function handleOpen(){
    setOpen(true)
    
  }
  function handleClose(){
    setOpen(false)
  }
  return (
    
        <tr className="to-do-wrapper w-[25%] h-[40px] border-b-[2px] border-[#E0E0E0]">
          
          <td className="border-r-[2px] border-[#E0E0E0] text-[#1F1F1F] text-left  pl-[15px]">{taskName}</td>
          <td className="text-white ">
            <div className='flex justify-center items-center'>
             <p >{renderPriority({priority})}</p>
            </div>
          </td>
          <td className="text-white">
            <div className='flex justify-center items-center'>
                <p >{renderStatus({status})}</p>
            </div>
          </td>
          <td className="text-[#F44438]">
            <div className='flex justify-center items-center'>
            <p className='h-[25px] w-[85px] border-[1px] border-[#F44438] rounded-[20px]'>{deadline}</p>
            </div>
          </td>
          <td className="h-[50px] pt-[15px] pb-[15px]" >
            <div className=" flex justify-center items-center gap-[12px]">
              <button>
                <IoEyeSharp color={'#757575'} />
              </button>
              <button>
                <BsFillPencilFill color={'#757575'} />
              </button>
              {/* <button onClick={() => handleButtonClick({todoId:id}) }> 
            
                <FaTrash color={'#757575'} />
              </button> */}
              <button onClick={() => handleOpen() }> 
                <FaTrash color={'#757575'} />
              </button>
             
            </div>
          </td>
          <DeleteModal  open={open} todoId={todoId} id={id} handleButtonClick={handleButtonClick} onClose={handleClose}/>
        </tr> 
        
  )
  }
export default TableDesktop