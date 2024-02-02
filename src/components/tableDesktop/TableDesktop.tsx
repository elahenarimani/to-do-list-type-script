import './tableDeaktop.css'
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { useState } from 'react';
import DeleteModal from '../DeleteModal/DeleteModal'
import EditModal from '../editModal/EditModal'
import Modal from '../modal/Modal'
import { Console } from 'console';
import Button from '../button/Button';
interface Idata {
  id: number
  taskName: string | number
  priority: string
  status: string
  deadline: number
  taskDetails: string | number
}
interface ITableDesktopParameter {
  data: Idata[] 
  setData :Function
  taskName : string | number
  priority : string
  status : string
  deadline :number
  taskDetails :string | number 
  id :number
  removeId :number
}
function TableDesktop({data, setData ,taskName , priority ,  status , deadline , taskDetails , id ,removeId}:ITableDesktopParameter) {
  const [open , setOpen] = useState<boolean>(false)
  const [openEdite , setOpenEdit] = useState<boolean>(false)
  const [deleteOpen , setDeleteOpen] = useState<boolean>(false)
  interface IIdModeParameter{
    id : null | number
    mode : string 
  }
  const [idMode , setIdMode] = useState<IIdModeParameter>({ id : null , mode:"add" })
  interface IPriorityParameter{
    priority : number | string
  }
  function renderPriority({priority} : IPriorityParameter ){
    if( priority ===1){
      return <p className='h-[25px] w-[55px] bg-[#F44A3E] rounded-[20px]' >High </p>;
     }else if(priority === 2){
      return <p className='h-[25px] w-[70px] bg-[#FFEC43] rounded-[20px]'>Medium</p>;   
     } else{
     return  <p className='h-[25px] w-[50px] bg-[#A2A2A2] rounded-[20px]'> Low</p>;
    }
  }
  interface IRemoveTodoParameter{
    removeId : number
  }
  // console.log(removeId)
  function removeTodo({removeId} : IRemoveTodoParameter){
   setData(data.filter(item => item.id !== removeId))
   console.log(removeId)
  }
  interface IHandleRemoveTodoButton {
    removeId :number 
  }
  function handleButtonClick({removeId}:IHandleRemoveTodoButton){
    removeTodo({removeId:removeId}) 
    handleClose()
  }
  interface IStatusParameter{
   status : string | number
  }
  function renderStatus({status} : IStatusParameter){
    if( status ===1){
      return <p className='h-[25px] w-[55px] bg-[#2A9AF3] rounded-[20px]' >To do </p>;
     }else if( status === 2){
      return <p className='h-[25px] w-[55px] bg-[#FF9C0A] rounded-[20px]'>Doing</p>;   
     } else{
     return  <p className='h-[25px] w-[55px] bg-[#53B257] rounded-[20px]'>Done</p>;
    }
  }
  function handleDeleteOpen(){
    setDeleteOpen(true)  
  }
  function handleClose(){
    setDeleteOpen(false)
  }
  interface IchangeToEditModeParameter{
    editId : number
   }
  function changeToEditMode({editId}:IchangeToEditModeParameter){
     setOpenEdit(true)
     setIdMode({ id : editId , mode:"edit"})
     console.log("test")
  }
  interface IhandleviewbtnParameter{
    viewId:number
  }
  function handleviewbtn({viewId}:IhandleviewbtnParameter){
    console.log(id)
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
              <Button onClickHandler={() => handleviewbtn({viewId:id})}>
                <IoEyeSharp  color={'#757575'} />
              </Button>
              <Button onClickHandler={() => changeToEditMode({editId:id})}>
                <BsFillPencilFill color={'#757575'} /> 
              </Button>

              <Button onClickHandler={() =>  handleDeleteOpen() }> 
                <FaTrash color={'#757575'} /> 
              </Button> 
            </div>
          </td>
          <DeleteModal  deleteOpen={deleteOpen} removeId={removeId} id={id} handleButtonClick={handleButtonClick} onClose={handleClose}/>
          < EditModal   data={data} setData={setData} idMode ={idMode}  setIdMode={setIdMode}/>
        
        </tr>      
  )
  }
export default TableDesktop