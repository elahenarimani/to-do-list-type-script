import React, { useState } from 'react';
import './App.css';
import { VscChecklist } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa6";
import { TbPencilPlus } from "react-icons/tb";
import TableMobile from './components/tableMobile/TableMobile';
import TableDesktop from './components/tableDesktop/TableDesktop';
import { FaArrowUp } from "react-icons/fa";
import Button from './components/button/Button';
import Modal from './components/modal/Modal';
interface Idata {
  id: number
  taskName: string | number
  priority: string
  status: string
  deadline: number
  taskDetails: string | number
}
let  removeId:number
function App() {
  const [data, setData] = useState<Idata[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [test, setTest] = useState<any>("")
  function handleOpen() {
    setOpen(true)
    
    console.log("test")
  }
  function handleClose() {
    setOpen(false)
  }
  interface IIdModeParameter{
    id : null | number
    mode : string 
  }
  const [idMode , setIdMode] = useState<IIdModeParameter>({ id : null , mode:"add" })
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
          <Button onClickHandler={() => handleOpen()}>
            <TbPencilPlus />
          </Button>
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
                      <TableDesktop data={data} setData={setData} taskName={item.taskName} priority={item.priority} status={item.status} deadline={item.deadline} taskDetails={item.taskDetails}  id={item.id} removeId={removeId}/>
                      )
                    })}
                </table>
              </div>
              <Modal open={open}  onClose={handleClose} data={data} setData={setData} idMode={idMode} setIdMode={setIdMode} />
      </main>
    </div>
  );
}
export default App;
