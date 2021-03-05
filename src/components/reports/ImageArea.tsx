import React, { FC, useState, useCallback } from 'react'
import { Image } from '../../reducks/reports/types'
import { storage } from '../../firebase'
import { makeStyles, Box, CircularProgress, IconButton } from '@material-ui/core'
import { AddPhotoAlternate } from '@material-ui/icons'

type Props = {
    images: Image[]
    setImages: React.Dispatch<React.SetStateAction<Image[]>>
}

const useStyles = makeStyles({
    root: {
        background: '#fff'
    },
    iconButton: {
        width: 48,
        height: 48,
        marginRight: 8
    },
    circleProgress: {
        margin: 40
    }

})

const ImageArea: FC<Props> = ({images, setImages}) => {
    const classes = useStyles()
    const [isUploading, setIsUploading] = useState<boolean>(false)

    const uploadImage = useCallback((e) => {
        setIsUploading(true)
        const file = e.target.files
        let blob = new Blob(file, { type: "image/jpeg" })
        const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        const N = 16
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n % S.length]).join('')
        const uploadRef = storage.ref('images').child(fileName)
        const uploadTask = uploadRef.put(blob)
        uploadTask
        .then(() => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage: Image = { id: fileName, path: downloadURL }
                setImages(((prevState) => [...prevState, newImage]))
                setIsUploading(false)
            })
        })
        .catch(() => {
            alert("画像が登録できませんでした。通信環境をご確認の上、再登録して下さい。")
            setIsUploading(false)
            return false
        })
    }, [setImages])

    const deleteImage = useCallback((id: string) => {
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
        <Box className={classes.root}>
            <div className="text-right">
                <span>画像を登録</span>
                <IconButton className={classes.iconButton}>
                    <label>
                        <AddPhotoAlternate />
                        <input
                            id="image" className="display-none" type="file"
                            onChange={(e) => uploadImage(e)}
                        />
                    </label>
                </IconButton>
            </div>
            {isUploading ? (
                <CircularProgress className={classes.circleProgress} />
            ) : (
                <div className="imageList">
                    {images.length > 0 && (
                        images.map((image: Image) =>
                        <div className="image__container" key={image.id}>
                            <img
                                src={image.path} alt="レポート画像"
                                onClick={() => deleteImage(image.id)}
                            />
                        </div>
                        )
                    )}
                </div>
            )}
        </Box>
    )
}

export default ImageArea
