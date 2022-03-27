import { coordinateData } from './coordinate-data'

export const convertData = function (data: any) {
  const res = []
  const len = data.length
  for (let i = 0; i < len; i++) {
    const geoCoord = coordinateData[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}
