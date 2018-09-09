import { observable, ObservableMap, action, computed, values } from 'mobx';
import { SensorInstance, ParkingBaySensor, ParkingBay } from './models';
import { getSensorInstances, getParkingSensors, getParkingBays } from './api';

class Store {
	public pageSize: number = 20;
	@observable public sensorInstances: ObservableMap<string, SensorInstance[]> = observable.map({});
	@observable public sensors: ObservableMap<string, ParkingBaySensor> = observable.map({});
	@observable public parkingBays: ObservableMap<string, ParkingBay> = observable.map({});
	@observable public sensorPage: number = 0;
	@observable public selectedDay: string = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()];
	@observable public selectedToD: string = `${new Date().getHours()}`;
	@observable public selectedCriteria: string = 'none';
	@observable public selectedSensor: string = 'none';

	@action
	async getSensorIntances() {
		const sensorInstancesFromApi = await getSensorInstances();
		
		const typedSensorsInstances = sensorInstancesFromApi.map((sensorInstance: any) => {
			return createFromApi(sensorInstance, new SensorInstance());
		});

		me().sensorInstances.clear();

		typedSensorsInstances.forEach((sensor) => {
			const existing = me().sensorInstances.get(sensor.streetmarker);
			if (existing) {
				me().sensorInstances.delete(sensor.streetmarker);
				me().sensorInstances.set(sensor.streetmarker, [...existing, sensor]);
			} else {
				me().sensorInstances.set(sensor.streetmarker, [sensor]);
			}
		});
	}

	@action
	async getSensors() {
		const sensorsFromApi = await getParkingSensors();
		const typedSensors = sensorsFromApi.map((sensor: any) => {
			return createFromApi<ParkingBaySensor>(sensor, new ParkingBaySensor());
		}) as ParkingBaySensor[];

		me().sensors.clear();

		typedSensors.forEach((sensor) => {
			me().sensors.set(sensor.bayId.toString(), sensor)
		});
	}

	@action
	async getParkingBays() {
		const parkingBaysFromApi = await getParkingBays();
		const typedParkingBays = parkingBaysFromApi.map((parkingBay: any) => {
			return createFromApi<ParkingBay>(parkingBay, new ParkingBay());
		}) as ParkingBay[];

		me().parkingBays.clear();

		typedParkingBays.forEach((parkingBay) => {
			if(parkingBay.rdSegDsc.length){
				me().parkingBays.set(parkingBay.bayId.toString(), parkingBay)
			} else {
				if(me().sensors.get(parkingBay.bayId)) {
					me().sensors.delete(parkingBay.bayId);
				}
			}
		});
	}

	@action
	async getData() {
		await me().getSensors();
		await me().getParkingBays();
		await me().getSensorIntances();
	}

	@action
	changeSelectedDay(e: any) {
		me().selectedDay = e.target.value;
	}

	@action
	changeSelectedTime(e: any) {
		me().selectedToD = e.target.value;
	}

	@action
	changeSelectedCriteria(e: any) {
		me().selectedCriteria = e.target.value;
	}

	@action
	changeSelectedSensor(e: any) {
		me().selectedSensor = e.target.value;
	}

	@computed
	get visibleSensorInstances() {
		const current = me();
		return values(store.sensorInstances)
			.slice(current.sensorPage * current.pageSize, (current.sensorPage * current.pageSize) + current.pageSize) ;
	}

	@computed
	get currentSensor() {
		return me().sensors.get(me().selectedSensor) || new ParkingBaySensor();
	}

	@computed
	get currentBay() {
		return me().parkingBays.get(me().currentSensor.bayId) || new ParkingBay();
	}

	get currentResults() {
		return me().sensorInstances.get(me().currentSensor.stMarkerId) || [];
	}
}

const store = new Store();
store.getData();
function me(){
	return store;
}
export { store };

function snakeToCamel(s: string){
    return s.replace(/(\_\w)/g, (m) => m[1].toUpperCase());
}

function createFromApi<T>(fromApi: object, typedObject: T) {
	Object.keys(fromApi).forEach((key) => {
		typedObject[snakeToCamel(key)] = fromApi[key];
	});
	return typedObject;
}