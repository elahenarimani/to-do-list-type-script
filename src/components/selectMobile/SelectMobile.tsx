import React, { useState } from 'react'
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from "react-icons/bs";
import { useEffect , useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { IoMdArrowDropdown , } from "react-icons/io";
import Select, {
  components,
  DropdownIndicatorProps,
  StylesConfig,
} from "react-select";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../editModal/EditModal";
import Button from "../button/Button";
import ViewModal from "../viewModal/ViewModal";
import Edite2Modal from "../edite2Modal/Edite2Modal";
import { DataContext } from "../../App";
interface ISelectedDataMob {
    value: string | number | null;
    label: string | null;
  }

const SelectMobile = () => {
    const [selectedDataMob, setSelectedDataMob] = useState<ISelectedDataMob|null>(null);
    const CaretDownIcon = () => {
    
        return (
          <button className="dropBTN">
            {" "}
            <IoMdArrowDropdown size={25} color={"#757575"} />
          </button>
        );
      };
      const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => {
        console.log(selectedDataMob)
        return (
          <components.DropdownIndicator {...props}>
            <CaretDownIcon />
          </components.DropdownIndicator>
           
        );
      };
      const formatOptionLabel = ({ label }: { label: string }) => (
       
        <div style={{ textAlign: 'left' }}>{label}</div>
      );
      const customStyles: StylesConfig = {
        indicatorSeparator: (provided, state) => ({
          ...provided,
          display: "none",
        }),
        control: (provided, state) => ({
          ...provided,
          width: '100%',
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
  return (
    
      <div className="w-full md:hidden">
                <Select
                  onChange={(e: any) => {
                    setSelectedDataMob(e.label);
                    console.log(e.label);
                  }}
                  placeholder={
                    <div style={{ textAlign: "left" }}>Deadline</div>
                  }
                  components={{ DropdownIndicator }}
                  styles={customStyles}
                  options={[
                    { value: 1, label: "Priority" },
                    { value: 2, label: "Status" },
                    { value: 3, label: "Deadline" },
                  ]}
                />
    </div>
  )
}

export default SelectMobile
