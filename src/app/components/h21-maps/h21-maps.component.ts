import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { H21MapComponent, H21MapMarkerDirective } from 'h21-map';
import { IPosition } from 'h21-map';
import { MapType, ISearchMinimalResponse, ISearchMin, ISearchMinimalRequest, drawingMode } from 'h21-map';
import { IDrawingOptions } from '../../dto/map/i-drawing-options';
import { IClusterOptions } from '../../dto/map/i-cluster-options';
import { IInfoBoxOptions } from '../../dto/map/i-info-box-options';
import { IMarker } from '../../dto/map/i-marker';
import { DrawingManagerType } from '../../dto/enum/e-drawing-type';
import { TypePoint } from '../../dto/enum/e-type-point';
import { ITooltipOptions } from '../../dto/map/i-tooltip-options';
import { IMapOptions } from '../../dto/map/i-map-options';
import { TypeCursor } from '../../dto/enum/e-type-cursor';

@Component({
	selector: 'h21-maps',
	templateUrl: './h21-maps.component.html',
	styleUrls: ['./h21-maps.component.css']
})
export class H21MapsComponent {

	constructor(private http: HttpClient) { }

	@ViewChild(H21MapComponent) public map: H21MapComponent;
	@ViewChild(H21MapMarkerDirective) public marker: H21MapMarkerDirective;

	markers: IMarker[] = [];

	iconSelected = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAAHpk4xqAAAABGdBTUEAALGPC/xhBQAAALdQTFRFAAAAgP+AIJ9gHpZaHqVaI6JdI5taIJtcIJxZH5pbH5taIZxaIJpbHppZHppbHptYJZdfJpZgKZJiLJFkLY5mLpBmLo9nL45nNZFrOZNuPJVwQJdzSZx6V6SEXqeJa66TcLGWc7OZdrSbfrigkMOulMWxl8azncm3pM28qdDArtPDsdTGtdfJwt7SzuTb0+ff3Ozl3+3n4O7o5fHs5vHt6fPv8ff08vj29fn39vr5+Pv6+fv6/P39Yay7OwAAABd0Uk5TAAIIEREWM0BQUVJdaG1tboSFobLb3vO47oxeAAABa0lEQVQoz11SCVLDMAxULudU7kQUFwqlBcpZSrn5/7uQlTjTsjOJvbIkazcB8BSAT4Sg9AIBkB/IADoioA1xgDl2JgEy0uu52SARFRyHKOWXw7RMJEg5L8u57nlZLXQFYU1SGiDGILkDQkNQShg1BhAx0auNoQ1CathyPTvR1JoLyzGTpE2CedO3FaILApVmkTdsIRxvcEASpbATGmBtm5iWuW3ZoQfYEO2fruUwAuyJdo+38x2zDLAVprfMUsDKZD4s9swUxFYClWJUYQUZgS5i1fZNjskwWiyDBTAhiHFCfBB3Ew7kVdP2fdtUOZPEndQVVsVwUzGaya1K+odSXFdoZiaa3TMu7Bm7p9hmI46t/n55f317Zpwya5F1Zmhc4KPfj5/Pr6u7861m1iMbEqGxy1Zd3pzJUYPsnM9zd/YuwYwNZgWe/ANYHw9YWz8co7jspk9SGs3OaIcT4hFCBw7hqyjNsjRSvo38AfBOLP4GfSZdAAAAAElFTkSuQmCC';
	iconDefault = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAAGzs1ytAAAABGdBTUEAALGPC/xhBQAAAzpJREFUOBGdVV9Ik1EUP+c65+awpWELXVNpzhBEM6uH/uBDUFBiD4GQURnlQ9BDL4U9RURWFD0EBTOQoEKIKOnRHqICsyKMoHAJ2VDLgunQzW9//G73XHe/7ZsTsQvj3PM7f75z7/ndMwCxvP6KZyTl5tb7G9zr93BcBDxcWqTSUzFCEsmsUGZsGLu4NEZY3fnMzryp2PPbu8BZ4JRB4wl9XkY091baSCGUiTSBU2PdeaTUPfIUO/c7/65rKf4VejEzjN4ezwfg0ERGtRgB9aUNcG3PTYWBUVZhfiFYmVUaTIUrVzbaGRRVYFgBpMuyCMj1QeXICmzuwPHABFKZ8xEIKcPyEsMWLQJB5UBVb3E1QpVzE1wZvARJPSkOo+6WO8Up2FnlTLKutF44V0Hb5iPQXnss0wSyZt8DX7ke08ZNlgxFOE187wy6jQOSrdpfeYIj70LOyzjgS7uDn/zSHpxWcStnRvg4ejq4jQIws5sqwxKZChAdqZgB4IuEWOKVBuwOKMkraXF2K+jhgT7YuqEJiqxrYCT0TcFSJhNYYxCAkIS419hCTDgXSfa9O/rJCEDgey2GJjaOfAcU20rA5YjCxiJPpgk44mRO56SegIb1jWBhaTNy7Ebf/couXdevmtLkUIh1jIhPHcphNyBiHSnygNRKejGG1dhgmN4d0ZMgU7sJoCZNLsA5XecXVr5/DDOG18vy4ParjjGN4tUyEhPxeEwbEuQtV8bVSDo2Fth2qIrl8eTlCTb/b1IqgGLpRVAu0lGyHfReUjKXd201XN5lbtTd4Tvwdvx1plvOPQLrEMNJzEfOfdke9MoftzyB+ELc4Ae9dGKkWlpyHpr7dio1LREDjN5lGjHvKOlcYg6iyaj8zcZn4cxAJwxNDsLBp/vAZrGbA1Ia5WT02HNaBRhJROBPdAqmtRDMaNMwFf0NUYEFZ3+KOZVYLkxcMA6kJiL+yKaWq9AFh2valg8WloRI7v98L8sHw2IqVUm6yQGT1N+I1pr+CLIiVlbFEHJb2G7itMFjipJDNK49X/UHREJmtR1SHKZcpsQEqEV/GlqEtYp53yq8alWTacSID39FwH6bQ+/PHMQqluQ/Z99EBkHYrrcAAAAASUVORK5CYII=';

