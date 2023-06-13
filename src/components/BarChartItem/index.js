import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const BarChartItem = props => {
  const {data, sortBy} = props
  const updatedData = []
  for (let i = data.length - 10; i < data.length; i += 1) {
    if (sortBy !== 'active') {
      updatedData.push({
        date: data[i].date,
        cases: data[i][sortBy] - data[i - 1][sortBy],
      })
    } else {
      updatedData.push({
        date: data[i].date,
        cases: data[i][sortBy],
      })
    }
  }

  const dataFormatter = num => {
    if (num > 1000) return `${Math.round(num / 1000)}k`
    return num
  }

  const name = sortBy.charAt(0).toUpperCase() + sortBy.substr(1).toLowerCase()

  return (
    <div>
      <h1>Bar Chart Item</h1>
      <BarChart width={500} height={300} data={updatedData}>
        <XAxis dataKey="date" />
        <YAxis tickFormatter={dataFormatter} />
        <Legend />
        <Bar dataKey="cases" name={name} />
      </BarChart>
    </div>
  )
}

export default BarChartItem
