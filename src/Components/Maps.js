import React from 'react'
import "./Maps.css"

import {Map as LeafletMap ,TileLayer  } from "react-leaflet"
import { showDataOnMap } from './utilities';

const Maps = ({center,zoom,countries,casesType}) => {
    return (
        <div className="map">
            
                <LeafletMap className="mapp" center={center} zoom={zoom}>
                <TileLayer 
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     attribution = '&copy; <a href="http://osm.org/copyright"> OpenStreetMap</a> contributors'/>
                    
                     {showDataOnMap(countries,casesType)}
                    </LeafletMap>
            
        </div>
    );
}

export default Maps;
