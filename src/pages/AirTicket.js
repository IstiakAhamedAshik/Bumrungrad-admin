import React, { useState, useEffect } from 'react'

import { Card, Typography } from '@material-tailwind/react'
import Loader from '../components/Loader'
import { AiFillEye } from 'react-icons/ai'
import { Button } from '@material-tailwind/react'
const AirTicket = () => {
  const [loader, setLoader] = useState(true)
  const [airTicket, setAirTicket] = useState([])
  const TABLE_HEAD = [
    'From Country',
    'Destination Country',
    'Passport Copy',
    'Booking Date',
    'Action'
  ]
  const handaleDeleteAirTicekt = (oneTicket) => {
    const newAirticketData = airTicket.filter(
      (airpickup) => airpickup.id !== oneTicket.id
    )
    setAirTicket(newAirticketData)
  } 
  useEffect(() => {
    fetch('https://api.bumrungraddiscover.com/api/get/air/ticket')
      .then((res) => res.json())
      .then((data) => {
        setAirTicket(data.data)
        setLoader(false)
      })
  }, [])
  console.log(airTicket)
  return (
    <div>
      {' '}
      <div>
        {loader ? (
          <Loader />
        ) : (
          <Card className='m-5 md:m-10 h-full overflow-scroll'>
            <p className='p-5 text-xl font-semibold '>
              Ait Ticket: {airTicket?.length}
            </p>
            <table className='w-full min-w-max table-auto text-left'>
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, i) => (
                    <th
                      key={i}
                      className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
                    >
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal leading-none opacity-70 '
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {airTicket?.map((oneTicket, index) => (
                  <tr key={index} className='even:bg-blue-gray-50/50'>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {oneTicket?.country}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {oneTicket?.destination}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <a
                        href={oneTicket?.doc}
                        target='blank'
                        rel='noopener noreferrer'
                      >
                        <button className='flex w-fit gap-2 items-center px-2 py-1 shadow rounded bg-blue text-white '>
                          <AiFillEye className='text-xl' />
                          Passport
                        </button>
                      </a>
                    </td>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {oneTicket?.booking_date}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <Button
                        onClick={() => {
                          handaleDeleteAirTicekt(oneTicket)
                        }}
                        variant='gradient'
                        color='red'
                      >
                        <span>Delete</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </div>
  )
}

export default AirTicket
