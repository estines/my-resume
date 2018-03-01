import React, { Component } from 'react'

class Test extends Component {
    state = {
        data: []
    }


    componentDidMount() {
        this.fetchData()
    }

    async fetchData() {
        let result = await fetch('/api').then(item => { return item.json() })
        this.setState({
            data: [...result]
        })
    }

    render() {
        return (
            this.state.data.map(item => {
                return <div>{item.test}</div>
            })
        )
    }
}

export default Test