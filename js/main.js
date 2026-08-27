/**
 * Page startup
 * Fills the Hero, About, Music, Video, Updates, Socials, Mailing List,
 * Contact, and Footer from js/content.js, and turns on the theme toggle
 * and mobile navigation.
 */

import { siteContent, links } from "./content.js";
import { initTheme } from "./theme.js";

function renderHero() {
  const { hero, siteName, seoDescription } = siteContent;

  document.title = siteName;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", seoDescription);

  const titleEl = document.querySelector("[data-hero-title]");
  const taglineEl = document.querySelector("[data-hero-tagline]");
  const promoEl = document.querySelector("[data-hero-promo]");
  const primaryEl = document.querySelector("[data-hero-primary]");
  const secondaryEl = document.querySelector("[data-hero-secondary]");
  const visualEl = document.querySelector("[data-hero-visual]");
  const placeholderEl = document.querySelector("[data-hero-placeholder]");

  if (titleEl) {
    // Each word is its own span so the first letter of Nini and Uppuluri
    // can both pick up the pink accent.
    titleEl.replaceChildren(
      ...hero.title.split(/\s+/).flatMap((word, index, words) => {
        const span = document.createElement("span");
        span.className = "hero__name-word";
        span.textContent = word;
        return index < words.length - 1 ? [span, document.createTextNode(" ")] : [span];
      })
    );
  }
  if (taglineEl) taglineEl.textContent = hero.tagline;

  if (promoEl) {
    const promo = hero.promo || {};
    const hasPromo = promo.label && !isPlaceholder(promo.href);
    promoEl.hidden = !hasPromo;
    if (hasPromo) {
      promoEl.textContent = promo.label;
      promoEl.setAttribute("href", promo.href);
      if (/^https?:\/\//i.test(promo.href)) {
        promoEl.target = "_blank";
        promoEl.rel = "noopener noreferrer";
      } else {
        promoEl.removeAttribute("target");
        promoEl.removeAttribute("rel");
      }
    }
  }

  if (primaryEl) {
    primaryEl.textContent = hero.primaryCta.label;
    primaryEl.setAttribute("href", hero.primaryCta.href);
  }

  if (secondaryEl) {
    secondaryEl.textContent = hero.secondaryCta.label;
    secondaryEl.setAttribute("href", hero.secondaryCta.href);
  }

  const hasRealImage =
    hero.image && !hero.image.includes("REPLACE_WITH");

  if (hasRealImage && visualEl) {
    visualEl.src = hero.image;
    visualEl.alt = hero.imageAlt;
    visualEl.hidden = false;
    if (placeholderEl) placeholderEl.hidden = true;
  } else if (placeholderEl) {
    placeholderEl.hidden = false;
    placeholderEl.textContent = hero.image;
    if (visualEl) visualEl.hidden = true;
  }

  const shopEl = document.querySelector("[data-nav-shop]");
  if (shopEl) shopEl.setAttribute("href", links.shop);
}

function renderAbout() {
  const about = siteContent.about;
  if (!about) return;

  const eyebrowEl = document.querySelector("[data-about-eyebrow]");
  const titleEl = document.querySelector("[data-about-title]");
  const textEl = document.querySelector("[data-about-text]");
  const imageEl = document.querySelector("[data-about-image]");
  const placeholderEl = document.querySelector("[data-about-placeholder]");
  const ctaEl = document.querySelector("[data-about-cta]");

  if (eyebrowEl) eyebrowEl.textContent = about.eyebrow;
  if (titleEl) titleEl.textContent = about.title;

  if (textEl) {
    textEl.replaceChildren(
      ...(about.paragraphs || []).map((text) => {
        const p = document.createElement("p");
        p.textContent = text;
        return p;
      })
    );
  }

  if (!isPlaceholder(about.image) && imageEl) {
    imageEl.src = about.image;
    imageEl.alt = about.imageAlt;
    imageEl.hidden = false;
    if (placeholderEl) placeholderEl.hidden = true;
  } else if (placeholderEl) {
    placeholderEl.textContent = about.image;
    placeholderEl.hidden = false;
    if (imageEl) imageEl.hidden = true;
  }

  if (ctaEl) {
    const learnMore = about.learnMore || {};
    ctaEl.textContent = learnMore.label || "Learn More";
    // Hide the button until a real link exists, so it never points nowhere.
    ctaEl.hidden = isPlaceholder(learnMore.href);
    if (!ctaEl.hidden) ctaEl.setAttribute("href", learnMore.href);
  }
}

