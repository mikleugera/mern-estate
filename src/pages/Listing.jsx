import { useEffect, useState } from "react"
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare
} from 'react-icons/fa'
import { useParams } from "react-router-dom"
import SwiperCore from 'swiper'
import 'swiper/css/bundle'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export const Listing = () => {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)
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
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className="flex gap-4">
                <p className='bg-red-900 w-full max-w-50 p-1 text-white text-center rounded-md cursor-pointer'>
                  {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>
                {
                  listing.offer && (
                    <p className='bg-green-700 w-full max-w-50 p-1 text-white text-center rounded-md cursor-pointer'>
                      ${+listing.regularPrice - +listing.discountPrice}
                    </p>
                  )
                }
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - {' '}</span>
              {listing.description}
            </p>
            <ul className='flex flex-wrap text-green-900 font-semibold text-sm items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBed className='text-lg'/>
                {listing.bedRooms > 1 ? `${listing.bedRooms} beds` : '1 bed'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBath className='text-lg'/>
                {listing.bathRooms > 1 ? `${listing.bathRooms} baths` : '1 bath'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaParking className='text-lg'/>
                {listing.parking ? 'Parking spot' : 'No parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaChair className='text-lg'/>
                {listing.furnished ? 'Furnished' : 'Not furnished'}
              </li>
            </ul>
          </div>
        </div>
      )}
    </main>
  )
}
