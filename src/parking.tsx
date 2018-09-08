import { observer } from 'mobx-react';
import * as React from "react";
import { store } from './store';
import LoadingSpinner from './components/LoadingSpinner';

const parking: React.SFC = () => {
	const sensors = store.visibleSensorInstances;

	return (
		<div>
			{ store.loading ? <LoadingSpinner /> : <h1>Selected Sensor: {store.selectedSensor}</h1> }
			<br />
			<table>
				<thead>
					<tr>
						<th>Sensor Arrival Time</th>
						<th>Sensor Street Id</th>
						<th>Sensor Departure Time</th>
					</tr>
				</thead>
				<tbody>
					{
						sensors.map((sensor) => {
							// tslint:disable-next-line:no-debugger
							debugger;
							return(
								// <tr key={`${sensor.deviceid}-${sensor.arrivaltime}-${sensor.departuretime}`}>
								<tr key={Math.random()}>
									<td>{sensor.arrivaltime}</td>
									<td>{sensor.streetid}</td>
									<td>{sensor.departuretime}</td>
								</tr>
							);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default observer(parking);