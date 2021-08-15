import * as React from 'react'
import {useRouter} from 'next/router'

const Donate = () => {
  const router = useRouter()
  const {id} = router.query

  console.log(id)

  return (
    <div>
      <p>Donate: {id}</p>
    </div>
  )
}

export default Donate
