interface IButtonParameter{
    children : string
    onClicHandler:Function
}
function Button({onClicHandler , children}:IButtonParameter){
   <div>
      <button onClick={() => onClicHandler()}>{children}</button>
   </div>
}
export default Button