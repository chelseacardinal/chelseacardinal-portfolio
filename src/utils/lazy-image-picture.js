import React from "react"
import useNativeLazyLoading from "@charlietango/use-native-lazy-loading"
import { useInView } from "react-intersection-observer"
import LazyPlaceholderImg from "../images/lazy-placeholder.svg"

const LazyImagePicture = ({ src, srcSet, wpSrcSet, media, alt }) => {
  const supportsLazyLoading = useNativeLazyLoading()
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 200px",
  })

  return (
    <div ref={!supportsLazyLoading ? ref : undefined} className="wrapper">
      {inView || supportsLazyLoading ? (
        <picture>
          <source
            media={media}
            srcSet={wpSrcSet}
            type="image/webp"
          />
          <source
            media={media}
            srcSet={srcSet}
            type="image/jpeg"
          />
          <img
            src={src}
            alt={alt}
            loading="lazy"
          />
        </picture>
      ) : (
        <img className="lazy-placeholder" src={LazyPlaceholderImg} alt="" />
      )}
    </div>
  )
}

export default LazyImagePicture
