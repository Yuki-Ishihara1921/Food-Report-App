import { FC } from 'react'

type Props = {
    id: string
    path: string
    deleteImage: (id: string) => void
}

const ImagePreview: FC<Props> = ({id, path, deleteImage}) => {
    return (
        <div className="image__container" onClick={() => deleteImage(id)}>
            <img src={path} alt="レポート画像"/>
        </div>
    )
}

export default ImagePreview
