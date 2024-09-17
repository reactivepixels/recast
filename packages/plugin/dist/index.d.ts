import * as tailwindcss_types_config from 'tailwindcss/types/config';

/**
 * Recast Tailwind Plugin
 *
 * This plugin extends Tailwind CSS functionality to support Recast components
 * and provides an 'unset' variant for more flexible styling control.
 *
 * @param {Object} helpers - Tailwind plugin helper functions
 * @param {Function} helpers.addVariant - Function to add a new variant
 * @param {Function} helpers.config - Function to access and modify Tailwind config
 */
declare const _default: {
    handler: tailwindcss_types_config.PluginCreator;
    config?: Partial<tailwindcss_types_config.Config>;
};

export { _default as default };
