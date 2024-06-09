'use client'

import { useEffect, useState } from 'react'

import { getNormalRangeData } from '@/lib/range-services'
import { NormalRangeData } from '@/lib/definitions'
import { Range } from '@/ui/range'

export default function NormalRange() {
  const [data, setData] = useState<NormalRangeData>({
    max: 0,
    min: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      const data = await getNormalRangeData()
      setIsLoading(false)
      setData(data)
    }
    getData()
  }, [])

  return (
    <>
      <h2>Normal Range</h2>
      {isLoading ? <p>Loading...</p> : <Range max={data.max} min={data.min} />}
    </>
  )
}
