import React, { useState, useEffect } from 'react'
import { Card, Typography } from '@material-tailwind/react'
import Loader from '../components/Loader'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'

import { AiFillEye } from 'react-icons/ai'
import { BsFileEarmarkArrowDown } from 'react-icons/bs'
const MedicalRecord = () => {
  const [loader, setLoader] = useState(true)
  const [medicalRecord, setMedicalRecord] = useState([])
  const [open, setOpen] = React.useState(false)
  const [medicalRecordModalData, setModalData] = useState({})
  const handleOpen = (data) => {
    setOpen(!open)
    setModalData(data)
  }

  const TABLE_HEAD = ['HN Number', 'Passport Copy', 'Action']
  useEffect(() => {
    fetch('https://api.bumrungraddiscover.com/api/get/medical/report')
      .then((res) => res.json())
      .then((data) => {
        setMedicalRecord(data.data)
        setLoader(false)
      })
  }, [])
  return (
    <div>
      {' '}
      <div>
        {loader ? (
          <Loader />
        ) : (
          <Card className='m-5 md:m-10 h-full overflow-scroll'>
            <p className='p-5 text-2xl text-blue font-semibold'>
              Medical Records: {medicalRecord?.length}
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
                        className={`font-normal leading-none opacity-70 ${
                          i === 4 && 'text-center'
                        }`}
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {medicalRecord?.map((oneMedicalRecord, index) => (
                  <tr key={index} className='even:bg-blue-gray-50/50'>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {oneMedicalRecord?.hnNum}
                      </Typography>
                    </td>
                    <td className='p-4'>
                      <a
                        href={oneMedicalRecord?.passport}
                        target='blank'
                        rel='noopener noreferrer'
                        className='flex w-fit items-center gap-2 px-4 py-2 shadow rounded bg-blue text-white '
                      >
                        <BsFileEarmarkArrowDown className='text-xl' />
                        Passport
                      </a>
                    </td>
                    <td className='p-4'>
                      <button
                        onClick={() => handleOpen(oneMedicalRecord)}
                        className='px-4 py-2 shadow rounded bg-blue text-white flex items-center gap-2'
                      >
                        <AiFillEye className='text-xl' />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
        <Dialog open={open} handler={handleOpen}>
          <DialogBody>
            <p className='text-xl font-semibold text-blue'>Medical Record</p>
            <p className='mt-5'>
              <span className='font-semibold'>HN Number:</span>{' '}
              {medicalRecordModalData?.hnNum}
            </p>
            <p className='mt-2.5'>
              <span className='font-semibold'>Case Summary:</span> <br />
              {medicalRecordModalData?.caseSummary}
            </p>
            <div className='mt-2.5'>
              <a
                className='flex w-fit gap-2 items-center px-2 py-1 shadow rounded bg-blue text-white '
                href={medicalRecordModalData?.passport}
             target='blank' >
                <BsFileEarmarkArrowDown className='text-xl' /> Passport
              </a>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant='gradient'
              color='black'
              onClick={handleOpen}
              className='mr-4'
            >
              <span>Close</span>
            </Button>
            <Button variant='gradient' color='red'>
              <span>Delete</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  )
}

export default MedicalRecord
