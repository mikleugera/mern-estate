import { Link } from "react-router-dom"
import { MdLocationOn } from "react-icons/md"

export const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full">
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imagesUrls[0]} alt="listing cover" 
                className="h-80 sm:h-55 w-full object-cover hover:scale-105 transition-scale duration-300"
            />
            <div className="p-3 flex flex-col gap-2 w-full">
                <p className="text-lg font-semibold text-slate-700 truncate">{listing.name}</p>
                <div className="flex gap-1 items-center">
                    <MdLocationOn className="h-4 w-4 text-green-700" />
                    <p className="text-sm text-gray-600 truncate w-full">{listing.address}</p>
                </div>
                <p className="line-clamp-2 text-sm text-gray-600 text-left">{listing.description}</p>
                <p className="font-semibold text-slate-500 mt-2 text-left">
                    $
                    {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')} 
                    {listing.type === 'rent' && '/ month'}
                </p>
                <div className="text-slate-700 gap-4 flex">
                    <div className="font-bold text-xs">
                        {listing.bedRooms > 1 ? `${listing.bedRooms} beds` : `${listing.bedRooms} bed`}
                    </div>
                    <div className="font-bold text-xs">
                        {listing.bathRooms > 1 ? `${listing.bathRooms} baths` : `${listing.bathRooms} bath`}
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}
