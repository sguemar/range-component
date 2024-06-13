'use client'

import { useEffect, useState } from 'react'

import { getNormalRangeData } from '@/lib/range-services'
import { NormalRangeData } from '@/lib/definitions'
import { Range } from '@/ui/range'
import { useApi } from '@/lib/hooks/useApi'

export default function NormalRange() {
  const [data, setData] = useState<NormalRangeData>({
    max: 0,
    min: 0,
  })
  const { apiCallHandler, isLoading, error } = useApi()

  const getData = async () => {
    const data = await apiCallHandler<NormalRangeData>({
      service: getNormalRangeData,
    })
    if (!error) {
      setData(data)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <h2>Normal Range</h2>
      {error ? <p>{error}</p> : <Range max={data.max} min={data.min} />}
    </>
  )
}
