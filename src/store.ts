import { observable, ObservableMap, action, computed, values } from 'mobx';
import axios from 'axios';
import { SensorInstance } from './models';

class Store {
	public pageSize: number = 20;
	@observable public sensors: ObservableMap<string, SensorInstance> = observable.map({});
	@observable public sensorPage: number = 0;


	@action
	async getSensors() {
		const sensors = await axios.get<any[]>('https://data.melbourne.vic.gov.au/resource/u9sa-j86i.json');
		
		const typedSensors = sensors.data.map((sensor: any) => {
			const typedSensor = new SensorInstance();
			Object.keys(sensor).forEach((key) => {
				switch (key) {
					case "in_violation": 
						typedSensor.inViolation = sensor[key];
						break;
					case "side_of_street": 
						typedSensor.sideOfStreet = sensor[key];
						break;
					default: 
						typedSensor[key] = sensor[key];
						break;
				}
			});
			return typedSensor;
		});

		storeClosure().sensors.clear();

		typedSensors.forEach((sensor) => {
			storeClosure().sensors.set(sensor.deviceid, sensor);
		});
	}

	@action
	firstLoadSensors(e: any) {
		e.preventDefault();
		storeClosure().getSensors();
	}

	@computed
	get visibleSensors() {
		const current = storeClosure();
		return values(store.sensors)
			.slice(current.sensorPage * current.pageSize, (current.sensorPage * current.pageSize) + current.pageSize) ;
	}
}

const store = new Store();
function storeClosure(){
	return store;
}
export { store };