import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillPencilFill } from "react-icons/bs";
import { useEffect, useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import Select, {
  components,
  DropdownIndicatorProps,
  StylesConfig,
} from "react-select";

import Button from "../button/Button";
import ViewModal from "../viewModal/ViewModal";
import Edite2Modal from "../edite2ModalDes/Edite2ModalDes";
import { DataContext } from "../../App";
interface IMobSel {
  value: string | number | null;
  label: string | null;
}
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
// interface ISelectedMob {

//     value: string | number | null;
//     label: "Priority" |"Status" | "Deadline" | null;
//   }
interface ISelectMobile {
  value: "Priority" | "Status" | "Deadline";
  label: string | null;
}
const SelectMobile = () => {
  const [selectedMob, setSelectedMob] = useState<ISelectMobile | null>(null);
  const DataUse = useContext(DataContext);
  // const [selectedMob , setSelectedMob] = useState<ISelectedMob|null>(null);
  const CaretDownIcon = () => {
    return (
      <button className="dropBTN">
        {" "}
        <IoMdArrowDropdown size={25} color={"#757575"} />
      </button>
    );
  };
  const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => {
    console.log(selectedMob);
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    );
  };
  const formatOptionLabel = ({ label }: { label: string }) => (
    <div style={{ textAlign: "left" }}>{label}</div>
  );
  const customStyles: StylesConfig = {
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      height: 40,

      border: "none",
      borderBottom: "2px solid #757575",
      boxShadow: "none",
      "&:hover": {
        borderBottom: "2px solid #6200EA",
      },
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
    placeholder: (provided: any) => ({
      ...provided,
      textAlign: "left", // Maintain left-aligned placeholder text
    }),
  };

  function sortData(criteria: number) {
    console.log("sortata");
    const sortedData = DataUse?.data.map((item) => item);
    console.log(sortedData);
    switch (criteria) {
      case 1:
        sortedData?.sort((a, b) => {
          console.log(a);
          const priorityOrder = ["High", "Medium", "Low"];
          const aPriority = a.priority?.label || "";
          const bPriority = b.priority?.label || "";
          return (
            priorityOrder.indexOf(aPriority) - priorityOrder.indexOf(bPriority)
          );
        });
        break;
      case 2:
        sortedData?.sort((a, b) => {
          console.log(b);
          const statusOrder = ["To Do", "Doing", "Done"];
          const aStatus = a.status?.label || "";
          const bStatus = b.status?.label || "";
          return statusOrder.indexOf(aStatus) - statusOrder.indexOf(bStatus);
        });
        break;
      case 3:
        sortedData?.sort((a, b) => {
        let tempA = new Date(a.deadline).getTime();
        let tempB = new Date(b.deadline).getTime();
          return tempA - tempB;
      });
        break;
      default:
        break;
    }
    DataUse?.setData(sortedData);
  }
  //   const handlePriority = () => {
  //     console.log("Priority selected");

  //   };

  //   const handleStatus = () => {
  //     console.log("Status selected");

  //   };

  //   const handleDeadline = () => {
  //     console.log("Deadline selected");

  //   };
  return (
    <div className="w-full md:hidden">
      <Select
        defaultValue={{ value: 3, label: "Deadline" }}
        onChange={(e: any) => {
          setSelectedMob(e);
          sortData(e.value);
          console.log(e.value);
        }}
        placeholder={<div style={{ textAlign: "left" }}>Deadline</div>}
        components={{ DropdownIndicator }}
        styles={customStyles}
        options={[
          { value: 1, label: "Priority" },
          { value: 2, label: "Status" },
          { value: 3, label: "Deadline" },
        ]}
      />
    </div>
  );
};
export default SelectMobile;
