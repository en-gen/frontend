import { remote } from 'electron'
import path from 'path'
// import Datastore from 'nedb'

let relRoot = process.env.NODE_ENV === 'development'
  ? '/../../../../../data'
  : '/../../data'

const rootPath = path.normalize(remote.app.getAppPath() + relRoot)

export default {
  load (db) {
    alert(path.join(rootPath, `${db}.db`))
  }
}
