import React,{useState, useEffect} from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from 'axios';


function Update() {

  let url = 'http://localhost/contact_manager/contact_manager_server/contacts.php/';
  let params = useParams();

  const [formValue, setFormValue] = useState({
    id:"",
    email: "",
    name: "",
    country: "",
    city:"",
    job:""
  });
  useEffect(() => {
    axios.get(url +'?id=' + params.id)
    .then(response => response.data)
    .then((data) => {
      // handle success
      console.log(data);
      setFormValue({ id: data.id, name: data.name, email: data.email, city: data.city, country: data.country, job: data.job})
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  },[])


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append('name', formValue.name)
    formData.append('email', formValue.email)
    formData.append('city', formValue.city)
    formData.append('country', formValue.country)
    formData.append('job', formValue.job)

    axios({
        method: 'post',
        url: url +'?id=' + params.id,
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        console.log(response)
        if(response.status === 200) {
          alert("Contact update successfully.");
        }
    })
    .catch(function (response) {
        //handle error
        console.log(response)
    });
}

  const { id, email, name, country, city, job } = formValue;

  return (

    <div className="container">
    <h1 className="page-header text-center">Update Contact</h1>
          <Link to="/" className="btn btn-primary btn-xs">Home</Link>
    <div className="col-md-12">
        <div className="panel panel-primary">
            <div className="panel-body">
            <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={id}/>
            <label>Name</label>
            <input type="text" name="name" className="form-control" value={name} onChange={handleChange} />

            <label>Email</label>
            <input type="email" name="email" className="form-control" value={email} onChange={handleChange} />

             <label>Country</label>
            <input type="text" name="country" className="form-control" value={country} onChange={handleChange} />

            <label>City</label>
            <input type="text" name="city" className="form-control" value={city} onChange={handleChange} />

            <label>Job</label>
            <input type="text" name="job" className="form-control" value={job} onChange={handleChange} />
            <br/>
            <input type="submit" className="btn btn-primary btn-block" value="Update Contact" />
        </form>
            </div>
        </div>
        </div>
           </div>
  );
}

export default Update;