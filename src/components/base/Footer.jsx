import { Paper, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Paper elevation={4} square className="py-5 flex justify-center">
            <Typography variant="body2">
                Copyright @ 2024 AhmedRaza
            </Typography>
        </Paper>
    )
}