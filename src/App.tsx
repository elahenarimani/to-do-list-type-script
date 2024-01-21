import React, { useState } from 'react';
import './App.css';
import { VscChecklist } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa6";
import { TbPencilPlus } from "react-icons/tb";
import TableMobile from './components/tableMobile/TableMobile';
import TableDesktop from './components/tableDesktop/TableDesktop';
import Modal from './components/modal/Modal';
import Select from './components/select/Select';
import { FaArrowUp } from "react-icons/fa";
interface Idata {
  id: number
  taskName: string | number
  priority: number
  status: number
  deadline: number
  taskDetails: string | number
}
let  todoId:number
function App() {
  const [data, setData] = useState<Idata[]>([])
  const [open, setOpen] = useState<boolean>(false)
  function handleOpen() {
    setOpen(true)
  }
  function handleClose() {
    setOpen(false)
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
    console.log(todoId)
  }
 
  return (
    <div className="App">
      <header className='w-full h-[50px] flex justify-between items-center gap-[20px] bg-[#6200EA] pl-[10px] pr-[10px] text-[#FFFFFF]'>
        <div className='min-w-[80px] flex justify-between items-center gap-[5px]'>
          <div>
            <VscChecklist />
          </div>
          <div>
            <p className='truncate min-w-[100px]'> My To-Do Tasks </p>
          </div>
        </div>
        <div className='max-w-[80%]  flex justify-between items-center gap-[10px]  bg-[#6200EA]'>
          <div className='search-wrapper  max-w-[200px] flex justify-between items-center  border-[2px] border-gray-400 border-solid rounded-[5px] pl-[7px] pr-[7px]' >
            <input className='w-full h-full bg-[#6200EA] border-none outline-none' placeholder='Search' />
            <div className=''><CiSearch /></div>
          </div>
          <button>
            <FaFilter />
          </button>
          <button onClick={handleOpen}>
            <TbPencilPlus />
          </button>
        </div>
      </header>
      <main className='w-full h-full'>
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
                  {data.map(item => {
                   return (
                      <TableDesktop data={data} setData={setData} taskName={item.taskName} priority={item.priority} status={item.status} deadline={item.deadline} taskDetails={item.taskDetails} handleButtonClick={handleButtonClick} id={item.id} todoId={todoId}/>
                      )
                    })}
                </table>
              </div>
        <Modal open={open} onClose={handleClose} data={data} setData={setData}  />  
      </main>
    </div>
  );
}
export default App;
