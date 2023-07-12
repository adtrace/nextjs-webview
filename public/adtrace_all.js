var AdTrace = {
    onCreate: function (adtraceConfig) {
        if (adtraceConfig && !adtraceConfig.getSdkPrefix()) {
            adtraceConfig.setSdkPrefix(this.getSdkPrefix());
        }
        this.adtraceConfig = adtraceConfig;
        if (AdTraceBridge) {
            AdTraceBridge.onCreate(JSON.stringify(adtraceConfig));
        }
    },

    getConfig: function () {
        return this.adtraceConfig;
    },

    trackEvent: function (adtraceEvent) {
        if (AdTraceBridge) {
            AdTraceBridge.trackEvent(JSON.stringify(adtraceEvent));
        }
    },

    trackAdRevenue: function(source, payload) {
        if (AdTraceBridge) {
            AdTraceBridge.trackAdRevenue(source, payload);
        }
    },

    onResume: function () {
        if (AdTraceBridge) {
            AdTraceBridge.onResume();
        }
    },

    onPause: function () {
        if (AdTraceBridge) {
            AdTraceBridge.onPause();
        }
    },

    setEnabled: function (enabled) {
        if (AdTraceBridge) {
            AdTraceBridge.setEnabled(enabled);
        }
    },

    isEnabled: function (callback) {
        if (!AdTraceBridge) {
            return undefined;
        }
        // supports legacy return with callback
        if (arguments.length === 1) {
            // with manual string call
            if (typeof callback === 'string' || callback instanceof String) {
                this.isEnabledCallbackName = callback;
            } else {
                // or save callback and call later
                this.isEnabledCallbackName = 'AdTrace.adtrace_isEnabledCallback';
                this.isEnabledCallbackFunction = callback;
            }
            AdTraceBridge.isEnabled(this.isEnabledCallbackName);
        } else {
            return AdTraceBridge.isEnabled();
        }
    },

    adtrace_isEnabledCallback: function (isEnabled) {
        if (AdTraceBridge && this.isEnabledCallbackFunction) {
            this.isEnabledCallbackFunction(isEnabled);
        }
    },

    appWillOpenUrl: function (url) {
        if (AdTraceBridge) {
            AdTraceBridge.appWillOpenUrl(url);
        }
    },

    setReferrer: function (referrer) {
        if (AdTraceBridge) {
            AdTraceBridge.setReferrer(referrer);
        }
    },

    setOfflineMode: function(isOffline) {
        if (AdTraceBridge) {
            AdTraceBridge.setOfflineMode(isOffline);
        }
    },

    sendFirstPackages: function() {
        if (AdTraceBridge) {
            AdTraceBridge.sendFirstPackages();
        }
    },

    addSessionCallbackParameter: function(key, value) {
        if (AdTraceBridge) {
            AdTraceBridge.addSessionCallbackParameter(key, value);
        }
    },

    addSessionPartnerParameter: function(key, value) {
        if (AdTraceBridge) {
            AdTraceBridge.addSessionPartnerParameter(key, value);
        }
    },

    removeSessionCallbackParameter: function(key) {
        if (AdTraceBridge) {
            AdTraceBridge.removeSessionCallbackParameter(key);
        }
    },

    removeSessionPartnerParameter: function(key) {
        if (AdTraceBridge) {
            AdTraceBridge.removeSessionPartnerParameter(key);
        }
    },

    resetSessionCallbackParameters: function() {
        if (AdTraceBridge) {
            AdTraceBridge.resetSessionCallbackParameters();
        }
    },

    resetSessionPartnerParameters: function() {
        if (AdTraceBridge) {
            AdTraceBridge.resetSessionPartnerParameters();
        }
    },

    setPushToken: function(token) {
        if (AdTraceBridge) {
            AdTraceBridge.setPushToken(token);
        }
    },

    gdprForgetMe: function() {
        if (AdTraceBridge) {
            AdTraceBridge.gdprForgetMe();
        }
    },

    disableThirdPartySharing: function() {
        if (AdTraceBridge) {
            AdTraceBridge.disableThirdPartySharing();
        }
    },

    trackThirdPartySharing: function(adtraceThirdPartySharing) {
        if (AdTraceBridge) {
            AdTraceBridge.trackThirdPartySharing(JSON.stringify(adtraceThirdPartySharing));
        }
    },

    trackMeasurementConsent: function(consentMeasurement) {
        if (AdTraceBridge) {
            AdTraceBridge.trackMeasurementConsent(consentMeasurement);
        }
    },

    getGoogleAdId: function (callback) {
        if (AdTraceBridge) {
            if (typeof callback === 'string' || callback instanceof String) {
                this.getGoogleAdIdCallbackName = callback;
            } else {
                this.getGoogleAdIdCallbackName = 'AdTrace.adtrace_getGoogleAdIdCallback';
                this.getGoogleAdIdCallbackFunction = callback;
            }
            AdTraceBridge.getGoogleAdId(this.getGoogleAdIdCallbackName);
        }
    },

    adtrace_getGoogleAdIdCallback: function (googleAdId) {
        if (AdTraceBridge && this.getGoogleAdIdCallbackFunction) {
            this.getGoogleAdIdCallbackFunction(googleAdId);
        }
    },

    getAmazonAdId: function (callback) {
        if (AdTraceBridge) {
            return AdTraceBridge.getAmazonAdId();
        } else {
            return undefined;
        }
    },

    getAdid: function () {
        if (AdTraceBridge) {
            return AdTraceBridge.getAdid();
        } else {
            return undefined;
        }
    },

    getAttribution: function (callback) {
        if (AdTraceBridge) {
            AdTraceBridge.getAttribution(callback);
        }
    },

    getSdkVersion: function () {
        if (AdTraceBridge) {
             return this.getSdkPrefix() + '@' + AdTraceBridge.getSdkVersion();
        } else {
            return undefined;
        }
    },

    getSdkPrefix: function () {
        if (this.adtraceConfig) {
            return this.adtraceConfig.getSdkPrefix();
        } else {
            return 'web-bridge2.4.1';
        }
    },

    teardown: function() {
        if (AdTraceBridge) {
            AdTraceBridge.teardown();
        }
        this.adtraceConfig = undefined;
        this.isEnabledCallbackName = undefined;
        this.isEnabledCallbackFunction = undefined;
        this.getGoogleAdIdCallbackName = undefined;
        this.getGoogleAdIdCallbackFunction = undefined;
    },
};