/**
 * Spotify embed helpers
 * Turns a track/album/playlist URL into an embed URL or a Spotify URI.
 * Leave REPLACE_WITH placeholders as-is until you have real links.
 */
function toSpotifyEmbed(url) {
  if (!url || url.includes("REPLACE_WITH")) return "";
  if (url.includes("/embed/")) return url;
  return url.replace("open.spotify.com/", "open.spotify.com/embed/");
}

function toSpotifyUri(url) {
  if (!url || url.includes("REPLACE_WITH")) return "";
  const cleaned = String(url).trim();
  if (cleaned.startsWith("spotify:")) return cleaned.split("?")[0];

  try {
    const parsed = new URL(cleaned);
    const parts = parsed.pathname.split("/").filter(Boolean);
    const kinds = ["track", "album", "playlist", "episode", "show", "artist"];
    const kind = parts.find((part) => kinds.includes(part));
    const id = kind ? parts[parts.indexOf(kind) + 1] : "";
    return kind && id ? `spotify:${kind}:${id}` : "";
  } catch {
    return "";
  }
}

function isPlaceholder(value) {
  return !value || String(value).includes("REPLACE_WITH");
}

const spotifyControllers = new Set();

function withSpotifyApi(setup) {
  if (window.__spotifyIframeApi) setup(window.__spotifyIframeApi);
  else (window.__spotifyReadyQueue || (window.__spotifyReadyQueue = [])).push(setup);
}

function pauseAllSpotify(exceptController) {
  if (spotifyControllers.size > 0) {
    spotifyControllers.forEach((controller) => {
      if (controller === exceptController) return;
      try {
        controller.pause();
      } catch {
        // Ignore players that are not ready yet.
      }
    });
    return;
  }

  document.querySelectorAll(".track__media iframe").forEach((iframe) => {
    const src = iframe.getAttribute("src");
    if (src) iframe.src = src;
  });
}

function stopAllVideos(exceptMedia) {
  document.querySelectorAll(".video__media").forEach((media) => {
    if (media === exceptMedia) return;
    const poster = media.niniPoster;
    if (poster && media.querySelector("iframe")) {
      media.replaceChildren(poster);
    }
  });
}

function mountSpotifyEmbeds() {
  document.querySelectorAll(".track__embed").forEach((host) => {
    if (host.dataset.spotifyMounted) return;
    host.dataset.spotifyMounted = "true";
    attachSpotifyController(
      host,
      host.dataset.spotifyEmbed,
      host.dataset.spotifyFeatured === "true"
    );
  });
}

function fillSpotifyFallback(host, embedUrl) {
  if (!host.isConnected || host.querySelector("iframe") || !embedUrl) return;

  const iframe = document.createElement("iframe");
  iframe.src = embedUrl;
  iframe.title = host.title || "Spotify";
  iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  iframe.loading = "lazy";
  iframe.setAttribute("allowfullscreen", "");
  host.replaceChildren(iframe);
}

function attachSpotifyController(host, embedUrl, featured) {
  fillSpotifyFallback(host, embedUrl);

  const uri = toSpotifyUri(embedUrl);
  if (!uri) return;

  withSpotifyApi((api) => {
    const target = host.querySelector("iframe") || host;
    if (!target.isConnected) return;

    try {
      api.createController(target, {
        uri,
        width: "100%",
        height: featured ? "232" : "152",
      }, (controller) => {
        spotifyControllers.add(controller);
        controller.addListener("playback_started", () => {
          pauseAllSpotify(controller);
          stopAllVideos();
        });
      });
    } catch {
      // Keep the regular embed if the API cannot take over.
    }
  });
}

