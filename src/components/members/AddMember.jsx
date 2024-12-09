import { useState } from 'react';
import { backURL } from '../../lib/constants';
import { RxAvatar } from "react-icons/rx";
import { HiOutlineMail } from "react-icons/hi";
import { CiPhone } from "react-icons/ci";
import { IoMdKey } from "react-icons/io";



const AddMember = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('1234');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMember = { name, email, phone, password };

    try {
      const response = await fetch(`${backURL}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Member added: ${data.name}`);
        console.log(newMember);

        // Clear form inputs
        setName('');
        setEmail('');
        setPhone('');
        setPassword('1234');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className='w-96 mx-auto mt-20'>
      <h2 className='text-center py-6'>Add New Member</h2>
      <form onSubmit={handleSubmit} className='space-y-3'>
        <label className="input input-bordered flex items-center gap-2">
          <RxAvatar/>
          <input type="text" name='name' className="grow" placeholder="username" onChange={(e) => setName(e.target.value)} required />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <HiOutlineMail/>
          <input type="text" name='email' className="grow" placeholder="email" onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <CiPhone/>
          <input type="text" name='phone' className="grow" placeholder="phone" onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <IoMdKey/>
          <input type="password" className="grow" placeholder="Default Password 1234" onChange={(e) => setPassword(e.target.value)} />
        </label>

        <button className='btn w-30 mx-auto' type="submit">Add Member</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddMember;
