import React, { useRef } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import WebView from "react-native-webview";

// const INJECTED_JS = `
//   setInterval(() => {
//     // Remove header, footer, and other unwanted elements
//     document.querySelector("header")?.remove();
//     document.querySelector("nav")?.remove();
//     document.querySelector("footer")?.remove();
//
//     // Hide Instagram feed and stories
//     document.querySelector('[href="/"]')?.closest("div")?.remove();
//     document.querySelector('[href="/explore/"]')?.closest("div")?.remove();
//     document.querySelector("section [role='presentation']")?.remove();
//
//     console.log("Instagram UI cleaned up!");
//   }, 1000);
// `;

const INJECTED_JS = `
  setInterval(() => {
    // List of elements to hide by class or CSS selector
    const elementsToRemove = [
      "._abpk._acc8",
      ".x1qiirwl.x10l6tqk.x8fncvn",
      ".xa0zjtf.x1e56ztr.x2lah0s.x1c4vz4f",
      ".x67bb7w.x13vifvy.x10l6tqk.xm80bdy.xu96u03",
      ".xivu535 > div > .x1nhvcw1.x1oa3qoh.x1qjc9v5.xqjyukv.xdt5ytf.x2lah0s.x1c4vz4f.xryxfnj.x1plvlek.x1uhb9sk.x1y1aw1k.xwib8y2.xo71vjh.x5pf9jr.x13lgxp2.x168nmei.x78zum5.xjbqb8w.x9f619",
      "._ab1b._ab18 > .x1qrby5j.x7ja8zs.x1t2pt76.x1lytzrv.xedcshv.xarpa2k.x3igimt.x12ejxvf.xaigb6o.x1beo9mf.xv2umb2.x1jfb8zj.x1h9r5lt.x1h91t0o.x4k7w5x",
      ".x1vjfegm.x1a2a7pz.x1lku1pv.x87ps6o.x1q0g3np.x3nfvp2.x13rtm0m.x1e5q0jg.x3x9cwd.x1o1ewxj.x1t137rt.xggy1nq.x1hl2dhg.x16tdsg8.x1n2onr6.xkhd6sd.x18d9i69.x4uap5.xexx8yu.xeuugli.x2lwn1j.x1mh8g0r.xat24cr.x11i5rnm.xdj266r.xe8uvvx.x2lah0s.xdl72j9.x1ypdohk.x9f619.xm0m39n.x1qhh985.xcfux6l.x972fbf.x26u7qi.x1q0q8m5.xu3j5b3.x13fuv20.x2hbi6w.xqeqjp1.xa49m3k.xjqpnuy.xjbqb8w.x1qjc9v5.x1i10hfl",
      ".x1nhvcw1.x1oa3qoh.x6s0dn4.xqjyukv.x1q0g3np.x2lah0s.x1c4vz4f.xryxfnj.x1plvlek.x1uhb9sk.xo71vjh.x5pf9jr.x13lgxp2.x168nmei.x78zum5.x3pnbk8.xjbqb8w.x9f619",
      ".xa3vuyk.x1tukju.x4afe7t.xa8t5ci.x1d5wrs8.xfo81ep.x14atkfc.xuxw1ft.x87ps6o.x5ftkge.xlyipyv.x2b8uid.x10wlt62.x6ikm8r.x12uuly6.xwhw2v2.x1lliihq.x1ypdohk.x5n08af.x1yx36r3.xm0m39n.x1qhh985.xcfux6l.x972fbf.x4y8mfe.x1i7howy.x3jqge.x1ke7ulo.x7r02ix.xjyslct.x1lugfcp",
      ".xs5motx.x1rlzn12.xysbk4d.x1xdureb.xc3tme8",
      ".x1hc1fzr.x51ohtg.x2em05j.xqu0tyb.xi2lk0m.x19991ni.x1g2r6go.x10l6tqk.xww2gxu.x18nykt9.xudhj91.x14yjl9h.x14vhib7",
      "div.xcdnw81.xurb0ha.xwib8y2.x1sxyh0.x1y1aw1k.xl56j7k.x78zum5.x1ypdohk.x17r0tee.x1sy0etr.xd10rxx.x1ejq31n.xjbqb8w.x6s0dn4.x1a2a7pz.xggy1nq.x1hl2dhg.x16tdsg8.x1mh8g0r.xat24cr.x11i5rnm.xdj266r.xe8uvvx.x9f619.xm0m39n.x1qhh985.xcfux6l.x972fbf.x1i10hfl:nth-of-type(3)",
      ".x1nhvcw1.x1oa3qoh.x6s0dn4.xqjyukv.xdt5ytf.x2lah0s.x1c4vz4f.xryxfnj.x1plvlek.x1uhb9sk.xo71vjh.x5pf9jr.x13lgxp2.x168nmei.x78zum5.xjbqb8w.x9f619 > .x1nhvcw1.x1oa3qoh.x1qjc9v5.xqjyukv.xdt5ytf.x2lah0s.x1c4vz4f.xryxfnj.x1plvlek.x1uhb9sk.xo71vjh.x5pf9jr.x13lgxp2.x168nmei.x78zum5.xjbqb8w.x9f619",
      ".xh8yej3.xaw8158.x78zum5 > div > .x1qrby5j.x7ja8zs.x1t2pt76.x1lytzrv.xedcshv.xarpa2k.x3igimt.x12ejxvf.xaigb6o.x1beo9mf.xv2umb2.x1jfb8zj.x1h9r5lt.x1h91t0o.x4k7w5x"
    ];

    // Hide each element by class or CSS selector
    elementsToRemove.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.display = "none"; // Hide the element
      }
    });

    console.log("Instagram UI cleaned up!");
  }, 1000);
`;

// back button
// ".xq8finb.xkhd6sd.x18d9i69.x4uap5.xexx8yu.xcdnw81.xl56j7k.x78zum5.x1ypdohk.x17r0tee.x1sy0etr.xd10rxx.x1ejq31n.xjbqb8w.x6s0dn4.x1a2a7pz.xggy1nq.x1hl2dhg.x16tdsg8.x1mh8g0r.xat24cr.xdj266r.xe8uvvx.x9f619.xm0m39n.x1qhh985.xcfux6l.x972fbf.x1i10hfl",


const App = () => {
  const webViewRef = useRef(null);

  return (
      <View style={styles.container}>
        <WebView
            ref={webViewRef}
            source={{ uri: "https://www.instagram.com/direct/inbox" }}
            injectedJavaScript={INJECTED_JS}
            javaScriptEnabled={true}
            domStorageEnabled
            startInLoadingState
            renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
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
