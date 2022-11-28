import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Grid,
    makeStyles,
    Typography } from "@material-ui/core";
import { ExpandMoreOutlined } from "@material-ui/icons";
import React, { FC } from "react";

import type { Setting } from "./settings";
import { settings } from "./settings";

const useAccountSettingStyles = makeStyles(() => {
    return {
        accordionSummary: {
            minHeight: "90px"
        }
    };
});

//@todo - create a wrapper around account settings so stateful logic regarding api calls + loader + alert can be reused
const AccountSetting: FC<Record<string, never>> = () => {
    const classes = useAccountSettingStyles();

    return (
        <Box
            ml={2}
            mt={10}
        >
            <Typography variant="h5">Account Settings</Typography>
            <Box
                mt={1}
            />
            <Grid container>
                <Grid
                    item
                    xs={4}
                >
                    {settings.map((setting: Setting) => {
                        return (
                            <Accordion
                                key={setting.id}
                            >
                                <AccordionSummary
                                    className={classes.accordionSummary}
                                    expandIcon={<ExpandMoreOutlined />}
                                >
                                    <Typography variant="body1"><strong>{setting.content}</strong></Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <setting.Component />
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
                </Grid>
            </Grid>
        </Box>
    );
};

export default AccountSetting;