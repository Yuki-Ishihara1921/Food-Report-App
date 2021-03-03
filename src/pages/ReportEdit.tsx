import React, { FC, useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reducks/store'
import { saveReport } from '../reducks/reports/operations'
import { Image, Category, EditReport } from '../reducks/reports/types'
import { ImageArea } from '../components/reports'
import { TextInput, SelectBox, ButtonClick } from '../components/UIkit'
import { ChangeEvent } from '../types'
import { db } from '../firebase'
import moment from 'moment'
import { makeStyles, Box, InputLabel } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { Restaurant, Room, Language, Save, Train } from '@material-ui/icons'

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
    const dispatch = useDispatch()
    const selector = useSelector((state: RootState) => state)
    const uid = selector.users.uid
    let id = window.location.pathname.split('/report/edit')[1]
    if (id !== "" && id !== undefined) {
        id = id.split('/')[1]
    }

    const [images, setImages] = useState<Image[]>([]),
          [name, setName] = useState<string>(""),
          [date, setDate] = useState<string>(moment().format('YYYY-MM-DD')),
          [price, setPrice] = useState<number>(0),
          [category, setCategory] = useState<string>(""),
          [place, setPlace] = useState<string>(""),
          [station, setStation] = useState<string>(""),
          [rate, setRate] = useState<number | null>(0),
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
            images: images,
            name: name,
            date: date,
            price: price,
            category: category,
            place: place,
            station: station,
            rate: rate,
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
                    setImages(data.images)
                    setName(data.name)
                    setDate(data.date)
                    setPrice(data.price)
                    setCategory(data.category)
                    setPlace(data.place)
                    setStation(data.station)
                    setRate(data.rate)
                    setUrl(data.url)
                    setDescription(data.description)
                }
            })
        } else {
            setImages([])
            setName("")
            setDate(moment().format('YYYY-MM-DD'))
            setPrice(0)
            setCategory("")
            setPlace("")
            setStation("")
            setRate(0)
            setUrl("")
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
            <Box className={classes.imagesBox}>
                <ImageArea images={images} setImages={setImages} />
            </Box>
            <Box className={classes.inputsBox}>
                <TextInput
                    icon={<Restaurant />} label={"店名・料理名等"} multiline={false}
                    required={true} rows={1} type={"text"} value={name}
                    variant={"outlined"} width={"100%"} onChange={inputName}
                />
                <TextInput
                    icon={""} label={"日付"} multiline={false}
                    required={false} rows={1} type={"date"} value={date}
                    variant={"standard"} width={"145px"} onChange={inputDate}
                />
                <TextInput
                    icon={"¥"} label={"費用(1人分)"} multiline={false}
                    required={false} rows={1} type={"number"} value={price}
                    variant={"standard"} width={"85px"} onChange={inputPrice}
                />
                <SelectBox
                    label={"カテゴリー"} required={true} options={categories}
                    value={category} select={setCategory}
                />
                <TextInput
                    icon={<Room />} label={"主な場所"} multiline={false}
                    required={false} rows={1} type={"text"} value={place}
                    variant={"standard"} width={""} onChange={inputPlace}
                />
                <TextInput
                    icon={<Train />} label={"近くの駅"} multiline={false}
                    required={false} rows={1} type={"text"} value={station}
                    variant={"standard"} width={""} onChange={inputStation}
                />
                <InputLabel>評価</InputLabel>
                <Rating
                    className={classes.rateBox}
                    max={5}
                    name="rate-edit"
                    size="medium"
                    value={rate}
                    onChange={(e, newValue) => {
                        setRate(newValue)
                    }}
                />
            </Box>
            <TextInput
                icon={<Language />} label={"ウェブサイトURL"} multiline={true}
                required={false} rows={0} type={"text"} value={url}
                variant={"outlined"} width={"100%"} onChange={inputUrl}
            />
            <TextInput
                icon={""}  label={"レビュー"} multiline={true}
                required={false} rows={0} type={"text"} value={description}
                variant={"outlined"} width={"100%"} onChange={inputDescription}
            />
            <ButtonClick
                color={"primary"} label={"保存"} startIcon={<Save />}
                onClick={handleSaveReport}
            />
        </section>
    )
}

export default ReportEdit
