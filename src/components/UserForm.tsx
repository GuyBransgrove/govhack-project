import * as React from "react";
import { FormControl, ControlLabel, FormGroup } from "react-bootstrap/lib";
import { store } from "../store";
import { observer } from "mobx-react";
import { values } from "mobx";

const UserForm: React.SFC = () => {
	return (
		<div className="userform-container">
			<form className="userform">
				<div className="internal-form">
					<FormGroup controlId="weekDaySelect" className="col-md-6">
						<ControlLabel>Select Day of Week</ControlLabel>
						<FormControl
							value={store.selectedDay}
							componentClass="select"
							placeholder="Day of Week"
							onChange={store.changeSelectedDay}
						>
							<option value="sunday">Sunday</option>
							<option value="monday">Monday</option>
							<option value="tuesday">Tuesday</option>
							<option value="wednesday">Wednesday</option>
							<option value="thursday">Thursday</option>
							<option value="friday">Friday</option>
							<option value="saturday">Saturday</option>
						</FormControl>
					</FormGroup>
					<FormGroup controlId="timeDaySelect" className="col-md-6">
						<ControlLabel>Time of Day</ControlLabel>
						<FormControl
							value={store.selectedToD}
							componentClass="select"
							placeholder="Time of Day"
							onChange={store.changeSelectedTime}
						>
							<option value="0">00:00</option>
							<option value="1">01:00</option>
							<option value="2">02:00</option>
							<option value="3">03:00</option>
							<option value="4">04:00</option>
							<option value="5">05:00</option>
							<option value="6">06:00</option>
							<option value="7">07:00</option>
							<option value="8">08:00</option>
							<option value="9">09:00</option>
							<option value="10">10:00</option>
							<option value="11">11:00</option>
							<option value="12">12:00</option>
							<option value="13">13:00</option>
							<option value="14">14:00</option>
							<option value="15">15:00</option>
							<option value="16">16:00</option>
							<option value="17">17:00</option>
							<option value="18">18:00</option>
							<option value="19">19:00</option>
							<option value="20">20:00</option>
							<option value="21">21:00</option>
							<option value="22">22:00</option>
							<option value="23">23:00</option>
						</FormControl>
					</FormGroup>
					<FormGroup controlId="criteriaSelect" className="side-pad">
						<ControlLabel>Criteria</ControlLabel>
						<FormControl
							value={store.selectedCriteria}
							componentClass="select"
							placeholder="Criteria"
							onChange={store.changeSelectedCriteria}
						>
							<option value="none">None</option>
							<option value="violation">High Violation</option>
							<option value="inflow">High Inflow</option>
							<option value="outflow">High Outflow</option>
						</FormControl>
					</FormGroup>
					<FormGroup className="side-pad">
						<ControlLabel>Sensors</ControlLabel>
						<FormControl
							value={store.selectedSensor}
							componentClass="select"
							placeholder="Criteria"
							onChange={store.changeSelectedSensor}
						>
							<option value="none">None</option>
							{values(store.sensors).filter((sensor) => {
								return store.parkingBays.get(sensor.bayId) && store.parkingBays.get(sensor.bayId)!.rdSegDsc;
							}).map((sensor) => {
								return (
									<option key={sensor.bayId} value={sensor.bayId}>
										{sensor.bayId} - {
											store.parkingBays.get(sensor.bayId) ? store.parkingBays.get(sensor.bayId)!.rdSegDsc : ''
										}
									</option>
								);
							})}
						</FormControl>
					</FormGroup>
				</div>
			</form>
		</div>
	);
};

export default observer(UserForm);