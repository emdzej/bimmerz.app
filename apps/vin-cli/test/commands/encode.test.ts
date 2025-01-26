import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('encode', () => {
  it('runs encode cmd', async () => {
    const {stdout} = await runCommand('encode')
    expect(stdout).to.contain('hello world')
  })

  it('runs encode --name oclif', async () => {
    const {stdout} = await runCommand('encode --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
