import React, { useState } from 'react'
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { addEducation } from "../../actions/profile"


const AddEducation = ({ addEducation, history }) => {

    const [formData, setFormData] = useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current: false,
        description:''
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const {school, degree, fieldofstudy, from, to, current, description} = formData

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault()
        addEducation(formData, history)
    }

    return (<>
        <h1 className="large text-primary">
       Add Your Education
      </h1>
      <p className="lead">
        <i className="fa fa-code-branch"></i> Add any school or bootcamp that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="* school or bootcamp" name="school" required value={school} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Degree or certificate" name="degree" required value={degree} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e => onChange(e)} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" checked={current} name="current" value={current} 
          onChange={e => {
             setFormData({ ...formData, current: !current})
             toggleDisabled(!toDateDisabled)
          }} />{' '}Still Studying</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={e => onChange(e) } disabled={toDateDisabled ? 'disabled': '' } />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </>)
}

const mapDispatchToProps = (dispatch) => ({
    addEducation: (formData, history) => dispatch(addEducation(formData, history))
})

export default connect(null, mapDispatchToProps)(withRouter(AddEducation))