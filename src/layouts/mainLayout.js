import React, { Component } from 'react';

import Header from './../components/header';
import Sidebar from './../components/sidebar';

class MainLayout extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container">
                <Header />
                <div className="main">
                    <aside className="sidebar">
                        <Sidebar />
                    </aside>
                    <div className="layout_props">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default MainLayout;