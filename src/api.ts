import axios from 'axios';

const sensorInstanceApiMap = new Map<number, string>();
sensorInstanceApiMap.set(2014, "https://data.melbourne.vic.gov.au/resource/t6hb-9uf2.json");
sensorInstanceApiMap.set(2015, "https://data.melbourne.vic.gov.au/resource/apua-t2tb.json");
sensorInstanceApiMap.set(2016, "https://data.melbourne.vic.gov.au/resource/dj7e-rdx9.json");
sensorInstanceApiMap.set(2017, "https://data.melbourne.vic.gov.au/resource/u9sa-j86i.json");

export async function getParkingBays() {
	const parkingBays = await axios.get('https://data.melbourne.vic.gov.au/resource/wuf8-susg.json');
	return parkingBays.data;
};

export async function getParkingSensors() {
	const sensors = await axios.get('https://data.melbourne.vic.gov.au/resource/dtpv-d4pf.json?$limit=5000&st_marker_id=9506N');
	return sensors.data;
};

export async function getAvailableParkingBays() {
	const availableParkingBays = await axios.get('');
	return availableParkingBays.data;
};

export async function getSensorInstances(markerId: string) {
	const sensorInstances = await axios.get<any[]>('https://data.melbourne.vic.gov.au/resource/u9sa-j86i.json?streetmarker=' + markerId);
	return sensorInstances.data;
}