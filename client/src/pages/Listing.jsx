import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'

const Listing = () => {

    SwiperCore.use(Navigation)
    const [ listing, setListing ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(false)

    const { id } =  useParams()

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true)
                setError(false)
                const res = await fetch(`/api/listing/get/${id}`, {
                })
                const data = await res.json()
                if (data.success === false) {
                    setError(true)
                    return
                }
                setListing(data)
            } catch (error) {
                setError(true)
            }finally {
                setLoading(false)
            }
        }
        fetchListing()
    }, [])

    console.log(listing)
    return (
        <main>
            {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
            {error && <p className='text-center my-7 text-2xl text-red-700'>Something Went Wrong</p>}
            {listing && !error && !loading && <>
                <Swiper navigation>
                    {listing?.imageUrls.map((url) => (
                        <SwiperSlide key={url}>
                            <div className='h-[300px]' style={{
                                background: `url(${url}) center no-repeat`,
                                backgroundSize: 'cover'
                            }}>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>}

        </main>
    )
}

export default Listing