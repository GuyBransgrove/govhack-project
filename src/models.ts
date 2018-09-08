export class SensorInstance {
	 public area: string = '';
     public arrivaltime: Date = new Date();
     public betweenstreet1: string = '';
     public betweenstreet2: string = '';
	 public departuretime: Date = new Date();
	 public deviceid: string = '';
	 public durationseconds: string = '';
	 public inViolation: string = '';
	 public sideOfStreet: string = '';
	 public sign: string = '';
	 public streetid: string = '';
	 public streetmarker: string = '';
	 public streetname: string = '';
}

export class ParkingBay {
	 public theGeom: string = '';
	 public meterId: string = '';
	 public bayId: string = '';
	 public markerId: string = '';
	 public lastEdit: string = '';
	 public rdSegId: string = '';
	 public rdSegDsc: string = '';
}

export class ParkingBaySensor {
	 public bayId: number = 0;
	 public stMarkerId: string = '';
	 public status: string = '';
	 public location: string = '';
	 public lat: string = '';
	 public lon: string = '';
}