import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../firebase'
import { RootState } from '../reducks/store/store'
import { Category } from '../reducks/reports/types'
import { TextReadOnly } from '../components/UI'
import { ImageSwiper } from '../components/reports'
import 'swiper/css/swiper.css'
import { datetimeToString } from '../function/common'
import { makeStyles, Link } from '@material-ui/core'
import { Update, Restaurant, Event, Train, Category as CategoryIcon } from '@material-ui/icons'
import { Rating } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
    itemsBox: {
        margin: '12px',
        [theme.breakpoints.down('md')]: {
            display: 'block'
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        }
    },
    sliderBox: {
        margin: '10px auto',
        [theme.breakpoints.down('md')]: {
            maxWidth: 500
        },
        [theme.breakpoints.up('md')]: {
            width: 375 
        }
    },
    sideBox: {
        [theme.breakpoints.down('sm')]: {
            margin: 'auto 10px'
        },
        [theme.breakpoints.up('sm')]: {
            margin: 'auto 4rem'
        },
        [theme.breakpoints.up('md')]: {
            margin: '2rem'
        }
    },
    sideFlex: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex'
        },
        [theme.breakpoints.up('md')]: {
            display: 'block'
        }
    },
    rateBox: {
        marginBottom: 20,
        padding: '5px 10px',
        boxShadow: '0px 2px 0px -1px gray',
        [theme.breakpoints.down('sm')]: {
            fontSize: 30
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: 40
        }
    }
}))

const ReportDetail: FC = () => {
    const classes = useStyles()
    const id = window.location.href.split('/reports/')[1]
    const selector = useSelector((state: RootState) => state.users)
    const uid = selector.uid

    const [updatedAt, setUpdatedAt] = useState<string>(""),
          [name, setName] = useState<string>(""),
          [url, setUrl] = useState<string>(""),
          [images, setImages] = useState([]),
          [rate, setRate] = useState<number | null>(0),
          [date, setDate] = useState<string>(""),
          [price, setPrice] = useState<number>(0),
          [station, setStation] = useState<string>(""),
          [category, setCategory] = useState<string>(""),
          [description, setDescription] = useState<string>("")

    useEffect(() => {
        if (id !== "") {
            db.collection('users').doc(uid).collection('reports').doc(id).get()
            .then((snapshot) => {
                const data = snapshot.data()
                if (data) {
                    setName(data.name)
                    setUrl(data.url)
                    setImages(data.images)
                    setRate(data.rate)
                    setDate(data.date)
                    setPrice(data.price)
                    setStation(data.station)
                    setCategory(data.category)
                    setDescription(data.description)
                    const updated_at = datetimeToString(data.updated_at.toDate())
                    setUpdatedAt(updated_at)
                }
            })
        }
    }, [id])

    return (
        <div className="reportpage-wrapin">
            <div className="text-right">
                <TextReadOnly
                    width={""}
                    label={"最終更新日"}
                    multiline={false}
                    value={updatedAt}
                    variant={"standard"}
                    icon={<Update />}
                />
            </div>
            <TextReadOnly
                width={"100%"}
                label={""}
                multiline={true}
                value={name}
                variant={"outlined"}
                icon={<Restaurant />}
            />
            <div className={classes.itemsBox}>
                <div>
                    {url && (
                        <Link href={url} target="_blank">Webサイト</Link>
                    )}
                    <div className={classes.sliderBox}>
                        <ImageSwiper images={images} />
                    </div>
                    <Rating
                        className={classes.rateBox}
                        name="rate-detail"
                        readOnly
                        value={rate} size={"large"}
                    />
                </div>
                <div className={classes.sideBox}>
                    <div className="display-flex">
                        <TextReadOnly
                            width={"100%"}
                            label={"日付"}
                            multiline={false}
                            value={date}
                            variant={"outlined"}
                            icon={<Event />}
                        />
                        <TextReadOnly
                            width={"auto"}
                            label={"費用/1人"}
                            multiline={false}
                            value={price}
                            variant={"outlined"}
                            icon="¥"
                        />
                    </div>
                    <div className={classes.sideFlex}>
                        <TextReadOnly
                            width={"100%"}
                            label={"近くの駅"}
                            multiline={false}
                            value={station}
                            variant={"outlined"}
                            icon={<Train />}
                        />
                        <TextReadOnly
                            width={"100%"}
                            label={"カテゴリー"}
                            multiline={false}
                            value={category}
                            variant={"outlined"}
                            icon={<CategoryIcon />}
                        />
                    </div>
                </div>
            </div>
            <TextReadOnly
                width={"100%"}
                label={"レビュー"}
                multiline={true}
                value={description}
                variant={"outlined"}
                icon=""
            />
        </div>
    )
}

export default ReportDetail
