import React, { useState } from 'react'
import axios from 'axios'

//component
import Loader from './Loader'

const VisitForm = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [doctor, setDoctor] = useState('')
  const [status, setStatus] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [prescription, setPrescription] = useState('')

  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)

  const handleInputs = async (e) => {
    setSuccess(false)
    setFail(false)
    let value = e.target.value
    value = value.trim()
    const realValue = e.target.value
    const name = e.target.name

    if (name === 'doctor') {
      setDoctor(value)
      //console.log(value);
    }
    if (name === 'status') {
      setStatus(value)
    }
    if (name === 'symptoms') {
      setSymptoms(realValue)
    }
    if (name === 'diagnosis') {
      setDiagnosis(realValue)
    }
    if (name === 'prescription') {
      setPrescription(realValue)
    }
  }

  const handleNewVisit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    //setSuccess(false)
    // const reqConfig = {
    //   headers: { 'content-type': 'multipart/form-data' },
    // }
    try {
      const baseUrlReq = process.env.REACT_APP_API_BASEURL
      const patientId = props.patientId

      const visitData = {
        patientId,
        doctor,
        status,
        symptoms,
        diagnosis,
        prescription,
      }

      const newVisitReq = await axios.post(`${baseUrlReq}/visits`, visitData)

      console.log(newVisitReq.data)
      // setStatus('')
      // setSymptoms('')
      // setDiagnosis('')
      // setPrescription('')
      window.location.reload()
      // setTimeout(() => {

      // }, 700)

      setIsLoading(false)
      setSuccess(true)
    } catch (err) {
      setIsLoading(false)
      console.log(err)
      setFail(true)
    }
  }

  return (
    <>
      <div className="line"></div>
      {isLoading && <Loader />}
      {!isLoading && (
        <form className="infoContent-m" onSubmit={handleNewVisit}>
          <div className="patInfo-form animate__animated animate__fadeIn">
            <h1 className="v-title">New Visit</h1>

            <div className="twoColumn-form">
              <div className="twoC-box">
                <p>Doctor</p>
                <input
                  type="text"
                  name="doctor"
                  value={doctor}
                  onChange={handleInputs}
                  required
                />
              </div>
              <div className="twoC-box">
                <p>Status</p>
                <select name="status" onChange={handleInputs} required>
                  <option value=" "> -- Chooose Status --</option>
                  <option value="Admitted">Admitted</option>
                  <option value="Not admitted">Not admitted</option>
                </select>
              </div>
            </div>
            <div className="oneColumn-form">
              <p>Symptoms</p>
              <input
                type="text"
                //defaultValue={patientData.healthBio}
                name="symptoms"
                value={symptoms}
                onChange={handleInputs}
                required
              />
            </div>
            <div className="oneColumn-form">
              <p>Diagnosis</p>
              <input
                type="text"
                //defaultValue={patientData.healthBio}
                name="diagnosis"
                value={diagnosis}
                onChange={handleInputs}
                required
              />
            </div>
            <div className="oneColumn-form">
              <p>Prescription</p>
              <input
                type="text"
                //defaultValue={patientData.healthBio}
                name="prescription"
                value={prescription}
                onChange={handleInputs}
                required
              />
            </div>
            {/* <div className="threeColumn-form">
          <div className="threeC-box">
            <p>Doctor</p>
            <input
              type="text"
              //value={patientData.firstName}
            />
          </div>
          <div className="threeC-box">
            <p>Symptoms</p>
            <input
              type="text"
              //value={patientData.lastName}
            />
          </div>
          <div className="threeC-box">
            <p>Blood Group</p>
            <input
              type="text"
              //value={patientData.lastName}
            />
          </div>
        </div> */}

            <button className="patBtn">Add Visit</button>
            {success && (
              <div className="successMsgBox">
                <div className="successMsg">
                  <p>Visit Added Successfully</p>
                </div>
              </div>
            )}
            {fail && (
              <div className="errorMsgBox">
                <div className="errorMsg">
                  <p>Sorry an error occured.</p>
                </div>
              </div>
            )}
          </div>
          <div className="infoImg-box">
            <img src={props.userImg} alt="user" />
          </div>
        </form>
      )}
    </>
  )
}

export default VisitForm
