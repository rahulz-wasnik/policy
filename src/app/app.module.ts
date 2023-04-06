import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@NgModule({
    declarations: [AppComponent, ErrorPageComponent, HeaderComponent, SidebarComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [provideHttpClient()],
    bootstrap: [AppComponent]
})
export class AppModule {}
