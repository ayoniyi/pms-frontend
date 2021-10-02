import React, { useState } from 'react'
import axios from 'axios'

//component
import Loader from '../../Components/Loader'
import Menu from '../../Components/Menu'
import Container from '../../Components/Container'

//assets
//import Girl from "../../Assets/images/dashboard/girl.svg";
import User from '../../Assets/images/dashboard/user.svg'

const currentPage = 'AddPatient'

const AddPatient = () => {
  const [isLoading, setIsLoading] = useState(false)
  //const [baseUrl, setBaseUrl] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [healthBio, setHealthBio] = useState('')
  const [fileUp, setFileUp] = useState('')
  const [fileToUp, setFileToUp] = useState('')
  const [fileToUpName, setFileToUpName] = useState('')
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)

  const handleFileChange = async (event) => {
    if (event.target.files[0]) {
      const srcMain = window.URL.createObjectURL(event.target.files[0])

      await setFileUp(srcMain)
      await setFileToUp(event.target.files[0])
      await setFileToUpName(event.target.files[0].name)

      // const imgFormat = new FormData();
      // imgFormat.append(
      //   "image",
      //   event.target.files[0],
      //   event.target.files[0].name
      // );

      console.log(srcMain, 'FILE UPP')
      console.log(event.target.files[0], 'FILE TO UPP')
      console.log(event.target.files[0].name, 'FILE UPP NAME')
      //console.log(imgFormat);
    }
  }

  const handleInputs = async (e) => {
    setSuccess(false)
    setFail(false)
    let value = e.target.value
    value = value.trim()
    const realValue = e.target.value
    const name = e.target.name

    if (name === 'firstName') {
      setFirstName(value)
      //console.log(value);
    }
    if (name === 'lastName') {
      setLastName(value)
    }
    if (name === 'email') {
      setEmail(value)
    }
    if (name === 'healthBio') {
      setHealthBio(realValue)
    }
  }

  const handlePatientAdd = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    //setSuccess(false)

    // setBaseUrl("https://pms-app-api00.herokuapp.com");

    //   const config = {
    //     headers: { 'content-type': 'multipart/form-data' }
    // }

    try {
      //setBaseUrl('http://localhost:5000')
      const baseUrlReq = 'http://localhost:5000'

      let patientData = new FormData()

      patientData.append('firstName', firstName)
      patientData.append('lastName', lastName)
      patientData.append('email', email)
      patientData.append('healthBio', healthBio)
      patientData.append('avatar', fileToUp, fileToUpName)

      // const patientData = {
      //   firstName,
      //   lastName,
      //   email,
      //   healthBio,
      //   avatar: fileToUp,
      // };

      const addPatientReq = await axios.post(
        `${baseUrlReq}/patients`,
        patientData,
      )

      console.log(addPatientReq.data)
      console.log(fileToUp)

      setIsLoading(false)
      setSuccess(true)
      setFirstName('')
      setLastName('')
      setEmail('')
      setHealthBio('')
      setFileUp('')
    } catch (err) {
      setIsLoading(false)
      console.log(err)
      setFail(true)
    }
  }

  return (
    <div>
      <Menu currentPage={currentPage} />
      <Container>
        <div className="backTop">
          <h1 className="dashTitle">Add Patient</h1>
        </div>
        {isLoading && <Loader />}
        {!isLoading && (
          <div className="infoContainer">
            <form
              className="infoContent"
              onSubmit={handlePatientAdd}
              //onSubmit={(e) => searchHandler(e)}
            >
              <div className="patInfo-form">
                <div className="twoColumn-form">
                  <div className="twoC-box">
                    <p>First name</p>
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      required
                      onChange={handleInputs}
                    />
                  </div>
                  <div className="twoC-box">
                    <p>Last name</p>
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      required
                      onChange={handleInputs}
                    />
                  </div>
                </div>
                <div className="oneColumn-form">
                  <p>Email</p>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    required
                    onChange={handleInputs}
                  />
                </div>
                <div className="oneColumn-form">
                  <p>Info</p>
                  <input
                    type="text"
                    name="healthBio"
                    value={healthBio}
                    required
                    onChange={handleInputs}
                  />
                </div>
                <button className="patBtn">Add</button>
                {success && (
                  <div className="successMsgBox">
                    <div className="successMsg">
                      <p>Patient Added Successfully</p>
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
                {fileUp === '' && <img src={User} alt="new user" />}
                {fileUp !== '' && <img src={fileUp} alt="new user" />}

                <input
                  type="file"
                  name="fileUpload"
                  className="file-input1"
                  id="file"
                  onChange={handleFileChange}
                  //  onChange={this.handleInputs}
                />
                <p>Click to upload image</p>
              </div>
            </form>
          </div>
        )}
      </Container>
    </div>
  )
}

export default AddPatient
