import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

// Set your Mapbox access token
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const Map = () => {
  const mapContainer = useRef(null);
  const [coordinates, setCoordinates] = useState([-74.5, 40]); // Initial coordinates

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Choose a Mapbox style
      center: coordinates, // Initial map center
      zoom: 9 // Initial zoom level
    });

    // Add click event listener to the map
    map.on('click', (e) => {
      // Get the clicked coordinates
      const { lngLat } = e;
      const clickedCoordinates = [lngLat.lng, lngLat.lat];

      // Update the state with the new coordinates
      setCoordinates(clickedCoordinates);

      // Update the map's center coordinates
      map.setCenter(clickedCoordinates);
    });

    return () => {
      map.remove();
    };
  }, [coordinates]);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
};

export default Map;
