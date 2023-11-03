import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import "chartjs-adapter-date-fns"; // Import the date-fns adapter for time scales
import SideDashboard from "./SideDashboard";


function Dashboard() {
  const [messages, setMessages] = useState([]);
  // const [chartData, setChartData] = useState(null); // Initialize chartData as null

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.addEventListener("message", (event) => {
      try {
        const messageData = JSON.parse(event.data);
        console.log("Received WebSocket message:", messageData);

        setMessages((prevMessages) => [...prevMessages, messageData]);

      } catch (error) {
         console.error("Error parsing JSON:", error);
     }
     });

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);

  return (
    <>
    <div className="table-dashboard">
    <div>
      <SideDashboard/>
    </div>
    <div className="dashBoard-section">

      <Typography variant="h4" gutterBottom>
        Water Consumption Dashboard
      </Typography>

      {/* Current Flow Volume */}
      <Paper elevation={3} style={{ padding: "16px", margin: "16px" }}>
        <Typography variant="h6" gutterBottom>
          Current Flow Volume
        </Typography>
        {messages.length > 0 ? (
          <Typography variant="h4">
            {messages[messages.length - 1].flowVolume.toFixed(2)} liters/min
          </Typography>
        ) : (
          <Typography variant="h4">Loading...</Typography>
        )}
      </Paper>

      {/* Water Detection Status */}
      <Paper elevation={3} style={{ padding: "16px", margin: "16px" }}>
        <Typography variant="h6" gutterBottom>
          Water Detected
        </Typography>
        {messages.length > 0 ? (
          <Typography
            variant="h4"
            color={
              messages[messages.length - 1].waterDetected ? "primary" : "error"
            }
          >
            {messages[messages.length - 1].waterDetected ? "Yes" : "No"}
          </Typography>
        ) : (
          <Typography variant="h4">Loading...</Typography>
        )}
      </Paper>

    </div>
    </div>
    </>
  );
}

export default Dashboard;

// HOPES

// import React, { useEffect, useState } from 'react';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import { Line } from 'react-chartjs-2';

// function Dashboard() {
//   const [messages, setMessages] = useState([]);
//   const [chartData, setChartData] = useState(null); // Initialize chartData as null

//   useEffect(() => {
//     const newSocket = new WebSocket('ws://localhost:8080');

//     newSocket.addEventListener('message', (event) => {
//       try {
//         const messageData = JSON.parse(event.data);
//         console.log('Received WebSocket message:', messageData);

//         setMessages((prevMessages) => [...prevMessages, messageData]);

//         // Update chartData with new data
//         setChartData((prevChartData) => ({
//           labels: [...(prevChartData ? prevChartData.labels : []), new Date().toLocaleTimeString()],
//           datasets: [
//             {
//               label: 'Flow Volume (L/m)',
//               data: [...(prevChartData ? prevChartData.datasets[0].data : []), messageData.flowVolume],
//               borderColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 2,
//               fill: false,
//             },
//           ],
//         }));
//       } catch (error) {
//         console.error('Error parsing JSON:', error);
//       }
//     });

//     return () => {
//       if (newSocket) {
//         newSocket.close();
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Water Consumption Dashboard
//       </Typography>

//       {/* Current Flow Volume */}
//       <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
//         <Typography variant="h6" gutterBottom>
//           Current Flow Volume
//         </Typography>
//         {messages.length > 0 ? (
//           <Typography variant="h4">
//             {messages[messages.length - 1].flowVolume.toFixed(2)} liters/min
//           </Typography>
//         ) : (
//           <Typography variant="h4">Loading...</Typography>
//         )}
//       </Paper>

//       {/* Water Detection Status */}
//       <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
//         <Typography variant="h6" gutterBottom>
//           Water Detected
//         </Typography>
//         {messages.length > 0 ? (
//           <Typography variant="h4" color={messages[messages.length - 1].waterDetected ? 'primary' : 'error'}>
//             {messages[messages.length - 1].waterDetected ? 'Yes' : 'No'}
//           </Typography>
//         ) : (
//           <Typography variant="h4">Loading...</Typography>
//         )}
//       </Paper>

//       {/* Chart */}
//       {chartData && chartData.labels.length > 0 ? ( // Check if chartData and its labels exist
//         <Grid item xs={12}>
//           <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
//             <Typography variant="h6" gutterBottom>
//               Flow Volume Trend
//             </Typography>
//             <Line
//               data={chartData}
//               options={{
//                 scales: {
//                   x: {
//                     type: 'time',
//                     time: {
//                       unit: 'second',
//                     },
//                   },
//                   y: {
//                     beginAtZero: true,
//                   },
//                 },
//               }}
//             />
//           </Paper>
//         </Grid>
//       ) : (
//         <Typography variant="body2">No data available yet.</Typography>
//       )}
//     </div>
//   );
// }

