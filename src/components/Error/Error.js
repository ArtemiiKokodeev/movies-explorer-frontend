import React from 'react';
import './Error.css'

function Error( { isApiError, apiErrorText } ) {
  return (
    <p className={`api-error ${isApiError && "api-error_active"}`}>{apiErrorText}</p>
  )
}

export default Error;