import { observer } from 'mobx-react';
import * as React from "react";
import { store } from '../store';
import { Table } from 'react-bootstrap';
import MapContainer from './MapContainer';

const Parking: React.SFC = () => {
	const sensors = store.visibleSensorInstances;

	return (
		<div>
			<h1>Selected Sensor: {store.selectedSensor}</h1>
			<br />

			<MapContainer />

			<Table striped={true}>
				<thead>
					<tr>
						<th colSpan={100}>Sensors</th>
					</tr>
				</thead>
				<tbody>
					{sensors.map((sensor) => {
						return(
							<tr key={`${sensor.deviceid}-${sensor.arrivaltime}`}>
								<td>
									{sensor.arrivaltime}
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}

export default observer(Parking);