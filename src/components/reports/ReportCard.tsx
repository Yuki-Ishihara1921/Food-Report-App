import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { Image } from '../../reducks/reports/types'
import { makeStyles, Card, CardContent, CardMedia, Typography, Divider } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { Room } from '@material-ui/icons'
import NoImage from '../../assets/img/no_image.png'

type Props = {
    id: string
    name: string
    images: Image[]
    place: string
    rate: number | null
}

const useStyles = makeStyles((theme) => ({
    root: {
        border: '10px solid lightsalmon',
        boxShadow: '0px 2px 5px 0px',
        borderRadius: 20,
        background: 'floralwhite',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            width: '75%',
            margin: '1rem auto'
        },
        [theme.breakpoints.up('sm')]: {
            width: 'calc(50% - 50px)',
            margin: 15
        }
    },
    media: {
        height: '0',
        paddingTop: '70%'
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: 5
        },
        [theme.breakpoints.up('sm')]: {
            padding: 10
        }
    },
    reportName: {
        display: '-webkit-box',
        width: '100%',
        padding: 10,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: '20px',
        overflow: 'hidden',
        boxOrient: 'vertical',
        lineClamp: 1
    },
    icon: {
        color: 'green'
    }
}))

const ReportCard: FC<Props> = ({id, name, images, place, rate}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const cardImages = (images.length > 0) ? images[0].path : NoImage    

    return (
        <Card className={classes.root} onClick={() => dispatch(push('/reports/' + id))}>
            <CardContent className={classes.content}>
                <Typography className={classes.reportName} variant="h1" color="primary">
                    {name}
                </Typography>
            </CardContent>
            <CardMedia
                className={classes.media}
                image={cardImages}
                title="詳細"
            />
            <CardContent className={classes.content}>
                <Room className={classes.icon} />
                <Typography component="h6">
                    {place}
                </Typography>
            </CardContent>
            <Divider />
            <Rating
                name="rating-readonly"
                size={"large"}
                style={{margin: 'auto'}}
                readOnly
                value={rate}
            />
        </Card>
    )
}

export default ReportCard
