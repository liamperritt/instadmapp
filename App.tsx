import React, { useEffect, useRef, useState } from "react";
import { View, SafeAreaView, ActivityIndicator, StyleSheet, BackHandler, Text, Platform } from "react-native";
import WebView from "react-native-webview";
import BackgroundFetch from "react-native-background-fetch";
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-cookies/cookies';

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

// Push notifications setup
PushNotification.configure({
  // onNotification is called when a notification is to be emitted
  onNotification: (notification: any) => console.log(notification),
  // Permissions to register for iOS
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

const App = () => {
  const webViewRef = useRef<WebView>(null);
  const baseUrl = `https://www.instagram.com/`;
  const sourceUrl = `${baseUrl}direct/inbox/`;
  const apiUrl = `https://i.instagram.com/api/v1/direct_v2/inbox/`;
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

    setInterval(() => {
      removeElements();
    }, 100);
  `;

  const fetchFiltersConfig = async () => {
    console.log("Fetching filters config...");
    try {
      const response = await fetch(`${configUrl}filters.json?cache_bust=true`);
      const data = await response.json();
      setFiltersConfig(JSON.stringify(data));
      console.log("Filters config fetched:", data);
    } catch (error) {
      console.error("Failed to fetch filters config:", error);
    }
  };

  const trackNavState = (nativeEvent: any) => {
    console.log("Tracking navigation state:", nativeEvent);
    setCurrentUrl(nativeEvent.url);
    setCanGoBack(nativeEvent.canGoBack);
    if (wentBack) {
      setWentBack(false);
    }
    if (!webViewRef.current) return;
  };

  const redirectToUrl = (url: string) => {
    if (!webViewRef.current) return;
    webViewRef.current.injectJavaScript(`window.location.href = '${url}';`);
  };

  const redirectToSafety = (navState: any) => {
    console.log("Checking if we need to redirect to safety...");
    if (!webViewRef.current) return;
    if (
      (navState.url === baseUrl && currentUrl !== baseUrl && currentUrl !== sourceUrl && !wentBack) // Redirect from base Url, but avoid infinite loops
      || redirectFromUrls.some(url => navState.url.startsWith(url))
    ) {
      // Redirect to the source URL
      console.log("Redirecting to source URL:", sourceUrl);
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

  const saveHeaders = async (cookies: string, userAgent: string) => {
    if (!webViewRef.current) return;

    console.log("Saving headers to storage");
    try {
      await AsyncStorage.setItem('cookies', JSON.stringify(cookies));
      await AsyncStorage.setItem('userAgent', JSON.stringify(userAgent));
    } catch (error) {
      console.error("Failed to save headers:", error);
    }
  };

  const getCookies = async () => {
    console.log("Getting cookies via CookieManager...");
    const result = await CookieManager.get(baseUrl, true);
    const resultString = Object.entries(result).map(([key, value]) => `${key}=${value.value}`).join('; ');
    console.log("Retrieved cookies via CookieManager:", resultString);
    return resultString;
  };

  const handleMessage = async (event: any) => {
    console.log("Message received from WebView:", event.nativeEvent.data);
    let { userAgent } = JSON.parse(event.nativeEvent.data);
    if (!userAgent) {
      console.error("No user agent found");
      return;
    }
    console.log("User-Agent:", userAgent);
    const cookies = await getCookies();
    console.log("Cookies:", cookies);
    saveHeaders(cookies, userAgent);
  };

  const loadHeaders = async () => {
    console.log("Loading headers from storage");
    const cookies = await AsyncStorage.getItem('cookies');
    console.log("Cookies loaded:", cookies);
    const userAgent = await AsyncStorage.getItem('userAgent');
    console.log("User agent loaded:", userAgent);
    console.log("Headers loaded:", {cookies, userAgent});
    if (!cookies || !userAgent) {
      console.error("No cookies or user agent found");
      throw new Error("No cookies or user agent found");
    }
    return { cookies, userAgent };
  };

  const makeHttpRequest = async (url: string, method: string, headers: any) => {
    // Make HTTP request leveraging the XMLHttpRequest API and using promises
    return new Promise<string>((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open(method, url);
      Object.keys(headers).forEach(key => {
        request.setRequestHeader(key, headers[key]);
      });
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
            resolve(request.responseText);
          } else {
            reject(new Error(`HTTP request failed with status ${request.status}`));
          }
        }
      };
      request.send();
    });
  };

  const fetchLatestUnreadMessage = async (maskFetch: boolean = false) => {
    console.log("Loading headers...");
    const {cookies, userAgent} = await loadHeaders();
    const lastMessageTimestamp = await AsyncStorage.getItem('lastMessageTimestamp');

    const match = cookies.match(/csrftoken=([^;]+)/);
    if (!match) {
      console.error("No csrftoken found in cookies");
      return {};
    }
    const csrftoken = match[1];

    const headers = {
      "x-ig-app-id": "936619743392459",
      "User-Agent": userAgent,
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://i.instagram.com",
      "Referer": sourceUrl,
      "Priority": "u=1, i",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "X-CSRFToken": csrftoken,
      'Cookie': cookies,
    };

    console.log("Fetching unread messages...");
    if (maskFetch) {
      console.log("Masking fetch...");
      makeHttpRequest(sourceUrl, 'GET', headers); // Concurrently fetch the source URL to mask the private API call
    }
    try {
      const response = await makeHttpRequest(`${apiUrl}?thread_message_limit=10&persistentBadging=true&limit=10&visual_message_return_type=unseen`, 'GET', headers);
      console.log('Raw response:', response);

      let data: any = null;
      try {
        // Set data to the parsed response JSON
        data = JSON.parse(response);
        console.log("Data:", data);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        return {};
      }

      for (const thread of data.inbox.threads) {
        if (!lastMessageTimestamp || thread.last_non_sender_item_at > parseInt(lastMessageTimestamp)) {
          const userName = thread.thread_title;
          // Get the first non-sender message in the thread
          const firstNonSenderMessage = thread.items.find((item: any) => !item.is_sent_by_viewer);
          const messageText = firstNonSenderMessage?.text || `You have a new message from ${userName}`;
          // Save the last message timestamp
          await AsyncStorage.setItem('lastMessageTimestamp', thread.last_non_sender_item_at.toString());
          console.log("New message found:", {userName, messageText});
          return {userName, messageText};
        }
      }
    } catch (error) {
      console.error("Failed to fetch unread messages:", error);
    }
    console.log("No new messages");
    return {};
  };

  const fetchLatestUnreadMessageIfPermitted = (maskFetch: boolean, displayNotification: boolean, callback: Function = () => {}) => {
    // Only hit Instagram's internal API if the user has granted notification permission
    console.log("Checking push notification permissions...");
    PushNotification.checkPermissions(async (permissions: any) => {
      if (!permissions.alert) {
        console.log("Push notification permissions denied");
        return callback();
      }
      console.log("Push notification permissions granted");
      const {userName, messageText} = await fetchLatestUnreadMessage(maskFetch);
      if (!displayNotification) return callback();
      if (userName && messageText) {
        await displayLocalNotification();
      } else {
        console.log("No notification to display");
      }
    });
    return callback();
  };

  const displayLocalNotification = async () => {
    console.log("Displaying local notification...");
    const channelId = "instagram"

    // Create a channel (required for Android)
    await PushNotification.createChannel({
      channelId: channelId, // (required)
      channelName: 'Instagram direct messages', // (required)
      channelDescription: 'Unread Instagram direct message notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
    });

    // Display a local notification
    await PushNotification.localNotification({
      id: 0,
      channelId: channelId,
      title: "Instagram",
      message: "You have unread messages",
      smallIcon: 'insta_dms_icon',
      ignoreInForeground: true,
      onlyAlertOnce: true,
      invokeApp: true,
      importance: 'high',
    });
  };

  const initBackgroundFetch = async () => {
    console.log('[BackgroundFetch] Initialising...');
    const status: number = await BackgroundFetch.configure({
      minimumFetchInterval: 15, // in minutes (15 is minimum allowed)
      // Android-specific options
      stopOnTerminate: false,
      startOnBoot: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
    }, async (taskId: string) => {
      console.log('[BackgroundFetch] taskId', taskId);
      // Perform task.
      fetchLatestUnreadMessageIfPermitted(true, true, async () => {
        BackgroundFetch.finish(taskId);
        console.log('[BackgroundFetch] Task finished:', taskId);
      });
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

  const handleLoadSuccess = (nativeEvent: any) => {
    console.log("Handling load success:", nativeEvent);
    setHasLoadError(false);
  };

  const handleNavigationStateChange = (navState: any) => {
    console.log("Handling navigation state change:", navState);
    if (!webViewRef.current) return;
    redirectToSafety(navState);
    if (navState.url === sourceUrl) {
      // Get cookies and user agent from the WebView
      console.log("Injecting JavaScript to get cookies and user agent...");
      webViewRef.current.injectJavaScript(
        `(function() {
          const userAgent = navigator.userAgent;
          window.ReactNativeWebView.postMessage(JSON.stringify({ userAgent }));
        })();
        true;`
      );
      fetchLatestUnreadMessageIfPermitted(false, false);
    }
  };

  const handleProcessTermination = () => {
    if (webViewRef.current) {
      console.log("Reloading on process termination...")
      webViewRef.current.reload();
    } else {
      console.error("Failed to reload")
    }
  };

  useEffect(() => {
    fetchFiltersConfig();
    initBackgroundFetch();
  }, []); // Run once on component mount

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => backHandler.remove(); // Cleanup
  }, [canGoBack]); // Re-run the effect when canGoBack changes

  return (
    <SafeAreaView style={styles.container}>
      <WebView style={styles.container}
        ref={webViewRef}
        source={{ uri: sourceUrl }}
        injectedJavaScript={injectedJavaScript}
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}
        onMessage={handleMessage}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => <View />}
        onError={() => {handleLoadError()}}
        onLoad={(syntheticEvent) => {handleLoadSuccess(syntheticEvent.nativeEvent)}}
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
