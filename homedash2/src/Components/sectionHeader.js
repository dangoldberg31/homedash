// import { useEffect } from 'react'
import './sectionHeader.css'

export const Heading = ({text}) => {

    return (
      <div className="sectionHeadingContainer">
          <h1 className="sectionHeading" >{text}</h1>
      </div>
    )
}
