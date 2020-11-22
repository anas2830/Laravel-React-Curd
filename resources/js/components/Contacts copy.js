import React, { Component, Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import swal from '../../../node_modules/sweetalert';


const Contacts = (props) => {

    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        axios.get('/contact')
          .then((res) => {
            setData(res.data.contacts);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    };

    const showAlert = (e)  => {
        e.preventDefault(); // prevent form submit
        let id = e.target.value;
        swal({
            title: "Are you sure?",
            text: "okkkk..",
            icon: "warning",
            buttons: {
                confirm : {text:'ok',className:'sweet-warning'},
                cancel : 'cancel'
            },
        }).then((will)=>{
            if(will){
                {deleteFile(id)}
            }
        });
    }

    const deleteFile = async (event) => {
        const id = event;
        const res = await axios.delete(`/contact/${id}`);
        console.log(res.data);
        if(res.data.status === 200){
            fetchData();
        }
    }
    
    return (
        <>
            {loading ? (
                <div>...Data Loading.....</div>
            ) : (
                <div>
                    <table className="table table-bordered table-stripped">
                        <thead>
                            <tr>
                                <th>Short</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {data.map((person, index) => (
                            <tbody key={index}>
                                <tr key={index}>
                                    <td key={index} className="image">{person.fullName[0]}</td>
                                    <td key={index+1}>{person.fullName}</td>
                                    <td key={index+2}>{person.email}</td>
                                    <td key={index+3}>{person.phone}</td>
                                    <td key={index+4}>
                                        <Link className="btn btn-warning" to={`/edit/${person.id}`}> Edit </Link>&nbsp;&nbsp;&nbsp;
                                        <button className="btn btn-danger" onClick={showAlert} value={person.id}>Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            )}
        </>
    )
}

export default Contacts