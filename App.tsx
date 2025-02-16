import React, { useRef, useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import WebView from "react-native-webview";
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';

const ELEMENTS_TO_REMOVE = JSON.stringify([
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
  // Home
  ".x1nhvcw1.x1oa3qoh.x6s0dn4.xqjyukv.xdt5ytf.x2lah0s.x1c4vz4f.xryxfnj.x1plvlek.x1uhb9sk.xo71vjh.x5pf9jr.x13lgxp2.x168nmei.x78zum5.xjbqb8w.x9f619 > .x1nhvcw1.x1oa3qoh.x1qjc9v5.xqjyukv.xdt5ytf.x2lah0s.x1c4vz4f.xryxfnj.x1plvlek.x1uhb9sk.xo71vjh.x5pf9jr.x13lgxp2.x168nmei.x78zum5.xjbqb8w.x9f619", // Feed (just in case redirects fail)
]);

const INJECTED_JS = `
  removeElements = () => {
    // List of elements to hide by class or CSS selector
    const elementsToRemove = ${ELEMENTS_TO_REMOVE};

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

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};


const App = () => {
  const webViewRef = useRef(null);
  const baseUrl = `https://www.instagram.com/`;
  const sourceUrl = `${baseUrl}direct/inbox/`;
  const redirectFromUrls = [
    `${baseUrl}explore/`,
    `${baseUrl}reels/`,
  ];
  const [currentUrl, setCurrentUrl] = useState(sourceUrl);

  const redirectToSourceUrl = (navState) => {
    if (
      (navState.url === baseUrl && currentUrl !== baseUrl) // Redirect from base Url, but avoid infinite loops
      || redirectFromUrls.some(url => navState.url.startsWith(url))
    ) {
      webViewRef.current.stopLoading();
      webViewRef.current.injectJavaScript(`window.location.href = '${sourceUrl}';`);
    }
    // Keep track of the current URL (for avoiding infinite loops)
    setCurrentUrl(navState.url);
  };

  const openLinkInWebView = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    const { targetUrl } = nativeEvent;
    if (targetUrl.startsWith(baseUrl)) {
      // Prevent app links from opening in the device's default browser
      webViewRef.current.stopLoading();
      // Instead, open the link in the WebView
      webViewRef.current.injectJavaScript(`window.location.href = '${targetUrl}';`);
    }
  };

  const handleFirebaseMessages = async () => {
    if (!firebase.apps.length) {
      await firebase.initializeApp(firebaseConfig);
    }
    if (!firebase.apps.length) {
      throw new Error('Firebase initialization failed');
    }

    // Request permissions on iOS
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }

    const token = await messaging().getToken();

    // Handle incoming messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  };

  useEffect(() => {
    const initializeFirebase = async () => {
      const unsubscribe = await handleFirebaseMessages();
      return unsubscribe;
    };
    initializeFirebase();
  }, []);

  return (
      <View style={styles.container}>
        <WebView
            ref={webViewRef}
            source={{ uri: sourceUrl }}
            injectedJavaScript={INJECTED_JS}
            javaScriptEnabled={true}
            javaScriptCanOpenWindowsAutomatically={true}
            onMessage={() => {}}
            domStorageEnabled
            startInLoadingState
            renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
            onNavigationStateChange={redirectToSourceUrl}
            onOpenWindow={openLinkInWebView}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
