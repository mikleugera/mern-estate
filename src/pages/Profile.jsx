import { useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, 
          signOutUserFailure, signOutUserStart, signOutUserSuccess, 
          updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice.js'
import {Link} from 'react-router-dom'
import { supabase } from '../supabase.jsx'


export const Profile = () => {
  const fileRef = useRef(null)
  const {currentUser, loading, error} = useSelector(state => state.user.user)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [file, setFile] = useState(null)
  const [uploaded, setUploaded] = useState(false)
  const [showListingsError, setShowListingsError] = useState(false)
  const [userListings, setUserListings] = useState([])

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
      
      setTimeout(() => {
        setUpdateSuccess(false)
      }, 2000)
      
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())

      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE'
      })
      const data = await res.json();

      if(data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }

      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout')

      const data = await res.json()
      if(data.success === false) {
        dispatch(signOutUserFailure(data.message))
        return
      }

      dispatch(signOutUserSuccess(data))
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }

  const handleShowListings = async() => {
    try {
      setShowListingsError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json()
      
      if(data.success === false) return setShowListingsError(true)

      setUserListings(data)
    } catch (error) {
      setShowListingsError(true)
      console.log(error);
    }
  }

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE'
      })
      const data = await res.json()

      if(data.success === false) {
        console.error(data.message)
        return
      }

      setUserListings(prevListings => prevListings.filter(listing => listing._id !== listingId))
    } catch (error) {
      console.error('Error deleting listing:', error)
    }
  }

  useEffect(() => {
    if(file) {
      const handleFileUpload = async (file) => {
        if (!file) return alert('Будь ласка, виберіть файл!')

        try {
          const fileName = new Date().getTime() + file.name

          const { error } = await supabase.storage
            .from('images') 
            .upload(fileName, file, {upsert: false})

          if (error) throw error

          const { data: publicUrlData } = supabase.storage
            .from('images')
            .getPublicUrl(fileName)

          setFormData({...formData, avatar: publicUrlData.publicUrl})
          setUploaded(true)
          
          setTimeout(() => {
            setUploaded(false)
          }, 2000)

        } catch (error) {
          dispatch(updateUserFailure(error.message))
        }
      }
      handleFileUpload(file)
    }
  }, [file])
  
  return (
    <div className='p-3 w-lg mx-auto'>
      <h1 className="text-4xl font-semibold text-center my-7">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input id='avatar' onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
        <img className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="avatar"/>
        <p className="text-green-500 mt-5">{uploaded ? 'Image successfully uploaded' : ''}</p>
        <input type="text" id='username' placeholder='username' className='border p-3 rounded-lg bg-white' 
                defaultValue={currentUser.username} onChange={handleChange}/>
        <input type="email" id='email' placeholder='email' className='border p-3 rounded-lg bg-white' 
                defaultValue={currentUser.email} onChange={handleChange}/>
        <input type="password" id='password' placeholder='password' className='border p-3 rounded-lg bg-white' 
                defaultValue={currentUser.password} onChange={handleChange}/>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase 
                hover:opacity-95 disabled:opacity-80 cursor-pointer" disabled={loading}>{loading ? 'Loading...' : 'Update'}</button>
        <Link to={'/create-listing'} className="bg-green-700 text-white p-3 rounded-lg uppercase 
                hover:opacity-95 cursor-pointer">
          create listing        
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteUser}>Delete Account</span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>Sign out</span>
      </div>
      <p className="text-red-500 mt-5">{error ? error : ''}</p>
      <p className="text-green-500 mt-5">{updateSuccess ? 'User is updated successfully!' : ''}</p>
      <button onClick={handleShowListings} className='text-green-700 w-full cursor-pointer'>Show Listings</button>
      <p className="text-red-500 mt-5">{showListingsError ? 'Error showing listings' : ''}</p>

      {
        userListings.length > 0 && 
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-center mt-7">Your Listings</h1>
          {userListings.map((listing) => (
            <div key={listing._id} className="flex justify-between p-3 border items-center gap-4 rounded-lg">  
              <img src={listing.imagesUrls[0]} alt="listing image" className="w-20 h-20 object-contain"/> 
              <Link to={`/listing/${listing._id}`} className="text-slate-700 font-semibold hover:underline truncate">
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button className="text-red-700 hover:opacity-95 uppercase cursor-pointer" 
                        onClick={() => handleDeleteListing(listing._id)}>
                        Delete
                </button>
                <button className="text-green-700 hover:opacity-95 uppercase cursor-pointer"  
                        onClick={() => handleEditListing(listing._id)}>
                        Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}
