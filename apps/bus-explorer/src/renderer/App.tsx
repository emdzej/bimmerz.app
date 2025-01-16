import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { Shell } from './layout/Shell';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Bus, Devices, Home, Settings } from './views';
import { About } from './views/About';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App() {
  return (
    <MantineProvider theme={theme}>
              <Router>
                    <Routes>
                        <Route path="/" element={<Shell />}>
                          <Route index element={<Home />} />
                          <Route path="/bus" element={<Bus />} />
                          <Route path="/devices" element={<Devices />} />
                          <Route path="/settings" element={<Settings />} />
                          <Route path="/about" element={<About />} />
                        </Route>  
                    </Routes>
                </Router>
    </MantineProvider>
  );
}
