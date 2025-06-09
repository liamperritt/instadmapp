import React, { useEffect, useRef, useState } from "react";
import { View, SafeAreaView, ActivityIndicator, StyleSheet, BackHandler, Text, Linking, TouchableOpacity, Image, Modal, Pressable } from "react-native";
import WebView from "react-native-webview";
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_FILTERS = [
  // DMs
  ".xa0zjtf.x1e56ztr.x2lah0s.x1c4vz4f", // Notes panel
  "div.xcdnw81.xmzvs34.xwib8y2.xf159sx.x1y1aw1k.xl56j7k.x78zum5.x1ypdohk.xstzfhl.x1sy0etr.x18oe1m7.x1ejq31n.xjbqb8w.x6s0dn4.x1a2a7pz.xggy1nq.x1hl2dhg.x16tdsg8.x1lziwak.xat24cr.x14z9mp.xdj266r.xe8uvvx.x9f619.x14e42zd.x1qhh985.x10w94by.x972fbf.x1i10hfl:nth-of-type(3)", // Heart icon
  // General
  ".xh8yej3.x1n2onr6.xaw8158.x1q0g3np.x78zum5.x9f619.x178xt8z.x13fuv20.x1yvgwvq.xaeubzz.x1o5hw5a > .xh8yej3.xaw8158.x78zum5 > div:nth-of-type(1)", // Nav Home icon
  ".xh8yej3.x1n2onr6.xaw8158.x1q0g3np.x78zum5.x9f619.x178xt8z.x13fuv20.x1yvgwvq.xaeubzz.x1o5hw5a > .xh8yej3.xaw8158.x78zum5 > div:nth-of-type(2)", // Nav Explore icon
  ".xh8yej3.x1n2onr6.xaw8158.x1q0g3np.x78zum5.x9f619.x178xt8z.x13fuv20.x1yvgwvq.xaeubzz.x1o5hw5a > .xh8yej3.xaw8158.x78zum5 > div:nth-of-type(3)", // Nav Reels icon
  ".x1hc1fzr.x51ohtg.x2em05j.xqu0tyb.xi2lk0m.x19991ni.x1g2r6go.x10l6tqk.xww2gxu.x18nykt9.xudhj91.x14yjl9h.x14vhib7", // Nav Profile icon red dot
  "._abpk._acc8", // "Use the app" popup
  ".xp4054r.x1q0g3np.x78zum5.x6s0dn4 > .x1nhvcw1.x1oa3qoh.x1qjc9v5.xqjyukv.xdt5ytf.x2lah0s.x1c4vz4f.xryxfnj.x1plvlek.x1uhb9sk.xo71vjh.x5pf9jr.x13lgxp2.x168nmei.x78zum5.xjbqb8w.x9f619", // Open App button
  // Profile
  ".x1vjfegm.x1a2a7pz.x1lku1pv.x87ps6o.x1q0g3np.x3nfvp2.x13rtm0m.x1e5q0jg.x3x9cwd.x1o1ewxj.x1t137rt.xggy1nq.x1hl2dhg.x16tdsg8.x1n2onr6.x1c1uobl.x18d9i69.xyri2b.xexx8yu.xeuugli.x2lwn1j.x1lziwak.xat24cr.x14z9mp.xdj266r.xe8uvvx.x2lah0s.xdl72j9.x1ypdohk.x9f619.x14e42zd.x1qhh985.x10w94by.x972fbf.x1t7ytsu.x1q0q8m5.x18b5jzi.x13fuv20.x1phubyo.xqeqjp1.xc5r6h4.xjqpnuy.xjbqb8w.x1qjc9v5.x1i10hfl", // Profile Note bubble
  "._ab1b._ab18 > .x1qrby5j.x7ja8zs.x1t2pt76.x1lytzrv.xedcshv.xarpa2k.x3igimt.x12ejxvf.xaigb6o.x1beo9mf.xv2umb2.x1jfb8zj.x1h9r5lt.x1h91t0o.x4k7w5x", // Threads icon
  ".x1nhvcw1.x1oa3qoh.x6s0dn4.xqjyukv.x1q0g3np.x2lah0s.x1c4vz4f.xryxfnj.x1plvlek.x1uhb9sk.xo71vjh.x5pf9jr.x13lgxp2.x168nmei.x78zum5.x3pnbk8.xjbqb8w.x9f619", // Threads username
  ".x1jfgfrl.xysbk4d.x1rlzn12.x1xdureb.xc3tme8", // Account insights
  // Feed
  ".xh8yej3.xl56j7k.x1q0g3np.x78zum5.x1qjc9v5", // Feed & Stories
  ".xa3vuyk.x1tukju.x4afe7t.xa8t5ci.x1d5wrs8.xfo81ep.x14atkfc.xuxw1ft.x87ps6o.x5ftkge.xlyipyv.x2b8uid.x10wlt62.x6ikm8r.x12uuly6.xwhw2v2.x1lliihq.x1ypdohk.x5n08af.x1yx36r3.xm0m39n.x1qhh985.xcfux6l.x972fbf.x4y8mfe.x1i7howy.x3jqge.x1ke7ulo.x7r02ix.xjyslct.x1lugfcp", // New posts popup
  ".x67bb7w.x13vifvy.x10l6tqk.xm80bdy.xu96u03", // Notifications popup
  ".x1r695p9.xd9ej83.x78zum5", // Notifications icon
  ".x1xmf6yo.xh8yej3.x1n2onr6.x10wlt62.x6ikm8r.x5yr21d.xdt5ytf.x78zum5.x1wp8tw6.x1o6z2jb.x1i1ezom.x1otrzb0.xhk9q7s.xgf5ljw", // Following & Favourites dropdown
  ".x127lhb5.xxkxylk", // Following & Favourites dropdown indicator
  // Explore
  ".x1ugxg0y.x7flfwp.x1e49onv.x16mfq2j.x103t36t.xmjrnx3.xhae0no.x19b80pe.xh8yej3.x1ykew4q.x1gryazu.x4n8cb0.xkrivgy.xdj266r.x1iyjqo2.xdt5ytf.x78zum5", // Explore
  // Reels
  ".xq70431.xfk6m8.xh8yej3.x5ve5x3.x13vifvy.x1rohswg.xixxii4.x1rife3k.x17qophe.xilefcg", // Reels
];

