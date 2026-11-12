import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null)
  const [message, setMessage] = useState('')

  const onChange = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`)
        const data = await res.json()
        setLandlord(data)
      } catch (error) {
        console.error('Error fetching landlord:', error)
      }
    }

    fetchLandlord()
  }, [listing.userRef])

  return (
    <>
        {landlord && (
            <div className="flex flex-col gap-2">
                <p className="text-start">
                    Contact <span className='font-semibold'>{landlord.username}</span> for 
                    <span className='font-semibold'> {listing.name.toLowerCase()}</span>
                </p>
                <textarea 
                    name="message" 
                    id="message" 
                    value={message} 
                    rows="2"
                    onChange={onChange} 
                    placeholder="Write your message here..."
                    className='w-full border p-3 rounded-lg'
                />
                <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} 
                      className="bg-slate-500 text-white p-3 uppercase rounded-lg text-center hover:opacity-95 cursor-pointer">
                    Send Message
                </Link>
            </div>
        )}
    </>
  )
}
