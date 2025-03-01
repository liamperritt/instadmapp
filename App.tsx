import React, { useEffect, useRef, useState } from "react";
import { View, SafeAreaView, ActivityIndicator, StyleSheet, BackHandler, Text } from "react-native";
import WebView from "react-native-webview";

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
  ".x1nhvcw1.x1oa3qoh.x6s0dn4.xqjyukv.xdt5ytf.x2lah0s.x1c4vz4f.xryxfnj.x1plvlek.x1uhb9sk.xo71vjh.x5pf9jr.x13lgxp2.x168nmei.x78zum5.xjbqb8w.x9f619 > .x1nhvcw1.x1oa3qoh.x1qjc9v5.xqjyukv.xdt5ytf.x2lah0s.x1c4vz4f.xryxfnj.x1plvlek.x1uhb9sk.xo71vjh.x5pf9jr.x13lgxp2.x168nmei.x78zum5.xjbqb8w.x9f619", // Feed
  ".xa3vuyk.x1tukju.x4afe7t.xa8t5ci.x1d5wrs8.xfo81ep.x14atkfc.xuxw1ft.x87ps6o.x5ftkge.xlyipyv.x2b8uid.x10wlt62.x6ikm8r.x12uuly6.xwhw2v2.x1lliihq.x1ypdohk.x5n08af.x1yx36r3.xm0m39n.x1qhh985.xcfux6l.x972fbf.x4y8mfe.x1i7howy.x3jqge.x1ke7ulo.x7r02ix.xjyslct.x1lugfcp", // New posts popup
  ".x67bb7w.x13vifvy.x10l6tqk.xm80bdy.xu96u03", // Notifications popup
  ".x1qiirwl.x10l6tqk.x8fncvn", // Notifications red dot
  ".xivu535 > div > .x1nhvcw1.x1oa3qoh.x1qjc9v5.xqjyukv.xdt5ytf.x2lah0s.x1c4vz4f.xryxfnj.x1plvlek.x1uhb9sk.x1y1aw1k.xwib8y2.xo71vjh.x5pf9jr.x13lgxp2.x168nmei.x78zum5.xjbqb8w.x9f619", // Notifications suggestions
  // Explore
  ".x1ugxg0y.x7flfwp.x1e49onv.x16mfq2j.x103t36t.xmjrnx3.xhae0no.x19b80pe.xh8yej3.x1ykew4q.x1gryazu.x4n8cb0.xkrivgy.xdj266r.x1iyjqo2.xdt5ytf.x78zum5", // Explore
  // Reels
  ".xq70431.xfk6m8.xh8yej3.x5ve5x3.x13vifvy.x1rohswg.xixxii4.x1rife3k.x17qophe.xilefcg", // Reels
];

const App = () => {
  const webViewRef = useRef<WebView>(null);
  const baseUrl = `https://www.instagram.com/`;
  const sourceUrl = `${baseUrl}direct/inbox/`;
  const redirectFromUrls = [
    `${baseUrl}explore/`,
    `${baseUrl}reels/`,
  ];
  const configUrl = "https://raw.githubusercontent.com/liamperritt/social-minimalist-config/refs/heads/main/config/instagram/";

  const [currentUrl, setCurrentUrl] = useState("");
  const [canGoBack, setCanGoBack] = useState(false);
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

  const fetchFiltersConfig = () => {
    fetch(`${configUrl}filters.json?cache_bust=true`)
      .then(response => response.json())
      .then(data => {
        setFiltersConfig(JSON.stringify(data));
      }).catch(error => {
        console.error("Failed to fetch filters config:", error);
      }
    );
  };

  const trackNavState = (nativeEvent: any) => {
    setCurrentUrl(nativeEvent.url);
    setCanGoBack(nativeEvent.canGoBack);
  }

  const redirectToSafety = (navState: any) => {
    if (!webViewRef.current) return;
    if (
      (navState.url === baseUrl && currentUrl !== baseUrl) // Redirect from base Url, but avoid infinite loops
      || redirectFromUrls.some(url => navState.url.startsWith(url))
    ) {
      // If we were previously on the source URL,
      // go back to the source URL before redirecting to avoid page load error message
      if (navState.canGoBack && currentUrl === sourceUrl) {
        webViewRef.current.goBack();
      }
      // Redirect to the source URL
      webViewRef.current.injectJavaScript(`window.location.href = '${sourceUrl}';`);
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

  const handleBackPress = () => {
    if (!webViewRef.current) return false;
    if (canGoBack) {
      webViewRef.current.goBack();
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

  useEffect(() => {
    fetchFiltersConfig();
  }, []); // Run once on component mount

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => backHandler.remove(); // Cleanup
  }, [canGoBack]); // Re-run the effect when canGoBack changes

  // useEffect(() => {
  //   const handleAppStateChange = (nextAppState: string) => {
  //     if (!webViewRef.current) return false;
  //     if (nextAppState === "active") {
  //       webViewRef.current.reload();
  //     }
  //   };
  //   const appStateListener = AppState.addEventListener("change", handleAppStateChange);
  //   return () => appStateListener.remove(); // Cleanup
  // }
  // , []);

  return (
      <SafeAreaView style={styles.container}>
        <WebView style={styles.container}
            ref={webViewRef}
            source={{ uri: sourceUrl }}
            injectedJavaScript={injectedJavaScript}
            javaScriptEnabled={true}
            javaScriptCanOpenWindowsAutomatically={true}
            onMessage={() => {}}
            domStorageEnabled={true}
            startInLoadingState={true}
            renderLoading={() => <ActivityIndicator size="large" color="white" />}
            onError={() => {handleLoadError()}}
            onLoad={() => {handleLoadSuccess()}}
            onLoadStart={(syntheticEvent) => {trackNavState(syntheticEvent.nativeEvent)}}
            onNavigationStateChange={(navState) => {redirectToSafety(navState)}}
            onOpenWindow={(syntheticEvent) => {openLinkInWebView(syntheticEvent.nativeEvent)}}
            allowsBackForwardNavigationGestures={true}
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
