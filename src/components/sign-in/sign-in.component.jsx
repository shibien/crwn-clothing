import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, signInWithGoogle} from '../../firebase/firebase.utils';

import './sign-in.styles.scss';


class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }


    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email:'', password:''}); 
        } catch (error){
            console.log(error);
        }
        this.setState({ email: '', password: '' })
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with you email and password</span>

                <form onSubmit={this.handleSubmit}>
                    {/* <input */}
                    <FormInput
                        name="email"
                        type="email"
                        // onChange={this.handleChange}
                        handleChange={this.handleChange}
                        value={this.state.email}
                        label="email"
                        required
                    />
                    {/* <label>Email</label> */}
                    {/* <input */}
                    <FormInput
                        name="password"
                        type="password"
                        value={this.state.password}
                        // onChange={this.handleChange}
                        handleChange={this.handleChange}
                        label="password"
                        required
                    />
                    {/* <label>Password</label> */}
                    <div className='buttons'>
                        {/* <input type="submit" value="Submit Form" /> */}
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                        {''}
                        Sign in with Google{''}
                        </CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default SignIn;