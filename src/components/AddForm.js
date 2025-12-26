import { useState } from "react";


function AddForm(){

    const [name , setName] = useState("");
    const [desc , setDesc] = useState("");

    function handleSubmit(e){
        e.preventDefault(); 
        alert("record add thai gyo che....");
        setName("");
        setDesc("");
    };

    return(
        <>
            <div className="addform-container"> 
                <h2>kaie Add Karvu Hoy To.....</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name :</label>
                        <input value={name} onChange={(e) => { setName(e.target.value) }}/>
                    </div>
                    <div>
                        <label>Description :</label>
                        <input value={desc} onChange={(e)=>{ setDesc(e.target.value) }} />
                    </div>
                    <div>
                        <button type="submit" >Save</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddForm;