function AdTraceConfig(appToken, environment, legacy) {
    this.allowSuppressLogLevel = null;

    if (arguments.length === 2) {
        // new format does not require bridge as first parameter
        this.appToken = appToken;
        this.environment = environment;
    } else if (arguments.length === 3) {
        // new format with allowSuppressLogLevel
        if (typeof(legacy) == typeof(true)) {
            this.appToken = appToken;
            this.environment = environment;
            this.allowSuppressLogLevel = legacy;
        } else {
            // old format with first argument being the bridge instance
            this.bridge = appToken;
            this.appToken = environment;
            this.environment = legacy;
        }
    }

    this.eventBufferingEnabled = null;
    this.sendInBackground = null;
    this.logLevel = null;
    this.sdkPrefix = null;
    this.processName = null;
    this.defaultTracker = null;
    this.externalDeviceId = null;
    this.attributionCallbackName = null;
    this.attributionCallbackFunction = null;
    this.deviceKnown = null;
    this.needsCost = null;
    this.eventSuccessCallbackName = null;
    this.eventSuccessCallbackFunction = null;
    this.eventFailureCallbackName = null;
    this.eventFailureCallbackFunction = null;
    this.sessionSuccessCallbackName = null;
    this.sessionSuccessCallbackFunction = null;
    this.sessionFailureCallbackName = null;
    this.sessionFailureCallbackFunction = null;
    this.openDeferredDeeplink = null;
    this.deferredDeeplinkCallbackName = null;
    this.deferredDeeplinkCallbackFunction = null;
    this.delayStart = null;
    this.userAgent = null;
    this.secretId = null;
    this.info1 = null;
    this.info2 = null;
    this.info3 = null;
    this.info4 = null;
    this.fbPixelDefaultEventToken = null;
    this.fbPixelMapping = [];
    this.urlStrategy = null;
    this.preinstallTrackingEnabled = null;
    this.preinstallFilePath = null;
    this.playStoreKidsAppEnabled = null;
    this.coppaCompliantEnabled = null;
}

AdTraceConfig.EnvironmentSandbox = 'sandbox';
AdTraceConfig.EnvironmentProduction = 'production';

AdTraceConfig.UrlStrategyIndia = "url_strategy_india";
AdTraceConfig.UrlStrategyChina = "url_strategy_china";
AdTraceConfig.DataResidencyEU = "data_residency_eu";
AdTraceConfig.DataResidencyTR = "data_residency_tr";
AdTraceConfig.DataResidencyUS = "data_residency_us";

