import 'animate.css'

const MedForm = () => {
  //     const [success, setSuccess] = useState(false)
  //   const [fail, setFail] = useState(false)

  return (
    <form
      className="infoContent-m"
      //onSubmit={handlePatientUpdate}
    >
      <div className="patInfo-form-wide animate__animated animate__fadeIn">
        <div className="threeColumn-form">
          <div className="threeC-box">
            <p>Gender</p>
            <input
              type="text"
              //value={patientData.firstName}
            />
          </div>
          <div className="threeC-box">
            <p>Blood Type</p>
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
        </div>
        <div className="threeColumn-form">
          <div className="threeC-box">
            <p>Next Of Kin</p>
            <input
              type="text"
              //value={patientData.firstName}
            />
          </div>
          <div className="threeC-box">
            <p>Last name</p>
            <input
              type="text"
              //value={patientData.lastName}
            />
          </div>
          <div className="threeC-box">
            <p>Last name</p>
            <input
              type="text"
              //value={patientData.lastName}
            />
          </div>
        </div>
        <div className="twoColumn-form">
          <div className="twoC-box">
            <p>First name</p>
            <input
              type="text"
              //value={patientData.firstName} disabled
            />
          </div>
          <div className="twoC-box">
            <p>Last name</p>
            <input
              type="text"
              //value={patientData.lastName} disabled
            />
          </div>
        </div>

        <button className="patBtn">Update</button>
        {/* {success && (
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
         */}
      </div>
    </form>
  )
}

export default MedForm
