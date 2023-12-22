import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker,Source,Layer, NavigationControl ,GeolocateControl } from 'react-map-gl';

const MapSection = ({startCoord,endCoord}) => {

  const token='pk.eyJ1IjoiYWRpdHlhLTE3IiwiYSI6ImNscWM5aG42ZTAxMTUya3NhaWtxZTlmeGUifQ.xxZYdLlsK_dOvLig0Ynanw'

  const [route,setRoute] = useState([])

  const getRoute = async()=>{
  
    setViewState({
      latitude: startCoord[1],
      longitude: startCoord[0],
      zoom: 14,
    })

    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${startCoord[0]},${startCoord[1]};${endCoord[0]},${endCoord[1]}?steps=true&geometries=geojson&access_token=${token}`,
      { method: 'GET' }
    );

    const data = await response.json();
    // console.log("response data:",data)

    if(data.code=="InvalidInput"){
      alert(data.message);
      return;
    }

    const temp_route = data.routes[0].geometry.coordinates;
    // Check if temp_route is an array of arrays
    // console.log("receive array : ", temp_route)

    
    setRoute(temp_route);
  }

  useEffect(()=>{

    // console.log("coordinates received in map : ",startCoord,endCoord)
    getRoute();
   
  },[startCoord,endCoord])

  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: [
        ...route
      ]
    }
  };
  const lineStyle = {
    id: 'roadLayer',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': 'blue',
      'line-width': 4,
      'line-opacity': 0.75
    }
  }
  const [viewState, setViewState] = useState({
    latitude: startCoord[1],
    longitude: startCoord[0],
    zoom: 14,
  });

  return (
    <ReactMapGL
      {...viewState}
      onMove={evt=>setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={token}
      style={{height:'85vh',zIndex:1}}
    >
      <Source id='routeSource' type='geojson' data={geojson}>
        <Layer {...lineStyle} />
      </Source>

      <GeolocateControl/>
      <NavigationControl/>
      <Marker longitude={startCoord[0]} latitude={startCoord[1]} />
    </ReactMapGL>
  );
};

export default MapSection;
