import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'

//component
import Loader from '../../Components/Loader'
import Menu from '../../Components/Menu'
import Container from '../../Components/Container'

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
  const [baseUrl, setBaseUrl] = useState('')
  //const [imgErr, setImgErr] = useState(false)
  const [email, setEmail] = useState('')
  const [healthBio, setHealthBio] = useState('')
  const [fileUp, setFileUp] = useState('')
  const [fileToUp, setFileToUp] = useState('')
  const [fileToUpName, setFileToUpName] = useState('')
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const loadpatient = async () => {
      setBaseUrl('http://localhost:5000')
      const baseUrlReq = 'http://localhost:5000'
      try {
        const patientReq = await axios(`${baseUrlReq}/patients/id/${patientId}`)
        console.log(patientReq.data)
        setPatientData(patientReq.data)
        //

        setEmail(patientReq.data.email)
        setHealthBio(patientReq.data.healthBio)

        //console.log(email, ' ', healthBio)

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
    }
  }

  const handleInputs = async (e) => {
    setSuccess(false)
    setFail(false)
    let value = e.target.value
    value = value.trim()
    const realValue = e.target.value
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
    if (name === 'healthBio') {
      setHealthBio(realValue)
    }
  }

  const handlePatientUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      //setBaseUrl('http://localhost:5000')
      const baseUrlReq = 'http://localhost:5000'

      if (fileUp === '') {
        let patientData = {
          email,
          healthBio,
        }
      } else {
        let patientData = new FormData()

        patientData.append('email', 'pc@mail.co')
        patientData.append('healthBio', healthBio)
        patientData.append('avatar', fileToUp, fileToUpName)
      }

      const updatePatientReq = await axios.patch(
        `${baseUrlReq}/patients/id/${patientId}`,
        patientData,
      )

      console.log('updated', updatePatientReq.data)

      setIsLoading(false)
      setSuccess(true)

      setEmail('')
      setHealthBio('')
      setFileUp('')

      // setTimeout(() => {
      //   window.location.reload()
      // }, 3000)

      //history.push(`/dashboard/manage/${patientId}`)
    } catch (err) {
      setIsLoading(false)
      setFail(true)
      console.log(err)
    }
  }

  return (
    <div>
      <Menu currentPage={currentPage} />
      <Container>
        <div className="backTop">
          <Link to="/dashboard/manage">
            <div className="backBox">
              <img src={Back} alt="back" />
              <p>Back</p>
            </div>
          </Link>
          <h1 className="dashTitle">Patient Record</h1>
        </div>
        {isLoading && <Loader />}
        {!isLoading && (
          <div className="infoContainer">
            <form className="infoContent" onSubmit={handlePatientUpdate}>
              <div className="patInfo-form">
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
                <div className="oneColumn-form">
                  <p>Email</p>
                  <input
                    type="text"
                    defaultValue={patientData.email}
                    onChange={handleInputs}
                  />
                </div>
                <div className="oneColumn-form">
                  <p>Info</p>
                  <input
                    type="text"
                    defaultValue={patientData.healthBio}
                    onChange={handleInputs}
                  />
                </div>
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
                  <img src={baseUrl + '/' + patientData.avatar} alt="user" />
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
                  onChange={handleFileChange}
                  //  onChange={this.handleInputs}
                />
                <p>Click to update image</p>
              </div>
            </form>
          </div>
        )}
      </Container>
    </div>
  )
}

export default SinglePatient
