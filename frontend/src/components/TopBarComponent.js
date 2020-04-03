import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Search from './SearchComponent';

class TopBar extends Component{
    render(){
        return (
            <Navbar color="white" fixed="top">
                <div className="row align-items-center">
                    <div className="col-7">
                        <NavbarBrand>
                            <img src="./images/logo.png" />
                        </NavbarBrand>
                    </div>
                    <div className="col-5">
                        <Search onSearch={(value) => alert('Valor busca: ' + value)}/>
                    </div>                    
                </div>
            </Navbar>
        )
    }        
}

export default TopBar;