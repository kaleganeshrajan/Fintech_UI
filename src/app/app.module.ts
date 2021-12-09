import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppConstants } from './app.constants';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { Utility } from './utility/utility';
import { IonicStorageModule } from '@ionic/storage';

import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { DatePipe } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { ProgressBarModule } from 'angular-progress-bar';

import { OneSignal } from '@ionic-native/onesignal/ngx';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { HttpErrorInterceptor } from './interceptors/internetConnectionInterceptor';

// this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';


@NgModule({
	declarations: [AppComponent, ],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		NgxEchartsModule,
		Utility,
		IonicStorageModule.forRoot(),
		FormsModule,
		ColorPickerModule,
		Ionic4DatepickerModule,
		IonicSelectableModule,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
		BrowserAnimationsModule,
		ProgressBarModule,

		HttpClientXsrfModule.withOptions({
			cookieName: 'XSRF-TOKEN',
			headerName: 'XSRF-TOKEN',
		}),
		NgIdleKeepaliveModule.forRoot(),
		HttpClientModule,
		FormsModule
	],
	providers: [
		StatusBar,
		DatePipe,
		SplashScreen,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		AppConstants,
		Camera,
		File,
		WebView,
		FilePath,
		ImagePicker,
		OneSignal,
		InAppBrowser,
		CallNumber,
		EmailComposer,
		{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }

	],
	bootstrap: [AppComponent],
	schemas: [NO_ERRORS_SCHEMA]

})
export class AppModule { }
