import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';
import { MapsModule } from './maps/maps.module';

import { AppComponent } from './app.component';
import { DownloadComponent } from './pages/download/download.component';
import { FormsComponent } from './pages/forms/forms.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/auth/login/login.component';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        FormsComponent,
        HeaderComponent,
        DownloadComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MapsModule,
        FormsModule,
        HttpClientModule,
        NgPipesModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
