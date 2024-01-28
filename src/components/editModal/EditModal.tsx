interface IDeleteModalParameter{
    openEdite : boolean
    handleEditOpen : Function
}
function EditModal({openEdite , handleEditOpen}:IDeleteModalParameter){
    if(!openEdite) return null
    return(
        <div>
          
        </div>
    )
}
export default EditModal