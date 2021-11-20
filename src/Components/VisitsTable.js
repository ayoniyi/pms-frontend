import React, { useState, useEffect } from 'react'
import axios from 'axios'

const VisitsTable = (props) => {
  const [baseUrl, setBaseUrl] = useState(process.env.REACT_APP_API_BASEURL)
  const [visits, setVisits] = useState([])

  useEffect(() => {
    //setIsLoading(true)
    const loadVisits = async () => {
      setBaseUrl(process.env.REACT_APP_API_BASEURL)
      const patientId = props.patientId
      try {
        const visitReq = await axios(`${baseUrl}/visits/${patientId}`)
        console.log(visitReq.data)
        setVisits(visitReq.data)
        //
        //setIsLoading(false)
      } catch (err) {
        console.log(err)
        //setImgErr(true)
      }
    }

    loadVisits()
  }, [props, baseUrl])

  return (
    <>
      <div className="line2"></div>
      <h1 className="v-title">Past Visits</h1>
      {visits.length > 0 && (
        <div className="resultsContainer animate__animated animate__fadeIn">
          <div className="resultsBox rB-m">
            <div className="visits-top">
              <p>Date</p>
              <p>Doctor</p>
              <p>Status</p>
              <p>Symptoms</p>
              <p>Diagnosis</p>
              <p>Presciption</p>
            </div>
            <div className="resultsBox-content">
              {visits.map((visit) => (
                <div className="visitSingle" key={visit._id}>
                  <p>{visit.date.substr(0, 10)}</p>
                  <p>{visit.doctor}</p>
                  <p>{visit.status}</p>
                  <p>{visit.symptoms}</p>
                  <p>{visit.diagnosis}</p>
                  <p>{visit.prescription}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {visits.length < 1 && (
        <div className="emptyResult-box2">
          <p>No visits yet </p>
        </div>
      )}
    </>
  )
}

export default VisitsTable
