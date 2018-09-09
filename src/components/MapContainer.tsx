import * as React from 'react';
import { MAPS_API_KEY } from '../secrets';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { store } from '../store';

export class MapContainer extends React.Component {
  render() {
    const latitude = store.currentSensor ? store.currentSensor.lat : '-37.8102361';
	const longitude = store.currentSensor ? store.currentSensor.lon : '144.9627652';
    return (
      <div className="google-map-wrapper">
        <Map 
          google={(window as any).google || null} 
          zoom={14} 
          initialCenter={{ lat: '-37.8102361', lng: '144.9627652' }}
          center={{ lat: latitude, lng: longitude }}
          style={{
            height: '100%',
            width: '100%'
          }}
        >
          {store.selectedSensor !== 'none' &&
            <Marker
              position={{ lat: latitude, lng: longitude }}
            />
          }
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (MAPS_API_KEY)
})(MapContainer)