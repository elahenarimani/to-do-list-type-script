import React, { useState } from "react";
import { TbPencilPlus } from "react-icons/tb";
import { FaFilter } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { VscChecklist } from "react-icons/vsc";
import Button from "../button/Button";
import Input from "../input/Input";
import AddModalDes from "../addModalDes/AddModalDes";
import "./desktopHeader.css";
interface IDesHeader {
  search: string | number;
  setSearch: Function;
}
const DesktopHeader = ({ search, setSearch }: IDesHeader) => {
  const [openFilterToDo, setOpenFilterToDo] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  function filterToDoHandler() {
    setOpenFilterToDo(true);
  }
  function handleOpen() {
    setOpenAddModal(true);
  }
  return (
    <div>
      <div className="header-wrapper-des  w-full h-[50px] flex flex-row justify-between items-center gap-[20px]  bg-[#6200EA] pl-[20px] pr-[20px] text-[#FFFFFF]">
        <div className="header-left-des basis-auto shrink whitespace-nowrap overflow-hidden text-ellipsis min-w-[80px]! h-full flex justify-between items-center gap-[5px]">
          <div>
            <VscChecklist size={20} />
          </div>
          <div className="my-to-do-wrapper ">
            <p className="truncate w-full text-[20px]"> My To-Do Tasks </p>
          </div>
          <ul></ul>
        </div>
        <div className="header-right-des h-full  flex justify-between items-center gap-[20px]  bg-[#6200EA]">
          <div className="search-wrapper-des h-[30px] max-w-[250px] flex justify-between items-center  border-[2px] border-gray-400 border-solid rounded-[5px] pl-[7px] pr-[7px]">
            <Input
              className="w-full h-full bg-[#6200EA] border-none outline-none pb-[4px]"
              placeholder="Search"
              valueState={search}
              inputHandler={(e: any) => setSearch(e.target.value)}
              type="text"
            />
            <div>
              <CiSearch size={20} />
            </div>
          </div>
          {/* <Button onClickHandler={() => filterToDoHandler()}>
            <FaFilter size={20} />
          </Button> */}
          <Button onClickHandler={() => handleOpen()}>
            <TbPencilPlus size={20} />
          </Button>
        </div>
      </div>
      <div className="hidden md:block">
        <AddModalDes
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
        />
      </div>
    </div>
  );
};
export default DesktopHeader;
