import { useState } from "react";
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({});

    // Transform the search results object into the
    // { latitiude: 52.516272, longitude: 13.377722 } 
    // object
    const coordinates = searchResults.map((result) => ({
        latitude: result.lat,
        longitude: result.long,
    }));

    // The latitiude and longitude of the center of locations coordinates
    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/stark3000/cks5tdixo8usv17peto8pxizy"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            role="img"
                            onClick={() => setSelectedLocation(result)}
                            className="cursor-pointer text-2xl animate-bounce"
                            aria-label="push-pin"
                        >📌</p>
                    </Marker>

                    {/* The popup that should show if we click on a Marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title} {/* Here you can add div and customize the popup as we want */}
                        </Popup>
                    ):(
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    );
}

export default Map;
