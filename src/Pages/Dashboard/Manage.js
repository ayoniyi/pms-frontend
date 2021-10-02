import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

//component
import Loader from '../../Components/Loader'
import Menu from '../../Components/Menu'
import Container from '../../Components/Container'

//assets
//import Guy from "../../Assets/images/dashboard/guy.svg";
import User from '../../Assets/images/dashboard/user.svg'

const currentPage = 'Manage'

const Manage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [patients, setPatients] = useState([])
  const [patientName, setPatientName] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [imgErr, setImgErr] = useState(false)
  //const [defImg, setDefImg ]= useState("");

  useEffect(() => {
    setIsLoading(true)
    const loadPatients = async () => {
      try {
        setBaseUrl('https://pms-backend-v1.herokuapp.com')
        const baseUrlReq = 'https://pms-backend-v1.herokuapp.com'
        const config = {
          headers: { 'content-type': 'multipart/form-data' },
        }
        const patientsReq = await axios(
          `${baseUrlReq}/patients/${patientName}`,
          config,
        )
        console.log(patientsReq.data)
        setPatients(patientsReq.data)
        setIsLoading(false)
        setImgErr(false)
      } catch (err) {
        //console.log(err);
        setImgErr(true)
        //setDefImg(User)
      }
    }

    loadPatients()
  }, [patientName, baseUrl])

  return (
    <div>
      <Menu currentPage={currentPage} />
      <Container>
        <div className="manageTop">
          <h1 className="dashTitle">Manage Patients</h1>
          <input
            type="text"
            className="searchInput"
            placeholder="Search"
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>
        {isLoading && <Loader />}
        {!isLoading && patients.length > 0 && (
          <div className="resultsContainer">
            <div className="resultsBox">
              <div className="resultsBox-top">
                <p>Patient Photo</p>
                <p>Patient Id</p>
                <p>Patient Name</p>
                <p>Action</p>
              </div>
              <div className="resultsBox-content">
                {patients.map((patient) => (
                  <div className="resultSingle" key={patient._id}>
                    <div className="avatarBox-sm">
                      {imgErr !== true ? (
                        <img
                          src={baseUrl + '/' + patient.avatar}
                          alt={patient.firstName}
                        />
                      ) : (
                        <img src={User} alt={patient.firstName} />
                      )}
                      {/* <img src={patient.avatar} alt={patient.firstName} /> */}
                    </div>
                    <p>{patient._id.substr(0, 11)}</p>
                    <p>{patient.firstName + ' ' + patient.lastName}</p>
                    <Link to={'/dashboard/manage/' + patient._id}>
                      <button className="viewResult-btn"> View </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}{' '}
        {!isLoading && patients.length < 1 && (
          <div className="emptyResult-box">
            <p>No patients found </p>
          </div>
        )}
      </Container>
    </div>
  )
}

export default Manage
