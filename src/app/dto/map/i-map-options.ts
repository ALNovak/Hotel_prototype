import { TypeCursor } from "../enum/e-type-cursor";

export interface IMapOptions {
	latitude: number;
	longitude: number;
	zoom: number;
	minZoom: number;
	maxZoom: number;
	enableClick: boolean;
	enableDoubleClickZoom: boolean;
	enableDraggable: boolean;
	enableDefaultControl: boolean;
	defaultCursor: TypeCursor;
	enableScrollwheel: boolean;
	provider?: string;
	preloaderIsOpen: boolean;
  }