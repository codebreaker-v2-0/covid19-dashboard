import {LineChart, XAxis, YAxis, Legend, Line, Tooltip} from 'recharts'

const LineChartItem = props => {
  const {data, type} = props

  const updatedData = []
  for (let i = 1; i < data.length; i += 1) {
    const item = {
      date: data[i].date,
    }
    if (type !== 'active') {
      item[type] = data[i][type] - data[i - 1][type]
    } else {
      item[type] = data[i][type]
    }
    updatedData.push(item)
  }

  const dataFormatter = num => {
    if (num > 1000) return `${Math.round(num / 1000)}k`
    return num
  }

  const name = type.charAt(0).toUpperCase() + type.substr(1).toLowerCase()

  return (
    <LineChart width={730} height={250} data={updatedData}>
      <XAxis dataKey="date" />
      <YAxis tickFormatter={dataFormatter} />
      <Legend />
      <Tooltip />
      <Line type="monotone" dataKey={type} name={name} />
    </LineChart>
  )
}

export default LineChartItem
