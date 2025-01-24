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
    setSelectedOptionStatus:Function
  }
const StatusSelectDes = ({inputError , setSelectedOptionStatus}:IPrioritySelect) => {
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
    
      borderColor: inputError.status ? "#ED1944" : "#757575",
      borderWidth:"1px",
      boxShadow: "none",
      "&:hover": {
        borderColor: inputError.status ? "#ED1944" : "#757575", // No hover effect
      },
    }),
    menu: (provided) => ({
      ...provided,
      textAlign: "left",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "inherit",
      // backgroundColor: state.isSelected ? "#3091E7" : "transparent",
      // "&:hover": {
      //   backgroundColor: "#A8A8A8",
      //   color: "inherit",
      // },
      backgroundColor: state.isSelected ? "transparent" : "transparent", // No color change on select
    "&:hover": {
      backgroundColor: "transparent", // Disable hover background color
      color: "inherit", // No color change on hover
    },
    "&:active": {
      backgroundColor: "transparent", // Prevent active color on click
    },
    }),
  };
  return (
    <div>
       <Select
              onChange={(e: any) => {
                setSelectedOptionStatus(e);
              }}
              placeholder={"status"}
              components={{ DropdownIndicator }}
              styles={customStyles}
          
               className="w-full h-full"
              options={[
                { value: 1, label: "To do" },
                { value: 2, label: "Doing" },
                { value: 3, label: "Done" },
              ]}
              defaultValue={null}
            />
    </div>
  )
}

export default StatusSelectDes;
