import { Box, Tabs, Tab, Alert } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import './App.css'
import { EncodeVin, DecodeVin, TabPanel } from './components';

function App() {
  const [value, setValue] = useState(0);
  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }
  return (
    <>
      <Alert severity="info">
        Use this tool to encode and decode BMW VINs to and from
        a binary format used to store VIN in MS4x ECUs.
      </Alert>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Encode VIN" />
          <Tab label="Decode VIN" />          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <EncodeVin />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DecodeVin />
      </TabPanel>
    </>
  )
}

export default App
