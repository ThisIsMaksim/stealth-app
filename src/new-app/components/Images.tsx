import {PhotoProvider, PhotoView} from "react-photo-view"

interface Props {
  images: string[]
}

const ImagesWrapper = ({ imagesUrl }: { imagesUrl: string[] }) => {
  if (imagesUrl.length === 1) {
    return (
      <PhotoView src={imagesUrl[0]}>
        <img src={imagesUrl[0]} alt="" />
      </PhotoView>
    )
  }
  if (imagesUrl.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <PhotoView src={imagesUrl[0]}>
          <img src={imagesUrl[0]} alt=""/>
        </PhotoView>
        <PhotoView src={imagesUrl[1]}>
          <img src={imagesUrl[1]} alt=""/>
        </PhotoView>
      </div>
    )
  }
  if (imagesUrl.length === 3) {
    const urls = imagesUrl.slice(1, 3)

    return (
      <div className="flex flex-row gap-2">
        <PhotoView src={imagesUrl[0]}>
          <img src={imagesUrl[0]} className="max-w-[300px]" alt=""/>
        </PhotoView>
        <div className="flex flex-col gap-2">
          {urls.map((url, index) => (
            <PhotoView key={index} src={imagesUrl[1]}>
              <img src={url} className="max-w-[200px]" alt="" />
            </PhotoView>
          ))}
        </div>
      </div>
    )
  }

  const urls = imagesUrl.slice(1, 4)

  return (
    <div className="flex flex-row gap-2">
      <PhotoView src={imagesUrl[0]}>
        <img src={imagesUrl[0]} className="max-w-[350px]" alt=""/>
      </PhotoView>
      <div className="flex flex-col gap-2">
        {urls.map((url, index) => (
          <PhotoView key={index} src={imagesUrl[1]}>
            <img src={url} className="max-w-[150px]" alt="" />
          </PhotoView>
        ))}
      </div>
    </div>
  )
}

export const Images = ({ images }: Props) => {
  if (!images) return null

  return (
    <PhotoProvider maskOpacity={0.5} bannerVisible={false}>
      <ImagesWrapper imagesUrl={images}/>
    </PhotoProvider>
  )
}