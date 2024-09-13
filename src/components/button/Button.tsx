interface IButtonParameter {
  children: string | JSX.Element;
  onClickHandler: Function;
  className?: string;
  disabled?: boolean
}
function Button({ onClickHandler, children, className ,disabled  }: IButtonParameter) {
  return (
    <div>
      <button onClick={() => onClickHandler()} className={className} disabled={disabled}>
        {children}
      </button>
    </div>
  );
}
export default Button;
