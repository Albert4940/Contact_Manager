import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Create extends React.Component{

    constructor(props) {
        super(props);
        this.state = {name: '', email:'', city:'', country:'', job:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.url = 'http://localhost/contact_manager/contact_manager_server/contacts.php/';
    }

    handleChange(event) {
        const state = this.state
        state[event.target.name] = event.target.value
        this.setState(state);
    }

    handleSubmit(event){
        event.preventDefault();
         let formData = new FormData();
         formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('city', this.state.city)
        formData.append('country', this.state.country)
        formData.append('job', this.state.job)

        axios({
            method:'post',
            url: this.url,
            data: formData,
            config: {headers:{'Content-Type':'multipart/form-data'}}
        })
        .then(function(response){
            alert('New contact Successfully added.');
           // this.setState({name: '', email:'', city:'', country:'', job:''});
        }).catch(function(response){
            console.log(response)
        })
    }

    
    render(){
        return(
           <div className="container">
                <h1 className="page-header text-center">Add New Contact</h1>
                <Link to="/" className="btn btn-primary btn-xs">Home</Link>
                <div className="col-md-12">
                    <div className="panel panel-primary">
                        <div className="panel-body">
                            <form onSubmit={this.handleSubmit}>
                                <label>Name</label>
                                <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleChange} />
                
                                <label>Email</label>
                                <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.handleChange} />
                
                                <label>Country</label>
                                <input type="text" name="country" className="form-control" value={this.state.country} onChange={this.handleChange} />
                
                                <label>City</label>
                                <input type="text" name="city" className="form-control" value={this.state.city} onChange={this.handleChange} />
                
                                <label>Job</label>
                                <input type="text" name="job" className="form-control" value={this.state.job} onChange={this.handleChange} />
                                <br/>
                                <input type="submit" className="btn btn-primary btn-block" value="Create Contact" />
                            </form>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

export default Create;