import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MapsModule} from './maps/maps.module';
import {LoginComponent} from './pages/auth/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsComponent} from './pages/forms/forms.component';
import {HeaderComponent} from './components/header/header.component';
import {DownloadComponent} from './pages/download/download.component';
import {NgPipesModule} from 'ngx-pipes';
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
        NgPipesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
