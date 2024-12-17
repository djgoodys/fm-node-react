import React, { useState, useRef, useEffect } from 'react';
import passwordhelp from '../images/passwordhelp.jpg'
import { useSelector, useDispatch } from 'react-redux';
import { Login } from '../thunks/loginThunk'
import { useNavigate } from 'react-router-dom'
import { manageEquipment } from '../thunks/equipmentThunk';


const FrmLogin = () => {
  const loading = useSelector(state => state.loading)
  const error = useSelector(state => state.error)
  const [serverMessage, setServerMessage] = useState('')
  const refUserName = useRef(null)
  const refPassword = useRef(null)
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userData)
  const [spinner, setSpinner] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [name, setName] = useState('')
  let user
  const navigate = useNavigate()

  const submitLogin = async (e) => {
    e.preventDefault()
    setServerMessage('')
    setSpinner(true)

    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      const obj = {
        username: username,
        password: password,
        action: 'login'
      };
      const response = await dispatch(Login(obj));
      //console.log('Response:', JSON.stringify(response, null, 2));
      //setServerMessage(response.payload.user.username)
      try {
        const response = await dispatch(Login(obj));
        user = response.payload.user
        console.log("user.username="+user[0].username+" username="+refUserName.current.value)
        if (user[0].username === refUserName.current.value) {
          setSpinner(true);
          setServerMessage("logon successfull")
          localStorage.setItem("admin", response.payload.user.admin);
          navigate('/fmnodereact/equipment');
          localStorage.setItem("loggedin", "true");
        } else {
          setServerMessage("LOGIN ATTEMPT FAILED");
          setSpinner(false);
          setIsSubmitting(false);
        }
        if (user  && user.length > 0) {
          user.forEach(user => {
            // console.log("name: " + user.username);
            // console.log("password: " + user.password);
            // console.log("email: " + user.email);
            // console.log("admin: " + user.admin);
            // console.log("createdAt: " + user.createdAt);
            
          });
        } else {
          console.log("No users found or incorrect response structure");
        }

      } catch (error) {
        console.error('Login error:', error);
      }
    

    } catch (error) {
      console.error("Login error:", error);
      setIsSubmitting(false);
    }

  }

  const GoToAdmin = () => {
    navigate("/fmnodereact/admin")
  }
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData.userData))
    if (Array.isArray(userData)) {
    }
    else {
    }
  }, [userData]);




  return (
    <div style={{ marginTop: "200px", display: 'flex', flexDirection: "column", height: '100%', justifyContent: "center", alignItems: "center" }}>

      <div className={serverMessage !== "" ? "server-message-visible" : "server-message-hidden"} id="divServerMessage">{serverMessage}</div>
      <form id="frmLogin" style={{ width: '80%', margin: 'auto', display: 'flex' }}>
 
        <table id="tblLogin" style={{ width: '75%', textAlign: 'center' }}>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  id="txtUserName"
                  ref={refUserName}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ENTER USER NAME HERE"
                  size="21"
                  maxLength="10"
                  style={{ marginRight: 'auto', marginLeft: '300px', display: 'inline-block' }}
                />
              </td>
              <td>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  ref={refPassword}
                  value={password}
                  style={{ color: 'black' }}
                  id="txtPassword"
                  autoComplete="on"
                  placeholder="ENTER PASSWORD HERE"
                />
              </td>
              <td>
                <input
                  type="button"
                  id="btnLogon"
                  className="myButton"
                  name="action"
                  value="login"
                  onClick={(event) => submitLogin(event)}
                />
              </td>
              <td>
                <a href="login_help.php" title="Password help" target="iframe2">
                  <img
                    src={passwordhelp}
                    style={{ width: '40px', boxShadow: '4px 4px black', marginTop: '0px', height: 'auto', borderRadius: '50%' }}
                    alt="Password Help"
                  />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FrmLogin;
