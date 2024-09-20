import { useState } from "react";
import Select, {
  components,
  DropdownIndicatorProps,
  StylesConfig,
} from "react-select";
import { IoMdArrowDropdown } from "react-icons/io";
interface ISelectOption {
  value: string | number | null;
  label: string | null;
}
interface IFilterToDo {
  openFilterToDo: boolean;
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
function FilterToDo({ openFilterToDo }: IFilterToDo) {
  if (!openFilterToDo) return null;
  return (
    <div className="modal-wrapper w-[100vw] h-[100vh] fixed top-0 right-0 bg-white bg-opacity-[70%] z-10 flex justify-end ">
      <div className="modal w-[300px] h-full  bg-[#FFFFFF]">
        <Select
          placeholder={"Priority"}
          components={{ DropdownIndicator }}
          styles={customStyles}
          options={[
            { value: 1, label: "All" },
            { value: 2, label: "High" },
            { value: 3, label: "Medium" },
            { value: 4, label: "Low" },
          ]}
        />
      </div>
    </div>
  );
}
export default FilterToDo;
