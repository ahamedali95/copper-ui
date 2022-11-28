import { CircularProgress, Typography } from "@material-ui/core";
import React, { FC } from "react";
import LoadingOverlay from "react-loading-overlay-ts";

type SpinnerProps = {
    children?: JSX.Element | JSX.Element[];
    className?: string;
    displayText?: string;
    isActive: boolean
};

const Spinner: FC<SpinnerProps> = ({ children, className, isActive, displayText = "Loading..." }) => {
    return (
        <LoadingOverlay
            spinner={(
                <CircularProgress
                    size={100}
                    thickness={2}
                />
            )}
            text={(
                <Typography variant="body1">{displayText}</Typography>
            )}
            active={isActive}
            className={className}
        >
            {children}
        </LoadingOverlay>
    );
};

export default Spinner;