const APP_GRID = [
  {
    name: "Instagram",
    icon: require("./assets/instagram.png"), // Add your icon images to assets/
    active: true,
  },
  {
    name: "Facebook",
    icon: require("./assets/app.png"),
    active: false,
  },
  {
    name: "X",
    icon: require("./assets/app.png"),
    active: false,
  },
  {
    name: "YouTube",
    icon: require("./assets/app.png"),
    active: false,
  },
];
const GRID_ROWS = 3;
const GRID_COLS = 2;

const App = () => {
  const webViewRef = useRef<WebView>(null);
  const webAppName = "instagram";
  const baseUrlShort = `${webAppName}.com`;
  const baseUrl = `https://www.${baseUrlShort}/`;
  const sourceUrl = `${baseUrl}direct/inbox/`;
  const exitUrl = `${baseUrl}?flo=true`;
  const redirectFromUrls = [
    `${baseUrl}explore/`,
    `${baseUrl}reels/`,
    `${baseUrl}notifications/`,
  ];
  const openableExternalUrls = [
    "https://www.facebook.com/instagram/",
    "https://www.fbsbx.com/",
  ];
  const configBaseUrl = "https://raw.githubusercontent.com/liamperritt/social-minimalist-config/refs/heads/main/config/";
  const configUrl = `${configBaseUrl}${webAppName}/`;

  const [showHome, setShowHome] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);
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

  const saveHomeScreenState = async (state: boolean) => {
    console.log("Saving home screen state:", state);
    setShowHome(state);
    try {
      await AsyncStorage.setItem("showHome", state ? "true" : "false");
    }
    catch (error) {
      console.error("Failed to save showHome state:", error);
    }
  };

  const loadHomeScreenState = async () => {
    console.log("Loading home screen state...");
    try {
      const value = await AsyncStorage.getItem("showHome");
      if (value !== null) {
        setShowHome(value === "true");
        return showHome;
      }
    } catch (error) {
      console.error("Failed to load showHome state:", error);
    }
    setShowHome(false);
    return showHome;
  };

  const loadInfoVisible = async () => {
    try {
      const value = await AsyncStorage.getItem("infoVisible");
      if (value !== null) {
        setInfoVisible(value === "true");
      }
    } catch (error) {
      console.error("Failed to load infoVisible state:", error);
    }
  };

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
    if (nativeEvent.url === sourceUrl) {
      // if we are on the source URL, that means we have logged in
      console.log("Logged in, hiding the home screen");
      saveHomeScreenState(false);
    }
    else if (nativeEvent.url === exitUrl) {
      // if we are on the exit URL, that means we have logged out
      console.log("Logged out, showing the home screen");
      saveHomeScreenState(true);
    }
  };

  const handleShouldStartLoadWithRequest = (request: any) => {
    if (!request.url.includes(baseUrlShort) && !openableExternalUrls.some(url => request.url.startsWith(url))) {
      console.log("External link detected, opening in default browser:", request.url);
      // Open external links in the device's default browser
      Linking.openURL(request.url);
      return false;
    }
    return true; // Allow the WebView to load the URL
  }

  const handleNavigationStateChange = (navState: any) => {
    console.log("Handling navigation state change:", navState);
    if (!webViewRef.current) return;
    redirectToSafety(navState);
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
    loadHomeScreenState();
    loadInfoVisible();
    fetchFiltersConfig();
  }, []); // Run once on component mount

  useEffect(() => {
    AsyncStorage.setItem("infoVisible", infoVisible ? "true" : "false").catch((error) => {
      console.error("Failed to save infoVisible state:", error);
    });
  }, [infoVisible]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => backHandler.remove(); // Cleanup
  }, [canGoBack]); // Re-run the effect when canGoBack changes

  // Only mount WebView when not on home
  if (showHome) {
    // Fill grid with 4 icons and 5 empty spots
    const gridItems = [];
    let appIdx = 0;
    for (let i = 0; i < GRID_ROWS * GRID_COLS; i++) {
      if (appIdx < APP_GRID.length) {
        const app = APP_GRID[appIdx];
        gridItems.push(
          <TouchableOpacity
            key={app.name}
            style={[
              styles.appIconContainer,
              !app.active && styles.appIconInactive,
            ]}
            activeOpacity={app.active ? 0.7 : 1}
            onPress={() => {
              if (app.active) setShowHome(false);
            }}
            disabled={!app.active}
          >
            <Image
              source={app.icon}
              style={[
                styles.appIcon,
                !app.active && styles.appIconImageInactive,
              ]}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.appLabel,
                !app.active && styles.appLabelInactive,
              ]}
            >
              {app.name}
            </Text>
          </TouchableOpacity>
        );
        appIdx++;
      } else {
        // Empty grid spot
        gridItems.push(<View key={`empty-${i}`} style={styles.gridContainer} />);
      }
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.titleText}>OpenSocials</Text>
        </View>
        <View style={styles.gridContainer}>
          {gridItems}
        </View>
        <Modal
          visible={infoVisible}
          transparent
          animationType="fade"
        >
          <View style={styles.infoModalOverlay}>
            <View style={styles.infoModal}>
              <Text style={styles.infoTitle}>Welcome!</Text>
              <Text style={styles.infoText}>
                Tap an icon to open a social web app.{"\n\n"}
                You can return to this home page at any time by logging out of the web app.
              </Text>
              <Pressable
                style={styles.infoCloseButton}
                onPress={() => setInfoVisible(false)}
                accessibilityLabel="Close info popup"
              >
                <Text style={styles.infoCloseButtonText}>Understood</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

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
        renderLoading={() => <View />}
        onError={() => {handleLoadError()}}
        onLoad={(syntheticEvent) => {handleLoadSuccess(syntheticEvent.nativeEvent)}}
        onLoadStart={(syntheticEvent) => {trackNavState(syntheticEvent.nativeEvent)}}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
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
  titleBar: {
    height: 56,
    backgroundColor: '#181818',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#222',
    borderBottomWidth: 1,
  },
  titleText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    flex: 1,
    textAlign: 'left',
    paddingLeft: 16,
    paddingRight: 56, // Space for back button
  },
  backButton: {
    position: 'absolute',
    left: 0,
    height: '100%',
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  backButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: '400',
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  appIconContainer: {
    width: '30%',
    aspectRatio: 1,
    margin: '1.66%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#232323',
  },
  appIcon: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  appLabel: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  appIconInactive: {
    opacity: 0.4,
  },
  appIconImageInactive: {
    tintColor: '#888',
  },
  appLabelInactive: {
    color: '#888',
  },
  infoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoModal: {
    backgroundColor: '#232323',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 32,
    alignItems: 'center',
    maxWidth: 340,
  },
  infoTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoText: {
    color: '#ccc',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  infoCloseButton: {
    backgroundColor: '#444',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: 'center',
  },
  infoCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  webview: {
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
