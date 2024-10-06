import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
    const position = [51.505, -0.09]; // Example coordinates for the center of the map

    return (
        <div className="Map">
            <h2>Map Component</h2>
            <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>A sample popup message!</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;
