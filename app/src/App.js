import React, { useEffect, useState } from 'react'
import SocketIOClient from 'socket.io-client' 
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from 'recharts'

export default function App() {
const [data, setData] = useState([])

useEffect(() => {
    setInterval(() => {
    const socket = SocketIOClient('http://localhost:4001/');
    socket.on("Message", (data) => {
            setData(data);
            // this.render()
        })
    }, 5000)
}, [])
  return (
    <div>
      {/* <h1>{data}</h1> */}
      <LineChart
        width={1000}
        height={400}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="x" stroke="#ff7300" yAxisId={0} />
        <Line type="monotone" dataKey="y" stroke="#387908" yAxisId={1} />
      </LineChart>
    </div>
  );
}
