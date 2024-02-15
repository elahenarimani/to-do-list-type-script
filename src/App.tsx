import  { useState } from "react";
import "./App.css";
import { VscChecklist } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa6";
import { TbPencilPlus } from "react-icons/tb";
import TableMobile from "./components/tableMobile/TableMobile";
import TableDesktop from "./components/tableDesktop/TableDesktop";
import { FaArrowUp } from "react-icons/fa";
import Button from "./components/button/Button";
import Modal from "./components/modal/Modal";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Select from 'react-select';
interface Idata {
  id: number;
  taskName: string | number;
  priority: string;
  status: string;
  deadline: number;
  taskDetails: string | number;
}
let removeId: number;
function App() {
  const [data, setData] = useState<Idata[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [showSelectOption, setShowSelectOption] = useState<string | number>(
    "All"
  );
  
  const [currenPage , setCurrentPage] = useState<number>(1)
  const itemPerPage = +showSelectOption;
  const startIndex = (currenPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  let filteredData = data;
  if (showSelectOption !== "All") {
    filteredData = data.slice(startIndex, endIndex);
  }
  
  function handleOpen() {
    setOpen(true);
    console.log("test");
  }
  function handleClose() {
    setOpen(false);
  }
  interface IIdModeParameter {
    id: null | number;
    mode: string;
  }
  const [idMode, setIdMode] = useState<IIdModeParameter>({
    id: null,
    mode: "add",
  });
  interface IhandleSelectOptionParametere {
    numberOfShow: string | number;
  }
  function handleSelectOption({ numberOfShow }: IhandleSelectOptionParametere) {
    setShowSelectOption(numberOfShow);
    // setCurrentPage(1)
  }
  
  function handledArroeForward() {
    setCurrentPage((prevPage) => prevPage+1)    
  }
  function handleArrowBack ()  {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
 
  return (
    <div className="App  ">
        {/* <Select  options={[
          {value:0 , label:"do"},
          {value:1 , label:"doing"},
          {value:2 , label:"done"}
          ]}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? 'grey' : 'red',
            }),
          }}
          /> */}

          
       <header className="w-full h-[50px] flex justify-between items-center gap-[20px] bg-[#6200EA] pl-[10px] pr-[10px] text-[#FFFFFF]">
        <div className="min-w-[80px] flex justify-between items-center gap-[5px]">
          <div>
            <VscChecklist />
          </div>
          <div>
            <p className="truncate min-w-[100px]"> My To-Do Tasks </p>
          </div>
        </div>
        <div className="max-w-[80%]  flex justify-between items-center gap-[10px]  bg-[#6200EA]">
          <div className="search-wrapper  max-w-[200px] flex justify-between items-center  border-[2px] border-gray-400 border-solid rounded-[5px] pl-[7px] pr-[7px]">
            <input
              className="w-full h-full bg-[#6200EA] border-none outline-none"
              placeholder="Search"
            />
            <div className="">
              <CiSearch />
            </div>
          </div>
          <button>
            <FaFilter />
          </button>
          <Button onClickHandler={() => handleOpen()}>
            <TbPencilPlus />
          </Button>
        </div>
      </header>
      <main className="w-full h-full">
        <div className=" w-full">
          <table className=" w-full h-full  ">
            <tr className=" w-full h-[50px] border-b-[2px] border-[#E0E0E0] ">
              <th className="w-[25%] text-left h-full text-[#666666] border-r-[2px] border-[#E0E0E0] pl-[15px]">
                Task
              </th>
              <th className=" text-center h-full">
                <div className="flex  justify-center gap-[2px] items-center">
                  <p className=" text-[#666666]">Priority</p>
                  <FaArrowUp />
                </div>
              </th>
              <th >
                <div className="status  flex  justify-center gap-[2px] items-center">
                  <p className=" text-[#666666]">Status</p>
                  <FaArrowUp />
                </div>
              </th>
              <th >
                <div className=" deadline  flex justify-center gap-[2px] items-center">
                  <p className=" text-[#666666]">Deadline</p>
                  <FaArrowUp />
                </div>
              </th>
              <th className="  text-center text-[#666666]  ">Action</th>
            </tr>
           
           {filteredData.map((item) => {
              return (
            
                    <TableDesktop
                  data={data}
                  setData={setData}
                  taskName={item.taskName}
                  priority={item.priority}
                  status={item.status}
                  deadline={item.deadline}
                  taskDetails={item.taskDetails}
                  id={item.id}
                  removeId={removeId}
                />
             
              );
            })}
           
{/*            
           {filteredData.map((item) => {1111111
              return (
               <div className="block md:hidden">
                    <TableMobile 
                  data={data}
                  setData={setData}
                  taskName={item.taskName}
                  priority={item.priority}
                  status={item.status}
                  deadline={item.deadline}
                  taskDetails={item.taskDetails}
                  id={item.id}
                  removeId={removeId}
                />
               </div>
              );
            })}111111111111 */}
           
          </table>
          <div className="w-full h-[50px] flex justify-end items-center gap-[20px] pr-[25px]">
            <div>
              <p>Rows per page: </p>
            </div>
            <div className="dropdown min-w-[50px] inline-block cursor-pointer relative flex justify-between items-center gap-[15px]">
              <div className="dropdowncontent h-[130px]  absolute min-w-[50px] z-12 bottom-0 right-100 bg-white rounded-[5px] pt-[5px]">
                <p
                  className="h-[30px] text-[15px]"
                  onClick={() => handleSelectOption({ numberOfShow: 5 })}
                >
                  5
                </p>
                <p
                  className="h-[30px] text-[15px]"
                  onClick={() => handleSelectOption({ numberOfShow: 10 })}
                >
                  10
                </p>
                <p
                  className="h-[30px] text-[15px]"
                  onClick={() => handleSelectOption({ numberOfShow: 15 })}
                >
                  15
                </p>
                <p
                  className="h-[30px] text-[15px]"
                  onClick={() => handleSelectOption({ numberOfShow: "All" })}
                >
                  All
                </p>
              </div>
              <button className="dropBTN">
                <IoMdArrowDropdown size={25} color={"#757575"} />
              </button>
            </div>
            <div>
              <p>1-10 of 10 </p>
            </div>
            <div className="flex justify-between items-center gap-[15px]">
              <button onClick={() => handleArrowBack () }>
                <IoIosArrowBack size={20} color={"#BDBDBD"} />
              </button>
              <button onClick={() => handledArroeForward()}>
                <IoIosArrowForward size={20} color={"#BDBDBD"} />
              </button>
            </div>
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          data={data}
          setData={setData}
          idMode={idMode}
          setIdMode={setIdMode}
        />
      </main> 
    </div>
  );
}
export default App;
