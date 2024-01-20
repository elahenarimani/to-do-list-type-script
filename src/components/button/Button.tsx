interface IButtonParameter{
    children : string 
    onClicHandler:Function
    className : string
}
function Button({onClicHandler , children , className}:IButtonParameter){
  return(
   <div>
       <button onClick={() => onClicHandler()} className={className}>{children}</button>
   </div>
  )
}
export default Button