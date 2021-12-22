import axios from 'axios';
import { SocialLogin } from 'components/shared/SocialLogin/SocialLogin';
import router from 'next/router';
import { useState } from 'react';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

export const Registration = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showModal, setModalShow] = useState(false)
  const [message, setMessage] = useState('')

  const Register = async () => {
    await axios.post('http://localhost:4000/user/auth/register',{firstName: firstName,lastName: lastName,phoneNo: phoneNo,email: email,password: password}).then((response) => {
      if (response.data.message == 'Email already exist.')
      {
        setMessage('Email already exist.')
        setModalShow(true)
      }
      else if (response.data.message == 'Registered Successfully!')
      {
        setMessage('Registered Successfully!')
        setModalShow(true)
      }
    })
  }

  return (
    <>
      {/* <!-- BEGIN REGISTRATION --> */}
      <PureModal
      isOpen={showModal}
      onClose={() => {
        setModalShow(false);
        return true;
      }}
      header="Registration"
      footer={
        <div>
          <button className='btn' onClick={() => setModalShow(false)}>Ok</button>
        </div>
      }
      >
        <span>{message}</span>
      </PureModal>
      <div className='login registration'>
        <div className='wrapper'>
          <div
            className='login-form js-img'
            style={{
              backgroundImage: `url('/assets/img/registration-form__bg.png')`,
            }}
          >
            <form>
              <h3>register now</h3>
              <SocialLogin />

              <div className='box-field__row'>
                <div className='box-field'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your first name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className='box-field'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className='box-field__row'>
                <div className='box-field'>
                  <input
                    type='tel'
                    className='form-control'
                    placeholder='Enter your phone'
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>
                <div className='box-field'>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className='box-field__row'>
                {/* <span>password</span> */}
                <div className='box-field'>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='box-field'>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Confirm password'
                  />
                </div>
              </div>
              <label className='checkbox-box checkbox-box__sm'>
                <input type='checkbox' />
                <span className='checkmark'></span>
                Remember me
              </label>
              <button className='btn' type='submit' onClick={() => Register()}>
                registration
              </button>
              <div className='login-form__bottom'>
                <span>
                  Already have an account?{' '}
                  <a onClick={() => router.push('/login')}>Log in</a>
                </span>
              </div>
            </form>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
      </div>
      {/* <!-- REGISTRATION EOF   -->  */}
    </>
  );
};
