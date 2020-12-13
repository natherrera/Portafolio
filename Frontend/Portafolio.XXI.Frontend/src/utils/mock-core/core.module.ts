import {NgModule, Optional, SkipSelf} from '@angular/core';
import {fakeBackendProvider} from "./helper/fake-backend";
import {StorageService} from "../../services/storage.service";
import {AuthorizatedGuard} from "./guards/authorizated.guard";
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [  ],
  imports: [],
  providers: [
    StorageService,
    AuthorizatedGuard,
    fakeBackendProvider,
    DatePipe
  ],
  bootstrap: []
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
