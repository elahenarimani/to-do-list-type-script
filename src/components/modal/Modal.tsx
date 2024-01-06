import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import './modal.css'
import Select from "../select/Select";

interface ImodalParameter {
    open: boolean
    onClose: Function
}
function Modal({ open, onClose }: ImodalParameter) {
    
    const [isDropDownVisible, setIsDropDownVisible] = useState<boolean>(false)
    const [selectOption, setSelectOption] = useState<null>(null)
    const [selectedOption, setSelectedOption] = useState<"">("")
    const [selectedOption2 , setSelectedOption2 ] = useState <"">("")
   
    // function handleChange() {
    //     ((e: any) => setSelectedOption(e.target.value))
    // }
    function handleBTNDropDown() {
        setIsDropDownVisible(!isDropDownVisible)
    }
    function closeDropDown() {
        setIsDropDownVisible(false)
    }
    if (!open) return null
    return (
        <div className='modal-wrapper w-[100vw] h-[100vh] fixed top-0 left-0 bg-white bg-opacity-[50%] flex items-center justify-center'>
            <div className=" w-[500px] h-[500px]  bg-white rounded-[5px] pl-[30px] pr-[30px] pt-[20px] pb-[20px]">
                <p className='text-[20px] text-left pb-[5px]'>New task</p>
                <div className="modal w-full h-full flex flex-col justify-around items-center pl-[10px] pr-[10px] gap-[1px] ">
                    <div className="w-[400px] border-gray-500 rounded-[5px] border-[1px] h-[40px]">
                        <input placeholder="Task Name" className='w-full h-full pl-[15px] text-[17px] border-none outline-none' />
                    </div>
                    <div className="w-[400px] h-[40px] flex justify-between items-center ">
                        <div className="priority-drop-down-container w-[120px] h-full  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
                            {/* <div>
                                <input className='w-full h-full pl-[15px] text-[17px] border-none outline-none' placeholder="Priority" />
                            </div> */}
                            {/* <button className="text-[50px]" >
                                <TiArrowSortedDown onClick={handleBTNDropDown} />
                            </button> */}
                            {true && <Select handleChange={setSelectedOption2} selectedOption={selectedOption2} className='w-full h-full pl-[15px] text-[17px] border-none outline-none' >
                               <>
                                <option value="" disabled>Priority</option>
                                <option value="1">Hight</option>
                                <option value="2">Medium</option>
                                <option value="3">Low</option>
                               </>
                            </Select>}

                        </div>
                        <div className=" w-[120px] h-full  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
                            {/* <input placeholder="Status" className='w-full h-full pl-[15px] text-[17px] border-none outline-none' /> */}
                            {/* <button className="text-[50px]"> */}
                                {/* <TiArrowSortedDown /> */}
                            {/* </button> */}
                            {true && <Select  handleChange={setSelectedOption} selectedOption={selectedOption} className='w-full h-full pl-[15px] text-[17px] border-none outline-none' >
                                <>
                                    <option value="" disabled>Status</option>
                                    <option value="1">To do</option>
                                    <option value="2">Doing</option>
                                    <option value="3">Done</option>
                                </>
                            </Select>}
                        </div>
                        <div className=" w-[120px] h-full border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center pr-[15px]">
                            <input placeholder="Deadline" className='w-full h-full pl-[15px] text-[17px] border-none outline-none' />
                            <button className="text-[50px]">
                                <TiArrowSortedDown />
                            </button>
                        </div>
                    </div>
                    <div className="w-[400px] h-[150px] border-gray-500 border-[1px] rounded-[5px] flext justify-stert items-start">
                        <input placeholder="Task Details (Optional) " className="w-full h-full pl-[15px] text-[17px] border-none outline-none text-left text-top" />
                    </div>
                    <div className="w-[400px] h-[40px] flex justify-between items-center ">
                        <button onClick={() => onClose()} className=" text-[#3091E7] text-[17px] ">CANCEL</button>
                        <button className="w-[70px] h-full rounded-[5px] bg-[#3091E7] text-[#ffffff] text-[17px]">SAVE</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal