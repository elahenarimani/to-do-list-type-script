import { InputHTMLAttributes } from "react";
interface IInputParameter extends InputHTMLAttributes<HTMLInputElement> {
  valueState: string | number;
  inputHandler: Function;
  className: string;
  placeholder: string;
}
function DateInput({
  valueState,
  inputHandler,
  className,
  placeholder,
  type,
}: IInputParameter) {
  return (
    <div>
      <input
        value={valueState}
        onChange={(e: any) => inputHandler(e)}
        className={className}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}
export default DateInput;
