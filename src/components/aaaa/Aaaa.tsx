function Aaaa() {
    return (
        <div className="w-[500px] h-[500px] flex justify-center items-center bg-gray-600 rounded-[5px]">
            <div className="modal w-full h-full flex flex-col justify-between items-start">
                <p>New task</p>
                <div className="w-[450px] border-gray-500 rounded-[5px] border-[1px] h-[60px]">
                    <input placeholder="Task Name" />
                </div>
                <div className="flex justify-between items-center">
                    <div className=" w-[100px]  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center">
                        <input placeholder="Priority" />
                        {/* <incon></incon> */}
                    </div>
                    <div className=" w-[100px]  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center">
                        <input placeholder="Status" />
                        {/* <incon></incon> */}
                    </div>
                    <div className=" w-[100px]  border-gray-500 rounded-[5px] border-[1px] flex justify-between items-center">
                        <input placeholder="Deadline" />
                        {/* <incon></incon> */}
                    </div>
                </div>
                <div className="w-[450px] border-gray-500 rounded-[5px]">
                    <input placeholder="Task Details (Optional)" />
                </div>
                <div className="flex justify-between items-center">
                    <button>CANCEL</button>
                    <button>SAVE</button>
                </div>
            </div>
        </div>


    )
}
export default Aaaa