AdTraceConfig.LogLevelVerbose = 'VERBOSE',
AdTraceConfig.LogLevelDebug = 'DEBUG',
AdTraceConfig.LogLevelInfo = 'INFO',
AdTraceConfig.LogLevelWarn = 'WARN',
AdTraceConfig.LogLevelError = 'ERROR',
AdTraceConfig.LogLevelAssert = 'ASSERT',
AdTraceConfig.LogLevelSuppress = 'SUPPRESS',

AdTraceConfig.prototype.getBridge = function() {
    return this.bridge;
};

AdTraceConfig.prototype.setEventBufferingEnabled = function(isEnabled) {
    this.eventBufferingEnabled = isEnabled;
};

AdTraceConfig.prototype.setSendInBackground = function(isEnabled) {
    this.sendInBackground = isEnabled;
};

AdTraceConfig.prototype.setLogLevel = function(logLevel) {
    this.logLevel = logLevel;
};

AdTraceConfig.prototype.getSdkPrefix = function() {
    return this.sdkPrefix;
};

AdTraceConfig.prototype.setSdkPrefix = function(sdkPrefix) {
    this.sdkPrefix = sdkPrefix;
};

AdTraceConfig.prototype.setProcessName = function(processName) {
    this.processName = processName;
};

AdTraceConfig.prototype.setDefaultTracker = function(defaultTracker) {
    this.defaultTracker = defaultTracker;
};

AdTraceConfig.prototype.setExternalDeviceId = function(externalDeviceId) {
    this.externalDeviceId = externalDeviceId;
};

AdTraceConfig.prototype.setAttributionCallback = function(callback) {
    if (typeof callback === 'string' || callback instanceof String) {
        this.attributionCallbackName = callback;
    } else {
        this.attributionCallbackName = 'AdTrace.getConfig().adtrace_attributionCallback';
        this.attributionCallbackFunction = callback;
    }
};

AdTraceConfig.prototype.adtrace_attributionCallback = function(attribution) {
    if (this.attributionCallbackFunction) {
        this.attributionCallbackFunction(attribution);
    }
};

AdTraceConfig.prototype.setDeviceKnown = function(deviceKnown) {
    this.deviceKnown = deviceKnown;
};

AdTraceConfig.prototype.setNeedsCost = function(needsCost) {
    this.needsCost = needsCost;
};

AdTraceConfig.prototype.setEventSuccessCallback = function(callback) {
    if (typeof callback === 'string' || callback instanceof String) {
        this.eventSuccessCallbackName = callback;
    } else {
        this.eventSuccessCallbackName = 'AdTrace.getConfig().adtrace_eventSuccessCallback';
        this.eventSuccessCallbackFunction = callback;
    }
};

AdTraceConfig.prototype.adtrace_eventSuccessCallback = function(eventSuccess) {
    if (this.eventSuccessCallbackFunction) {
        this.eventSuccessCallbackFunction(eventSuccess);
    }
};

AdTraceConfig.prototype.setEventFailureCallback = function(callback) {
    if (typeof callback === 'string' || callback instanceof String) {
        this.eventFailureCallbackName = callback;
    } else {
        this.eventFailureCallbackName = 'AdTrace.getConfig().adtrace_eventFailureCallback';
        this.eventFailureCallbackFunction = callback;
    }
};

AdTraceConfig.prototype.adtrace_eventFailureCallback = function(eventFailure) {
    if (this.eventFailureCallbackFunction) {
        this.eventFailureCallbackFunction(eventFailure);
    }
};

AdTraceConfig.prototype.setSessionSuccessCallback = function(callback) {
    if (typeof callback === 'string' || callback instanceof String) {
        this.sessionSuccessCallbackName = callback;
    } else {
        this.sessionSuccessCallbackName = 'AdTrace.getConfig().adtrace_sessionSuccessCallback';
        this.sessionSuccessCallbackFunction = callback;
    }
};

AdTraceConfig.prototype.adtrace_sessionSuccessCallback = function(sessionSuccess) {
    if (this.sessionSuccessCallbackFunction) {
        this.sessionSuccessCallbackFunction(sessionSuccess);
    }
};

AdTraceConfig.prototype.setSessionFailureCallback = function(callback) {
    if (typeof callback === 'string' || callback instanceof String) {
        this.sessionFailureCallbackName = callback;
    } else {
        this.sessionFailureCallbackName = 'AdTrace.getConfig().adtrace_sessionFailureCallback';
        this.sessionFailureCallbackFunction = callback;
    }
};

