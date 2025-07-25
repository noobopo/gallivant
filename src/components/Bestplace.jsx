import React, { useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AOS from 'aos';

const locations = [
  { lat: 36.1284, lng: -115.2110, price: '$163' },
  { lat: 36.1155, lng: -115.1690, price: '$16' },
  { lat: 36.1251, lng: -115.3151, price: '$397' },
  { lat: 36.0965, lng: -115.1767, price: '$69' },
  { lat: 36.1008, lng: -115.1717, price: '$9' },
  { lat: 36.1208, lng: -115.3102, price: '$2722' },
  { lat: 36.1628, lng: -115.1303, price: '$28' },
  { lat: 36.1167, lng: -115.1585, price: '$31' },
  { lat: 36.0840, lng: -115.1537, price: '$461' },
];

const PriceMap = () => {
    useEffect(()=>{
        AOS.init({ duration: 1000, once: true });
    },[])
  const customIcon = (price) =>
    L.divIcon({
      className: 'custom-marker',
      html: `<div style="background:#7e22ce;color:white;padding:4px 8px;border-radius:6px;font-weight:bold;font-size:14px;">${price}</div>`,
    });

  return (
    <div data-aos ="zoom-in-up" className="w-full px-4 py-10 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        World&apos;s Best Places To Visit
      </h2>

      <MapContainer
        center={[36.1147, -115.1728]}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-[600px] rounded-xl z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc, i) => (
          <Marker
            key={i}
            position={[loc.lat, loc.lng]}
            icon={customIcon(loc.price)}
          >
            <Popup>{loc.price}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PriceMap;
