import { PropsWithChildren } from 'react';
import { MapContainer, MapContainerProps, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import { LatLngTuple } from 'leaflet';

const GLOBE_CENTER: LatLngTuple = [0, 0];

const Map = ({
  children,
  center = GLOBE_CENTER,
  ...props
}: PropsWithChildren<MapContainerProps>) => {
  return (
    <MapContainer
      style={{ height: '100%', width: '100%' }}
      zoom={2}
      minZoom={2}
      center={center}
      scrollWheelZoom={true}
      {...props}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default Map;
