import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification

  // Jos style on null, niin ei näytetä notificationia
  const style = notification === null ? 
  {
    display: 'none'
  } : {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
  }
}

const ConnetedNotes = connect(mapStateToProps)(Notification)

export default ConnetedNotes