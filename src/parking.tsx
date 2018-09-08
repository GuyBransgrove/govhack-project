import { observer } from 'mobx-react';
import * as React from "react";
import { store } from './store';

const parking: React.SFC = () => {
	const sensors = store.visibleSensorInstances;

	return (
		<div>
			<h1>CLICK HERE</h1>
			<h1>Selected Sensor: {store.selectedSensor}</h1>
			<br />

			<table>
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
			</table>
		</div>
	);
}

export default observer(parking);