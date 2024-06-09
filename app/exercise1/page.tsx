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

  useEffect(() => {
    const getData = async () => {
      const data = await getNormalRangeData()
      setData(data)
    }
    getData()
  }, [])

  return (
    <>
      <h2>Normal Range</h2>
      <Range max={data.max} min={data.min} />
    </>
  )
}
