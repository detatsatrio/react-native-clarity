# react-native-clarity

A ReactNative plugin that allows integrating Clarity with your application.

## Installation

```sh
npm install react-native-clarity
```

## Usage

```js
import {LogLevel, initialize, setCustomUserId,  setCustomSessionId, setCustomTag, setCurrentScreenName, getCurrentSessionId } from 'react-native-clarity';

// Initialize Clarity.
let clarityConfig = {
  logLevel: LogLevel.Verbose,
  allowMeteredNetworkUsage: true
}

initialize('<ProjectId>', clarityConfig);

// Set custom user id.
setCustomUserId("<CustomUserId>");

// Set custom session id.
setCustomSessionId("<CustomSessionId>");

// Set custom tag.
setCustomTag("key", "value");

// Setting the current screen name when using React Navigation
import { ..., useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({...}) => {
  useFocusEffect(
    React.useCallback(() => {
      setCurrentScreenName("Home");

      // To clear the current screen name when the screen goes out of focus:
      return () => { setCurrentScreenName(undefined); }
    }, [])
  );
  ...
};

// Get current session id to correlate with other tools.
getCurrentSessionId().then((id) => {...});
```

### Initialization arguments

```ts
/**
 * Initializes the Clarity SDK if the API level is supported.
 * 
 * @param projectId     [REQUIRED] The Clarity project id to send data to.
 * @param config     [OPTIONAL] The clarity config, if not provided default values are used.
*/
function initialize(projectId: string, config?: ClarityConfig) 

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

interface ClarityConfig {
  userId?: string | null;
  logLevel?: LogLevel;
  allowMeteredNetworkUsage?: boolean;
  enableWebViewCapture?: boolean;
  allowedDomains?: string[];
  disableOnLowEndDevices?: Boolean;
}
```

## License

MIT