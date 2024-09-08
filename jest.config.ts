import baseConfig from './jest.config.base';

const collectCoverageFrom = baseConfig.collectCoverageFrom ?? [];
export default {
    ...baseConfig,
    collectCoverageFrom: [
        ...collectCoverageFrom,
        // exclude ts types definition from coverage
        '!src/types/common.type.ts',
        '!src/types/fiscalregister.type.ts',
        '!src/types/db.type.ts',
        '!src/types/unifiedcatalog.type.ts',
        '!src/types/tshelper.type.ts',
        '!src/services/smartone/lib/types.ts',
        '!src/services/regos/lib/types.ts',
        '!src/providers/db/mssql/mssql.type.ts',
        '!src/services/tasnif/lib/types.ts',
    ],
};