// export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';

// function Dashboard() {
//   const [data, setData] = useState({ flowVolume: 0, waterDetected: false });

//   useEffect(() => {
//     const socket = new WebSocket('ws://localhost:8080');

//     socket.addEventListener('message', (event) => {
//       try {
//         const messageData = JSON.parse(event.data);
//         console.log('Received WebSocket message:', messageData);

//         // Update the state with the received message
//         setData(messageData);
//       } catch (error) {
//         console.error('Error parsing JSON:', error);
//       }
//     });

//     socket.addEventListener('close', () => {
//       console.log('WebSocket connection closed');
//     });

//     return () => {
//       socket.close();
//     };
//   }, []);

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Water Consumption Dashboard
//       </Typography>

//       {/* Current Flow Volume */}
//       <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
//         <Typography variant="h6" gutterBottom>
//           Current Flow Volume
//         </Typography>
//         <Typography variant="h4">{data.flowVolume.toFixed(2)} liters/min</Typography>
//       </Paper>

//       {/* Water Detection Status */}
//       <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
//         <Typography variant="h6" gutterBottom>
//           Water Detected
//         </Typography>
//         <Typography variant="h4" color={data.waterDetected ? 'primary' : 'error'}>
//           {data.waterDetected ? 'Yes' : 'No'}
//         </Typography>
//       </Paper>
//     </div>
//   );
// }

// export default Dashboard;

//# HARD CODED VALUES

// import React, { useEffect, useState } from 'react';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import Chart from './Chart'; // Import your chart component here

// function Dashboard() {
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);

// //   useEffect(() => {
// //     // ... WebSocket setup code (from the previous example) ...

// //     return () => {
// //       // ... WebSocket cleanup code (from the previous example) ...
// //     };
// //   }, []);
//   useEffect(() => {
//     // Initialize the WebSocket connection
//     const newSocket = new WebSocket('ws://localhost:8080'); // WebSocket server URL
//     setSocket(newSocket);

//     newSocket.addEventListener('open', (event) => {
//       console.log('WebSocket connection established:', event);
//     });

//     newSocket.addEventListener('message', (event) => {
//       // Handle incoming WebSocket messages here
//       console.log('Received WebSocket message:', event.data);

//       // Update the state with the received message
//       setMessages((prevMessages) => [...prevMessages, event.data]);
//     });

//     newSocket.addEventListener('close', (event) => {
//       console.log('WebSocket connection closed:', event);
//     });

//     newSocket.addEventListener('error', (event) => {
//       console.error('WebSocket error:', event);
//     });

//     // Clean up the WebSocket connection when the component unmounts
//     return () => {
//       if (newSocket) {
//         newSocket.close();
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Water Consumption Dashboard
//       </Typography>

//       {/* Current Flow Volume */}
//       <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
//         <Typography variant="h6" gutterBottom>
//           Current Flow Volume
//         </Typography>
//         <Typography variant="h4">123.45 liters/min</Typography>
//       </Paper>

//       {/* Water Detection Status */}
//       <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
//         <Typography variant="h6" gutterBottom>
//           Water Detected
//         </Typography>
//         <Typography variant="h4" color="primary">
//           Yes
//         </Typography>
//       </Paper>

//       {/* Chart */}
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
//             <Typography variant="h6" gutterBottom>
//               Flow Volume Trend
//             </Typography>
//             <Chart /> {/* Replace with your chart component */}
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default Dashboard;

// import React, { useEffect, useState } from 'react';

// function Dashboard() {
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // Initialize the WebSocket connection
//     const newSocket = new WebSocket('ws://localhost:8080'); // WebSocket server URL
//     setSocket(newSocket);

//     newSocket.addEventListener('open', (event) => {
//       console.log('WebSocket connection established:', event);
//     });

//     newSocket.addEventListener('message', (event) => {
//       // Handle incoming WebSocket messages here
//       console.log('Received WebSocket message:', event.data);

//       // Update the state with the received message
//       setMessages((prevMessages) => [...prevMessages, event.data]);
//     });

//     newSocket.addEventListener('close', (event) => {
//       console.log('WebSocket connection closed:', event);
//     });

//     newSocket.addEventListener('error', (event) => {
//       console.error('WebSocket error:', event);
//     });

//     // Clean up the WebSocket connection when the component unmounts
//     return () => {
//       if (newSocket) {
//         newSocket.close();
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <h1>WebSocket Data</h1>
//       <ul>
//         {messages.map((message, index) => (
//           <li key={index}>{message}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Dashboard;
