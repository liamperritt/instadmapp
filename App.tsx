import React, { useEffect, useRef, useState } from "react";
import { View, SafeAreaView, ActivityIndicator, StyleSheet, BackHandler, Text, Button, Platform } from "react-native";
import WebView from "react-native-webview";
import notifee, { AndroidBadgeIconType, EventType } from '@notifee/react-native';
import ShortcutBadge from 'react-native-app-badge';
import BackgroundFetch from "react-native-background-fetch";
// import CookieManager from '@react-native-cookies/cookies';

const DEFAULT_FILTERS = [
  // DMs
  ".xa0zjtf.x1e56ztr.x2lah0s.x1c4vz4f", // Notes panel
  "div.xcdnw81.xurb0ha.xwib8y2.x1sxyh0.x1y1aw1k.xl56j7k.x78zum5.x1ypdohk.x17r0tee.x1sy0etr.xd10rxx.x1ejq31n.xjbqb8w.x6s0dn4.x1a2a7pz.xggy1nq.x1hl2dhg.x16tdsg8.x1mh8g0r.xat24cr.x11i5rnm.xdj266r.xe8uvvx.x9f619.xm0m39n.x1qhh985.xcfux6l.x972fbf.x1i10hfl:nth-of-type(3)", // Heart icon
  // General
  ".xh8yej3.x1n2onr6.xaw8158.x1q0g3np.x78zum5.x9f619.x178xt8z.x13fuv20.x1yvgwvq.xaeubzz.x1o5hw5a > .xh8yej3.xaw8158.x78zum5 > div:nth-of-type(1)", // Nav Home icon
  ".xh8yej3.x1n2onr6.xaw8158.x1q0g3np.x78zum5.x9f619.x178xt8z.x13fuv20.x1yvgwvq.xaeubzz.x1o5hw5a > .xh8yej3.xaw8158.x78zum5 > div:nth-of-type(2)", // Nav Explore icon
  ".xh8yej3.x1n2onr6.xaw8158.x1q0g3np.x78zum5.x9f619.x178xt8z.x13fuv20.x1yvgwvq.xaeubzz.x1o5hw5a > .xh8yej3.xaw8158.x78zum5 > div:nth-of-type(3)", // Nav Reels icon
  ".x1hc1fzr.x51ohtg.x2em05j.xqu0tyb.xi2lk0m.x19991ni.x1g2r6go.x10l6tqk.xww2gxu.x18nykt9.xudhj91.x14yjl9h.x14vhib7", // Nav Profile icon red dot
  "._abpk._acc8", // "Use the app" popup
  // Profile
  ".x1vjfegm.x1a2a7pz.x1lku1pv.x87ps6o.x1q0g3np.x3nfvp2.x13rtm0m.x1e5q0jg.x3x9cwd.x1o1ewxj.x1t137rt.xggy1nq.x1hl2dhg.x16tdsg8.x1n2onr6.xkhd6sd.x18d9i69.x4uap5.xexx8yu.xeuugli.x2lwn1j.x1mh8g0r.xat24cr.x11i5rnm.xdj266r.xe8uvvx.x2lah0s.xdl72j9.x1ypdohk.x9f619.xm0m39n.x1qhh985.xcfux6l.x972fbf.x26u7qi.x1q0q8m5.xu3j5b3.x13fuv20.x2hbi6w.xqeqjp1.xa49m3k.xjqpnuy.xjbqb8w.x1qjc9v5.x1i10hfl", // Profile Note bubble
  "._ab1b._ab18 > .x1qrby5j.x7ja8zs.x1t2pt76.x1lytzrv.xedcshv.xarpa2k.x3igimt.x12ejxvf.xaigb6o.x1beo9mf.xv2umb2.x1jfb8zj.x1h9r5lt.x1h91t0o.x4k7w5x", // Threads icon
  ".x1nhvcw1.x1oa3qoh.x6s0dn4.xqjyukv.x1q0g3np.x2lah0s.x1c4vz4f.xryxfnj.x1plvlek.x1uhb9sk.xo71vjh.x5pf9jr.x13lgxp2.x168nmei.x78zum5.x3pnbk8.xjbqb8w.x9f619", // Threads username
  ".xs5motx.x1rlzn12.xysbk4d.x1xdureb.xc3tme8", // Account insights
  // Feed
  ".xh8yej3.xl56j7k.x1q0g3np.x78zum5.x1qjc9v5", // Feed & Stories
  ".xa3vuyk.x1tukju.x4afe7t.xa8t5ci.x1d5wrs8.xfo81ep.x14atkfc.xuxw1ft.x87ps6o.x5ftkge.xlyipyv.x2b8uid.x10wlt62.x6ikm8r.x12uuly6.xwhw2v2.x1lliihq.x1ypdohk.x5n08af.x1yx36r3.xm0m39n.x1qhh985.xcfux6l.x972fbf.x4y8mfe.x1i7howy.x3jqge.x1ke7ulo.x7r02ix.xjyslct.x1lugfcp", // New posts popup
  ".x67bb7w.x13vifvy.x10l6tqk.xm80bdy.xu96u03", // Notifications popup
  ".x1r695p9.x19f6ikt.x78zum5", // Notifications icon
  ".x1xmf6yo.xh8yej3.x1n2onr6.x10wlt62.x6ikm8r.x5yr21d.xdt5ytf.x78zum5.x1wp8tw6.x1o6z2jb.x1i1ezom.x1otrzb0.xhk9q7s.xgf5ljw", // Following & Favourites dropdown
  ".x127lhb5.xxkxylk", // Following & Favourites dropdown indicator
  // Explore
  ".x1ugxg0y.x7flfwp.x1e49onv.x16mfq2j.x103t36t.xmjrnx3.xhae0no.x19b80pe.xh8yej3.x1ykew4q.x1gryazu.x4n8cb0.xkrivgy.xdj266r.x1iyjqo2.xdt5ytf.x78zum5", // Explore
  // Reels
  ".xq70431.xfk6m8.xh8yej3.x5ve5x3.x13vifvy.x1rohswg.xixxii4.x1rife3k.x17qophe.xilefcg", // Reels
];
// const DM_COUNTER_ELEMENT = ".x1mpkggp.x1t2a60a.xg8j3zb.xyqdw3p.xo1l8bm.x1ncwhqj.xwmz7sl.x9f619.x1vvkbs.x16tdsg8.x1hl2dhg.x1mh8g0r.xat24cr.x11i5rnm.xdj266r.html-span";
const DM_COUNTER_ELEMENT = ".x1r695p9.x19f6ikt.x78zum5";

