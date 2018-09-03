import React, {Component} from 'react';

import Logo from './../assets/graphics/logo.png';

class Header extends Component {
    render(){
        return(
            <header>
                <div className="wrap">
                    <div className="logo">
                        <img src={Logo} />
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;