	drawingOptions = <IDrawingOptions>{
		circleMaxRadius: 40000,
		circleMinRadius: 900,
		circleRadius: 30000,
		drawMode: null,
		markerLatitude: 0,
		markerLongitude: 0,
		circleLatitude: 0,
		circleLongitude: 0,
		enableDraw: false
	}

	mapOptions = <IMapOptions>{
		latitude: 27.215556209029693,
		longitude: 18.45703125,
		zoom: 3,
		minZoom: 4,
		maxZoom: 22,
		preloaderIsOpen: true,
		provider: MapType.GOOGLE,
		enableDefaultControl: false,
		enableClick: true,
		defaultCursor: 'default'
	}

	clusterOptions = <IClusterOptions>{
		gridSize: 200,
		minimumClusterSize: 2
	}

	tooltipOptions = <ITooltipOptions>{
		clientX: 0,
		clientY: 0,
		isOpen: false,
		title: 'radius'
	}

	infoBoxOptions = <IInfoBoxOptions>{
		clientX: 0,
		clientY: 0,
		title: '',
		discription: '',
		isOpen: false
	}

	mapReady(): void {
		this.map.getGeoLocation().subscribe(position => {
			this.drawingOptions.enableDraw = false;
			this.drawingOptions.markerLatitude = position.latitude;
			this.drawingOptions.markerLongitude = position.longitude;
			this.drawingOptions.drawMode = drawingMode.MARKER;
		});
	}

	circleRadiusChangeDrawing(event): void {
		this.removeMarkers();
		this.tooltipOptions.clientX = event.pixel.clientX;
		this.tooltipOptions.clientY = event.pixel.clientY;
		this.tooltipOptions.title = Math.ceil(event.radius).toString();
		this.tooltipOptions.value = 'm';
		this.tooltipOptions.isOpen = true;
		this.infoBoxOptions.isOpen = false;
	}

