#ifdef RCT_NEW_ARCH_ENABLED
#import "RNClaritySpec.h"

@interface Clarity : NSObject <NativeClaritySpec>
#else
#import <React/RCTBridgeModule.h>

@interface Clarity : NSObject <RCTBridgeModule>
#endif

@end