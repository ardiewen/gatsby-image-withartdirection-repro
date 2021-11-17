import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage, withArtDirection } from "gatsby-plugin-image"

function NoArtDirection({ images }) {
  const [state, setState] = useState(0)

  return (
    <div style={{ marginBottom: "100px" }}>
      <h1>Gatsby Image (No Art Direction)</h1>
      <button
        onClick={() => setState(prevState => prevState + 1)}
      >{`Increment Me: ${state}`}</button>
      <div style={{ overflowX: "scroll" }}>
        <div style={{ display: "flex" }}>
          {images?.desktop?.nodes?.map((image, index) => (
            <div key={index} style={{ flex: "0 0 50%" }}>
              <GatsbyImage image={getImage(image)} alt="Desktop Image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ArtDirection({ images }) {
  const [state, setState] = useState(0)

  return (
    <div>
      <h1>Gatsby Image (With Art Direction)</h1>

      <button
        onClick={() => setState(prevState => prevState + 1)}
      >{`Increment Me: ${state}`}</button>
      <div style={{ overflowX: "scroll" }}>
        <div style={{ display: "flex" }}>
          {images?.mobile?.nodes?.map((image, index) => {
            const mobileImage = getImage(image)
            const desktopImage = getImage(images.desktop.nodes[index])
            const sources = withArtDirection(mobileImage, [
              {
                media: "(min-width: 800px",
                image: desktopImage,
              },
            ])

            return (
              <div key={index} style={{ flex: "0 0 50%" }}>
                <GatsbyImage image={sources} alt="Art Directed Image" />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const images = useStaticQuery(graphql`
    query GetImages {
      mobile: allFile(filter: { relativePath: { regex: "/mobile/" } }) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
      desktop: allFile(filter: { relativePath: { regex: "/desk/" } }) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  `)

  return (
    <div>
      <NoArtDirection images={images} />
      <ArtDirection images={images} />
    </div>
  )
}
