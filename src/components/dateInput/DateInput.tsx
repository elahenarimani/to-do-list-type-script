import { InputHTMLAttributes } from "react";
interface IInputParameter extends InputHTMLAttributes<HTMLInputElement> {
  valueState: string | number | undefined;
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
    <div className="w-full">
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