function createTrackCard(track, featured = false) {
  const article = document.createElement("article");
  article.className = featured ? "track track--featured" : "track";

  const media = document.createElement("div");
  media.className = "track__media";

  const embedUrl = toSpotifyEmbed(track.spotifyUrl);
  if (embedUrl) {
    const host = document.createElement("div");
    host.className = "track__embed";
    host.title = `${track.title} on Spotify`;
    host.dataset.spotifyEmbed = embedUrl;
    if (featured) host.dataset.spotifyFeatured = "true";
    media.appendChild(host);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "track__placeholder";
    placeholder.textContent = track.spotifyUrl || "[REPLACE_WITH_SONG_URL]";
    media.appendChild(placeholder);
  }

  const meta = document.createElement("div");
  meta.className = "track__meta";

  const title = document.createElement("h3");
  title.className = "track__title";
  title.textContent = track.title;

  const artist = document.createElement("p");
  artist.className = "track__artist";
  artist.textContent = track.artist;

  meta.append(title, artist);
  article.append(media, meta);
  return article;
}

function renderMusic() {
  const music = siteContent.music;
  if (!music) return;

  const titleEl = document.querySelector("[data-music-title]");
  const featuredEl = document.querySelector("[data-music-featured]");
  const gridEl = document.querySelector("[data-music-grid]");
  const extraEl = document.querySelector("[data-music-extra]");
  const viewAllEl = document.querySelector("[data-music-view-all]");

  if (titleEl) titleEl.textContent = music.sectionTitle;
  if (featuredEl && music.featured) {
    featuredEl.replaceChildren(createTrackCard(music.featured, true));
  }
  if (gridEl) {
    gridEl.replaceChildren(
      ...music.tracks.slice(0, 6).map((track) => createTrackCard(track))
    );
  }
  mountSpotifyEmbeds();

  if (viewAllEl) {
    viewAllEl.textContent = music.viewAllLabel;
    const hasMore = Array.isArray(music.more) && music.more.length > 0;
    const hasHref = !isPlaceholder(music.viewAllHref);

    if (hasHref) {
      viewAllEl.setAttribute("href", music.viewAllHref);
      viewAllEl.removeAttribute("hidden");
    } else if (hasMore && extraEl) {
      viewAllEl.setAttribute("href", "#music-all");
      viewAllEl.removeAttribute("hidden");
      extraEl.replaceChildren(
        ...music.more.map((track) => createTrackCard(track))
      );
      mountSpotifyEmbeds();
      viewAllEl.addEventListener("click", (event) => {
        event.preventDefault();
        extraEl.hidden = false;
        extraEl.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      viewAllEl.setAttribute("href", links.spotify);
    }
  }
}

/**
 * Mobile navigation
 * Shows/hides the header links on small screens.
 * Edit the link labels in index.html, not here.
 */
function initNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("#primary-nav");
  if (!toggle || !nav) return;

  const desktopQuery = window.matchMedia("(min-width: 800px)");

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", () => {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  desktopQuery.addEventListener("change", () => setOpen(false));

  // Desktop only: underline the header link for the section currently
  // under the sticky header. Shop is skipped because it is not on this page.
  const hashLinks = [...nav.querySelectorAll('a[href^="#"]')];
  const navIds = new Set(
    hashLinks
      .map((link) => link.getAttribute("href").slice(1))
      .filter((id) => id && id !== "top")
  );

  function setActiveNav(activeId) {
    hashLinks.forEach((link) => {
      const isActive = desktopQuery.matches && link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  function updateActiveNav() {
    if (!desktopQuery.matches) {
      setActiveNav("");
      return;
    }

    const header = document.querySelector(".site-header");
    const spyY = (header ? header.getBoundingClientRect().bottom : 68) + 8;
    const sections = document.querySelectorAll("main > section[id]");
    let occupyingId = "";
    let lastVisibleId = "";

    sections.forEach((section) => {
      if (section.hidden) return;
      lastVisibleId = section.id;
      if (section.getBoundingClientRect().top <= spyY) occupyingId = section.id;
    });

    // The last section often cannot reach the spy line, so treat the
    // bottom of the page as that section (Subscribe, in the current layout).
    const atPageEnd =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atPageEnd && lastVisibleId) occupyingId = lastVisibleId;

    setActiveNav(navIds.has(occupyingId) ? occupyingId : "");
  }

  let spyFrame = 0;
  function onScrollOrResize() {
    if (spyFrame) return;
    spyFrame = requestAnimationFrame(() => {
      spyFrame = 0;
      updateActiveNav();
    });
  }

  hashLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href").slice(1);
      if (navIds.has(id)) setActiveNav(id);
    });
  });

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
  desktopQuery.addEventListener("change", updateActiveNav);
  requestAnimationFrame(updateActiveNav);
}

