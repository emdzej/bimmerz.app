import {Args, Command, Flags} from '@oclif/core'
import { assertValidVin, decodeVin } from '@bimmerz/vin';
import { hexToArray } from '@bimmerz/core';

export default class Decode extends Command {
  static override args = {
    bin: Args.string({description: 'binary hex string to decode'}),
  }

  static override description = 'describe the command here'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    "tuner-pro": Flags.boolean({char: 't', description: 'input in TunerPro format, ready to copy & paste'})
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Decode)
    if (!args.bin) {
      this.error('binary hex string is required')
    }
    const encodedVin = hexToArray(args.bin, flags["tuner-pro"] ? "\t" : " ");        
    this.log(decodeVin(encodedVin));
  }
}
