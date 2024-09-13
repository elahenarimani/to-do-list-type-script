import React, { useState } from 'react'
import Button from '../button/Button'
import { TbPencilPlus } from 'react-icons/tb'
import { FaFilter } from 'react-icons/fa6'
import { CiSearch } from 'react-icons/ci'
import { VscChecklist } from 'react-icons/vsc'
import Input from '../input/Input'
import "./mobileHeader.css"
import AddModalMob from '../addModalMob/AddModalMob'
import { useContext } from 'react'
import { DataContext } from "../../App";
interface ISelectOption {
  value: string | number | null;
  label: string | null;
}
interface Idata {
  id: number;
  taskName: string | number;
  // priority: string;
  // status: string;
  priority: ISelectOption | null | string;
  status: ISelectOption | null | string;
  deadline: number;
  taskDetails: string | number;
}
interface ImodalParameter {
  // openAddModal: boolean;
  onClose: Function;
  data: Idata[];
  // idMode: IIdModeParameter;
  // setOpenAddModal: Function;
}
const MobileHeader = () => {
    const [search, setSearch] = useState<string | number>("");
    const [openFilterToDo, setOpenFilterToDo] = useState<boolean>(false);
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const DataUse = useContext(DataContext);
    function filterToDoHandler() {
        setOpenFilterToDo(true);
      }
      function handleOpen() {
        setOpenAddModal(true);
      }
  return (
    <div>
        <div className="header-wrapper-mob  w-full h-[50px] flex flex-row justify-between items-center gap-[20px]  bg-[#6200EA] pl-[20px] pr-[20px] text-[#FFFFFF]">
            <div className="header-left-mob basis-auto shrink whitespace-nowrap overflow-hidden text-ellipsis min-w-[80px]! h-full flex justify-between items-center gap-[5px]">
              <div>
                <VscChecklist size={20} />
              </div>
              <div className="my-to-do-wrapper ">
                <p className="truncate w-full text-[20px]"> My To-Do Tasks </p>
              </div>
              <ul></ul>
            </div>
            {/* </div> */}
            <div className="header-right-mob h-full  flex justify-between items-center gap-[20px]  bg-[#6200EA]">
              <div className="search-wrapper-mob h-[30px] max-w-[250px] flex justify-between items-center  border-[2px] border-gray-400 border-solid rounded-[5px] pl-[7px] pr-[7px]">
                <Input
                  className="w-full h-full bg-[#6200EA] border-none outline-none pb-[4px]"
                  placeholder="Search"
                  valueState={search}
                  inputHandler={(e: any) => setSearch(e.target.value)}
                  type="text"
                />
                <div className="">
                  <CiSearch size={20} />
                </div>
              </div>
              <Button onClickHandler={() => filterToDoHandler()}>
                <FaFilter size={20} />
              </Button>
              <Button onClickHandler={() => handleOpen()}>
                <TbPencilPlus size={20} />
              </Button>
            </div>
          </div>
          <div className="md:hidden">
         <AddModalMob
           openAddModal={openAddModal}
           setOpenAddModal={setOpenAddModal}
          //  idMode={idMode}
          //  setIdMode={setIdMode}
          />
         </div > 
    </div>
  )
}
export default MobileHeader
