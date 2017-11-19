import React, { Component } from 'react';
import { Line } from 'rc-progress';
import { FormGroup, FormControl, Button, ButtonGroup } from 'react-bootstrap';

import './App.css';

class Pet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            sleepy: 10,
            hungry: 50,
            alive: true,
            happiness: 10,
            clean: true,
            timeToWakeUp: null,
            message: null,
            chillIn: null
        }
    }


    cleanUp () {
        if (!this.isAvailable()) {
            return
        }

        this.setState({
            clean: true,
        });
    }

    isAvailable () {
        if (this.state.alive === false) {
            this.setState({
                message:  this.state.name + ' now in better place'
            });
            return false
        } else if (this.state.timeToWakeUp > new Date()) {
            this.setState({
                message:  'Tss... ' + this.state.name + ' is sleeping. Time to wake up is: ' + (this.state.timeToWakeUp.getTime() - new Date()) / 1000
            });
            return false
        } else if (this.state.sleepy >= 100) {
            this.setState({
                message:  'No, i wanna sleep(((',
                happiness: this.state.happiness -10
            });
            return false
        }

        if (this.state.happiness < 10) {
            this.setState({
                chillIn: new Date(Date.now() + 10000),
            })

            if (this.state.chillIn > new Date()) {
                this.setState({
                    message: this.state.name + ' is mad. Do not touch him in: ' + (this.state.chillIn.getTime() - new Date()) / 1000,
                    happiness: this.state.happiness +10
                })
            }
            return false
        }

        return true
    }

    goToSleep () {
        if (this.state.sleepy >= 100) {
            this.setState({
                message:  'No! >:(',
                happiness: this.state.happiness -10
            });
        } else {
            this.setState({
                timeToWakeUp:  new Date(Date.now() + 10000),
                sleepy: this.state.sleepy -40,
                hungry: this.state.hungry +10,
                message: 'ZzZzzZZzz'
            });
        }
    }

    feed () {
        if (!this.isAvailable()) {
            return
        }

        if (this.state.clean === false) {
            this.setState({
                message:  'I have played not so a long ago. So you should clean me up :('
            });
        } else if (this.state.hungry < 10) {
            this.setState({
                message: 'No! >:(',
                happiness: this.state.happiness - 10
            })
        } else {
            this.setState({
                hungry: this.state.hungry - 10,
                sleepy: this.state.sleepy + 10,

                message: 'hmmm.. delicious!'
            });
        }
    }

    haveFun () {
        if (!this.isAvailable()) {
            return
        }
        if (this.state.happiness === 100) {
            this.setState({
                message:  'I have played all day long'
            });
            return
        } else if (this.state.hungry === 90) {
            this.setState({
                message:  'I\'m extremely hungry!! Please feed me.',
                happiness: this.state.happiness -10
            });
        } else if (this.state.hungry >= 100) {
            this.setState({
                alive: false,
                message: 'R.I.P. ' + this.state.name
            });
            return
        } else {
            this.setState({
                message: 'Woooohooo!!!'
            });
        }

        this.setState({
            clean: false,
            hungry: this.state.hungry + 10,
            sleepy: this.state.sleepy + 10,
            happiness: this.state.happiness + 10,
        });
    }

    fly () {
        if (!this.isAvailable()) {
            return
        }

        if (this.state.hungry === 90) {
            this.setState({
                message:  'I\'m extremely hungry!! Please feed me.',
                happiness: this.state.happiness -10
            });
        } else if (this.state.hungry >= 100) {
            this.setState({
                alive: false,
                message: 'R.I.P. ' + this.state.name
            });
            return
        } else {
            this.setState({
                message: 'The pilot flew to Cuba. The pilot is ' + this.state.name
            });
        }

        this.setState({
            clean: false,
            hungry: this.state.hungry + 10,
            sleepy: this.state.sleepy + 10,
            happiness: this.state.happiness + 10,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (document.getElementById('petName').value !== '') {
            this.setState({ name: document.getElementById('petName').value })
        }
    }


    render() {
        const name = this.state.name;

        return(

            <div>
                {name ? (
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2">
                                <h2>Statistics:</h2>
                                <span>Hungry:</span><Line name="hungry" percent={this.state.hungry} strokeWidth="1" strokeColor="#fff"/>
                                <span>Sleepy:</span><Line name="hungry" percent={this.state.sleepy} strokeWidth="1" strokeColor="#fff"/>
                                <span>Happiness:</span><Line name="hungry" percent={this.state.happiness} strokeWidth="1" strokeColor="#fff"/>
                                <p>Clean: {this.state.clean ? 'Yes' : 'No'}</p>
                            </div>
                            <section className="col-lg-8 tamagochi-section">
                                <h1>{this.state.message}</h1>
                            </section>
                            <div className="col-lg-2">
                                <h2>Actions:</h2>
                                <ButtonGroup vertical>
                                    <Button onClick={() => this.feed()}>Feed</Button>
                                    <Button onClick={() => this.haveFun()}>Play</Button>
                                    <Button onClick={() => this.goToSleep()}>Sleep</Button>
                                    <Button onClick={() => this.cleanUp()}>Clean Up</Button>
                                    <Button onClick={() => this.fly()}>Fly</Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <FormGroup bsSize="large">
                            <FormControl id="petName" type="text" placeholder="Pets name" />
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit">
                                Apply
                            </Button>
                        </FormGroup>
                    </form>
                )}
            </div>


        );
    }
}

export default Pet;