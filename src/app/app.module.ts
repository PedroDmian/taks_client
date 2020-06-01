import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppRoutingModule } from "./app-routing.module";

// ? Components
import { AppComponent } from "./app.component";
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// ? Service
import  { AuthService } from './services/auth.service';
import { TaksBannerComponent } from './components/taks-banner/taks-banner.component';
import { TaksFormComponent } from './components/taks-form/taks-form.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptFormsModule,
        NativeScriptModule,
        NativeScriptHttpClientModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientJsonpModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        TaksBannerComponent,
        TaksFormComponent
    ],
    providers: [
        AuthService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
