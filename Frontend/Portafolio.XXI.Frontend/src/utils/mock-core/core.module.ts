import {NgModule, Optional, SkipSelf} from '@angular/core';
import {fakeBackendProvider} from "./helper/fake-backend";
import {StorageService} from "../../services/storage.service";
import { Shared } from '../shared/shared';
import {AuthorizatedGuard} from "./guards/authorizated.guard";

@NgModule({
  declarations: [  ],
  imports: [],
  providers: [
    StorageService,
    Shared,
    AuthorizatedGuard,
    fakeBackendProvider
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
