/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { exec as _exec } from 'child_process'
import { promisify } from 'util'
import { version } from '../package.json'

const exec = promisify(_exec)

export async function isNpx (): Promise<boolean> {
  const output = await exec('npm list -g musescore-downloader')
  return output.stdout.includes('(empty)')
}

export function getInstalledVer (): string {
  return version
}

export async function getLatestVer (): Promise<string> {
  return (await exec('npm info musescore-downloader version')).stdout.trim()
}

export async function getVerInfo () {
  const installed = getInstalledVer()
  const latest = await getLatestVer()
  return {
    installed,
    latest,
    isLatest: installed === latest,
  }
}