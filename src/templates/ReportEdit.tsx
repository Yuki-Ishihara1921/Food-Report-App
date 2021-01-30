import React, { FC, useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reducks/store'
import { saveReport } from '../reducks/reports/operations'
import { Image, Category, EditReport } from '../reducks/reports/types'
import { ImageArea } from '../components/reports'
import { TextInput, SelectBox, SaveButton } from '../components/UI'
import { ChangeEvent } from '../type'
import { db } from '../firebase'
import moment from 'moment'
import { makeStyles, InputLabel } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { Restaurant, Train, Language, Save } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    itemsBox: {
        [theme.breakpoints.down('sm')]: {
            margin: '1rem 3rem',
            textAlign: 'left'
        },
        [theme.breakpoints.up('sm')]: {
            margin: '1rem'
        }
    },
    itemsFlex: {
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
        [theme.breakpoints.up('sm')]: {
            display: 'flex'
        }
    }
}))

const ReportEdit: FC = () => {
    const classes = useStyles()
    let id = window.location.pathname.split('/report/edit')[1]
    if (id !== "" && id !== undefined) {
        id = id.split('/')[1]
    }
    const dispatch = useDispatch()
    const selector = useSelector((state: RootState) => state)
    const uid = selector.users.uid

    const [name, setName] = useState<string>(""),
          [images, setImages] = useState<Image[]>([]),
          [rate, setRate] = useState<number | null>(0),
          [date, setDate] = useState<string>(moment().format('YYYY-MM-DD')),
          [price, setPrice] = useState<number>(0),
          [station, setStation] = useState<string>(""),
          [category, setCategory] = useState<string>(""),
          [url, setUrl] = useState<string>(""),
          [description, setDescription] = useState<string>(""),
          [categories, setCategories] = useState<Category[]>([])

    const inputName = useCallback((e: ChangeEvent) => {
        setName(e.target.value)
    }, [setName])

    const inputDate = useCallback((e: ChangeEvent) => {
        setDate(e.target.value)
    }, [setDate])

    const inputPrice = useCallback((e: ChangeEvent) => {
        setPrice(Number(e.target.value))
    }, [setPrice])

    const inputStation = useCallback((e: ChangeEvent) => {
        setStation(e.target.value)
    }, [setStation])

    const inputUrl = useCallback((e: ChangeEvent) => {
        setUrl(e.target.value)
    }, [setUrl])

    const inputDescription = useCallback((e: ChangeEvent) => {
        setDescription(e.target.value)
    }, [setDescription])

    const handleSaveReport = () => {
        const editReport: EditReport = {
            id: id,
            name: name,
            images: images,
            rate: rate,
            date: date,
            price: price,
            station: station,
            category: category,
            url: url,
            description: description
        }
        dispatch(saveReport(uid, editReport))
    }

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
                }
            })
        } else {
            setName("")
            setUrl("")
            setImages([])
            setRate(0)
            setDate(moment().format('YYYY-MM-DD'))
            setPrice(0)
            setStation("")
            setCategory("")
            setDescription("")
        }
    }, [id])

    useEffect(() => {
        db.collection('categories').orderBy('order', 'asc').get()
        .then((snapshots) => {
            const list: Category[] = []
            snapshots.forEach((snapshot) => {
                const data = snapshot.data()
                if (data) {
                    list.push({
                        id: data.id,
                        name: data.name
                    })
                }
            })
            setCategories(list)
        })
    }, [])

    return (
        <div className="editpage-wrapin">
            <h2 className="text-headline">食レポ作成・編集</h2>
            <TextInput
                margin={""} width={"100%"} label={"店名・料理名等"} multiline={false}
                required={true} rows={1} value={name} type={"text"} variant={"outlined"}
                icon={<Restaurant />} onChange={inputName}
            />
            <div className={classes.itemsBox}>
                <div className={classes.itemsFlex}>
                    <TextInput
                        margin={""} width={"170px"} label={"日付"} multiline={false}
                        required={false} rows={1} value={date} type={"date"} variant={"standard"}
                        icon={""} onChange={inputDate}
                    />
                    <TextInput
                        margin={"auto"} width={"100px"} label={"費用(1人分)"} multiline={false}
                        required={false} rows={1} value={price} type={"number"} variant={"standard"}
                        icon={"¥"} onChange={inputPrice}
                    />
                </div>
                <div className={classes.itemsFlex}>
                    <TextInput
                        margin={""} width={"200px"} label={"近くの駅"} multiline={false}
                        required={false} rows={1} value={station} type={"text"} variant={"standard"}
                        icon={<Train />} onChange={inputStation}
                    />
                    <div className="margin-auto">
                        <SelectBox
                            label={"カテゴリー"} required={true} options={categories}
                            select={setCategory} value={category}
                        />
                    </div>
                </div>
            </div>
            <div>
                <InputLabel>評価</InputLabel>
                <Rating
                    name="rate-edit"
                    value={rate}
                    size="large"
                    max={5}
                    onChange={(e, newValue) => {
                        setRate(newValue)
                    }}
                />
            </div>
            <TextInput
                margin={"0 15px 15px"} width={"100%"} label={"ウェブサイトURL"} multiline={true}
                required={false} rows={0} value={url} type={"text"} variant={"outlined"}
                icon={<Language />} onChange={inputUrl}
            />
            <TextInput
                margin={"0 0 15px"} width={"100%"} label={"レビュー"} multiline={true}
                required={false} rows={0} value={description} type={"text"} variant={"outlined"}
                icon={""} onChange={inputDescription}
            />
            <div className="box-shadow">
                <ImageArea images={images} setImages={setImages} />
            </div>
            <SaveButton startIcon={<Save />} label={"保存"} onClick={handleSaveReport} />
        </div>
    )
}

export default ReportEdit
