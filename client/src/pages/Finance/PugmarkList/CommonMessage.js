import React from "react";
export function ValidationMessage(props) {
  if (!props.valid) {
    return <div className='mb-0 mt-2 text-danger text-left font-size-12'>{props.message}</div>
  }
  return null;
}

export function GetRightsInfo(props){
  if (!props.valid) {
    return <div className='mb-0 mt-2 text-info text-left font-size-12'>{props.message}</div>
  }
  return null;
}