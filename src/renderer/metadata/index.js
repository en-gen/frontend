import tgdb from './tgdb'
import igdb from './igdb'

import { remote } from 'electron'
const settings = remote.require('electron-settings')

const apis = {
  tgdb: tgdb,
  igdb: igdb
}

const getClient = function (clientKey) {
  let metaApi = clientKey || settings.get('system.metaProvider', 'tgdb')
  return apis[metaApi]
}

export default {
  getPlatforms: getClient().getPlatforms
}
