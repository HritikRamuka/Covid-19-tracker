import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import "./Infobox.css"
const InfoBox = ({title,cases,total,active,isRed,...props}) => {
    return (
        <div>
            <Card onClick={props.onClick} className={`infobox ${active&&"infobox--selected"}`}>
                <CardContent>
                    <Typography className="caseType_title">
                        <strong>{title}</strong>
                    </Typography>
                    <h2 className={`infobox_cases ${isRed &&"infobox--red"}`}>
                        {cases}
                        </h2>
                    <Typography className="total_cases">
                        {total}
                    </Typography>
                </CardContent>
            </Card>
            </div>
    )
}

export default InfoBox
