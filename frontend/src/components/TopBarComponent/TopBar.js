import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Search from '../SearchComponent/Search';
import './TopBar.scss'

class TopBar extends Component{
    render(){
        return (
            <Navbar color="white" fixed="top">
                <div className="row align-items-center">
                    <div className="col-8">
                        <NavbarBrand>
                            <img src="./images/logo.png" alt="Logo"/>
                        </NavbarBrand>
                    </div>
                    <div className="col-4">
                        <Search onSearch={(value) => alert('Valor busca: ' + value)}/>
                    </div>                    
                </div>
            </Navbar>
        )
    }        
}

export default TopBar;