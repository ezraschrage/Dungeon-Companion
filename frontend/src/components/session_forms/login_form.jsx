import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.currentUser === true) {
    //         this.props.history.push('/login');
    //     }

    //     this.setState({ errors: nextProps.errors })
    // }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state)
        this.props.login(user)
            .then(this.props.history.push('/login'))
            .then(this.props.closeModal)
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div>
                <form className="loginForm" onSubmit={this.handleSubmit}>
                    <div className="loginField">
                        <input type="text"
                            value={this.state.username}
                            onChange={this.update('username')}
                            placeholder="username"
                            className="inputBox"
                        />
                        <br />
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                            className="inputBox"
                        />
                        <br />
                        <input className="submitButton" type="submit" value="Submit" />
                        {this.renderErrors()}
                        <div className="signup" onClick={() => {this.props.signupForm()}}>
                            Not a member? Sign up!
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginForm);