/**
 * 默认配置参数
 * production, 生产地主，如果不设置默认 http://excel-inc.acmr.com.cn
 * mock，mock代理地址，这个为必填参数，没有默认值，如果不写不起作用
 * @type {String}
 */
var typeString = "string",
	proxyjs;
proxyjs = function(cfg) {
	return new proxyjs.fn.init(cfg);
}
proxyjs.sysConfig = {
	production: "http://excel-inc.acmr.com.cn"
}
proxyjs.fn = proxyjs.prototype = {
	originalAjax: $.ajax,
	initProxy: false,
	init: function(cfg) {
		var config = {
			production: cfg.production || proxyjs.sysConfig.production,
			mock: cfg.mock
		}
		if (!config.mock || typeof config.mock !== typeString) {
			return;
		}
		if (!this.initProxy) {
			this.initProxy = true;
			this.startProxy(config);

		}
	},
	startProxy: function(cfg) {
		$.extend({
			ajax: function(orginalSetting) {
				var newUrl,
					copySetting = orginalSetting;
				if (copySetting.url && typeof copySetting.url === typeString) {
					newUrl = copySetting.url.replace(proxyjs.fn.buildReg(cfg.production), cfg.mock);
					copySetting.url = newUrl;
				}
				return proxyjs.fn.originalAjax(copySetting);
			}
		});
	},
	buildReg: function(original) {
		return new RegExp("^" + original);
	}
}
proxyjs.fn.init.prototype = proxyjs.prototype;