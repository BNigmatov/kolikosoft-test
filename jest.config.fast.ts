import baseConfig from './jest.config';

type TransformerConfig = Record<string, unknown> & { isolationModules?: boolean; };

const findTsJestConfig = (jestConfig: typeof baseConfig): TransformerConfig | undefined => {
    const transform = jestConfig.transform;
    if (transform === undefined) {
        return;
    }
    const [, transformerData] = Object.values(transform)
        .filter(([transformer]) => transformer === 'ts-jest')?.[0] ?? [];

    if (typeof transformerData === 'string') {
        return {};
    }
    return transformerData;
};
/*
* 1 case is faster, but need extra packages: esbuild, esbuild-jest

*/
// 1st case: https://miyauchi.dev/posts/speeding-up-jest/
// transform: {
//     '^.+\\.tsx?$': 'esbuild-jest',
// },

// 2nd case: // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/isolatedModules
const tsjestConfig = findTsJestConfig(baseConfig);
if (tsjestConfig !== undefined) {
    tsjestConfig.isolationModules = true;
}

export default baseConfig;
