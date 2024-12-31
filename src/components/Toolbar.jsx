import React, { useEffect, useState, useRef } from 'react';
import Search from './Search.jsx';
import { manageEquipment } from '../thunks/equipmentThunk.js';
import '../css/fm.css'
import Bydate from './Bydate.jsx';
import { useSelector, useDispatch } from 'react-redux'
import Sticky from 'react-stickynode';
import Imgprint from '../images/print3.png';
import { useNavigate } from 'react-router-dom';

const Toolbar = () => {
  const [divOverdueClassName, setDivOverdueClassName] = useState('divOverdue');
  const [serverResponse, setServerResponse] = useState('');
  const dispatch = useDispatch()
  const refDivOverdue = useRef(null)
  const reftxtOverdue = useRef(null)
  const [isOverdue, setIsOverdue] = useState('unchecked')
  const userName = localStorage.getItem('username');
  const [overDue, setOverDue] = useState(false)
  const navigate = useNavigate()
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  function getOverDue() {
    const backup_folder = localStorage.getItem("backup_folder")
    let action = ""
    switch (reftxtOverdue.current.value) {
      case "unchecked":
        setIsOverdue("checked")
        action = 'get-overdue'
        break
      case "checked":
        setIsOverdue("unchecked")
        action = 'get-all-equipment'
        break
      default:
        setIsOverdue("unchecked")

    }

    const obj = {
      action: action,
      backup_folder: backup_folder
    }

    dispatch(manageEquipment(obj))

  }

  return (
    <div>
      <div id="divServerResponse" cols="8" style={{ width: '100%', height: '200px', visibility: 'visible', display: 'none', backgroundColor: 'green', fontSize: '1.5rem', color: 'white', fontWeight: 'bold', overflow: 'scroll' }}>
        {serverResponse}
      </div>
      <div id='tblTools' className="Toolbar">
        <div id="menuTools" >
        </div>
        <div>
          <input type="text" ref={reftxtOverdue} style={{ display: 'none' }} onChange={(event) => setIsOverdue(event.target.value)} value={isOverdue} />
          <div
            ref={refDivOverdue}
            className={isOverdue == "unchecked" ? 'divOverdue' : 'divOverdueChecked'}
            style={{padding:"16px"}}
            onClick={() =>
              getOverDue()
            }
          >
            Over<br />Due
          </div>
        </div>

        <div style={{ paddingTop: '0px', verticalAlign: 'top', height: 'auto' }}>

          <span className="input-group-text border-0 flex-nowrap" id="search-addon">
            <Search />
          </span>
        </div>
        <div>
          <i className="fas fa-search"></i>
          <div id="divOutOfStock" style={{ borderRadius:"8px", border: ' 3px solid green', margin: '10px 10px', width: '150px', height: '80px', boxShadow: ' 4px 4px black',display:"flex",flexDirection:"column" }}>
            <div style={{ borderTopLeftRadius:"8px", borderTopRightRadius:"8px", textAlign:"center", whiteSpace: 'nowrap', backgroundColor: 'orange', fontSize: 'clamp(min-size, calc(100% - padding), 1.25em)', color: 'white', height: '37px', width:"146px", padding: '3px'}}>
              out of stock
            </div>
            <div style={{ backgroundColor: 'red', whiteSpace: ' nowrap', fontSize: 'clamp(min-size, calc(100% - padding), 1.25em)', color: 'white', textAlign: 'center', height: '39px', width:"146px", padding: '3px', borderBottomLeftRadius:"8px", borderBottomRightRadius:"8px"}}>
              over due
            </div>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', boxShadow: ' 3px 3px black', borderRadius: '50%', textAlign: 'center', backgroundColor: '#97D09D', color: 'black', fontWeight: 'bold', fontSize: '1em', height: '50px', border: '3px solid green', width: '45px' }} >{userName} </div>
        </div>
        <div style={{ margin: '23px 0 0 10px' }}>
            <img src={Imgprint} onClick={()=>navigate("/fmnodereact/print")}  title="print unit list" style={{ border: '3px solid green', height: '50px', borderRadius: '50%', boxShadow: ' 4px 4px black', }} />
        </div>
        <Bydate />
      </div>
    </div>
  )
}

export default Toolbar;