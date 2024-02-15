import { useState } from "react";
import Select2 from "../select/Select2";
import Input from "../input/Input";
import DateInput from "../dateInput/DateInput";
import Button from "../button/Button";
import { IoMdArrowDropdown } from "react-icons/io";
import Select ,{ components, DropdownIndicatorProps, StylesConfig } from 'react-select';
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
  value:string
  label:string
}
function Modal({ open, onClose, data, setData }: ImodalParameter) {
  // const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOption2, setSelectedOption2] = useState<string>("");
  const [inpval, setInpval] = useState<string | number>("");
  const [inpvalDate, setInpvalDate] = useState<number>(0);
  const [inpvalDetail, setInpvalDetail] = useState<string | number>("");
  const [selectedOption , setSelectedOption]=useState<ISelectOption | null>(null)
  
  function addData() {
    setData([
      ...data,
      
      {
        id: Date.now(),
        taskName: inpval,
        priority: selectedOption2,
        status: selectedOption,
        deadline: inpvalDate,
        taskDetails: inpvalDetail,
        open: false,
      },
    ]);
    onClose();
    setInpval("")
  }
  interface CustomDropdownIndicatorProps extends DropdownIndicatorProps< ISelectOption, false> {
    [key: string]: any;
    innerProps: React.HTMLAttributes<HTMLDivElement>;
    isFocused: boolean; 
  }
  function CustomDropdownIndicator ({ innerProps, isFocused, ...props }: React.FC<CustomDropdownIndicatorProps>){
    
    return(
      <components.DropdownIndicator {...props}>
        <button className="dropBTN"> <IoMdArrowDropdown size={25} color={"#757575"} /></button>
        <CustomArrowIcon/>
      </components.DropdownIndicator>
    )
  }
  const CustomArrowIcon: React.FC = () => (
 <button className="dropBTN"> <IoMdArrowDropdown size={25} color={"#757575"} /></button>
    <span>&#x2193;</span>

  )
 
 const customStyles: StylesConfig<ISelectOption, false> = {
  dropdownIndicator: (provided, state) => ({
    ...provided,
    border: 'none', 
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
            <div className="priority-drop-down-container w-[120px] h-full  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px] ">
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
             
             onChange={(e:any) => setSelectedOption(e)}
             defaultValue={selectedOption}
             placeholder="Priority"
             components = {{DropdownIndicator: CustomDropdownIndicator  }}
             styles={customStyles}
             options={[
                {value:"High" , label:"High"},
                {value:"Medium" , label:"Medium"},
                {value:"Low", label:"Low"}

             ]} 
            
            
             />
             <button className="dropBTN"> <IoMdArrowDropdown size={25} color={"#757575"} /></button>
            </div>
            {/* <div className="priority-drop-down w-[120px] h-full  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
                <div className="priority-drop-down-content">
                  <p onClick={() => handlePriority()}>High</p>
                  <p onClick={() => handlePriority()}>Medium</p>
                  <p onClick={() => handlePriority()}>Low</p>
                </div>
                <button className="dropBTN"> <IoMdArrowDropdown size={25} color={"#757575"} /></button>
            </div> */}
            <div className=" w-[120px] h-full  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
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
            </div>
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
