import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NbLayoutModule, NbThemeModule, NbButtonModule, NbSelectModule, NbIconModule, NbBadgeModule, NbCardModule, NbSpinnerModule } from '@nebular/theme';
import { Platform } from '@angular/cdk/platform';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { OverlayModule, OverlayPositionBuilder, ViewportRuler, OverlayKeyboardDispatcher } from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { LessonDetailsComponent } from './_components/lesson-details/lesson-details.component';
import { DefaultDashboardRedirectionComponent } from './_components/default-dashboard-redirection/default-dashboard-redirection.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, LessonDetailsComponent, DefaultDashboardRedirectionComponent],
  imports: [
    CommonModule,
    NzModalModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbThemeModule,
    NbButtonModule,
    HttpClientModule,
    NbSelectModule,
    RouterModule,
    TranslateModule,
    NbIconModule,
    NzBadgeModule,
    NbCardModule,
    NbSpinnerModule
  ],
  exports : [HeaderComponent, FooterComponent, TranslateModule, FormsModule, ReactiveFormsModule, LessonDetailsComponent],
  providers: [
    Platform,
    OverlayPositionBuilder,
    ViewportRuler,
    OverlayKeyboardDispatcher,
    Directionality,
    NzConfigService,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
