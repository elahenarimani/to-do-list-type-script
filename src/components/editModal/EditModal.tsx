interface IDeleteModalParameter{
    openEdite : boolean
}
function EditModal({openEdite}:IDeleteModalParameter){
    if(!openEdite) return null
    return(
        <div>
          
        </div>
    )
}
export default EditModal