const App = () => {
  const webViewRef = useRef<WebView>(null);
  const baseUrl = `https://www.instagram.com/`;
  const sourceUrl = `${baseUrl}direct/inbox/`;
  const redirectFromUrls = [
    `${baseUrl}explore/`,
    `${baseUrl}reels/`,
    `${baseUrl}notifications/`,
  ];
  const configUrl = "https://raw.githubusercontent.com/liamperritt/social-minimalist-config/refs/heads/main/config/instagram/";

  const [currentUrl, setCurrentUrl] = useState("");
  const [canGoBack, setCanGoBack] = useState(false);
  const [wentBack, setWentBack] = useState(false);
  const [filtersConfig, setFiltersConfig] = useState(JSON.stringify(DEFAULT_FILTERS));
  const [hasLoadError, setHasLoadError] = useState(false);
  // const [currentBadgeCount, setCurrentBadgeCount] = useState(0);
  const [cookies, setCookies] = useState({});
  const [bfEnabled, setBfEnabled] = React.useState(true);
  const [bfStatus, setBfStatus] = React.useState(-1);

  const injectedJavaScript = `
    removeElements = () => {
      // List of elements to hide by class or CSS selector
      const elementsToRemove = ${filtersConfig};
      // Hide each element by class or CSS selector
      elementsToRemove.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
          element.style.display = "none"; // Hide the element
        }
      });
    };

    fetchDmCounter = () => {
      // Only run if we're on the baseUrl page
      if (!window.location.href === '${baseUrl}') {
        return;
      }
      // Check the unread DM counter
      const unread = document.querySelector('${DM_COUNTER_ELEMENT}');
      if (!unread) {
        return;
      }
      const count = parseInt(unread.innerText);
      if (count > 0 && count !== window.currentBadgeCount) {
        window.ReactNativeWebView.postMessage(count.toString());
        window.currentBadgeCount = count;
      }
    };

    setInterval(() => {
      removeElements();
      // fetchDmCounter();
    }, 100);
  `;

  const fetchFiltersConfig = async () => {
    const response = await fetch(`${configUrl}filters.json?cache_bust=true`);
    const data = await response.json();
    try {
      setFiltersConfig(JSON.stringify(data));
      console.log("Filters config fetched:", data);
    } catch (error) {
      console.error("Failed to fetch filters config:", error);
    }
  };

  // const fetchBadgeCount = async () => {
  //   console.log("Cookies:", cookies);
  //   const cookieHeader = Object.entries(cookies)
  //     .map(([name, value]) => `${name}=${value}`)
  //     .join('; ');

  //   const response = await fetch(`${baseUrl}`, {
  //     headers: {
  //       'Cookie': cookieHeader,
  //     }
  //   });
  //   const html = await response.text();
  //   console.log("HTML:", html);
  //   const parser = new DOMParser.DOMParser();
  //   try {
  //     const doc = parser.parseFromString(html, 'text/html');
  //     console.log("Doc:", doc);
  //     const unread = doc.querySelect(DM_COUNTER_ELEMENT);
  //     console.log("Unread:", unread);
  //   } catch (error) {
  //     console.error("Failed to parse HTML:", error);
  //   }
  //   if (unread) {
  //     const count = parseInt(unread.innerText);
  //     if (count > 0 && count !== currentBadgeCount) {
  //       displayNotification(count);
  //       setCurrentBadgeCount(count);
  //     }
  //   }
  // };

  const trackNavState = (nativeEvent: any) => {
    setCurrentUrl(nativeEvent.url);
    setCanGoBack(nativeEvent.canGoBack);
    if (wentBack) {
      setWentBack(false);
    }
    // if (webViewRef.current) {
    //   setCookies(CookieManager.get(baseUrl));
    // }
    //fetchBadgeCount();
  }

  const redirectToUrl = (url: string) => {
    if (!webViewRef.current) return;
    webViewRef.current.injectJavaScript(`window.location.href = '${url}';`);
  }

  const redirectToSafety = (navState: any) => {
    if (!webViewRef.current) return;
    if (
      (navState.url === baseUrl && currentUrl !== baseUrl && currentUrl !== sourceUrl && !wentBack) // Redirect from base Url, but avoid infinite loops
      || redirectFromUrls.some(url => navState.url.startsWith(url))
    ) {
      // Redirect to the source URL
      redirectToUrl(sourceUrl);
    }
  };

  const openLinkInWebView = (nativeEvent: any) => {
    if (!webViewRef.current) return; 
    if (nativeEvent.targetUrl.startsWith(baseUrl)) {
      // Prevent app links from opening in the device's default browser.
      // Instead, open the link in the WebView
      webViewRef.current.injectJavaScript(`window.location.href = '${nativeEvent.targetUrl}';`);
    }
  };

  const displayNotification = async () => {
    const badgeCount = 1;
    // setCurrentBadgeCount(badgeCount);

    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'instagram',
      name: 'Instagram',
      badge: true,
    });

    // Set badge count
    if (Platform.OS === 'ios') {
      await notifee.setBadgeCount(badgeCount);
    }
    else if (Platform.OS === 'android') {
      await ShortcutBadge.setCount(badgeCount);
    }

    // Display a notification
    try {
      await notifee.displayNotification({
        id: 'instagram-dms',
        body: `You have unread Instagram messages`,
        android: {
          channelId,
          smallIcon: 'insta_dms_icon',
          badgeIconType: AndroidBadgeIconType.SMALL,
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default'
          },
        }
      });
    } catch (error) {
      console.error('Failed to display notification:', error);
    }
  }

  const handleNavigationStateChange = (navState: any) => {
    if (!webViewRef.current) return;
    redirectToSafety(navState);
    if (navState.url === sourceUrl) {
      // Request permissions (required for iOS)
      notifee.requestPermission();
    }
  };

  const handleBackPress = () => {
    if (!webViewRef.current) return false;
    if (canGoBack) {
      webViewRef.current.goBack();
      setWentBack(true);
    } else {
      BackHandler.exitApp();
    }
    return true;
  };

  const handleLoadError = () => {
    setHasLoadError(true); // Set error state
    setTimeout(() => {
      if (webViewRef.current) {
        webViewRef.current.reload();
      } else {
        console.error("Failed to reload WebView");
      }
    }, 1000); // Retry after 1 second
  };

  const handleLoadSuccess = () => {
    setHasLoadError(false);
  };

  const handleProcessTermination = () => {
    if (webViewRef.current) {
      console.log("Reloading on process termination...")
      webViewRef.current.reload();
    } else {
      console.error("Failed to reload")
    }
  };

  const initBackgroundFetch = async () => {
    console.log('[BackgroundFetch] Initialising...');
    const status: number = await BackgroundFetch.configure({
      minimumFetchInterval: 15, // in minutes (15 is minimum allowed)
      // Android-specific options
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
    }, async (taskId: string) => {
      console.log('[BackgroundFetch] taskId', taskId);
      // Perform task.
      // await fetchFiltersConfig();
      await displayNotification();
      // Finish.
      BackgroundFetch.finish(taskId);
      console.log('[BackgroundFetch] Task finished:', taskId);
    }, (taskId: string) => {
      // Oh No!  Our task took too long to complete and the OS has signalled
      // that this task must be finished immediately.
      console.log('[Fetch] TIMEOUT taskId:', taskId);
      BackgroundFetch.finish(taskId);
      console.log('[BackgroundFetch] Task timeout finished:', taskId);
    });
    console.log('[BackgroundFetch] configure status:', status);

    // Query the current BackgroundFetch status.
    BackgroundFetch.status((status) => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          break;
      }
    });
  }

  const onClickToggleEnabled = async () => {
    if (bfEnabled) {
      console.log('[BackgroundFetch] stop');
      await BackgroundFetch.stop();
    }
    else {
      console.log('[BackgroundFetch] start');
      await BackgroundFetch.start();
    }
    setBfEnabled(!bfEnabled);
  }

  useEffect(() => {
    fetchFiltersConfig();
    initBackgroundFetch();
  }, []); // Run once on component mount

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => backHandler.remove(); // Cleanup
  }, [canGoBack]); // Re-run the effect when canGoBack changes

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
  
    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS && pressAction?.id === 'mark-as-read') {
      if (Platform.OS === 'ios') {
        await notifee.setBadgeCount(0);
      }
  
      // Remove the notification
      if (notification?.id) {
        await notifee.cancelNotification(notification.id);
      }
    }

    redirectToUrl(sourceUrl);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button title={"Background Fetch: " + bfEnabled} onPress={onClickToggleEnabled} />
      </View>
      <View>
        <Button title="Display Notification" onPress={() => displayNotification()} />
      </View>
      <WebView style={styles.container}
        ref={webViewRef}
        source={{ uri: sourceUrl }}
        injectedJavaScript={injectedJavaScript}
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}
        onMessage={() => {}}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => <View />}
        onError={() => {handleLoadError()}}
        onLoad={() => {handleLoadSuccess()}}
        onLoadStart={(syntheticEvent) => {trackNavState(syntheticEvent.nativeEvent)}}
        onNavigationStateChange={handleNavigationStateChange}
        onOpenWindow={(syntheticEvent) => {openLinkInWebView(syntheticEvent.nativeEvent)}}
        onContentProcessDidTerminate={handleProcessTermination}
        onRenderProcessGone={handleProcessTermination}
        allowsBackForwardNavigationGestures={true}
        pullToRefreshEnabled={true}
      />
      {hasLoadError && (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorTitle}>Unable to load page</Text>
          <Text style={styles.errorSubtitle}>Please check your internet connection.</Text>
          <ActivityIndicator size="large" color="white"/>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  errorTitle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  errorSubtitle: {
    color: 'gray',
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
});

export default App;
