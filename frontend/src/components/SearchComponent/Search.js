import React, {Component} from 'react';
import './Search.scss';

class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {value : ''};
    }

    render(){
        return (
            <div className="searchContainer">
                <div className="row no-gutters">
                    <div className="searchBtn col-1 d-flex align-items-center justify-content-center" onClick={this.searchBtnClick} >
                        <i className="icon-search fa fa-search"></i>
                    </div>
                    <input type="text" className="col-10 searchInputBox" placeholder="Buscar produtos" value={this.state.value} onChange={this.valueChange} onKeyPress={this.inputKeyPress} />
                    <div className="searchBtn col-1 align-items-center justify-content-center" onClick={this.clearBtnClick} style={this.state.value ? {display: 'flex'} : { display: 'none' }} >
                        <i className="icon-cancel fa fa-times-circle"></i>
                    </div>
                </div>
            </div>
        )
    }

    valueChange = (e) =>{ 
        this.setState({value: e.target.value});
    }

    inputKeyPress = (e) => {
        if ((e.key === 'Enter') && (this.props.onSearch))
            this.props.onSearch(this.state.value);
    }

    clearBtnClick = (e) =>{ 
        this.setState({value: ''});
        
        if (this.props.onSearch)
            this.props.onSearch('');        
    }
    
    searchBtnClick = (e) =>{
        if (this.props.onSearch)
            this.props.onSearch(this.state.value);
    }
}

export default Search;