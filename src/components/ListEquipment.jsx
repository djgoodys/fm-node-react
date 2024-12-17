import React, { useState, useRef, useEffect } from 'react';
import '../css/fm.css';
import '../css/checkboxListEquipment.css';
import '../css/checkMarkTasks.css';
import Filtersdone from './Filtersdone';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Assignedtoo from './Assignedtoo';
import { setJavaCookie, getCookie, setCookie, saveScrollPosition, setScrollPosition } from '../javafunctions';
import { useDispatch, useSelector } from 'react-redux'
import { manageFilterTypes } from '../thunks/filterTypesThunk';
import Button from 'react-bootstrap/Button';
import { manageEquipment } from '../thunks/equipmentThunk'
import { manageUsers } from '../thunks/usersThunk'
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

const ListEquipment = (props) => {
    const [showConfirm, setShowConfirm] = useState(false)
    const refDeleteButton = useRef(null)
    const [editUnitId, setEditUnitId] = useState('')
    const [editUnitName, setEditUnitName] = useState('')
    const [editAreaServed, setEditAreaServed] = useState('')
    const [editLocation, setEditLocation] = useState('')
    const [editFilterSize1, setEditFilterSize1] = useState('')
    const [editFilterSize2, setEditFilterSize2] = useState('')
    const [editNotes, setEditNotes] = useState('')
    const [editBelts, setEditBelts] = useState('')
    const [editAssignedTo, setEditAssignedTo] = useState('')
    const [editRotation, setEditRotation] = useState('')
    const [editFilterType, setEditFilterType] = useState('')
    const [editFiltersDue, setEditFiltersDue] = useState('')
    const [showEdit, setShowEdit] = useState(false)
    const [showNotes, setShowNotes] = useState(false)
    const [showTasks, setShowTasks] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    let filterDueDate = useRef('');
    const [btnUpdateNotesClass, setBtnUpdateNotesClass] = useState("btnUpdateNotesHidden");
    const [AssignedToo, setAssignedToo] = useState('')
    const [checkedItems, setCheckedItems] = useState({})
    const [TaskCheckedItems, setTaskCheckedItems] = useState({})
    const [notes, setNotes] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const refDivTasks = useRef(null)
    const [filter_types, setFilterTypes] = useState([])
    const [theadTop, setTheadTop] = useState('0');
    const [users, setUsers] = useState([])
    let equipment=[]


    const fetchEquipment = async (params) => {
        
        const obj2 = { action: "get-all-equipment" };
        const response = await dispatch(manageEquipment(obj2));
        
    }

        useEffect(()=>{
            fetchEquipment()
        },[])

    equipment = useSelector((state) => state.equipment.equipment)
    //console.log("allequipment="+ equipment[0]["unit_name"])
      //setEquipment(allequipment)
  
    let ftypes = useSelector((state) => state.types)

    const generateInitialCheckedItems = (equipment) => {
        const initialCheckedItems = {};
        equipment.forEach((item) => {
            initialCheckedItems[item._id] = false;
        });
        return initialCheckedItems;
    };



    useEffect(() => {
        const obj = {
            action:"get-all-filter-types"
        }
        dispatch(manageFilterTypes(obj)).then((response) => {
            const datax = response.payload;
            datax.forEach((item => {
                ftypes = datax.map((item) => item.type);
            }))
            setFilterTypes(ftypes)
        }).catch((error) => {
            console.error('Fetch error:', error);
        });
    }, []);

    const obj = {
        action: "get-all-users"
    }
    const getUsers = async () => {
        const response = await dispatch(manageUsers(obj))
        const usersArray = Array.isArray(response.payload) ? response.payload : response.payload.data;
        const userNames = usersArray.map(user => user.username)
        setUsers(userNames)
    }

    useEffect(() => {
        getUsers()
    }, [])


    const submitTasks = () => {
        setShowTasks(false)
        const username = localStorage.getItem("username")
        const alltasks = tasks.map((task) => {
            return task.unit_id
        })
        const obj2 = {
            action: 'add-all-tasks',
            username: username,
            task_array: alltasks
        }
        const allunits = dispatch(manageEquipment(obj2))
        navigate("/fmnodereact/tasks")
    }
    //equipment = useSelector((state) => state.equipment.equipment)
    const tableRefs = useRef([]);
    const toggleClass = (event, shouldToggle, tableid) => {

        event.stopPropagation();
        const tableRef = document.getElementById("tbl" + tableid);
        if (tableRef) {
            if (tableRef.classList.contains('UnitInfoClosed')) {
                tableRef.classList.remove('UnitInfoClosed');
                tableRef.classList.add('UnitInfoOpen');
            } else {
                tableRef.classList.remove('UnitInfoOpen');
                tableRef.classList.add('UnitInfoClosed');
            }
        }
    };

    const closeUnitInfo = (id) => {
        //console.log(id);
        var tableID = "tbl" + id;
        const table = document.getElementById(tableID);
        if (table) {
            table.className = "UnitInfoClosed";
        }
    }
    const showUnitInfo = (id) => {
        var tableID = "tbl" + id;
        const table = document.getElementById(tableID);
        if (table) {
            table.className = "UnitInfoOpen";
        }
        var my_disply = document.getElementById(tableID).style.display;
        setJavaCookie("cookie_infoid", id);
        if (my_disply == "none") {
            saveScrollPosition();
            document.getElementById(tableID).style.display = "block";
            setTimeout(setScrollPosition, 100);
        } else {
            setCookie("cookie_infoid", "void");
        }
    };


    const handleNotesChange = (id, newValue) => {
        setIsDisabled(false);
        setNotes(prevNotes => ({
            ...prevNotes,
            [id]: newValue
        }));
    };

    function updateNotes(unit_id, newnotes) {
        const obj = {
            unit_id: unit_id,
            notes: newnotes,
            action: 'edit-unit',
            field: 'notes'
        }
        dispatch(manageEquipment(obj))
        setShowNotes(false)

    }

    const isDateOlderThanToday = (filtersDue) => {
        const today = new Date();
        const filterDate = new Date(filtersDue);
        return filterDate < today;
    }

    const getUnitName = (id) => {
        for (const item of equipment) {
            if (item._id === id) {
                return item.unit_name;
            }
        } return null;
    };

    const notesArray = () => {
        
        if(Array.isArray(equipment)){
            const Notes = equipment.map(
                unit => unit.notes
            )
            setNotes(Notes);
        }
        console.log("notes="+notes)
    }
    
    for (let key in notes) {
        if (notes.hasOwnProperty(key)) {
            //console.log(`Key: ${key}, Value: ${JSON.stringify(notes[key])}`);
        }
    }

    useEffect(() => {
        notesArray()
    }, [])

    const renderTableRows = () => {
        if(Array.isArray(equipment)){
        const rows = [];
        equipment.forEach(item =>{
            //const item  equipment[i];
            let x = "notoverdue";
            if (isDateOlderThanToday(item.filters_due)) {
                x = "overdue";
            } else {
                x = "notoverdue";
            }
            let task_id = "cktask" + item._id;
            filterDueDate = item.filters_due;
            rows.push(
                <tr key={item._id} className={x} >
                    <td>
                        {item.assigned_to !== "" ? (
                            <Assignedtoo assignedUsername={item.assigned_to} unit_id={item._id} users={users} />
                        ) : (
                            <label className="container">
                                <input type="checkbox" className="checkmarkListEquipment" id={item.unit_id} value="" onChange={(e) => handleCheckboxChange(e, item._id, item.unit_name)} checked={checkedItems[item._id] || false} />
                                <span className="checkmark"></span>
                            </label>
                        )}
                    </td>
                    <td>
                        <Filtersdone unit_id={item._id} rotation={item.filter_rotation} filter_types={filter_types} />
                    </td>
                    <td><span onClick={(e) => toggleClass(e, true, item._id)}>{item.unit_name}</span>
                    </td>
                    <table className='UnitInfoClosed' id={`tbl${item._id}`}>
                        <tr style={{border:"1px solid green"}}><td style={{backgroundColor:"white", color:"black", fontWeight:"bold"}}>{item.unit_name}</td>
                            <td  style={{backgroundColor:"white"}}><Button variant="outline-primary" hover title={'Close info ' + item.unit_name} onClick={(e) => toggleClass(e, true, item._id)}>Close</Button></td></tr>
                        <tr><td>Location</td><td>{item.location}</td></tr>
                        <tr><td>Area Served</td><td>{item.area_served}</td></tr>
                        <tr><td>Filter Size</td><td>{item.filter_size}</td></tr>
                        <tr><td>Filter Type</td><td>{item.filter_type}</td></tr>
                        <tr><td>Filter Due Date</td><td>{filterDueDate}</td></tr>
                        <tr><td>Filters Last replaced</td><td>{item.filters_last_changed}</td></tr>
                        <tr><td>Filter Rotation</td><td>{item.filter_rotation}</td></tr>
                        <tr>
                            <td>Belts</td>
                            <td>{item.belts}</td>
                        </tr>
                        <tr key={item._id}>
                            <td>Notes</td>
                            <td>
                                <textarea key={item._id} readOnly={isDisabled} className="notes" onClick={() => { setShowNotes(true); setIsDisabled(!isDisabled) }} onChange={(e) => handleNotesChange(item.id, e.target.value)} value={notes[item.id] || ''} ></textarea><br />
                                <button type="button" onClick={() => { updateNotes(item.id, notes[item.id]) }} style={{ display: showNotes ? "block" : "none" }}>update</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Assigned Too</td>
                            <td>{item.assigned_to}</td>
                        </tr>
                        <tr>
                            <td></td>
                        <td><Button variant="outline-warning" onClick={()=>editUnit(item._id, item.unit_name, item.location, item.area_served, item.filter_size, item.filter_type, item.filters_due, item.filter_rotation, item.notes, item.belts, item.assigned_to)}>Edit unit</Button></td>
                        </tr>
                    </table>
                    <td>{item.location}{item.id}</td>
                    <td>{item.area_served}</td>
                    <td  onClick={()=>navigate("/fmnodereact/filters", { state: { size: item.filter_size, type: item.filter_type } })}>{item.filter_size}</td>
                    <td>{filterDueDate}</td>
                </tr>
            );
        })
        return rows;
    }
    }

    // const [checkedItems, setCheckedItems] = useState(
    //     equipment.reduce((acc, unit) => {
    //         acc[unit._id] = false;
    //         return acc;
    //     }, {})
    // );

    const handleCheckboxChange = async (event, unit_id, unit_name) => {
        const isChecked = event.target.checked;
        const unitname = getUnitName(unit_id)
        setCheckedItems((prevCheckedItems) => ({ ...prevCheckedItems, [unit_id]: !prevCheckedItems[unit_id], }));
        setShowTasks(true)
        isChecked ? setTheadTop("110px") : setTheadTop("0")
        let thisTask = {
            unit_id: unit_id,
            unit_name: unit_name
        }

        await setTasks((prevTasks) => {
            if (!isChecked) {
                return prevTasks.filter((task) => task.unit_id !== unit_id)
            }
            else {
                return [...prevTasks, thisTask]

            }
        })

    }

    function editUnit(id, unit_name, location, area_served, filter_size, filter_type, filters_due, rotation, notes, belts, assigned_to){
        setEditUnitId(id)
        setEditUnitName(unit_name)
        setEditLocation(location)
        setEditAreaServed(area_served)
        setEditFilterSize1(filter_size)
        setEditFilterType(filter_type)
        setEditFiltersDue(filters_due)
        setEditRotation(rotation)
        setEditNotes(notes)
        setEditBelts(belts)
        setEditAssignedTo(assigned_to)
        setShowEdit(true)
    }

    function updateUnit(){
        setShowEdit(false)
        const obj={
            action:"edit-unit",
            unit_id:editUnitId,
            unit_name:editUnitName,
            area_served:editAreaServed,
            location:editLocation,
            filter_size: editFilterSize1 + " " + editFilterSize2,
            filter_type: editFilterType,
            rotation:editRotation,
            notes:editNotes,
            belts:editBelts,
            filters_due:editFiltersDue,
            assigned_to:editAssignedTo
        }
        dispatch(manageEquipment(obj))
    }


    function deleteUnit(id) {
       
        const obj = {
            action:"delete-unit",
            unit_id:editUnitId
        }
        dispatch(manageEquipment(obj))
        setShowEdit(false)
        setShowConfirm(false)
    }

    return (
        <div id="datatable">
        <div id="myModal" className="modal" style={{display:showEdit ? "block":"none"}}>

        <div className="modal-content">
            <span className="close">&times; <span>EDITING UNIT : {editUnitId}</span></span>
            <FloatingLabel controlId="floatingInput" label="Unit name"    className="mb-3">
        <Form.Control type="text" placeholder="Unit name" value={editUnitName} onChange={(e)=>setEditUnitName(e.target.value)} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingunitname" label="Location">
        <Form.Control type="text" placeholder="Location" value={editLocation} onChange={(e)=>setEditLocation(e.target.value)} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingareaserved" label="Area served">
        <Form.Control type="text" placeholder="Area served" value={editAreaServed} onChange={(e)=>setEditAreaServed(e.target.value)} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingareasize1" label="Filter size #1">
        <Form.Control type="text" placeholder="Filter size 1" value={editFilterSize1} onChange={(e)=>setEditFilterSize1(e.target.value)} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingareasize2" label="Filter size #2">
        <Form.Control type="text" placeholder="Filter size 2" value={editFilterSize2} onChange={(e)=>setEditFilterSize2(e.target.value)} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingrotation" label="Rotation">
        <Form.Control type="text" placeholder="Rotation" value={editRotation} onChange={(e)=>setEditRotation(e.target.value)} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingftype" label="Filter type">
        <Form.Control type="text" placeholder="Filter type" value={editFilterType} onChange={(e)=>setEditFilterType(e.target.value)} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingfiltersdue" label="Filters due date">
        <Form.Control type="date" placeholder="Filter due date" value={editFiltersDue} onChange={(e)=>setEditFiltersDue(e.target.value)} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingbelts" label="Belts">
        <Form.Control type="text" placeholder="Belt sizes" value={editBelts} onChange={(e)=>setEditBelts(e.target.value)} />
      </FloatingLabel>
      <FloatingLabel controlId="floatinganotes" label="notes">
        <Form.Control type="text" placeholder="Note" value={editNotes} onChange={(e)=>setEditNotes(e.target.value)} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingassignedtoo" label="Assigned too">
        <Form.Control type="text" placeholder="Assigned too" value={editAssignedTo} onChange={(e)=>setEditAssignedTo(e.target.value)} />
      </FloatingLabel>
      <Button variant="success" onClick={()=>updateUnit()}>Save</Button>
      <Button variant="secondary" onClick={()=>setShowEdit(false)}>Cancel</Button>
      <div style={{display:showConfirm ? "flex": "none", margin:"0 auto" }}>
        <Button variant="danger" onClick={()=>deleteUnit()}>CLICK HERE TO CONFIRM DELETION OF UNIT {editUnitName}</Button></div>
    <Button variant="danger" onClick={()=>{setShowConfirm(true)}} ref={refDeleteButton}>Delete unit</Button>
        </div>

        </div>
            {equipment && Object.keys(equipment).length == 0 ? (<Spinner style={{ width: "100px", height: "100px", display: Object.keys(equipment).length > 0 ? "none" : "block" }} animation="border" variant="primary" role="status">
                <span ></span>
            </Spinner>):null}
            <div id="divTasks" ref={refDivTasks} style={{ display: showTasks && tasks.length > 0 ? "grid" : "none", gridTemplateColumns: "1fr .5fr" }}>

                <div style={{ display: "flex" }}>
                    {tasks.map((task) => (

                        <p key={task.task_id} style={{ padding: "15px" }}>{task.unit_name}</p>

                    ))
                    }
                </div>
                <div style={{ display: "flex", marginLeft: "400px" }}>
                    <Button className="btn btn-primary" style={{ height: "fit-content", paddingBottom: "10px" }} onClick={() => submitTasks()}>Submit tasks</Button>
                    <Button className="btn btn-warning" style={{ height: "80px", width: "140px", marginLeft: "20px", color: "white" }} onClick={() => setShowTasks(false)}>Cancel</Button>
                </div>
            </div>
            <table id="tblListEquipment">
                <thead style={{ top: theadTop, position: "sticky", zIndex: "2" }}>
                    <tr>
                        <th>TASKS</th>
                        <th>FILTERS DONE</th>
                        <th style={{ textAlign: "center" }}>UNIT NAME</th>
                        <th>LOCATION</th>
                        <th>AREA SERVED</th>
                        <th>FILTER SIZE</th>
                        <th>DUE</th>
                    </tr>
                </thead>
                <tbody> {renderTableRows()}</tbody>
            </table>
        </div>
    )
}

export default ListEquipment;
