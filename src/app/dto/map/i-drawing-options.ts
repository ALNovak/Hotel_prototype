import { drawingMode } from "h21-map/dto";

export interface IDrawingOptions {
    areaFitBounds: boolean;
    areaFillColor: string;
    areaFillOpacity: string;
    areaStrokeColor: string;
    areaStrokeOpacity: string;
    areaStrokeWeight: string;
    areaEnableVisible: boolean;
    areaZIndex: number;
    areaEnableClickable: boolean;
    areaEnableEditable: boolean;
    circleRadius: number;
    circleLatitude: number;
    circleLongitude: number;
    circleMinRadius: number;
    circleMaxRadius: number;
    circleFitBounds: boolean;
    circleFillColor: string;
    circleFillOpacity: string;
    circleStrokeColor: string;
    circleStrokeOpacity: string;
    circleStrokeWeight: string;
    circleEnableVisible: boolean;
    circleZIndex: number;
    circleEnableClickable: boolean;
    circleEnableDraggable: boolean;
    circleEnableEditable: boolean;
    markerLatitude: number;
    markerLongitude: number;
    markerFitBounds: boolean;
    markerIconUrl: string;
    markerIconWidth: number;
    markerIconHeight: number;
    markerEnableVisible: boolean;
    markerZIndex: number;
    markerEnableClickable: boolean;
    markerEnableDraggable: boolean;
    latitude: number;
    longitude: number;
    overlayEnableClick: boolean;
    drawMode: drawingMode;
    enableDraw: boolean
}