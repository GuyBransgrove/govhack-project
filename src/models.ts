import { observable } from "mobx";

export class SensorInstance {
	@observable public area: string;
    @observable public arrivaltime: Date;
    @observable public betweenstreet1: string;
    @observable public betweenstreet2: string;
	@observable public departuretime: Date;
	@observable public deviceid: string;
	@observable public durationseconds: string;
	@observable public inViolation: string;
	@observable public sideOfStreet: string;
	@observable public sign: string;
	@observable public streetid: string;
	@observable public streetmarker: string;
	@observable public streetname: string;
}