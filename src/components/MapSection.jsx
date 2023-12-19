import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapSection = ({ startCoord, endCoord }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiYWRpdHlhLTE3IiwiYSI6ImNscWM5aG42ZTAxMTUya3NhaWtxZTlmeGUifQ.xxZYdLlsK_dOvLig0Ynanw';

      const newMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: startCoord,
        zoom: 12,
      });

      setMap(newMap);

      const bounds = [
        [-123.069003, 45.395273],
        [-122.303707, 45.612333],
      ];
      newMap.setMaxBounds(bounds);

      newMap.addLayer({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: startCoord,
                },
              },
            ],
          },
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#3887be',
        },
      });

      newMap.on('click', async (event) => {
        const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
        const end = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: coords,
              },
            },
          ],
        };

        if (newMap.getLayer('end')) {
          newMap.getSource('end').setData(end);
        } else {
          newMap.addLayer({
            id: 'end',
            type: 'circle',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                      type: 'Point',
                      coordinates: coords,
                    },
                  },
                ],
              },
            },
            paint: {
              'circle-radius': 10,
              'circle-color': '#f30',
            },
          });
        }

        await getRoute(coords);
      });
    };

    const getRoute = async (end) => {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${startCoord[0]},${startCoord[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
      );

      const json = await response.json();
      const data = json.routes[0];
      const route = data.geometry.coordinates;
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route,
        },
      };

      if (map.getSource('route')) {
        map.getSource('route').setData(geojson);
      } else {
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: geojson,
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75,
          },
        });
      }

      const instructions = document.getElementById('instructions');
      const steps = data.legs[0].steps;

      let tripInstructions = '';
      for (const step of steps) {
        tripInstructions += `<li>${step.maneuver.instruction}</li>`;
      }
      instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
        data.duration / 60
      )} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;
    };

    if (!map) {
      initializeMap();
    }

    return () => map?.remove();
  }, [map, startCoord, endCoord]);

  return (
    <div>
      <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />
      <div id="instructions" style={{ position: 'absolute', margin: '20px', width: '25%', top: 0, bottom: '20%', padding: '20px', backgroundColor: '#fff', overflowY: 'scroll', fontFamily: 'sans-serif' }} />
    </div>
  );
};

export default MapSection;
