import React from "react";
import classes from "./PlanetInfo.module.css";
import {connect} from "react-redux";
import i18 from "../../services/i18.services";

const PlanetInfo = ({selectedPlanet}) => {
    return (
        <section 
            className={classes.PlanetInfo}>
                <h1>{i18.planetInfo}</h1>
                {selectedPlanet !== false
                    ? ( <div className={classes.InfoWrapper}>
                            <div><h1>{i18.planetName} : {selectedPlanet.name}</h1></div>
                            <div><b>{i18.rotationPeriod}</b> : {selectedPlanet.rotation_period}</div>
                            <div><b>{i18.oribitalPeriod}</b>: {selectedPlanet.orbital_period}</div>
                            <div><b>{i18.diameter}</b> : {selectedPlanet.diameter}</div>
                            <div><b>{i18.climate}</b> : {selectedPlanet.climate}</div>
                            <div><b>{i18.gravity} </b>: {selectedPlanet.gravity}</div>
                            <div><b>{i18.surfaceWater} </b>: {selectedPlanet.surface_water}</div>
                            <div><b>{i18.terrain}</b>: {selectedPlanet.terrain}</div>
                            <div><b>{i18.population}</b> : {selectedPlanet.population}</div>
                        </div>)
                    : null

                }
        </section>
    )
}


const mapStateToProps = state => {
    return {
        selectedPlanet : state.selectedPlanet
    }
}
export default connect(mapStateToProps)(PlanetInfo);
