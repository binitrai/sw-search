import React from "react";
import classes from "./SearchResult.module.css";
import Planet from "./Planet/Planet";
import {getId} from "../../../services/util";
import Button from "../../UI/Button/Button";
import i18 from "../../../services/i18.services";

const searchResult = ({data, count, nextUrl, fetchPlanet, selectedPlanet}) => {
    console.log(data, count, nextUrl);
    if (data.length === 0) {
        return null;
    }
    let selectedId = "";
    if (selectedPlanet)  {
        selectedId =  getId(selectedPlanet.url)
    }
    const loadMore = count - data.length;
    return (
        <section className={classes.SearchResult}>
            <div>
            {data.map(item => {
                    let id = getId(item.url);
                    return (
                        <Planet 
                            key={getId(item.url)} 
                            data ={item} 
                            isSelected={id === selectedId} 
                        />
                    )
                })
            } 
            </div>
            <div className={classes.MoreContainer}>
                {nextUrl && 
                    <Button 
                        btnType="AutoWidth" 
                        style={{'width':'76%', 'height': '40px'}}
                        clicked={() => fetchPlanet(nextUrl, true)}
                    >
                        {i18.load} {loadMore} {i18.morePlanet}
                    </Button>
                } 
            </div>
        </section>
    )
}
export default searchResult;