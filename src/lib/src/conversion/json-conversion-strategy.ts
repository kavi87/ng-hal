import { Response }             from '@angular/http';

import { Parser }               from '../hal/parser';
import { Resource }             from '../hal/resource.interface';
import { ConversionStrategy }   from './conversion-strategy';


/** A converter for 'application/hal+json' */
export class JsonConversionStrategy implements ConversionStrategy {

  constructor(
    private parser: Parser
  ) {}

  accepts(response: Response): boolean {
    let mediaType: string = response.headers.get('Content-Type');

    return mediaType === 'application/json' || mediaType === 'application/hal+json';
  }

  convert(response: Response): Resource {
    let data = response.json();

    // TODO: need proper resource object
    return this.parser.parse(data);
  }

}
