import { arrayToHex, hexToArray } from "@bimmerz/core";
import { decodeVin, encodeVin, isValidVin } from "@bimmerz/vin";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField"
import Switch from "@mui/material/Switch";
import { useCallback, useMemo, useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export type DecodeVinProps = {

}

export function DecodeVin(props: DecodeVinProps) {
  const [encodedVin, setEncodedVin] = useState<string>('')
  const [vinError, setVinError] = useState<string>('')
  const [tunerPro, setTunerPro] = useState<boolean>(false);

  const handleEncodedVinChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const normalised = event.target.value.toUpperCase();
    setEncodedVin(normalised);
    const hex = normalised.split(tunerPro ? "\t" : " ");
    if (hex.length != 13) {
      setVinError('Encoded VIN should be 13 bytes long');      
    } else {
      setVinError('');
    }
  }, [tunerPro])

  const handleTunerProSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTunerPro(event.target.checked);
  };

  const vin = useMemo(() => {
    if (encodedVin) {
      try {
        setVinError('');
        return decodeVin(hexToArray(encodedVin, tunerPro ? "\t" : " "));        
      } catch (error) {
        setVinError('Invalid encoded VIN');
        return '';
      }
    }
    return '';
  }, [encodedVin, tunerPro])

  return (
    <Stack spacing={2}>
      <TextField
        value={encodedVin}
        label="Encoded VIN"
        error={vinError !== ''}
        helperText={vinError || 'Encoed VIN should be in hex format'}
        onChange={handleEncodedVinChange} />

      <FormControlLabel
        control={
          <Switch checked={tunerPro} onChange={handleTunerProSwitchChange} />
        }
        label="Use TunerPro format"

      />

      <TextField
        value={vin}
        label="VIN"
        disabled
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">
              <IconButton 
                disabled={vin === ''}
                onClick={() => navigator.clipboard.writeText(vin)}>
                <ContentCopyIcon />
              </IconButton>
            </InputAdornment>
          }
        }}
        
      />
      
    </Stack>
  )
}