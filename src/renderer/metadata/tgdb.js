import axios from 'axios'
import xml2js from 'xml2js'

var parser = new xml2js.Parser({
  trim: true,
  normalize: true,
  explicitArray: false,
  valueProcessors: [ xml2js.processors.parseNumbers ]
})

const parseStringAsync = (xml) => new Promise((resolve, reject) => {
  parser.parseString(xml, (err, result) => {
    if (err) reject(err)
    resolve(result)
  })
})

export default {
  async getPlatforms () {
    let response = await axios.get('http://thegamesdb.net/api/GetPlatformsList.php')
    let js = await parseStringAsync(response.data)
    return js.Data.Platforms.Platform
  }
}
