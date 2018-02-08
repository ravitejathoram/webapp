import React from "react";
import {Form, Button,Message} from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../messages/InlineError";
import PropTypes from 'prop-types';

class LoginForm extends React.Component{
    state = {
      data: {
        email:'',
        password:''
      },
      loading:false,
      errors:{}
    };
    onSubmit=()=>{
      //validates on submission and adds errors to state if present
      const errors = this.validate(this.state.data);
      this.setState({errors});
      //checking errors objects is empty or not
      if(Object.keys(errors).length === 0){
        this.props.submit(this.state.data)
                  .catch(err=>this.setState({errors:err.response.data.errors}));
      }
     };
    validate = (data) => {
      const errors={};
      if(!Validator.isEmail(data.email))errors.email="Invalid Email";
      if(!data.password) errors.password="Can't be blank";

      return errors;
    };
    onChange=e=>this.setState({
      //handler for all string fields
      data:{...this.state.data,[e.target.name]: e.target.value}
    });

    render(){
      const {data,errors}=this.state;
      return(
        <Form onSubmit={this.onSubmit}>
          {errors.global && <Message negative>
              <Message.Header>Something wrong </Message.Header>
              <p>{errors.global}</p>
          </Message>}
          <Form.Field error={!!errors.email}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}/>
            {errors.email && <InlineError text={errors.email}/>}
          </Form.Field>
          <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Secure password"
            value={data.password}
            onChange={this.onChange}/>
            {errors.password && <InlineError text={errors.password}/>}
          </Form.Field>
          <Button primary>Login</Button>
        </Form>
      );
    }
}

LoginForm.propTypes={
  submit:PropTypes.func.isRequired
};

export default LoginForm;
