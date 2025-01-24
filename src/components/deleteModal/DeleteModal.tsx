interface IDeleteModalParameter {
  openDelete: boolean;
  id: number;
  removeId: number|null;
  handleButtonClick: Function;
  onClose: Function;
}
function DeleteModal({
  openDelete,
  removeId,
  id,
  handleButtonClick,
  onClose,
}: IDeleteModalParameter) {
  if (!openDelete) return null;
  return (
    <div className=" w-[100vw] h-[100vh] fixed top-0 left-0 bg-white bg-opacity-[50%] flex items-center justify-center">
      <div className="w-[600px] h-[150px] bg-red-200 flex flex-col items-center justify-between p-[20px]">
        <p className="text-[28px] font-semibold">
          Are you sure you want to delete this task?
        </p>
        <div className="w-full flex justify-between items-center pl-[10px] pr-[10px]">
          <div>
            <p
              onClick={() => onClose()}
              className="text-[#2E8CDF] text-[20px] cursor-pointer"
            >
              CANCEL
            </p>
          </div>
          <div>
            <button
              onClick={() => handleButtonClick({ removeId: id })}
              className="w-[70px] h-[40px] bg-[#2E8CDF] outline-none border-none rounded-[5px] text-[20px] text-white font-semibold"
            >
              YES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeleteModal;
