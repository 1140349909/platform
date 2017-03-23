import React, {Component} from 'react';
import PullLoad from '../index';

export default class demo extends Component {

    state = {
        index: 0,
        status: null,
    }

    componentWillMount() {

    }

    componentWillUnmount() {
    }

    onLoadMore = () => {

        this.setState({
            status: 'pending',
        });

        setTimeout(() => {
            this.setState({
                index: this.state.index + 20,
                status: 'success',
                // status: 'failure',
            });
        }, 2000);
    }

    render() {
        let _html = [];

        for (let i = 0; i < this.state.index; i++) {
            _html.push(<li key={i}>***</li>);
        }

        return (
            <div>
                <PullLoad
                    first={true}
                    status={this.state.status}
                    last={this.state.index == 100}
                    style={{height: '200px'}}
                    onLoadMore={this.onLoadMore}>
                    <ul>
                        {_html}
                    </ul>
                </PullLoad>
            </div>
        );
    }

}