AdTraceConfig.prototype.adtrace_sessionFailureCallback = function(sessionFailure) {
    if (this.sessionFailureCallbackFunction) {
        this.sessionFailureCallbackFunction(sessionFailure);
    }
};

AdTraceConfig.prototype.setOpenDeferredDeeplink = function(shouldOpen) {
    this.openDeferredDeeplink = shouldOpen;
};

AdTraceConfig.prototype.setDeferredDeeplinkCallback = function(callback) {
    if (typeof callback === 'string' || callback instanceof String) {
        this.deferredDeeplinkCallbackName = callback;
    } else {
        this.deferredDeeplinkCallbackName = 'AdTrace.getConfig().adtrace_deferredDeeplinkCallback';
        this.deferredDeeplinkCallbackFunction = callback;
    }
};

AdTraceConfig.prototype.adtrace_deferredDeeplinkCallback = function(deeplink) {
    if (this.deferredDeeplinkCallbackFunction) {
        this.deferredDeeplinkCallbackFunction(deeplink);
    }
};

AdTraceConfig.prototype.setDelayStart = function(delayStart) {
    this.delayStart = delayStart;
};

AdTraceConfig.prototype.setUserAgent = function(userAgent) {
    this.userAgent = userAgent;
};

AdTraceConfig.prototype.setAppSecret = function(secretId, info1, info2, info3, info4) {
    this.secretId = secretId;
    this.info1 = info1;
    this.info2 = info2;
    this.info3 = info3;
    this.info4 = info4;
};

AdTraceConfig.prototype.setReadMobileEquipmentIdentity = function(readMobileEquipmentIdentity) {};

AdTraceConfig.prototype.setFbPixelDefaultEventToken = function(fbPixelDefaultEventToken) {
    this.fbPixelDefaultEventToken = fbPixelDefaultEventToken;
};

AdTraceConfig.prototype.addFbPixelMapping = function(fbEventNameKey, adtrcEventTokenValue) {
    this.fbPixelMapping.push(fbEventNameKey);
    this.fbPixelMapping.push(adtrcEventTokenValue);
};

AdTraceConfig.prototype.setUrlStrategy = function(urlStrategy) {
    this.urlStrategy = urlStrategy;
};

AdTraceConfig.prototype.setPreinstallTrackingEnabled = function(preinstallTrackingEnabled) {
    this.preinstallTrackingEnabled = preinstallTrackingEnabled;
};

AdTraceConfig.prototype.setPreinstallFilePath = function(preinstallFilePath) {
    this.preinstallFilePath = preinstallFilePath;
};
AdTraceConfig.prototype.setPlayStoreKidsAppEnabled = function(isEnabled) {
    this.playStoreKidsAppEnabled = isEnabled;
};

AdTraceConfig.prototype.setCoppaCompliantEnabled = function(isEnabled) {
    this.coppaCompliantEnabled = isEnabled;
};


function AdTraceEvent(eventToken) {
    this.eventToken = eventToken;
    this.revenue = null;
    this.currency = null;
    this.callbackParameters = [];
    this.eventParameters = [];
    this.orderId = null;
    this.callbackId = null;
}

AdTraceEvent.prototype.setRevenue = function(revenue, currency) {
    this.revenue = revenue;
    this.currency = currency;
};

AdTraceEvent.prototype.addCallbackParameter = function(key, value) {
    this.callbackParameters.push(key);
    this.callbackParameters.push(value);
};

AdTraceEvent.prototype.addEventParameter = function(key, value) {
    this.eventParameters.push(key);
    this.eventParameters.push(value);
};

AdTraceEvent.prototype.setOrderId = function(orderId) {
    this.orderId = orderId;
};

AdTraceEvent.prototype.setCallbackId = function(callbackId) {
    this.callbackId = callbackId;
};


function AdTraceThirdPartySharing(isEnabled) {
    this.isEnabled = isEnabled;
    this.granularOptions = [];
    this.partnerSharingSettings = [];
}

AdTraceThirdPartySharing.prototype.addGranularOption = function(partnerName, key, value) {
    this.granularOptions.push(partnerName);
    this.granularOptions.push(key);
    this.granularOptions.push(value);
};

AdTraceThirdPartySharing.prototype.addPartnerSharingSetting = function(partnerName, key, value) {
    this.partnerSharingSettings.push(partnerName);
    this.partnerSharingSettings.push(key);
    this.partnerSharingSettings.push(value);
};
