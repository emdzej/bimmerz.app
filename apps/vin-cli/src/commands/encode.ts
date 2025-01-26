import {Args, Command, Flags} from '@oclif/core'
import { assertValidVin, encodeVin } from '@bimmerz/vin'
import { arrayToHex } from '@bimmerz/core'

export default class Encode extends Command {
  static override args = {
    vin: Args.string({description: 'VIN string to encode'}),
  }

  static override description = 'describe the command here'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {    
    "tuner-pro": Flags.boolean({char: 't', description: 'output in TunerPro format, ready to copy & paste'})    
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Encode)
    if (!args.vin) {
      this.error('VIN is required')
    }
    assertValidVin(args.vin);
    this.log(arrayToHex(encodeVin(args.vin), flags["tuner-pro"] ? "\t" : " "));
  }
}
