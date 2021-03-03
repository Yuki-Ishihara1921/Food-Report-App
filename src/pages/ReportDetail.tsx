import React, { FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { RootState } from '../reducks/store'
import { deleteReport } from '../reducks/reports/operations'
import { ImageSwiper } from '../components/reports'
import { TextReadOnly, ButtonClick } from '../components/UIkit'
import { db } from '../firebase'
import firebase from 'firebase/app'
import { makeStyles, Box, Link } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { Category, Delete, Edit, Event, Restaurant, Room, Train, Update } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    itemsBox: {
        [theme.breakpoints.down('md')]: {
            display: 'block'
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            margin: '1rem'
        }
    },
    content: {
        [theme.breakpoints.down('sm')]: {
            margin: 'auto 1rem'
        },
        [theme.breakpoints.up('sm')]: {
            margin: 'auto 4rem'
        },
        [theme.breakpoints.up('md')]: {
            margin: 'auto 1rem'
        }
    },
    images: {
        margin: '10px auto',
        boxShadow: '0px 0px 5px 0px',
        [theme.breakpoints.down('md')]: {
            maxWidth: 500
        },
        [theme.breakpoints.up('md')]: {
            width: 375 
        }
    },
    rating: {
        padding: '5px 10px',
        boxShadow: '0px 2px 0px -1px gray',
        [theme.breakpoints.down('sm')]: {
            marginBottom: 20
        }
    }
}))

const ReportDetail: FC = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state: RootState) => state)
    const uid = selector.users.uid
    const id = window.location.href.split('/reports/')[1]

    const [updatedAt, setUpdatedAt] = useState<string>(""),
          [name, setName] = useState<string>(""),
          [url, setUrl] = useState<string>(""),
          [images, setImages] = useState([]),
          [rate, setRate] = useState<number | null>(0),
          [date, setDate] = useState<string>(""),
          [price, setPrice] = useState<number>(0),
          [category, setCategory] = useState<string>(""),
          [place, setPlace] = useState<string>(""),
          [station, setStation] = useState<string>(""),
          [description, setDescription] = useState<string>("")

    const datetimeToString = (dt: firebase.firestore.DocumentData) => {
        return dt.getFullYear() + '/'
            + ('00' + (dt.getMonth()+1)).slice(-2) + '/'
            + ('00' + dt.getDate()).slice(-2) + '  '
            + ('00' + dt.getHours()).slice(-2) + ':'
            + ('00' + dt.getMinutes()).slice(-2)
    }

    useEffect(() => {
        if (id) {
            db.collection('users').doc(uid).collection('reports').doc(id).get()
            .then((snapshot) => {
                const data = snapshot.data()
                if (data) {
                    setUpdatedAt(datetimeToString(data.updated_at.toDate()))
                    setName(data.name)
                    setUrl(data.url)
                    setImages(data.images)
                    setRate(data.rate)
                    setDate(data.date)
                    setPrice(data.price)
                    setCategory(data.category)
                    setPlace(data.place)
                    setStation(data.station)
                    setDescription(data.description)
                }
            })
        }
    }, [uid, id])

    return (
        <section className="reportPage">
            <div className="text-right">
                <TextReadOnly
                    icon={<Update />} label={"最終更新日"} multiline={false}
                    value={updatedAt} variant={"standard"} width={""}
                />
            </div>
            <TextReadOnly
                icon={<Restaurant />} label={"店名 / 料理名"} multiline={true}
                value={name} variant={"outlined"} width={"100%"}
            />
            <Box className={classes.itemsBox}>
                <div className={classes.content}>
                    {url && (
                        <Link href={url} target="_blank">Webサイト</Link>
                    )}
                    <div className={classes.images}>
                        <ImageSwiper images={images} />
                    </div>
                    <Rating
                        className={classes.rating} name="rate-detail"
                        readOnly size={"large"} value={rate}
                    />
                </div>
                <div className={classes.content}>
                    <TextReadOnly
                        icon={<Event />} label={"日付"} multiline={false}
                        value={date} variant={"outlined"} width={"150px"}
                    />
                    <TextReadOnly
                        icon={"¥"} label={"費用/1人"} multiline={false}
                        value={price} variant={"outlined"} width={"100px"}
                    />
                    <TextReadOnly
                        icon={<Category />} label={"カテゴリー"} multiline={false}
                        value={category} variant={"outlined"} width={"175px"}
                    />
                    <TextReadOnly
                        icon={<Room />} label={"主な場所"} multiline={false}
                        value={place} variant={"outlined"} width={""}
                    />
                    <TextReadOnly
                        icon={<Train />} label={"近くの駅"} multiline={false}
                        value={station} variant={"outlined"} width={""}
                    />
                </div>
            </Box>
            <TextReadOnly
                icon={""} label={"レビュー"} multiline={true}
                value={description} variant={"outlined"} width={"100%"}
            />
            <ButtonClick
                color={"primary"} label={"編集"} startIcon={<Edit />}
                onClick={() => dispatch(push('/report/edit/' + id))}
            />
            <ButtonClick
                color={"secondary"} label={"削除"} startIcon={<Delete />}
                onClick={() => dispatch(deleteReport(uid, id, images))}
            />
        </section>
    )
}

export default ReportDetail
