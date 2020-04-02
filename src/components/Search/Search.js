import React, {useState, useCallback} from "react";
import {debounce} from "lodash";
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions/actionCreators";

import classes from "./Search.module.css";
import i18 from "../../services/i18.services";
import Input from "../UI/Input/Input";
import Loader from "../UI/Loader/Loader";
import SearchResult from "./SearchResult/SearchResult";
import ErrorMsg from "../UI/ErrorMsg/ErrorMsg";

import {DEBOUNCE_DELAY} from "../../services/constants";


const Search = props => {
    const {
        fetchPlanet, 
        loading, 
        searchError, 
        searchResult, 
        nextUrl,
        count,
        selectedPlanet
    } = props;
    const [sQuery, setQuery] = useState("");
    const searchFromServer = debounce(fetchPlanet, DEBOUNCE_DELAY);
    
    const handleChange = useCallback(e => {
        setQuery(e.target.value);
        searchFromServer(e.target.value);
    }, []);
    return (
        <section className={classes.Search}>
            <div className={classes.InputWraper}>
                <Input 
                    value={sQuery}
                    onChangeHandeler={handleChange}
                    placeholder={i18.searchPlaceholder}
                />
                <Loader loading={loading} />
                <ErrorMsg isError={searchError} msg={searchError} />
            </div>
            <SearchResult 
                data={searchResult} 
                count={count} 
                nextUrl={nextUrl} 
                fetchPlanet={fetchPlanet}
                selectedPlanet={selectedPlanet}
                />
        </section>
    )
}

const mapStateToProps = state => {
    return {
        loading : state.loading,
        searchError : state.searchError,
        searchResult : state.searchResult,
        nextUrl : state.nextUrl,
        count : state.count,
        selectedPlanet : state.selectedPlanet
    }
}
const mapDispatchToProps = dispatch => {
    return {
       fetchPlanet : (query, update) => dispatch(actionCreators.fetchPlanet(query, update)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
