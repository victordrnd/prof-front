import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NzModalModule, NzConfigService } from 'ng-zorro-antd';
import { NbLayoutModule, NbThemeModule, NbButtonModule } from '@nebular/theme';
import { Platform } from '@angular/cdk/platform';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { OverlayModule, OverlayPositionBuilder, ViewportRuler, OverlayKeyboardDispatcher } from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    NzModalModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbThemeModule,
    NbButtonModule
  ],
  exports : [HeaderComponent],
  providers: [
    Platform,
    OverlayPositionBuilder,
    ViewportRuler,
    OverlayKeyboardDispatcher,
    Directionality,
    NzConfigService
  ]
})
export class SharedModule { }
