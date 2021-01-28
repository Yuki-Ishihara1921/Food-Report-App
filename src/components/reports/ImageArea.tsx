import React, { FC, useCallback } from 'react'
import { storage } from '../../firebase'
import { Image } from '../../reducks/reports/types'
import ImagePreview from './ImagePreview'
import { makeStyles, IconButton } from '@material-ui/core'
import { AddPhotoAlternate } from '@material-ui/icons'

type Props = {
    images: Image[]
    setImages: React.Dispatch<React.SetStateAction<Image[]>>
}

const useStyles = makeStyles({
    icon: {
        marginRight: 8,
        height: 48,
        width: 48
    }
})

const ImageArea: FC<Props> = ({images, setImages}) => {
    const classes = useStyles()

    const uploadImage = useCallback((e) => {
        const file = e.target.files
        let blob = new Blob(file, { type: "image/jpeg" })
        const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        const N = 16
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n % S.length]).join('')
        const uploadRef = storage.ref('images').child(fileName)
        const uploadTask = uploadRef.put(blob)
        uploadTask.then(() => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage: Image = { id: fileName, path: downloadURL }
                setImages(((prevState: typeof images) => [...prevState, newImage]))
            })
        })
    }, [setImages])

    const deleteImage = useCallback(async (id: string) => {
        const res = window.confirm("この画像を削除しますか？")
        if (!res) {
            return false
        } else {
            const newImages = images.filter((image: Image) => image.id !== id)
            setImages(newImages)
            return storage.ref('images').child(id).delete()
        }
    }, [images])

    return (
        <>
            <div className="text-right">
                <span>画像を登録</span>
                <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternate />
                        <input id="image" className="display-none"
                               type="file" onChange={(e) => uploadImage(e)}
                        />
                    </label>
                </IconButton>
            </div>
            <div className="list-images">
                {images.length > 0 && (
                    images.map((image: Image) =>
                        <ImagePreview
                            key={image.id} id={image.id}
                            path={image.path} deleteImage={deleteImage}
                        />
                    )
                )}
            </div>
        </>
    )
}

export default ImageArea
