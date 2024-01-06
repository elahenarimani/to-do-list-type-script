interface IInputParameter{
    valueState: string | number
    inputHandler : Function 
}
function Input({valueState , inputHandler}:IInputParameter){
    return(
        <div>
            <input value={valueState} onChange={() => inputHandler()} />
        </div>
    )
}
export default Input