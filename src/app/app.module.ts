import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { PrototypePermissionService } from '../app/services/prototype-permission-service';
import { PrototypeVocabularyService } from '../app/services/prototype-vocabulary-service';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { AppComponent } from './components/app/app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './modules/app-material.module';
import {
	AppSubscriberService,
	VocabularyService,
	OrderService,
	PermissionService,
	H21RightOverlayPanelService,
	H21HeaderModule,
	H21TopToolbarModule,
	H21HotelSearchResultModule,
	H21HotelFilterPanelModule,
	H21HistoryPanelModule,
	H21HotelSearchPanelModule,
	H21SidebarNavModule,
	H21HotelBookModule,
	H21HotelBookComponent,
	H21HotelReservationModule,
	H21HotelReservationComponent,
	H21AccountSelectModule,
	H21AccountSelectService,
} from 'h21-be-ui-kit';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { H21MapModule } from 'h21-map';
import { environment } from '../environments/environment';
import { AppInsightInterceptor } from './interceptors/app-insight-interceptor';
import { AppInsightsService } from '@markpieszak/ng-application-insights';
import { H21MapsComponent } from './components/h21-maps/h21-maps.component';

const routes: Routes = [
	{ path: '', redirectTo: 'map', pathMatch: 'full' },
	{ path: 'profile', redirectTo: 'map', pathMatch: 'full' },
	{ path: 'orders', redirectTo: 'map', pathMatch: 'full' },
	{ path: 'map', component: H21MapsComponent },
	{ path: 'cart', component: H21HotelReservationComponent },
	{ path: 'hotelbook/:id', component: H21HotelBookComponent },
	{ path: '**', redirectTo: '/' }
];

@NgModule({
	declarations: [
		AppComponent,
		H21MapsComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		BrowserAnimationsModule,
		AppMaterialModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		MatInputModule,
		MatNativeDateModule,
		NouisliderModule,
		H21HeaderModule,
		H21TopToolbarModule,
		H21HotelSearchResultModule,
		H21HotelFilterPanelModule,
		H21HistoryPanelModule,
		H21HotelSearchPanelModule,
		H21SidebarNavModule,
		H21HotelBookModule,
		H21HotelReservationModule,
		H21AccountSelectModule,
		H21MapModule
	],
	providers: [
		{
			provide: PermissionService,
			useClass: PrototypePermissionService
		},
		{
			provide: VocabularyService,
			useClass: PrototypeVocabularyService
		},
		H21RightOverlayPanelService,
		H21MapModule,
		AppSubscriberService,
		H21AccountSelectService,
		OrderService,
		
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AppInsightInterceptor,
			multi: true
		}, AppInsightsService
	],
	bootstrap: [AppComponent],
	entryComponents: []
}
)
export class AppModule {
	constructor(private appInsightsService: AppInsightsService) {
		appInsightsService.config = {
			instrumentationKey: environment.AppInsightInstrumentationKey // <-- set it later sometime
		};
		// then make sure to initialize and start-up app insights
		appInsightsService.init();
	}
}
