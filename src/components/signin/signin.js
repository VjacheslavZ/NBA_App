import React, {Component} from 'react';
import styles from './signin.css';
import FormField from '../widgets/FormFields/formFields';

class SignIn extends Component {
    state = {
        registerError: '',
        loading: false,
        formData: {
            email:{
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password:{
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true,
                    password: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
        }
    };

    updateForm = (element) => {
        const newFormData = {
            ...this.state.formData
        };
        const newElement = {
            ...newFormData[element.id]
        };
        newElement.value = element.event.target.value;

        if(element.blur) {
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }
        newElement.touched = element.blur;
        newFormData[element.id] = newElement;

        console.log(newFormData)

        this.setState({
            formData: newFormData
        })

    };

    validate = (element) => {
        let error = [true, ''];

        if(element.validation.email) {
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? 'Must be a valid email':''}`;
            error = !valid ? [valid, message] : error;
        }

        if(element.validation.password) {
            const valid = element.value.length >= 5;
            const message = `${!valid ? 'Must be greater than 5':''}`;
            error = !valid ? [valid, message] : error;
        }

        if(element.validation.required) {
            const valid = element.value.trim() !=='';
            const message = `${!valid ? 'This field is required':''}`;
            error = !valid ? [valid, message] : error;
        }

        return error;
    };

    submitForm = (event, type) => {
        event.preventDefault();

        if(type !== null){
            let dataTosubmit ={};
            let formIsValid = true;

            for(let key in this.state.formData) {
                dataTosubmit[key] = this.state.formData[key].value;
            }
            for(let key in this.state.formData) {
                formIsValid = this.state.formData[key].valid && formIsValid
            }

            if(formIsValid) {
                this.setState({
                    loading: true,
                    registerError: '',
                })
                if(formIsValid){
                    console.log('Login')
                } else {
                    console.log('register')
                }
            }
        }
    };

    submitButton = () => (
        this.state.loading ?
            'Loading...'
        :
        <div>
            <button onClick={(e) => this.submitForm(e, false)}>Register now</button>
            <button onClick={(e) => this.submitForm(e, true)}>Log in</button>
        </div>
    );

    render() {
        return(
            <div className={styles.logContainer}>
                <form onSubmit={(e) => this.submitForm(e, null)}>
                    <h2>Register/ Login</h2>
                    <FormField
                        id={'email'}
                        formData={this.state.formData.email}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'password'}
                        formData={this.state.formData.password}
                        change={(element) => this.updateForm(element)}
                    />

                    {this.submitButton()}

                </form>
            </div>
        )
    }
}

export default SignIn;