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
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')
  const [fileUp, setFileUp] = useState('')
  const [fileToUp, setFileToUp] = useState('')
  //const [fileToUpName, setFileToUpName] = useState('')
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)

  const handleFileChange = async (event) => {
    if (event.target.files[0]) {
      const srcMain = window.URL.createObjectURL(event.target.files[0])

      await setFileUp(srcMain)
      await setFileToUp(event.target.files[0])
      //await setFileToUpName(event.target.files[0].name)

      // const imgFormat = new FormData();
      // imgFormat.append(
      //   "image",
      //   event.target.files[0],
      //   event.target.files[0].name
      // );

      // console.log(srcMain, 'FILE UP')
      // console.log(event.target.files[0], 'FILE TO UP')
      // console.log(event.target.files[0].name, 'FILE UP NAME')
      //console.log(imgFormat);
    }
  }

  const handleInputs = async (e) => {
    setSuccess(false)
    setFail(false)
    let value = e.target.value
    value = value.trim()
    //const realValue = e.target.value
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
    if (name === 'phone') {
      setPhone(value)
    }
    if (name === 'gender') {
      setGender(value)
    }
    if (name === 'dob') {
      setDob(value)
    }
  }

  const handlePatientAdd = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    //setSuccess(false)
    const reqConfig = {
      headers: { 'content-type': 'multipart/form-data' },
    }

    try {
      const baseUrlReq = process.env.REACT_APP_API_BASEURL

      const s3UrlReq = await axios(`${baseUrlReq}/s3url`)

      let s3Url = s3UrlReq.data.gurl
      console.log(s3Url)

      const s3Upload = await axios.put(`${s3Url}`, fileToUp, reqConfig)
      console.log(s3Upload)

      const s3ImgUrl = s3Url.split('?')[0]

      console.log('im__' + s3ImgUrl)

      let patientData = new FormData()

      patientData.append('firstName', firstName)
      patientData.append('lastName', lastName)
      patientData.append('email', email)
      patientData.append('phone', phone)
      patientData.append('gender', gender)
      patientData.append('dob', dob)

      //patientData.append('avatar', fileToUp, fileToUpName)
      patientData.append('avatar', s3ImgUrl)

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
      //console.log(fileToUp)

      setIsLoading(false)
      setSuccess(true)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setGender('')
      setDob('')
      setFileUp('')
    } catch (err) {
      setIsLoading(false)
      console.log(err)
      setFail(true)
    }
  }

  // s3 upload
  // const handleS3 = async () => {
  //   try {
  // const files = this.state.fileToUp;
  // console.log("DOC::: ", this.state.docNumber, files);
  // const blob = files;
  // const cleanedFilename = blob.name.replace(/([^a-z0-9]+)/gi, "-");
  // const imageFormat = blob.type.split("/")[1]
  // const filename = `${cleanedFilename}.${imageFormat}`;
  // const fileKey = `verification-docs/${filename}`;
  // const params = {
  //     Body: blob,
  //     Bucket: `${process.env.REACT_APP_DO_BUCKET}`,
  //     Key: fileKey,
  //     ACL: "public-read",
  // };
  // Sending the file to digital ocean Spaces
  // s3.putObject(params)
  //     .on("build", (request) => {
  //     request.httpRequest.headers.Host = `${process.env.REACT_APP_DO_SPACES_URL}`;
  //     request.httpRequest.headers["Content-Length"] = blob.size;
  //     request.httpRequest.headers["Content-Type"] = blob.type;
  //     request.httpRequest.headers["x-amz-acl"] = "public-read";
  //     })
  //    .send((err) => {
  //     if (err) {
  //         console.log("ERROR:: ", err);
  //     } else {
  //         // If there is no error
  //         const imageUrl =
  //         `${process.env.REACT_APP_DO_SPACES_URL}/` + fileKey;
  //         console.log("IMAGE URL:: ", imageUrl);
  //         //this.setState({ imageUrl })
  //         //submitInfo();
  //     }
  // });
  //   } catch (err) {
  //     console.log('ERROR:: ', err)
  //   }
  // }

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
                <div className="twoColumn-form">
                  <div className="twoC-box">
                    <p>Email</p>
                    <input
                      type="text"
                      //defaultValue={patientData.email}
                      name="email"
                      value={email}
                      onChange={handleInputs}
                      required
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
                      required
                    />
                  </div>
                </div>
                <div className="twoColumn-form">
                  <div className="twoC-box">
                    <p>Gender</p>
                    <select name="gender" onChange={handleInputs} required>
                      <option value="">--- Choose Gender ---</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="twoC-box">
                    <p>Date of Birth</p>
                    <input
                      type="date"
                      name="dob"
                      value={dob}
                      onChange={handleInputs}
                      required
                    />
                  </div>
                </div>

                <button className="patBtn">Add Patient</button>
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
                  required
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