/**
 * YouTube helpers
 * Pull the video id from a watch, youtu.be, shorts, or embed URL.
 * Leave REPLACE_WITH placeholders as-is until you have real links.
 */
function toYouTubeId(url) {
  if (!url || url.includes("REPLACE_WITH")) return "";

  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.split("/").filter(Boolean)[0] || "";
    }

    const fromQuery = parsed.searchParams.get("v");
    if (fromQuery) return fromQuery;

    const parts = parsed.pathname.split("/").filter(Boolean);
    const embedIndex = parts.indexOf("embed");
    if (embedIndex >= 0) return parts[embedIndex + 1] || "";

    const shortsIndex = parts.indexOf("shorts");
    return (shortsIndex >= 0 ? parts[shortsIndex + 1] : parts[parts.length - 1]) || "";
  } catch {
    return "";
  }
}

function toYouTubeEmbed(url) {
  const id = toYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : "";
}

function createYouTubeIframe(embedUrl, title) {
  const iframe = document.createElement("iframe");
  iframe.className = "video__embed";
  const src = new URL(embedUrl);
  src.searchParams.set("autoplay", "1");
  iframe.src = src.toString();
  iframe.title = `${title} on YouTube`;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.setAttribute("allowfullscreen", "");
  return iframe;
}

function createVideoCard(video, featured = false) {
  const article = document.createElement("article");
  article.className = featured ? "video video--featured" : "video";

  const media = document.createElement("div");
  media.className = "video__media";

  const videoId = toYouTubeId(video.videoUrl);
  const embedUrl = toYouTubeEmbed(video.videoUrl);

  if (embedUrl && videoId) {
    // Show YouTube's own thumbnail first. The player (and its red play
    // icon) only loads after a click, so the still image stays clean.
    const poster = document.createElement("button");
    poster.type = "button";
    poster.className = "video__poster";
    poster.setAttribute("aria-label", `Play ${video.title}`);

    const img = document.createElement("img");
    img.alt = "";
    img.loading = "lazy";
    if (isPlaceholder(video.thumbnail)) {
      // maxresdefault is the clean still. If YouTube has none, it serves a
      // tiny dummy image, so we fall back to sddefault.
      const maxRes = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      const sd = `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`;
      img.src = maxRes;
      img.addEventListener("load", () => {
        if (img.naturalWidth <= 120) img.src = sd;
      }, { once: true });
    } else {
      img.src = video.thumbnail;
    }

    poster.appendChild(img);
    media.niniPoster = poster;
    poster.addEventListener("click", () => {
      stopAllVideos(media);
      pauseAllSpotify();
      media.replaceChildren(createYouTubeIframe(embedUrl, video.title));
    });
    media.appendChild(poster);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "video__placeholder";
    placeholder.textContent = video.videoUrl || "[REPLACE_WITH_VIDEO_URL]";
    media.appendChild(placeholder);
  }

  const meta = document.createElement("div");
  meta.className = "video__meta";

  const title = document.createElement("h3");
  title.className = "video__title";
  title.textContent = video.title;

  const caption = document.createElement("p");
  caption.className = "video__caption";
  caption.textContent = video.caption || "";

  meta.append(title, caption);
  article.append(media, meta);
  return article;
}

