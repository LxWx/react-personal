import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
export default class Component extends PureComponent {
    constructor (props) {
        super (props);
        autoBind(this);
    }
}