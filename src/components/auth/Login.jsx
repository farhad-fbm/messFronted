import { useState, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextProviders/AuthContextProvider';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Helmet } from 'react-helmet';


const Login = () => {
  const { login } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const formRef = useRef(null)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(name, password);
      navigate(location?.state ? location.state : '/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };
  return (
    <div>
      <Helmet>
        <title>Mess | Login</title>
      </Helmet>
      <div className="w-full text-[#EAD8B1]">
        <div className="hero-content flex-col pt-16">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-[#001F3F]">
            <form ref={formRef} onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <p className="p-2">Name</p>
                <input
                  onChange={e => setName(e.target.value)}
                  name='name'
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>
              {/* <div className="form-control">
                <p className="p-2">Email</p>
                <input
                  onChange={e => setEmail(e.target.value)}
                  name='email'
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                // required
                />
              </div> */}
              <div className="form-control">
                <p className="p-2">Password</p>
                <input
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="">
                  <a href="#" className="mt-4 text-blue-600 cursor-pointer">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>

            </form>

          </div>
        </div>
        <ToastContainer />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
