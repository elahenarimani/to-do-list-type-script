interface IButtonParameter{
    children : string | JSX.Element
    onClickHandler : Function
    className ?: string
}
function Button({onClickHandler , children , className}:IButtonParameter){
  return(
   <div>
       <button onClick={() => onClickHandler()} className={className}>{children}</button>
   </div>
  )
}
export default Button