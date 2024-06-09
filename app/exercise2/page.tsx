'use client'

import { useEffect, useState } from 'react'

import { getFixedValuesRangeData } from '@/lib/range-services'
import { FixedValuesRangeData } from '@/lib/definitions'
import { Range } from '@/ui/range'

export default function FixedValuesRange() {
  const [data, setData] = useState<FixedValuesRangeData>({
    valueRange: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      const data = await getFixedValuesRangeData()
      setIsLoading(false)
      setData(data)
    }
    getData()
  }, [])

  return (
    <>
      <h2>Fixed values Range</h2>
      {isLoading ? <p>Loading...</p> : <Range valueRange={data.valueRange} />}
    </>
  )
}
