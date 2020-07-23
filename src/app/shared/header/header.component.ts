import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  language = localStorage.getItem('language') ?? 'en';
  constructor(private translationService : TranslateService) { }

  ngOnInit() {
  }

  languageChange(language = 'en'){
    localStorage.setItem('language', language);
    this.translationService.use(language);
  }

}
