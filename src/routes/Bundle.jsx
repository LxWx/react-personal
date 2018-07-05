import React, { Component } from 'react';
// import {Loading} from 'components';

class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mod: null
        };
    }

    componentWillMount() {
        this.load(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps);
        }
    }

    load(props) {
        this.setState({
            mod: null,
            loading: true
        });
        props.load((mod) => {
            this.setState({
                mod: mod.default ? mod.default : mod
            });
        });
    }

    render() {
        return this.state.mod ? this.props.children(this.state.mod) : null;
    }
}
Bundle.create = (load) => {
    const About = (props) => (
        <Bundle load={load}>
            {(About) => <About {...props} />}
        </Bundle>
    );
    return About;
};


export default Bundle;