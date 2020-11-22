import React, {Component, Fragment, useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddContact = () => {

    const history = useHistory();
    
    const [data,setData] = useState({fullName:'',email:'',phone:'',country:'',bio:'',birthday:'',gender:''});

    const [checkedAll, setCheckedAll] = useState(false);
    const [checked, setChecked] = useState({
      nr1: false,
      nr2: false
    });

    const ChangeHandler = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

     const toggleCheck = (inputName) => {
        setChecked((prevState) => {
        const newState = { ...prevState };
        newState[inputName] = !prevState[inputName];
        return newState;
        });
    };


  const selectAll = (value) => {
        setCheckedAll(value);
        setChecked((prevState) => {
        const newState = { ...prevState };
        for (const inputName in newState) {
            newState[inputName] = value;
        }
        return newState;
        });
    };

  useEffect(() => {
    let allChecked = true;
        for (const inputName in checked) {
        if (checked[inputName] === false) {
            allChecked = false;
        }
        }
        if (allChecked) {
        setCheckedAll(true);
        } else {
        setCheckedAll(false);
        }
    }, [checked]);

    const show = () => {
        console.log(data);
        console.log(checked);
    }

    const saveContact = async (e) => {
        e.preventDefault();
        const res = await axios.post("/contact",[data,isChecked]);
        console.log(res);
        if(res.data.status == 200){
            console.log('save success');
            toast.success("Data save successfully", { autoClose: 3000 });
        }
        setData({...data,fullName:'',email:'',phone:'',country:null,bio:'',birthday:''});
    }

    const backList = (e) => {
        e.preventDefault();
        history.push('/');
    }

    return (
        <Fragment>
            <div>
                <form onSubmit={saveContact}>
                    <div className="form-group">
                        <input type="text" value={data.fullName} name="fullName" className="form-control" onChange={ChangeHandler} placeholder="Enter Full Name" required="" />
                    </div>
                    <div className="form-group">
                        <input type="email" value={data.email} name="email" className="form-control" onChange={ChangeHandler} placeholder="Enter Full Email" required="" />
                    </div>
                    <div className="form-group">
                        <input type="text" value={data.phone} name="phone" className="form-control" onChange={ChangeHandler} placeholder="Enter Phone Number" required="" />
                    </div>
                    <div className="form-group">
                        <select className="form-control" name="country" style={{paddingLeft:"10px"}} onChange={ChangeHandler}>
                            <option value="">Select Country</option>
                            <option value="bd">Bangladesh</option>
                            <option value="pk">Pakistan</option>
                            <option value="ind">India</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" name="bio" placeholder="Tell me about yourself" onChange={ChangeHandler}></textarea>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="date" name="birthday" onChange={ChangeHandler}></input>
                    </div>
                    <div className="form-group">
                        Select Your Gender: 
                        Male <input type="radio" name="gender" value="male" onChange={ChangeHandler}></input> &nbsp;&nbsp;
                        Female <input type="radio" name="gender" value="female" onChange={ChangeHandler}></input>
                    </div>
                    <div className="form-group">
                        <div >
                            <label>All</label> <input type="checkbox" onChange={(event) => selectAll(event.target.checked)} checked={checkedAll} />
                        </div>
                        <div>
                            <label>1</label> <input type="checkbox" name="nr1" onChange={() => toggleCheck("nr1")} checked={checked["nr1"]} />
                        </div>
                        <div> 
                            <label>2</label> <input type="checkbox" name="nr2" onChange={() => toggleCheck("nr2")} checked={checked["nr2"]} />
                        </div>

                    </div>
           
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Add Contact" /> &nbsp; &nbsp; &nbsp; &nbsp;
                        <button className="btn btn-primary" onClick={backList}>Back To List</button>
                    </div>
                </form>
                <button onClick={show}>
                    Show
                </button>
                <ToastContainer autoClose={3000} closeOnClick />
            </div>
        </Fragment>
    )
}

export default AddContact