	circleRadiusComplete(event): void {

		this.removeMarkers();
		this.getPoints(event.position.latitude, event.position.longitude, event.radius);
		this.mapOptions.preloaderIsOpen = true;
		this.tooltipOptions.isOpen = false;
		this.infoBoxOptions.isOpen = false;
	}

	zoomChangeMap(): void {
		this.infoBoxOptions.isOpen = false;
	}

	boundsChangeMap(): void {
		this.infoBoxOptions.isOpen = false;
	}

	circleCenterChange(): void {
		this.removeMarkers();
		this.infoBoxOptions.isOpen = false;
	}

	markerDrawMouseOver(): void {
		this.infoBoxOptions.isOpen = false;
	}

	circleCreate(event): void {
		this.getPoints(event.position.latitude, event.position.longitude, event.radius);
		this.mapOptions.preloaderIsOpen = true;
		this.mapOptions.defaultCursor = TypeCursor.default;
	}

	markerCreate(): void {
		this.drawingOptions.drawMode = drawingMode.CIRCLE;
	}

	circleCenterComplete(event): void {
		this.removeMarkers();
		this.getPoints(event.position.latitude, event.position.longitude, event.radius);
		this.tooltipOptions.isOpen = false;
		this.infoBoxOptions.isOpen = false;
		this.mapOptions.preloaderIsOpen = true;
	}

	private getPoints(latitude: number, longitude: number, radius: number) {
		this.mapOptions.preloaderIsOpen = true;
		const url = 'https://hotel-be-api.azurewebsites.net/api/HotelGeneralInfo/PostSearchMinimal';
		const body = <ISearchMinimalRequest>{
			filter: <ISearchMin>{
				coordinateContains: <IPosition>{
					latitude: latitude,
					longitude: longitude
				},
				distance: radius,
			},
		}
		return this.http.post<ISearchMinimalResponse>(url, body).subscribe(data => {
			if (data.items.length > 0) {
				this.responcePoints(data);

			}
			this.mapOptions.preloaderIsOpen = false;
		},
		error => {
			this.mapOptions.preloaderIsOpen = false;
		  });
		 
	}

	onChangedDrawingControl(type): void {

		switch (type) {
			case DrawingManagerType.circle:
				this.drawingOptions.enableDraw = false;
				break
			case DrawingManagerType.area:
				break
			case DrawingManagerType.marker:
				this.drawingOptions.enableDraw = true;
				this.mapOptions.defaultCursor = TypeCursor.crosshair;
				this.removeMarkers();
				break
		}
	}

	markerMouseOver(marker: IMarker, event): void {
		this.infoBoxOptions.clientX = event.clientX;
		this.infoBoxOptions.clientY = event.clientY;
		this.infoBoxOptions.title = marker.title;
		this.infoBoxOptions.discription = marker.address;
		this.infoBoxOptions.isOpen = true;
	}

	markerMouseOut(): void {
		this.infoBoxOptions.isOpen = false;
	}

	mapClick(position: IPosition): void {
		this.drawingOptions.circleLatitude = position.latitude;
		this.drawingOptions.circleLongitude = position.longitude;
	}

	markerClick(marker: IMarker): void {
		this.selectedIcon();
		marker.iconUrl = this.iconSelected;
		marker.iconZIndex = 9999;
		marker.iconWidth = 26;
		marker.iconHeight = 26;
	}

	selectedIcon(): void {
		this.markers.forEach(key => {
			key.iconUrl = this.iconDefault;
			key.iconWidth = 22;
			key.iconHeight = 22;
			key.iconZIndex = 99;
		});
	}


	private responcePoints(data): void {
		data.items.forEach(point => {
			this.addMarkers(point);
		});
	}

	addMarkers(point): void {
		const marker = <IMarker>{
			latitude: point.latitude,
			longitude: point.longitude,
			title: point.name,
			iconUrl: this.iconDefault,
			inCluster: false,
			address: point.address,
			typePoint: TypePoint.hotel,
			iconZIndex: 99,
			iconHeight: 22,
			iconWidth: 22

		}
		this.markers.push(marker);
	}

	removeMarkers(): void {
		this.markers = []
	}
}
