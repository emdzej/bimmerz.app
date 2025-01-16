import { Stack } from "@mantine/core";
import { ActionIcon } from '@mantine/core';
import { IconEngine, IconInfoCircle, IconSettings, IconTopologyBus } from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";

export function Navbar() {
    const navigate = useNavigate();
    return (
        <Stack  
            align="flex-start"
            justify="space-between"
            h="100%"
            
        >
            <Stack gap="md">
                <ActionIcon size="xl" variant="filled" aria-label="settings"
                    onClick={() => navigate('/bus')}
                >
                    <IconTopologyBus />
                </ActionIcon>
                <ActionIcon size="xl" variant="filled" aria-label="settings"
                    onClick={() => navigate('/devices')}
                >
                    <IconEngine />
                </ActionIcon>                
            </Stack>            
            <Stack gap="md">
                <ActionIcon size="xl" variant="filled" aria-label="settings"
                    onClick={() => navigate('/settings')}
                >
                    <IconSettings />
                </ActionIcon>
                <ActionIcon size="xl" variant="filled" aria-label="settings"
                    onClick={() => navigate('/about')}
                >
                    <IconInfoCircle />
                </ActionIcon>
            </Stack>
        </Stack>
    )
}