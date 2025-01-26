import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('decode', () => {
  it('runs decode cmd', async () => {
    const {stdout} = await runCommand('decode')
    expect(stdout).to.contain('hello world')
  })

  it('runs decode --name oclif', async () => {
    const {stdout} = await runCommand('decode --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
