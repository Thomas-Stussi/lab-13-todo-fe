import React, { Component } from 'react'

export default class HomePage extends Component {
    state = {
        todos: [],
    }

    componentDidMount = async () => {
        if (!this.props.token) {
          this.props.history.push('/login');
        } 
    }
    render() {
        return (
            <div>
                <h1>Keep Track of Your Tasks!</h1>
                <img src="https://media1.tenor.com/images/355bf3e54d78af6b2cb4113b65f57bf7/tenor.gif?itemid=11565140" alt="Cookie Monster Staying Busy" />
            </div>
        )
    }
}
