/**
 * Created by Asoiso on 16/10/25.
 * AppLoading
 */

import React from 'react';

export default class AppLoading extends React.Component {

    render() {
        return (
            <div className="app-loading">
                <div className="app-loading-i">
                    <div className="app-loading-logo"></div>
                    <div className="app-loading-load">
                        <span className="item-1"></span>
                        <span className="item-2"></span>
                        <span className="item-3"></span>
                        <span className="item-4"></span>
                        <span className="item-5"></span>
                        <span className="item-6"></span>
                        <span className="item-7"></span>
                        <span className="item-8"></span>
                    </div>
                </div>
            </div>
        );
    }
}
