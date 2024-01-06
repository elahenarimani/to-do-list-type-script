import {ReactElement} from 'react'
interface ISelectParameter{
    selectedOption:string 
    handleChange:Function
    children:ReactElement
    className:string
}
function Select({selectedOption , handleChange,children,className }:ISelectParameter){
    return(
        <div>
           <select value={selectedOption}   onChange={(e:any) => handleChange(e.target.value)} className={className}>
                 {children}
           </select>
        </div>
    )
}
export default Select