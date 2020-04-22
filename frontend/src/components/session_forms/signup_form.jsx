import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearedErrors = false;
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.signedIn === true) {
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
        this.props.signup(user)
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
            <form className="signupForm" onSubmit={this.handleSubmit}>
              <div className="signupForm">
                <br />
                <input
                  type="text"
                  value={this.state.username}
                  onChange={this.update("username")}
                  placeholder="Username"
                  className="inputBox"
                />
                <br />
                <input
                  type="email"
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                  className="inputBox"
                />
                <br />

                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.update("password")}
                  placeholder="Password"
                  className="inputBox"
                />
                <br />
                <input className="SubmitButton" type="submit" value="Submit" />
                {this.renderErrors()}
                    <div className="login" onClick={() => {this.props.loginForm()}}>
                        Already a member? Sign in!
                    </div>
              </div>
            </form>
          </div>
        );
    }
}

export default withRouter(SignupForm);