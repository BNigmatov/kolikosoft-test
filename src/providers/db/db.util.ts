export function constToValue(value: unknown): unknown {
    if (typeof value !== 'string') {
        return value;
    }

    let lValue: unknown = value;
    switch (value.toLowerCase()) {
        case 'today':
            lValue = new Date();
            break;
        default:
            break;
    }
    return lValue;
}
