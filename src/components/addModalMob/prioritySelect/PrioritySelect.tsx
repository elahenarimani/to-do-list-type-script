import React from 'react'
import Select, {
    components,
    DropdownIndicatorProps,
    StylesConfig,
  } from "react-select";
  import { IoMdArrowDropdown } from "react-icons/io";
  interface InputError {
    taskName: boolean;
    priority: boolean;
    status: boolean;
    deadline: boolean;
  }
interface IPrioritySelect {
    inputError : InputError
    setSelectedOptionPriorityMob:Function
  }
const PrioritySelect = ({inputError , setSelectedOptionPriorityMob}:IPrioritySelect ) => {
    const CaretDownIcon = () => {
        return (
          <button className="dropBTN" style={{ padding: 0, margin: 0 }}>
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
          width: "100%",
          height: "100%",
          borderColor: inputError.priority ? "red" : "#757575",
          borderWidth:"2px",
          paddingLeft: "10px",
          
          // borderStyle:"solid",
          // border: "1px solid black",  // Remove the border
          // boxShadow: "none",
        }),
        valueContainer: (provided) => ({
          ...provided,
          paddingLeft: 0, // Make sure the placeholder has no padding
        }),
        placeholder: (provided) => ({
          ...provided,
          paddingLeft: 0, // Remove any inherent padding between icon and placeholder
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
    <div>
      <Select
              onChange={(e: any) => {
                setSelectedOptionPriorityMob(e);
              }}
              placeholder="Priority"
              components={{ DropdownIndicator }}
              styles={customStyles}
              options={[
                { value: 1, label: "High" },
                { value: 2, label: "Medium" },
                { value: 3, label: "Low" },
              ]}
              defaultValue={null}
            />
    </div>
  )
}

export default PrioritySelect
