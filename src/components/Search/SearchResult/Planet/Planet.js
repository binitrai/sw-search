import React from "react";
import classes from "./Planet.module.css";
import {connect} from "react-redux";
import * as actionCreators from "../../../../store/actions/actionCreators";

const Planet = ({data, onSelectPlanet, isSelected}) => {
    let classNames = [classes.Planet];
    isSelected && classNames.push(classes.active);
    let defaultFontSize = 14;
    if (data.population !== "unknown") {
        defaultFontSize += data.population.length;
    }
    return (
        <div className ={classNames.join(" ")} onClick={() => onSelectPlanet(data)} style={{fontSize: defaultFontSize}}>
            {data.name}
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
       onSelectPlanet : (data) => dispatch(actionCreators.onSelectPlanet(data)),
    }
}
export default connect(null, mapDispatchToProps)(Planet);
