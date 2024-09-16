import * as tailwindcss_types_config from 'tailwindcss/types/config';

/**
 * Recast Tailwind Plugin
 *
 * This plugin processes Recast component definitions and usages to generate
 * a safelist of Tailwind CSS classes, ensuring that all necessary classes
 * are included in the final CSS output, even when not explicitly used in the markup.
 */
declare const _default: {
    handler: tailwindcss_types_config.PluginCreator;
    config?: Partial<tailwindcss_types_config.Config>;
};

export { _default as default };
