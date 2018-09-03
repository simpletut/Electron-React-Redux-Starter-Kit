import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {

    render() {

        return (
            <aside className="sidebar">
                <nav>
                    <ul>
                        <li>   
                            <NavLink activeClassName="active" to="/" alt="Notes">
                                <i className="far fa-sticky-note"></i>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
        )
    }
}

export default Sidebar;