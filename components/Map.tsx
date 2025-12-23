"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useEffect } from "react";

interface MapPropsType {
  latitude: number,
  longitude: number,
  latitudeDestino: number,
  longitudeDestino: number
};

export interface RoutingProps {
  locationFromLat: number
  locationFromLlon: number
  locationToLat: number
  locationToLon: number
}

function Routing({ locationFromLat, locationFromLlon, locationToLat, locationToLon }: RoutingProps) {

  const map = useMap();

  // const localizacaoOrigem = L.latLng(locationFromLat, locationFromLlon);
  // const localizacaoDestino = L.latLng(locationToLat, locationToLon);  

  // const distancia = localizacaoOrigem.distanceTo(localizacaoDestino);

  // const convertDisnaticaKm = Number((distancia / 1000).toFixed(2));



  useEffect(() => {
    if (!map) return;

    const routingMap = L.routing.control({
      waypoints: [L.latLng(locationFromLat, locationFromLlon), L.latLng(locationToLat, locationToLon)],
      routeWhileDragging: true,
      show: false
    }).addTo(map);

     return () => {
      map.removeControl(routingMap)
     }
  }, [map, locationFromLat, locationFromLlon, locationToLat, locationToLon]);

  return null;
}

export default function Map({ latitude, longitude, latitudeDestino, longitudeDestino}: MapPropsType) {

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });

  return (
    <MapContainer center={[latitude, longitude]} zoom={13} style={{marginTop: "0.8rem", marginBottom: "1rem"}}>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Routing 
        locationFromLat={latitude}
        locationFromLlon={longitude}
        locationToLat={latitudeDestino}
        locationToLon={longitudeDestino}
      />

      <Marker position={[latitude, longitude]}>
        <Popup>
          Latitude: {latitude}
          Longitude: {longitude}
        </Popup>
      </Marker>
    </MapContainer>
  )
}