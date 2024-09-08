import pino from 'pino';

interface Config {
    name?: string;
    level?: Parameters<typeof pino>[0]['level'];
    pretty?: boolean;
    file?: {
        destination: string;
    },
}

const DEF_CONFIG = {
    level: 'info',
    pretty: false,
    file: {
        destination: '',
    },
} satisfies Config;

export default (config: Config = DEF_CONFIG) => {
    const { pretty, level, file: { destination } } = { ...DEF_CONFIG, ...config };
    const targets = [];
    const baseOptions: Record<string, unknown> = { destination: 1 };
    let baseTransport = 'pino/file';
    if (pretty) {
        baseTransport = 'pino-pretty';
        // use `npx pino-pretty --help` to view another options
        baseOptions['translateTime'] = 'SYS:standard';
    }
    targets.push({ target: baseTransport, level, options: baseOptions });
    if (destination) {
        // * If log file will be deleted for some reason - no error, no data
        targets.push({ target: 'pino/file', options: { destination, mkdir: true } });
    }
    const transport = pino.transport({ targets });
    return pino(transport);
};