function renderVideos() {
  const videos = siteContent.videos;
  if (!videos) return;

  const titleEl = document.querySelector("[data-videos-title]");
  const featuredEl = document.querySelector("[data-videos-featured]");
  const gridEl = document.querySelector("[data-videos-grid]");
  const extraEl = document.querySelector("[data-videos-extra]");
  const viewAllEl = document.querySelector("[data-videos-view-all]");

  if (titleEl) titleEl.textContent = videos.sectionTitle;
  if (featuredEl && videos.featured) {
    featuredEl.replaceChildren(createVideoCard(videos.featured, true));
  }
  if (gridEl) {
    gridEl.replaceChildren(
      ...(videos.items || [])
        .filter((video) => !isPlaceholder(video.videoUrl))
        .slice(0, 7)
        .map((video) => createVideoCard(video))
    );
  }

  if (viewAllEl) {
    viewAllEl.textContent = videos.viewAllLabel;
    const hasMore = Array.isArray(videos.more) && videos.more.length > 0;
    const hasHref = !isPlaceholder(videos.viewAllHref);

    if (hasHref) {
      viewAllEl.setAttribute("href", videos.viewAllHref);
      viewAllEl.hidden = false;
    } else if (hasMore && extraEl) {
      viewAllEl.hidden = false;
      viewAllEl.setAttribute("href", "#videos-all");
      extraEl.replaceChildren(
        ...videos.more.map((video) => createVideoCard(video))
      );
      viewAllEl.addEventListener("click", (event) => {
        event.preventDefault();
        extraEl.hidden = false;
        extraEl.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else if (!isPlaceholder(links.youtube)) {
      viewAllEl.setAttribute("href", links.youtube);
      viewAllEl.hidden = false;
    } else {
      // No real YouTube link yet, so hide the button instead of linking nowhere.
      viewAllEl.hidden = true;
    }
  }
}

function createUpdateCard(update) {
  const article = document.createElement("article");
  article.className = "update";

  if (update.date) {
    const date = document.createElement("p");
    date.className = "update__date";
    date.textContent = update.date;
    article.appendChild(date);
  }

  const title = document.createElement("h3");
  title.className = "update__title";
  title.textContent = update.title;

  const text = document.createElement("p");
  text.className = "update__text";
  text.textContent = update.text;

  article.append(title, text);

  // Only add the link when there is a real URL to point at.
  if (!isPlaceholder(update.linkHref)) {
    const link = document.createElement("a");
    link.className = "update__link";
    link.href = update.linkHref;
    link.textContent = update.linkLabel || "Read more";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    article.appendChild(link);
  }

  return article;
}

function renderUpdates() {
  const updates = siteContent.updates;
  const section = document.querySelector("#updates");
  if (!section) return;

  const items = (updates && updates.items) || [];
  // No updates written yet means no empty section on the page.
  if (!updates || items.length === 0) {
    section.hidden = true;
    return;
  }

  const eyebrowEl = document.querySelector("[data-updates-eyebrow]");
  const titleEl = document.querySelector("[data-updates-title]");
  const gridEl = document.querySelector("[data-updates-grid]");

  if (eyebrowEl) eyebrowEl.textContent = updates.eyebrow;
  if (titleEl) titleEl.textContent = updates.sectionTitle;
  if (gridEl) {
    gridEl.replaceChildren(...items.slice(0, 3).map(createUpdateCard));
    gridEl.dataset.count = String(Math.min(items.length, 3));
  }

  section.hidden = false;
}

/**
 * Socials
 * Icon links come from the `links` object in js/content.js.
 * Shown in the right-side rail and reused in the footer.
 * To change the order, edit the list below.
 */
const SOCIAL_PLATFORMS = [
  { key: "discord", label: "Discord" },
  { key: "tiktok", label: "TikTok" },
  { key: "youtube", label: "YouTube" },
  { key: "spotify", label: "Spotify" },
];

const SOCIAL_ICONS = {
  discord:
    '<path fill="currentColor" d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>',
  tiktok:
    '<path fill="currentColor" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>',
  youtube:
    '<path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
  spotify:
    '<path fill="currentColor" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.381-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>',
};

function createSocialIcon(key) {
  const wrap = document.createElement("span");
  wrap.innerHTML = `<svg class="socials__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${SOCIAL_ICONS[key] || ""}</svg>`;
  return wrap.firstElementChild;
}

function renderSocials() {
  const rail = document.querySelector("[data-social-rail]");
  const listEl = document.querySelector("[data-social-rail-list]");
  if (!rail || !listEl) return;

  const items = SOCIAL_PLATFORMS.flatMap((platform) => {
    const url = links[platform.key];
    if (isPlaceholder(url)) return [];

    const item = document.createElement("li");
    const link = document.createElement("a");
    link.className = "social-rail__link";
    link.href = url;
    link.setAttribute("aria-label", platform.label);
    link.title = platform.label;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.appendChild(createSocialIcon(platform.key));
    item.appendChild(link);
    return [item];
  });

  listEl.replaceChildren(...items);
  rail.hidden = items.length === 0;
}

function updateSocialRailVisibility() {
  const rail = document.querySelector("[data-social-rail]");
  const music = document.querySelector("#music");
  if (!rail || rail.hidden || !music) return;

  const header = document.querySelector(".site-header");
  const line = header ? header.getBoundingClientRect().bottom : 68;
  const reachedMusic = music.getBoundingClientRect().top <= line;
  rail.classList.toggle("is-away", reachedMusic);
  rail.setAttribute("aria-hidden", reachedMusic ? "true" : "false");
}

function initSocialRail() {
  let frame = 0;
  function onScrollOrResize() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      updateSocialRailVisibility();
    });
  }

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
  updateSocialRailVisibility();
}

