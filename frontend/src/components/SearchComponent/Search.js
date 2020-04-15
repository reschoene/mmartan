import React, {Component} from 'react';
import './Search.scss';

/** Search component composed by three parts:
 * A) a search button with a magnifying glass icon
 * B) a field for the user to enter the search term
 * C) a clear button
 */
class Search extends Component{

    /** @constructor Initialize default state value */
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

    /** event handler triggered on changing the search term */
    valueChange = (e) =>{ 
        //updates the state
        this.setState({value: e.target.value});
    }

    /** event handler triggered on key pressing */
    inputKeyPress = (e) => {
        //when user types Enter, trigger onSearch event
        if ((e.key === 'Enter') && (this.props.onSearch))
            this.props.onSearch(this.state.value);
    }

    /** event handler triggered on clear button click */
    clearBtnClick = (e) =>{ 
        //Clear the search term
        this.setState({value: ''});
        
        //Trigger onSearch event for refreshing the last search results
        if (this.props.onSearch)
            this.props.onSearch('');        
    }
    
    /** event handler triggered on search button click */
    searchBtnClick = (e) =>{
        //trigger onSearch event
        if (this.props.onSearch)
            this.props.onSearch(this.state.value);
    }
}

export default Search;