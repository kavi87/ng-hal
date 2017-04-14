import { ModuleWithProviders, NgModule } from '@angular/core';

import { CONVERSION_STRATEGY, ConversionStrategy } from './conversion/conversion-strategy';
import { JsonConversionStrategy } from './conversion/json-conversion-strategy';
import { Parser } from './hal/parser';
import { Navigator } from './navigator';


export function jsonConversionProvider(parser: Parser) {
  return new JsonConversionStrategy(parser);
}

/** Angular module for HAL Navigator. */
@NgModule({})
export class HalModule {


  /** Return a module for HAL Navigator with root providers. */
  public static forRoot(): ModuleWithProviders {

    return {
      ngModule: HalModule,
      providers: [
        {
          provide: CONVERSION_STRATEGY,
          useFactory: jsonConversionProvider,
          deps: [ Parser ]
        },
        {
          provide: Parser,
          useClass: Parser
        },
        {
          provide: Navigator,
          useClass: Navigator
        }
      ]
    };
  }

}