function postToMailchimp(actionUrl, email, honeypotName) {
  return new Promise((resolve, reject) => {
    let jsonUrl;
    try {
      jsonUrl = new URL(actionUrl.replace("/subscribe/post?", "/subscribe/post-json?"));
    } catch {
      reject(new Error("bad-url"));
      return;
    }

    const callbackName = "mcCallback_" + Date.now();
    jsonUrl.searchParams.set("EMAIL", email);
    jsonUrl.searchParams.set("subscribe", "Subscribe");
    jsonUrl.searchParams.set("c", callbackName);
    if (honeypotName) jsonUrl.searchParams.set(honeypotName, "");

    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("timeout"));
    }, 10000);

    function cleanup() {
      window.clearTimeout(timeout);
      try {
        delete window[callbackName];
      } catch {
        window[callbackName] = undefined;
      }
      script.remove();
    }

    window[callbackName] = (data) => {
      cleanup();
      resolve(data);
    };

    script.src = jsonUrl.toString();
    script.onerror = () => {
      cleanup();
      reject(new Error("network"));
    };
    document.body.appendChild(script);
  });
}

/**
 * Mailing list (Mailchimp)
 * The form posts straight to Mailchimp's own URL, so there is no server
 * to run and no API key anywhere in this code. Wording and the form URL
 * live in js/content.js.
 */
