import axios from 'axios';
import { SocialLogin } from 'components/shared/SocialLogin/SocialLogin';
import router from 'next/router';
import { useState } from 'react';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

export const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showModal, setModalShow] = useState(false)
  const [message, setMessage] = useState('')

  const login = async () => {
    await axios.post('http://localhost:4000/user/auth/login',{email: email,password: password}).then((response) => {
    console.log(response.data)  
    if (response.data.user == null)
      {
        setMessage('No user found')
        setModalShow(true)
      }
      else if (response.data.password == false)
      {
        setMessage('Incorrect Password')
        setModalShow(true)
      }
      else {
        router.push('/')
      }
    })
  }

  return (
    <>
      {/* <!-- BEGIN LOGIN --> */}
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
      <div className='login'>
        <div className='wrapper'>
          <div
            className='login-form js-img'
            style={{ backgroundImage: `url('/assets/img/login-form__bg.png')` }}
          >
            <form>
              <h3>log in with</h3>
              <SocialLogin />

              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='box-field'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <label className='checkbox-box checkbox-box__sm'>
                <input type='checkbox' />
                <span className='checkmark'></span>
                Remember me
              </label>
              <button className='btn' type='submit' onClick={() => login()}>
                log in
              </button>
              <div className='login-form__bottom'>
                <span>
                  No account?{' '}
                  <a onClick={() => router.push('/registration')}>
                    Register now
                  </a>
                </span>
                <a href='#'>Lost your password?</a>
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
      {/* <!-- LOGIN EOF   --> */}
    </>
  );
};
