import { useContext, useState } from "react";
import Select, {
  components,
  DropdownIndicatorProps,
  StylesConfig,
} from "react-select";
import { IoMdArrowDropdown } from "react-icons/io";
import Input from "../input/Input";
import DateInput from "../dateInput/DateInput";
import Button from "../button/Button";
import { DataContext } from "../../App";
import "./addModal.css";
interface IIdModeParameter {
  id: null | number;
  mode: string;
}
interface ImodalParameter {
  openAddModal: boolean;
  setOpenAddModal: Function;
}
interface ISelectOption {
  value: number | null;
  label: string | null;
}
function AddModalDes({ openAddModal, setOpenAddModal }: ImodalParameter) {
  const [inpval, setInpval] = useState<string | number>("");
  const [selectedOptionPriority, setSelectedOptionPriority] =
    useState<ISelectOption | null>(null);
  const [selectedOptionStatus, setSelectedOptionStatus] =
    useState<ISelectOption | null>(null);
  const [inpvalDate, setInpvalDate] = useState<number | undefined>(undefined);
  const [inpvalDetail, setInpvalDetail] = useState<string | number>("");
  const DataUse = useContext(DataContext);
  console.log(DataUse);
  function addData() {
    DataUse?.setData([
      ...DataUse?.data,
      {
        id: Date.now(),
        taskName: inpval,
        priority: selectedOptionPriority,
        status: selectedOptionStatus,
        deadline: inpvalDate,
        taskDetails: inpvalDetail,
        openAddModal: false,
      },
    ]);
    setOpenAddModal(false);
    setInpval("");
    setInpvalDetail("");
    setInpvalDate(undefined);
  }
  const CaretDownIcon = () => {
    return (
      <button className="dropBTN">
        {" "}
        <IoMdArrowDropdown size={25} color={"#757575"} />
      </button>
    );
  };
  const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    );
  };
  const customStyles: StylesConfig = {
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    control: (provided, state) => ({
      ...provided,
      width: 120,
      height: 40,
      borderColor: "#757575",
    }),
    menu: (provided) => ({
      ...provided,
      textAlign: "left",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "inherit",
      backgroundColor: state.isSelected ? "#3091E7" : "transparent",
      "&:hover": {
        backgroundColor: "#A8A8A8",
        color: "inherit",
      },
    }),
  };
  if (!openAddModal) return null;
  return (
    <div className="modal-wrapper w-[100vw] h-[100vh] fixed top-0 left-0 bg-white bg-opacity-[70%] flex items-center justify-center">
      <div className="modal w-[500px] overflow-y-hidden h-[500px]  bg-white rounded-[10px] pl-[30px] pr-[30px] pt-[20px] pb-[20px] ml-[25px] mr-[25px] ">
        <p className="text-[20px] text-left pb-[5px]">New task </p>
        <div className=" w-full h-full  grid grid-cols-3 gap-y-[50px] gap-x-[10px] pl-[10px] pr-[10px]   ">
          <div className="-[400px]  col-start-1 col-end-4 border-gray-500 rounded-[5px] border-[1px] h-[40px] pt-[4px]">
            <Input
              valueState={inpval}
              type="text"
              inputHandler={(e: any) => setInpval(e.target.value)}
              placeholder="Task Name"
              className="add-modal w-full h-full pl-[15px] text-[17px] border-none outline-none"
            />
          </div>
          <div className="w-[120px]">
            <Select
              onChange={(e: any) => {
                setSelectedOptionPriority(e);
              }}
              placeholder={"Priority"}
              components={{ DropdownIndicator }}
              styles={customStyles}
              className="w-full"
              options={[
                { value: 1, label: "High" },
                { value: 2, label: "Medium" },
                { value: 3, label: "Low" },
              ]}
              defaultValue={null}
            />
          </div>
          <div className="w-[120px]">
            <Select
              onChange={(e: any) => {
                setSelectedOptionStatus(e);
              }}
              placeholder={"status"}
              components={{ DropdownIndicator }}
              styles={customStyles}
              className="w-full"
              options={[
                { value: 1, label: "To do" },
                { value: 2, label: "Doing" },
                { value: 3, label: "Done" },
              ]}
              defaultValue={null}
            />
          </div>
          <div className=" w-[120px] h-[40px]  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
            <DateInput
              valueState={inpvalDate}
              type="date"
              inputHandler={(e: any) => setInpvalDate(e.target.value)}
              placeholder={"Deadline"}
              className="w-full h-full pl-[15px] text-[14px] border-none outline-none"
            />
          </div>
          <div className="w-[400px] h-[150px] col-start-1 col-end-4 border-gray-500 border-[1px] rounded-[5px] flext justify-stert items-start pt-[4px]">
            <Input
              valueState={inpvalDetail}
              type="text"
              inputHandler={(e: any) => setInpvalDetail(e.target.value)}
              placeholder="Task Details (Optional)"
              className="taske-Details w-full h-full pl-[15px] text-[17px] border-none outline-none text-left text-top"
            />
          </div>
          <div className="w-[400px] h-[40px] flex justify-between items-center pb-[25px]">
            <Button
              onClickHandler={() => setOpenAddModal(false)}
              className=" text-[#3091E7] text-[14px] "
            >
              CANCEL
            </Button>
            <Button
              onClickHandler={() => addData()}
              className="w-[70px] h-full rounded-[5px] bg-[#3091E7] text-[#ffffff] text-[14px]"
            >
              SAVE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddModalDes;
