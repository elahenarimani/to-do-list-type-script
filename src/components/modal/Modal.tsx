import { useState } from "react";
import Select2 from "../select/Select2";
import Input from "../input/Input";
import DateInput from "../dateInput/DateInput";
import Button from "../button/Button";
import { IoMdArrowDropdown } from "react-icons/io";
import Select ,{ components, DropdownIndicatorProps, StylesConfig } from 'react-select';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
// import {library} from "@fortawesome/fontawesome-svg-core";
// library.add(faCaretDown);
interface Idata {
  id: number;
  taskName: string | number;
  priority: string;
  status: string;
  deadline: number;
  taskDetails: string | number;
}
interface IIdModeParameter {
  id: null | number;
  mode: string;
}
interface ImodalParameter {
  open: boolean;
  onClose: Function;
  data: Idata[];
  setData: Function;
  idMode: IIdModeParameter;
  setIdMode: Function;
}
interface ISelectOption{
  value:string |number
  label:string
}
function Modal({ open, onClose, data, setData }: ImodalParameter) {
  console.log(data)
  // const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOptionStatus , setSelectedOptionStatus]=useState<ISelectOption | null>(null)
  const [inpval, setInpval] = useState<string | number>("");
  const [inpvalDate, setInpvalDate] = useState<number>(0);
  const [inpvalDetail, setInpvalDetail] = useState<string | number>("");
  const [selectedOptionPriority , setSelectedOptionPriority]=useState<ISelectOption | null>(null)
  function addData() {
    setData([
      ...data,
      
      {
        id: Date.now(),
        taskName: inpval,
        priority: selectedOptionPriority,
        status: selectedOptionStatus,
        deadline: inpvalDate,
        taskDetails: inpvalDetail,
        open: false,
      },
    ]);
    onClose();
    setInpval("")
  }

const CaretDownIcon = () => {
  return <button className="dropBTN"> <IoMdArrowDropdown size={25} color={"#757575"} /></button>
};
const DropdownIndicator: React.FC<DropdownIndicatorProps> = props => {
  return (
    <components.DropdownIndicator {...props}>
      <CaretDownIcon/>
    </components.DropdownIndicator>
  );
};
const customStyles: StylesConfig = {
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: 'none',
  }),
  control: (provided, state) => ({
    ...provided,
    width: 120,
    height: 40,
    borderColor: "#757575"
  }),
  menu: (provided) => ({
    ...provided,
    textAlign: 'left',
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'inherit',
    // backgroundColor: (state.isFocused || state.isSelected) ? "#f0f0f0" : "transparent",
    // backgroundColor: state.isFocused ? "#f0f0f0" : "transparent", 
    // backgroundColor: state.isFocused ? "#f0f0f0" : state.isSelected  ? "#3091E7" :"transparent",
    backgroundColor:  state.isSelected  ? "#3091E7" :"transparent",
    
    
    '&:hover': {
      backgroundColor: '#A8A8A8',
      color: 'inherit',
    },
  }),  
  
};
  if (!open) return null;
  return (
    <div className="modal-wrapper w-[100vw] h-[100vh] fixed top-0 left-0 bg-white bg-opacity-[50%] flex items-center justify-center">
      <div className=" w-[500px] h-[500px]  bg-white rounded-[5px] pl-[30px] pr-[30px] pt-[20px] pb-[20px]">
        <p className="text-[20px] text-left pb-[5px]">New task </p>

        <div className="modal w-full h-full flex flex-col justify-around items-center pl-[10px] pr-[10px] gap-[1px] ">
          <div className="w-[400px] border-gray-500 rounded-[5px] border-[1px] h-[40px]">
            <Input
              valueState={inpval}
              type="text"
              inputHandler={(e: any) => setInpval(e.target.value)}
              placeholder="Task Name"
              className="w-full h-full pl-[15px] text-[17px] border-none outline-none"
            />
          </div>
          <div className="w-[400px] h-[40px] flex justify-between items-center ">
            {/* <div className="priority-drop-down-container w-[120px] h-full  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px] "> */}
              {/* <Select
                value={selectedOption2}
                handleChange={(e: any) => setSelectedOption2(e)}
                className="w-full h-full pl-[15px] text-[17px] border-none outline-none bg-transparent"
              >
                <>
                  <option value="" disabled>
                    Priority
                  </option>
                  <option value="1">High</option>
                  <option value="2">Medium</option>
                  <option value="3">Low</option>
                </>
                
              </Select> */}
             
             <Select  
             onChange={(e:any) => {setSelectedOptionPriority(e.label)}}
            //  defaultValue={selectedOptionPriority}
             placeholder={"Priority"}
             components={{DropdownIndicator}}
            
             styles={customStyles}  
             options={[
                {value:1 , label:"High"},
                {value:2 , label:"Medium"},
                {value:3, label:"Low"}
             ]} 
             />
             
            {/* </div> */}
            {/* <div className="priority-drop-down w-[120px] h-full  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
                <div className="priority-drop-down-content">
                  <p onClick={() => handlePriority()}>High</p>
                  <p onClick={() => handlePriority()}>Medium</p>
                  <p onClick={() => handlePriority()}>Low</p>
                </div>
                <button className="dropBTN"> <IoMdArrowDropdown size={25} color={"#757575"} /></button>
            </div> */}
            {/* <div className=" w-[120px] h-full  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]"> */}
            <Select  
             onChange={(e:any) => {setSelectedOptionStatus(e.label)}}
            //  defaultValue={selectedOptionStatus}
             
             placeholder={"status"}
             components={{DropdownIndicator}}
            
             styles={customStyles}  
             options={[
                {value:1 , label:"To do"},
                {value:2 , label:"Doing"},
                {value:3, label:"Done"}
             ]} 
             />
              {/* <Select
                value={selectedOption}
                handleChange={(e: any) => setSelectedOption(e)}
                className="w-full h-full pl-[15px] text-[17px] border-none outline-none bg-transparent"
              >
                <>
                  <option value="" disabled>
                    Status
                  </option>
                  <option value="1">To do</option>
                  <option value="2">Doing</option>
                  <option value="3">Done</option>
                </>
              </Select> */}
            {/* </div> */}
            <div className=" w-[120px] h-full border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
              <DateInput
                valueState={inpvalDate}
                type="date"
                inputHandler={(e: any) => setInpvalDate(e.target.value)}
                placeholder="Deadline"
                className="w-full h-full pl-[15px] text-[17px] border-none outline-none"
              />
            </div>
          </div>
          <div className="w-[400px] h-[150px] border-gray-500 border-[1px] rounded-[5px] flext justify-stert items-start">
            <Input
              valueState={inpvalDetail}
              type="text"
              inputHandler={(e: any) => setInpvalDetail(e.target.value)}
              placeholder="Task Details (Optional)"
              className="w-full h-full pl-[15px] text-[17px] border-none outline-none text-left text-top"
            />
          </div>
          <div className="w-[400px] h-[40px] flex justify-between items-center ">
            <Button
              onClickHandler={() => onClose()}
              className=" text-[#3091E7] text-[17px] "
            >
              CANCEL
            </Button>
            <Button
              onClickHandler={() => addData()}
              className="w-[70px] h-full rounded-[5px] bg-[#3091E7] text-[#ffffff] text-[17px]"
            >
              SAVE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
