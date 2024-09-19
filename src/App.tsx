import { createContext, useState } from "react";
import "./App.css";
import { VscChecklist } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa6";
import { TbPencilPlus, TbSettingsSearch } from "react-icons/tb";
import { FaArrowUp } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FaArrowDown } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Input from "./components/input/Input";
import FilterToDo from "./components/filterToDo/FilterToDo";
import TableMobile from "./components/tableMobile/TableMobile";
import TableDesktop from "./components/tableDesktop/TableDesktop";
import Button from "./components/button/Button";

import Select from "./components/select/Select2";
import SelectMobile from "./components/selectMobile/SelectMobile";
import DesktopHeader from "./components/desktopHeader/DesktopHeader";
import MobileHeader from "./components/mobileHeader/MobileHeader";
import AddModalMob from "./components/addModalMob/AddModalMob";
import AddModalDes from "./components/addModalDes/AddModalDes";
// import Select from 'react-select';
export const DataContext = createContext<{
  data: Idata[];
  setData: Function;
} | null>(null);

// interface ISelectMobile {
//   value: "Priority" | "Status" | "Deadline";
//   label: string | null;
// }

// interface ISelectOption {
//   label: "High"| "Medium"|"Low"  | "To do" |"Doing" |"Done" |null ,
//     value: 1|2|3 |null
// }
interface ISelectOption {
  value: number | null;
  label: string | null;
}
interface Idata {
  id: number;
  taskName: string | number;
  priority: ISelectOption | null;
  status: ISelectOption | null;
  deadline: number;
  taskDetails: string | number;
}
interface ISort {
  sortKay: "priority" | "status" | "deadline" | null;
  sortDirection: "downToUp" | "upToDown" | null;
}
interface ISelectedMob {
  sortSeleKay: "priority" | "status" | "deadline" | null;
  sortSelDirection: null;
}
let removeId: number;

