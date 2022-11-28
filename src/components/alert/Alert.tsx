import React, { FC } from 'react';
import {ResponseError} from "../../api/types";
import {Typography} from "@material-ui/core";
import { Alert as MuiAlert } from "@material-ui/lab";

type AlertProps = {
    errors: ResponseError[];
};

const Alert: FC<AlertProps> = ({ errors }) => {
    return (
        <MuiAlert severity="error" style={{ width: "100%"}}>
            {
                errors.map((error: ResponseError): JSX.Element => {
                    return <Typography key={error.title} variant="body1">{error.title}</Typography>
                })
            }
        </MuiAlert>
    );
};

export default Alert;