import React, { Component } from 'react';
import './App.css';
import Pet from "./Pet";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Pet/>
            </div>
        )
    }
}

export default App;