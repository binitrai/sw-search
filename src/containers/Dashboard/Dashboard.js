import React from "react";
import classes from "./Dasboard.module.css";

import PlanetInfo from "../../components/PlanetInfo/PlanetInfo";
import Search from "../../components/Search/Search";


function Dashboard(props) {
    return (
            <section className={classes.Dashboard}>
                <Search />
                <PlanetInfo />
            </section>
        )
}

export default Dashboard;
