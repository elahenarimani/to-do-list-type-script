import { createContext, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FaArrowDown } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import FilterToDo from "./components/filterToDo/FilterToDo";
import TableMobile from "./components/tableMobile/TableMobile";
import TableDesktop from "./components/tableDesktop/TableDesktop";
import SelectMobile from "./components/selectMobile/SelectMobile";
import DesktopHeader from "./components/desktopHeader/DesktopHeader";
import MobileHeader from "./components/mobileHeader/MobileHeader";
import "./App.css";
export const DataContext = createContext<{
  data: Idata[];
  setData: Function;
} | null>(null);
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
interface IhandleSelectOptionParametere {
  numberOfShow: number;
}
function App() {
  let removeId: number | null = null;
  const [data, setData] = useState<Idata[]>([]);
  const [showSelectOption, setShowSelectOption] = useState<number>(10);
  const [currenPage, setCurrentPage] = useState<number>(1);
  const itemPerPage = +showSelectOption;
  const startIndex = (currenPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const [search, setSearch] = useState<string | number>("");
  const [openFilterToDo, setOpenFilterToDo] = useState<boolean>(false);
  const [sortState, setSortState] = useState<ISort>({
    sortKay: null,
    sortDirection: null,
  });
  let filteredData = data;
  function handleSort(kay: "priority" | "status" | "deadline") {
    setSortState((item: ISort) => {
      if (item.sortKay === kay) {
        //update direction
        const newDirection =
          item.sortDirection === "upToDown"
            ? "downToUp"
            : item.sortDirection === "downToUp"
            ? null
            : "upToDown";
        return {
          //if sortDirection is null
          sortKay: newDirection ? kay : null, // Reset key if direction (newDirection = null)is null
          sortDirection: newDirection, //sortDirection = null
        };
      } else {
        return {
          sortKay: kay, //when select new kay and kay is not null
          sortDirection: "upToDown",
        };
      }
    });
  }
  if (showSelectOption) {
    //related to showSelectOption
    filteredData = data.slice(startIndex, endIndex);
  }
  function handleSelectOption({ numberOfShow }: IhandleSelectOptionParametere) {
    setShowSelectOption(numberOfShow);
  }
  function handledArroeForward() {
    if (currenPage < Math.ceil(data.length / itemPerPage)) {
      setCurrentPage(currenPage + 1);
    }
  }
  function handleArrowBack() {
    if (currenPage > 1) setCurrentPage(currenPage - 1);
  }
  return (
    <>
      <DataContext.Provider value={{ data, setData }}>
        <div className="App">
          <div className="mobile-header invisible w-full h-[50px]  md:hidden">
            <MobileHeader search={search} setSearch={setSearch} />
          </div>
          <div className="mobile-header w-full h-[50px] fixed top-0 z-[1]  md:hidden">
            <MobileHeader search={search} setSearch={setSearch} />
          </div>
          <div className="desktop-header invisible  hidden  md:block w-full h-auto">
            <DesktopHeader search={search} setSearch={setSearch} />
          </div>
          <div className="desktop-header hidden  md:block w-full h-auto  fixed top-0 z-[1] ">
            <DesktopHeader search={search} setSearch={setSearch} />
          </div>
        </div>
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
                    onClick={() => handleSort("priority")}
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
                    onClick={() => handleSort("status")}
                  >
                    <p className=" text-[#666666]">Status</p>
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
                    onClick={() => handleSort("deadline")}
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
                  return 0; //default return value
                })
                .map((item) => {
                  return (
                    <TableDesktop
                      key={item.id}
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
                    />
                  </div>
                );
              })}
            <div className="w-full h-[50px] flex justify-end items-center gap-[20px] pr-[25px]">
              <div>
                <p>Rows per page: </p>
              </div>
              <div className="dropdown min-w-[50px] inline-block cursor-pointer relative flex justify-between items-center gap-[15px]">
                <div className="dropdowncontent h-[100px]  absolute min-w-[50px] z-12 bottom-0 right-100 bg-white rounded-[5px] pt-[5px]">
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
                </div>
                <button className="dropBTN">
                  <IoMdArrowDropdown size={25} color={"#757575"} />
                </button>
              </div>
              <div>
                <p>
                  {startIndex + 1}-{endIndex} of {data.length}{" "}
                </p>
              </div>
              <div className="flex justify-between items-center gap-[15px]">
                <button
                  onClick={() => handleArrowBack()}
                  disabled={currenPage === 1}
                >
                  <IoIosArrowBack size={20} color={"#BDBDBD"} />
                </button>
                <button
                  onClick={() => handledArroeForward()}
                  disabled={currenPage === Math.ceil(data.length / itemPerPage)}
                >
                  <IoIosArrowForward size={20} color={"#BDBDBD"} />
                </button>
              </div>
            </div>
          </div>
          <div>
            <FilterToDo openFilterToDo={openFilterToDo} />
          </div>
        </main>
      </DataContext.Provider>
    </>
  );
}
export default App;
