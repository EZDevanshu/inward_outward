import { useParams } from "react-router-dom";
import { useState } from "react";
import { dummyItems } from "../data";


function EditForm(){

    const { id } = useParams();
    const item = dummyItems.find((it)=>(it.id  === Number(id)))

    const [name , setName] = useState(item.name);
    const [desc , setDesc] = useState(item.description);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("change thai gyo che bhai.....")
    }

    return(
        <>
           <h2>Edit karo ayya thi</h2>

            <form onSubmit={handleSubmit} >
                <div>
                    <label>Name :</label>
                    <input value={name} onChange={(e)=>(setName(e.target.value))}/>
                </div>
                <div>
                    <label>Description :</label>
                    <input value={desc} onChange={(e)=>(setDesc(e.target.value))}/>
                </div>
                <div>
                    <button type="submit">Update</button>
                </div>
            </form>
        </>
    );
}

export default EditForm;