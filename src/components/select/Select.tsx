import {ReactElement} from 'react'
interface ISelectParameter{
    value:string 
    handleChange:Function
    children:ReactElement
    className:string
}
function Select({value , handleChange , children ,className }:ISelectParameter){
    return(
        <div>
           <select value={value}   onChange={(e:any) => handleChange(e.target.value)} className={className}>
                 {children}
           </select>
        </div>
    )
}
export default Select