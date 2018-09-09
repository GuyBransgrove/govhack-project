import { observer } from 'mobx-react';
import * as React from "react";
import { store } from '../store';
import { Table } from 'react-bootstrap';
import MapContainer from './MapContainer';

const Parking: React.SFC = () => {
	return (
		<div>
			<MapContainer />

			<Table striped={true}>
				<thead>
					<tr>
						<th colSpan={100}>Sensors</th>
					</tr>
				</thead>
				<tbody>
					{store.currentResults.map((sensor) => {
						return(
							<tr key={`${sensor.deviceid}-${sensor.arrivaltime}`}>
								<td>
									{sensor.arrivaltime}
								</td>
								<td>
									{sensor.streetname}
								</td>
								<td>
									{sensor.betweenstreet1}
								</td>
								<td>
									{sensor.betweenstreet2}
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