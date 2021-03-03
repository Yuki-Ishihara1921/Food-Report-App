import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { RootState } from '../reducks/store'
import { deleteReport } from '../reducks/reports/operations'
import { makeStyles, Link } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { Update, Restaurant, Event, Category, Room, Train, Edit, Delete } from '@material-ui/icons'
import { ImageSwiper } from '../components/reports'
import { TextReadOnly, ButtonClick } from '../components/UIkit'
import { db } from '../firebase'
import firebase from 'firebase/app'

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
    imageBox: {
        margin: '10px auto',
        boxShadow: '0px 0px 5px 0px',
        [theme.breakpoints.down('md')]: {
            maxWidth: 500
        },
        [theme.breakpoints.up('md')]: {
            width: 375 
        }
    },
    sideBox: {
        [theme.breakpoints.down('sm')]: {
            margin: 'auto'
        },
        [theme.breakpoints.up('sm')]: {
            margin: 'auto 4rem'
        },
        [theme.breakpoints.up('md')]: {
            margin: 'auto 1rem'
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
    const selector = useSelector((state: RootState) => state.users)
    const uid = selector.uid
    const id = window.location.href.split('/reports/')[1]

    const [updatedAt, setUpdatedAt] = useState<string>(""),
          [name, setName] = useState<string>(""),
          [url, setUrl] = useState<string>(""),
          [images, setImages] = useState([]),
          [rate, setRate] = useState<number | null>(0),
          [date, setDate] = useState<string>(""),
          [price, setPrice] = useState<number>(0),
          [place, setPlace] = useState<string>(""),
          [station, setStation] = useState<string>(""),
          [category, setCategory] = useState<string>(""),
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
                    setName(data.name)
                    setUrl(data.url)
                    setImages(data.images)
                    setRate(data.rate)
                    setDate(data.date)
                    setPrice(data.price)
                    setPlace(data.place)
                    setStation(data.station)
                    setCategory(data.category)
                    setDescription(data.description)
                    setUpdatedAt(datetimeToString(data.updated_at.toDate()))
                }
            })
        }
    }, [uid, id])

    return (
        <div className="reportPage">
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
                label={"店名 / 料理名"}
                multiline={true}
                value={name}
                variant={"outlined"}
                icon={<Restaurant />}
            />
            <div className={classes.itemsBox}>
                <div className={classes.sideBox}>
                    {url && (
                        <Link href={url} target="_blank">Webサイト</Link>
                    )}
                    <div className={classes.imageBox}>
                        <ImageSwiper images={images} />
                    </div>
                    <Rating
                        className={classes.rateBox} name="rate-detail"
                        readOnly size={"large"} value={rate}
                    />
                </div>
                <div className={classes.sideBox}>
                    <TextReadOnly
                        width={"150px"}
                        label={"日付"}
                        multiline={false}
                        value={date}
                        variant={"outlined"}
                        icon={<Event />}
                    />
                    <TextReadOnly
                        width={"100px"}
                        label={"費用/1人"}
                        multiline={false}
                        value={price}
                        variant={"outlined"}
                        icon={"¥"}
                    />
                    <TextReadOnly
                        width={"175px"}
                        label={"カテゴリー"}
                        multiline={false}
                        value={category}
                        variant={"outlined"}
                        icon={<Category />}
                    />
                    <TextReadOnly
                        width={""}
                        label={"主な場所"}
                        multiline={false}
                        value={place}
                        variant={"outlined"}
                        icon={<Room />}
                    />
                    <TextReadOnly
                        width={""}
                        label={"近くの駅"}
                        multiline={false}
                        value={station}
                        variant={"outlined"}
                        icon={<Train />}
                    />
                </div>
            </div>
            <TextReadOnly
                width={"100%"}
                label={"レビュー"}
                multiline={true}
                value={description}
                variant={"outlined"}
                icon={""}
            />
            <ButtonClick
                startIcon={<Edit />}
                color={"primary"}
                label={"編集"}
                onClick={() => dispatch(push('/report/edit/' + id))}
            />
            <ButtonClick
                startIcon={<Delete />}
                color={"secondary"}
                label={"削除"}
                onClick={() => dispatch(deleteReport(uid, id, images))}
            />
        </div>
    )
}

export default ReportDetail
