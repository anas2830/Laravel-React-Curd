import React, {Component, Fragment, useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { Multiselect } from 'multiselect-react-dropdown';

const AddContact = () => {

    const history = useHistory();
    
    const [data,setData] = useState({fullName:'',email:'',phone:'',country:'',bio:'',birthday:'',gender:''});

    const[isRadio, setIsRadio] = useState([]);

    const [isChecked, setIsChecked] = useState([]);

    
    const[seletedItem,setSelectedItem] = useState([]);

    const ref = React.createRef();

    const[Item,setItem] = useState([
        { label: "Grapes", id: "1" },
        { label: "Mango", id: "2" },
        { label: "Strawberry", id: "3", },
        { label: "Watermelon", id: "4" },
        { label: "Pear", id: "5" },
        { label: "Apple", id: "6" },
        { label: "Tangerine", id: "7" },
        { label: "Pineapple", id: "8" },
        { label: "Peach", id: "9" },

    ]);

    const handleMultiSelect = (option) => {
        var value = [];
        for (var i = 0, l = option.length; i < l; i++) {
            if (option[i].label) {
            value.push(option[i].id);
            }
        }
        setSelectedItem(value);
    }

    const ChangeHandler = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const ChangeRadio = (e) => {
        console.log(e.target);
        setIsRadio({[e.target.value]: true});
        setData({...data,['gender']: e.target.value });
    }

    const handleSingleCheck = e => {
        setIsChecked({ ...isChecked, [e.target.id]: e.target.checked });
    };

    const show = async (e) => {
        e.preventDefault();
        // console.log(data);
        // console.log(isChecked);
        // setData({...data,fullName:'',email:'',phone:'',country:'all',bio:'',birthday:'dd/mm/yyyy'});
        // setIsChecked(false);
        // setIsRadio(false);
        // ref.current.clear();
        // ref.current.resetSelectedValues();
        // console.log(seletedItem);
    }

    const saveContact = async (e) => {
        ref.current.resetSelectedValues();
        e.preventDefault();
        const res = await axios.post("/contact",[data,isChecked,seletedItem]);
        console.log(res);
        if(res.data.status == 200){
            console.log('save success');
            toast.success("Data save successfully", { autoClose: 3000 });
        }
        setData({...data,fullName:'',email:'',phone:'',country:'all',bio:'',birthday:'dd/mm/yyyy'});
        setIsChecked(false);
        setIsRadio(false);
        ref.current.resetSelectedValues();
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
                        <select className="form-control" name="country" style={{paddingLeft:"10px"}} onChange={ChangeHandler} value={data.country}>
                            <option value="all">Select Country</option>
                            <option value="bd">Bangladesh</option>
                            <option value="pk">Pakistan</option>
                            <option value="ind">India</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" name="bio" value={data.bio} placeholder="Tell me about yourself" onChange={ChangeHandler}></textarea>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="date" name="birthday" onChange={ChangeHandler} value={data.birthday}></input>
                    </div>
                    <div className="form-group">
                        Select Your Gender: 
                        Male <input type="radio" name="gender" value="male" onChange={ChangeRadio} checked={isRadio["male"]}></input> &nbsp;&nbsp;
                        Female <input type="radio" name="gender" value="female" onChange={ChangeRadio} checked={isRadio["female"]}></input>
                    </div>
                    <div className="form-group">
                        Select Your Sports: &nbsp;
                        <input type="checkbox" id="5"  value="Cricket" onChange={handleSingleCheck} checked={isChecked[5]} />Cricket  &nbsp;
                        <input type="checkbox" id="6" value="football" onChange={handleSingleCheck} checked={isChecked[6]} />Football  &nbsp;
                        <input type="checkbox" id="7" value="hockey" onChange={handleSingleCheck} checked={isChecked[7]} />Hockey  &nbsp;
                    </div>
                    <div className="form-group">
                       Select Your State :  &nbsp;
                       <Multiselect
                            showCheckbox={true}
                            options={Item} 
                            displayValue="label"
                            placeholder="Select Any"
                            closeIcon="close"
                            onSelect={handleMultiSelect}
                            onRemove={handleMultiSelect}
                            ref={ref}
                        />
                    {/* <Typeahead
                        clearButton
                        allowNew
                        multiple
                        // defaultSelected={Item.slice(0, 1)}
                        ref={ref}
                        id="selections-example"
                        labelKey="label"
                        onChange={handleMultiSelect}
                        options={Item}
                        valueKey="id"
                        placeholder="Choose a state..."
                    /> */}
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Add Contact" /> &nbsp; &nbsp; &nbsp; &nbsp;
                        <button className="btn btn-primary" onClick={backList}>Back To List</button>
                    </div>
                    
                </form>
                {/* <button onClick={show}>
                    Show
                </button> */}
                <ToastContainer autoClose={3000} closeOnClick />
            </div>
        </Fragment>
    )
}

export default AddContact