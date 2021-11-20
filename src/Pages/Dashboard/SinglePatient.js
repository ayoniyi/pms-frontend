import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import 'animate.css'

//component
import Loader from '../../Components/Loader'
import Menu from '../../Components/Menu'
import Container from '../../Components/Container'
import VisitForm from '../../Components/VisitForm'
import VisitsTable from '../../Components/VisitsTable'

//assets
import Back from '../../Assets/images/dashboard/backarrow.svg'
//import Girl from "../../Assets/images/dashboard/girl.svg";
import User from '../../Assets/images/dashboard/user.svg'

const currentPage = 'Manage'

const SinglePatient = () => {
  const params = useParams()
  const patientId = params.patientId

  //const history = useHistory()

  const [isLoading, setIsLoading] = useState(false)
  const [patientData, setPatientData] = useState([])
  const [baseUrl, setBaseUrl] = useState(process.env.REACT_APP_API_BASEURL)
  //const [imgErr, setImgErr] = useState(false)
  const [email, setEmail] = useState('')
  //const [healthBio, setHealthBio] = useState('')
  const [phone, setPhone] = useState('')
  const [fileUp, setFileUp] = useState('')
  const [fileToUp, setFileToUp] = useState('')
  const [fileToUpName, setFileToUpName] = useState('')
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)

  const [infoTab, setInfoTab] = useState('bioData')

  useEffect(() => {
    setIsLoading(true)
    const loadpatient = async () => {
      setBaseUrl(process.env.REACT_APP_API_BASEURL)
      try {
        const patientReq = await axios(`${baseUrl}/patients/id/${patientId}`)
        console.log(patientReq.data)
        setPatientData(patientReq.data)
        //
        setEmail(patientReq.data.email || '')
        setPhone(patientReq.data.phone || '')
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        //setImgErr(true)
      }
    }

    loadpatient()
  }, [patientId, baseUrl])

  const handleFileChange = async (event) => {
    if (event.target.files[0]) {
      const srcMain = window.URL.createObjectURL(event.target.files[0])

      await setFileUp(srcMain)
      await setFileToUp(event.target.files[0])
      await setFileToUpName(event.target.files[0].name)

      console.log(fileToUp)
      console.log(fileToUpName)
    }
  }

  const handleInputs = async (e) => {
    setSuccess(false)
    setFail(false)
    let value = e.target.value
    value = value.trim()
    //const realValue = e.target.value
    const name = e.target.name

    // if (name === 'firstName') {
    //   setFirstName(value)
    //   console.log(value)
    // }
    // if (name === 'lastName') {
    //   setLastName(value)
    // }
    if (name === 'email') {
      setEmail(value)
    }
    if (name === 'phone') {
      setPhone(value)
    }
  }

  const handlePatientUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const baseUrl = process.env.REACT_APP_API_BASEURL
      const reqConfig = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      const patientData = {
        email,
        phone,
      }
      const updatePatientReq = await axios.patch(
        `${baseUrl}/patients/id/${patientId}`,
        patientData,
      )

      console.log('updated', updatePatientReq.data)
      // console.log('mail=>', email, 'pass=>', healthBio)
      // console.log('data...', patientData)

      if (fileUp !== '') {
        //let patientPhoto = new FormData()
        const s3UrlReq = await axios(`${baseUrl}/s3url`)
        let s3Url = s3UrlReq.data.gurl //console.log(s3Url)
        // eslint-disable-next-line
        const s3Upload = await axios.put(`${s3Url}`, fileToUp, reqConfig) //console.log(s3Upload)
        const s3ImgUrl = s3Url.split('?')[0]

        // console.log(s3ImgUrl) //patientPhoto.append('avatar', s3ImgUrl) //patientPhoto.append('avatar', fileToUp, fileToUpName)

        const patientPhoto = {
          avatar: s3ImgUrl,
        }

        // eslint-disable-next-line
        const updatePatientPhoto = await axios.patch(
          `${baseUrl}/patients/id/${patientId}/photo`,
          patientPhoto,
          //reqConfig,
        )

        //console.log('updated', updatePatientPhoto.data)
      }

      setIsLoading(false)
      setSuccess(true)
      setFail(false)

      // setEmail('')
      // setPhone('')
      // setFileUp('')

      //history.push(`/dashboard/manage/${patientId}`)
    } catch (err) {
      setIsLoading(false)
      setFail(true)
      setSuccess(false)
      console.log(err)
    }
  }

  return (
    <div>
      {/* Symptoms
      Diagnosis
      Status
      Prescription
      Doctor */}
      <Menu currentPage={currentPage} />
      <Container className="rm-padding">
        <div className="backTop">
          <Link to="/dashboard/manage">
            <div className="backBox">
              <img src={Back} alt="back" />
              <p>Back</p>
            </div>
          </Link>
          <h1 className="dashTitle">Patient Record</h1>
        </div>

        <div className="infoContainer">
          {isLoading && <Loader />}
          <div className="infoTabs">
            <div
              className={`${
                infoTab === 'bioData' ? 'infoTabActive' : 'infoTab'
              }`}
              onClick={(e) => setInfoTab('bioData')}
            >
              Bio Data
            </div>
            {/* <div
              className={`${
                infoTab === 'medData' ? 'infoTabActive' : 'infoTab'
              }`}
              onClick={(e) => setInfoTab('medData')}
            >
              Medical Data
            </div> */}
            <div
              className={`${
                infoTab === 'visits' ? 'infoTabActive' : 'infoTab'
              }`}
              onClick={(e) => setInfoTab('visits')}
            >
              Visits
            </div>
          </div>
          {!isLoading && infoTab === 'bioData' && (
            <form className="infoContent-m" onSubmit={handlePatientUpdate}>
              <div className="patInfo-form animate__animated animate__fadeIn">
                <div className="twoColumn-form">
                  <div className="twoC-box">
                    <p>First name</p>
                    <input type="text" value={patientData.firstName} disabled />
                  </div>
                  <div className="twoC-box">
                    <p>Last name</p>
                    <input type="text" value={patientData.lastName} disabled />
                  </div>
                </div>
                <div className="twoColumn-form">
                  <div className="twoC-box">
                    <p>Email</p>
                    <input
                      type="text"
                      //defaultValue={patientData.email}
                      name="email"
                      value={email}
                      onChange={handleInputs}
                    />
                  </div>
                  <div className="twoC-box">
                    <p>Phone</p>
                    <input
                      type="text"
                      //defaultValue={patientData.email}
                      name="phone"
                      value={phone}
                      onChange={handleInputs}
                    />
                  </div>
                </div>
                <div className="twoColumn-form">
                  <div className="twoC-box">
                    <p>Gender</p>
                    <select name="gender" disabled>
                      <option value={patientData.gender}>
                        {patientData.gender}
                      </option>
                    </select>
                  </div>
                  <div className="twoC-box">
                    <p>Date of Birth</p>
                    <input
                      //type="text"
                      type="date"
                      //defaultValue={patientData.email}
                      name="dob"
                      value={patientData.dob}
                      disabled
                    />
                  </div>
                </div>

                {/* <div className="oneColumn-form">
                  <p>Info</p>
                  <input
                    type="text"
                    //defaultValue={patientData.healthBio}
                    name="healthBio"
                    value={healthBio}
                    onChange={handleInputs}
                  />
                </div> */}
                <button className="patBtn">Update</button>
                {success && (
                  <div className="successMsgBox">
                    <div className="successMsg">
                      <p>Patient Data Updated!</p>
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
                {fileUp === '' && patientData.avatar !== undefined && (
                  <img src={patientData.avatar} alt="user" />
                )}
                {fileUp === '' && patientData.avatar === undefined && (
                  <img src={User} alt="user" />
                )}
                {fileUp !== '' && <img src={fileUp} alt="user" />}

                <input
                  type="file"
                  name="fileUpload"
                  className="file-input1"
                  id="file"
                  //disabled
                  //required
                  onChange={handleFileChange}
                  //  onChange={this.handleInputs}
                />
                <p>Click to update image</p>
              </div>
            </form>
          )}
          {!isLoading && infoTab === 'visits' && (
            <VisitForm
              userImg={patientData.avatar}
              patientId={patientData._id}
            />
          )}
          {!isLoading && infoTab === 'visits' && (
            <VisitsTable patientId={patientData._id} />
          )}
        </div>
      </Container>
    </div>
  )
}

export default SinglePatient