function App() {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [data, setData] = useState<Idata[]>([
    // {
    //   id: 1,
    //   taskName: "test1",
    //   priority: "high",
    //   status: "doing",
    //   deadline: 4,
    //   taskDetails: "dfssf",
    // },
    // {
    //   id: 2,
    //   taskName: "test2",
    //   priority: "low",
    //   status: "to do",
    //   deadline: 10,
    //   taskDetails: "dfssf",
    // },
    // {
    //   id: 2,
    //   taskName: "test3",
    //   priority: "medium",
    //   status: "done",
    //   deadline: 1,
    //   taskDetails: "dfssf",
    // },
  ]);
  const [showSelectOption, setShowSelectOption] = useState<string | number>(
    "All"
  );
  const [currenPage, setCurrentPage] = useState<number>(1);
  const itemPerPage = +showSelectOption;
  const startIndex = (currenPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const [search, setSearch] = useState<string | number>("");
  const [openFilterToDo, setOpenFilterToDo] = useState<boolean>(false);
  const [selectedOptionPriority, setSelectedOptionPriority] =
    useState<ISelectOption | null>({
      label: null,
      value: null,
    });
    const [selectedOptionStatus, setSelectedOptionStatus] =
    useState<ISelectOption | null>({
      label: null,
      value: null,
    });

  const [sortState, setSortState] = useState<ISort>({
    sortKay: null,
    sortDirection: null,
  });
  const [inpvalDate, setInpvalDate] = useState<number | undefined>(undefined);
  const [sortSelectState, setSortSlectState] = useState<ISelectedMob>({
    sortSeleKay: null,
    sortSelDirection: null,
  });
  // const [selectedMob , setSelectedMob] = useState< "Priority" |"Status" | "Deadline" >();
  let filteredData = data;
  if (showSelectOption !== "All") {
    filteredData = data.slice(startIndex, endIndex);
  }
  function handleSort(kay: "priority" | "status" | "deadline") {
    setSortState((item:ISort) => {
      if (item.sortKay === kay) {//update direction
        const newDirection =
          item.sortDirection === "upToDown"
            ? "downToUp"
            : item.sortDirection === "downToUp"
            ? null
            : "upToDown";
            return {
              sortKay: newDirection ? kay : null, // Reset key if direction is null
              sortDirection: newDirection,
            };
      } else {
        return {
          sortKay: kay,
          sortDirection: "upToDown",
        };
      }
    });
  }
  function handleOpen() {
    setOpenAddModal(true);
  }
  function onClose() {
    setOpenAddModal(false);
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
    setCurrentPage((prevPage) => prevPage + 1);
  }
  function handleArrowBack() {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }
  function filterToDoHandler() {
    setOpenFilterToDo(true);
  }

  return (
    <>
      <DataContext.Provider value={{ data, setData }}>
        <div className="App">
          <div className="mobile-header invisible w-full h-[50px]  md:hidden">
            <MobileHeader />
          </div>
          <div className="mobile-header w-full h-[50px] fixed top-0 z-[1]  md:hidden">
            <MobileHeader />
            {/* <div className="header-wrapper-mob  w-full h-[50px] flex flex-row justify-between items-center gap-[20px]  bg-[#6200EA] pl-[20px] pr-[20px] text-[#FFFFFF]">
            <div className="header-left-mob basis-auto shrink whitespace-nowrap overflow-hidden text-ellipsis min-w-[80px]! h-full flex justify-between items-center gap-[5px]">
              <div>
                <VscChecklist size={20} />
              </div>
              <div className="my-to-do-wrapper ">
                <p className="truncate w-full text-[20px]"> My To-Do Tasks </p>
              </div>
              <ul></ul>
            </div>
            <div className="header-right-mob h-full  flex justify-between items-center gap-[20px]  bg-[#6200EA]">
              <div className="search-wrapper h-[30px] max-w-[250px] flex justify-between items-center  border-[2px] border-gray-400 border-solid rounded-[5px] pl-[7px] pr-[7px]">
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
          </div> */}
          </div>
          <div className="desktop-header invisible  hidden  md:block w-full h-auto">
            <DesktopHeader />
          </div>
          <div className="desktop-header hidden  md:block w-full h-auto  fixed top-0 z-[1] ">
            <DesktopHeader />
            {/* <div className="header-wrapper-mob  w-full h-[50px] flex flex-row justify-between items-center gap-[20px]  bg-[#6200EA] pl-[20px] pr-[20px] text-[#FFFFFF]">
            <div className="header-left-mob basis-auto shrink whitespace-nowrap overflow-hidden text-ellipsis min-w-[80px]! h-full flex justify-between items-center gap-[5px]">
              <div>
                <VscChecklist size={20} />
              </div>
              <div className="my-to-do-wrapper ">
                <p className="truncate w-full text-[20px]"> My To-Do Tasks </p>
              </div>
              <ul></ul>
            </div>
            <div className="header-right-mob h-full  flex justify-between items-center gap-[20px]  bg-[#6200EA]">
              <div className="search-wrapper h-[30px] max-w-[250px] flex justify-between items-center  border-[2px] border-gray-400 border-solid rounded-[5px] pl-[7px] pr-[7px]">
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
          </div> */}
          </div>

          {/* <div className="header-wrapper-mob  w-full h-[50px] flex flex-row justify-between items-center gap-[20px]  bg-[#6200EA] pl-[20px] pr-[20px] text-[#FFFFFF]">
            <div className="header-left-mob basis-auto shrink whitespace-nowrap overflow-hidden text-ellipsis min-w-[80px]! h-full flex justify-between items-center gap-[5px]">
              <div>
                <VscChecklist size={20} />
              </div>
              <div className="my-to-do-wrapper ">
                <p className="truncate w-full text-[20px]"> My To-Do Tasks </p>
              </div>
              <ul></ul>
            </div> 
          
            <div className="header-right-mob h-full  flex justify-between items-center gap-[20px]  bg-[#6200EA]">
              <div className="search-wrapper h-[30px] max-w-[250px] flex justify-between items-center  border-[2px] border-gray-400 border-solid rounded-[5px] pl-[7px] pr-[7px]">
                <Input
                  className="w-full h-full bg-[#6200EA] border-none  outline-none pb-[4px]"
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
          </div> */}
        </div>
        <p className="text-left text-[#747474] text-[16px]  mb-[1px] h-full pl-[13px] pr-[13px] lg:hidden">
          Sort by
        </p>
        <div className="pl-[13px] pr-[13px]">
          <SelectMobile />
        </div>
        <main className="w-full h-full">
          <div className=" w-full">
            <table className=" hidden md:table w-full h-full  ">
              <tr className=" w-full h-[50px] border-b-[2px] border-[#E0E0E0] ">
                <th className="w-[25%] text-left h-full text-[#666666] border-r-[2px] border-[#E0E0E0] pl-[15px]">
                  Task
                </th>
                <th className=" text-center h-full">
                  <div
                    className="flex  justify-center gap-[2px] items-center"
                    onClick={
                      () => handleSort("priority")
                      //   setSortState(
                      //     {

                      //     sortKay:
                      //       sortState.sortDirection === "downToUp"
                      //         ? null
                      //         : "priority",
                      //       sortDirection:
                      //       sortState.sortDirection === null
                      //         ? "upToDown"
                      //         : sortState.sortDirection === "upToDown"
                      //         ? "downToUp"
                      //         : null,
                      //   }
                      // )
                    }
                  >
                    <p className=" text-[#666666]">Priority</p>
                    {sortState.sortDirection === "upToDown" &&
                    sortState.sortKay === "priority" ? (
                      <FaArrowDown />
                    ) : sortState.sortDirection === "downToUp" &&
                      sortState.sortKay === "priority" ? (
                      <FaArrowUp />
                    ) : null}
                  </div>
                </th>
                <th>
                  <div
                    className="status  flex  justify-center gap-[2px] items-center"
                    onClick={
                      () => handleSort("status")
                      // setSortState({
                      //   sortKay:
                      //     sortState.sortDirection === "downToUp"
                      //       ? null
                      //       : "status",
                      //   sortDirection:
                      //     sortState.sortDirection === null
                      //       ? "upToDown"
                      //       : sortState.sortDirection === "upToDown"
                      //       ? "downToUp"
                      //       : null,
                      // })
                    }
                  >
                    <p className=" text-[#666666]">Status</p>
                    {/* <FaArrowUp /> */}
                    {sortState.sortDirection === "upToDown" &&
                    sortState.sortKay === "status" ? (
                      <FaArrowDown />
                    ) : sortState.sortDirection === "downToUp" &&
                      sortState.sortKay === "status" ? (
                      <FaArrowUp />
                    ) : null}
                  </div>
                </th>
                <th>
                  <div
                    className=" deadline  flex justify-center gap-[2px] items-center"
                    onClick={
                      () => handleSort("deadline")
                      // setSortState({
                      //   sortKay:
                      //     sortState.sortDirection === "downToUp"
                      //       ? null
                      //       : "deadline",
                      //   sortDirection:
                      //     sortState.sortDirection === null
                      //       ? "upToDown"
                      //       : sortState.sortDirection === "upToDown"
                      //       ? "downToUp"
                      //       : null,
                      // })
                    }
                  >
                    <p className=" text-[#666666]">Deadline</p>
                    {/* <FaArrowUp /> */}
                    {sortState.sortDirection === "upToDown" &&
                    sortState.sortKay === "deadline" ? (
                      <FaArrowDown />
                    ) : sortState.sortDirection === "downToUp" &&
                      sortState.sortKay === "deadline" ? (
                      <FaArrowUp />
                    ) : null}
                  </div>
                </th>
                <th className="  text-center text-[#666666]  ">Action</th>
              </tr>
              {filteredData
                .filter((item) => {
                  const taskName = (item?.taskName as string).toLowerCase();
                  return taskName.includes((search as string).toLowerCase());
                })
                .sort((a: any, b: any) => {
                  if (sortState.sortKay === "priority") {
                    if (sortState.sortDirection === "upToDown") {
                      console.log(a.priority.value)
                      return a.priority?.value - b.priority?.value;
                    } else {
                      return b.priority?.value - a.priority?.value;
                    }
                  } else if (sortState.sortKay === "status") {
                    if (sortState.sortDirection === "upToDown") {
                      return a.status?.value - b.status?.value;
                    } else {
                      return b.status?.value - a.status?.value;
                    }
                  } else if (sortState.sortKay === "deadline") {
                    let tempA = new Date(a.deadline).getTime();
                    let tempB = new Date(b.deadline).getTime();
                    if (sortState.sortDirection === "upToDown") {
                      return tempA - tempB;
                    } else {
                      return tempB - tempA;
                    }
                  }
                  return 0
                })

                // .sort((a, b) => {
                //   if (sortState.sortKay === "priority") {
                //     console.log(a)
                // let tempA = {
                //   ...a,
                //   priority:
                //     a.priority?.toLocaleLowerCase() === "high"
                //       ? 3
                //       : a.priority?.toLocaleLowerCase() === "medium"
                //       ? 2
                //       : 1,

                // };
                // console.log(a);
                // let tempB = {
                //   ...b,
                //   priority:
                //     b.priority.toLocaleLowerCase() === "high"
                //       ? 3
                //       : b.priority.toLocaleLowerCase() === "medium"
                //       ? 2
                //       : 1,
                // };
                //     if (sortState.sortDirection === "upToDown") {
                //       console.log(a)
                //      const  temData ={...data ,  priority : selectedOptionPriority}
                //     //  const priorityA =  a?.priority
                //     //   return a.priority?.valueOf - b.priority;
                //     // } else {
                //     //   return tempB.priority - tempA.priority;
                //     }
                //   } else if (sortState.sortKay === "status") {
                //     console.log(a)
                //     let tempA = {
                //       ...a,
                //       status:
                //         a.status.toLocaleLowerCase() === "done"
                //           ? 3
                //           : a.status.toLocaleLowerCase() === "doing"
                //           ? 2
                //           : 1,
                //     };
                //     let tempB = {
                //       ...b,
                //       status:
                //         b.status.toLocaleLowerCase() === "done"
                //           ? 3
                //           : b.status.toLocaleLowerCase() === "doing"
                //           ? 2
                //           : 1,
                //     };
                //     if (sortState.sortDirection === "upToDown") {
                //       return tempA.status - tempB.status;
                //     } else {
                //       return tempB.status - tempA.status;
                //     }
                //   } else if (sortState.sortKay === "deadline") {
                //     let tempA = new Date(a.deadline).getTime();
                //     let tempB = new Date(b.deadline).getTime();
                //     if (sortState.sortDirection === "upToDown") {
                //       return tempA - tempB;
                //     } else {
                //       return tempB - tempA;
                //     }
                //   }
                //   return true;
                // })

                .map((item) => {
                  return (
                    <TableDesktop
                      taskName={item?.taskName}
                      priority={item?.priority}
                      status={item?.status}
                      deadline={item?.deadline}
                      taskDetails={item?.taskDetails}
                      id={item.id}
                      
                      removeId={removeId}
                    />
                  );
                })}
            </table>
            {filteredData
              .filter((item) => {
                const taskName = (item?.taskName as string).toLowerCase();
                return taskName.includes((search as string).toLowerCase());
              })
              // .sort((a:any, b:any) => {
              // console.log(a)
              //    if( sortSelectState.sortSeleKay === "priority"){
              //     let tempA = {
              //       ...a,
              //       priority:
              //       a.priority?.toLocaleLowerCase() === "high"
              //           ? 3
              //            :a.priority?.toLocaleLowerCase()=== "medium"
              //           ? 2
              //           : 1,
              //     };
              //     let tempB = {
              //       ...b,
              //       priority:
              //           b.priority?.toLocaleLowerCase() === "high"
              //           ? 3
              //            :b.priority?.toLocaleLowerCase()=== "medium"
              //           ? 2
              //           : 1,
              //     };
              //     console.log(a);
              //     return tempA.priority - tempB.priority;
              //   }else{
              //     let tempA = {
              //       ...a,
              //       status:
              //           a?.status?.toLocaleLowerCase() === "done"
              //           ? 3
              //           : a?.status?.toLocaleLowerCase() === "doing"
              //           ? 2
              //           : 1,
              //     };

              //     let tempB = {
              //       ...b,
              //       status:
              //           b.status.toLocaleLowerCase() === "done"
              //           ? 3
              //           : b.status.toLocaleLowerCase() === "doing"
              //           ? 2
              //           : 1,
              //     };
              //     return tempA.status - tempB.status;
              //   }
              // })
              //   .sort((a:any , b:any) => {
              //  console.log(a)
              //    if( sortSelectState.sortSeleKay === "priority"){
              //     let Atemp = a?.priority
              //     let Btemp = b?.priority
              //      return  Atemp.value - Btemp.value
              //   }else{
              //     let Atemp = a?.staus
              //     let Btemp = b?.staus
              //      return  Atemp.value - Btemp.value
              //   }
              // })

              // .sort((a, b) => {
              //   let tempA = new Date(a.deadline).getTime();
              //   let tempB = new Date(b.deadline).getTime();
              //   console.log(tempA);
              //   return tempA - tempB;
              // })
              .sort((a: any, b: any) => {
                if (sortState.sortKay === "priority") {
                  if (sortState.sortDirection === "upToDown") {
                    console.log(a.priority.value)
                    return a.priority?.value - b.priority?.value;
                  } else {
                    return b.priority?.value - a.priority?.value;
                  }
                } else if (sortState.sortKay === "status") {
                  if (sortState.sortDirection === "upToDown") {
                    return a.status?.value - b.status?.value;
                  } else {
                    return b.status?.value - a.status?.value;
                  }
                } else if (sortState.sortKay === "deadline") {
                  let tempA = new Date(a.deadline).getTime();
                  let tempB = new Date(b.deadline).getTime();
                  if (sortState.sortDirection === "upToDown") {
                    return tempA - tempB;
                  } else {
                    return tempB - tempA;
                  }
                }
                return 0
              })



              .map((item) => {
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
                      // selectedMob = { selectedMob}
                      // setSelectedMob ={setSelectedMob}
                    />
                  </div>
                );
              })}
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
                <button onClick={() => handleArrowBack()}>
                  <IoIosArrowBack size={20} color={"#BDBDBD"} />
                </button>
                <button onClick={() => handledArroeForward()}>
                  <IoIosArrowForward size={20} color={"#BDBDBD"} />
                </button>
              </div>
            </div>
          </div>

          {/* <div className="md:hidden">
         <AddModalMob
          
           idMode={idMode}
           setIdMode={setIdMode}
          />
         </div > */}
          {/* <div className="hidden md:block">
         <AddModalDes
            openAddModal={openAddModal}
            onClose={onClose}
            data={data}
            idMode={idMode}
            setIdMode={setIdMode}
          />
         </div> */}

          <div className="">
            <FilterToDo openFilterToDo={openFilterToDo} />
          </div>
        </main>
      </DataContext.Provider>
    </>
  );
}
export default App;
