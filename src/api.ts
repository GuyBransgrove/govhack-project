import axios from 'axios';

export async function getParkingBays() {
	const parkingBays = await axios.get('https://data.melbourne.vic.gov.au/resource/wuf8-susg.json');
	return parkingBays.data;
};

export async function getParkingSensors() {
	const sensors = await axios.get('https://data.melbourne.vic.gov.au/resource/dtpv-d4pf.json');
	return sensors.data;
};

export async function getAvailableParkingBays() {
	const availableParkingBays = await axios.get('');
	return availableParkingBays.data;
};

export async function getSensorInstances() {
	const sensorInstances = await axios.get<any[]>('https://data.melbourne.vic.gov.au/resource/u9sa-j86i.json');
	return sensorInstances.data;
}