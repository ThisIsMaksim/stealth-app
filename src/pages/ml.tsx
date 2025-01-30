import {useCallback, useState} from "react"
import * as faceapi from '@vladmandic/face-api'
import {Button} from "keep-react"

export const ML = () => {
  const [text, setText] = useState('')

  const compareFaces = useCallback(async () => {
    setText('load models')

    await faceapi.nets.ssdMobilenetv1.loadFromUri('https://yastatic.net/s3/grocery-superapp/static/models/')
    await faceapi.nets.faceLandmark68Net.loadFromUri('https://yastatic.net/s3/grocery-superapp/static/models/')
    await faceapi.nets.faceRecognitionNet.loadFromUri('https://yastatic.net/s3/grocery-superapp/static/models/')

    setText('load photos')
    const img1 = await faceapi.bufferToImage((document.getElementById('photo') as HTMLInputElement).files[0])
    const img2 = await faceapi.bufferToImage((document.getElementById('passport') as HTMLInputElement).files[0])

    setText('try to detect')
    const detections1 = await faceapi.detectSingleFace(img1).withFaceLandmarks().withFaceDescriptor()
    const detections2 = await faceapi.detectSingleFace(img2).withFaceLandmarks().withFaceDescriptor()

    if (!detections1 || !detections2) {
      setText('Could not detect both faces')

      console.error('Could not detect both faces')

      return undefined
    }

    const distance = faceapi.euclideanDistance(detections1.descriptor, detections2.descriptor)

    console.log('Distance:', distance)

    setText(`Status: ${distance < 0.6 ? 'valid' : 'invalid'}`)

    // Предположим, что если расстояние меньше 0.6, то это один и тот же человек
    return distance < 0.6
  }, [])

  const checkFace = useCallback(async () => {
    setText('Try to detect')

    await compareFaces()
  }, [])

  return (
    <div className="flex flex-col space-y-3">
      <input id="passport" type="file" accept="image/*"/>
      <input id="photo" type="file" accept="image/*"/>
      <Button onClick={checkFace}>Check</Button>
      <div>{text}</div>
    </div>
  )
}