import React from 'react';
import logo from './logo.svg';
import './App.css';
import { VscChecklist } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa6";
import { TbPencilPlus } from "react-icons/tb";
import TableMobile from './components/tableMobile/TableMobile';
import TableDesktop  from './components/tableDesktop/TableDesktop';
import Aaaa from './components/aaaa/Aaaa';
function App() {
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
          <div>
            <FaFilter />
          </div>
          <div>
            <TbPencilPlus />
          </div>
        </div>
      </header>
      <main className='w-full h-full'>
        {/* <TableMobile/> */}
        {/* <TableDesktop/> */}
       <Aaaa/>
      </main>
    </div>
  );
}

export default App;
