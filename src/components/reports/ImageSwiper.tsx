import React, { FC, useState } from 'react'
import { Image } from '../../reducks/reports/types'
import NoImage from '../../assets/img/no_image.png'
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'

type Props = {
    images: Image[]
}

const ImageSwiper: FC<Props> = ({images}) => {
    const [params] = useState({
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        loop: true,
        spaceBetween: 30
    })

    return (
        <>
            {images.length > 0 ? (
                <>
                    {images.length > 1 ? (
                        <Swiper {...params}>
                            {images.map((image) => (
                                <div className="image__container" key={image.id}>
                                    <img src={image.path} alt="レポート画像"/>
                                </div>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="image__container">
                            <img src={images[0].path} alt="レポート画像"/>
                        </div>
                    )}
                </>
            ) : (
                <div className="image__container">
                    <img src={NoImage} alt="画像なし"/>
                </div>
            )}
        </>
    )
}

export default ImageSwiper
