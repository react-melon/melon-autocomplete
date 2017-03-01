/**
 * @file 本地 karma 测试配置
 * @author cxtom <cxtom2008@gmail.com>
 */

const karmaConfig = require('./karma.conf.js');

module.exports = function (config) {
    config.set(karmaConfig);
};
