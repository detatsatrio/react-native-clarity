import { NativeModules, Platform } from 'react-native';
const LINKING_ERROR = `The package 'react-native-clarity' doesn't seem to be linked. Make sure: \n\n` +
// Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) + TODO: add back when iOS is supported.
'- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const Clarity = NativeModules.Clarity;
const SupportedPlatforms = ['android'];

/**
 * The configuration that will be used to customize the Clarity behaviour.
 *
 * @param userId        [OPTIONAL default = null] A custom identifier for the current user. If passed as null, the user id
 *                      will be auto generated. The user id in general is sticky across sessions.
 *                      The provided user id must follow these conditions:
 *                          1. Cannot be an empty string.
 *                          2. Should be base36 and smaller than "1Z141Z4".
 * @param logLevel      [OPTIONAL default = LogLevel.None] The level of logging to show in the device logcat stream.
 * @param allowMeteredNetworkUsage  [OPTIONAL default = false] Allows uploading session data to the servers on device metered network.
 * @param enableWebViewCapture    [OPTIONAL default = true] Allows Clarity to capture the web views DOM content.
 * @param allowedDomains    [OPTIONAL default = ["*"]] The whitelisted domains to allow Clarity to capture their DOM content.
 *                          If it contains "*" as an element, all domains will be captured.
 * @param disableOnLowEndDevices [OPTIONAL default = false] Disable Clarity on low-end devices.
 */

/**
 * The level of logging to show in the device logcat stream.
 */
export let LogLevel = /*#__PURE__*/function (LogLevel) {
  LogLevel["Verbose"] = "Verbose";
  LogLevel["Debug"] = "Debug";
  LogLevel["Info"] = "Info";
  LogLevel["Warning"] = "Warning";
  LogLevel["Error"] = "Error";
  LogLevel["None"] = "None";
  return LogLevel;
}({});

/**
 * Initializes the Clarity SDK if the API level is supported.
 * @param projectId     [REQUIRED] The Clarity project id to send data to.
 * @param config   [OPTIONAL] The clarity config, if not provided default values are used.
*/
export function initialize(projectId, config) {
  if (typeof projectId !== "string" || !(typeof config === "object" || typeof config === "undefined")) {
    throw Error("Invalid Clarity initialization arguments. Please check the docs for assitance.");
  }

  // applying default values
  let {
    userId = null,
    logLevel = LogLevel.None,
    allowMeteredNetworkUsage = false,
    enableWebViewCapture = true,
    allowedDomains = ["*"],
    disableOnLowEndDevices = false
  } = config ?? {};
  if (!SupportedPlatforms.includes(Platform.OS)) {
    console.warn("Clarity supports " + SupportedPlatforms.join(", ") + " only for now.");
    return;
  }
  if (Clarity === null) {
    console.error("Clarity did not initialize properly.", LINKING_ERROR);
    return;
  }
  Clarity.initialize(projectId, userId, logLevel, allowMeteredNetworkUsage, enableWebViewCapture, allowedDomains, disableOnLowEndDevices);
}

/**
 * Sets a custom user id that can be used to identify the user. It has less
 * restrictions than the userId parameter. You can pass any string and
 * you can filter on it on the dashboard side. If you need the most efficient
 * filtering on the dashboard, use the userId parameter if possible.
 * <p>
 * Note: custom user id cannot be null or empty, or consists only of whitespaces.
 * </p>
 * @param customUserId   The custom user id to set.
 */
export function setCustomUserId(customUserId) {
  if (!SupportedPlatforms.includes(Platform.OS)) {
    console.warn("Clarity supports " + SupportedPlatforms.join(", ") + " only for now.");
    return;
  }
  if (Clarity === null) {
    console.error("Clarity did not initialize properly.", LINKING_ERROR);
    return;
  }
  Clarity.setCustomUserId(customUserId);
}

/**
 * Sets a custom session id that can be used to identify the session.
 * <p>
 * Note: custom session id cannot be null or empty, or consists only of whitespaces.
 * </p>
 * @param customSessionId   The custom session id to set.
 */
export function setCustomSessionId(customSessionId) {
  if (!SupportedPlatforms.includes(Platform.OS)) {
    console.warn("Clarity supports " + SupportedPlatforms.join(", ") + " only for now.");
    return;
  }
  if (Clarity === null) {
    console.error("Clarity did not initialize properly.", LINKING_ERROR);
    return;
  }
  Clarity.setCustomSessionId(customSessionId);
}

/**
 * Sets a custom tag for the current session.
 * @param key   The tag key to set.
 * @param value   The tag value to set.
 */
export function setCustomTag(key, value) {
  if (!SupportedPlatforms.includes(Platform.OS)) {
    console.warn("Clarity supports " + SupportedPlatforms.join(", ") + " only for now.");
    return;
  }
  if (Clarity === null) {
    console.error("Clarity did not initialize properly.", LINKING_ERROR);
    return;
  }
  Clarity.setCustomTag(key, value);
}

/**
 * For React Native applications only, this function is used to set the current screen name
 * in case the ReactNative Navigation package is used.
 * This will allow you to split and analyze your data on the screen names.
 * You can it set to `null` to remove the latest set value.
 * @param screenName   The current screen name to set.
 */
export function setCurrentScreenName(screenName) {
  if (!SupportedPlatforms.includes(Platform.OS)) {
    console.warn("Clarity supports " + SupportedPlatforms.join(", ") + " only for now.");
    return;
  }
  if (Clarity === null) {
    console.error("Clarity did not initialize properly.", LINKING_ERROR);
    return;
  }
  Clarity.setCurrentScreenName(screenName);
}

/**
 * Returns the active session id. This can be used to correlate the Clarity session with other
 * analytics tools that the developer may be using.
 * @returns a promise that resolves to the current session id.
 */
export function getCurrentSessionId() {
  if (!SupportedPlatforms.includes(Platform.OS)) {
    console.warn("Clarity supports " + SupportedPlatforms.join(", ") + " only for now.");
    return new Promise(resolve => {
      resolve("Undefined");
    });
  }
  if (Clarity === null) {
    console.error("Clarity did not initialize properly.", LINKING_ERROR);
    return new Promise(resolve => {
      resolve("Undefined");
    });
  }
  return Clarity.getCurrentSessionId();
}
//# sourceMappingURL=index.js.map