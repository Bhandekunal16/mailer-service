/* eslint-disable @typescript-eslint/no-var-requires */
const Log = require('robotic.js/src/interface/Logger');
const maintain = require('robotic.js/src/interface/maintain');
import Logger from 'robotic.js/types/interface/Logger';
import Maintainer from 'robotic.js/types/interface/maintain';

export class Localizer {
  public logger: Logger = new Log();
  public maintain: Maintainer = new maintain();
}
