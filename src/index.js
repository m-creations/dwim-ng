import Cat from './cat.js';
import Dog from './dog.js';

import * as core from '@angular/core';
import * as common from '@angular/common';
import * as forms from '@angular/forms';
import * as platformBrowser from '@angular/platform-browser';
import * as platformBrowserDynamic from '@angular/platform-browser-dynamic';

import * as primeng from 'primeng/primeng';

var ng = {
  core: core,
  common: common,
  forms: forms,
  platformBrowser: platformBrowser,
  platformBrowserDynamic: platformBrowserDynamic
};

export { Dog, Cat, primeng, ng };
