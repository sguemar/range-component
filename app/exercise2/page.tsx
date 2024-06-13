'use client'

import { useEffect, useState } from 'react'

import { getFixedValuesRangeData } from '@/lib/range-services'
import { FixedValuesRangeData } from '@/lib/definitions'
import { Range } from '@/ui/range'
import { useApi } from '@/lib/hooks/useApi'

export default function FixedValuesRange() {
  const [data, setData] = useState<FixedValuesRangeData>({
    valueRange: [],
  })
  const { apiCallHandler, isLoading, error } = useApi()

  const getData = async () => {
    const data = await apiCallHandler<FixedValuesRangeData>({
      service: getFixedValuesRangeData,
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
      <h2>Fixed values Range</h2>
      {error ? <p>{error}</p> : <Range valueRange={data.valueRange} />}
    </>
  )
}
