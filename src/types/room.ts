import { IBuilding } from './building';

export interface IRoom {
	id: string;
	roomNumber: string;
	floor: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	buildingId: string;
	building: IBuilding;
}
