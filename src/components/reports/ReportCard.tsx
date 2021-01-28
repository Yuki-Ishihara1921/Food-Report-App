import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../reducks/store/store'
import { deleteReport } from '../../reducks/reports/operations'
import { Image } from '../../reducks/reports/types'
import { push } from 'connected-react-router'
import NoImage from '../../assets/img/no_image.png'
import { makeStyles, Card, CardContent, CardMedia, Typography, Menu, MenuItem, IconButton } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { MoreVert, Edit, Delete } from '@material-ui/icons'

type Props = {
    id: string
    name: string
    images: Image[]
    rate: number | null
}

const useStyles = makeStyles((theme) => ({
    root: {
        border: '5px solid lightsalmon',
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 10px)',
            margin: '0 10px 30px'
        },
        [theme.breakpoints.up('sm')]: {
            width: 'calc(50% - 50px)',
            margin: 20
        }
    },
    media: {
        height: '0',
        paddingTop: '70%',
        cursor: 'pointer'
    },
    reportName: {
        display: '-webkit-box',
        height: 10,
        padding: 10,
        fontSize: 18,
        lineHeight: '20px',
        overflow: 'hidden',
        boxOrient: 'vertical',
        lineClamp: 1,
    }
}))

const ReportCard: FC<Props> = ({id, name, images, rate}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state: RootState) => state)
    const uid = selector.users.uid
    const cardImages = (images.length > 0) ? images[0].path : NoImage

    const [anchorEl, setAnchorEl] = useState(null)

    const handleOpen = (e: any) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={cardImages}
                title="詳細"
                onClick={() => dispatch(push('/reports/' + id))}
            />
            <CardContent>
                <Typography className={classes.reportName} component="h1">
                    {name}
                </Typography>
            </CardContent>
            <div className="display-flex">
                <Rating
                    name="read-rating"
                    size={"large"}
                    style={{margin: 'auto'}}
                    readOnly
                    value={rate}
                />
                <div className="ml-auto">
                    <IconButton onClick={handleOpen}>
                        <MoreVert />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem
                            onClick={() => {
                                dispatch(push('report/edit/' + id))
                                handleClose()
                            }}
                        >
                            {<Edit />}編集する
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                dispatch(deleteReport(uid, id))
                                handleClose()
                            }}
                        >
                            {<Delete />}削除する
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </Card>
    )
}

export default ReportCard
