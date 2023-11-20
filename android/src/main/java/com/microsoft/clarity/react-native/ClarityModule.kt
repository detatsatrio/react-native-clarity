package com.microsoft.clarity.reactnative

import com.facebook.react.bridge.*
import com.microsoft.clarity.Clarity
import com.microsoft.clarity.ClarityConfig
import com.microsoft.clarity.models.ApplicationFramework
import com.microsoft.clarity.models.LogLevel

class ClarityModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun initialize(
        projectId: String,
        userId: String?,
        logLevel: String,
        allowMeteredNetworkUsage: Boolean,
        enableWebViewCapture: Boolean,
        allowedDomains: ReadableArray,
        disableOnLowEndDevices: Boolean,
        promise: Promise
    ) {
        val allowedActivities = listOf<String>(); //not supported
        val disallowedActivities = listOf<String>(); //not supported
        val config = ClarityConfig(
            projectId,
            userId,
            LogLevel.valueOf(logLevel),
            allowMeteredNetworkUsage,
            enableWebViewCapture,
            readableArrayToList(allowedDomains),
            ApplicationFramework.ReactNative,
            allowedActivities,
            disallowedActivities,
            disableOnLowEndDevices
        )

        promise.resolve(Clarity.initialize(currentActivity, config))
    }

    @ReactMethod
    fun setCustomUserId(customUserId: String, promise: Promise) {
        promise.resolve(Clarity.setCustomUserId(customUserId))
    }

    @ReactMethod
    fun setCustomSessionId(customSessionId: String, promise: Promise) {
        promise.resolve(Clarity.setCustomSessionId(customSessionId))
    }

    @ReactMethod
    fun getCurrentSessionId(promise: Promise) {
        promise.resolve(Clarity.getCurrentSessionId())
    }

    @ReactMethod
    fun setCustomTag(key: String?, value: String?, promise: Promise) {
        promise.resolve(Clarity.setCustomTag(key, value))
    }

    @ReactMethod
    fun setCurrentScreenName(screenName: String?, promise: Promise) {
        promise.resolve(Clarity.setCurrentScreenName(screenName))
    }

    private fun readableArrayToList(arr: ReadableArray): List<String> {
        val ret = mutableListOf<String>()

        for (i in 0 until arr.size()) {
            ret.add(arr.getString(i))
        }

        return ret
    }

    companion object {
        const val NAME = "Clarity"
    }
}