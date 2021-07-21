import './sectionHeader.css'

export const Heading = ({text}) => {

    return (
      <div id="sectionHeadingContainer">
          <h1 className="sectionHeading">{text}</h1>
      </div>
    )
}
