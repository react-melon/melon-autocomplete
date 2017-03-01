/**
 * @file travis karma
 * @author cxtom <cxtom2008@gmail.com>
 */

const karmaConfig = require('./karma.conf.js');

module.exports = function (config) {

    config.set(
        Object.assign(
            {},
            karmaConfig,
            {
                customLaunchers: {
                    ChromeTravis: {
                        base: 'Chrome',
                        flags: ['--no-sandbox']
                    }
                },
                browsers: ['ChromeTravis']
            }
        )
    );

};
