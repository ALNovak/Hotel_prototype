export interface IMarker {
	latitude: number;
	longitude: number;
	fitBounds?: boolean;
	address?: string;
	iconUrl: string;
	title?: string;
	inCluster?: boolean;
	iconWidth?: number;
	iconHeight?: number;
	iconZIndex?: number;
  }