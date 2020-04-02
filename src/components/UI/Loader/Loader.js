import React from "react";

const loader = ({loading}) => {
    if (loading) {
        return <h1>Loading</h1>
    }
    return null;
}

export default loader;