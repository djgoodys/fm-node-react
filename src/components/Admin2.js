import React, {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap';

const Admin = () =>{

const userNameRef = useRef(null)
const userData = useSelector((state) => state.userData)
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('')
const [admin, setAdmin] = useState(false)
const [serverMessage, setServerMessage] = useState('')

const addUser = async (e) => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, admin}),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setServerMessage(`User ${data.username} created successfully!`);
      setUsername('');
      setPassword('');
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  const toggleAdmin = () => { setAdmin(prevAdmin => !prevAdmin); };

return (
    <div>
    <Table striped hover>
        <thead>
            <tr>
                <th colSpan={4}>Add New User</th>
            </tr>
            <tr>
                <th>
                    User name
                </th>
                <th>
                    Password
                </th>
                <th>
                    Email
                </th>
                <th>
                    Admin
                </th>
                <th>
                    Backup Folder
                </th>
            </tr>
        </thead>
      <tbody>
        <tr>
        <td>
          <input
            type="text"
            value={username}
            ref={userNameRef}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          </td>
        <td>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </td>
          <td>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </td>
        <td>
          <input
            type="checkbox"
            style={{width:"50px", height:"50px"}}
            value={admin}
            onChange={(e) => toggleAdmin(e.target.value)}
            required
          />
        </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        <td>
        <button onClick={()=>addUser()}>Add User</button>
      </td>
      <td>
      {serverMessage && <p>{serverMessage}</p>} 
      </td>
      </tr>
      </tbody>
    </Table> 
    </div>
)

}

export default Admin