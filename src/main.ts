import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Українські назви місяців для DatePipe.
registerLocaleData(localeUk);

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
