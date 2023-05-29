import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { BaseUrlInterceptor } from './shared/services/base-url.interceptor';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [AppComponent, ErrorPageComponent, HeaderComponent, SidebarComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
        // TODO: Uncomment to change the base url
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: BaseUrlInterceptor,
        //     multi: true
        // },
        // {
        //     provide: "BASE_API_URL", useValue: environment.apiUrl
        // }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
