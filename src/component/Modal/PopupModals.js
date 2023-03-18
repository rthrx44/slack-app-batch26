import React from 'react'
import './PopupModals.css'
import { BiErrorCircle, BiCheckCircle } from "react-icons/bi";
import { CloseButton } from '../Buttons/Buttons';


export const ErrorModal = ({closeModal, message = "Warning Error"}) => {
  return (
    <div className='modals-main-con'>
      <div className='modals-con'>
        <BiErrorCircle className='errorLogo'/>
        <p className='modal-text'>{message}</p>
        <CloseButton onClickClose={closeModal} />
      </div>
    </div>
  )
}

export const SuccessModal = ({closeModal, message = "Congratulations"}) => {
  return (
    <div className='modals-main-con'>
      <div className='modals-con'>
        <BiCheckCircle className='successLogo'/>
        <p className='modal-text'>{message}</p>
        <CloseButton onClickClose={closeModal} />
      </div>
    </div>
  )
}

export const ExistModal = ({closeModal, message = "Warning Error"}) => {
  return (
    <div className='modals-main-con'>
      <div className='modals-con'>
        <BiErrorCircle className='errorLogo'/>
        <p className='modal-text'>{message}</p>
        <CloseButton onClickClose={closeModal} />
      </div>
    </div>
  )
}

export const ChannelError = ({closeModal, message = "Warning Error"}) => {
  return (
    <div className='modals-main-con'>
      <div className='modals-con'>
        <BiErrorCircle className='errorLogo'/>
        <p className='modal-text'>{message}</p>
        <CloseButton onClickClose={closeModal} />
      </div>
    </div>
  )
}

export const ChannelSuccess = ({closeModal, message = "Congratulations"}) => {
  return (
    <div className='modals-main-con'>
      <div className='modals-con'>
        <BiCheckCircle className='successLogo'/>
        <p className='modal-text'>{message}</p>
        <CloseButton onClickClose={closeModal} />
      </div>
    </div>
  )
}

export const ChannelExist = ({closeModal, message = "Warning Error"}) => {
  return (
    <div className='modals-main-con'>
      <div className='modals-con'>
        <BiErrorCircle className='errorLogo'/>
        <p className='modal-text'>{message}</p>
        <CloseButton onClickClose={closeModal} />
      </div>
    </div>
  )
}

