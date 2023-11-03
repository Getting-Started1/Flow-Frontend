import React from 'react'



function SideDashboard() {
  return (
    <div className='table-section'>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">Pipe</th>
      <th scope="col">Alert</th>
      <th scope="col">Usage</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Null</td>
      <td>83%</td>
      <td>Risk</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Null</td>
      <td>75%</td>
      <td>Risk</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Null</td>
      <td>64%</td>
      <td>Early Warning</td>
    </tr>
  </tbody>
</table>
    </div>
  )
}

export default SideDashboard