function renderMailingList() {
  const mailing = siteContent.mailingList;
  const form = document.querySelector("[data-mailing-form]");
  if (!mailing || !form) return;

  const eyebrowEl = document.querySelector("[data-mailing-eyebrow]");
  const titleEl = document.querySelector("[data-mailing-title]");
  const textEl = document.querySelector("[data-mailing-text]");
  const labelEl = document.querySelector("[data-mailing-label]");
  const inputEl = form.querySelector('input[name="EMAIL"]');
  const buttonEl = document.querySelector("[data-mailing-button]");
  const noteEl = document.querySelector("[data-mailing-note]");
  const honeypotEl = document.querySelector("[data-mailing-honeypot]");

  if (eyebrowEl) eyebrowEl.textContent = mailing.eyebrow;
  if (titleEl) titleEl.textContent = mailing.title;
  if (textEl) textEl.textContent = mailing.text;
  if (labelEl) labelEl.textContent = mailing.emailLabel;
  if (buttonEl) buttonEl.textContent = mailing.buttonLabel;
  if (inputEl) inputEl.placeholder = mailing.emailPlaceholder;

  const isConnected = !isPlaceholder(mailing.formAction);
  const formAction = isConnected ? mailing.formAction.replace(/&amp;/g, "&") : "";

  if (isConnected) {
    if (honeypotEl && !isPlaceholder(mailing.honeypotName)) {
      honeypotEl.name = mailing.honeypotName;
    }
  } else if (buttonEl) {
    buttonEl.disabled = true;
  }

  function setNote(message, isError) {
    if (!noteEl) return;
    noteEl.textContent = message;
    noteEl.classList.toggle("mailing__note--error", Boolean(isError));
  }

  function plainText(value) {
    return String(value || "").replace(/<[^>]*>/g, "").trim();
  }

  if (!isConnected) {
    setNote("Sign-up is not connected yet. Add your Mailchimp form URL in js/content.js.");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!isConnected) return;

    const value = inputEl ? inputEl.value.trim() : "";

    // checkValidity uses the browser's own email rules, so we do not
    // have to maintain a pattern of our own.
    if (!value || !inputEl.checkValidity()) {
      setNote("Please enter a valid email address.", true);
      inputEl.focus();
      return;
    }

    if (buttonEl) buttonEl.disabled = true;
    setNote("Sending…");

    try {
      const data = await postToMailchimp(
        formAction,
        value,
        honeypotEl && honeypotEl.name ? honeypotEl.name : ""
      );

      if (data && data.result === "success") {
        setNote(plainText(data.msg) || mailing.successMessage);
        form.reset();
      } else {
        setNote(plainText(data && data.msg) || "Mailchimp could not add that email. Please try again.", true);
      }
    } catch {
      setNote("Something went wrong. Please try again.", true);
    } finally {
      if (buttonEl && isConnected) buttonEl.disabled = false;
    }
  });
}

/**
 * Contact form
 * The message is sent to the form service named in js/content.js
 * (Formspree by default). Nothing is saved on this site, and there is
 * no password or key involved.
 */
