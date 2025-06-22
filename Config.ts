interface Config {
  [key: string]: {
    webAppId: string;
    baseUrlShort: string;
    baseUrl: string;
    sourceUrl: string;
    baseUrlIsForbidden: boolean;
    // redirectToUrl: string;
    redirectFromUrlPrefixes: string[];
    redirectFromExactUrls: string[];
    openableExternalUrls: string[];
    webAppSessionCookies: string[];
    defaultFilters: string[];
    configUrl: string;
  };
}

const CONFIG: Config = {
  instagram: {
    webAppId: "instagram",
    baseUrlShort: "instagram.com",
    baseUrl: "https://www.instagram.com",
    sourceUrl: "https://www.instagram.com/direct/inbox/",
    baseUrlIsForbidden: false,
    // redirectToUrl: "https://www.instagram.com/direct/inbox/",
    redirectFromUrlPrefixes: [
      "https://www.instagram.com/explore/",
      "https://www.instagram.com/reels/",
      "https://www.instagram.com/notifications/",
      "https://www.instagram.com/?variant=following",
      "https://www.instagram.com/?variant=favorites",
    ],
    redirectFromExactUrls: [],
    openableExternalUrls: [
      "https://www.facebook.com/instagram/",
      "https://www.fbsbx.com/",
    ],
    webAppSessionCookies: [
      "ds_user_id",
      "sessionid",
    ],
    defaultFilters: [
      // DMs
      ".xa0zjtf.x1e56ztr.x2lah0s.x1c4vz4f", // Notes panel
      "div.xcdnw81.xmzvs34.xwib8y2.xf159sx.x1y1aw1k.xl56j7k.x78zum5.x1ypdohk.xstzfhl.x1sy0etr.x18oe1m7.x1ejq31n.xjbqb8w.x6s0dn4.x1a2a7pz.xggy1nq.x1hl2dhg.x16tdsg8.x1lziwak.xat24cr.x14z9mp.xdj266r.xe8uvvx.x9f619.x14e42zd.x1qhh985.x10w94by.x972fbf.x1i10hfl:nth-of-type(3)", // Heart icon
      // General
      ".xh8yej3.x1n2onr6.xaw8158.x1q0g3np.x78zum5.x9f619.x178xt8z.x13fuv20.x1yvgwvq.xaeubzz.x1o5hw5a > .xh8yej3.xaw8158.x78zum5 > div:nth-of-type(1)", // Nav Home icon
      ".xh8yej3.x1n2onr6.xaw8158.x1q0g3np.x78zum5.x9f619.x178xt8z.x13fuv20.x1yvgwvq.xaeubzz.x1o5hw5a > .xh8yej3.xaw8158.x78zum5 > div:nth-of-type(2)", // Nav Explore icon
      ".xh8yej3.x1n2onr6.xaw8158.x1q0g3np.x78zum5.x9f619.x178xt8z.x13fuv20.x1yvgwvq.xaeubzz.x1o5hw5a > .xh8yej3.xaw8158.x78zum5 > div:nth-of-type(3)", // Nav Reels icon
      ".x1hc1fzr.x51ohtg.xml7xvy.xqu0tyb.xi2lk0m.x19991ni.x1g2r6go.x10l6tqk.x1ertn4p.x1pahc9y.xeusxvb.x1c9tyrk.x14vhib7", // Nav Profile icon red dot
      "._abpk._acc8", // "Use the app" popup
      ".xp4054r.x1q0g3np.x78zum5.x6s0dn4 > .x1nhvcw1.x1oa3qoh.x1qjc9v5.xqjyukv.xdt5ytf.x2lah0s.x1c4vz4f.xryxfnj.x1plvlek.x1uhb9sk.xo71vjh.x5pf9jr.x13lgxp2.x168nmei.x78zum5.xjbqb8w.x9f619", // Open App button
      // Profile
      ".x1vjfegm.x1a2a7pz.x1lku1pv.x87ps6o.x1q0g3np.x3nfvp2.xo1y3bh.x140muxe.xu25z0z.x1fmog5m.x1t137rt.xggy1nq.x1hl2dhg.x16tdsg8.x1n2onr6.x1c1uobl.x18d9i69.xyri2b.xexx8yu.xeuugli.x2lwn1j.x1lziwak.xat24cr.x14z9mp.xdj266r.xe8uvvx.x2lah0s.xdl72j9.x1ypdohk.x9f619.x14e42zd.x1qhh985.x10w94by.x972fbf.x1t7ytsu.x1q0q8m5.x18b5jzi.x13fuv20.x1phubyo.xqeqjp1.xc5r6h4.xjqpnuy.xjbqb8w.x1qjc9v5.x1i10hfl", // Profile Note bubble
      "._ab1b._ab18 > .x1qrby5j.x7ja8zs.x1t2pt76.x1lytzrv.xedcshv.xarpa2k.x3igimt.x12ejxvf.xaigb6o.x1beo9mf.xv2umb2.x1jfb8zj.x1h9r5lt.x1h91t0o.x4k7w5x", // Threads icon
      ".x1nhvcw1.x1oa3qoh.x6s0dn4.xqjyukv.x1q0g3np.x2lah0s.x1c4vz4f.xryxfnj.x1plvlek.x1uhb9sk.xbiv7yw.x16uus16.x1ga7v0g.x15mokao.x78zum5.x3pnbk8.xjbqb8w.x9f619", // Threads username
      ".x1jfgfrl.xysbk4d.x1rlzn12.x1xdureb.xc3tme8", // Account insights
      // Feed
      ".xh8yej3.xl56j7k.x1q0g3np.x78zum5.x1qjc9v5", // Feed & Stories
      ".x1n327nk.xixxii4.x1o0tod.xtijo5x", // New posts popup
      ".x67bb7w.x13vifvy.x10l6tqk.xm80bdy.xu96u03", // Notifications popup
      ".x1r695p9.xd9ej83.x78zum5", // Notifications icon
      ".x1xmf6yo.xh8yej3.x1n2onr6.x10wlt62.x6ikm8r.x5yr21d.xdt5ytf.x78zum5.x1wp8tw6.x1ihp6rs.xr2y4jy.x1whfx0g.x1i5p2am.xgf5ljw", // Following & Favourites dropdown
      ".x127lhb5.xxkxylk", // Following & Favourites dropdown indicator
      // Explore
      ".x1ugxg0y.x7flfwp.x1e49onv.x16mfq2j.x103t36t.xmjrnx3.xhae0no.x19b80pe.xh8yej3.x1ykew4q.x1gryazu.x4n8cb0.xkrivgy.xdj266r.x1iyjqo2.xdt5ytf.x78zum5", // Explore
      // Reels
      ".xq70431.xfk6m8.xh8yej3.x5ve5x3.x13vifvy.x1rohswg.xixxii4.x1rife3k.x17qophe.xilefcg", // Reels
    ],
    configUrl: "https://raw.githubusercontent.com/liamperritt/social-minimalist-config/refs/heads/main/config/instagram/",
  },
  facebook: {
    webAppId: "facebook",
    baseUrlShort: "facebook.com",
    baseUrl: "https://www.facebook.com/",
    sourceUrl: "https://www.facebook.com/bookmarks/",
    baseUrlIsForbidden: true,
    // redirectToUrl: "https://www.facebook.com/friends/?target_pivot_link=friends",
    redirectFromUrlPrefixes: [
      "https://www.facebook.com/reel/",
      "https://m.facebook.com/reel/",
      "https://www.facebook.com/notifications/",
      "https://m.facebook.com/notifications/",
    ],
    redirectFromExactUrls: [
      "https://www.facebook.com/watch/",
      "https://m.facebook.com/watch/",
    ],
    openableExternalUrls: [],
    webAppSessionCookies: [
      "c_user",
      "xs",
    ],
    defaultFilters: [
      // General
      ".bottom.fixed-container.m > div:has(> div > .bg-s3.m[role='button'])", // Open App button
      // Marketplace
      "div[data-type='vscroller'] > div[role='tablist'] > div[role='tab'][aria-label^='feed']", // Marketplace Nav Bar
      // Bookmarks
      ".top.fixed-container.m > div > div > div > div[role='button'][aria-label='Back'][data-actual-height='56']", // Bookmarks back button
      "div:has(> div > div > div[aria-label='Also From Meta, Close'])", // Also from Meta
      // Bookmark tiles
      "div[role='listitem']:has(> div > div[aria-label='Reels'])",
      "div[role='listitem']:has(> div > div[aria-label='Messages'])",
      "div[role='listitem']:has(> div > div[aria-label='Video'])",
      "div[role='listitem']:has(> div > div[aria-label='Pages'])",
      "div[role='listitem']:has(> div > div[aria-label='Saved'])",
      "div[role='listitem']:has(> div > div[aria-label='Memories'])",
      "div[role='listitem']:has(> div > div[aria-label='Games'])",
      "div[role='listitem']:has(> div > div[aria-label='Ads Manager'])",
      "div[role='listitem']:has(> div > div[aria-label='Feeds'])",
      // Search
      "div[data-type='vscroller'] > div > div[data-type='multi'] > div > div[role='button']", // Bookmark buttons
      // Profile
      "div[style*='clip-path:inset(0 0 0 0 round 30px)'] > div:has(> h4[data-mcomponent='ServerTextArea'])", // Profile notification badge
      "div[role='button'][aria-label$=' friends']", // Friend count button
      "div[role='button'][aria-label='See all Friends']", // See all Friends button
      // Feed
      "div:has(> div > div[role='button'][aria-label='Go to profile'])", // Write post section
      "div[data-screen-id='124'] > div[data-type='vscroller'] > div:has(> div > div > div > div.no-hscroller.hscroller.m > div.not-snappable.m[data-mcomponent='ImageArea'])", // Stories section
      "div[data-screen-id='124'] > div[data-type='vscroller'] > div[data-tracking-duration-id]", // Post card
      "div[data-screen-id='124'] > div[data-type='vscroller'] > div[data-on-first-visibility-action-id]", // Post loading card
    ],
    configUrl: "https://raw.githubusercontent.com/liamperritt/social-minimalist-config/refs/heads/main/config/facebook/",
  }
}

export default CONFIG;
