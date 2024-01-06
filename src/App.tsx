import React, { useState } from 'react';
import './App.css';
import { VscChecklist } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa6";
import { TbPencilPlus } from "react-icons/tb";
import TableMobile from './components/tableMobile/TableMobile';
import TableDesktop  from './components/tableDesktop/TableDesktop';
import Modal from './components/modal/Modal';
import Select from './components/select/Select';

function App() {
  const [open , setOpen] = useState <boolean>(false)
  function handleOpen(){
    setOpen(true)
  }
  function handleClose(){
    setOpen(false)
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
            <input className='w-full h-full bg-[#6200EA] border-none outline-none' placeholder='Search'/>
            <div className=''><CiSearch /></div>
          </div>
          <button>
            <FaFilter />
          </button>
          <button  onClick={handleOpen}>
            <TbPencilPlus />  
          </button>
        </div>
      </header>
      <main className='w-full h-full'>
        {/* <TableMobile/> */}
        <TableDesktop/>
        <Modal open={open} onClose={handleClose} />
      </main>
    </div>
  );
}
export default App;
