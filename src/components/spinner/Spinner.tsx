import React, { FC } from 'react';
import {CircularProgress, Typography} from "@material-ui/core";
import LoadingOverlay from "react-loading-overlay-ts";

type SpinnerProps = {
    children?: JSX.Element | JSX.Element[];
    className?: string;
    displayText?: string;
    isActive: boolean
};

const Spinner: FC<SpinnerProps> = ({ children, className, isActive, displayText = 'Loading...' }) => {
    return (
        <LoadingOverlay
            active={isActive}
            className={className}
            spinner={
                <CircularProgress
                    size={100}
                    thickness={2}
                />
            }
            text={<Typography variant="body1">{displayText}</Typography>}
        >
            {children}
        </LoadingOverlay>
    );
};

export default Spinner;