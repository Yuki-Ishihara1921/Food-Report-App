import React, { FC, useState, useCallback, useEffect } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reducks/store'
import { saveReport } from '../reducks/reports/operations'
import { Image, Category, EditReport } from '../reducks/reports/types'
import { makeStyles, InputLabel } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { Restaurant, Room, Language, Save, Train } from '@material-ui/icons'
import { ImageArea } from '../components/reports'
import { TextInput, SelectBox, ButtonClick } from '../components/UIkit'
import { ChangeEvent } from '../types'
import { db } from '../firebase'

const useStyles = makeStyles({
    imagesBox: {
        margin: '1rem 0',
        boxShadow: '0px 0px 5px 0px gray'
    },
    inputsBox: {
        margin: '1rem 0'
    },
    rateBox: {
        padding: 5,
        boxShadow: '0px 2px 0px -1px gray',
    }
})

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
          [place, setPlace] = useState<string>(""),
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

    const inputPlace = useCallback((e: ChangeEvent) => {
        setPlace(e.target.value)
    }, [setPlace])

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
            place: place,
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
                    setPlace(data.place)
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
            setPlace("")
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
        <section className="editPage">
            <h2 className="text-headline">食レポ作成・編集</h2>
            <div className={classes.imagesBox}>
                <ImageArea images={images} setImages={setImages} />
            </div>
            <div className={classes.inputsBox}>
                <TextInput
                    width={"100%"} label={"店名・料理名等"} multiline={false}
                    required={true} rows={1} value={name} type={"text"}
                    variant={"outlined"} icon={<Restaurant />} onChange={inputName}
                />
                <div>
                <TextInput
                    width={"145px"} label={"日付"} multiline={false}
                    required={false} rows={1} value={date} type={"date"}
                    variant={"standard"} icon={""} onChange={inputDate}
                />
                <TextInput
                    width={"85px"} label={"費用(1人分)"} multiline={false}
                    required={false} rows={1} value={price} type={"number"}
                    variant={"standard"} icon={"¥"} onChange={inputPrice}
                />
                <SelectBox
                    label={"カテゴリー"} required={true} options={categories}
                    value={category} select={setCategory}
                />
                <TextInput
                    width={""} label={"主な場所"} multiline={false}
                    required={false} rows={1} value={place} type={"text"}
                    variant={"standard"} icon={<Room />} onChange={inputPlace}
                />
                <TextInput
                    width={""} label={"近くの駅"} multiline={false}
                    required={false} rows={1} value={station} type={"text"}
                    variant={"standard"} icon={<Train />} onChange={inputStation}
                />
                <InputLabel>評価</InputLabel>
                <Rating
                    className={classes.rateBox}
                    name="rate-edit"
                    value={rate}
                    size="medium"
                    max={5}
                    onChange={(e, newValue) => {
                        setRate(newValue)
                    }}
                />
                </div>
            </div>
            <TextInput
                width={"100%"} label={"ウェブサイトURL"} multiline={true}
                required={false} rows={0} value={url} type={"text"}
                variant={"outlined"} icon={<Language />} onChange={inputUrl}
            />
            <TextInput
                width={"100%"} label={"レビュー"} multiline={true}
                required={false} rows={0} value={description} type={"text"}
                variant={"outlined"} icon={""} onChange={inputDescription}
            />
            <ButtonClick
                startIcon={<Save />} color={"primary"}
                label={"保存"} onClick={handleSaveReport}
            />
        </section>
    )
}

export default ReportEdit
