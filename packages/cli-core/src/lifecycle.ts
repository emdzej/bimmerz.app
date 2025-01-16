export type TerminationHandler = (reason: string) => void;

export function handleTerminate(callback: TerminationHandler) {
    let terminating = false;

    const handler = (reason: string) => {
        if (terminating) {
            return;
        }
        callback(reason);
    }

    process.on('SIGINT', handler);
    process.on('SIGTERM', handler);
    process.on('exit', handler);
}
