import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'

export const Listing = () => {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  
  const params = useParams()
  SwiperCore.use([Navigation])

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/listing/get/${params.listingId}`)
        const data = await res.json()
        if(data.success === false) {
          setError(true)
          setLoading(false)
          return;
        }
        setListing(data)
        setLoading(false)
        setError(false)
        
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchListings()
  }, [params.listingId])

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && <p className="text-center my-7 text-2xl">Something went wrong</p>}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imagesUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className='h-137.5' style={{background: `url(${url}) no-repeat center center / cover`}}></div>
              </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </main>
  )
}
