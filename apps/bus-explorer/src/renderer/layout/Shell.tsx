import { MemoryRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Home } from "../views/Home";
import { Settings } from "../views/Settings";
import { AppShell, Burger } from '@mantine/core';
import { Statusbar, Navbar } from '../components';
import { Bus, Devices } from '../views';
import { About } from '../views/About';
export function Shell() {
    return (
        <AppShell navbar={{width: 66, breakpoint: 'sm'}}>
            <AppShell.Navbar p="sm">
                <Navbar />
            </AppShell.Navbar>
            <AppShell.Main>                
                <Outlet />
            </AppShell.Main>
            <AppShell.Footer>
                <Statusbar />
            </AppShell.Footer>
        </AppShell>
    )
}