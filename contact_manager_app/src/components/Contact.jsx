import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Contact extends React.Component{

    constructor(props){
        super(props)
        this.state = {contacts: []};
        this.headers = [
            { key: 'id', label: 'Id'},
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'country', label: 'Country' },
            { key: 'city', label: 'City' },
            { key: 'job', label: 'Job' }
        ];
        this.url = 'http://localhost/contact_manager/contact_manager_server/contacts.php/';
        this.deleteContact = this.deleteContact.bind(this);
        this.getData = this.getData.bind(this);
    }

    getData(){
        const url = this.url;
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ contacts: data })
          console.log(this.state.contacts)
         }) 
    }
    componentDidMount(){ 
        const url = this.url;
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ contacts: data })
          console.log(this.state.contacts)
         })
    }

    deleteContact(id, e){
        e.preventDefault();
        if(window.confirm("Are you sure to want to delete ?")){
            axios({
                method:'post',
                url: this.url + "?delete="+ id
            }).then(function(response){
                console.log(response);
                if(response.status == 200){
                    alert("Contact deleted successfully")
                }
            }).catch(function(response){
                console.log(response)
            })
        }
    }
    render(){
        return(
         <div className="container">
             <h1>ReactJS Axios PHP Mysql CRUD (Create Read Update and Delete)</h1>
             <p><Link to="/create" className="btn btn-primary btn-xs">Add New Contact</Link></p>
             <table className="table table-bordered table-striped">
             <thead>
                        <tr>
                        {
                            this.headers.map(function(h) {
                                return (
                                    <th key = {h.key}>{h.label}</th>
                                )
                            })
                        }
                          <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.contacts.map((item, key) => (
                                <tr key = {key}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.country}</td>
                                    <td>{item.city}</td>
                                    <td>{item.job}</td>
                                    <td>
                                        <Link to={`/update/${item.id}`} className="btn btn-primary btn-xs">Edit</Link>
                                        <Link to="#" onClick={this.deleteContact.bind(this, item.id)} className="btn btn-danger btn-xs">Delete</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
            </table>
 
         </div>
        )
    }
}

export default Contact;