function renderContact() {
  const contact = siteContent.contact;
  const form = document.querySelector("[data-contact-form]");
  if (!contact || !form) return;

  const nameEl = form.querySelector("#contact-name");
  const emailEl = form.querySelector("#contact-email");
  const messageEl = form.querySelector("#contact-message");
  const honeypotEl = form.querySelector("[data-contact-honeypot]");
  const buttonEl = document.querySelector("[data-contact-button]");
  const noteEl = document.querySelector("[data-contact-note]");
  const directEl = document.querySelector("[data-contact-direct]");

  const text = {
    "[data-contact-eyebrow]": contact.eyebrow,
    "[data-contact-title]": contact.title,
    "[data-contact-text]": contact.text,
    "[data-contact-name-label]": contact.nameLabel,
    "[data-contact-email-label]": contact.emailLabel,
    "[data-contact-message-label]": contact.messageLabel,
  };

  Object.entries(text).forEach(([selector, value]) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  });

  if (nameEl) nameEl.placeholder = contact.namePlaceholder;
  if (emailEl) emailEl.placeholder = contact.emailPlaceholder;
  if (messageEl) messageEl.placeholder = contact.messagePlaceholder;
  if (buttonEl) buttonEl.textContent = contact.buttonLabel;

  function setNote(message, isError) {
    if (!noteEl) return;
    noteEl.textContent = message;
    noteEl.classList.toggle("contact__note--error", Boolean(isError));
  }

  // The business email is written once, in the `socials` block.
  const businessEmail = (siteContent.socials || {}).businessEmail;
  if (directEl && !isPlaceholder(businessEmail)) {
    const label = document.createElement("span");
    label.textContent = `${contact.directEmailLabel} `;

    const mailto = document.createElement("a");
    mailto.className = "contact__direct-link";
    mailto.href = `mailto:${businessEmail}`;
    mailto.textContent = businessEmail;

    directEl.replaceChildren(label, mailto);
    directEl.hidden = false;
  }

  const isConnected = !isPlaceholder(contact.formEndpoint);
  if (!isConnected) {
    if (buttonEl) buttonEl.disabled = true;
    setNote("The form is not connected yet. Add your form service URL in js/content.js.");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!isConnected) return;

    // A filled spam trap means a bot, so stop quietly.
    if (honeypotEl && honeypotEl.value) return;

    // checkValidity uses the browser's own rules for required fields
    // and email format, so there is no pattern to maintain here.
    const firstInvalid = [nameEl, emailEl, messageEl].find(
      (field) => field && !field.checkValidity()
    );

    if (firstInvalid) {
      setNote("Please fill in your name, a valid email, and a message.", true);
      firstInvalid.focus();
      return;
    }

    if (buttonEl) buttonEl.disabled = true;
    setNote(contact.sendingMessage);

    try {
      const response = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: nameEl.value.trim(),
          email: emailEl.value.trim(),
          message: messageEl.value.trim(),
        }),
      });

      if (!response.ok) throw new Error("Form service rejected the message");

      form.reset();
      setNote(contact.successMessage);
    } catch {
      setNote(contact.errorMessage, true);
    } finally {
      if (buttonEl) buttonEl.disabled = false;
    }
  });
}

/**
 * Footer
 * Copyright year is set automatically. Social links reuse the `links`
 * object in js/content.js. Edit labels in the `footer` block there.
 */
function renderFooter() {
  const footer = siteContent.footer || {};
  const nameEl = document.querySelector("[data-footer-name]");
  const copyEl = document.querySelector("[data-footer-copy]");
  const socialsEl = document.querySelector("[data-footer-socials]");
  const extrasEl = document.querySelector("[data-footer-extras]");
  const topEl = document.querySelector("[data-footer-top]");

  if (nameEl) nameEl.textContent = footer.name || "Nini";
  if (topEl) topEl.textContent = footer.backToTop || "Back to top";

  if (copyEl) {
    const year = new Date().getFullYear();
    const rights = footer.copyright || "All rights reserved.";
    copyEl.textContent = `© ${year} ${siteContent.siteName}. ${rights}`;
  }

  if (socialsEl) {
    const items = SOCIAL_PLATFORMS.map((platform) => {
      const url = links[platform.key];
      if (isPlaceholder(url)) return null;

      const item = document.createElement("li");
      const link = document.createElement("a");
      link.className = "site-footer__social-link";
      link.href = url;
      link.setAttribute("aria-label", platform.label);
      link.title = platform.label;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.appendChild(createSocialIcon(platform.key));
      item.appendChild(link);
      return item;
    }).filter(Boolean);

    socialsEl.replaceChildren(...items);
    socialsEl.hidden = items.length === 0;
  }

  if (extrasEl) {
    const extras = (footer.extraLinks || []).filter(
      (link) => link && !isPlaceholder(link.href)
    );

    extrasEl.replaceChildren(
      ...extras.map((extra) => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = extra.href;
        link.textContent = extra.label;
        item.appendChild(link);
        return item;
      })
    );
    extrasEl.hidden = extras.length === 0;
  }
}

initTheme();
initNav();
renderHero();
renderAbout();
renderMusic();
renderVideos();
renderUpdates();
renderSocials();
initSocialRail();
renderMailingList();
renderContact();
renderFooter();
