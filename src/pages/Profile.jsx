import { useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice.js'

export const Profile = () => {
  const fileRef = useRef(null)
  const {currentUser, loading, error} = useSelector(state => state.user.user)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if(data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }

      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
      //navigate('/')
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  return (
    <div className='p-3 w-lg mx-auto'>
      <h1 className="text-4xl font-semibold text-center my-7">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input id='avatar' onChange={handleChange} type="file" ref={fileRef} hidden accept='image/*'/>
        <img className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' onClick={() => fileRef.current.click()} src={currentUser.avatar} alt="avatar"/>
        <input type="text" id='username' placeholder='username' className='border p-3 rounded-lg bg-white' 
                defaultValue={currentUser.username} onChange={handleChange}/>
        <input type="email" id='email' placeholder='email' className='border p-3 rounded-lg bg-white' 
                defaultValue={currentUser.email} onChange={handleChange}/>
        <input type="password" id='password' placeholder='password' className='border p-3 rounded-lg bg-white' 
                defaultValue={currentUser.password} onChange={handleChange}/>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase 
                hover:opacity-95 disabled:opacity-80 cursor-pointer" disabled={loading}>{loading ? 'Loading...' : 'Update'}</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className="text-red-500 mt-5">{error ? error : ''}</p>
      <p className="text-green-500 mt-5">{updateSuccess ? 'User is updated successfully!' : ''}</p>
    </div>
  )
}
