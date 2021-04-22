import React from "react"
import useNativeLazyLoading from "@charlietango/use-native-lazy-loading"
import { useInView } from "react-intersection-observer"
import LazyPlaceholderImg from "../images/lazy-placeholder.svg"

const LazyImage = ({ src, srcSet, alt, sizes  }) => {
  const supportsLazyLoading = useNativeLazyLoading()
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 200px",
  })

  return (
    <div
      ref={!supportsLazyLoading ? ref : undefined}
      className="wrapper"
    >
      {inView || supportsLazyLoading ? (
        <img
          src={src}
          sizes={sizes}
          alt=""
          srcSet={srcSet}
          loading="lazy"
        />
      ) : <img className="lazy-placeholder" src={LazyPlaceholderImg} alt="" />}
    </div>
  )
}

export default LazyImage
