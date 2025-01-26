import { arrayToHex } from "@bimmerz/core";
import { encodeVin, isValidVin } from "@bimmerz/vin";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField"
import Switch from "@mui/material/Switch";
import { useMemo, useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export type EncodeVinProps = {

}

export function EncodeVin(props: EncodeVinProps) {
  const [vin, setVin] = useState<string>('')
  const [vinError, setVinError] = useState<string>('')
  const [tunerPro, setTunerPro] = useState<boolean>(false);

  const handleVinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const normalizedVin = event.target.value.toUpperCase();
    setVin(normalizedVin);
    if (!isValidVin(normalizedVin)) {
      setVinError('VIN should be 17 characters long string');
    } else {
      setVinError('');
    }
  }

  const handleTunerProSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTunerPro(event.target.checked);
  };

  const encodedVin = useMemo(() => {
    if (isValidVin(vin)) {
      return arrayToHex(encodeVin(vin), tunerPro ? "\t" : " ");
    }
    return '';
  }, [vin, tunerPro])

  return (
    <Stack spacing={2}>
      <TextField
        value={vin}
        label="VIN"
        error={vinError !== ''}
        helperText={vinError || 'VIN should be 17 characters long string'}
        onChange={handleVinChange} />

      <FormControlLabel
        control={
          <Switch checked={tunerPro} onChange={handleTunerProSwitchChange} />
        }
        label="Use TunerPro format"

      />

      <TextField
        value={encodedVin}
        label="Encoded VIN"
        disabled
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">
              <IconButton 
                disabled={encodedVin === ''}
                onClick={() => navigator.clipboard.writeText(encodedVin)}>
                <ContentCopyIcon />
              </IconButton>
            </InputAdornment>
          }
        }}
        
      />
      
    </Stack>
  )
}