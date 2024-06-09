'use client'

import { useEffect, useState } from 'react'

import { getFixedValuesRangeData } from '@/lib/range-services'
import { FixedValuesRangeData } from '@/lib/definitions'
import { Range } from '@/ui/range'

export default function FixedValuesRange() {
  const [data, setData] = useState<FixedValuesRangeData>({
    valueRange: [],
  })

  useEffect(() => {
    const getData = async () => {
      const data = await getFixedValuesRangeData()
      setData(data)
    }
    getData()
  }, [])

  return (
    <>
      <h2>Fixed values Range</h2>
      <Range valueRange={data.valueRange} />
    </>
  )
}
