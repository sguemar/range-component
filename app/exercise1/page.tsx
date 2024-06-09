'use client'

import { useEffect, useState } from 'react'

import { getNormalRangeData } from '@/lib/range-services'
import { NormalRangeResponse } from '@/lib/definitions'
import { Range } from '@/ui/range'

export default function NormalRange() {
  const [data, setData] = useState<NormalRangeResponse>({
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
      {!isLoading && <Range max={data.max} min={data.min} />}
    </>
  )
}
