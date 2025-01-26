import { Link, Stack, Typography } from "@mui/material";
import { MikeItDoneIcon } from "../../icons";


export function Footer() {
    return (
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <Typography variant="body2" color="textSecondary">
                © 2025
            </Typography>
            <Link href="https://mikeitdone.pl" target="_blank" rel="noopener noreferrer">
                <MikeItDoneIcon sx={{
                    width: 64,
                    height: 64

                }} color="action" />
            </Link>
            <Typography variant="body2" color="textSecondary">
                If you like this tool, you can support me by&nbsp;
                <Link href="https://buymeacoffee.com/mikeitdone" target="_blank" rel="noopener noreferrer">

                    buying me a coffee
                </Link>
            </Typography>
        </Stack>
    )
}