import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbToastrModule, NbAutocompleteModule, NbIconModule, NbDatepickerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SharedModule } from './shared/shared.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpTokenInterceptor } from './core/interceptors/http.token.interceptor';
import { registerLocaleData } from '@angular/common';
import fr from "@angular/common/locales/fr";
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { fr_FR, NZ_I18N } from 'ng-zorro-antd/i18n';
import { environment } from 'src/environments/environment';
import { NgxStripeModule } from 'ngx-stripe';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { HttpCacheInterceptorModule } from '@ngneat/cashew';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
registerLocaleData(fr);
const config: SocketIoConfig = { url: environment.socketServer, options: { transports: ['websocket'] } };
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    SharedModule,
    NbLayoutModule,
    TranslateModule.forRoot({
      defaultLanguage: localStorage.getItem('language') ?? 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    }),
    NbToastrModule.forRoot(),
    NzSpinModule,
    NbAutocompleteModule,
    NgxStripeModule.forRoot(environment.publicStripeKey),
    SocketIoModule.forRoot(config),
    NbDatepickerModule.forRoot(),
    LottieModule.forRoot({ player : playerFactory }),
    HttpCacheInterceptorModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true},
    { provide: NZ_I18N, useValue: fr_FR }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function playerFactory() {
  return player;
}