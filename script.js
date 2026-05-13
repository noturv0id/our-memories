const SUPABASE_URL = "https://ytrbsxknhlsfqkqphlms.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_oyurIPBCFJuFsjN0L6LyIg_PaXihCYn";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const ANNIVERSARY_WRAPPER_VERSION = "20260511-1";
const STICKER_MIME_TYPE = "application/x-our-memories-sticker";
const ENTRY_IMAGE_BUCKET = "profile-pictures";
const GIPHY_API_KEY = "34udc7WiSDjXKrRbb9UgwcD2piNXT3uO";
const GIPHY_CLIENT_KEY = "our_memories_sticker_box";
const GIPHY_SEARCH_ENDPOINT = "https://api.giphy.com/v1/gifs/search";
const GIPHY_STICKER_SEARCH_ENDPOINT = "https://api.giphy.com/v1/stickers/search";
const OPEN_METEO_FORECAST_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
const WEATHER_WIDGET_LOCATIONS = [
  { label: "Hateen, Kuwait", latitude: 29.28233, longitude: 48.02874 },
  { label: "Dammam, Saudi Arabia", latitude: 26.43442, longitude: 50.10326 },
];
const PROFILE_ACTIVE_WINDOW_MS = 5 * 60 * 1000;
const PROFILE_PRESENCE_HEARTBEAT_MS = 60 * 1000;

function getAnniversaryWrapperUrl() {
  return `./anniversary-wrapper.html?v=${ANNIVERSARY_WRAPPER_VERSION}`;
}
const RECENT_GIF_STORAGE_KEY = "recentGifStickers";
const RECENT_GIPHY_STICKER_STORAGE_KEY = "recentGiphyStickers";
const PLACED_GIF_SIZE_STORAGE_KEY = "placedGifStickerSizes";
const PLACED_STICKER_POSITION_STORAGE_KEY = "placedStickerPositions";
const PROFILE_BIO_STORAGE_KEY = "profileBioByUser";
const WIDGET_COMMENT_SEEN_STORAGE_KEY = "widgetCommentSeenAtByUser";
const PROFILE_BIO_WIDGET_ID = "__profile-bios";
const PROFILE_BIO_WIDGET_TITLE = "profile bios";
const APP_ZOOM_STORAGE_KEY = "appZoom";
const DEFAULT_APP_ZOOM = 1;
const MIN_APP_ZOOM = 0.25;
const MAX_APP_ZOOM = 2;
const APP_ZOOM_STEP = 0.05;
const DEFAULT_GIF_STICKER_SIZE = 72;
const MIN_GIF_STICKER_SIZE = 44;
const MAX_GIF_STICKER_SIZE = 200;
let hasRenderedEmojiPicker = false;
let gifSearchResults = [];
let gifSearchQuery = "";
let activeGiphySearchType = "gif";
let activeStickerSize = null;
const STICKER_PICKER_GROUPS = [
  {
    label: "hearts + symbols",
    emojis:
      "♡ ♥ ❤ 💕 💖 💗 💘 💙 💚 💛 💜 🖤 🤍 🤎 💔 ❣️ 💞 💓 💟 ☀️ ⭐ 🌟 ✨ ⚡ 💫 🔥 🌈 ☁️ 🌙 🌻 🌸 🌷 🪷 🍀 🎀 🎁 🎈 🫧 💌 📸 🎵 🎶".split(
        " ",
      ),
  },
  {
    label: "smileys",
    emojis:
      "😀 😃 😄 😁 😆 😅 😂 🙂 🙃 😉 😊 😇 🥰 😍 🤩 😘 😗 ☺️ 😚 😙 🥲 😋 😛 😜 🤪 😝 🫠 🤗 🤭 🫢 🤫 🤔 🫡 🤐 🤨 😐 😑 😶 🫥 😏 😒 🙄 😬 😮‍💨 🤥 😌 😔 😪 🤤 😴 😷 🤒 🤕 🤢 🤮 🤧 🥵 🥶 😵 😵‍💫 🤯 🥴 😎 🤓 🧐 😕 🫤 😟 🙁 ☹️ 😮 😯 😲 😳 🥺 🥹 😦 😧 😨 😰 😥 😢 😭 😱 😖 😣 😞 😓 😩 😫 🥱 😤 😡 😠 🤬 😈 👿 💀 ☠️ 💩 🤡 👻 👽 🤖".split(
        " ",
      ),
  },
  {
    label: "people",
    emojis:
      "👋 🤚 🖐️ ✋ 🖖 🫶 🫰 🫳 🫴 👌 🤌 🤏 ✌️ 🤞 🫡 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🙏 ✍️ 💅 🤳 💪 🦾 🦿 🦵 🦶 👂 🦻 👃 🧠 🫀 🫁 👀 👁️ 👄 👶 🧒 👦 👧 🧑 👱 👨 🧔 👩 👵 👴".split(
        " ",
      ),
  },
  {
    label: "animals + nature",
    emojis:
      "🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐻‍❄️ 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🙈 🙉 🙊 🐔 🐧 🐦 🐤 🐣 🦆 🦅 🦉 🦇 🐺 🐗 🐴 🦄 🐝 🪲 🦋 🐌 🐞 🐢 🐍 🦎 🦂 🦀 🐙 🐠 🐟 🐬 🐳 🐋 🦭 🪼 🌱 🌿 ☘️ 🍃 🍂 🍁 🌵 🌴 🌳 🌲 🌹 🌺 🌼 🌸 🌞 🌝 🌛 🌜 ⭐ 🌎 🌍 🌏".split(
        " ",
      ),
  },
  {
    label: "food + drink",
    emojis:
      "🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🥑 🫒 🥕 🌽 🌶️ 🫑 🥒 🥬 🥦 🧄 🧅 🍄 🥜 🫘 🍞 🥐 🥖 🫓 🥨 🥯 🧀 🍳 🧈 🥞 🧇 🥓 🍔 🍟 🍕 🌭 🌮 🌯 🥪 🥙 🧆 🍝 🍜 🍲 🍛 🍣 🍱 🍤 🍙 🍚 🍘 🍥 🍡 🍦 🍧 🍨 🍩 🍪 🎂 🍰 🧁 🍫 🍬 🍭 ☕ 🍵 🧃 🥤 🧋".split(
        " ",
      ),
  },
  {
    label: "activities + travel",
    emojis:
      "⚽ 🏀 🏈 ⚾ 🎾 🏐 🏉 🎱 🪀 🏓 🏸 🥅 🥊 🎳 🎮 🕹️ 🎲 ♟️ 🎯 🎨 🎭 🎤 🎧 🎼 🎹 🥁 🎷 🎺 🎸 🪕 🎻 🛼 🛹 🛴 🚲 🛵 🏎️ 🚗 🚕 🚙 🚌 🚎 🚓 🚑 🚒 🚚 🚲 ✈️ 🛫 🛬 🚀 🛸 🚁 ⛵ 🚤 🚢 🗺️ 🧭 ⛺ 🏕️ 🗽 🗼 🏰 🎡 🎢 🎠 🌋 🏝️ 🏖️ 🏜️ 🏞️".split(
        " ",
      ),
  },
  {
    label: "objects",
    emojis:
      "⌚ 📱 💻 ⌨️ 🖥️ 🖨️ 🖱️ 💾 💿 📷 📹 🎥 📞 ☎️ 📺 📻 🎙️ ⏰ ⌛ ⏳ 🔋 🔌 💡 🔦 🕯️ 🧯 🪞 🚿 🛁 🧼 🪥 🧽 🧸 🛍️ 💎 🔑 🗝️ 🔒 🔓 🧰 🧲 🪜 ⚙️ 🪛 🔧 🔨 ⚒️ 🧱 🪵 🧪 🧫 🧬 💊 💉 🩹 🩺 📚 📖 📝 ✏️ 📌 📍 ✂️ 📎 📐 📏 💰 💳 💵 💴 💶 💷 ⚖️ 🔔 🛎️".split(
        " ",
      ),
  },
  {
    label: "symbols",
    emojis:
      "➕ ➖ ✖️ ➗ 🟰 ♾️ ‼️ ⁉️ ❓ ❔ ❕ ❗ 〰️ 💱 💲 ⚜️ 🔱 📛 🔰 ⭕ ✅ ☑️ ✔️ ❌ ❎ ➰ ➿ 〽️ ✳️ ✴️ ❇️ ©️ ®️ ™️ #️⃣ *️⃣ 0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 ⏺️ ⏹️ ⏸️ ▶️ ⏯️ ◀️ 🔼 🔽 ⏫ ⏬ ◾ ◽ ▪️ ▫️ ⬛ ⬜ 🟥 🟧 🟨 🟩 🟦 🟪 🟫 🔺 🔻 🔶 🔷 🔸 🔹".split(
        " ",
      ),
  },
];
const floatingDecor = [
  { icon: "✦", top: "4%", left: "5%", size: "22px", delay: "0s" },
  { icon: "♡", top: "8%", right: "8%", size: "28px", delay: "0.6s" },
  { icon: "☁", top: "16%", left: "18%", size: "34px", delay: "1.2s" },
  { icon: "🎀", top: "14%", right: "20%", size: "28px", delay: "1.8s" },
  { icon: "✦", top: "26%", left: "10%", size: "20px", delay: "0.9s" },
  { icon: "♡", top: "34%", right: "10%", size: "24px", delay: "1.4s" },
  { icon: "☁", top: "48%", left: "4%", size: "34px", delay: "2.2s" },
  { icon: "✦", top: "57%", right: "18%", size: "22px", delay: "0.3s" },
  { icon: "🎀", top: "70%", left: "14%", size: "28px", delay: "1.7s" },
  { icon: "♡", top: "78%", right: "5%", size: "28px", delay: "2.5s" },
  { icon: "☁", top: "86%", left: "24%", size: "34px", delay: "0.8s" },
  { icon: "✦", top: "90%", right: "24%", size: "20px", delay: "1.9s" },
  { icon: "♡", top: "18%", left: "48%", size: "18px", delay: "1.3s" },
  { icon: "✦", top: "64%", left: "52%", size: "18px", delay: "2.1s" },
  { icon: "☁", top: "8%", left: "72%", size: "26px", delay: "0.5s" },
];
const sparkleDecor = Array.from({ length: 42 }, (_, index) => ({
  icon: "✦",
  top: `${((index * 37) % 96) + 1}%`,
  left: `${((index * 53) % 96) + 1}%`,
  size: `${30 + (index % 4)}px`,
  delay: `${(index % 14) * 0.32}s`,
  duration: `${3.4 + (index % 6) * 0.45}s`,
}));
const fadingEmojiIcons = ["♡", "ᰔ", "✧", "☾", "☁", "🎀", "🌸", "💌", "🫧"];
const fadingEmojiDecor = Array.from({ length: 34 }, (_, index) => ({
  icon: fadingEmojiIcons[index % fadingEmojiIcons.length],
  top: `${((index * 37 + 19) % 96) + 1}%`,
  left: `${((index * 53 + 31) % 96) + 1}%`,
  size: `${18 + (index % 4) * 2}px`,
  delay: `${(index % 14) * 0.32}s`,
  duration: `${3.4 + (index % 6) * 0.45}s`,
}));

let widgets = [
  {
    id: "song",
    title: "₊˚⊹ now playing ♫",
    side: "left",
    x: 8,
    y: 20,
    data: {
      spotifyUrl: "",
      spotifyUri: "",
      songName: "",
      durationLabel: "",
      coverUrl: "",
      accent: 38,
    },
  },
  {
    id: "⋆𐙚₊little note˚⊹♡",
    title: "⋆𐙚₊smol note˚⊹♡",
    side: "left",
    x: 16,
    y: 255,
    data: {
      text: "",
    },
  },

  {
    id: ". ݁₊ ⊹ . ݁ dates ݁ . ⊹ ₊ ݁.",
    title: "⊹ ࣪ ˖important dates⊹ ࣪ ˖",
    side: "right",
    x: 8,
    y: 34,
    data: {
      items: [
        {
          id: crypto.randomUUID ? crypto.randomUUID() : "date1",
          title: "birthday",
          date: "2026-05-08",
        },
        {
          id: crypto.randomUUID ? crypto.randomUUID() : "date2",
          title: "anniversary",
          date: "2026-06-01",
        },
      ],
    },
  },

  {
    id: "𓂃˖˳·˖ ִֶָ ⋆wishlist⋆ ִֶָ˖·˳˖𓂃",
    title: "𓂃˖˳·˖ ִֶָ ⋆wishlist⋆ ִֶָ˖·˳˖𓂃",
    side: "left",
    x: 4,
    y: 470,
    data: {
      items: [
        {
          id: crypto.randomUUID ? crypto.randomUUID() : "wish1",
          text: "picnic date",
          done: false,
        },
        {
          id: crypto.randomUUID ? crypto.randomUUID() : "wish2",
          text: "bake brownies together",
          done: false,
        },
      ],
    },
  },

  {
    id: "weather",
    title: "☁ ˚｡ weather ₊˚",
    side: "left",
    x: 8,
    y: 620,
    data: {
      locations: [],
      status: "idle",
    },
  },

  {
    id: "miss-you",
    title: "˚₊‧ i miss you counter ‧₊˚",
    side: "right",
    x: 8,
    y: 610,
    data: {
      countsByUser: {},
      totalCountsByUser: {},
      lastResetDate: "",
    },
  },

  {
    id: "love",
    title: "｡ ₊°༺ together for ༻°₊ ｡",
    side: "right",
    x: 28,
    y: 245,
    data: {
      startDate: "2025-04-22",
    },
  },

  {
    id: "sweet-reminder",
    title: "⊹˚₊ ♡ toto’s gift ♡ ₊˚⊹",
    side: "right",
    x: 10,
    y: 352,
    content: `
      <div style="display:grid;gap:12px;">
         <a
           class="soft-btn widget-miss-you-btn"
           href="${getAnniversaryWrapperUrl()}"
           target="_blank"
           style="justify-self:center;text-decoration:none;display:inline-flex;align-items:center;"
         >
           click me
         </a>
      </div>
    `,
  },

  {
    id: "entry-preview",
    title: "⊹˚₊ ♡ TOTO’S POEMS ♡ ₊˚⊹",
    side: "right",
    x: 10,
    y: 470,
    data: {
      buttonLabel: "open entries",
      entries: [
        {
          id: "entry-preview-1",
          title: "for you ♡",
          text: "write the entries you want this widget to preview here ♡",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    },
  },

  {
    id: "photo-pin",
    title: "₊˚⊹ pin it ♡",
    side: "left",
    x: 12,
    y: 760,
    data: {
      image: "",
      text: "",
      textColor: "#ffffff",
      textSize: 22,
      textX: 50,
      textY: 86,
      rotate: 0,
    },
  },

  {
    id: "photo-pin-right",
    title: "♡ pin it ⊹˚₊",
    side: "right",
    x: 12,
    y: 760,
    data: {
      image: "",
      text: "",
      textColor: "#ffffff",
      textSize: 22,
      textX: 50,
      textY: 86,
      rotate: 0,
    },
  },
];

function getWidgetDataObject(widget) {
  if (
    widget?.data &&
    typeof widget.data === "object" &&
    !Array.isArray(widget.data)
  ) {
    return widget.data;
  }

  return {};
}

function getWidgetMobileOrder(widget, fallbackOrder = 0) {
  const mobileOrder = getWidgetDataObject(widget).mobileOrder;
  return Number.isFinite(mobileOrder) ? mobileOrder : fallbackOrder;
}

function setWidgetMobileOrder(widget, order) {
  widget.data = {
    ...getWidgetDataObject(widget),
    mobileOrder: order,
  };
}

function normalizeWidgetMobileOrders(widgetList = widgets) {
  const sideOrders = {
    left: new Set(),
    right: new Set(),
  };

  const needsReset = widgetList.some((widget) => {
    const side = widget?.side === "right" ? "right" : "left";
    const mobileOrder = getWidgetDataObject(widget).mobileOrder;

    if (!Number.isFinite(mobileOrder) || sideOrders[side].has(mobileOrder)) {
      return true;
    }

    sideOrders[side].add(mobileOrder);
    return false;
  });

  if (!needsReset) {
    return [];
  }

  const sideCounts = {
    left: 0,
    right: 0,
  };
  const changedWidgets = [];

  widgetList.forEach((widget) => {
    const side = widget?.side === "right" ? "right" : "left";
    const nextOrder = sideCounts[side];
    sideCounts[side] += 1;

    if (getWidgetMobileOrder(widget, -1) !== nextOrder) {
      setWidgetMobileOrder(widget, nextOrder);
      changedWidgets.push(widget);
    }
  });

  return changedWidgets;
}

function getWidgetsForSideInMobileOrder(side) {
  return [...widgets]
    .filter((widget) => (widget?.side === "right" ? "right" : "left") === side)
    .sort((a, b) => {
      const orderDifference =
        getWidgetMobileOrder(a, 0) - getWidgetMobileOrder(b, 0);

      if (orderDifference !== 0) {
        return orderDifference;
      }

      return (a.zIndex || 0) - (b.zIndex || 0);
    });
}

const MOBILE_WIDGET_LAYOUT = {
  right: ["photo-pin", "photo-pin-right", "miss-you", "song", "note"],
  left: [
    "wishlist",
    "weather",
    "dates",
    "reminder-copy",
    "entry-preview-copy",
    "love",
  ],
};

function getWidgetMobileTabOrders(widget) {
  const data = getWidgetDataObject(widget);
  return data.mobileTabOrders && typeof data.mobileTabOrders === "object"
    ? data.mobileTabOrders
    : {};
}

function getWidgetMobileTabOrder(widget, side, fallbackOrder = 0) {
  const order = Number(getWidgetMobileTabOrders(widget)[side]);
  return Number.isFinite(order) ? order : fallbackOrder;
}

function setWidgetMobileTabOrder(widget, side, order) {
  const data = getWidgetDataObject(widget);
  widget.data = {
    ...data,
    mobileTabOrders: {
      ...(data.mobileTabOrders && typeof data.mobileTabOrders === "object"
        ? data.mobileTabOrders
        : {}),
      [side]: order,
    },
  };
}

function getWidgetMobileRole(widget) {
  const normalizedId = String(widget?.id || "")
    .toLowerCase()
    .trim();
  const normalizedTitle = String(widget?.title || "").toLowerCase();

  if (normalizedId === "song") return "song";
  if (normalizedId === "weather" || normalizedTitle.includes("weather"))
    return "weather";
  if (
    normalizedId === "miss-you" ||
    normalizedTitle.includes("miss you counter")
  )
    return "miss-you";
  if (normalizedId === "love") return "love";
  if (normalizedId === "sweet-reminder") return "reminder";
  if (normalizedId === "entry-preview") return "entry-preview";
  if (normalizedId === "wishlist" || normalizedTitle.includes("wishlist"))
    return "wishlist";
  if (normalizedId === "dates" || normalizedTitle.includes("important dates"))
    return "dates";
  if (
    normalizedId === "note" ||
    normalizedTitle.includes("little note") ||
    normalizedTitle.includes("smol note")
  )
    return "note";
  if (normalizedId === "photo-pin" || normalizedId === "photo-pin-right")
    return normalizedId;
  if (
    normalizedTitle.includes("pinned photo") ||
    normalizedTitle.includes("pinned") ||
    normalizedTitle.includes("pin it")
  )
    return "photo-pin";

  return "";
}

function getMobileWidgetForRole(role) {
  const lookupRole =
    role === "reminder-copy"
      ? "reminder"
      : role === "entry-preview-copy"
        ? "entry-preview"
        : role;
  return widgets.find((widget) => getWidgetMobileRole(widget) === lookupRole);
}

function getMobileWidgetRenderItems() {
  return Object.entries(MOBILE_WIDGET_LAYOUT).flatMap(([side, roles]) =>
    roles.flatMap((role, order) => {
      const widget = getMobileWidgetForRole(role);
      if (!widget) return [];

      const isVirtualCopy =
        role === "reminder-copy" || role === "entry-preview-copy";
      return {
        widget: isVirtualCopy
          ? {
              ...widget,
              id: `${widget.id}-mobile-left`,
              side,
              zIndex: widget.zIndex || 1,
            }
          : widget,
        renderId: isVirtualCopy ? `${widget.id}-mobile-left` : widget.id,
        sourceId: widget.id,
        side,
        order: getWidgetMobileTabOrder(widget, side, order),
        isVirtual: isVirtualCopy,
      };
    }),
  );
}

function sortMobileRenderItems(items) {
  return [...items].sort((a, b) => {
    const orderDifference = a.order - b.order;
    if (orderDifference !== 0) return orderDifference;
    return (
      MOBILE_WIDGET_LAYOUT[a.side].indexOf(a.renderId) -
      MOBILE_WIDGET_LAYOUT[b.side].indexOf(b.renderId)
    );
  });
}

async function moveMobileWidgetInOrder(renderId, direction) {
  const renderItems = getMobileWidgetRenderItems();
  const currentItem = renderItems.find((item) => item.renderId === renderId);
  if (!currentItem) return;

  const sideItems = sortMobileRenderItems(
    renderItems.filter((item) => item.side === currentItem.side),
  );
  const currentIndex = sideItems.findIndex(
    (item) => item.renderId === renderId,
  );
  const targetIndex =
    direction === "up"
      ? currentIndex - 1
      : direction === "down"
        ? currentIndex + 1
        : currentIndex;

  if (
    currentIndex === -1 ||
    targetIndex < 0 ||
    targetIndex >= sideItems.length
  ) {
    return;
  }

  [sideItems[currentIndex], sideItems[targetIndex]] = [
    sideItems[targetIndex],
    sideItems[currentIndex],
  ];

  const changedWidgets = [];
  sideItems.forEach((item, index) => {
    const sourceWidget = widgets.find((widget) => widget.id === item.sourceId);
    if (!sourceWidget) return;

    if (getWidgetMobileTabOrder(sourceWidget, item.side, -1) !== index) {
      setWidgetMobileTabOrder(sourceWidget, item.side, index);
      changedWidgets.push(sourceWidget);
    }
  });

  renderWidgets();

  const uniqueChangedWidgets = changedWidgets.filter(
    (widget, index, list) =>
      list.findIndex((item) => item.id === widget.id) === index,
  );
  const saveResults = await Promise.all(
    uniqueChangedWidgets.map((item) =>
      saveWidgetToSupabase(item, {
        recordHistory: false,
        suppressErrorMessage: true,
      }),
    ),
  );

  if (saveResults.some((didSave) => !didSave)) {
    showMessage("could not save widget order");
  }
}

async function moveWidgetInMobileOrder(widgetId, direction) {
  if (isTabbedLayoutActive()) {
    await moveMobileWidgetInOrder(widgetId, direction);
    return;
  }

  const widget = widgets.find((item) => item.id === widgetId);
  if (!widget) return;

  const side = widget.side === "right" ? "right" : "left";
  const orderedWidgets = getWidgetsForSideInMobileOrder(side);
  const currentIndex = orderedWidgets.findIndex((item) => item.id === widgetId);
  const targetIndex =
    direction === "up"
      ? currentIndex - 1
      : direction === "down"
        ? currentIndex + 1
        : currentIndex;

  if (
    currentIndex === -1 ||
    targetIndex < 0 ||
    targetIndex >= orderedWidgets.length
  ) {
    return;
  }

  [orderedWidgets[currentIndex], orderedWidgets[targetIndex]] = [
    orderedWidgets[targetIndex],
    orderedWidgets[currentIndex],
  ];

  const changedWidgets = [];

  orderedWidgets.forEach((item, index) => {
    if (getWidgetMobileOrder(item, -1) !== index) {
      setWidgetMobileOrder(item, index);
      changedWidgets.push(item);
    }
  });

  renderWidgets();

  const saveResults = await Promise.all(
    changedWidgets.map((item) =>
      saveWidgetToSupabase(item, {
        recordHistory: false,
        suppressErrorMessage: true,
      }),
    ),
  );

  if (saveResults.some((didSave) => !didSave)) {
    showMessage("could not save widget order");
  }
}

normalizeWidgetMobileOrders(widgets);

let posts = [];
let placedStickers = [];
let notifications = [];
let notificationSourceData = {
  postsData: [],
  commentsData: [],
  likesData: [],
  stickersData: [],
  profilesData: [],
};
let popupScrollLockTop = 0;
let popupScrollLockLeft = 0;
let popupScrollLockBodyStyles = null;
let activeSticker = null;
let dragWidget = null;
let draggingPlacedSticker = null;
let knownProfiles = [];
let activeProfilePopupUserId = "";
let profilePopupEditMode = false;
const visibleGifStickerControlTimers = new Map();
const minimizedWidgetIds = new Set();
const previousMobileWidgetRects = new Map();
let missYouSaveInFlight = false;
let missYouSaveQueued = false;
let liveUpdatesChannel = null;
let liveRefreshTimer = 0;
let liveRefreshInFlight = false;
let liveRefreshQueued = false;
let liveRefreshIncludeWidgets = false;
let entrySaveInFlight = false;
let widgetSaveInFlight = false;
let commentSaveInFlight = false;
let profileSaveInFlight = false;
let profilePresenceHeartbeatId = 0;
let profileBioColumnSupported = null;
let profileLastSeenFieldSupported = null;
let lastPresenceSyncAt = 0;
let currentCommentsPostId = null;
let replyingToCommentId = null;
const activePhotoWidgetReplyTargets = new Map();
let editingWidgetId = null;
let editingPostId = null;
let pendingDeletePostId = null;
let pendingWidgetDrag = null;
let commentLikesEnabled = true;
let currentUser = null;
let entryQuill = null;
let sharedProfileBios = {};
let sharedProfileBiosFetchPromise = null;
const pendingPostLikeIds = new Set();
const pendingWidgetLikeIds = new Set();
const pendingLocalWidgetUpdates = new Map();
const pendingLocalProfileFetches = new Map();
const recentLocalRealtimeTables = new Map();

const floatingDecorEl = document.getElementById("floatingDecor");
const leftZone = document.getElementById("leftZone");
const rightZone = document.getElementById("rightZone");
const timelineEl = document.getElementById("timeline");
const mobileViewSwitcher = document.getElementById("mobileViewSwitcher");
const mobileViewButtons = Array.from(
  document.querySelectorAll(".mobile-view-btn[data-mobile-view]"),
);
const launchSplash = document.getElementById("launchSplash");
const stickerPopup = document.getElementById("stickerPopup");
const stickerTabs = document.getElementById("stickerTabs");
const stickerInput = document.getElementById("stickerInput");
const typedStickerPreviewWrap = document.getElementById(
  "typedStickerPreviewWrap",
);
const typedStickerPreview = document.getElementById("typedStickerPreview");
const emojiPickerGrid = document.getElementById("emojiPickerGrid");
const gifPickerGrid = document.getElementById("gifPickerGrid");
const gifSearchInput = document.getElementById("gifSearchInput");
const gifSearchBtn = document.getElementById("gifSearchBtn");
const gifSearchStatus = document.getElementById("gifSearchStatus");
const closeStickerPopup = document.getElementById("closeStickerPopup");
const appToolbar = document.getElementById("appToolbar");
const newEntryBtn = document.getElementById("newEntryBtn");
const notificationsMenu = document.getElementById("notificationsMenu");
const notificationsBtn = document.getElementById("notificationsBtn");
const notificationsBadge = document.getElementById("notificationsBadge");
const notificationsPanel = document.getElementById("notificationsPanel");
const notificationsList = document.getElementById("notificationsList");
const clearNotificationsBtn = document.getElementById("clearNotificationsBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");
const zoomInBtn = document.getElementById("zoomInBtn");
const zoomResetBtn = document.getElementById("zoomResetBtn");
const zoomValueLabel = document.getElementById("zoomValueLabel");
const themeToggle = document.getElementById("themeToggle");
const entryPopup = document.getElementById("entryPopup");
const entryPopupTitle = entryPopup?.querySelector(".popup-title");
const entryPopupLabel = entryPopup?.querySelector(".popup-label");
const closeEntryPopup = document.getElementById("closeEntryPopup");
const entryEditor = document.getElementById("entryEditor");
const entryContentFallback = document.getElementById("entryContentFallback");
const entryImageInput = document.getElementById("entryImageInput");
const entryImageData = document.getElementById("entryImageData");
const entryImagePreview = document.getElementById("entryImagePreview");
const removeEntryImageBtn = document.getElementById("removeEntryImageBtn");
const saveEntryBtn = document.getElementById("saveEntryBtn");
const commentsPopup = document.getElementById("commentsPopup");
const closeCommentsPopup = document.getElementById("closeCommentsPopup");
const commentsList = document.getElementById("commentsList");
const commentInput = document.getElementById("commentInput");
const saveCommentBtn = document.getElementById("saveCommentBtn");
const replyingToLabel = document.getElementById("replyingToLabel");
const deleteEntryPopup = document.getElementById("deleteEntryPopup");
const cancelDeleteEntryBtn = document.getElementById("cancelDeleteEntryBtn");
const confirmDeleteEntryBtn = document.getElementById("confirmDeleteEntryBtn");
const widgetPopup = document.getElementById("widgetPopup");
const closeWidgetPopup = document.getElementById("closeWidgetPopup");
const widgetPopupTitle = document.getElementById("widgetPopupTitle");
const headerSaveWidgetBtn = document.getElementById("headerSaveWidgetBtn");
const widgetPopupLikeBtn = document.getElementById("widgetPopupLikeBtn");
const widgetEditorFields = document.getElementById("widgetEditorFields");
const saveWidgetBtn = document.getElementById("saveWidgetBtn");
const clearWidgetHistoryBtn = document.getElementById("clearWidgetHistoryBtn");
const widgetPopupCard = widgetPopup?.querySelector(".popup-card") || null;
const widgetCommentsPopup = document.getElementById("widgetCommentsPopup");
const closeWidgetCommentsPopup = document.getElementById(
  "closeWidgetCommentsPopup",
);
const widgetCommentsPopupTitle = document.getElementById(
  "widgetCommentsPopupTitle",
);
const widgetCommentsPopupFields = document.getElementById(
  "widgetCommentsPopupFields",
);
const entryPreviewPopup = document.getElementById("entryPreviewPopup");
const closeEntryPreviewPopup = document.getElementById(
  "closeEntryPreviewPopup",
);
const shuffleEntryPreviewPopup = document.getElementById(
  "shuffleEntryPreviewPopup",
);
const editEntryPreviewPopup = document.getElementById("editEntryPreviewPopup");
const entryPreviewTitle = document.getElementById("entryPreviewTitle");
const entryPreviewList = document.getElementById("entryPreviewList");
let activeEntryPreviewEntries = [];
let lastScrollY = window.scrollY || 0;
let floatingEntryVisibilityFrame = 0;
let mobileViewSwitcherFrame = 0;
const MOBILE_VIEW_STORAGE_KEY = "ourMemoriesMobileView";
const THEME_STORAGE_KEY = "ourMemoriesTheme";
const PHONE_LAYOUT_QUERY = "(max-width: 720px)";
const phoneLayoutMedia = window.matchMedia?.(PHONE_LAYOUT_QUERY);
const reducedMotionMedia = window.matchMedia?.(
  "(prefers-reduced-motion: reduce)",
);
const BOOT_SPLASH_MIN_MS = 520;
const BOOT_SPLASH_FADE_MS = 320;
const LIVE_REFRESH_DEBOUNCE_MS = 450;
const bootStartedAt =
  typeof performance !== "undefined" ? performance.now() : Date.now();
let activeMobileView = "timeline";
let wasTabbedLayoutActive = isTabbedLayoutActive();

function normalizeChromeSymbols() {
  const brandIconsEl = document.querySelector(".brand-icons");
  if (brandIconsEl) {
    brandIconsEl.innerHTML = `
            <span aria-hidden="true">♡</span>
            <span aria-hidden="true">✦</span>
            <span aria-hidden="true">🎀</span>
          `;
  }

  const siteTitleEl = document.querySelector(".site-title");
  if (siteTitleEl) {
    siteTitleEl.textContent = "˗ˏˋ ⁺ ‧ ₊ ˚ ཐི ⋆ TOTO&DODO ⋆ ཋྀ ˚ ₊ ‧ ⁺ ˎˊ˗";
  }

  const quotePillEl = document.querySelector(".quote-pill");
  if (quotePillEl) {
    quotePillEl.textContent = "⊹˚₊ forever and always ₊˚⊹";
  }

  const notificationsIconEl = document.querySelector(".notifications-btn-icon");
  if (notificationsIconEl) {
    notificationsIconEl.textContent = "🕭";
  }

  const notificationTitleEl = document.querySelector(".notifications-title");
  if (notificationTitleEl) {
    notificationTitleEl.textContent = "inbox ♡";
  }

  const profileTitleEl = document.querySelector("#profilePopup .popup-title");
  if (profileTitleEl) {
    profileTitleEl.textContent = "my profile ♡";
  }

  if (entryPopupTitle) {
    entryPopupTitle.textContent = "new entry ✎";
  }

  if (entryPopupLabel) {
    entryPopupLabel.textContent = "write something ♡";
  }

  const commentsTitleEl = document.querySelector("#commentsPopup .popup-title");
  if (commentsTitleEl) {
    commentsTitleEl.textContent = "comments ♡";
  }

  const stickerTitleEl = document.querySelector("#stickerPopup .popup-title");
  if (stickerTitleEl) {
    stickerTitleEl.textContent = "˚୨୧⋆｡˚ ⋆reactions₍ᐢ. .ᐢ₎ ₊˚⊹♡";
  }
}

function setHeaderWidgetSaveVisibility(isVisible) {
  if (!headerSaveWidgetBtn) return;
  headerSaveWidgetBtn.hidden = !isVisible;
  headerSaveWidgetBtn.style.display = isVisible ? "inline-flex" : "none";
}

function setWidgetPopupLikeButton(widget = null) {
  if (!widgetPopupLikeBtn) return;

  const shouldShow = Boolean(widget && isLikeableWidget(widget));
  widgetPopupLikeBtn.hidden = !shouldShow;
  widgetPopupLikeBtn.style.display = shouldShow ? "inline-flex" : "none";

  if (!shouldShow) {
    widgetPopupLikeBtn.removeAttribute("data-widget-like-id");
    widgetPopupLikeBtn.innerHTML = "";
    widgetPopupLikeBtn.classList.remove("liked", "is-pending");
    widgetPopupLikeBtn.setAttribute("aria-label", "like widget");
    widgetPopupLikeBtn.setAttribute("aria-pressed", "false");
    return;
  }

  widgetPopupLikeBtn.dataset.widgetLikeId = widget.id;
  syncWidgetLikeButton(widget.id);
}

function markPendingLocalWidgetUpdate(widgetId, updatedAt) {
  const normalizedWidgetId = String(widgetId || "").trim();
  const normalizedUpdatedAt = String(updatedAt || "").trim();

  if (!normalizedWidgetId || !normalizedUpdatedAt) return;

  pendingLocalWidgetUpdates.set(normalizedWidgetId, normalizedUpdatedAt);
  window.setTimeout(() => {
    if (
      pendingLocalWidgetUpdates.get(normalizedWidgetId) === normalizedUpdatedAt
    ) {
      pendingLocalWidgetUpdates.delete(normalizedWidgetId);
    }
  }, 7000);
}

function isTabbedLayoutActive() {
  return isMobileLayoutActive();
}

function isMobileLayoutActive() {
  return Boolean(phoneLayoutMedia?.matches);
}

function shouldUseLaunchSplash() {
  return true;
}

function syncMobileViewButtons() {
  mobileViewButtons.forEach((button) => {
    const isActive = button.dataset.mobileView === activeMobileView;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function getMobileViewSection(view) {
  if (view === "left") return leftZone;
  if (view === "right") return rightZone;
  return timelineEl;
}

function applyMobileView() {
  const pageEl = document.querySelector(".page");
  if (!pageEl) return;

  if (!["timeline", "left", "right"].includes(activeMobileView)) {
    activeMobileView = "timeline";
  }

  pageEl.dataset.mobileView = activeMobileView;
  syncMobileViewButtons();
}

function getStoredMobileView() {
  try {
    const storedView = localStorage.getItem(MOBILE_VIEW_STORAGE_KEY);
    return ["timeline", "left", "right"].includes(storedView)
      ? storedView
      : "";
  } catch {
    return "";
  }
}

function setMobileView(nextView, options = {}) {
  const { persist = true } = options;
  const allowedViews = new Set(["timeline", "left", "right"]);
  activeMobileView = allowedViews.has(nextView) ? nextView : "timeline";

  [timelineEl, leftZone, rightZone].forEach((section) => {
    section?.getAnimations?.().forEach((animation) => animation.cancel());
  });

  applyMobileView();

  if (
    isTabbedLayoutActive() &&
    !reducedMotionMedia?.matches
  ) {
    const activeSection = getMobileViewSection(activeMobileView);
    activeSection?.animate?.(
      [
        { opacity: 0.72, transform: "translate3d(0, 4px, 0)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ],
      {
        duration: 180,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    );
  }

  requestAnimationFrame(() => {
    const pageEl = document.querySelector(".page");
    const visibleSection = getMobileViewSection(pageEl?.dataset.mobileView);

    if (!visibleSection || visibleSection.getBoundingClientRect().height <= 0) {
      activeMobileView = "timeline";
      applyMobileView();
    }
  });

  if (!persist) return;

  try {
    localStorage.setItem(MOBILE_VIEW_STORAGE_KEY, activeMobileView);
  } catch (error) {
    console.error(error);
  }
}

function syncMobileViewSwitcherVisibility() {
  if (!mobileViewSwitcher) return;

  const isTabbed = isTabbedLayoutActive();
  const layoutChanged = isTabbed !== wasTabbedLayoutActive;
  wasTabbedLayoutActive = isTabbed;
  mobileViewSwitcher.hidden = !isTabbed;

  if (!isTabbed) {
    const pageEl = document.querySelector(".page");
    if (pageEl) {
      pageEl.dataset.mobileView = "all";
    }
  } else {
    applyMobileView();
  }

  if (layoutChanged && currentUser) {
    renderWidgets({ animateMobileReorder: false });
  }
}

function getThemeChromeColor(nextTheme) {
  const styles = window.getComputedStyle(document.documentElement);
  const overscrollBg = styles.getPropertyValue("--overscroll-bg").trim();
  if (overscrollBg && !overscrollBg.startsWith("var(")) {
    return overscrollBg;
  }

  return (
    styles.getPropertyValue("--bg-3").trim() ||
    (nextTheme === "dark" ? "#2a1a2a" : "#fffdfd")
  );
}

function getStoredThemePreference() {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === "dark" || savedTheme === "light" ? savedTheme : "";
  } catch {
    return "";
  }
}

function normalizeAppZoom(value) {
  if (value === null || value === undefined || value === "") {
    return DEFAULT_APP_ZOOM;
  }

  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return DEFAULT_APP_ZOOM;

  const steppedValue =
    Math.round(numericValue / APP_ZOOM_STEP) * APP_ZOOM_STEP;
  return Math.min(MAX_APP_ZOOM, Math.max(MIN_APP_ZOOM, steppedValue));
}

function getStoredAppZoomPreference() {
  try {
    return normalizeAppZoom(localStorage.getItem(APP_ZOOM_STORAGE_KEY));
  } catch {
    return DEFAULT_APP_ZOOM;
  }
}

function getCurrentAppZoom() {
  return normalizeAppZoom(
    getComputedStyle(document.documentElement).getPropertyValue("--app-zoom"),
  );
}

function getAppTextBoostForZoom(zoom) {
  return 1;
}

function setAppZoom(zoom, options = {}) {
  const { persist = false } = options;
  const nextZoom = normalizeAppZoom(zoom);
  const nextTextBoost = getAppTextBoostForZoom(nextZoom);
  document.documentElement.style.setProperty(
    "--app-zoom",
    nextZoom.toFixed(2),
  );
  document.documentElement.style.setProperty(
    "--app-text-boost",
    nextTextBoost.toFixed(3),
  );

  if (zoomValueLabel) {
    zoomValueLabel.textContent = `${Math.round(nextZoom * 100)}%`;
  }

  if (zoomOutBtn) {
    zoomOutBtn.disabled = nextZoom <= MIN_APP_ZOOM;
    zoomOutBtn.setAttribute("aria-disabled", String(zoomOutBtn.disabled));
  }

  if (zoomInBtn) {
    zoomInBtn.disabled = nextZoom >= MAX_APP_ZOOM;
    zoomInBtn.setAttribute("aria-disabled", String(zoomInBtn.disabled));
  }

  if (zoomResetBtn) {
    zoomResetBtn.disabled = nextZoom === DEFAULT_APP_ZOOM;
    zoomResetBtn.setAttribute("aria-disabled", String(zoomResetBtn.disabled));
  }

  if (persist) {
    try {
      localStorage.setItem(APP_ZOOM_STORAGE_KEY, nextZoom.toFixed(2));
    } catch (error) {
      console.error(error);
    }
  }
}

function adjustAppZoom(delta) {
  const currentZoom = getCurrentAppZoom();
  setAppZoom(currentZoom + delta, { persist: true });
}

function setTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  const themeColorMeta =
    document.getElementById("themeColorMeta") ||
    document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.setAttribute(
      "content",
      getThemeChromeColor(nextTheme),
    );
  }

  if (themeToggle) {
    const isDark = nextTheme === "dark";
    themeToggle.classList.toggle("active", isDark);
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "switch to light mode" : "switch to dark mode",
    );
    const icon = themeToggle.querySelector(".theme-toggle-icon");
    if (icon) icon.textContent = isDark ? "☀" : "☾";
  }
}

function toggleTheme() {
  const currentTheme =
    document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(nextTheme);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch (error) {
    console.error(error);
  }
}

function syncThemeWithSystemPreference(event) {
  if (getStoredThemePreference()) return;
  setTheme(event.matches ? "dark" : "light");
}

function updateFloatingEntryButtonVisibility() {
  if (!newEntryBtn) return;

  if (!currentUser) {
    newEntryBtn.classList.add("is-hidden");
    return;
  }

  const currentScrollY = window.scrollY || 0;
  const scrollDelta = currentScrollY - lastScrollY;
  const shouldHide =
    currentScrollY > 140 &&
    scrollDelta > 8 &&
    !entryPopup?.classList.contains("open");

  if (shouldHide) {
    newEntryBtn.classList.add("is-hidden");
  } else if (
    scrollDelta < -8 ||
    currentScrollY <= 80 ||
    entryPopup?.classList.contains("open")
  ) {
    newEntryBtn.classList.remove("is-hidden");
  }

  lastScrollY = currentScrollY;
}

function requestFloatingEntryButtonVisibilityUpdate() {
  if (floatingEntryVisibilityFrame) return;

  floatingEntryVisibilityFrame = requestAnimationFrame(() => {
    floatingEntryVisibilityFrame = 0;
    updateFloatingEntryButtonVisibility();
  });
}

function requestMobileViewSwitcherVisibilitySync() {
  if (mobileViewSwitcherFrame) return;

  mobileViewSwitcherFrame = requestAnimationFrame(() => {
    mobileViewSwitcherFrame = 0;
    syncMobileViewSwitcherVisibility();
  });
}

function getViewportScrollSnapshot() {
  if (document.body.classList.contains("popup-scroll-locked")) {
    return null;
  }

  return {
    left: window.scrollX || window.pageXOffset || 0,
    top: window.scrollY || window.pageYOffset || 0,
  };
}

function restoreViewportScroll(snapshot) {
  if (!snapshot || document.body.classList.contains("popup-scroll-locked")) {
    return;
  }

  window.scrollTo({
    left: snapshot.left,
    top: snapshot.top,
    behavior: "auto",
  });
  lastScrollY = snapshot.top;
}

function getSkeletonLine(className = "", style = "") {
  const classes = ["skeleton-line", className].filter(Boolean).join(" ");
  return `<span class="${classes}" aria-hidden="true" style="${style}"></span>`;
}

function getWidgetSkeletonMarkup(index = 0) {
  const lineWidth = index % 2 === 0 ? "72%" : "58%";
  return `
    <div class="widget widget-skeleton" aria-hidden="true">
      <div class="widget-bar skeleton-widget-bar">
        ${getSkeletonLine("skeleton-title", `width:${lineWidth};`)}
      </div>
      <div class="widget-content skeleton-widget-content">
        ${getSkeletonLine("", "width:86%;")}
        ${getSkeletonLine("", "width:64%;")}
        ${getSkeletonLine("skeleton-line-short", "width:42%;")}
      </div>
    </div>
  `;
}

function renderWidgetSkeletons() {
  if (!leftZone || !rightZone) return;

  leftZone.innerHTML = [0, 1, 2]
    .map((index) => {
      const top = 20 + index * 190;
      return getWidgetSkeletonMarkup(index).replace(
        'class="widget widget-skeleton"',
        `class="widget widget-skeleton" style="left:${index % 2 ? 12 : 8}px;top:${top}px;"`,
      );
    })
    .join("");
  rightZone.innerHTML = [0, 1, 2]
    .map((index) => {
      const top = 34 + index * 190;
      return getWidgetSkeletonMarkup(index + 3).replace(
        'class="widget widget-skeleton"',
        `class="widget widget-skeleton" style="left:${index % 2 ? 18 : 8}px;top:${top}px;"`,
      );
    })
    .join("");
}

function getPostSkeletonMarkup(index = 0) {
  const textWidth = index % 2 === 0 ? "92%" : "78%";
  return `
    <article class="post post-skeleton" aria-hidden="true">
      <div class="post-header skeleton-post-header">
        ${getSkeletonLine("skeleton-title", "width:48%;")}
        ${getSkeletonLine("skeleton-line-short", "width:72px;")}
      </div>
      <div class="post-body">
        <div class="post-meta">
          <span class="skeleton-avatar"></span>
          <div class="skeleton-meta-lines">
            ${getSkeletonLine("", "width:110px;")}
            ${getSkeletonLine("skeleton-line-short", "width:72px;")}
          </div>
        </div>
        <div class="skeleton-text-block">
          ${getSkeletonLine("", `width:${textWidth};`)}
          ${getSkeletonLine("", "width:86%;")}
          ${getSkeletonLine("", "width:68%;")}
        </div>
        <div class="skeleton-actions">
          ${getSkeletonLine("skeleton-pill", "width:82px;")}
          ${getSkeletonLine("skeleton-pill", "width:112px;")}
          ${getSkeletonLine("skeleton-pill", "width:96px;")}
        </div>
      </div>
    </article>
  `;
}

function renderTimelineSkeleton(count = 3) {
  if (!timelineEl) return;
  timelineEl.innerHTML = Array.from({ length: count }, (_, index) =>
    getPostSkeletonMarkup(index),
  ).join("");
}

function renderNotificationSkeleton() {
  if (!notificationsList) return;
  notificationsList.innerHTML = `
    <div class="notification-skeleton" aria-hidden="true">
      ${getSkeletonLine("", "width:86%;")}
      ${getSkeletonLine("skeleton-line-short", "width:54%;")}
    </div>
    <div class="notification-skeleton" aria-hidden="true">
      ${getSkeletonLine("", "width:72%;")}
      ${getSkeletonLine("skeleton-line-short", "width:46%;")}
    </div>
  `;
}

function renderAppSkeleton(options = {}) {
  const { timeline = true, widgets = true, notifications = true } = options;

  if (timeline) renderTimelineSkeleton();
  if (widgets) renderWidgetSkeletons();
  if (notifications) renderNotificationSkeleton();
}

function renderCommentsSkeleton() {
  if (!commentsList) return;
  commentsList.innerHTML = Array.from({ length: 3 }, (_, index) => `
    <div class="comment-item comment-skeleton" aria-hidden="true">
      ${getSkeletonLine("", `width:${index % 2 ? "92px" : "124px"};`)}
      ${getSkeletonLine("", "width:88%;")}
      ${getSkeletonLine("skeleton-line-short", "width:58%;")}
    </div>
  `).join("");
}

function isGifSticker(value) {
  const normalizedValue = String(value || "")
    .trim()
    .toLowerCase();
  return normalizedValue.startsWith("http") && normalizedValue.includes(".gif");
}

function createStickerVisual(value, options = {}) {
  const { forGrid = false, size = DEFAULT_GIF_STICKER_SIZE } = options;

  if (isGifSticker(value)) {
    const media = document.createElement("img");
    media.className = forGrid ? "sticker-pill-media" : "reaction-sticker-media";
    media.src = value;
    media.alt = "gif sticker";
    media.loading = "lazy";
    media.draggable = false;
    if (!forGrid) {
      media.style.width = `${size}px`;
      media.style.height = `${size}px`;
    }
    return media;
  }

  const text = document.createElement("span");
  text.className = "reaction-sticker-emoji";
  text.textContent = value;
  return text;
}

function setGifSearchStatus(message) {
  if (gifSearchStatus) {
    gifSearchStatus.textContent = message;
  }
}

function escapeQueryParam(value) {
  return encodeURIComponent(String(value || "").trim());
}

function getGiphyStickerUrl(gifObject) {
  return (
    gifObject?.images?.fixed_height?.url ||
    gifObject?.images?.downsized?.url ||
    gifObject?.images?.original?.url ||
    ""
  );
}

function getGiphyTypeLabel(type = activeGiphySearchType) {
  return type === "giphy-sticker" ? "sticker" : "gif";
}

function getGiphyTypePlural(type = activeGiphySearchType) {
  return type === "giphy-sticker" ? "stickers" : "gifs";
}

function getGiphySearchEndpoint(type = activeGiphySearchType) {
  return type === "giphy-sticker"
    ? GIPHY_STICKER_SEARCH_ENDPOINT
    : GIPHY_SEARCH_ENDPOINT;
}

function getRecentGiphyStorageKey(type = activeGiphySearchType) {
  return type === "giphy-sticker"
    ? RECENT_GIPHY_STICKER_STORAGE_KEY
    : RECENT_GIF_STORAGE_KEY;
}

function getRecentGiphyItems(type = activeGiphySearchType) {
  try {
    const raw = localStorage.getItem(getRecentGiphyStorageKey(type));
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => item?.url) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

function getRecentGifStickers() {
  return getRecentGiphyItems("gif");
}

function saveRecentGiphyItem(gifItem, type = activeGiphySearchType) {
  if (!gifItem?.url) return;

  try {
    const nextItems = [
      { ...gifItem, type },
      ...getRecentGiphyItems(type).filter((item) => item.url !== gifItem.url),
    ].slice(0, 6);
    localStorage.setItem(
      getRecentGiphyStorageKey(type),
      JSON.stringify(nextItems),
    );
  } catch (error) {
    console.error(error);
  }
}

function saveRecentGifSticker(gifItem, type = activeGiphySearchType) {
  saveRecentGiphyItem(gifItem, type);
}

function getPlacedGifSizeMap() {
  try {
    const raw = localStorage.getItem(PLACED_GIF_SIZE_STORAGE_KEY);
    const parsed = JSON.parse(raw || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.error(error);
    return {};
  }
}

function getPlacedGifSize(stickerId) {
  const sizeMap = getPlacedGifSizeMap();
  const size = Number(sizeMap?.[stickerId]);
  return Number.isFinite(size) ? size : DEFAULT_GIF_STICKER_SIZE;
}

function savePlacedGifSize(stickerId, size) {
  if (!stickerId) return;

  try {
    const sizeMap = getPlacedGifSizeMap();
    sizeMap[stickerId] = Math.max(
      MIN_GIF_STICKER_SIZE,
      Math.min(MAX_GIF_STICKER_SIZE, Math.round(size)),
    );
    localStorage.setItem(PLACED_GIF_SIZE_STORAGE_KEY, JSON.stringify(sizeMap));
  } catch (error) {
    console.error(error);
  }
}

function clearPlacedGifSize(stickerId) {
  if (!stickerId) return;

  try {
    const sizeMap = getPlacedGifSizeMap();
    delete sizeMap[stickerId];
    localStorage.setItem(PLACED_GIF_SIZE_STORAGE_KEY, JSON.stringify(sizeMap));
  } catch (error) {
    console.error(error);
  }
}

function clampStickerPercent(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 50;
  return Math.max(0, Math.min(100, Math.round(number)));
}

function getPlacedStickerPositionMap() {
  try {
    const raw = localStorage.getItem(PLACED_STICKER_POSITION_STORAGE_KEY);
    const parsed = JSON.parse(raw || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.error(error);
    return {};
  }
}

function getSavedPlacedStickerPosition(stickerId) {
  if (!stickerId) return null;
  const positionMap = getPlacedStickerPositionMap();
  const savedPosition = positionMap[stickerId];
  if (!savedPosition || typeof savedPosition !== "object") return null;

  const x = Number(savedPosition.x);
  const y = Number(savedPosition.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

  return {
    x: clampStickerPercent(x),
    y: clampStickerPercent(y),
  };
}

function savePlacedStickerPosition(stickerId, x, y) {
  if (!stickerId) return;

  try {
    const positionMap = getPlacedStickerPositionMap();
    positionMap[stickerId] = {
      x: clampStickerPercent(x),
      y: clampStickerPercent(y),
    };
    localStorage.setItem(
      PLACED_STICKER_POSITION_STORAGE_KEY,
      JSON.stringify(positionMap),
    );
  } catch (error) {
    console.error(error);
  }
}

function clearPlacedStickerPosition(stickerId) {
  if (!stickerId) return;

  try {
    const positionMap = getPlacedStickerPositionMap();
    delete positionMap[stickerId];
    localStorage.setItem(
      PLACED_STICKER_POSITION_STORAGE_KEY,
      JSON.stringify(positionMap),
    );
  } catch (error) {
    console.error(error);
  }
}

function isPercentStickerPosition(item) {
  const x = Number(item?.x);
  const y = Number(item?.y);
  return (
    Number.isFinite(x) &&
    Number.isFinite(y) &&
    x >= 0 &&
    x <= 100 &&
    y >= 0 &&
    y <= 100
  );
}

function getStickerPositionFromPointer(event, layer, stickerRadius = 16) {
  const rect = layer.getBoundingClientRect();
  const xPx = Math.max(
    stickerRadius,
    Math.min(rect.width - stickerRadius, event.clientX - rect.left),
  );
  const yPx = Math.max(
    stickerRadius,
    Math.min(rect.height - stickerRadius, event.clientY - rect.top),
  );

  return {
    x: Math.round((xPx / rect.width) * 100),
    y: Math.round((yPx / rect.height) * 100),
    xPx: Math.round(xPx),
    yPx: Math.round(yPx),
    rect,
  };
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeHexColor(value, fallback = "#ffffff") {
  const fallbackHex = String(fallback || "#ffffff")
    .trim()
    .toLowerCase();
  const raw = String(value || "").trim();
  const matchThree = raw.match(/^#?([0-9a-fA-F]{3})$/);
  if (matchThree) {
    const [r, g, b] = matchThree[1].toLowerCase().split("");
    return `#${r}${r}${g}${g}${b}${b}`;
  }

  const matchSix = raw.match(/^#?([0-9a-fA-F]{6})$/);
  if (matchSix) {
    return `#${matchSix[1].toLowerCase()}`;
  }

  return /^#[0-9a-f]{6}$/.test(fallbackHex) ? fallbackHex : "#ffffff";
}

function looksLikeHtml(value) {
  return /<\/?[a-z][\w:-]*(?:\s[^<>]*?)?>/i.test(String(value || ""));
}

function sanitizePostHtml(html) {
  if (window.DOMPurify?.sanitize) {
    return window.DOMPurify.sanitize(String(html || ""), {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["style", "class", "target", "rel"],
      FORBID_TAGS: ["style", "script"],
    });
  }

  return String(html || "");
}

function toSafeHtmlFromPlainText(text) {
  return sanitizePostHtml(escapeHtml(text).replaceAll("\n", "<br>"));
}

function decodeHtmlEntities(value) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = String(value || "");
  return textarea.value;
}

function decodeStoredHtml(value, maxPasses = 4) {
  let currentValue = String(value || "");

  for (let pass = 0; pass < maxPasses; pass += 1) {
    const nextValue = decodeHtmlEntities(currentValue);
    if (nextValue === currentValue) {
      break;
    }
    currentValue = nextValue;
  }

  return currentValue;
}

function reviveLiteralHtmlFragments(html) {
  const template = document.createElement("template");
  template.innerHTML = String(html || "");
  const allowedLiteralTagPattern =
    /<\/?(?:p|h[1-6]|strong|em|u|blockquote|ul|ol|li|figure|img|br|a|span)\b/i;
  const walker = document.createTreeWalker(
    template.content,
    NodeFilter.SHOW_TEXT,
  );
  const textNodes = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach((textNode) => {
    const rawText = String(textNode.textContent || "");
    if (!allowedLiteralTagPattern.test(rawText) || !rawText.includes("<")) {
      return;
    }

    const revivedHtml = sanitizePostHtml(rawText);
    if (!looksLikeHtml(revivedHtml)) {
      return;
    }

    const fragmentTemplate = document.createElement("template");
    fragmentTemplate.innerHTML = revivedHtml;
    textNode.replaceWith(fragmentTemplate.content.cloneNode(true));
  });

  return template.innerHTML;
}

function isInlineImageDataUrl(value) {
  return /^data:image\/[a-zA-Z0-9.+-]+;base64,/i.test(
    String(value || "").trim(),
  );
}

async function uploadEntryImageData(userId, imageDataUrl) {
  const normalizedImage = String(imageDataUrl || "").trim();
  if (!userId || !isInlineImageDataUrl(normalizedImage)) {
    return normalizedImage;
  }

  const response = await fetch(normalizedImage);
  const blob = await response.blob();
  const extension = blob.type === "image/png" ? "png" : "jpg";
  const filePath = `${userId}/entry-images/${Date.now()}-${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)}.${extension}`;

  const { error: uploadError } = await supabaseClient.storage
    .from(ENTRY_IMAGE_BUCKET)
    .upload(filePath, blob, {
      contentType: blob.type || "image/jpeg",
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabaseClient.storage
    .from(ENTRY_IMAGE_BUCKET)
    .getPublicUrl(filePath);

  return data?.publicUrl || normalizedImage;
}

function extractEntryAttachment(content) {
  const template = document.createElement("template");
  template.innerHTML = sanitizePostHtml(String(content || ""));
  const attachmentImage = template.content.querySelector(
    "img.entry-attachment-image",
  );
  const image = attachmentImage?.getAttribute("src") || "";
  attachmentImage?.closest(".entry-attachment")?.remove();
  return {
    content: template.innerHTML.trim(),
    image,
  };
}

function composeEntryContentWithAttachment(content, image) {
  const normalizedContent = sanitizePostHtml(String(content || "")).trim();
  const normalizedImage = String(image || "").trim();

  if (!normalizedImage) {
    return normalizedContent;
  }

  const attachmentHtml = `
          <figure class="entry-attachment">
            <img class="entry-attachment-image" src="${escapeHtml(normalizedImage)}" alt="entry attachment" loading="lazy" decoding="async" />
          </figure>
        `;

  return normalizedContent
    ? `${normalizedContent}${attachmentHtml}`
    : attachmentHtml;
}

function renderEntryImagePreview(image) {
  if (!entryImagePreview || !removeEntryImageBtn || !entryImageData) return;

  const normalizedImage = String(image || "").trim();
  entryImageData.value = normalizedImage;
  entryImagePreview.hidden = !normalizedImage;
  removeEntryImageBtn.hidden = !normalizedImage;
  entryImagePreview.innerHTML = normalizedImage
    ? `<img src="${escapeHtml(normalizedImage)}" alt="entry attachment preview" />`
    : "";
}

function compressImageFile(file, options = {}) {
  const { maxSize = 900, quality = 0.82 } = options;

  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }

    const reader = new FileReader();
    reader.onerror = () =>
      reject(reader.error || new Error("could not read image"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("could not load image"));
      image.onload = () => {
        const scale = Math.min(
          1,
          maxSize / Math.max(image.width, image.height),
        );
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function getPostDisplayHtml(content) {
  const value = String(content || "");
  if (!value) return "";

  const containsEscapedHtml = /&lt;\s*\/?[a-z]/i.test(value);

  if (looksLikeHtml(value)) {
    if (containsEscapedHtml) {
      const decodedHtmlValue = decodeStoredHtml(value);
      if (decodedHtmlValue !== value && looksLikeHtml(decodedHtmlValue)) {
        return reviveLiteralHtmlFragments(sanitizePostHtml(decodedHtmlValue));
      }
    }

    return reviveLiteralHtmlFragments(sanitizePostHtml(value));
  }

  if (!/&(?:lt|gt|quot|#39|amp);/i.test(value)) {
    return toSafeHtmlFromPlainText(value);
  }

  const decodedValue = decodeStoredHtml(value);
  if (decodedValue !== value && looksLikeHtml(decodedValue)) {
    return reviveLiteralHtmlFragments(sanitizePostHtml(decodedValue));
  }

  return toSafeHtmlFromPlainText(value);
}

function getUrlsFromPostText(postTextEl) {
  const urls = new Set();

  postTextEl.querySelectorAll("a[href]").forEach((link) => {
    if (/^https?:/i.test(link.href)) {
      urls.add(link.href);
    }
  });

  return [...urls];
}

function cleanDetectedUrl(url) {
  return String(url || "").replace(/[),.;!?]+$/g, "");
}

function linkifyPlainUrls(root) {
  if (!root) return;

  const urlPattern = /\bhttps?:\/\/[^\s<>"')\]]+/gi;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const parent = node.parentElement;
    if (
      !parent ||
      parent.closest("a, button, input, textarea, script, style")
    ) {
      continue;
    }
    if (urlPattern.test(node.textContent || "")) {
      textNodes.push(node);
    }
    urlPattern.lastIndex = 0;
  }

  textNodes.forEach((textNode) => {
    const text = textNode.textContent || "";
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match;

    urlPattern.lastIndex = 0;
    while ((match = urlPattern.exec(text)) !== null) {
      const rawUrl = match[0];
      const cleanUrl = cleanDetectedUrl(rawUrl);
      const trailingText = rawUrl.slice(cleanUrl.length);

      if (match.index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex, match.index)),
        );
      }

      try {
        const parsedUrl = new URL(cleanUrl);
        const link = document.createElement("a");
        link.href = parsedUrl.href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = cleanUrl;
        fragment.appendChild(link);
      } catch {
        fragment.appendChild(document.createTextNode(cleanUrl));
      }

      if (trailingText) {
        fragment.appendChild(document.createTextNode(trailingText));
      }

      lastIndex = match.index + rawUrl.length;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    textNode.replaceWith(fragment);
  });
}

function getYouTubeVideoId(url) {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return parsedUrl.pathname.split("/").filter(Boolean)[0] || "";
    }

    if (!["youtube.com", "m.youtube.com", "music.youtube.com"].includes(host)) {
      return "";
    }

    if (parsedUrl.pathname === "/watch") {
      return parsedUrl.searchParams.get("v") || "";
    }

    const parts = parsedUrl.pathname.split("/").filter(Boolean);
    if (["embed", "shorts", "live"].includes(parts[0])) {
      return parts[1] || "";
    }
  } catch {
    return "";
  }

  return "";
}

function getLinkPreviewDetails(url) {
  const parsedUrl = new URL(url);
  const hostname = parsedUrl.hostname.replace(/^www\./, "");
  const pathParts = decodeURIComponent(parsedUrl.pathname)
    .split("/")
    .filter(Boolean);
  const rawTitle = pathParts[pathParts.length - 1] || hostname;
  const title = rawTitle
    .replace(/\.[a-z0-9]{2,5}$/i, "")
    .replace(/[-_]+/g, " ")
    .trim();

  return {
    hostname,
    title: title || hostname,
    faviconUrl: `https://www.google.com/s2/favicons?domain=${encodeURIComponent(parsedUrl.hostname)}&sz=64`,
  };
}

function createGenericLinkPreview(sourceUrl) {
  const preview = document.createElement("a");
  preview.className = "link-preview generic-link-preview";
  preview.href = sourceUrl;
  preview.target = "_blank";
  preview.rel = "noopener noreferrer";
  preview.draggable = false;
  preview.dataset.sourceUrl = sourceUrl;

  let details;
  try {
    details = getLinkPreviewDetails(sourceUrl);
  } catch {
    details = {
      hostname: sourceUrl,
      title: sourceUrl,
      faviconUrl: "",
    };
  }

  preview.innerHTML = `
          <span class="generic-link-preview-art" aria-hidden="true">
            <span class="generic-link-preview-icon">
              ${details.faviconUrl ? `<img src="${escapeHtml(details.faviconUrl)}" alt="" loading="lazy" decoding="async" />` : "↗"}
            </span>
          </span>
          <span class="generic-link-preview-text">
            <span class="generic-link-preview-title">${escapeHtml(details.title)}</span>
            <span class="generic-link-preview-url">${escapeHtml(details.hostname)}</span>
          </span>
        `;

  return preview;
}

function canUseYouTubeEmbed() {
  return (
    ["http:", "https:"].includes(window.location.protocol) &&
    Boolean(window.location.origin) &&
    window.location.origin !== "null"
  );
}

function getYouTubeWatchUrl(videoId, sourceUrl) {
  return (
    sourceUrl ||
    `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`
  );
}

function createYouTubeLinkPreview(videoId, sourceUrl) {
  const preview = document.createElement("a");
  preview.className = "link-preview youtube-preview youtube-preview-link";
  preview.href = getYouTubeWatchUrl(videoId, sourceUrl);
  preview.target = "_blank";
  preview.rel = "noopener noreferrer";
  preview.draggable = false;
  preview.dataset.sourceUrl = sourceUrl;
  preview.setAttribute("aria-label", "watch video on YouTube");

  preview.innerHTML = `
          <img
            class="youtube-preview-thumbnail"
            src="https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <span class="youtube-preview-vignette" aria-hidden="true"></span>
          <span class="youtube-preview-play" aria-hidden="true">▶</span>
          <span class="youtube-preview-label">Watch on YouTube</span>
        `;

  return preview;
}

function createYouTubePreview(videoId, sourceUrl) {
  if (!canUseYouTubeEmbed()) {
    return createYouTubeLinkPreview(videoId, sourceUrl);
  }

  const preview = document.createElement("div");
  preview.className = "link-preview youtube-preview";
  preview.dataset.sourceUrl = sourceUrl;

  const embedParams = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (window.location.origin && window.location.origin !== "null") {
    embedParams.set("origin", window.location.origin);
  }

  const player = document.createElement("iframe");
  player.className = "youtube-preview-player";
  player.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${embedParams.toString()}`;
  player.title = "YouTube video player";
  player.referrerPolicy = "strict-origin-when-cross-origin";
  player.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  player.allowFullscreen = true;

  preview.appendChild(player);
  return preview;
}

function renderLinkPreviews(postTextEl, previewContainer) {
  if (!previewContainer) return;

  linkifyPlainUrls(postTextEl);
  previewContainer.innerHTML = "";
  const seenVideos = new Set();
  const seenGenericUrls = new Set();
  const previewItems = getUrlsFromPostText(postTextEl)
    .map((url) => ({
      url,
      videoId: getYouTubeVideoId(url),
    }))
    .slice(0, 3);

  previewItems.forEach((item) => {
    if (item.videoId) {
      if (seenVideos.has(item.videoId)) return;
      seenVideos.add(item.videoId);
      previewContainer.appendChild(
        createYouTubePreview(item.videoId, item.url),
      );
      return;
    }

    if (seenGenericUrls.has(item.url)) return;
    seenGenericUrls.add(item.url);
    previewContainer.appendChild(createGenericLinkPreview(item.url));
  });

  previewContainer.hidden = !previewContainer.children.length;
}

function renderTextWithLinkPreviews(textEl, previewContainer, text) {
  if (!textEl) return;

  textEl.textContent = text || "";
  renderLinkPreviews(textEl, previewContainer);
  textEl.querySelectorAll("a").forEach((link) => {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function htmlToPlainText(html) {
  const container = document.createElement("div");
  container.innerHTML = sanitizePostHtml(html);
  return (container.textContent || "").replace(/\u00a0/g, " ");
}

function initEntryEditor() {
  if (!entryEditor) return;

  if (!window.Quill || !window.DOMPurify?.sanitize) {
    document.body.classList.add("no-quill");
    entryQuill = null;
    return;
  }

  document.body.classList.remove("no-quill");

  const Font = window.Quill.import("formats/font");
  Font.whitelist = [
    "quicksand",
    "fredoka",
    "noto-sans",
    "nunito",
    "serif",
    "lora",
    "merriweather",
    "playfair",
    "caveat",
    "dancing",
    "monospace",
  ];
  window.Quill.register(Font, true);

  const SizeStyle = window.Quill.import("attributors/style/size");
  SizeStyle.whitelist = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "28px",
    "32px",
    "40px",
  ];
  window.Quill.register(SizeStyle, true);

  const addEntryColorSelector = () => {
    const toolbar = entryQuill?.getModule("toolbar")?.container;
    if (!toolbar || toolbar.querySelector("#entryTextColorPicker")) return;

    const colorGroup = document.createElement("span");
    colorGroup.className = "ql-formats entry-color-format";
    colorGroup.innerHTML = `
             <input
               class="photo-color-trigger entry-color-trigger"
               id="entryTextColorPicker"
               type="color"
               value="#6d4456"
               aria-label="choose text color"
               title="choose text color"
             />
           `;

    const formatGroups = toolbar.querySelectorAll(".ql-formats");
    const insertBefore =
      formatGroups[2] || formatGroups[formatGroups.length - 1];
    insertBefore?.before(colorGroup);

    const colorInput = colorGroup.querySelector("#entryTextColorPicker");
    colorInput?.addEventListener("input", () => {
      const color = normalizeHexColor(colorInput.value, "#6d4456");
      colorInput.value = color;
      entryQuill?.format("color", color);
      entryQuill?.focus();
    });
  };

  entryQuill = new window.Quill(entryEditor, {
    theme: "snow",
    placeholder: "write something ♡",
    modules: {
      toolbar: [
        [
          {
            font: [
              "quicksand",
              "fredoka",
              "noto-sans",
              "nunito",
              "serif",
              "lora",
              "merriweather",
              "playfair",
              "caveat",
              "dancing",
              "monospace",
            ],
          },
        ],
        [
          {
            size: [
              "12px",
              "14px",
              "16px",
              "18px",
              "20px",
              "24px",
              "28px",
              "32px",
              "40px",
            ],
          },
        ],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote"],
        ["link"],
        ["clean"],
      ],
    },
  });

  addEntryColorSelector();
}

function clearEntryComposer() {
  if (entryQuill) {
    entryQuill.setContents([]);
  } else if (entryContentFallback) {
    entryContentFallback.value = "";
  }

  if (entryImageInput) {
    entryImageInput.value = "";
  }

  renderEntryImagePreview("");
}

function focusEntryComposerToEnd() {
  if (entryQuill) {
    entryQuill.focus();
    entryQuill.setSelection(entryQuill.getLength(), 0);
    return;
  }

  if (entryContentFallback) entryContentFallback.focus();
}

function setEntryComposerFromStoredContent(content) {
  const { content: textContent, image } = extractEntryAttachment(
    getPostDisplayHtml(content),
  );
  const html = textContent;

  if (entryQuill) {
    entryQuill.clipboard.dangerouslyPasteHTML(html || "");
  } else if (entryContentFallback) {
    entryContentFallback.value = htmlToPlainText(html);
  }

  if (entryImageInput) {
    entryImageInput.value = "";
  }

  renderEntryImagePreview(image);
}

function renderDecor() {
  floatingDecorEl.innerHTML = "";
  const fragment = document.createDocumentFragment();

  floatingDecor.forEach((item) => {
    const node = document.createElement("div");
    node.className = "decor";
    node.textContent = item.icon;
    node.style.top = item.top;
    if (item.left) node.style.left = item.left;
    if (item.right) node.style.right = item.right;
    node.style.fontSize = item.size;
    node.style.animationDelay = item.delay;
    fragment.appendChild(node);
  });

  sparkleDecor.forEach((item) => {
    const node = document.createElement("div");
    node.className = "decor sparkle-decor";
    node.textContent = item.icon;
    node.style.top = item.top;
    node.style.left = item.left;
    node.style.fontSize = item.size;
    node.style.animationDelay = item.delay;
    node.style.animationDuration = item.duration;
    fragment.appendChild(node);
  });

  fadingEmojiDecor.forEach((item) => {
    const node = document.createElement("div");
    node.className = "decor sparkle-decor fading-emoji-decor";
    node.textContent = item.icon;
    node.style.top = item.top;
    node.style.left = item.left;
    node.style.fontSize = item.size;
    node.style.animationDelay = item.delay;
    node.style.animationDuration = item.duration;
    fragment.appendChild(node);
  });

  floatingDecorEl.appendChild(fragment);
}

function getWishlistItemsInDisplayOrder(items = []) {
  return [...items]
    .map((item, index) => ({
      ...item,
      order: Number.isFinite(item?.order) ? item.order : index,
    }))
    .sort((a, b) => a.order - b.order);
}

function getNextWishlistOrder(items = []) {
  return (
    items.reduce((maxOrder, item, index) => {
      const itemOrder = Number.isFinite(item?.order) ? item.order : index;
      return Math.max(maxOrder, itemOrder);
    }, -1) + 1
  );
}

function reorderWishlistItem(widget, wishId, direction) {
  if (!widget?.data?.items?.length) return false;

  const items = getWishlistItemsInDisplayOrder(widget.data.items);
  const currentIndex = items.findIndex((item) => item.id === wishId);
  const targetIndex =
    direction === "up"
      ? currentIndex - 1
      : direction === "down"
        ? currentIndex + 1
        : currentIndex;

  if (currentIndex === -1 || targetIndex < 0 || targetIndex >= items.length) {
    return false;
  }

  [items[currentIndex], items[targetIndex]] = [
    items[targetIndex],
    items[currentIndex],
  ];
  widget.data.items = items.map((item, index) => ({
    ...item,
    order: index,
  }));

  return true;
}

function getWishlistEditorRowRects(list) {
  const rects = new Map();

  list
    ?.querySelectorAll?.(".wishlist-item-row[data-wish-id]")
    .forEach((row) => {
      rects.set(row.dataset.wishId, row.getBoundingClientRect());
    });

  return rects;
}

function animateWishlistEditorRows(list, previousRects) {
  if (!list || !previousRects?.size) return;

  list.querySelectorAll(".wishlist-item-row[data-wish-id]").forEach((row) => {
    const previousRect = previousRects.get(row.dataset.wishId);
    if (!previousRect) return;

    const nextRect = row.getBoundingClientRect();
    const deltaY = previousRect.top - nextRect.top;

    if (Math.abs(deltaY) < 1) return;

    row.animate(
      [
        { transform: `translateY(${deltaY}px)` },
        { transform: "translateY(0)" },
      ],
      {
        duration: 260,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    );
  });
}

function syncWishlistEditorReorderButtons(list) {
  const rows = Array.from(
    list?.querySelectorAll?.(".wishlist-item-row[data-wish-id]") || [],
  );

  rows.forEach((row, index) => {
    row
      .querySelector('[data-wish-direction="up"]')
      ?.toggleAttribute("disabled", index === 0);
    row
      .querySelector('[data-wish-direction="down"]')
      ?.toggleAttribute("disabled", index === rows.length - 1);
  });
}

function ensureWidgetStackOrder() {
  widgets.forEach((widget, index) => {
    if (!Number.isFinite(widget?.zIndex)) {
      widget.zIndex = index + 1;
    }
  });
}

function bringWidgetToFront(widget) {
  ensureWidgetStackOrder();
  const topZIndex = widgets.reduce((maxZIndex, item) => {
    const itemZIndex = Number.isFinite(item?.zIndex) ? item.zIndex : 0;
    return Math.max(maxZIndex, itemZIndex);
  }, 0);

  widget.zIndex = topZIndex + 1;
}

function getWeatherDescription(weatherCode, isDay) {
  const weatherMap = {
    0: isDay ? "clear sky" : "clear night",
    1: isDay ? "mostly sunny" : "mostly clear",
    2: "partly cloudy",
    3: "overcast",
    45: "foggy",
    48: "rime fog",
    51: "light drizzle",
    53: "drizzle",
    55: "heavy drizzle",
    56: "freezing drizzle",
    57: "heavy freezing drizzle",
    61: "light rain",
    63: "rain",
    65: "heavy rain",
    66: "freezing rain",
    67: "heavy freezing rain",
    71: "light snow",
    73: "snow",
    75: "heavy snow",
    77: "snow grains",
    80: "rain showers",
    81: "heavy showers",
    82: "violent showers",
    85: "snow showers",
    86: "heavy snow showers",
    95: "thunderstorm",
    96: "storm with hail",
    99: "heavy hail storm",
  };

  return weatherMap[weatherCode] || "weather update";
}

function getWeatherWidget() {
  return widgets.find(
    (widget) =>
      String(widget.id || "")
        .toLowerCase()
        .trim() === "weather",
  );
}

function getMissYouWidget() {
  return widgets.find(
    (widget) =>
      String(widget.id || "")
        .toLowerCase()
        .trim() === "miss-you",
  );
}

function getTodayDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDisplayDate(value) {
  const match = String(value || "")
    .trim()
    .match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})$/);
  if (!match) return "";

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return "";
  }

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatDisplayDate(value) {
  const match = String(value || "")
    .trim()
    .match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return value || "";

  return `${match[3]}/${match[2]}/${match[1]}`;
}

function formatDurationLabel(durationMs) {
  const totalSeconds = Math.max(
    0,
    Math.round((Number(durationMs) || 0) / 1000),
  );
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function normalizeSpotifyTrackUrl(value) {
  const rawValue = String(value || "").trim();
  if (!rawValue) return null;

  const spotifyUriMatch = rawValue.match(/^spotify:track:([a-zA-Z0-9]+)$/i);
  if (spotifyUriMatch) {
    const trackId = spotifyUriMatch[1];
    return {
      trackId,
      spotifyUrl: `https://open.spotify.com/track/${trackId}`,
      spotifyUri: `spotify:track:${trackId}`,
    };
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(rawValue);
  } catch (error) {
    return null;
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const pathParts = parsedUrl.pathname.split("/").filter(Boolean);
  const trackIndex = pathParts.findIndex(
    (part) => part.toLowerCase() === "track",
  );

  if (hostname === "spotify.link") {
    return {
      trackId: "",
      spotifyUrl: parsedUrl.toString(),
      spotifyUri: "",
    };
  }

  if (
    hostname !== "open.spotify.com" ||
    trackIndex === -1 ||
    !pathParts[trackIndex + 1]
  ) {
    return null;
  }

  const trackId = pathParts[trackIndex + 1];
  return {
    trackId,
    spotifyUrl: `https://open.spotify.com/track/${trackId}`,
    spotifyUri: `spotify:track:${trackId}`,
  };
}

function normalizeSongWidget(widget) {
  if (!widget) return false;

  const rawData =
    widget.data && typeof widget.data === "object" ? widget.data : {};
  let changed = widget.data !== rawData;
  const normalizedTrack = normalizeSpotifyTrackUrl(
    rawData.spotifyUrl || rawData.note || "",
  );
  const accentValue = Number(rawData.accent);
  const durationLabel =
    typeof rawData.durationLabel === "string" && rawData.durationLabel.trim()
      ? rawData.durationLabel.trim()
      : Number.isFinite(rawData.durationMs)
        ? formatDurationLabel(rawData.durationMs)
        : "";
  const normalizedComments = getPhotoWidgetComments({
    id: widget.id,
    data: rawData,
  });

  const nextData = {
    spotifyUrl:
      normalizedTrack?.spotifyUrl ||
      (typeof rawData.spotifyUrl === "string" ? rawData.spotifyUrl.trim() : ""),
    spotifyUri:
      normalizedTrack?.spotifyUri ||
      (typeof rawData.spotifyUri === "string" ? rawData.spotifyUri.trim() : ""),
    songName:
      typeof rawData.songName === "string" && rawData.songName.trim()
        ? rawData.songName.trim()
        : typeof rawData.title === "string"
          ? rawData.title.trim()
          : "",
    durationLabel,
    coverUrl:
      typeof rawData.coverUrl === "string" && rawData.coverUrl.trim()
        ? rawData.coverUrl.trim()
        : typeof rawData.image === "string"
          ? rawData.image.trim()
          : "",
    accent: Math.max(
      6,
      Math.min(94, Number.isFinite(accentValue) ? accentValue : 38),
    ),
    likes: getWidgetLikeUserIds({ data: rawData }),
    likeTimestamps: getWidgetLikeTimestamps({ data: rawData }),
    comments: normalizedComments,
  };

  const keysToKeep = [
    "spotifyUrl",
    "spotifyUri",
    "songName",
    "durationLabel",
    "coverUrl",
    "accent",
    "likes",
    "likeTimestamps",
    "comments",
  ];
  const hasLegacyShape =
    Object.keys(rawData).some((key) => !keysToKeep.includes(key)) ||
    keysToKeep.some((key) => rawData[key] !== nextData[key]);

  if (hasLegacyShape) {
    changed = true;
  }

  widget.data = nextData;
  return changed;
}

async function fetchSpotifyTrackCardData(value) {
  const normalizedTrack = normalizeSpotifyTrackUrl(value);
  if (!normalizedTrack) {
    throw new Error("please paste a Spotify track link ♡");
  }

  const response = await fetch(
    `https://open.spotify.com/oembed?url=${encodeURIComponent(normalizedTrack.spotifyUrl)}`,
  );

  if (!response.ok) {
    throw new Error("could not fetch this Spotify track ♡");
  }

  const data = await response.json();
  const iframeUrl = String(data?.iframe_url || "");
  const isTrackEmbed = iframeUrl.includes("/embed/track/");
  const iframeTrackMatch = iframeUrl.match(/\/embed\/track\/([a-zA-Z0-9]+)/i);
  const iframeTrackId = iframeTrackMatch?.[1] || normalizedTrack.trackId || "";

  if (!isTrackEmbed) {
    throw new Error("that link is not a Spotify track ♡");
  }

  return {
    spotifyUrl: iframeTrackId
      ? `https://open.spotify.com/track/${iframeTrackId}`
      : normalizedTrack.spotifyUrl,
    spotifyUri: iframeTrackId
      ? `spotify:track:${iframeTrackId}`
      : normalizedTrack.spotifyUri,
    songName: String(data?.title || "").trim(),
    coverUrl: String(data?.thumbnail_url || "").trim(),
    durationLabel: "",
    accent: 38,
  };
}

function normalizeMissYouWidget(widget) {
  if (!widget) return false;

  const todayKey = getTodayDateKey();
  let changed =
    !widget.data ||
    typeof widget.data !== "object" ||
    Array.isArray(widget.data);
  widget.data = changed ? {} : widget.data;

  if (
    !widget.data.countsByUser ||
    typeof widget.data.countsByUser !== "object"
  ) {
    const migratedCounts = {};
    const legacyCount = Number.isFinite(widget.data.count)
      ? widget.data.count
      : 0;
    const currentUserId = currentProfile?.id || currentUser?.id || "";

    if (legacyCount > 0 && currentUserId) {
      migratedCounts[currentUserId] = legacyCount;
    }

    widget.data.countsByUser = migratedCounts;
    changed = true;
  }

  if (
    !widget.data.totalCountsByUser ||
    typeof widget.data.totalCountsByUser !== "object"
  ) {
    const migratedTotals = {};

    Object.entries(widget.data.countsByUser || {}).forEach(([userId, count]) => {
      if (Number.isFinite(count) && count > 0) {
        migratedTotals[userId] = count;
      }
    });

    widget.data.totalCountsByUser = migratedTotals;
    changed = true;
  }

  if (widget.data.lastResetDate !== todayKey) {
    widget.data.countsByUser = {};
    widget.data.lastResetDate = todayKey;
    changed = true;
  }

  Object.keys(widget.data.countsByUser).forEach((userId) => {
    const count = widget.data.countsByUser[userId];
    const numericCount = Number(count);

    if (!Number.isFinite(numericCount) || numericCount < 0) {
      widget.data.countsByUser[userId] = 0;
      changed = true;
    } else if (count !== numericCount) {
      widget.data.countsByUser[userId] = numericCount;
      changed = true;
    }
  });

  Object.keys(widget.data.totalCountsByUser).forEach((userId) => {
    const count = widget.data.totalCountsByUser[userId];
    const numericCount = Number(count);

    if (!Number.isFinite(numericCount) || numericCount < 0) {
      widget.data.totalCountsByUser[userId] = 0;
      changed = true;
    } else if (count !== numericCount) {
      widget.data.totalCountsByUser[userId] = numericCount;
      changed = true;
    }
  });

  if ("count" in widget.data) {
    delete widget.data.count;
    changed = true;
  }

  return changed;
}

function isLikeableWidget(widget) {
  const normalizedId = String(widget?.id || "")
    .toLowerCase()
    .trim();
  const normalizedTitle = String(widget?.title || "").toLowerCase();

  return (
    normalizedId === "song" ||
    normalizedId === "note" ||
    normalizedTitle.includes("little note") ||
    normalizedTitle.includes("smol note") ||
    normalizedId.startsWith("photo-pin") ||
    normalizedTitle.includes("pinned photo") ||
    normalizedTitle.includes("pinned") ||
    normalizedTitle.includes("pin it")
  );
}

function isCommentableWidget(widget) {
  const normalizedId = String(widget?.id || "")
    .toLowerCase()
    .trim();
  const normalizedTitle = String(widget?.title || "").toLowerCase();

  return (
    normalizedId === "song" ||
    normalizedId.startsWith("photo-pin") ||
    normalizedTitle.includes("pinned photo") ||
    normalizedTitle.includes("pinned") ||
    normalizedTitle.includes("pin it")
  );
}

function getWidgetLikeUserIds(widget) {
  const widgetData =
    widget?.data && typeof widget.data === "object" ? widget.data : {};
  const rawLikes = Array.isArray(widgetData.likes)
    ? widgetData.likes
    : Array.isArray(widgetData.likedUserIds)
      ? widgetData.likedUserIds
      : [];

  return [
    ...new Set(
      rawLikes.map((userId) => String(userId || "").trim()).filter(Boolean),
    ),
  ];
}

function getWidgetLikeTimestamps(widget) {
  const widgetData =
    widget?.data && typeof widget.data === "object" ? widget.data : {};
  return widgetData.likeTimestamps &&
    typeof widgetData.likeTimestamps === "object"
    ? widgetData.likeTimestamps
    : {};
}

function normalizeWidgetLikesData(widget) {
  if (!widget || !isLikeableWidget(widget)) return false;

  const rawData =
    widget.data && typeof widget.data === "object" ? widget.data : {};
  const normalizedLikes = getWidgetLikeUserIds({ data: rawData });
  const rawTimestamps =
    rawData.likeTimestamps && typeof rawData.likeTimestamps === "object"
      ? rawData.likeTimestamps
      : {};
  const normalizedLikeSet = new Set(normalizedLikes);
  const normalizedTimestamps = {};

  Object.entries(rawTimestamps).forEach(([userId, timestamp]) => {
    const normalizedUserId = String(userId || "").trim();
    const normalizedTimestamp = String(timestamp || "").trim();
    if (
      normalizedUserId &&
      normalizedLikeSet.has(normalizedUserId) &&
      normalizedTimestamp
    ) {
      normalizedTimestamps[normalizedUserId] = normalizedTimestamp;
    }
  });

  const hadLegacyLikesKey = Object.prototype.hasOwnProperty.call(
    rawData,
    "likedUserIds",
  );
  const timestampsAlreadyNormalized =
    Object.keys(rawTimestamps).length ===
      Object.keys(normalizedTimestamps).length &&
    Object.entries(normalizedTimestamps).every(
      ([userId, timestamp]) => rawTimestamps[userId] === timestamp,
    );
  const likesAlreadyNormalized =
    Array.isArray(rawData.likes) &&
    rawData.likes.length === normalizedLikes.length &&
    rawData.likes.every(
      (userId, index) => String(userId || "").trim() === normalizedLikes[index],
    );

  if (
    widget.data === rawData &&
    likesAlreadyNormalized &&
    timestampsAlreadyNormalized &&
    !hadLegacyLikesKey
  ) {
    return false;
  }

  const nextData = {
    ...rawData,
    likes: normalizedLikes,
    likeTimestamps: normalizedTimestamps,
  };
  delete nextData.likedUserIds;
  widget.data = nextData;
  return true;
}

function getWidgetCommentCount(widget) {
  if (!widget || !isCommentableWidget(widget)) return 0;

  return getPhotoWidgetComments(widget).reduce(
    (total, comment) => total + 1 + (comment.replies || []).length,
    0,
  );
}

function getWidgetCommentSeenUserId() {
  return currentUser?.id || currentProfile?.id || "";
}

function getWidgetCommentCreatedTimestamp(comment) {
  return new Date(comment?.createdAt || comment?.created_at || "").getTime();
}

function getWidgetCommentSeenMap() {
  try {
    const parsed = JSON.parse(
      localStorage.getItem(WIDGET_COMMENT_SEEN_STORAGE_KEY) || "{}",
    );
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function getWidgetCommentSeenAt(widgetId) {
  const userId = getWidgetCommentSeenUserId();
  if (!userId || !widgetId) return "";

  const seenMap = getWidgetCommentSeenMap();
  return String(seenMap[userId]?.[widgetId] || "");
}

function setWidgetCommentSeenAt(widgetId, seenAt) {
  const userId = getWidgetCommentSeenUserId();
  if (!userId || !widgetId || !seenAt) return;

  const seenMap = getWidgetCommentSeenMap();
  seenMap[userId] = {
    ...(seenMap[userId] && typeof seenMap[userId] === "object"
      ? seenMap[userId]
      : {}),
    [widgetId]: seenAt,
  };

  try {
    localStorage.setItem(
      WIDGET_COMMENT_SEEN_STORAGE_KEY,
      JSON.stringify(seenMap),
    );
  } catch (error) {
    console.error(error);
  }
}

function getLatestWidgetCommentCreatedAt(widget) {
  if (!widget || !isCommentableWidget(widget)) return "";

  let latestTimestamp = 0;
  let latestCreatedAt = "";
  getPhotoWidgetComments(widget).forEach((comment) => {
    [comment, ...(comment.replies || [])].forEach((item) => {
      const timestamp = getWidgetCommentCreatedTimestamp(item);
      if (Number.isFinite(timestamp) && timestamp > latestTimestamp) {
        latestTimestamp = timestamp;
        latestCreatedAt = String(item?.createdAt || item?.created_at || "");
      }
    });
  });

  return latestCreatedAt;
}

function getWidgetCommentBaselineTimestamp(widget) {
  const seenTimestamp = Math.max(
    getNotificationTimestamp(getWidgetCommentSeenAt(widget?.id || "")),
    getNotificationTimestamp(getNotificationsSeenAt()),
  );
  if (seenTimestamp) return seenTimestamp;

  const latestCreatedAt = getLatestWidgetCommentCreatedAt(widget);
  const latestTimestamp = getWidgetCommentCreatedTimestamp({
    createdAt: latestCreatedAt,
  });
  return Number.isFinite(latestTimestamp) ? latestTimestamp : 0;
}

function getUnreadWidgetCommentCount(widget) {
  if (!widget || !isCommentableWidget(widget)) return 0;

  const userId = getWidgetCommentSeenUserId();
  if (!userId) return 0;

  const seenTimestamp = getWidgetCommentBaselineTimestamp(widget);
  return getPhotoWidgetComments(widget).reduce((total, comment) => {
    return (
      total +
      [comment, ...(comment.replies || [])].filter((item) => {
        const actorId = String(item?.userId || item?.user_id || "");
        if (!actorId || actorId === userId) return false;

        const createdAt = getWidgetCommentCreatedTimestamp(item);
        return Number.isFinite(createdAt) && createdAt > seenTimestamp;
      }).length
    );
  }, 0);
}

function markWidgetCommentsSeen(widget) {
  const latestCreatedAt = getLatestWidgetCommentCreatedAt(widget);
  if (!latestCreatedAt) return;

  setWidgetCommentSeenAt(widget.id, latestCreatedAt);
  syncWidgetCommentButton(widget.id);
}

function getLikeButtonMarkup(likedByMe, likesCount) {
  return `
    <span class="post-btn-icon" aria-hidden="true">${likedByMe ? "🩷" : "♡"}</span>
    <span class="post-btn-label">${likedByMe ? "liked" : "like"}</span>
    <span class="post-btn-count">(${likesCount || 0})</span>
  `;
}

function getWidgetLikeButtonMarkup(widget) {
  const currentUserId = currentUser?.id || currentProfile?.id || "";
  const likes = getWidgetLikeUserIds(widget);
  const likedByMe = Boolean(currentUserId && likes.includes(currentUserId));
  return `
    <span class="post-btn-icon" aria-hidden="true">${likedByMe ? "🩷" : "♡"}</span>
    <span class="post-btn-count">${likes.length || 0}</span>
  `;
}

function getWidgetCommentButtonMarkup(widget) {
  const unreadCount = getUnreadWidgetCommentCount(widget);
  return `
    <span class="post-btn-icon" aria-hidden="true">💬</span>
    ${unreadCount > 0 ? `<span class="post-btn-count">${unreadCount}</span>` : ""}
  `;
}

function getWidgetHeaderLikeButtonMarkup(widget, extraClass = "") {
  if (!widget || !isLikeableWidget(widget)) return "";

  const currentUserId = currentUser?.id || currentProfile?.id || "";
  const likes = getWidgetLikeUserIds(widget);
  const likedByMe = Boolean(currentUserId && likes.includes(currentUserId));
  const isPending = pendingWidgetLikeIds.has(widget.id);
  const className = [
    "widget-header-like-btn",
    "widget-like-btn",
    likedByMe ? "liked" : "",
    isPending ? "is-pending" : "",
    extraClass,
  ]
    .filter(Boolean)
    .join(" ");

  return `
    <button
      class="${className}"
      type="button"
      data-widget-like-id="${escapeHtml(widget.id)}"
      aria-label="${likedByMe ? "liked widget" : "like widget"}"
      aria-pressed="${String(likedByMe)}"
    >
      ${getWidgetLikeButtonMarkup(widget)}
    </button>
  `;
}

function getWidgetHeaderCommentButtonMarkup(widget, extraClass = "") {
  if (!widget || !isCommentableWidget(widget)) return "";

  const unreadCount = getUnreadWidgetCommentCount(widget);
  const className = [
    "widget-header-comment-btn",
    "widget-comment-btn",
    unreadCount > 0 ? "is-unread" : "",
    extraClass,
  ]
    .filter(Boolean)
    .join(" ");

  return `
    <button
      class="${className}"
      type="button"
      data-widget-comment-id="${escapeHtml(widget.id)}"
      aria-label="${unreadCount > 0 ? `open ${unreadCount} new widget comments` : "open widget comments"}"
    >
      ${getWidgetCommentButtonMarkup(widget)}
    </button>
  `;
}

function syncWidgetCommentButton(widgetId) {
  const widget = widgets.find((item) => item.id === widgetId);
  const buttons = Array.from(
    document.querySelectorAll(
      `.widget-comment-btn[data-widget-comment-id="${widgetId}"]`,
    ),
  );

  if (!widget || !buttons.length || !isCommentableWidget(widget)) return;

  buttons.forEach((btn) => {
    const unreadCount = getUnreadWidgetCommentCount(widget);
    btn.innerHTML = getWidgetCommentButtonMarkup(widget);
    btn.classList.toggle("is-unread", unreadCount > 0);
    btn.setAttribute(
      "aria-label",
      unreadCount > 0
        ? `open ${unreadCount} new widget comments`
        : "open widget comments",
    );
  });
}

function syncWidgetCommentButtons() {
  widgets.forEach((widget) => {
    if (isCommentableWidget(widget)) {
      syncWidgetCommentButton(widget.id);
    }
  });
}

function getWidgetLikeContentSignature(widget) {
  if (!widget || !isLikeableWidget(widget)) return "";

  const normalizedId = String(widget.id || "")
    .toLowerCase()
    .trim();
  const normalizedTitle = String(widget.title || "").toLowerCase();
  const data =
    widget.data && typeof widget.data === "object" ? widget.data : {};

  if (normalizedId === "song") {
    return JSON.stringify({
      spotifyUrl: data.spotifyUrl || "",
      spotifyUri: data.spotifyUri || "",
      songName: data.songName || "",
      durationLabel: data.durationLabel || "",
      coverUrl: data.coverUrl || "",
    });
  }

  if (
    normalizedId === "note" ||
    normalizedTitle.includes("little note") ||
    normalizedTitle.includes("smol note")
  ) {
    return JSON.stringify({
      text: data.text || "",
    });
  }

  return JSON.stringify({
    image: data.image || "",
    text: data.text || "",
    textColor: normalizeHexColor(data.textColor, "#ffffff"),
    textSize: Math.max(12, Math.min(46, Number(data.textSize) || 22)),
    textX: Math.max(
      0,
      Math.min(
        100,
        Number.isFinite(Number(data.textX)) ? Number(data.textX) : 50,
      ),
    ),
    textY: Math.max(
      0,
      Math.min(
        100,
        Number.isFinite(Number(data.textY)) ? Number(data.textY) : 86,
      ),
    ),
    rotate: Number(data.rotate) || 0,
  });
}

function syncWidgetLikeButton(widgetId) {
  const widget = widgets.find((item) => item.id === widgetId);
  const buttons = Array.from(
    document.querySelectorAll(
      `.widget-like-btn[data-widget-like-id="${widgetId}"]`,
    ),
  );

  if (!widget || !buttons.length || !isLikeableWidget(widget)) return;

  const currentUserId = currentUser?.id || currentProfile?.id || "";
  const likes = getWidgetLikeUserIds(widget);
  const likedByMe = Boolean(currentUserId && likes.includes(currentUserId));

  buttons.forEach((btn) => {
    btn.innerHTML = getWidgetLikeButtonMarkup(widget);
    btn.classList.toggle("liked", likedByMe);
    btn.classList.toggle("is-pending", pendingWidgetLikeIds.has(widgetId));
    btn.setAttribute("aria-label", likedByMe ? "liked widget" : "like widget");
    btn.setAttribute("aria-pressed", String(likedByMe));
  });
}

function getProfileDisplayName(profile, fallback) {
  if (!profile || typeof profile !== "object") return fallback;
  const name = String(profile.nickname || profile.username || "").trim();
  return name || fallback;
}

function getProfileIdentityText(profile) {
  return `${profile?.nickname || ""} ${profile?.username || ""}`.toLowerCase();
}

function getProfileSubjectPronoun(profile) {
  const identity = getProfileIdentityText(profile);

  if (identity.includes("toto")) return "he";
  if (identity.includes("dodo")) return "she";
  return "they";
}

function getProfileObjectPronoun(profile) {
  const subjectPronoun = getProfileSubjectPronoun(profile);

  if (subjectPronoun === "he") return "him";
  if (subjectPronoun === "she") return "her";
  return "them";
}

function getProfileBioFromAuthUser(user) {
  const metadata = user?.user_metadata || {};
  if (Object.prototype.hasOwnProperty.call(metadata, "profile_bio")) {
    return String(metadata.profile_bio || "");
  }
  if (Object.prototype.hasOwnProperty.call(metadata, "bio")) {
    return String(metadata.bio || "");
  }
  return null;
}

function getStoredProfileBio(userId) {
  if (!userId) return null;

  try {
    const storedBioMap = JSON.parse(
      localStorage.getItem(PROFILE_BIO_STORAGE_KEY) || "{}",
    );

    if (
      storedBioMap &&
      typeof storedBioMap === "object" &&
      Object.prototype.hasOwnProperty.call(storedBioMap, userId)
    ) {
      return String(storedBioMap[userId] || "");
    }
  } catch (error) {
    console.error(error);
  }

  return null;
}

function saveStoredProfileBio(userId, bio) {
  if (!userId) return;

  try {
    const storedBioMap = JSON.parse(
      localStorage.getItem(PROFILE_BIO_STORAGE_KEY) || "{}",
    );
    const nextBioMap =
      storedBioMap && typeof storedBioMap === "object" ? storedBioMap : {};

    nextBioMap[userId] = String(bio || "");
    localStorage.setItem(PROFILE_BIO_STORAGE_KEY, JSON.stringify(nextBioMap));
  } catch (error) {
    console.error(error);
  }
}

function normalizeSharedProfileBios(value) {
  const source =
    value && typeof value === "object" && value.bios && typeof value.bios === "object"
      ? value.bios
      : value && typeof value === "object"
        ? value
        : {};
  const normalized = {};

  Object.entries(source).forEach(([userId, bio]) => {
    const normalizedUserId = String(userId || "").trim();
    if (!normalizedUserId) return;
    normalized[normalizedUserId] = String(bio || "");
  });

  return normalized;
}

function getSharedProfileBio(userId) {
  const normalizedUserId = String(userId || "").trim();
  if (
    !normalizedUserId ||
    !Object.prototype.hasOwnProperty.call(sharedProfileBios, normalizedUserId)
  ) {
    return null;
  }

  return String(sharedProfileBios[normalizedUserId] || "");
}

async function loadSharedProfileBios(options = {}) {
  const { force = false } = options;

  if (sharedProfileBiosFetchPromise && !force) {
    return sharedProfileBiosFetchPromise;
  }

  sharedProfileBiosFetchPromise = (async () => {
    const { data, error } = await supabaseClient
      .from("widgets")
      .select("data")
      .eq("id", PROFILE_BIO_WIDGET_ID)
      .maybeSingle();

    if (error) {
      console.error(error);
      return sharedProfileBios;
    }

    sharedProfileBios = normalizeSharedProfileBios(data?.data || {});
    return sharedProfileBios;
  })();

  try {
    return await sharedProfileBiosFetchPromise;
  } finally {
    sharedProfileBiosFetchPromise = null;
  }
}

async function saveSharedProfileBio(userId, bio) {
  const normalizedUserId = String(userId || "").trim();
  if (!normalizedUserId) return false;

  await loadSharedProfileBios({ force: true });

  const nextBios = {
    ...sharedProfileBios,
    [normalizedUserId]: String(bio || ""),
  };
  const now = new Date().toISOString();
  const payload = {
    title: PROFILE_BIO_WIDGET_TITLE,
    side: "left",
    x: 0,
    y: 0,
    data: {
      bios: nextBios,
      updatedAt: now,
      updatedBy: normalizedUserId,
    },
    content: null,
    updated_at: now,
  };

  markPendingLocalWidgetUpdate(PROFILE_BIO_WIDGET_ID, payload.updated_at);

  const { data: updatedRows, error: updateError } = await supabaseClient
    .from("widgets")
    .update(payload)
    .eq("id", PROFILE_BIO_WIDGET_ID)
    .select("id");

  if (updateError) {
    console.error(updateError);
    return false;
  }

  if (!updatedRows?.length) {
    const { error: insertError } = await supabaseClient.from("widgets").insert({
      id: PROFILE_BIO_WIDGET_ID,
      ...payload,
    });

    if (insertError) {
      console.error(insertError);
      return false;
    }
  }

  sharedProfileBios = nextBios;
  return true;
}

function getProfileBio(profile, userId = "", user = currentUser) {
  const resolvedUserId = userId || profile?.id || "";

  if (
    profile &&
    typeof profile === "object" &&
    Object.prototype.hasOwnProperty.call(profile, "bio")
  ) {
    const profileBio = String(profile.bio || "").trim();
    if (profileBio) return profileBio;
  }

  const sharedBio = getSharedProfileBio(resolvedUserId);
  if (sharedBio !== null && sharedBio.trim()) {
    return sharedBio.trim();
  }

  const metadataBio = getProfileBioFromAuthUser(user);
  if (metadataBio !== null && metadataBio.trim()) {
    return metadataBio.trim();
  }

  const storedBio = getStoredProfileBio(resolvedUserId);
  return storedBio === null ? "" : storedBio.trim();
}

async function persistProfileBioBackup(user, bio) {
  const userId = user?.id || currentProfile?.id || "";
  const nextBio = String(bio || "");

  saveStoredProfileBio(userId, nextBio);

  if (!user) return;

  try {
    const { data, error } = await supabaseClient.auth.updateUser({
      data: {
        ...(user.user_metadata || {}),
        profile_bio: nextBio,
      },
    });

    if (error) {
      console.error(error);
      return;
    }

    if (data?.user) {
      currentUser = data.user;
    }
  } catch (error) {
    console.error(error);
  }
}

function mergeProfileRecords(existingProfile = {}, incomingProfile = {}) {
  const nextProfile = {
    ...(existingProfile && typeof existingProfile === "object"
      ? existingProfile
      : {}),
  };

  if (!incomingProfile || typeof incomingProfile !== "object") {
    return nextProfile;
  }

  Object.entries(incomingProfile).forEach(([key, value]) => {
    if (value !== undefined) {
      nextProfile[key] = value;
    }
  });

  return nextProfile;
}

function upsertKnownProfile(profile) {
  if (!profile?.id) return;

  const existingProfile = knownProfiles.find((item) => item?.id === profile.id);
  const nextProfile = mergeProfileRecords(existingProfile, profile);

  knownProfiles = existingProfile
    ? knownProfiles.map((item) => (item?.id === profile.id ? nextProfile : item))
    : [nextProfile, ...knownProfiles];
}

function replaceKnownProfiles(profiles = []) {
  const profileMap = new Map(
    knownProfiles
      .filter((profile) => profile?.id)
      .map((profile) => [profile.id, profile]),
  );

  profiles.forEach((profile) => {
    if (!profile?.id) return;
    profileMap.set(
      profile.id,
      mergeProfileRecords(profileMap.get(profile.id), profile),
    );
  });

  if (currentProfile?.id) {
    profileMap.set(
      currentProfile.id,
      mergeProfileRecords(profileMap.get(currentProfile.id), currentProfile),
    );
  }

  knownProfiles = [...profileMap.values()];
}

function getKnownProfileById(userId, fallbackProfile = null) {
  if (!userId) {
    return fallbackProfile && typeof fallbackProfile === "object"
      ? { ...fallbackProfile }
      : null;
  }

  const matchingKnownProfile = knownProfiles.find((profile) => profile?.id === userId);
  const matchingCurrentProfile = currentProfile?.id === userId ? currentProfile : null;
  const mergedProfile = mergeProfileRecords(
    mergeProfileRecords(fallbackProfile, matchingKnownProfile),
    matchingCurrentProfile,
  );

  return mergedProfile?.id ? mergedProfile : null;
}

function isCurrentUsersProfile(userId) {
  if (!userId) return false;
  return userId === (currentProfile?.id || currentUser?.id || "");
}

function getProfileHandle(profile, fallbackUserId = "") {
  const username = String(profile?.username || "").trim();
  if (username) return `@${username}`;
  return fallbackUserId ? `id ${fallbackUserId.slice(0, 8)}` : "@memory";
}

function getRelatedProfiles(profileUserId, fallbackProfile = null) {
  const relatedProfiles = [
    getKnownProfileById(profileUserId, fallbackProfile),
    currentProfile,
    ...knownProfiles,
  ].filter((profile) => profile?.id);

  return relatedProfiles.filter(
    (profile, index, list) =>
      list.findIndex((item) => item.id === profile.id) === index,
  );
}

function getProfileMissYouStatLabel(userId, profile = null) {
  const counterpartProfile = getRelatedProfiles(userId, profile).find(
    (candidateProfile) => candidateProfile?.id !== userId,
  );

  return `missed ${getProfileObjectPronoun(counterpartProfile)}`;
}

function formatProfileDurationShort(dateString) {
  const timestamp = new Date(dateString).getTime();
  if (!timestamp) return "new";

  const diffMs = Math.max(0, Date.now() - timestamp);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays < 1) return "today";
  if (diffDays < 7) return `${diffDays}d`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 5) return `${diffWeeks}w`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${Math.max(1, diffMonths)}mo`;

  return `${Math.floor(diffDays / 365)}y`;
}

function getProfileJoinedInfo(userId, profile = null) {
  const directCreatedAt = String(profile?.created_at || "").trim();
  if (directCreatedAt && Number.isFinite(new Date(directCreatedAt).getTime())) {
    return {
      date: directCreatedAt,
      value: formatProfileDurationShort(directCreatedAt),
      label: "since signup",
      summary: `joined ${formatEntryDate(directCreatedAt)}`,
    };
  }

  const activityDates = [];

  posts.forEach((post) => {
    if (post?.userId === userId && post?.created_at) {
      activityDates.push(post.created_at);
    }
  });

  (notificationSourceData.likesData || []).forEach((like) => {
    if (like?.user_id === userId && like?.created_at) {
      activityDates.push(like.created_at);
    }
  });

  (notificationSourceData.commentsData || []).forEach((comment) => {
    if (comment?.user_id === userId && comment?.created_at) {
      activityDates.push(comment.created_at);
    }
  });

  (notificationSourceData.stickersData || []).forEach((sticker) => {
    if (sticker?.user_id === userId && sticker?.created_at) {
      activityDates.push(sticker.created_at);
    }
  });

  widgets.forEach((widget) => {
    if (!isLikeableWidget(widget)) return;
    normalizeWidgetLikesData(widget);
    const likeTimestamps = getWidgetLikeTimestamps(widget);
    const createdAt = likeTimestamps[userId];
    if (createdAt) {
      activityDates.push(createdAt);
    }
  });

  const earliestActivity = activityDates
    .filter((value) => Number.isFinite(new Date(value).getTime()))
    .sort((left, right) => new Date(left).getTime() - new Date(right).getTime())[0];

  if (earliestActivity) {
    return {
      date: earliestActivity,
      value: formatProfileDurationShort(earliestActivity),
      label: "at least",
      summary: `around here since ${formatEntryDate(earliestActivity)}`,
    };
  }

  return {
    date: "",
    value: "new",
    label: "time here",
    summary: "signup date hidden",
  };
}

function getProfileLikeCount(userId) {
  const postAndCommentLikes = (notificationSourceData.likesData || []).filter(
    (like) => like?.user_id === userId,
  ).length;

  const widgetLikes = widgets.reduce((total, widget) => {
    if (!isLikeableWidget(widget)) return total;
    normalizeWidgetLikesData(widget);
    return total + getWidgetLikeUserIds(widget).filter((id) => id === userId).length;
  }, 0);

  return postAndCommentLikes + widgetLikes;
}

function getProfileMissYouCount(userId) {
  if (!userId) return 0;

  const missYouWidget = getMissYouWidget();
  if (!missYouWidget) return 0;

  normalizeMissYouWidget(missYouWidget);
  const totalCountsByUser =
    missYouWidget.data?.totalCountsByUser &&
    typeof missYouWidget.data.totalCountsByUser === "object"
      ? missYouWidget.data.totalCountsByUser
      : {};
  const countsByUser =
    missYouWidget.data?.countsByUser &&
    typeof missYouWidget.data.countsByUser === "object"
      ? missYouWidget.data.countsByUser
      : {};

  const total = totalCountsByUser[userId] ?? countsByUser[userId];
  return Number.isFinite(total) && total > 0 ? total : 0;
}

function getProfileLatestActivityTimestamp(userId, profile = null) {
  if (!userId) return 0;

  const candidateTimestamps = [];
  const pushTimestamp = (value) => {
    const timestamp = new Date(value || "").getTime();
    if (Number.isFinite(timestamp) && timestamp > 0) {
      candidateTimestamps.push(timestamp);
    }
  };

  pushTimestamp(profile?.last_seen_at);

  (notificationSourceData.postsData || []).forEach((post) => {
    if (post?.user_id !== userId) return;
    pushTimestamp(post.created_at);
    pushTimestamp(post.updated_at);
  });

  (notificationSourceData.likesData || []).forEach((like) => {
    if (like?.user_id === userId) {
      pushTimestamp(like.created_at);
    }
  });

  (notificationSourceData.commentsData || []).forEach((comment) => {
    if (comment?.user_id === userId) {
      pushTimestamp(comment.created_at);
    }
  });

  (notificationSourceData.stickersData || []).forEach((sticker) => {
    if (sticker?.user_id === userId) {
      pushTimestamp(sticker.created_at);
    }
  });

  widgets.forEach((widget) => {
    const widgetData = getWidgetDataForNotifications(widget);

    if (widgetData.lastUpdatedBy === userId) {
      pushTimestamp(widgetData.lastUpdatedAt);
    }

    if (!isLikeableWidget(widget)) return;

    normalizeWidgetLikesData(widget);
    pushTimestamp(getWidgetLikeTimestamps(widget)[userId]);
  });

  return candidateTimestamps.length ? Math.max(...candidateTimestamps) : 0;
}

function getProfilePresenceInfo(userId, profile = null) {
  const latestActivityTimestamp = getProfileLatestActivityTimestamp(
    userId,
    profile,
  );

  if (!latestActivityTimestamp) {
    return {
      state: "unknown",
      summary: "last seen hidden",
      timestamp: 0,
    };
  }

  const diffMs = Math.max(0, Date.now() - latestActivityTimestamp);

  if (diffMs <= PROFILE_ACTIVE_WINDOW_MS) {
    return {
      state: "active",
      summary: "active now",
      timestamp: latestActivityTimestamp,
    };
  }

  return {
    state: "away",
    summary: `last seen ${formatNotificationRelativeTime(
      new Date(latestActivityTimestamp).toISOString(),
    )}`,
    timestamp: latestActivityTimestamp,
  };
}

function getProfileStats(userId, profile = null) {
  return {
    postsCount: posts.filter((post) => post?.userId === userId).length,
    likesCount: getProfileLikeCount(userId),
    missYouCount: getProfileMissYouCount(userId),
    joined: getProfileJoinedInfo(userId, profile),
    presence: getProfilePresenceInfo(userId, profile),
  };
}

function renderProfilePopupAvatar(profile) {
  if (!profileSummaryAvatar) return;

  const avatarUrl = String(profile?.avatar_url || "").trim();
  const displayName = getProfileDisplayName(profile, "memory");

  if (avatarUrl) {
    profileSummaryAvatar.innerHTML = `<img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(displayName)}" loading="lazy" decoding="async" />`;
    return;
  }

  profileSummaryAvatar.textContent = displayName.charAt(0).toUpperCase() || "♡";
}

function isProfilePopupEditing() {
  return Boolean(profilePopupEditMode);
}

function setProfilePopupEditMode(isEditing) {
  const viewingOwnProfile = isCurrentUsersProfile(activeProfilePopupUserId);
  const shouldEdit = Boolean(viewingOwnProfile && isEditing);
  const popupBody = profilePopup?.querySelector(".popup-body");
  const previousPopupScrollTop = popupBody?.scrollTop || 0;
  const activeElement = document.activeElement;
  const shouldBlurEditField =
    !shouldEdit &&
    activeElement instanceof HTMLElement &&
    Boolean(profileEditSection?.contains(activeElement));

  profilePopupEditMode = shouldEdit;

  if (shouldBlurEditField) {
    activeElement.blur();
  }

  if (profileEditSection) {
    profileEditSection.hidden = !shouldEdit;
  }

  if (editProfileBtn) {
    editProfileBtn.hidden = !viewingOwnProfile || shouldEdit;
  }

  if (cancelProfileEditBtn) {
    cancelProfileEditBtn.hidden = !shouldEdit;
  }

  if (logoutBtn) {
    logoutBtn.hidden = !viewingOwnProfile || shouldEdit;
  }

  if (saveProfileBtn) {
    saveProfileBtn.hidden = !shouldEdit;
  }

  if (popupBody) {
    popupBody.scrollTop = previousPopupScrollTop;
  }
}

function closeProfileDetailsPopup() {
  activeProfilePopupUserId = "";
  setProfilePopupEditMode(false);
  if (profilePopup) {
    profilePopup.classList.remove("open");
  }
}

function renderProfilePopup(profile, options = {}) {
  const resolvedProfile = profile || {};
  const profileUserId = String(
    resolvedProfile.id ||
      activeProfilePopupUserId ||
      currentProfile?.id ||
      currentUser?.id ||
      "",
  );
  const isOwnProfile = isCurrentUsersProfile(profileUserId);
  const hasExplicitEditMode = Object.prototype.hasOwnProperty.call(
    options,
    "startEditing",
  );
  const shouldEditProfile =
    isOwnProfile &&
    (hasExplicitEditMode
      ? Boolean(options.startEditing)
      : isProfilePopupEditing());
  const popupBody = profilePopup?.querySelector(".popup-body");
  const previousPopupScrollTop = popupBody?.scrollTop || 0;
  const activeElement = document.activeElement;
  const shouldRestoreFocus =
    shouldEditProfile &&
    activeElement instanceof HTMLElement &&
    Boolean(profilePopup?.contains(activeElement));
  const displayName = getProfileDisplayName(
    resolvedProfile,
    isOwnProfile ? "you" : "memory",
  );
  const profileTitleEl = document.querySelector("#profilePopup .popup-title");
  const profileStats = getProfileStats(profileUserId, resolvedProfile);
  const bio = getProfileBio(
    resolvedProfile,
    profileUserId,
    isOwnProfile ? currentUser : null,
  );

  activeProfilePopupUserId = profileUserId;

  if (profileTitleEl) {
    profileTitleEl.textContent = isOwnProfile
      ? "my profile ♡"
      : `${displayName}'s profile ♡`;
  }

  renderProfilePopupAvatar(resolvedProfile);

  if (profileSummaryName) {
    profileSummaryName.textContent = displayName;
  }

  if (profileSummaryHandle) {
    profileSummaryHandle.textContent = getProfileHandle(resolvedProfile, profileUserId);
  }

  if (profileSummaryJoined) {
    profileSummaryJoined.textContent = profileStats.presence.summary;
    profileSummaryJoined.dataset.presenceState = profileStats.presence.state;
  }

  if (profileSummaryBio) {
    profileSummaryBio.textContent = bio || "no bio yet ♡";
  }

  if (profilePostsStat) {
    profilePostsStat.textContent = String(profileStats.postsCount);
  }

  if (profileLikesStat) {
    profileLikesStat.textContent = String(profileStats.likesCount);
  }

  if (profileMissYouStat) {
    profileMissYouStat.textContent = String(profileStats.missYouCount);
  }

  if (profileMissYouStatLabel) {
    profileMissYouStatLabel.textContent = getProfileMissYouStatLabel(
      profileUserId,
      resolvedProfile,
    );
  }

  if (profileJoinedStat) {
    profileJoinedStat.textContent = profileStats.joined.value;
  }

  if (profileJoinedStatLabel) {
    profileJoinedStatLabel.textContent = profileStats.joined.label;
  }

  if (isOwnProfile) {
    if (nicknameInput && !shouldEditProfile) {
      nicknameInput.value = String(currentProfile?.nickname || resolvedProfile.nickname || "");
    }
    if (bioInput && !shouldEditProfile) {
      bioInput.value = getProfileBio(
        currentProfile || resolvedProfile,
        profileUserId,
        currentUser,
      );
    }
    if (pfpInput && !shouldEditProfile) {
      pfpInput.value = "";
    }
  }

  setProfilePopupEditMode(shouldEditProfile);

  if (popupBody) {
    popupBody.scrollTop = previousPopupScrollTop;
  }

  if (
    shouldRestoreFocus &&
    document.contains(activeElement) &&
    !activeElement.hidden
  ) {
    activeElement.focus({ preventScroll: true });
  }
}

function applyLocalProfilePresence(userId, lastSeenAt) {
  const normalizedUserId = String(userId || "").trim();
  const normalizedLastSeenAt = String(lastSeenAt || "").trim();

  if (!normalizedUserId || !normalizedLastSeenAt) return;

  if (currentProfile?.id === normalizedUserId) {
    currentProfile = {
      ...currentProfile,
      last_seen_at: normalizedLastSeenAt,
    };
  }

  upsertKnownProfile({
    id: normalizedUserId,
    last_seen_at: normalizedLastSeenAt,
  });

  if (activeProfilePopupUserId === normalizedUserId) {
    renderProfilePopup(getKnownProfileById(normalizedUserId, currentProfile));
  }
}

async function touchCurrentUserPresence(options = {}) {
  const { force = false } = options;
  const user = await getCurrentUser();

  if (!user?.id) return;

  const now = Date.now();
  if (!force && now - lastPresenceSyncAt < PROFILE_PRESENCE_HEARTBEAT_MS / 2) {
    return;
  }

  lastPresenceSyncAt = now;
  const lastSeenAt = new Date(now).toISOString();
  applyLocalProfilePresence(user.id, lastSeenAt);

  if (profileLastSeenFieldSupported === false) {
    return;
  }

  const { data, error } = await supabaseClient
    .from("profiles")
    .update({ last_seen_at: lastSeenAt })
    .eq("id", user.id)
    .select("id, last_seen_at")
    .maybeSingle();

  if (error) {
    if (String(error.message || "").toLowerCase().includes("last_seen_at")) {
      profileLastSeenFieldSupported = false;
      return;
    }

    console.error(error);
    return;
  }

  profileLastSeenFieldSupported = true;
  applyLocalProfilePresence(user.id, data?.last_seen_at || lastSeenAt);
}

function stopProfilePresenceHeartbeat() {
  if (!profilePresenceHeartbeatId) return;

  window.clearInterval(profilePresenceHeartbeatId);
  profilePresenceHeartbeatId = 0;
}

function startProfilePresenceHeartbeat() {
  stopProfilePresenceHeartbeat();

  if (!currentUser) return;

  void touchCurrentUserPresence({ force: true });
  profilePresenceHeartbeatId = window.setInterval(() => {
    if (document.visibilityState === "hidden" || !currentUser) return;
    void touchCurrentUserPresence();
  }, PROFILE_PRESENCE_HEARTBEAT_MS);
}

async function openProfilePopupForUser(
  userId,
  fallbackProfile = null,
  options = {},
) {
  const user = await getCurrentUser();
  const resolvedUserId = String(userId || currentProfile?.id || user?.id || "").trim();

  if (!resolvedUserId) {
    showMessage("please log in first ♡");
    return;
  }

  if (user?.id === resolvedUserId && !currentProfile) {
    await loadProfile(user);
  }

  const resolvedProfile =
    getKnownProfileById(resolvedUserId, fallbackProfile) ||
    mergeProfileRecords(fallbackProfile, { id: resolvedUserId });

  renderProfilePopup(resolvedProfile, options);
  profilePopup?.classList.add("open");

  void refreshProfilePopupFromSupabase(resolvedUserId);
}

function bindProfilePopupTrigger(element, openProfilePopup) {
  if (!element || typeof openProfilePopup !== "function") return;

  element.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    void openProfilePopup();
  });

  element.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    void openProfilePopup();
  });
}

async function fetchProfilesDirectory() {
  const selectCandidates = [
    "id, nickname, username, avatar_url, bio, last_seen_at, created_at",
    "id, nickname, username, avatar_url, bio, created_at",
    "id, nickname, username, avatar_url, last_seen_at, created_at",
    "id, nickname, username, avatar_url, created_at",
    "id, nickname, username, avatar_url, last_seen_at",
    "id, nickname, username, avatar_url",
    "id, nickname, username",
  ];

  let lastError = null;

  for (const selectClause of selectCandidates) {
    const result = await supabaseClient.from("profiles").select(selectClause);
    if (!result.error) {
      return result;
    }
    lastError = result.error;
  }

  return { data: null, error: lastError };
}

async function fetchProfileById(userId) {
  const normalizedUserId = String(userId || "").trim();
  if (!normalizedUserId) {
    return { data: null, error: null };
  }

  const selectCandidates = [
    "id, nickname, username, avatar_url, bio, last_seen_at, created_at",
    "id, nickname, username, avatar_url, bio, created_at",
    "id, nickname, username, avatar_url, last_seen_at, created_at",
    "id, nickname, username, avatar_url, created_at",
    "id, nickname, username, avatar_url, last_seen_at",
    "id, nickname, username, avatar_url",
    "id, nickname, username",
  ];
  let lastError = null;

  for (const selectClause of selectCandidates) {
    const result = await supabaseClient
      .from("profiles")
      .select(selectClause)
      .eq("id", normalizedUserId)
      .maybeSingle();

    if (!result.error) {
      return result;
    }

    lastError = result.error;
  }

  return { data: null, error: lastError };
}

async function refreshProfilePopupFromSupabase(userId) {
  const normalizedUserId = String(userId || "").trim();
  if (!normalizedUserId) return;

  const existingFetch = pendingLocalProfileFetches.get(normalizedUserId);
  if (existingFetch) {
    await existingFetch;
    return;
  }

  const fetchPromise = (async () => {
    const [{ data, error }] = await Promise.all([
      fetchProfileById(normalizedUserId),
      loadSharedProfileBios(),
    ]);

    if (error) {
      console.error(error);
      return;
    }

    if (!data?.id) return;

    upsertKnownProfile(data);

    if (currentProfile?.id === data.id) {
      currentProfile = mergeProfileRecords(currentProfile, data);
    }

    applyProfileToTimeline(data);

    if (
      profilePopup?.classList.contains("open") &&
      activeProfilePopupUserId === normalizedUserId
    ) {
      renderProfilePopup(getKnownProfileById(normalizedUserId));
    }
  })();

  pendingLocalProfileFetches.set(normalizedUserId, fetchPromise);

  try {
    await fetchPromise;
  } finally {
    pendingLocalProfileFetches.delete(normalizedUserId);
  }
}

function getMissYouCounterLabels() {
  const activeUserId = currentProfile?.id || currentUser?.id || "";
  const myLabel = getProfileDisplayName(currentProfile, "mine");
  const otherProfile = knownProfiles.find(
    (profile) => profile?.id && profile.id !== activeUserId,
  );
  const herLabel = getProfileDisplayName(otherProfile, "hers");

  return {
    myLabel: escapeHtml(myLabel),
    herLabel: escapeHtml(herLabel),
  };
}

async function incrementMissYouWidget() {
  const widget = getMissYouWidget();
  if (!widget) return;

  const activeUserId = currentProfile?.id || currentUser?.id;
  if (!activeUserId) return;

  normalizeMissYouWidget(widget);
  widget.data.countsByUser[activeUserId] =
    (widget.data.countsByUser[activeUserId] || 0) + 1;
  widget.data.totalCountsByUser[activeUserId] =
    (widget.data.totalCountsByUser[activeUserId] || 0) + 1;
  widget.data.lastResetDate = getTodayDateKey();

  refreshMissYouWidgetDom(widget);
  if (activeProfilePopupUserId === activeUserId) {
    renderProfilePopup(getKnownProfileById(activeUserId, currentProfile));
  }
  queueMissYouWidgetSave();
}

function bindMissYouWidgetButtons(root) {
  root.querySelectorAll("[data-miss-you-widget-id]").forEach((btn) => {
    ["mousedown", "pointerdown"].forEach((eventName) => {
      btn.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
    });

    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (btn.hasAttribute("disabled")) return;
      incrementMissYouWidget();
    });
  });
}

function isTotoUser() {
  const profileName =
    `${currentProfile?.nickname || ""} ${currentProfile?.username || ""}`.toLowerCase();
  const email = String(currentUser?.email || "").toLowerCase();
  const identity = `${profileName} ${email}`;

  if (identity.includes("dodo")) return false;
  return identity.includes("toto");
}

function isDodoUser() {
  const profileName =
    `${currentProfile?.nickname || ""} ${currentProfile?.username || ""}`.toLowerCase();
  const email = String(currentUser?.email || "").toLowerCase();
  const identity = `${profileName} ${email}`;

  if (identity.includes("toto")) return false;
  return identity.includes("dodo");
}

function canEditPhotoPinWidget(widgetOrId) {
  const normalizedId = String(
    typeof widgetOrId === "string" ? widgetOrId : widgetOrId?.id || "",
  )
    .toLowerCase()
    .trim();

  if (normalizedId === "photo-pin-right") {
    return isDodoUser();
  }

  if (normalizedId === "photo-pin") {
    return isTotoUser();
  }

  return false;
}

function createEntryPreviewId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : `entry-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeEntryPreviewWidgetData(widget) {
  if (!widget) return { buttonLabel: "open entries", entries: [] };

  const rawData =
    widget.data &&
    typeof widget.data === "object" &&
    !Array.isArray(widget.data)
      ? widget.data
      : {};
  const now = new Date().toISOString();
  const rawEntries = Array.isArray(rawData.entries) ? rawData.entries : [];
  let entries = rawEntries
    .map((entry) => ({
      id:
        String(entry?.id || createEntryPreviewId()).trim() ||
        createEntryPreviewId(),
      title: String(entry?.title || "").trim(),
      text: String(entry?.text || "").trim(),
      createdAt: String(entry?.createdAt || entry?.created_at || now),
      updatedAt: String(
        entry?.updatedAt || entry?.updated_at || entry?.createdAt || now,
      ),
    }))
    .filter((entry) => entry.title || entry.text);

  if (!entries.length && (rawData.entryTitle || rawData.entryText)) {
    entries = [
      {
        id: String(rawData.entryId || createEntryPreviewId()),
        title: String(rawData.entryTitle || "for you ♡").trim(),
        text: String(rawData.entryText || "").trim(),
        createdAt: String(rawData.entryCreatedAt || now),
        updatedAt: String(rawData.entryUpdatedAt || now),
      },
    ];
  }

  return {
    ...rawData,
    buttonLabel:
      String(rawData.buttonLabel || "open entries").trim() || "open entries",
    entries,
  };
}

function getEntryPreviewEntries(widget) {
  return normalizeEntryPreviewWidgetData(widget).entries;
}

function shuffleEntryPreviewEntries(entries) {
  const shuffled = [...entries];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

function renderEntryPreviewEntries(entries) {
  if (!entryPreviewList) return;

  entryPreviewList.innerHTML = "";

  if (!entries.length) {
    entryPreviewList.innerHTML =
      '<div class="small-note">no entries here yet ♡</div>';
    return;
  }

  entries.forEach((entry) => {
    const post = document.createElement("article");
    post.className = "post entry-preview-post";
    post.innerHTML = `
      <div class="post-header">
        <span>˚₊‧ ${escapeHtml(entry.title || "for dodo")} ❤︎‧₊˚</span>
        <span>${formatEntryDate(entry.createdAt || entry.updatedAt)}</span>
      </div>
      <div class="post-body">
        <div class="post-text ql-editor"></div>
        <div class="link-preview-list" hidden></div>
      </div>
    `;

    const textEl = post.querySelector(".post-text");
    const previewEl = post.querySelector(".link-preview-list");
    textEl.innerHTML = entry.text
      ? toSafeHtmlFromPlainText(entry.text)
      : "<p>empty entry ♡</p>";
    renderLinkPreviews(textEl, previewEl);
    textEl.querySelectorAll("a").forEach((link) => {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
    entryPreviewList.appendChild(post);
  });
}

function openEntryPreviewWidget(widgetId) {
  const normalizedWidgetId = String(widgetId || "").replace(
    /-mobile-left$/,
    "",
  );
  const widget = widgets.find(
    (item) => item.id === widgetId || item.id === normalizedWidgetId,
  );
  if (!widget || !entryPreviewPopup || !entryPreviewTitle || !entryPreviewList)
    return;

  activeEntryPreviewEntries = getEntryPreviewEntries(widget);

  entryPreviewTitle.textContent = widget.title || "little entries ♡";
  if (editEntryPreviewPopup) {
    editEntryPreviewPopup.hidden = !isTotoUser();
  }
  if (shuffleEntryPreviewPopup) {
    shuffleEntryPreviewPopup.hidden = activeEntryPreviewEntries.length < 2;
  }

  renderEntryPreviewEntries(activeEntryPreviewEntries);

  entryPreviewPopup.classList.add("open");
}

function bindEntryPreviewWidgetButtons(root) {
  root.querySelectorAll("[data-entry-preview-widget-id]").forEach((btn) => {
    ["mousedown", "pointerdown"].forEach((eventName) => {
      btn.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
    });

    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openEntryPreviewWidget(btn.dataset.entryPreviewWidgetId);
    });
  });
}

function refreshMissYouWidgetDom(widget) {
  const matchingWidgets = Array.from(
    document.querySelectorAll(".widget"),
  ).filter((widgetEl) => {
    const renderedId =
      widgetEl.dataset.widgetSourceId || widgetEl.dataset.widgetId || "";
    return renderedId === widget.id;
  });

  if (!matchingWidgets.length) {
    renderWidgets({ animateMobileReorder: false });
    return;
  }

  matchingWidgets.forEach((widgetEl) => {
    const content = widgetEl.querySelector(".widget-content");
    if (!content) return;

    content.innerHTML = getWidgetContent(widget);
    bindMissYouWidgetButtons(content);
  });
}

function refreshWidgetContentDom(widget) {
  if (!widget?.id) return false;

  const matchingWidgets = Array.from(
    document.querySelectorAll(".widget"),
  ).filter((widgetEl) => {
    const renderedId =
      widgetEl.dataset.widgetSourceId || widgetEl.dataset.widgetId || "";
    return renderedId === widget.id;
  });

  if (!matchingWidgets.length) return false;

  matchingWidgets.forEach((widgetEl) => {
    const content = widgetEl.querySelector(".widget-content");
    if (!content) return;

    content.innerHTML = getWidgetContent(widget);
    upgradeLegacyAnniversaryLinks(content);
    bindMissYouWidgetButtons(content);
    bindEntryPreviewWidgetButtons(content);

    content.querySelectorAll(".widget-wish-toggle").forEach((btn) => {
      ["mousedown", "pointerdown"].forEach((eventName) => {
        btn.addEventListener(eventName, (event) => {
          event.preventDefault();
          event.stopPropagation();
        });
      });

      btn.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        await toggleWidgetWishlistItem(widget.id, btn.dataset.widgetWishId);
      });
    });
  });

  syncWidgetLikeButton(widget.id);
  return true;
}

async function queueMissYouWidgetSave() {
  if (missYouSaveInFlight) {
    missYouSaveQueued = true;
    return;
  }

  missYouSaveInFlight = true;

  try {
    do {
      missYouSaveQueued = false;
      const widget = getMissYouWidget();
      if (!widget) return;

      await saveWidgetToSupabase(widget, {
        recordHistory: false,
        suppressErrorMessage: true,
        notifyUpdate: true,
        preservePosition: true,
      });
    } while (missYouSaveQueued);
  } finally {
    missYouSaveInFlight = false;
  }
}

async function refreshWeatherWidget(options = {}) {
  const { render = true, animateWidgets = false } = options;
  const widget = getWeatherWidget();
  if (!widget) return;

  try {
    const locationWeather = await Promise.all(
      WEATHER_WIDGET_LOCATIONS.map(async (location) => {
        const response = await fetch(
          `${OPEN_METEO_FORECAST_ENDPOINT}?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&timezone=auto`,
        );

        if (!response.ok) {
          throw new Error(`Weather request failed with ${response.status}`);
        }

        const payload = await response.json();
        const currentWeather = payload?.current;

        if (!currentWeather) {
          throw new Error("Weather data is unavailable right now.");
        }

        return {
          label: location.label,
          temperature: currentWeather.temperature_2m,
          apparentTemperature: currentWeather.apparent_temperature,
          weatherCode: currentWeather.weather_code,
          windSpeed: currentWeather.wind_speed_10m,
          isDay: Boolean(currentWeather.is_day),
        };
      }),
    );

    widget.data = {
      ...(widget.data || {}),
      locations: locationWeather,
      fetchedAt: new Date().toISOString(),
      status: "ready",
      error: "",
    };

    await saveWidgetToSupabase(widget, {
      recordHistory: false,
      preservePosition: true,
    });
  } catch (error) {
    console.error(error);
    widget.data = {
      ...(widget.data || {}),
      status: "error",
      error: "weather unavailable",
    };
  }

  if (render) {
    const scrollSnapshot = getViewportScrollSnapshot();
    const updatedInline = refreshWidgetContentDom(widget);
    if (!updatedInline) {
      renderWidgets({ animateMobileReorder: animateWidgets });
    }
    restoreViewportScroll(scrollSnapshot);
  }
}

function getWidgetContent(widget) {
  const normalizedId = String(widget.id || "")
    .toLowerCase()
    .trim();
  const normalizedTitle = String(widget.title || "").toLowerCase();

  const isDatesWidget =
    normalizedId === "dates" || normalizedTitle.includes("important dates");

  if (normalizedId === "song") {
    normalizeWidgetLikesData(widget);
    const songData = widget.data || {};
    const songName = escapeHtml(
      songData.songName || "drop a spotify track into the widget editor ♡",
    );
    const durationLabel = escapeHtml(songData.durationLabel || "--:--");
    const spotifyUrl = escapeHtml(songData.spotifyUrl || "");
    const coverUrl = escapeHtml(songData.coverUrl || "");
    const accent = Math.max(6, Math.min(94, Number(songData.accent) || 38));

    return `
      <div class="song-widget-card${coverUrl ? " has-cover" : ""}">
        ${
          coverUrl
        ? `<img class="song-widget-cover" src="${coverUrl}" alt="Spotify cover art" loading="lazy" decoding="async" />`
            : '<div class="song-widget-art-placeholder">paste a Spotify track link to fill this card ♡</div>'
        }
        <div class="song-widget-meta">
          <div class="song-widget-name">${songName}</div>
          <div class="song-widget-time">${durationLabel}</div>
        </div>
        <div class="song-widget-progress" aria-hidden="true">
          <span style="width:${accent}%"></span>
        </div>
        <div class="song-widget-controls" aria-hidden="true">
          <span class="song-widget-skip">⏮</span>
          <span class="song-widget-play">⏸</span>
          <span class="song-widget-skip">⏭</span>
        </div>
        <div class="song-widget-volume" aria-hidden="true">
          <span class="song-widget-volume-icon">🔈</span>
          <div class="song-widget-volume-bar"><span style="width:68%"></span></div>
        </div>
        ${
          spotifyUrl
            ? `<a class="song-widget-link" href="${spotifyUrl}" target="_blank" rel="noreferrer noopener">open in spotify</a>`
            : ""
        }
      </div>
    `;
  }

  const isNoteWidget =
    normalizedId === "note" ||
    normalizedTitle.includes("little note") ||
    normalizedTitle.includes("smol note");

  if (isNoteWidget) {
    normalizeWidgetLikesData(widget);
    return `<div class="note-widget-text">${widget.data?.text || ""}</div>`;
  }

  if (isDatesWidget) {
    const items = widget.data?.items || [];

    if (!items.length) {
      return `<div style="font-size:0.92rem;opacity:0.75;">no important dates yet ♡</div>`;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sortedItems = [...items].sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);

      aDate.setHours(0, 0, 0, 0);
      bDate.setHours(0, 0, 0, 0);

      const aDiff = Math.ceil((aDate - today) / (1000 * 60 * 60 * 24));
      const bDiff = Math.ceil((bDate - today) / (1000 * 60 * 60 * 24));

      const aIsUpcoming = aDiff >= 0;
      const bIsUpcoming = bDiff >= 0;

      if (aIsUpcoming && !bIsUpcoming) return -1;
      if (!aIsUpcoming && bIsUpcoming) return 1;

      if (aIsUpcoming && bIsUpcoming) return aDiff - bDiff;

      return Math.abs(aDiff) - Math.abs(bDiff);
    });

    const html = sortedItems
      .map((item) => {
        const target = new Date(item.date);
        target.setHours(0, 0, 0, 0);

        const diffMs = target - today;
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        let countdownText = "";
        if (diffDays > 0) {
          countdownText = `${diffDays} days left`;
        } else if (diffDays === 0) {
          countdownText = "today ♡";
        } else {
          countdownText = `${Math.abs(diffDays)} days ago`;
        }

        return `
      <div style="padding:8px 0;border-bottom:1px solid rgba(241,221,232,0.7);">
        <div style="font-size:0.95rem;font-weight:700;">${item.title}</div>
        <div style="margin-top:4px;font-size:0.82rem;opacity:0.75;">${countdownText}</div>
      </div>
    `;
      })
      .join("");

    return `<div style="display:grid;gap:2px;">${html}</div>`;
  }

  if (normalizedId === "wishlist" || normalizedTitle.includes("wishlist")) {
    const items = getWishlistItemsInDisplayOrder(widget.data?.items || []);
    const visibleItems = items.filter((item) => !item.done);

    if (!visibleItems.length) {
      return `<div style="font-size:0.92rem;opacity:0.75;">nothing on the wishlist yet ⋆˙⟡</div>`;
    }

    const html = visibleItems
      .map(
        (item) => `
    <div class="widget-wishlist-row">
      <button
        class="widget-wish-toggle"
        type="button"
        data-widget-wish-id="${item.id}"
        aria-pressed="${item.done ? "true" : "false"}"
        aria-label="${item.done ? "mark wishlist item incomplete" : "mark wishlist item complete"}"
      >
        ${item.done ? "☑" : "☐"}
      </button>
      <div class="widget-wish-text${item.done ? " is-done" : ""}">
        ${item.text}
      </div>
    </div>
  `,
      )
      .join("");

    return `<div class="widget-wishlist-list">${html}</div>`;
  }

  if (normalizedId === "weather" || normalizedTitle.includes("weather")) {
    const weatherData = widget.data || {};

    if (weatherData.status === "error") {
      return "";
    }

    if (weatherData.status !== "ready") {
      return `
      <div class="widget-inline-skeleton" aria-label="loading weather">
        ${getSkeletonLine("", "width:74%;")}
        ${getSkeletonLine("", "width:92%;")}
        ${getSkeletonLine("skeleton-line-short", "width:54%;")}
      </div>
    `;
    }

    const updatedTime = weatherData.fetchedAt
      ? new Date(weatherData.fetchedAt).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
      : "";
    const locationHtml = (weatherData.locations || [])
      .map((location) => {
        const conditionLabel = getWeatherDescription(
          location.weatherCode,
          location.isDay,
        );

        return `
    <div style="padding:8px 0;border-bottom:1px solid rgba(241,221,232,0.7);">
      <div style="display:flex;align-items:baseline;justify-content:space-between;gap:10px;flex-wrap:nowrap;">
        <div style="font-size:0.96rem;font-weight:700;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${location.label}</div>
        <div style="font-size:1.2rem;font-weight:700;line-height:1;flex:0 0 auto;">${Math.round(location.temperature)}°</div>
      </div>
      <div style="margin-top:4px;font-size:0.86rem;font-weight:700;opacity:0.88;">now: ${conditionLabel}</div>
      <div style="margin-top:4px;font-size:0.8rem;opacity:0.72;">feels like ${Math.round(location.apparentTemperature)}° • wind ${Math.round(location.windSpeed)} km/h</div>
    </div>
  `;
      })
      .join("");

    return `
    <div style="display:grid;gap:10px;">
      ${updatedTime ? `<div style="font-size:0.8rem;opacity:0.68;">updated ${updatedTime}</div>` : ""}
      <div style="display:grid;gap:2px;">${locationHtml}</div>
    </div>
  `;
  }

  if (
    normalizedId === "miss-you" ||
    normalizedTitle.includes("miss you counter")
  ) {
    normalizeMissYouWidget(widget);
    const activeUserId = currentProfile?.id || currentUser?.id || "";
    const countsByUser = widget.data?.countsByUser || {};
    const myCount = activeUserId ? countsByUser[activeUserId] || 0 : 0;
    const { myLabel, herLabel } = getMissYouCounterLabels();
    const herCount = Object.entries(countsByUser).reduce(
      (total, [userId, count]) => {
        if (userId === activeUserId) return total;
        return total + (Number.isFinite(count) ? count : 0);
      },
      0,
    );
    const isMineClickable = Boolean(activeUserId);

    return `
    <div style="display:grid;gap:12px;">
      <div style="font-size:0.84rem;opacity:0.76;">daily count resets at midnight ♡</div>
      <div style="display:grid;gap:8px;padding-top:4px;border-top:1px solid rgba(241,221,232,0.7);">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <div style="font-size:0.92rem;font-weight:700;">${herLabel}</div>
          <div style="font-size:1.55rem;font-weight:700;line-height:1;">${herCount}</div>
        </div>
      </div>
      <div style="display:grid;gap:10px;padding-top:4px;border-top:1px solid rgba(241,221,232,0.7);">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <div style="font-size:0.92rem;font-weight:700;">${myLabel}</div>
          <div style="font-size:1.55rem;font-weight:700;line-height:1;">${myCount}</div>
        </div>
        <button class="soft-btn widget-miss-you-btn" type="button" data-miss-you-widget-id="${widget.id}" ${isMineClickable ? "" : "disabled"}>i miss you</button>
      </div>
    </div>
  `;
  }

  if (
    normalizedId === "entry-preview" ||
    normalizedId === "entry-preview-mobile-left"
  ) {
    const data = normalizeEntryPreviewWidgetData(widget);
    const buttonLabel = escapeHtml(data.buttonLabel || "open entry");
    const previewWidgetId =
      normalizedId === "entry-preview-mobile-left"
        ? "entry-preview"
        : widget.id;

    return `
    <div class="gift-style-widget">
      <button
        class="soft-btn widget-miss-you-btn gift-style-widget-btn"
        type="button"
        data-entry-preview-widget-id="${previewWidgetId}"
      >
        ${buttonLabel}
      </button>
    </div>
  `;
  }

  if (
    normalizedId.startsWith("photo-pin") ||
    normalizedTitle.includes("pinned photo") ||
    normalizedTitle.includes("pinned") ||
    normalizedTitle.includes("pin it")
  ) {
    normalizeWidgetLikesData(widget);
    const photoData = widget.data || {};
    const overlayText = escapeHtml(photoData.text || "");
    const textColor = escapeHtml(photoData.textColor || "#ffffff");
    const textSize = Math.max(
      12,
      Math.min(46, Number(photoData.textSize) || 22),
    );
    const textXValue = Number(photoData.textX);
    const textYValue = Number(photoData.textY);
    const textX = Math.max(
      0,
      Math.min(100, Number.isFinite(textXValue) ? textXValue : 50),
    );
    const textY = Math.max(
      0,
      Math.min(100, Number.isFinite(textYValue) ? textYValue : 86),
    );
    const rotate = Number(photoData.rotate) || 0;
    const imageStyle = `transform:rotate(${rotate}deg);`;
    const canEditPhoto = canEditPhotoPinWidget(widget);

    if (!photoData.image) {
      return `
      <button
        class="soft-btn widget-photo-empty widget-miss-you-btn"
        type="button"
        data-photo-widget-id="${widget.id}"
      >
        ${canEditPhoto ? "+ pin photo" : "open pin ♡"}
      </button>
    `;
    }

    return `
    <div
      class="widget-photo-card widget-photo-open"
      role="button"
      tabindex="0"
      data-photo-widget-id="${widget.id}"
      aria-label="${canEditPhoto ? "open pin editor" : "open pin"}"
    >
      <div class="widget-photo-frame">
        <img class="widget-photo-image" src="${photoData.image}" alt="pinned photo" style="${imageStyle}" loading="lazy" decoding="async" />
        ${overlayText ? `<div class="widget-photo-text" style="left:${textX}%;top:${textY}%;color:${textColor};--photo-text-size:${textSize};">${overlayText}</div>` : ""}
      </div>
    </div>
  `;
  }

  if (normalizedId === "love") {
    const start = new Date(widget.data.startDate);
    const today = new Date();

    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffMs = today - start;
    const diffDays =
      diffMs >= 0 ? Math.floor(diffMs / (1000 * 60 * 60 * 24)) : 0;

    return `
      <div style="font-size:0.96rem;font-weight:700;">${diffDays} days together ᰔᩚ</div>
      <p style="margin:8px 0 0;font-size:0.82rem;opacity:0.75;">since ${widget.data.startDate}</p>
    `;
  }

  return normalizeAnniversaryLinks(widget.content || "");
}

function normalizeAnniversaryLinks(html) {
  const template = document.createElement("template");
  template.innerHTML = String(html || "");
  upgradeLegacyAnniversaryLinks(template.content);
  return template.innerHTML;
}

function isLegacyAnniversaryUrl(url) {
  const decodedUrl = decodeURIComponent(String(url || "")).toLowerCase();
  return (
    decodedUrl.includes("toto") &&
    decodedUrl.includes("dodo") &&
    decodedUrl.includes("anniversary") &&
    decodedUrl.includes("index.html")
  );
}

function isAnniversaryWrapperUrl(url) {
  return String(url || "")
    .toLowerCase()
    .includes("anniversary-wrapper.html");
}

function upgradeLegacyAnniversaryLinks(root = document) {
  root.querySelectorAll?.("a[href]").forEach((link) => {
    if (
      !isLegacyAnniversaryUrl(link.getAttribute("href")) &&
      !isLegacyAnniversaryUrl(link.href) &&
      !isAnniversaryWrapperUrl(link.getAttribute("href")) &&
      !isAnniversaryWrapperUrl(link.href)
    ) {
      return;
    }

    link.href = getAnniversaryWrapperUrl();
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

async function loadWidgets(options = {}) {
  const { render = true, showSkeleton = render } = options;
  if (showSkeleton) {
    renderWidgetSkeletons();
  }

  const { data, error } = await supabaseClient
    .from("widgets")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error(error);
    showMessage(error.message);
    return;
  }

  if (data && data.length) {
    const widgetsNeedingNormalization = [];
    const latestSavedWidgets = new Map();

    data.forEach((row) => {
      if (!latestSavedWidgets.has(row.id)) {
        latestSavedWidgets.set(row.id, row);
      }
    });

    widgets = widgets.map((defaultWidget) => {
      const savedWidget = latestSavedWidgets.get(defaultWidget.id);

      if (!savedWidget) {
        return defaultWidget;
      }

      const mergedWidget = {
        ...defaultWidget,
        title: savedWidget.title ?? defaultWidget.title,
        side: savedWidget.side ?? defaultWidget.side,
        x: savedWidget.x ?? defaultWidget.x,
        y: savedWidget.y ?? defaultWidget.y,
        data: savedWidget.data ?? defaultWidget.data,
        content: savedWidget.content ?? defaultWidget.content,
        updated_at: savedWidget.updated_at ?? defaultWidget.updated_at,
      };

      const normalizedId = String(mergedWidget.id || "")
        .toLowerCase()
        .trim();
      const normalizedTitle = String(mergedWidget.title || "").toLowerCase();
      const isWishlistWidget =
        normalizedId === "wishlist" || normalizedTitle.includes("wishlist");
      const isMissYouWidget =
        normalizedId === "miss-you" ||
        normalizedTitle.includes("miss you counter");
      const isSweetReminderWidget = normalizedId === "sweet-reminder";
      const isSongWidget = normalizedId === "song";
      const isLikeable = isLikeableWidget(mergedWidget);
      const isPhotoPin = isPhotoPinWidget(mergedWidget);

      if (isWishlistWidget && Array.isArray(mergedWidget.data?.items)) {
        const normalizedItems = getWishlistItemsInDisplayOrder(
          mergedWidget.data.items,
        ).map((item, index) => ({
          ...item,
          order: Number.isFinite(item?.order) ? item.order : index,
        }));

        const wishlistChanged = normalizedItems.some((item, index) => {
          const originalItem = mergedWidget.data.items[index];
          return !originalItem || item.order !== originalItem.order;
        });

        if (wishlistChanged) {
          mergedWidget.data = {
            ...mergedWidget.data,
            items: normalizedItems,
          };
          widgetsNeedingNormalization.push(mergedWidget);
        }
      }

      if (isMissYouWidget) {
        const missYouChanged = normalizeMissYouWidget(mergedWidget);
        const shouldMoveMissYouWidget =
          mergedWidget.side === "left" ||
          (Number.isFinite(mergedWidget.x) &&
            Number.isFinite(mergedWidget.y) &&
            mergedWidget.x === 12 &&
            mergedWidget.y === 770);

        if (shouldMoveMissYouWidget) {
          mergedWidget.side = "right";
          mergedWidget.x = 8;
          mergedWidget.y = 610;
        }

        if (missYouChanged || shouldMoveMissYouWidget) {
          widgetsNeedingNormalization.push(mergedWidget);
        }
      }

      if (isSongWidget && normalizeSongWidget(mergedWidget)) {
        widgetsNeedingNormalization.push(mergedWidget);
      }

      if (isLikeable && normalizeWidgetLikesData(mergedWidget)) {
        widgetsNeedingNormalization.push(mergedWidget);
      }

      if (isPhotoPin && normalizePhotoWidgetComments(mergedWidget)) {
        widgetsNeedingNormalization.push(mergedWidget);
      }

      const titleChanged = mergedWidget.title !== defaultWidget.title;

      if (titleChanged) {
        mergedWidget.title = defaultWidget.title;
        widgetsNeedingNormalization.push(mergedWidget);
      }

      if (isSweetReminderWidget) {
        const reminderChanged = mergedWidget.content !== defaultWidget.content;

        if (reminderChanged) {
          mergedWidget.content = defaultWidget.content;
          widgetsNeedingNormalization.push(mergedWidget);
        }
      }

      if (
        normalizedId === "photo-pin-right" &&
        mergedWidget.title !== defaultWidget.title
      ) {
        mergedWidget.title = defaultWidget.title;
        widgetsNeedingNormalization.push(mergedWidget);
      }

      return mergedWidget;
    });

    widgetsNeedingNormalization.push(...normalizeWidgetMobileOrders(widgets));

    const uniqueWidgetsNeedingNormalization =
      widgetsNeedingNormalization.filter(
        (widget, index, array) =>
          array.findIndex((item) => item.id === widget.id) === index,
      );

    if (uniqueWidgetsNeedingNormalization.length) {
      void Promise.allSettled(
        uniqueWidgetsNeedingNormalization.map((widget) =>
          saveWidgetToSupabase(widget, {
            recordHistory: false,
            suppressErrorMessage: true,
          }),
        ),
      );
    }
  }

  refreshNotificationsFromCurrentData(render);

  if (render) {
    renderWidgets({ animateMobileReorder: false });
  }
}

function renderWidgets(options = {}) {
  const { animateMobileReorder = true } = options;
  const shouldAnimateMobileReorder =
    animateMobileReorder && isTabbedLayoutActive();
  const prefersReducedMotion = reducedMotionMedia?.matches;

  previousMobileWidgetRects.clear();
  if (shouldAnimateMobileReorder) {
    document.querySelectorAll(".widget[data-widget-id]").forEach((widgetEl) => {
      previousMobileWidgetRects.set(
        widgetEl.dataset.widgetId,
        widgetEl.getBoundingClientRect(),
      );
    });
  }

  leftZone.innerHTML = "";
  rightZone.innerHTML = "";

  ensureWidgetStackOrder();

  const isMobileWidgetOrderActive = isTabbedLayoutActive();
  const mobileRenderItems = isMobileWidgetOrderActive
    ? getMobileWidgetRenderItems()
    : null;
  const mobileWidgetOrderLookup = new Map();

  if (isMobileWidgetOrderActive) {
    ["left", "right"].forEach((side) => {
      const orderedWidgets = sortMobileRenderItems(
        (mobileRenderItems || []).filter((item) => item.side === side),
      );
      orderedWidgets.forEach((item, index) => {
        mobileWidgetOrderLookup.set(item.renderId, {
          index,
          count: orderedWidgets.length,
        });
      });
    });
  }

  const widgetsToRender = isMobileWidgetOrderActive
    ? mobileRenderItems
    : widgets.map((widget) => ({
        widget,
        renderId: widget.id,
        sourceId: widget.id,
        side: widget.side === "right" ? "right" : "left",
        order: getWidgetMobileOrder(widget, 0),
        isVirtual: false,
      }));

  widgetsToRender
    .sort((a, b) => {
      if (isMobileWidgetOrderActive) {
        const sideDifference =
          a.side === b.side ? 0 : a.side === "left" ? -1 : 1;
        if (sideDifference !== 0) {
          return sideDifference;
        }

        const orderDifference = a.order - b.order;

        if (orderDifference !== 0) {
          return orderDifference;
        }
      }

      return (a.widget.zIndex || 0) - (b.widget.zIndex || 0);
    })
    .forEach((renderItem) => {
      const widget = renderItem.widget;
      const renderId = renderItem.renderId;
      const renderSide = renderItem.side;
      const isVirtualWidget = Boolean(renderItem.isVirtual);
      const normalizedId = String(widget.id || "")
        .toLowerCase()
        .trim();
      const normalizedTitle = String(widget.title || "").toLowerCase();

      const isDatesWidget =
        normalizedId === "dates" || normalizedTitle.includes("important dates");

      const isWishlistWidget =
        normalizedId === "wishlist" || normalizedTitle.includes("wishlist");

      const isNoteWidget =
        normalizedId === "note" ||
        normalizedTitle.includes("little note") ||
        normalizedTitle.includes("smol note");

      const isStickerWidget =
        normalizedId.includes("stickers") ||
        normalizedTitle.includes("stickers");
      const isPhotoWidget =
        normalizedId.startsWith("photo-pin") ||
        normalizedTitle.includes("pinned photo") ||
        normalizedTitle.includes("pinned") ||
        normalizedTitle.includes("pin it");
      const canEditPhotoWidget = !isPhotoWidget || canEditPhotoPinWidget(widget);
      const isEntryPreviewWidget =
        normalizedId === "entry-preview" ||
        renderItem.sourceId === "entry-preview";
      const canEditEntryPreviewWidget = !isEntryPreviewWidget || isTotoUser();

      const hasHistory = normalizedId === "song" || isNoteWidget || isPhotoWidget;

      const isEditable =
        ["song", "memories", "love"].includes(normalizedId) ||
        (isEntryPreviewWidget && canEditEntryPreviewWidget) ||
        isNoteWidget ||
        isDatesWidget ||
        isWishlistWidget ||
        (isPhotoWidget && canEditPhotoWidget);
      const showHeaderEditButton = isEditable && !isEntryPreviewWidget;

      const editTargetId = isDatesWidget
        ? "dates"
        : isWishlistWidget
          ? "wishlist"
          : isPhotoWidget
            ? widget.id
            : isEntryPreviewWidget
              ? "entry-preview"
              : isNoteWidget
                ? "note"
                : normalizedId;
      const isMinimized = minimizedWidgetIds.has(widget.id);
      const mobileOrderState = mobileWidgetOrderLookup.get(renderId);
      const canMoveWidgetUp = Boolean(
        mobileOrderState && mobileOrderState.index > 0,
      );
      const canMoveWidgetDown = Boolean(
        mobileOrderState && mobileOrderState.index < mobileOrderState.count - 1,
      );
      const showMobileOrderControls = isMobileWidgetOrderActive;

      const el = document.createElement("div");
      el.className = "widget";
      el.classList.toggle("is-minimized", isMinimized);
      el.dataset.widgetId = renderId;
      el.dataset.widgetSourceId = renderItem.sourceId;
      if (isStickerWidget) {
        el.classList.add("sticker-widget");
      }
      if (normalizedId === "song") {
        el.classList.add("song-widget");
      }
      if (isPhotoWidget) {
        el.classList.add("photo-widget");
      }
      el.style.left = widget.x + "px";
      el.style.top = widget.y + "px";
      el.style.zIndex = String(widget.zIndex || 1);

      el.innerHTML = `
      <div class="widget-bar" data-widget-id="${widget.id}">
        <span>${widget.title}</span>
        <div class="widget-bar-actions">
          ${
            showMobileOrderControls
              ? `
            <button
              class="widget-order-btn"
              type="button"
              data-widget-move-id="${renderId}"
              data-widget-move-direction="up"
              aria-label="move widget up"
              ${canMoveWidgetUp ? "" : "disabled"}
            >
              ↑
            </button>
            <button
              class="widget-order-btn"
              type="button"
              data-widget-move-id="${renderId}"
              data-widget-move-direction="down"
              aria-label="move widget down"
              ${canMoveWidgetDown ? "" : "disabled"}
            >
              ↓
            </button>
          `
              : ""
          }
          <button
            class="widget-minimize-btn"
            type="button"
            data-widget-minimize-id="${widget.id}"
            aria-label="${isMinimized ? "restore widget" : "minimize widget"}"
            aria-pressed="${isMinimized ? "true" : "false"}"
          >
            ${isMinimized ? "+" : "–"}
          </button>
          ${!isVirtualWidget ? getWidgetHeaderLikeButtonMarkup(widget) : ""}
          ${!isVirtualWidget ? getWidgetHeaderCommentButtonMarkup(widget) : ""}
          ${hasHistory && !isVirtualWidget ? `<button class="widget-history-btn" type="button" data-widget-history-id="${widget.id}">🕘</button>` : ""}
          ${
            !isVirtualWidget &&
            (!isEntryPreviewWidget || canEditEntryPreviewWidget)
              ? `
            ${showHeaderEditButton ? `<button class="widget-edit-btn" type="button" data-widget-id="${widget.id}">✎</button>` : ""}
          `
              : ""
          }
        </div>
      </div>
      <div class="widget-content">${getWidgetContent(widget)}</div>
    `;
      upgradeLegacyAnniversaryLinks(el);

      const bar = el.querySelector(".widget-bar");
      const editBtn = el.querySelector(".widget-edit-btn");
      const historyBtn = el.querySelector(".widget-history-btn");
      const minimizeBtn = el.querySelector(".widget-minimize-btn");
      const moveButtons = Array.from(el.querySelectorAll(".widget-order-btn"));

      moveButtons.forEach((button) => {
        ["mousedown", "pointerdown"].forEach((eventName) => {
          button.addEventListener(eventName, (event) => {
            event.preventDefault();
            event.stopPropagation();
          });
        });

        button.addEventListener("click", async (event) => {
          event.preventDefault();
          event.stopPropagation();

          if (button.disabled) {
            return;
          }

          await moveWidgetInMobileOrder(
            button.dataset.widgetMoveId || widget.id,
            button.dataset.widgetMoveDirection,
          );
        });
      });

      if (minimizeBtn) {
        ["mousedown", "pointerdown"].forEach((eventName) => {
          minimizeBtn.addEventListener(eventName, (event) => {
            event.preventDefault();
            event.stopPropagation();
          });
        });

        minimizeBtn.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleWidgetMinimized(widget.id);
        });
      }

      if (historyBtn) {
        historyBtn.addEventListener("mousedown", (event) => {
          event.preventDefault();
          event.stopPropagation();
        });

        historyBtn.addEventListener("pointerdown", (event) => {
          event.preventDefault();
          event.stopPropagation();
        });

        historyBtn.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          openWidgetHistory(widget.id);
        });
      }

      if (isWishlistWidget) {
        el.querySelectorAll(".widget-wish-toggle").forEach((btn) => {
          btn.addEventListener("mousedown", (event) => {
            event.preventDefault();
            event.stopPropagation();
          });

          btn.addEventListener("pointerdown", (event) => {
            event.preventDefault();
            event.stopPropagation();
          });

          btn.addEventListener("click", async (event) => {
            event.preventDefault();
            event.stopPropagation();
            await toggleWidgetWishlistItem(widget.id, btn.dataset.widgetWishId);
          });
        });
      }

      if (isPhotoWidget) {
        el
          .querySelectorAll(".widget-photo-empty, .widget-photo-open")
          .forEach((btn) => {
          ["mousedown", "pointerdown"].forEach((eventName) => {
            btn.addEventListener(eventName, (event) => {
              event.preventDefault();
              event.stopPropagation();
            });
          });

          btn.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            const targetId =
              btn.dataset.photoWidgetId ||
              btn.getAttribute("data-photo-widget-id") ||
              widget.id;
            openWidgetEditor(targetId);
          });

          if (!btn.matches("button")) {
            btn.addEventListener("keydown", (event) => {
              if (event.key !== "Enter" && event.key !== " ") return;
              event.preventDefault();
              event.stopPropagation();
              const targetId =
                btn.dataset.photoWidgetId ||
                btn.getAttribute("data-photo-widget-id") ||
                widget.id;
              openWidgetEditor(targetId);
            });
          }
        });
      }

      if (isLikeableWidget(widget)) {
        el.querySelectorAll(".widget-like-btn").forEach((btn) => {
          ["mousedown", "pointerdown"].forEach((eventName) => {
            btn.addEventListener(eventName, (event) => {
              event.preventDefault();
              event.stopPropagation();
            });
          });

          btn.addEventListener("click", async (event) => {
            event.preventDefault();
            event.stopPropagation();
            await toggleWidgetLike(btn.dataset.widgetLikeId || widget.id);
          });
        });
      }

      if (isCommentableWidget(widget)) {
        el.querySelectorAll(".widget-comment-btn").forEach((btn) => {
          ["mousedown", "pointerdown"].forEach((eventName) => {
            btn.addEventListener(eventName, (event) => {
              event.preventDefault();
              event.stopPropagation();
            });
          });

          btn.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            openWidgetComments(btn.dataset.widgetCommentId || widget.id);
          });
        });
      }

      if (normalizedId === "miss-you") {
        bindMissYouWidgetButtons(el);
      }

      if (isEntryPreviewWidget) {
        bindEntryPreviewWidgetButtons(el);
      }

      if (editBtn && isEditable && !isVirtualWidget) {
        editBtn.addEventListener("mousedown", (event) => {
          event.preventDefault();
          event.stopPropagation();
        });

        editBtn.addEventListener("pointerdown", (event) => {
          event.preventDefault();
          event.stopPropagation();
        });

        editBtn.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          openWidgetEditor(editTargetId);
        });
      }

      if (!isVirtualWidget) {
        bar.addEventListener("pointerdown", (event) => {
          if (event.target.closest("button")) return;
          startWidgetDrag(event, widget, el);
        });
      }

      if (renderSide === "left") {
        leftZone.appendChild(el);
      } else {
        rightZone.appendChild(el);
      }
    });

  if (shouldAnimateMobileReorder && !prefersReducedMotion) {
    requestAnimationFrame(() => {
      document
        .querySelectorAll(".widget[data-widget-id]")
        .forEach((widgetEl) => {
          const previousRect = previousMobileWidgetRects.get(
            widgetEl.dataset.widgetId,
          );
          if (!previousRect) return;

          const nextRect = widgetEl.getBoundingClientRect();
          const deltaX = previousRect.left - nextRect.left;
          const deltaY = previousRect.top - nextRect.top;

          if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) {
            return;
          }

          widgetEl.classList.add("widget-mobile-reordering");
          widgetEl.getAnimations?.().forEach((animation) => animation.cancel());
          const reorderAnimation = widgetEl.animate(
            [
              {
                transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(0.985)`,
                opacity: 0.82,
              },
              {
                transform: "translate3d(0, 0, 0) scale(1)",
                opacity: 1,
              },
            ],
            {
              duration: 460,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            },
          );

          reorderAnimation.addEventListener(
            "finish",
            () => {
              widgetEl.classList.remove("widget-mobile-reordering");
            },
            { once: true },
          );

          reorderAnimation.addEventListener(
            "cancel",
            () => {
              widgetEl.classList.remove("widget-mobile-reordering");
            },
            { once: true },
          );
        });
    });
  }
}

function toggleWidgetMinimized(widgetId) {
  if (minimizedWidgetIds.has(widgetId)) {
    minimizedWidgetIds.delete(widgetId);
  } else {
    minimizedWidgetIds.add(widgetId);
  }

  renderWidgets({ animateMobileReorder: false });
}

function openWidgetEditor(widgetId) {
  dragWidget = null;
  pendingWidgetDrag = null;
  widgetPopupCard?.classList.remove("photo-history-popup-card");
  if (clearWidgetHistoryBtn) {
    clearWidgetHistoryBtn.style.display = "none";
    delete clearWidgetHistoryBtn.dataset.clearWidgetHistoryMode;
  }
  setWidgetPopupLikeButton(null);

  const normalizedId = String(widgetId || "")
    .toLowerCase()
    .trim();

  const widget = widgets.find((item) => {
    const itemId = String(item.id || "")
      .toLowerCase()
      .trim();
    const itemTitle = String(item.title || "").toLowerCase();

    if (itemId === normalizedId) return true;
    if (normalizedId === "dates" && itemTitle.includes("important dates"))
      return true;
    if (normalizedId === "wishlist" && itemTitle.includes("wishlist"))
      return true;
    if (
      normalizedId === "note" &&
      (itemTitle.includes("little note") || itemTitle.includes("smol note"))
    )
      return true;
    if (
      normalizedId === "photo-pin" &&
      (itemTitle.includes("pinned photo") ||
        itemTitle.includes("pinned") ||
        itemTitle.includes("pin it"))
    )
      return true;

    return false;
  });

  widgetPopup?.classList.toggle("love-widget-popup", normalizedId === "love");

  if (!widget) return;

  editingWidgetId = normalizedId;

  if (normalizedId === "love") {
    widgetPopupTitle.textContent = "｡ ₊°༺ together for ༻°₊ ｡";
    saveWidgetBtn.style.display = "none";
    setHeaderWidgetSaveVisibility(false);

    widgetEditorFields.innerHTML = `
      <div class="small-note love-note-text">i hope i get forever with you, sweetie ᰔᩚ</div>
    `;
  } else if (normalizedId === "song") {
    normalizeSongWidget(widget);
    widgetPopupTitle.textContent = widget.title;
    saveWidgetBtn.style.display = "none";
    setHeaderWidgetSaveVisibility(true);
    setWidgetPopupLikeButton(widget);

    widgetEditorFields.innerHTML = `
      <div class="song-editor-layout">
        <div class="song-editor-preview${widget.data?.coverUrl ? " has-cover" : ""}" id="songEditorPreview">
          ${
            widget.data?.coverUrl
              ? `<img class="song-editor-preview-cover" src="${escapeHtml(widget.data.coverUrl)}" alt="Spotify cover preview" />`
              : '<div class="song-editor-preview-empty">cover preview will show here ♡</div>'
          }
        </div>

        <label class="popup-label">spotify track link</label>
        <div class="song-editor-fetch-row">
          <input
            class="popup-input"
            id="widgetFieldSpotifyUrl"
            type="url"
            placeholder="https://open.spotify.com/track/..."
            value="${escapeHtml(widget.data?.spotifyUrl || "")}"
          />
          <button class="soft-btn" id="fetchSpotifySongBtn" type="button">fetch</button>
        </div>

        <label class="popup-label" style="margin-top:12px;">caption</label>
        <input
          class="popup-input"
          id="widgetFieldSongDuration"
          type="text"
          value="${escapeHtml(widget.data?.durationLabel || "")}"
        />

        <input id="widgetFieldSongCover" type="hidden" value="${escapeHtml(widget.data?.coverUrl || "")}" />
        <input id="widgetFieldSongUri" type="hidden" value="${escapeHtml(widget.data?.spotifyUri || "")}" />
        <input id="widgetFieldSongName" type="hidden" value="${escapeHtml(widget.data?.songName || "")}" />
      </div>
    `;

    const spotifyUrlInput = document.getElementById("widgetFieldSpotifyUrl");
    const songDurationInput = document.getElementById(
      "widgetFieldSongDuration",
    );
    const songCoverInput = document.getElementById("widgetFieldSongCover");
    const songUriInput = document.getElementById("widgetFieldSongUri");
    const songNameInput = document.getElementById("widgetFieldSongName");
    const fetchSpotifySongBtn = document.getElementById("fetchSpotifySongBtn");
    const songEditorPreview = document.getElementById("songEditorPreview");

    const renderSongEditorPreview = () => {
      if (!songEditorPreview) return;

      const coverUrl = String(songCoverInput?.value || "").trim();
      songEditorPreview.classList.toggle("has-cover", Boolean(coverUrl));
      songEditorPreview.innerHTML = coverUrl
        ? `<img class="song-editor-preview-cover" src="${escapeHtml(coverUrl)}" alt="Spotify cover preview" />`
        : '<div class="song-editor-preview-empty">cover preview will show here ♡</div>';
    };

    songCoverInput?.addEventListener("input", renderSongEditorPreview);

    fetchSpotifySongBtn?.addEventListener("click", async () => {
      const rawUrl = spotifyUrlInput?.value || "";

      if (!rawUrl.trim()) {
        showMessage("paste a Spotify track link first ♡");
        return;
      }

      fetchSpotifySongBtn.disabled = true;
      fetchSpotifySongBtn.textContent = "fetching...";

      try {
        const spotifyData = await fetchSpotifyTrackCardData(rawUrl);
        if (spotifyUrlInput) spotifyUrlInput.value = spotifyData.spotifyUrl;
        if (songUriInput) songUriInput.value = spotifyData.spotifyUri;
        if (songCoverInput) songCoverInput.value = spotifyData.coverUrl;
        if (songNameInput) songNameInput.value = spotifyData.songName;
        widget.data.songName = spotifyData.songName;
        if (songDurationInput && !songDurationInput.value.trim()) {
          songDurationInput.value = spotifyData.durationLabel;
        }
        renderSongEditorPreview();
        showMessage("Spotify track loaded ♡");
      } catch (error) {
        console.error(error);
        showMessage(error.message || "could not fetch this Spotify track ♡");
      } finally {
        fetchSpotifySongBtn.disabled = false;
        fetchSpotifySongBtn.textContent = "fetch";
      }
    });

  } else if (normalizedId === "note") {
    normalizeWidgetLikesData(widget);
    widgetPopupTitle.textContent = "⋆𐙚₊smol note˚⊹♡";
    saveWidgetBtn.style.display = "none";
    setHeaderWidgetSaveVisibility(true);
    setWidgetPopupLikeButton(widget);

    widgetEditorFields.innerHTML = `
      <label class="popup-label">write something ♡</label>
      <textarea class="popup-input" id="widgetFieldText" rows="5" style="resize: vertical; min-height: 110px;">${widget.data?.text || ""}</textarea>
    `;
  } else if (normalizedId === "dates") {
    const items = widget.data?.items || [];

    widgetPopupTitle.textContent = "⊹ ࣪ ˖important dates⊹ ࣪ ˖";
    saveWidgetBtn.style.display = "none";
    setHeaderWidgetSaveVisibility(false);

    const itemsHtml = items
      .map(
        (item) => `
      <div class="date-edit-item" data-date-id="${item.id}">
        <div style="font-weight:700;margin-bottom:8px;">${item.title}</div>
        <div style="font-size:0.88rem;opacity:0.75;margin-bottom:10px;">${formatDisplayDate(item.date)}</div>
        <div style="display:flex;justify-content:flex-end;">
          <button class="delete-date-btn" type="button" data-date-id="${item.id}">delete</button>
        </div>
      </div>
    `,
      )
      .join("");

    widgetEditorFields.innerHTML = `
      <div style="display:grid;gap:12px;">
        <label class="popup-label">title</label>
        <input class="popup-input" id="dateTitleInput" type="text" placeholder="birthday" />

        <label class="popup-label">date</label>
        <input class="popup-input" id="dateValueInput" type="text" inputmode="numeric" placeholder="dd/mm/yyyy" />

        <div class="popup-actions" style="margin-top:4px;">
          <button class="soft-btn" id="addDateBtn" type="button">add date</button>
        </div>

        <div style="margin-top:8px;display:grid;gap:10px;">
          ${itemsHtml || `<div class="small-note">no dates yet ♡</div>`}
        </div>
      </div>
    `;

    const addDateBtn = document.getElementById("addDateBtn");

    if (addDateBtn) {
      addDateBtn.addEventListener("click", async () => {
        const titleInput = document.getElementById("dateTitleInput");
        const dateInput = document.getElementById("dateValueInput");

        const title = titleInput.value.trim();
        const date = parseDisplayDate(dateInput.value);

        if (!title || !date) {
          showMessage("add a title and date as dd/mm/yyyy ♡");
          return;
        }

        if (!widget.data) widget.data = { items: [] };
        if (!widget.data.items) widget.data.items = [];

        widget.data.items.push({
          id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
          title,
          date,
        });

        await saveWidgetToSupabase(widget, {
          notifyUpdate: true,
          preservePosition: true,
        });
        renderWidgets({ animateMobileReorder: false });
        openWidgetEditor("dates");
        showMessage("date added ♡");
      });
    }

    document.querySelectorAll(".delete-date-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const dateId = btn.dataset.dateId;

        widget.data.items = (widget.data.items || []).filter(
          (item) => item.id !== dateId,
        );

        await saveWidgetToSupabase(widget, {
          notifyUpdate: true,
          preservePosition: true,
        });
        renderWidgets({ animateMobileReorder: false });
        openWidgetEditor("dates");
        showMessage("date deleted ♡");
      });
    });
  } else if (normalizedId === "wishlist") {
    const items = getWishlistItemsInDisplayOrder(widget.data?.items || []);

    widgetPopupTitle.textContent = "𓂃˖˳·˖ ִֶָ ⋆wishlist⋆ ִֶָ˖·˳˖𓂃";
    saveWidgetBtn.style.display = "none";
    setHeaderWidgetSaveVisibility(false);

    const itemsHtml = items
      .map(
        (item, index) => `
      <div class="wishlist-item-row" data-wish-id="${item.id}">
        <div class="wishlist-item-main">
          <button class="toggle-wish-btn" type="button" data-wish-id="${item.id}">
            ${item.done ? "☑" : "☐"}
          </button>
          <div class="wishlist-item-text${item.done ? " is-done" : ""}">${item.text}</div>
        </div>
        <div class="wishlist-item-actions">
          <button class="reorder-wish-btn" type="button" data-wish-id="${item.id}" data-wish-direction="up" aria-label="move wishlist item up" ${index === 0 ? "disabled" : ""}>↑</button>
          <button class="reorder-wish-btn" type="button" data-wish-id="${item.id}" data-wish-direction="down" aria-label="move wishlist item down" ${index === items.length - 1 ? "disabled" : ""}>↓</button>
          <button class="delete-wish-btn" type="button" data-wish-id="${item.id}">delete</button>
        </div>
      </div>
    `,
      )
      .join("");

    widgetEditorFields.innerHTML = `
      <div style="display:grid;gap:12px;">
        <label class="popup-label">add to wishlist</label>
        <input class="popup-input" id="wishTextInput" type="text" placeholder="picnic date" />

        <div class="popup-actions" style="margin-top:4px;">
          <button class="soft-btn" id="addWishBtn" type="button">add item</button>
        </div>

        <div class="wishlist-editor-list">
          ${itemsHtml || `<div class="small-note">nothing on the wishlist yet ♡</div>`}
        </div>
      </div>
    `;

    const addWishBtn = document.getElementById("addWishBtn");

    if (addWishBtn) {
      addWishBtn.addEventListener("click", async () => {
        const wishInput = document.getElementById("wishTextInput");
        const text = wishInput.value.trim();

        if (!text) {
          showMessage("write something for the wishlist");
          return;
        }

        if (!widget.data) widget.data = { items: [] };
        if (!widget.data.items) widget.data.items = [];

        widget.data.items.push({
          id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
          text,
          done: false,
          order: getNextWishlistOrder(widget.data.items),
        });

        await saveWidgetToSupabase(widget, {
          notifyUpdate: true,
          preservePosition: true,
        });
        refreshWidgetContentDom(widget);
        openWidgetEditor("wishlist");
        showMessage("added to wishlist ♡");
      });
    }

    document.querySelectorAll(".delete-wish-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const wishId = btn.dataset.wishId;

        widget.data.items = (widget.data.items || []).filter(
          (item) => item.id !== wishId,
        );

        await saveWidgetToSupabase(widget, {
          notifyUpdate: true,
          preservePosition: true,
        });
        refreshWidgetContentDom(widget);
        openWidgetEditor("wishlist");
        showMessage("wishlist item deleted ♡");
      });
    });

    document.querySelectorAll(".reorder-wish-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        if (btn.hasAttribute("disabled")) return;

        const wishId = btn.dataset.wishId;
        const direction = btn.dataset.wishDirection;
        const currentRow = btn.closest(".wishlist-item-row");
        const list = currentRow?.closest(".wishlist-editor-list");
        const swapRow =
          direction === "up"
            ? currentRow?.previousElementSibling
            : currentRow?.nextElementSibling;
        const previousRects = getWishlistEditorRowRects(list);

        if (!reorderWishlistItem(widget, wishId, direction)) return;

        if (
          list &&
          currentRow &&
          swapRow?.classList.contains("wishlist-item-row")
        ) {
          if (direction === "up") {
            list.insertBefore(currentRow, swapRow);
          } else {
            list.insertBefore(swapRow, currentRow);
          }

          syncWishlistEditorReorderButtons(list);
          animateWishlistEditorRows(list, previousRects);
        }

        await saveWidgetToSupabase(widget, {
          notifyUpdate: true,
          preservePosition: true,
        });
        refreshWidgetContentDom(widget);
        showMessage("wishlist updated ♡");
      });
    });

    document.querySelectorAll(".toggle-wish-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const wishId = btn.dataset.wishId;

        widget.data.items = (widget.data.items || []).map((item) =>
          item.id === wishId ? { ...item, done: !item.done } : item,
        );

        await saveWidgetToSupabase(widget, {
          notifyUpdate: true,
          preservePosition: true,
        });
        refreshWidgetContentDom(widget);
        openWidgetEditor("wishlist");
        showMessage("wishlist updated ♡");
      });
    });
  } else if (normalizedId === "entry-preview") {
    widget.data = normalizeEntryPreviewWidgetData(widget);
    if (!isTotoUser()) {
      widgetPopupTitle.textContent = widget.title || "⊹˚₊ ♡ TOTO’S POEMS ♡ ₊˚⊹";
      saveWidgetBtn.style.display = "none";
      setHeaderWidgetSaveVisibility(false);
      widgetEditorFields.innerHTML = `<div class="small-note">only toto can add or edit these entries ♡</div>`;
      widgetPopup.classList.add("open");
      return;
    }

    widgetPopupTitle.textContent = widget.title || "⊹˚₊ ♡ TOTO’S POEMS ♡ ₊˚⊹";
    saveWidgetBtn.style.display = "none";
    setHeaderWidgetSaveVisibility(true);

    const entries = getEntryPreviewEntries(widget);
    const entryRows = entries
      .map(
        (entry) => `
      <div class="entry-preview-editor-item" data-entry-preview-editor-item data-entry-id="${escapeHtml(entry.id)}">
        <div class="entry-preview-editor-item-header">
          <div class="small-note">entry</div>
          <button class="delete-entry-preview-widget-entry-btn" type="button">delete</button>
        </div>
        <label class="popup-label">title</label>
        <input
          class="popup-input"
          data-entry-preview-title
          type="text"
          maxlength="80"
          value="${escapeHtml(entry.title || "")}"
        />
        <label class="popup-label">entry</label>
        <textarea
          class="popup-input"
          data-entry-preview-text
          rows="7"
          style="resize: vertical; min-height: 150px;"
        >${escapeHtml(entry.text || "")}</textarea>
      </div>
    `,
      )
      .join("");

    widgetEditorFields.innerHTML = `
      <div class="entry-preview-editor">
        <label class="popup-label">button text</label>
        <input
          class="popup-input"
          id="entryPreviewFieldButton"
          type="text"
          maxlength="32"
          value="${escapeHtml(widget.data.buttonLabel || "open entries")}"
        />

        <div class="entry-preview-editor-list" id="entryPreviewEditorList">
          ${entryRows || '<div class="small-note">no entries yet ♡</div>'}
        </div>

        <button class="soft-btn" id="addEntryPreviewWidgetEntryBtn" type="button">add entry</button>
      </div>
    `;

    const entryList = document.getElementById("entryPreviewEditorList");
    const createEntryEditorRow = (entry = {}) => {
      const row = document.createElement("div");
      row.className = "entry-preview-editor-item";
      row.dataset.entryPreviewEditorItem = "";
      row.dataset.entryId = entry.id || createEntryPreviewId();
      row.innerHTML = `
        <div class="entry-preview-editor-item-header">
          <div class="small-note">entry</div>
          <button class="delete-entry-preview-widget-entry-btn" type="button">delete</button>
        </div>
        <label class="popup-label">title</label>
        <input class="popup-input" data-entry-preview-title type="text" maxlength="80" value="${escapeHtml(entry.title || "")}" />
        <label class="popup-label">entry</label>
        <textarea class="popup-input" data-entry-preview-text rows="7" style="resize: vertical; min-height: 150px;">${escapeHtml(entry.text || "")}</textarea>
      `;
      row
        .querySelector(".delete-entry-preview-widget-entry-btn")
        ?.addEventListener("click", () => {
          row.remove();
          if (
            entryList &&
            !entryList.querySelector("[data-entry-preview-editor-item]")
          ) {
            entryList.innerHTML =
              '<div class="small-note">no entries yet ♡</div>';
          }
        });
      return row;
    };

    entryList
      ?.querySelectorAll(".delete-entry-preview-widget-entry-btn")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          btn.closest("[data-entry-preview-editor-item]")?.remove();
          if (!entryList.querySelector("[data-entry-preview-editor-item]")) {
            entryList.innerHTML =
              '<div class="small-note">no entries yet ♡</div>';
          }
        });
      });

    document
      .getElementById("addEntryPreviewWidgetEntryBtn")
      ?.addEventListener("click", () => {
        if (!entryList) return;
        if (!entryList.querySelector("[data-entry-preview-editor-item]")) {
          entryList.innerHTML = "";
        }
        const row = createEntryEditorRow({
          title: "",
          text: "",
        });
        entryList.appendChild(row);
        row.querySelector("[data-entry-preview-title]")?.focus();
      });
  } else if (normalizedId.startsWith("photo-pin")) {
    if (!widget.data) {
      widget.data = {};
    }
    normalizeWidgetLikesData(widget);
    normalizePhotoWidgetComments(widget);
    const canEditPhoto = canEditPhotoPinWidget(widget);

    widgetPopupTitle.textContent =
      normalizedId === "photo-pin-right" ? "♡ pin it ⊹˚₊" : "₊˚⊹ pin it ♡";
    saveWidgetBtn.style.display = "none";
    setHeaderWidgetSaveVisibility(canEditPhoto);
    setWidgetPopupLikeButton(widget);

    const photoData = {
      image: widget.data.image || "",
      text: widget.data.text || "",
      textColor: normalizeHexColor(widget.data.textColor, "#ffffff"),
      textSize: Number(widget.data.textSize) || 22,
      textX: Number.isFinite(Number(widget.data.textX))
        ? Number(widget.data.textX)
        : 50,
      textY: Number.isFinite(Number(widget.data.textY))
        ? Number(widget.data.textY)
        : 86,
      rotate: Number(widget.data.rotate) || 0,
    };

    if (!canEditPhoto) {
      widgetEditorFields.innerHTML = `
        ${getPhotoWidgetCommentPreviewMarkup(widget.data, {
          showLabel: false,
        })}
      `;
      widgetPopup.classList.add("open");
      return;
    }

    widgetEditorFields.innerHTML = `
      <div class="photo-editor-fields">
        <label class="popup-label">photo</label>
        <input class="popup-input" id="photoWidgetInput" type="file" accept="image/*" />
        <input id="photoWidgetImageData" type="hidden" value="${escapeHtml(photoData.image)}" />

        <input id="photoWidgetRotate" type="hidden" value="${photoData.rotate}" />
        <input id="photoWidgetTextX" type="hidden" value="${photoData.textX}" />
        <input id="photoWidgetTextY" type="hidden" value="${photoData.textY}" />

        <label class="popup-label">text</label>
        <input class="popup-input" id="photoWidgetText" type="text" maxlength="60" value="${escapeHtml(photoData.text)}" />

        <div class="photo-editor-toolbar">
          <div class="photo-editor-control photo-editor-control-color">
            <input
              class="photo-color-trigger"
              id="photoColorTrigger"
              type="color"
              value="${escapeHtml(photoData.textColor)}"
              aria-label="choose text color"
              title="choose text color"
            />
            <input
              id="photoTextColor"
              class="photo-color-hex-input"
              type="text"
              inputmode="text"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              maxlength="7"
              value="${escapeHtml(photoData.textColor)}"
              aria-label="text color"
            />
          </div>
          <label class="photo-editor-control">
            <input
              id="photoTextSize"
              type="number"
              min="12"
              max="46"
              value="${photoData.textSize}"
              aria-label="text size"
              title="text size"
            />
          </label>
          <button class="soft-btn photo-editor-tool-btn photo-editor-icon-btn" id="centerPhotoTextXBtn" type="button" title="center text horizontally" aria-label="center text horizontally">↔</button>
          <button class="soft-btn photo-editor-tool-btn" id="rotatePhotoBtn" type="button">rotate</button>
          <button class="soft-btn photo-editor-tool-btn" id="clearPhotoBtn" type="button">clear</button>
        </div>
        <div class="photo-editor-preview${photoData.image ? " has-image" : ""}" id="photoEditorPreview">
          ${
            photoData.image
              ? `
            <img id="photoEditorPreviewImage" src="${photoData.image}" alt="photo preview" />
            <div class="photo-editor-preview-text" id="photoEditorPreviewText"></div>
          `
              : "<span>no photo pinned yet</span>"
          }
        </div>

      </div>
    `;

    const photoInput = document.getElementById("photoWidgetInput");
    const photoImageData = document.getElementById("photoWidgetImageData");
    const photoRotateInput = document.getElementById("photoWidgetRotate");
    const photoTextXInput = document.getElementById("photoWidgetTextX");
    const photoTextYInput = document.getElementById("photoWidgetTextY");
    const preview = document.getElementById("photoEditorPreview");
    const textInput = document.getElementById("photoWidgetText");
    const textColorInput = document.getElementById("photoTextColor");
    const textColorTrigger = document.getElementById("photoColorTrigger");
    const textSizeInput = document.getElementById("photoTextSize");
    const centerPhotoTextXBtn = document.getElementById("centerPhotoTextXBtn");
    const rotateBtn = document.getElementById("rotatePhotoBtn");
    const clearPhotoBtn = document.getElementById("clearPhotoBtn");
    let photoRotation = photoData.rotate;
    let textX = Math.max(0, Math.min(100, photoData.textX));
    let textY = Math.max(0, Math.min(100, photoData.textY));
    let activeTextColor = normalizeHexColor(
      textColorInput?.value,
      photoData.textColor,
    );

    const syncColorFields = () => {
      if (textColorInput) {
        textColorInput.value = activeTextColor;
      }
    };

    const setActiveTextColor = (nextColor) => {
      activeTextColor = normalizeHexColor(nextColor, activeTextColor);
      syncColorFields();
      if (textColorTrigger) {
        textColorTrigger.value = activeTextColor;
        textColorTrigger.title = `text color ${activeTextColor}`;
      }
    };

    const updatePhotoPreview = () => {
      const image = document.getElementById("photoEditorPreviewImage");
      const text = document.getElementById("photoEditorPreviewText");
      if (image) {
        image.style.transform = `rotate(${photoRotation}deg)`;
      }
      if (text) {
        text.textContent = textInput?.value || "";
        text.style.left = `${textX}%`;
        text.style.top = `${textY}%`;
        text.style.color = activeTextColor;
        text.style.setProperty(
          "--photo-text-size",
          String(
            Math.max(12, Math.min(46, Number(textSizeInput?.value) || 22)),
          ),
        );
      }
      if (photoRotateInput) {
        photoRotateInput.value = String(photoRotation);
      }
      if (photoTextXInput) {
        photoTextXInput.value = String(textX);
      }
      if (photoTextYInput) {
        photoTextYInput.value = String(textY);
      }
    };

    const movePhotoTextToPointer = (event) => {
      const rect = preview.getBoundingClientRect();
      textX = Math.max(
        0,
        Math.min(100, ((event.clientX - rect.left) / rect.width) * 100),
      );
      textY = Math.max(
        0,
        Math.min(100, ((event.clientY - rect.top) / rect.height) * 100),
      );
      updatePhotoPreview();
    };

    const wirePhotoTextDrag = () => {
      const text = document.getElementById("photoEditorPreviewText");
      if (!text) return;

      text.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        event.stopPropagation();
        text.setPointerCapture?.(event.pointerId);
        text.classList.add("is-dragging");
        movePhotoTextToPointer(event);
      });

      text.addEventListener("pointermove", (event) => {
        if (!text.classList.contains("is-dragging")) return;
        event.preventDefault();
        movePhotoTextToPointer(event);
      });

      text.addEventListener("pointerup", (event) => {
        text.classList.remove("is-dragging");
        text.releasePointerCapture?.(event.pointerId);
      });
    };

    if (photoData.image) {
      wirePhotoTextDrag();
      updatePhotoPreview();
    }

    textInput?.addEventListener("input", updatePhotoPreview);
    textSizeInput?.addEventListener("input", updatePhotoPreview);
    const handleColorInput = (sourceInput) => {
      const raw = String(sourceInput?.value || "").trim();
      if (!raw) return;
      setActiveTextColor(raw);
      updatePhotoPreview();
    };
    textColorInput?.addEventListener("input", () =>
      handleColorInput(textColorInput),
    );
    textColorTrigger?.addEventListener("input", () =>
      handleColorInput(textColorTrigger),
    );
    textColorInput?.addEventListener("blur", syncColorFields);
    setActiveTextColor(activeTextColor);
    updatePhotoPreview();

    photoInput?.addEventListener("change", async () => {
      const file = photoInput.files?.[0];
      if (!file) return;

      try {
        const imageData = await compressImageFile(file);
        photoImageData.value = imageData;
        preview.classList.add("has-image");
        preview.innerHTML = `
          <img id="photoEditorPreviewImage" src="${imageData}" alt="photo preview" />
          <div class="photo-editor-preview-text" id="photoEditorPreviewText"></div>
        `;
        wirePhotoTextDrag();
        updatePhotoPreview();
      } catch (error) {
        console.error(error);
        showMessage("could not load photo ♡");
      }
    });

    rotateBtn?.addEventListener("click", () => {
      photoRotation = (photoRotation + 90) % 360;
      updatePhotoPreview();
    });

    centerPhotoTextXBtn?.addEventListener("click", () => {
      textX = 50;
      updatePhotoPreview();
    });

    clearPhotoBtn?.addEventListener("click", () => {
      photoImageData.value = "";
      photoRotation = 0;
      textX = 50;
      textY = 86;
      preview.classList.remove("has-image");
      preview.innerHTML = "<span>no photo pinned yet</span>";
      updatePhotoPreview();
    });

  } else {
    widgetPopupTitle.textContent = widget.title;
    widgetEditorFields.innerHTML = `<div class="small-note">this widget is not editable yet ♡</div>`;
    saveWidgetBtn.style.display = "none";
    setHeaderWidgetSaveVisibility(false);
  }

  widgetPopup.classList.add("open");
}

function openWidgetComments(widgetId) {
  const widget = widgets.find((item) => item.id === widgetId);
  if (
    !widget ||
    !isCommentableWidget(widget) ||
    !widgetCommentsPopup ||
    !widgetCommentsPopupFields
  ) {
    return;
  }

  normalizeWidgetLikesData(widget);
  normalizePhotoWidgetComments(widget);
  markWidgetCommentsSeen(widget);

  const prefix = `widget-comments-popup-${widget.id}`;
  const title =
    String(widget.id || "").toLowerCase().trim() === "song"
      ? "now playing comments"
      : "pin it comments";

  if (widgetCommentsPopupTitle) {
    widgetCommentsPopupTitle.textContent = `${title} ♡`;
  }

  widgetPopup?.classList.remove("open", "love-widget-popup");
  widgetPopupCard?.classList.remove("photo-history-popup-card");
  if (saveWidgetBtn) {
    saveWidgetBtn.style.display = "inline-flex";
  }
  setHeaderWidgetSaveVisibility(false);
  setWidgetPopupLikeButton(null);
  if (clearWidgetHistoryBtn) {
    clearWidgetHistoryBtn.style.display = "none";
    delete clearWidgetHistoryBtn.dataset.clearWidgetHistoryMode;
  }

  widgetCommentsPopupFields.innerHTML = `
    ${getWidgetCommentPreviewMarkup(getWidgetCommentPreviewSnapshot(widget), {
      showLabel: false,
    })}
    ${getPhotoWidgetCommentSectionMarkup(widget, {
      prefix,
      title: "comments",
    })}
  `;

  bindPhotoWidgetCommentSection(widget, {
    prefix,
    title: "comments",
  });

  widgetCommentsPopup.classList.add("open");

  window.requestAnimationFrame(() => {
    const ids = getPhotoWidgetCommentSectionIds(prefix);
    const input = document.getElementById(ids.inputId);
    if (input && !input.disabled) {
      input.focus({ preventScroll: true });
    }
  });
}

function closeWidgetComments() {
  widgetCommentsPopup?.classList.remove("open");
  if (widgetCommentsPopupFields) {
    widgetCommentsPopupFields.innerHTML = "";
  }
  Array.from(activePhotoWidgetReplyTargets.keys()).forEach((prefix) => {
    if (String(prefix).startsWith("widget-comments-popup-")) {
      activePhotoWidgetReplyTargets.delete(prefix);
    }
  });
}

async function saveWidgetChanges() {
  if (widgetSaveInFlight) return;
  widgetSaveInFlight = true;
  if (saveWidgetBtn) saveWidgetBtn.disabled = true;
  if (headerSaveWidgetBtn) headerSaveWidgetBtn.disabled = true;

  try {
  const widget = widgets.find((item) => {
    const itemId = String(item.id || "")
      .toLowerCase()
      .trim();
    const itemTitle = String(item.title || "").toLowerCase();

    if (itemId === editingWidgetId) return true;
    if (editingWidgetId === "dates" && itemTitle.includes("important dates"))
      return true;
    if (editingWidgetId === "wishlist" && itemTitle.includes("wishlist"))
      return true;
    if (
      editingWidgetId === "note" &&
      (itemTitle.includes("little note") || itemTitle.includes("smol note"))
    )
      return true;
    if (
      editingWidgetId === "photo-pin" &&
      (itemTitle.includes("pinned photo") ||
        itemTitle.includes("pinned") ||
        itemTitle.includes("pin it"))
    )
      return true;

    return false;
  });

  if (!widget) return;

  let beforeLikeContentSignature = "";

  if (isLikeableWidget(widget)) {
    try {
      const latestSavedRow = await fetchLatestWidgetRow(widget.id);
      if (latestSavedRow) {
        mergeWidgetFromSavedRow(widget, latestSavedRow, {
          preservePosition: true,
        });
      }
      normalizeWidgetLikesData(widget);
      beforeLikeContentSignature = getWidgetLikeContentSignature(widget);
    } catch (error) {
      console.error(error);
      showMessage(error.message || "could not load the latest widget state ♡");
      return;
    }
  }

  const beforeSaveState = JSON.stringify({
    title: widget.title || "",
    data: widget.data || null,
  });

  if (editingWidgetId === "song") {
    if (!widget.data) widget.data = {};
    widget.title = widget.title || "₊˚⊹ now playing ♫";
    const rawSpotifyUrl =
      document.getElementById("widgetFieldSpotifyUrl")?.value.trim() || "";
    const normalizedTrack = normalizeSpotifyTrackUrl(rawSpotifyUrl);
    widget.data.spotifyUrl = normalizedTrack?.spotifyUrl || "";
    widget.data.spotifyUri = widget.data.spotifyUrl
      ? document.getElementById("widgetFieldSongUri")?.value.trim() ||
        normalizedTrack?.spotifyUri ||
        ""
      : "";
    widget.data.durationLabel =
      document.getElementById("widgetFieldSongDuration")?.value.trim() || "";
    widget.data.coverUrl =
      document.getElementById("widgetFieldSongCover")?.value.trim() || "";
    widget.data.songName =
      document.getElementById("widgetFieldSongName")?.value.trim() || "";
    widget.data.accent = Math.max(
      6,
      Math.min(94, Number(widget.data.accent) || 38),
    );
  } else if (editingWidgetId === "note") {
    if (!widget.data) widget.data = {};
    widget.data.text = document.getElementById("widgetFieldText").value.trim();
  } else if (editingWidgetId === "entry-preview") {
    if (!isTotoUser()) {
      showMessage("only toto can edit these entries ♡");
      return;
    }

    if (!widget.data) widget.data = {};
    const previousEntries = getEntryPreviewEntries(widget);
    const existingEntriesById = new Map(
      previousEntries.map((entry) => [entry.id, entry]),
    );
    const now = new Date().toISOString();
    const entries = Array.from(
      document.querySelectorAll("[data-entry-preview-editor-item]"),
    )
      .map((row) => {
        const id = String(row.dataset.entryId || createEntryPreviewId());
        const existingEntry = existingEntriesById.get(id);
        const title =
          row.querySelector("[data-entry-preview-title]")?.value.trim() || "";
        const text =
          row.querySelector("[data-entry-preview-text]")?.value.trim() || "";

        return {
          id,
          title,
          text,
          createdAt: existingEntry?.createdAt || now,
          updatedAt:
            existingEntry &&
            existingEntry.title === title &&
            existingEntry.text === text
              ? existingEntry.updatedAt
              : now,
        };
      })
      .filter((entry) => entry.title || entry.text);
    const nextEntriesById = new Map(entries.map((entry) => [entry.id, entry]));
    const addedEntry = entries.find(
      (entry) => !existingEntriesById.has(entry.id),
    );
    const deletedEntry = previousEntries.find(
      (entry) => !nextEntriesById.has(entry.id),
    );
    const editedEntry = entries.find((entry) => {
      const previousEntry = existingEntriesById.get(entry.id);
      return (
        previousEntry &&
        (previousEntry.title !== entry.title ||
          previousEntry.text !== entry.text)
      );
    });
    const poemAction = addedEntry
      ? "added"
      : deletedEntry
        ? "deleted"
        : editedEntry
          ? "edited"
          : "";
    const poemActionEntry = addedEntry || deletedEntry || editedEntry || null;

    widget.data = {
      ...normalizeEntryPreviewWidgetData(widget),
      buttonLabel:
        document.getElementById("entryPreviewFieldButton")?.value.trim() ||
        "open entries",
      entries,
      lastPoemAction: poemAction,
      lastPoemTitle: poemActionEntry?.title || "",
    };
    delete widget.data.entryId;
    delete widget.data.entryTitle;
    delete widget.data.entryText;
    delete widget.data.entryCreatedAt;
    delete widget.data.entryUpdatedAt;
  } else if (
    String(widget.title || "")
      .toLowerCase()
      .includes("pinned photo") ||
    String(widget.title || "")
      .toLowerCase()
      .includes("pinned") ||
    String(widget.title || "")
      .toLowerCase()
      .includes("pin it") ||
    String(editingWidgetId || "")
      .toLowerCase()
      .startsWith("photo-pin")
  ) {
    if (!canEditPhotoPinWidget(widget)) {
      showMessage("you can only view, like, and comment on this pin ♡");
      return;
    }

    if (!widget.data) widget.data = {};
    widget.data.image =
      document.getElementById("photoWidgetImageData")?.value || "";
    delete widget.data.caption;
    widget.data.text =
      document.getElementById("photoWidgetText")?.value.trim() || "";
    widget.data.textColor = normalizeHexColor(
      document.getElementById("photoTextColor")?.value,
      "#ffffff",
    );
    widget.data.textSize = Math.max(
      12,
      Math.min(
        46,
        Number(document.getElementById("photoTextSize")?.value) || 22,
      ),
    );
    const savedTextX = Number(
      document.getElementById("photoWidgetTextX")?.value,
    );
    const savedTextY = Number(
      document.getElementById("photoWidgetTextY")?.value,
    );
    widget.data.textX = Math.max(
      0,
      Math.min(100, Number.isFinite(savedTextX) ? savedTextX : 50),
    );
    widget.data.textY = Math.max(
      0,
      Math.min(100, Number.isFinite(savedTextY) ? savedTextY : 86),
    );
    widget.data.rotate =
      Number(document.getElementById("photoWidgetRotate")?.value) || 0;
  } else {
    return;
  }

  if (
    beforeLikeContentSignature &&
    getWidgetLikeContentSignature(widget) !== beforeLikeContentSignature
  ) {
    widget.data.likes = [];
    widget.data.likeTimestamps = {};
  }

  const afterSaveState = JSON.stringify({
    title: widget.title || "",
    data: widget.data || null,
  });

  if (beforeSaveState === afterSaveState) {
    showMessage("no changes to save ♡");
    return;
  }

  await saveWidgetToSupabase(widget, {
    notifyUpdate: true,
    preservePosition: true,
  });
  renderWidgets({ animateMobileReorder: false });
  widgetPopup.classList.remove("open");
  setWidgetPopupLikeButton(null);
  showMessage("widget updated ♡");
  } finally {
    widgetSaveInFlight = false;
    if (saveWidgetBtn) saveWidgetBtn.disabled = false;
    if (headerSaveWidgetBtn) headerSaveWidgetBtn.disabled = false;
  }
}

async function saveWidgetToSupabase(widget, options = {}) {
  const {
    recordHistory = true,
    suppressErrorMessage = false,
    notifyUpdate = false,
    preservePosition = false,
  } = options;
  if (notifyUpdate) {
    markWidgetContentUpdated(widget);
  }

  if (recordHistory) {
    recordWidgetHistory(widget);
  }

  const payload = {
    title: widget.title,
    side: widget.side,
    data: widget.data || null,
    content: widget.content || null,
    updated_at: new Date().toISOString(),
  };

  if (!preservePosition) {
    payload.x = Math.round(widget.x);
    payload.y = Math.round(widget.y);
  }

  markPendingLocalWidgetUpdate(widget.id, payload.updated_at);

  const { data: updatedRows, error: updateError } = await supabaseClient
    .from("widgets")
    .update(payload)
    .eq("id", widget.id)
    .select("id");

  if (updateError) {
    console.error(updateError);
    if (!suppressErrorMessage) {
      showMessage(updateError.message);
    }
    return false;
  }

  if (!updatedRows?.length) {
    const { error: insertError } = await supabaseClient.from("widgets").insert({
      id: widget.id,
      ...payload,
      x: Math.round(widget.x),
      y: Math.round(widget.y),
    });

    if (insertError) {
      console.error(insertError);
      if (!suppressErrorMessage) {
        showMessage(insertError.message);
      }
      return false;
    }
  }

  widget.updated_at = payload.updated_at;
  refreshNotificationsFromCurrentData(false);
  return true;
}

async function toggleWidgetWishlistItem(widgetId, wishId) {
  const normalizedWidgetId = String(widgetId || "")
    .toLowerCase()
    .trim();
  const widget = widgets.find((item) => {
    const itemId = String(item.id || "")
      .toLowerCase()
      .trim();
    const itemTitle = String(item.title || "").toLowerCase();

    if (itemId === normalizedWidgetId) return true;
    if (normalizedWidgetId === "wishlist" && itemTitle.includes("wishlist"))
      return true;
    return false;
  });

  if (!widget?.data?.items?.length) return;

  const previousItems = getWishlistItemsInDisplayOrder(widget.data.items);
  widget.data.items = getWishlistItemsInDisplayOrder(widget.data.items).map(
    (item, index) => ({
      ...item,
      order: Number.isFinite(item?.order) ? item.order : index,
      done: item.id === wishId ? !item.done : item.done,
    }),
  );

  refreshWidgetContentDom(widget);

  const saved = await saveWidgetToSupabase(widget, {
    notifyUpdate: true,
    preservePosition: true,
  });
  if (!saved) {
    widget.data.items = previousItems;
    refreshWidgetContentDom(widget);
    showMessage("could not save wishlist update ♡");
    return;
  }
  if (
    widgetPopup?.classList.contains("open") &&
    editingWidgetId === "wishlist"
  ) {
    openWidgetEditor("wishlist");
  }
}

function formatEntryDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString([], {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getPostLikeButtonMarkup(post) {
  return getLikeButtonMarkup(post.likedByMe, post.likesCount || 0);
}

function syncPostLikeButton(postId) {
  const post = posts.find((item) => item.id === postId);
  const btn = document.querySelector(`.like-btn[data-post-id="${postId}"]`);

  if (!post || !btn) return;

  btn.innerHTML = getPostLikeButtonMarkup(post);
  btn.classList.toggle("liked", Boolean(post.likedByMe));
  btn.classList.toggle("is-pending", pendingPostLikeIds.has(postId));
  btn.setAttribute("aria-label", post.likedByMe ? "liked post" : "like post");
  btn.setAttribute("aria-pressed", String(Boolean(post.likedByMe)));
}

function getPostCommentCount(post) {
  return (post?.comments || []).reduce(
    (total, comment) => total + 1 + (comment.replies || []).length,
    0,
  );
}

function syncPostCommentButton(postId) {
  const post = posts.find((item) => item.id === postId);
  const countEl = document.querySelector(
    `.comments-btn[data-post-id="${postId}"] .post-btn-count`,
  );

  if (!post || !countEl) return;

  countEl.textContent = `(${getPostCommentCount(post)})`;
}

function getPostCommentById(post, commentId) {
  if (!post) return null;

  for (const comment of post.comments || []) {
    if (comment.id === commentId) return comment;
    const matchingReply = (comment.replies || []).find(
      (reply) => reply.id === commentId,
    );
    if (matchingReply) return matchingReply;
  }

  return null;
}

function syncCommentLikeButton(commentId) {
  const post = posts.find((item) => item.id === currentCommentsPostId);
  const comment = getPostCommentById(post, commentId);
  const button = commentsList?.querySelector(
    `.comment-like-btn[data-comment-id="${commentId}"]`,
  );

  if (!comment || !button) return;

  button.textContent = `${comment.likedByMe ? "🩷 liked" : "♡ like"} (${comment.likesCount || 0})`;
}

function addCommentToPost(postId, comment) {
  const post = posts.find((item) => item.id === postId);
  if (!post || !comment) return false;

  post.comments = Array.isArray(post.comments) ? post.comments : [];

  if (comment.parent_comment_id) {
    const parent = post.comments.find(
      (item) => item.id === comment.parent_comment_id,
    );

    if (!parent) return false;

    parent.replies = Array.isArray(parent.replies) ? parent.replies : [];
    parent.replies.push(comment);
  } else {
    post.comments.push({
      ...comment,
      replies: Array.isArray(comment.replies) ? comment.replies : [],
    });
  }

  return true;
}

function removeCommentFromPost(postId, commentId) {
  const post = posts.find((item) => item.id === postId);
  if (!post?.comments) return null;

  const topLevelIndex = post.comments.findIndex(
    (comment) => comment.id === commentId,
  );

  if (topLevelIndex !== -1) {
    const [removedComment] = post.comments.splice(topLevelIndex, 1);
    return {
      removedComment,
      restore() {
        post.comments.splice(topLevelIndex, 0, removedComment);
      },
    };
  }

  for (const comment of post.comments) {
    const replies = comment.replies || [];
    const replyIndex = replies.findIndex((reply) => reply.id === commentId);

    if (replyIndex === -1) continue;

    const [removedReply] = replies.splice(replyIndex, 1);
    return {
      removedComment: removedReply,
      restore() {
        replies.splice(replyIndex, 0, removedReply);
      },
    };
  }

  return null;
}

function updateLocalCommentId(postId, temporaryId, savedComment) {
  const post = posts.find((item) => item.id === postId);
  const comment = getPostCommentById(post, temporaryId);
  if (!comment || !savedComment?.id) return;

  comment.id = savedComment.id;
  comment.created_at = savedComment.created_at || comment.created_at;
}

function applyProfileToTimeline(profile) {
  if (!profile?.id) return;

  const displayName =
    profile.nickname || profile.username || "memory";
  const avatarUrl = profile.avatar_url || "";

  posts = posts.map((post) =>
    post.userId === profile.id
      ? {
          ...post,
          nickname: displayName,
          avatarUrl,
        }
      : post,
  );

  document
    .querySelectorAll(`[data-post-id]`)
    .forEach((postEl) => {
      const post = posts.find((item) => item.id === postEl.dataset.postId);
      if (!post || post.userId !== profile.id) return;

      const authorName = postEl.querySelector(".post-author-name");
      if (authorName) {
        authorName.textContent = displayName;
      }

      const avatar = postEl.querySelector(".post-avatar");
      if (!avatar) return;

      const profileAriaLabel = `open ${displayName || "profile"} profile`;
      avatar.setAttribute("aria-label", profileAriaLabel);
      avatar.setAttribute("title", "open profile");

      if (avatarUrl && avatar.tagName === "IMG") {
        avatar.src = avatarUrl;
        avatar.alt = displayName || "profile";
      }
    });
}

function syncPostContent(postId) {
  const post = posts.find((item) => item.id === postId);
  const postEl = document.querySelector(`[data-post-id="${postId}"]`);
  if (!post || !postEl) return;

  const textEl = postEl.querySelector(".post-text");
  const previewEl = postEl.querySelector(".link-preview-list");
  if (!textEl) return;

  textEl.innerHTML = getPostDisplayHtml(post.text);
  textEl.querySelectorAll("a").forEach((link) => {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
  renderLinkPreviews(textEl, previewEl);

  const editedBadge = postEl.querySelector(".post-edited-badge");
  if (post.isEdited && !editedBadge) {
    const header = postEl.querySelector(".post-header");
    header?.insertAdjacentHTML(
      "beforeend",
      `<span class="post-edited-badge">edited</span>`,
    );
  } else if (!post.isEdited && editedBadge) {
    editedBadge.remove();
  }
}

function renderTimeline() {
  timelineEl.innerHTML = "";

  if (!posts.length) {
    timelineEl.innerHTML = `
       <article class="post">
         <div class="post-header"> </div>
         <div class="post-body">
          <div class="post-text ql-editor"> </div>
         </div>
       </article>
     `;
    return;
  }

  posts.forEach((post) => {
    const isOwner = currentProfile && post.userId === currentProfile.id;
    const profileAriaLabel = `open ${post.nickname || "profile"} profile`;
    const avatarHtml = post.avatarUrl
      ? `<img class="post-avatar profile-trigger" src="${post.avatarUrl}" alt="${post.nickname || "profile"}" role="button" tabindex="0" aria-label="${escapeHtml(profileAriaLabel)}" title="open profile" loading="lazy" decoding="async" />`
      : `<div class="post-avatar profile-trigger" role="button" tabindex="0" aria-label="${escapeHtml(profileAriaLabel)}" title="open profile"></div>`;

    const postEl = document.createElement("article");
    postEl.className = "post";
    postEl.dataset.postId = post.id;
    postEl.innerHTML = `
      <div class="post-header">
        <span>˚₊‧ entry ❤︎‧₊˚ — ${formatEntryDate(post.created_at)}</span>
        ${post.isEdited ? `<span class="post-edited-badge">edited</span>` : ""}
      </div>
      <div class="post-body">
        <div class="post-meta">
          ${avatarHtml}
          <div class="post-author-text">
            <span class="post-author-name profile-trigger" role="button" tabindex="0" aria-label="${escapeHtml(profileAriaLabel)}" title="open profile">${post.nickname || post.author}</span>
            <span>${post.author}</span>
          </div>
       </div>
        <div class="post-text ql-editor"></div>
        <div class="link-preview-list" hidden></div>
        <div class="post-actions">
          <button
            class="post-btn like-btn${post.likedByMe ? " liked" : ""}${pendingPostLikeIds.has(post.id) ? " is-pending" : ""}"
            type="button"
            data-post-id="${post.id}"
            aria-label="${post.likedByMe ? "liked post" : "like post"}"
            aria-pressed="${post.likedByMe ? "true" : "false"}"
          >
            ${getPostLikeButtonMarkup(post)}
          </button>
          <button
            class="post-btn comments-btn"
            type="button"
            data-post-id="${post.id}"
            aria-label="open comments"
          >
            <span class="post-btn-icon" aria-hidden="true">💬</span>
            <span class="post-btn-label">comments</span>
            <span class="post-btn-count">(${getPostCommentCount(post)})</span>
          </button>
          <button
            class="post-btn stickers-btn"
            type="button"
            data-post-id="${post.id}"
            aria-label="open stickers"
            aria-pressed="false"
          >
            <span class="post-btn-icon" aria-hidden="true">☻</span>
            <span class="post-btn-label">stickers</span>
          </button>
          ${isOwner ? `<button class="post-btn edit-entry-btn" type="button" data-post-id="${post.id}" aria-label="edit entry"><span class="post-btn-icon" aria-hidden="true">✎</span><span class="post-btn-label">edit</span></button>` : ""}
          ${isOwner ? `<button class="post-btn delete-entry-btn" type="button" data-post-id="${post.id}" aria-label="delete entry"><span class="post-btn-icon" aria-hidden="true">🗑</span><span class="post-btn-label">delete</span></button>` : ""}
        </div>
        <div class="reaction-layer"></div>
      </div>
    `;

    const postTextEl = postEl.querySelector(".post-text");
    postTextEl.innerHTML = getPostDisplayHtml(post.text);
    postTextEl.querySelectorAll("a").forEach((link) => {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
    renderLinkPreviews(postTextEl, postEl.querySelector(".link-preview-list"));

    const postBody = postEl.querySelector(".post-body");
    const avatarEl = postEl.querySelector(".post-avatar");
    const authorNameEl = postEl.querySelector(".post-author-name");
    const openProfileDetails = () =>
      openProfilePopupForUser(post.userId, {
        id: post.userId,
        nickname: post.nickname,
        avatar_url: post.avatarUrl || "",
      });

    bindProfilePopupTrigger(avatarEl, openProfileDetails);
    bindProfilePopupTrigger(authorNameEl, openProfileDetails);

    postBody.addEventListener("dragenter", (event) => {
      if (!isStickerDragEvent(event)) return;
      event.preventDefault();
      postBody.classList.add("sticker-drop-ready");
    });

    postBody.addEventListener("dragover", (event) => {
      if (!isStickerDragEvent(event)) return;
      event.preventDefault();
      postBody.classList.add("sticker-drop-ready");
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "copy";
      }
    });

    postBody.addEventListener("dragleave", (event) => {
      if (!postBody.contains(event.relatedTarget)) {
        postBody.classList.remove("sticker-drop-ready");
      }
    });

    postBody.addEventListener("drop", (event) => {
      if (!isStickerDragEvent(event)) return;
      event.stopPropagation();
      handleStickerDrop(event, post.id);
    });

    postEl.addEventListener("dragover", (event) => {
      if (!isStickerDragEvent(event)) return;
      event.preventDefault();
      const dropBody = getDropBodyFromTarget(event.target) || postBody;
      dropBody.classList.add("sticker-drop-ready");
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "copy";
      }
    });

    postEl.addEventListener("drop", (event) => {
      if (!isStickerDragEvent(event)) return;
      handleStickerDrop(event, post.id);
    });

    timelineEl.appendChild(postEl);
  });

  document.querySelectorAll(".delete-entry-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      openDeleteEntryConfirmation(btn.dataset.postId);
    });
  });

  document.querySelectorAll(".edit-entry-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      openEntryEditor(btn.dataset.postId);
    });
  });

  document.querySelectorAll(".like-btn[data-post-id]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await toggleLike(btn.dataset.postId);
    });
  });

  document.querySelectorAll(".comments-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      openCommentsPopup(btn.dataset.postId);
    });
  });

  document.querySelectorAll(".stickers-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      stickerPopup.classList.add("open");
      renderEmojiPicker();
      renderGifPicker();
      switchStickerTab("type");
    });
  });
  renderPlacedStickers();
}

function getDropBodyFromTarget(target) {
  if (!target) return null;
  if (target.classList?.contains("post-body")) return target;
  return target.closest?.(".post-body") || null;
}

function isStickerDragEvent(event) {
  if (activeSticker) return true;

  const types = Array.from(event?.dataTransfer?.types || []);
  return types.includes(STICKER_MIME_TYPE);
}

function switchStickerTab(nextTab) {
  let activeTabButton = null;
  const nextGiphyType = nextTab === "giphy-sticker" ? "giphy-sticker" : "gif";
  const isGiphyTab = nextTab === "gif" || nextTab === "giphy-sticker";

  if (isGiphyTab && activeGiphySearchType !== nextGiphyType) {
    activeGiphySearchType = nextGiphyType;
    gifSearchResults = [];
    gifSearchQuery = "";
    if (gifSearchInput) {
      gifSearchInput.value = "";
    }
  }

  document.querySelectorAll(".sticker-tab").forEach((button) => {
    const isActive = button.dataset.stickerTab === nextTab;
    button.classList.toggle("active", isActive);
    if (isActive) {
      activeTabButton = button;
    }
  });

  const typePanel = document.getElementById("stickerTypePanel");
  const pickPanel = document.getElementById("stickerPickPanel");
  const gifPanel = document.getElementById("stickerGifPanel");

  if (typePanel) {
    typePanel.classList.toggle("active", nextTab === "type");
  }

  if (pickPanel) {
    pickPanel.classList.toggle("active", nextTab === "pick");
  }

  if (gifPanel) {
    gifPanel.classList.toggle("active", isGiphyTab);
  }

  if (gifSearchInput) {
    gifSearchInput.placeholder =
      activeGiphySearchType === "giphy-sticker"
        ? "Search GIPHY Stickers"
        : "Search GIPHY GIFs";
  }

  if (nextTab === "type") {
    renderTypedStickerPreview();
  }

  if (isGiphyTab) {
    if (!gifSearchQuery && !gifSearchResults.length) {
      setGifSearchStatus(
        GIPHY_API_KEY
          ? ""
          : "add your GIPHY API key in script.js to enable GIPHY search",
      );
    }
    renderGifPicker();
  }

  activeTabButton?.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });
}

function renderEmojiPicker() {
  if (!emojiPickerGrid || hasRenderedEmojiPicker) return;

  emojiPickerGrid.innerHTML = "";

  STICKER_PICKER_GROUPS.forEach((group) => {
    const section = document.createElement("section");
    section.className = "emoji-picker-section";

    const heading = document.createElement("div");
    heading.className = "emoji-picker-heading";
    heading.textContent = group.label;
    section.appendChild(heading);

    const sectionGrid = document.createElement("div");
    sectionGrid.className = "emoji-picker-section-grid";

    group.emojis.forEach((emojiValue) => {
      const button = document.createElement("button");
      button.className = "emoji-picker-btn";
      button.type = "button";
      button.draggable = true;
      button.textContent = emojiValue;
      button.setAttribute("aria-label", `choose ${emojiValue}`);
      button.addEventListener("click", () => {
        stickerInput.value = emojiValue;
        switchStickerTab("type");
      });
      button.addEventListener("dragstart", (event) => {
        activeSticker = emojiValue;
        activeStickerSize = null;
        requestAnimationFrame(() => {
          stickerPopup.classList.remove("open");
        });
        document.body.classList.add("sticker-dragging");

        if (event.dataTransfer) {
          event.dataTransfer.setData(STICKER_MIME_TYPE, emojiValue);
          event.dataTransfer.setData("text/plain", emojiValue);
          event.dataTransfer.effectAllowed = "copy";
          event.dataTransfer.dropEffect = "copy";
        }
      });
      button.addEventListener("dragend", () => {
        activeSticker = null;
        activeStickerSize = null;
        document.body.classList.remove("sticker-dragging");
        document
          .querySelectorAll(".post-body.sticker-drop-ready")
          .forEach((node) => node.classList.remove("sticker-drop-ready"));
      });
      sectionGrid.appendChild(button);
    });

    section.appendChild(sectionGrid);
    emojiPickerGrid.appendChild(section);
  });

  hasRenderedEmojiPicker = true;
}

function renderGifPicker() {
  if (!gifPickerGrid) return;
  gifPickerGrid.innerHTML = "";
  const giphyTypeLabel = getGiphyTypeLabel();
  const giphyTypePlural = getGiphyTypePlural();
  const recentGifStickers = getRecentGiphyItems();
  const gifItems = gifSearchResults.length
    ? gifSearchResults
    : recentGifStickers;

  if (!gifSearchResults.length) {
    setGifSearchStatus(
      recentGifStickers.length
        ? `recently used ${giphyTypePlural} ♡`
        : "",
    );
  }

  gifItems.forEach((gifItem) => {
    const button = document.createElement("button");
    button.className = "gif-picker-card";
    button.type = "button";
    button.dataset.gifUrl = gifItem.url;
    button.draggable = true;
    button.setAttribute(
      "aria-label",
      `choose ${gifItem.label} ${giphyTypeLabel}`,
    );

    const image = document.createElement("img");
    image.src = gifItem.url;
    image.alt = gifItem.label;
    image.loading = "lazy";

    const label = document.createElement("span");
    label.textContent = gifItem.label;

    button.append(image, label);
    button.addEventListener("click", () => {
      gifPickerGrid.querySelectorAll(".gif-picker-card").forEach((card) => {
        card.classList.toggle("active", card === button);
      });
    });

    button.addEventListener("dragstart", (event) => {
      activeSticker = gifItem.url;
      activeStickerSize = DEFAULT_GIF_STICKER_SIZE;
      requestAnimationFrame(() => {
        stickerPopup.classList.remove("open");
      });
      document.body.classList.add("sticker-dragging");

      if (event.dataTransfer) {
        event.dataTransfer.setData(STICKER_MIME_TYPE, gifItem.url);
        event.dataTransfer.setData("text/plain", gifItem.url);
        event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.dropEffect = "copy";
      }
    });

    button.addEventListener("dragend", () => {
      activeSticker = null;
      activeStickerSize = null;
      document.body.classList.remove("sticker-dragging");
      document
        .querySelectorAll(".post-body.sticker-drop-ready")
        .forEach((node) => node.classList.remove("sticker-drop-ready"));
    });

    gifPickerGrid.appendChild(button);
  });
}

function renderTypedStickerPreview() {
  if (!typedStickerPreviewWrap || !typedStickerPreview) return;

  const typedValue = String(stickerInput?.value || "").trim();
  const hasValue = Boolean(typedValue);

  typedStickerPreviewWrap.hidden = !hasValue;
  typedStickerPreview.textContent = typedValue;
  typedStickerPreview.dataset.hint = hasValue ? "" : "click & drag";
  typedStickerPreview.setAttribute(
    "aria-label",
    hasValue ? `use typed sticker ${typedValue}` : "typed sticker preview",
  );
  typedStickerPreview.classList.toggle("is-ready", hasValue);
}

async function searchPublicGifs() {
  if (!gifSearchInput) return;

  const query = gifSearchInput.value.trim();
  const giphyType = activeGiphySearchType;
  const giphyTypePlural = getGiphyTypePlural(giphyType);
  gifSearchQuery = query;

  if (!query) {
    gifSearchResults = [];
    setGifSearchStatus("");
    renderGifPicker();
    return;
  }

  if (!GIPHY_API_KEY) {
    gifSearchResults = [];
    setGifSearchStatus(
      "add your GIPHY API key in script.js to enable GIPHY search",
    );
    renderGifPicker();
    return;
  }

  setGifSearchStatus(`searching ${giphyTypePlural} for "${query}"...`);

  try {
    const endpoint = getGiphySearchEndpoint(giphyType);
    const searchUrl =
      `${endpoint}?api_key=${encodeURIComponent(GIPHY_API_KEY)}` +
      `&q=${escapeQueryParam(query)}&limit=12&rating=g&bundle=messaging_non_clips`;
    const response = await fetch(
      searchUrl,
      {
        headers: {
          "X-Requested-With": GIPHY_CLIENT_KEY,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`GIF search failed with ${response.status}`);
    }

    const payload = await response.json();
    if (activeGiphySearchType !== giphyType) return;

    gifSearchResults = (payload?.data || [])
      .map((gifItem) => ({
        label: gifItem?.title || query,
        url: getGiphyStickerUrl(gifItem),
        type: giphyType,
      }))
      .filter((gifItem) => gifItem.url);

    if (gifSearchResults.length) {
      setGifSearchStatus(`showing GIPHY ${giphyTypePlural} for "${query}"`);
    } else {
      setGifSearchStatus(`no GIPHY ${giphyTypePlural} found for "${query}"`);
    }
    renderGifPicker();
  } catch (error) {
    console.error(error);
    gifSearchResults = [];
    setGifSearchStatus(`could not load GIPHY ${giphyTypePlural} right now`);
    renderGifPicker();
  }
}

async function handleStickerDrop(event, postId) {
  event.preventDefault();

  let droppedSticker = activeSticker;

  if (!droppedSticker && event.dataTransfer) {
    droppedSticker = event.dataTransfer.getData(STICKER_MIME_TYPE);
  }

  if (!droppedSticker) {
    showMessage("no sticker selected ♡");
    return;
  }

  const user = await getCurrentUser();

  if (!user) {
    showMessage("please log in first ♡");
    return;
  }

  const body =
    getDropBodyFromTarget(event.currentTarget) ||
    getDropBodyFromTarget(event.target);

  if (!body) {
    showMessage("could not find the post area ♡");
    return;
  }

  body.classList.remove("sticker-drop-ready");
  const stickerRadius = isGifSticker(droppedSticker)
    ? Math.max(16, (activeStickerSize || DEFAULT_GIF_STICKER_SIZE) / 2)
    : 16;
  const { x, y } = getStickerPositionFromPointer(event, body, stickerRadius);
  const temporaryStickerId = `local-sticker-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
  const optimisticSticker = {
    id: temporaryStickerId,
    postId,
    userId: user.id,
    sticker: droppedSticker,
    x,
    y,
  };

  placedStickers.push(optimisticSticker);
  renderPlacedStickers();

  const { data: savedSticker, error } = await supabaseClient
    .from("post_stickers")
    .insert({
      post_id: postId,
      user_id: user.id,
      emoji: droppedSticker,
      x,
      y,
    })
    .select("id")
    .single();

  if (error) {
    console.error("POST STICKER INSERT ERROR:", error);
    showMessage(error.message);
    placedStickers = placedStickers.filter(
      (item) => item.id !== temporaryStickerId,
    );
    clearPlacedGifSize(temporaryStickerId);
    renderPlacedStickers();
    return;
  }

  if (isGifSticker(droppedSticker)) {
    const gifItem = gifSearchResults.find(
      (item) => item.url === droppedSticker,
    ) ||
      getRecentGiphyItems(activeGiphySearchType).find(
        (item) => item.url === droppedSticker,
      ) ||
      getRecentGifStickers().find((item) => item.url === droppedSticker) || {
        label:
          activeGiphySearchType === "giphy-sticker"
            ? "GIPHY sticker"
            : "gif sticker",
        url: droppedSticker,
        type: activeGiphySearchType,
      };
    saveRecentGifSticker(gifItem, gifItem.type || activeGiphySearchType);
  }

  activeSticker = null;
  document.body.classList.remove("sticker-dragging");
  showMessage("sticker placed ♡");

  if (savedSticker?.id) {
    markLocalRealtimeTable("post_stickers");
    const localSticker = placedStickers.find(
      (item) => item.id === temporaryStickerId,
    );
    if (localSticker) {
      localSticker.id = savedSticker.id;
    }

    if (isGifSticker(droppedSticker)) {
      const gifSize = activeStickerSize || DEFAULT_GIF_STICKER_SIZE;
      clearPlacedGifSize(temporaryStickerId);
      savePlacedGifSize(savedSticker.id, gifSize);
    }

    renderPlacedStickers();
  }

  activeStickerSize = null;
}

function renderPlacedStickers() {
  document.querySelectorAll(".reaction-layer").forEach((layer) => {
    layer.innerHTML = "";
  });

  placedStickers.forEach((item) => {
    const layer = document.querySelector(
      `[data-post-id="${item.postId}"] .reaction-layer`,
    );
    if (!layer) return;
    const isGif = isGifSticker(item.sticker);
    const gifSize = isGif
      ? getPlacedGifSize(item.id)
      : DEFAULT_GIF_STICKER_SIZE;

    const el = document.createElement("div");
    el.className = "reaction-sticker";
    el.dataset.stickerId = item.id;
    if (visibleGifStickerControlTimers.has(item.id)) {
      el.classList.add("show-controls");
    }
    if (isPercentStickerPosition(item)) {
      el.style.left = `${item.x}%`;
      el.style.top = `${item.y}%`;
    } else {
      const layerWidth =
        layer.clientWidth || layer.getBoundingClientRect().width;
      const layerHeight =
        layer.clientHeight || layer.getBoundingClientRect().height;
      const stickerRadius = Math.max(16, gifSize / 2);
      const xPx = Math.max(
        stickerRadius,
        Math.min(layerWidth - stickerRadius, Number(item.x) || stickerRadius),
      );
      const yPx = Math.max(
        stickerRadius,
        Math.min(layerHeight - stickerRadius, Number(item.y) || stickerRadius),
      );
      el.style.left = `${Math.round(xPx)}px`;
      el.style.top = `${Math.round(yPx)}px`;
    }

    const stickerVisual = createStickerVisual(item.sticker, { size: gifSize });
    el.appendChild(stickerVisual);

    if (currentProfile?.id === item.userId) {
      const controlRow = document.createElement("div");
      controlRow.className = "sticker-control-row";

      stickerVisual.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        showGifStickerControls(item.id);

        const layerRect = layer.getBoundingClientRect();
        draggingPlacedSticker = {
          stickerId: item.id,
          sticker: item,
          element: el,
          layer,
          layerRect,
          pointerId: event.pointerId,
        };

        el.classList.add("is-dragging");
        document.body.classList.add("sticker-repositioning");
        stickerVisual.setPointerCapture?.(event.pointerId);
      });

      stickerVisual.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        showGifStickerControls(item.id);
      });

      if (isGif) {
        const resizeControls = document.createElement("div");
        resizeControls.className = "sticker-size-controls";

        const shrinkBtn = document.createElement("button");
        shrinkBtn.className = "sticker-size-btn";
        shrinkBtn.type = "button";
        shrinkBtn.textContent = "-";
        shrinkBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          hideGifStickerControls(item.id);
          savePlacedGifSize(item.id, gifSize - 12);
          renderPlacedStickers();
          showGifStickerControls(item.id);
        });

        const growBtn = document.createElement("button");
        growBtn.className = "sticker-size-btn";
        growBtn.type = "button";
        growBtn.textContent = "+";
        growBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          hideGifStickerControls(item.id);
          savePlacedGifSize(item.id, gifSize + 12);
          renderPlacedStickers();
          showGifStickerControls(item.id);
        });

        resizeControls.append(shrinkBtn, growBtn);
        controlRow.appendChild(resizeControls);

        const undoBtn = document.createElement("button");
        undoBtn.className = "sticker-undo-btn";
        undoBtn.type = "button";
        undoBtn.textContent = "undo";
        undoBtn.addEventListener("click", async (event) => {
          event.stopPropagation();
          hideGifStickerControls(item.id);
          await deletePlacedSticker(item.id);
        });
        controlRow.appendChild(undoBtn);
      } else {
        const undoBtn = document.createElement("button");
        undoBtn.className = "sticker-undo-btn";
        undoBtn.type = "button";
        undoBtn.textContent = "undo";
        undoBtn.addEventListener("click", async (event) => {
          event.stopPropagation();
          hideGifStickerControls(item.id);
          await deletePlacedSticker(item.id);
        });
        controlRow.appendChild(undoBtn);
      }

      el.appendChild(controlRow);
    }

    layer.appendChild(el);
  });
}

function hideGifStickerControls(stickerId) {
  const stickerEl = document.querySelector(
    `.reaction-sticker[data-sticker-id="${stickerId}"]`,
  );
  if (stickerEl) {
    stickerEl.classList.remove("show-controls");
  }

  const timer = visibleGifStickerControlTimers.get(stickerId);
  if (timer) {
    clearTimeout(timer);
    visibleGifStickerControlTimers.delete(stickerId);
  }
}

function showGifStickerControls(stickerId) {
  const stickerEl = document.querySelector(
    `.reaction-sticker[data-sticker-id="${stickerId}"]`,
  );
  if (!stickerEl) return;

  const existingTimer = visibleGifStickerControlTimers.get(stickerId);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  stickerEl.classList.add("show-controls");
  const timer = window.setTimeout(
    () => hideGifStickerControls(stickerId),
    2000,
  );
  visibleGifStickerControlTimers.set(stickerId, timer);
}

function startWidgetDrag(event, widget, element) {
  if (
    isTabbedLayoutActive() ||
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return;
  }

  const zone = widget.side === "left" ? leftZone : rightZone;
  bringWidgetToFront(widget);
  element.style.zIndex = String(widget.zIndex);
  event.target?.setPointerCapture?.(event.pointerId);

  pendingWidgetDrag = {
    widget,
    element,
    zone,
    startX: event.clientX,
    startY: event.clientY,
    originX: widget.x,
    originY: widget.y,
    pointerId: event.pointerId,
    latestClientX: event.clientX,
    latestClientY: event.clientY,
    frameId: null,
  };
}

function updateDraggedWidgetPosition() {
  if (!dragWidget) return;

  dragWidget.frameId = null;

  const {
    widget,
    zone,
    element,
    startX,
    startY,
    originX,
    originY,
    latestClientX,
    latestClientY,
  } = dragWidget;

  const pageRect =
    document.querySelector(".page")?.getBoundingClientRect() ||
    document.documentElement.getBoundingClientRect();
  const zoneRect = zone.getBoundingClientRect();
  const appZoom = getCurrentAppZoom();
  const toLayoutPx = (visualPx) => visualPx / appZoom;
  const viewportWidth =
    document.documentElement.clientWidth || window.innerWidth || pageRect.right;
  const viewportHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    pageRect.bottom;
  const widgetWidth = element.offsetWidth || 240;
  const widgetHeight = element.offsetHeight || 100;
  const nextX = originX + toLayoutPx(latestClientX - startX);
  const nextY = originY + toLayoutPx(latestClientY - startY);
  const gutter = 8;
  const midpoint = pageRect.left + pageRect.width / 2;
  const minX =
    widget.side === "left"
      ? toLayoutPx(0 - zoneRect.left) + gutter
      : toLayoutPx(midpoint - zoneRect.left) + gutter;
  const maxX =
    widget.side === "left"
      ? toLayoutPx(midpoint - zoneRect.left) - widgetWidth - gutter
      : toLayoutPx(viewportWidth - zoneRect.left) - widgetWidth - gutter;
  const minY = Math.max(toLayoutPx(0 - zoneRect.top) + gutter, 0);
  const maxY = Math.max(
    minY,
    toLayoutPx(viewportHeight - zoneRect.top) - widgetHeight - gutter,
  );

  widget.x = Math.round(Math.max(minX, Math.min(maxX, nextX)));
  widget.y = Math.round(Math.max(minY, Math.min(maxY, nextY)));

  element.style.left = `${widget.x}px`;
  element.style.top = `${widget.y}px`;
}

function scheduleDraggedWidgetPositionUpdate() {
  if (!dragWidget || dragWidget.frameId) return;
  dragWidget.frameId = window.requestAnimationFrame(
    updateDraggedWidgetPosition,
  );
}

window.addEventListener("pointermove", (event) => {
  if (draggingPlacedSticker) {
    event.preventDefault();
    const { element, layerRect, stickerId, sticker } = draggingPlacedSticker;
    const isGif = isGifSticker(sticker.sticker);
    const stickerSize = isGif ? getPlacedGifSize(stickerId) : 32;
    const stickerRadius = Math.max(16, stickerSize / 2);
    const nextXpx = Math.round(
      Math.max(
        stickerRadius,
        Math.min(
          layerRect.width - stickerRadius,
          event.clientX - layerRect.left,
        ),
      ),
    );
    const nextYpx = Math.round(
      Math.max(
        stickerRadius,
        Math.min(
          layerRect.height - stickerRadius,
          event.clientY - layerRect.top,
        ),
      ),
    );
    const nextX = Math.round((nextXpx / layerRect.width) * 100);
    const nextY = Math.round((nextYpx / layerRect.height) * 100);

    draggingPlacedSticker.nextX = nextX;
    draggingPlacedSticker.nextY = nextY;
    element.style.left = `${nextX}%`;
    element.style.top = `${nextY}%`;
    return;
  }

  if (!dragWidget && pendingWidgetDrag) {
    const dx = event.clientX - pendingWidgetDrag.startX;
    const dy = event.clientY - pendingWidgetDrag.startY;
    const distance = Math.hypot(dx, dy);

    if (distance > 6) {
      dragWidget = { ...pendingWidgetDrag };
      dragWidget.element.classList.add("dragging");
      document.body.classList.add("dragging-widget");
      pendingWidgetDrag = null;
    }
  }

  if (!dragWidget) return;

  dragWidget.latestClientX = event.clientX;
  dragWidget.latestClientY = event.clientY;
  scheduleDraggedWidgetPositionUpdate();
});

window.addEventListener("pointerup", async () => {
  if (draggingPlacedSticker) {
    const finishedStickerDrag = draggingPlacedSticker;
    draggingPlacedSticker = null;
    document.body.classList.remove("sticker-repositioning");

    finishedStickerDrag.element.classList.remove("is-dragging");

    if (
      Number.isFinite(finishedStickerDrag.nextX) &&
      Number.isFinite(finishedStickerDrag.nextY) &&
      (finishedStickerDrag.nextX !== finishedStickerDrag.sticker.x ||
        finishedStickerDrag.nextY !== finishedStickerDrag.sticker.y)
    ) {
      const didSave = await updatePlacedStickerPosition(
        finishedStickerDrag.stickerId,
        finishedStickerDrag.nextX,
        finishedStickerDrag.nextY,
      );

      if (didSave) {
        finishedStickerDrag.sticker.x = finishedStickerDrag.nextX;
        finishedStickerDrag.sticker.y = finishedStickerDrag.nextY;
      } else {
        renderPlacedStickers();
      }
    }

    return;
  }

  const finishedDrag = dragWidget;

  if (dragWidget?.frameId) {
    window.cancelAnimationFrame(dragWidget.frameId);
    dragWidget.frameId = null;
    updateDraggedWidgetPosition();
  }

  if (dragWidget?.element) {
    dragWidget.element.classList.remove("dragging");
  }

  document.body.classList.remove("dragging-widget");
  document.body.classList.remove("sticker-repositioning");

  dragWidget = null;
  pendingWidgetDrag = null;

  if (finishedDrag) {
    const positionChanged =
      finishedDrag.widget.x !== finishedDrag.originX ||
      finishedDrag.widget.y !== finishedDrag.originY;

    if (positionChanged) {
      const saved = await saveWidgetToSupabase(finishedDrag.widget, {
        recordHistory: false,
      });

      if (!saved) {
        finishedDrag.widget.x = finishedDrag.originX;
        finishedDrag.widget.y = finishedDrag.originY;
        finishedDrag.element.style.left = `${finishedDrag.originX}px`;
        finishedDrag.element.style.top = `${finishedDrag.originY}px`;
      }
    }
  }
});

window.addEventListener("pointercancel", () => {
  if (dragWidget?.frameId) {
    window.cancelAnimationFrame(dragWidget.frameId);
  }

  if (dragWidget?.element) {
    dragWidget.element.classList.remove("dragging");
  }

  dragWidget = null;
  pendingWidgetDrag = null;
  document.body.classList.remove("dragging-widget");

  if (draggingPlacedSticker?.element) {
    draggingPlacedSticker.element.classList.remove("is-dragging");
  }

  draggingPlacedSticker = null;
  document.body.classList.remove("sticker-repositioning");
});
if (stickerTabs) {
  stickerTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-sticker-tab]");
    if (!button) return;
    switchStickerTab(button.dataset.stickerTab);
  });
}

if (gifSearchBtn) {
  gifSearchBtn.addEventListener("click", searchPublicGifs);
}

if (gifSearchInput) {
  gifSearchInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    searchPublicGifs();
  });
}

if (stickerInput) {
  stickerInput.addEventListener("input", () => {
    renderTypedStickerPreview();
  });
}

if (typedStickerPreview) {
  typedStickerPreview.addEventListener("click", () => {
    const typedValue = String(stickerInput?.value || "").trim();
    if (!typedValue) return;
    activeSticker = typedValue;
    activeStickerSize = null;
    typedStickerPreview.classList.add("is-active");
    showMessage("drag it onto a diary entry ♡");
  });

  typedStickerPreview.addEventListener("dragstart", (event) => {
    const typedValue = String(stickerInput?.value || "").trim();
    if (!typedValue) {
      event.preventDefault();
      return;
    }

    activeSticker = typedValue;
    activeStickerSize = null;
    requestAnimationFrame(() => {
      stickerPopup.classList.remove("open");
    });
    document.body.classList.add("sticker-dragging");

    if (event.dataTransfer) {
      event.dataTransfer.setData(STICKER_MIME_TYPE, typedValue);
      event.dataTransfer.setData("text/plain", typedValue);
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.dropEffect = "copy";
    }
  });

  typedStickerPreview.addEventListener("dragend", () => {
    activeSticker = null;
    activeStickerSize = null;
    typedStickerPreview.classList.remove("is-active");
    document.body.classList.remove("sticker-dragging");
    document
      .querySelectorAll(".post-body.sticker-drop-ready")
      .forEach((node) => node.classList.remove("sticker-drop-ready"));
  });
}

closeStickerPopup.addEventListener("click", () => {
  if (typedStickerPreview) {
    typedStickerPreview.classList.remove("is-active");
  }
  stickerPopup.classList.remove("open");
});

stickerPopup.addEventListener("click", (event) => {
  if (event.target === stickerPopup && !popupPointerStartedInsideCard) {
    if (typedStickerPreview) {
      typedStickerPreview.classList.remove("is-active");
    }
    stickerPopup.classList.remove("open");
  }
});

if (newEntryBtn) {
  newEntryBtn.addEventListener("click", () => {
    void openNewEntryComposer();
  });
}

closeEntryPopup.addEventListener("click", () => {
  resetEntryPopup();
  entryPopup.classList.remove("open");
});

if (entryImageInput) {
  entryImageInput.addEventListener("change", async () => {
    const file = entryImageInput.files?.[0];

    if (!file) {
      return;
    }

    try {
      const imageData = await compressImageFile(file, {
        maxSize: 1200,
        quality: 0.84,
      });
      renderEntryImagePreview(imageData);
    } catch (error) {
      console.error(error);
      showMessage(error.message || "could not load image ♡");
      entryImageInput.value = "";
      renderEntryImagePreview("");
    }
  });
}

if (removeEntryImageBtn) {
  removeEntryImageBtn.addEventListener("click", () => {
    if (entryImageInput) {
      entryImageInput.value = "";
    }

    renderEntryImagePreview("");
  });
}

entryPopup.addEventListener("click", (event) => {
  if (event.target === entryPopup && !popupPointerStartedInsideCard) {
    resetEntryPopup();
    entryPopup.classList.remove("open");
  }
});

closeCommentsPopup.addEventListener("click", () => {
  commentsPopup.classList.remove("open");
  replyingToCommentId = null;
  replyingToLabel.style.display = "none";
  replyingToLabel.textContent = "";
});

commentsPopup.addEventListener("click", (event) => {
  if (event.target === commentsPopup && !popupPointerStartedInsideCard) {
    commentsPopup.classList.remove("open");
  }
});

cancelDeleteEntryBtn?.addEventListener("click", closeDeleteEntryConfirmation);
confirmDeleteEntryBtn?.addEventListener("click", confirmDeleteEntry);
deleteEntryPopup?.addEventListener("click", (event) => {
  if (event.target === deleteEntryPopup) {
    closeDeleteEntryConfirmation();
  }
});

closeWidgetPopup.addEventListener("click", () => {
  widgetPopup.classList.remove("open");
  widgetPopup.classList.remove("love-widget-popup");
  widgetPopupCard?.classList.remove("photo-history-popup-card");
  saveWidgetBtn.style.display = "inline-flex";
  setHeaderWidgetSaveVisibility(false);
  setWidgetPopupLikeButton(null);
  if (clearWidgetHistoryBtn) {
    clearWidgetHistoryBtn.style.display = "none";
    delete clearWidgetHistoryBtn.dataset.clearWidgetHistoryMode;
  }
});

widgetPopup.addEventListener("click", (event) => {
  if (event.target === widgetPopup && !popupPointerStartedInsideCard) {
    widgetPopup.classList.remove("open");
    widgetPopup.classList.remove("love-widget-popup");
    widgetPopupCard?.classList.remove("photo-history-popup-card");
    saveWidgetBtn.style.display = "inline-flex";
    setHeaderWidgetSaveVisibility(false);
    setWidgetPopupLikeButton(null);
    if (clearWidgetHistoryBtn) {
      clearWidgetHistoryBtn.style.display = "none";
      delete clearWidgetHistoryBtn.dataset.clearWidgetHistoryMode;
    }
  }
});

widgetPopup.addEventListener("pointerdown", (event) => {
  event.stopPropagation();
});

widgetPopup.addEventListener("mousedown", (event) => {
  event.stopPropagation();
});

closeWidgetCommentsPopup?.addEventListener("click", closeWidgetComments);

widgetCommentsPopup?.addEventListener("click", (event) => {
  if (event.target === widgetCommentsPopup && !popupPointerStartedInsideCard) {
    closeWidgetComments();
  }
});

widgetCommentsPopup?.addEventListener("pointerdown", (event) => {
  event.stopPropagation();
});

widgetCommentsPopup?.addEventListener("mousedown", (event) => {
  event.stopPropagation();
});

closeEntryPreviewPopup?.addEventListener("click", () => {
  entryPreviewPopup?.classList.remove("open");
});

shuffleEntryPreviewPopup?.addEventListener("click", () => {
  activeEntryPreviewEntries = shuffleEntryPreviewEntries(
    activeEntryPreviewEntries,
  );
  renderEntryPreviewEntries(activeEntryPreviewEntries);
});

editEntryPreviewPopup?.addEventListener("click", () => {
  if (!isTotoUser()) {
    showMessage("only toto can edit these entries ♡");
    return;
  }

  entryPreviewPopup?.classList.remove("open");
  openWidgetEditor("entry-preview");
});

entryPreviewPopup?.addEventListener("click", (event) => {
  if (event.target === entryPreviewPopup && !popupPointerStartedInsideCard) {
    entryPreviewPopup.classList.remove("open");
  }
});

saveWidgetBtn.addEventListener("click", saveWidgetChanges);
if (headerSaveWidgetBtn) {
  headerSaveWidgetBtn.addEventListener("click", saveWidgetChanges);
}
if (widgetPopupLikeBtn) {
  widgetPopupLikeBtn.addEventListener("click", async () => {
    const widgetId = widgetPopupLikeBtn.dataset.widgetLikeId;
    if (!widgetId) return;
    await toggleWidgetLike(widgetId);
  });
}
if (clearWidgetHistoryBtn) {
  clearWidgetHistoryBtn.addEventListener("click", async () => {
    const widgetId = clearWidgetHistoryBtn.dataset.clearWidgetHistoryId;
    const historyMode = clearWidgetHistoryBtn.dataset.clearWidgetHistoryMode;
    const widget = widgets.find((item) => item.id === widgetId);
    if (!widget) return;

    const confirmText =
      historyMode === "photo-combined"
        ? "Clear history for both pin it widgets?"
        : `Clear history for ${widget.title}?`;
    const shouldClear = window.confirm(confirmText);
    if (!shouldClear) return;

    if (historyMode === "photo-combined") {
      const photoWidgets = getAllPhotoPinWidgets();
      for (const photoWidget of photoWidgets) {
        clearWidgetHistory(photoWidget.id);
        await saveWidgetToSupabase(photoWidget, {
          recordHistory: false,
          suppressErrorMessage: false,
          notifyUpdate: false,
        });
      }
    } else {
      clearWidgetHistory(widget.id);
      await saveWidgetToSupabase(widget, {
        recordHistory: false,
        suppressErrorMessage: false,
        notifyUpdate: false,
      });
    }

    openWidgetHistory(widget.id);
    showMessage("history cleared ♡");
  });
}

const authPopup = document.getElementById("authPopup");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const passwordToggleBtn = document.getElementById("passwordToggleBtn");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const profileBtn = document.getElementById("profileBtn");
const profilePopup = document.getElementById("profilePopup");
const closeProfilePopup = document.getElementById("closeProfilePopup");
const profileSummaryAvatar = document.getElementById("profileSummaryAvatar");
const profileSummaryName = document.getElementById("profileSummaryName");
const profileSummaryHandle = document.getElementById("profileSummaryHandle");
const profileSummaryJoined = document.getElementById("profileSummaryJoined");
const profileSummaryBio = document.getElementById("profileSummaryBio");
const profilePostsStat = document.getElementById("profilePostsStat");
const profileLikesStat = document.getElementById("profileLikesStat");
const profileMissYouStat = document.getElementById("profileMissYouStat");
const profileMissYouStatLabel = document.getElementById(
  "profileMissYouStatLabel",
);
const profileJoinedStat = document.getElementById("profileJoinedStat");
const profileJoinedStatLabel = document.getElementById(
  "profileJoinedStatLabel",
);
const profileEditSection = document.getElementById("profileEditSection");
const editProfileBtn = document.getElementById("editProfileBtn");
const cancelProfileEditBtn = document.getElementById("cancelProfileEditBtn");
const nicknameInput = document.getElementById("nicknameInput");
const bioInput = document.getElementById("bioInput");
const pfpInput = document.getElementById("pfpInput");
const saveProfileBtn = document.getElementById("saveProfileBtn");
const messageBox = document.getElementById("messageBox");
const logoutBtn = document.getElementById("logoutBtn");

let currentProfile = null;

function showMessage(text) {
  if (!messageBox) {
    alert(text);
    return;
  }

  messageBox.textContent = text;
  messageBox.classList.add("show");

  clearTimeout(showMessage.timeout);
  showMessage.timeout = setTimeout(() => {
    messageBox.classList.remove("show");
  }, 2200);
}

function getEditedPostIds() {
  try {
    const raw = localStorage.getItem("editedPostIds");
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function markPostAsEdited(postId) {
  try {
    const ids = new Set(getEditedPostIds());
    ids.add(postId);
    localStorage.setItem("editedPostIds", JSON.stringify([...ids]));
  } catch (error) {
    console.error(error);
  }
}

function unmarkPostAsEdited(postId) {
  try {
    const ids = getEditedPostIds().filter((id) => id !== postId);
    localStorage.setItem("editedPostIds", JSON.stringify(ids));
  } catch (error) {
    console.error(error);
  }
}

function getWidgetHistoryEntries(widgetId) {
  try {
    const widget =
      typeof widgetId === "object" && widgetId
        ? widgetId
        : widgets.find((item) => item.id === widgetId);
    const storageWidgetId =
      typeof widgetId === "object" ? widgetId?.id || "" : widgetId;
    const sharedHistory = Array.isArray(widget?.data?.history)
      ? widget.data.history
      : [];
    const raw = localStorage.getItem(`widgetHistory:${storageWidgetId}`);
    const parsed = raw ? JSON.parse(raw) : [];
    const legacyHistory = Array.isArray(parsed) ? parsed : [];

    return [...sharedHistory, ...legacyHistory]
      .filter((entry) => entry && typeof entry === "object")
      .filter(
        (entry, index, entries) =>
          entries.findIndex(
            (candidate) =>
              candidate?.savedAt === entry?.savedAt &&
              candidate?.summary === entry?.summary &&
              candidate?.title === entry?.title &&
              candidate?.actorId === entry?.actorId,
          ) === index,
      )
      .sort(
        (a, b) =>
          new Date(b?.savedAt || 0).getTime() -
          new Date(a?.savedAt || 0).getTime(),
      );
  } catch (error) {
    return [];
  }
}

function createWidgetHistoryEntryId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : `widget-history-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isSameWidgetHistoryEntry(entry, targetEntry) {
  const entryId = String(entry?.id || "").trim();
  const targetId = String(targetEntry?.id || "").trim();

  if (entryId && targetId) {
    return entryId === targetId;
  }

  return (
    String(entry?.savedAt || "") === String(targetEntry?.savedAt || "") &&
    String(entry?.summary || "") === String(targetEntry?.summary || "") &&
    String(entry?.title || "") === String(targetEntry?.title || "") &&
    String(entry?.actorId || "") === String(targetEntry?.actorId || "")
  );
}

function serializeWidgetHistoryEntryTarget(entry) {
  try {
    return encodeURIComponent(
      JSON.stringify({
        id: String(entry?.id || "").trim(),
        savedAt: String(entry?.savedAt || ""),
        summary: String(entry?.summary || ""),
        title: String(entry?.title || ""),
        actorId: String(entry?.actorId || ""),
      }),
    );
  } catch (error) {
    console.error(error);
    return "";
  }
}

function parseWidgetHistoryEntryTarget(serializedEntry) {
  try {
    return JSON.parse(decodeURIComponent(String(serializedEntry || "")));
  } catch (error) {
    console.error(error);
    return null;
  }
}

function removeWidgetHistoryEntry(widgetId, targetEntry) {
  if (!widgetId || !targetEntry) return false;

  let removed = false;
  const widget = widgets.find((item) => item.id === widgetId);

  if (widget?.data && typeof widget.data === "object") {
    const currentHistory = Array.isArray(widget.data.history)
      ? widget.data.history
      : [];
    const nextHistory = currentHistory.filter((entry) => {
      const shouldKeep = !isSameWidgetHistoryEntry(entry, targetEntry);
      removed = removed || !shouldKeep;
      return shouldKeep;
    });

    widget.data = {
      ...widget.data,
      history: nextHistory,
    };
  }

  try {
    const storageKey = `widgetHistory:${widgetId}`;
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : [];

    if (Array.isArray(parsed)) {
      const nextStoredHistory = parsed.filter((entry) => {
        const shouldKeep = !isSameWidgetHistoryEntry(entry, targetEntry);
        removed = removed || !shouldKeep;
        return shouldKeep;
      });

      localStorage.setItem(storageKey, JSON.stringify(nextStoredHistory));
    }
  } catch (error) {
    console.error(error);
  }

  return removed;
}

function updateCurrentUserHistoryActorNames(nextName) {
  const actorId = currentProfile?.id || currentUser?.id || "";
  const trimmedName = String(nextName || "").trim();

  if (!actorId || !trimmedName) return;

  widgets.forEach((widget) => {
    if (!widget?.data || typeof widget.data !== "object") return;

    if (Array.isArray(widget.data.history)) {
      widget.data.history = widget.data.history.map((entry) =>
        entry?.actorId === actorId
          ? {
              ...entry,
              actorName: trimmedName,
            }
          : entry,
      );
    }

    if (Array.isArray(widget.data.photoHistory)) {
      widget.data.photoHistory = widget.data.photoHistory.map((entry) =>
        entry?.actorId === actorId
          ? {
              ...entry,
              actorName: trimmedName,
            }
          : entry,
      );
    }

    try {
      const storageKey = `widgetHistory:${widget.id}`;
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : [];

      if (Array.isArray(parsed)) {
        localStorage.setItem(
          storageKey,
          JSON.stringify(
            parsed.map((entry) =>
              entry?.actorId === actorId
                ? {
                    ...entry,
                    actorName: trimmedName,
                  }
                : entry,
            ),
          ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  });
}

function isPhotoPinWidget(widget) {
  const normalizedId = String(widget?.id || "")
    .toLowerCase()
    .trim();
  const normalizedTitle = String(widget?.title || "").toLowerCase();

  return (
    normalizedId.startsWith("photo-pin") ||
    normalizedTitle.includes("pinned photo") ||
    normalizedTitle.includes("pinned") ||
    normalizedTitle.includes("pin it")
  );
}

function getAllPhotoPinWidgets() {
  return widgets.filter((widget) => isPhotoPinWidget(widget));
}

function getHistoryProfilePool() {
  const pool = [];

  if (currentProfile?.id) {
    pool.push(currentProfile);
  }

  knownProfiles.forEach((profile) => {
    if (!profile?.id || pool.some((item) => item?.id === profile.id)) return;
    pool.push(profile);
  });

  return pool;
}

function findHistoryProfileByKeyword(keyword) {
  const normalizedKeyword = String(keyword || "").trim().toLowerCase();
  if (!normalizedKeyword) return null;

  return (
    getHistoryProfilePool().find((profile) => {
      const identity =
        `${profile?.nickname || ""} ${profile?.username || ""}`.toLowerCase();
      return identity.includes(normalizedKeyword);
    }) || null
  );
}

function getLegacyHistoryActorName(entry) {
  const totoProfile = findHistoryProfileByKeyword("toto");
  const dodoProfile = findHistoryProfileByKeyword("dodo");

  if (entry?.side === "left") {
    return getProfileDisplayName(dodoProfile || totoProfile, "someone");
  }

  if (entry?.side === "right") {
    return getProfileDisplayName(totoProfile || dodoProfile, "someone");
  }

  return getProfileDisplayName(dodoProfile || totoProfile, "someone");
}

function getWidgetHistoryActorName(entry) {
  const actorId = String(entry?.actorId || "").trim();
  if (actorId) {
    if (currentProfile?.id === actorId) {
      return getProfileDisplayName(currentProfile, "you");
    }

    const matchingProfile = knownProfiles.find((profile) => profile?.id === actorId);
    if (matchingProfile) {
      return getProfileDisplayName(matchingProfile, "someone");
    }
  }

  const savedName = String(entry?.actorName || "").trim();
  if (savedName) return savedName;

  if (!actorId) {
    return getLegacyHistoryActorName(entry);
  }

  return "someone";
}

function getPhotoHistoryEntries(widget) {
  if (!widget?.data || typeof widget.data !== "object") {
    return [];
  }

  const entries = Array.isArray(widget.data.photoHistory) ? widget.data.photoHistory : [];
  return entries.map((entry) => ({
    ...entry,
    sourceWidgetId: entry?.sourceWidgetId || widget.id,
    sourceWidgetTitle: entry?.sourceWidgetTitle || widget.title || "",
  }));
}

function createPhotoWidgetCommentId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : `photo-widget-comment-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizePhotoWidgetCommentRecord(comment, widget, index = 0) {
  const id =
    String(comment?.id || "").trim() ||
    `photo-widget-comment-${widget?.id || "widget"}-${index}`;
  const replies = Array.isArray(comment?.replies)
    ? comment.replies
        .filter((reply) => reply && typeof reply === "object")
        .map((reply, replyIndex) => ({
          id:
            String(reply.id || "").trim() ||
            `${id}-reply-${replyIndex}`,
          userId: String(reply.userId || reply.user_id || "").trim(),
          actorName: String(
            reply.actorName || reply.nickname || reply.author || "",
          ).trim(),
          text: String(reply.text || reply.content || "").trim(),
          createdAt: String(reply.createdAt || reply.created_at || "").trim(),
        }))
        .filter((reply) => reply.text)
        .sort(
          (left, right) =>
            new Date(left.createdAt || 0).getTime() -
            new Date(right.createdAt || 0).getTime(),
        )
    : [];

  return {
    id,
    userId: String(comment?.userId || comment?.user_id || "").trim(),
    actorName: String(
      comment?.actorName || comment?.nickname || comment?.author || "",
    ).trim(),
    text: String(comment?.text || comment?.content || "").trim(),
    createdAt: String(comment?.createdAt || comment?.created_at || "").trim(),
    preview: getWidgetCommentPreviewData(comment),
    replies,
  };
}

function getPhotoWidgetComments(widget) {
  if (!widget?.data || typeof widget.data !== "object") {
    return [];
  }

  const rawComments = Array.isArray(widget.data.comments)
    ? widget.data.comments
    : Array.isArray(widget.data.photoComments)
      ? widget.data.photoComments
      : [];

  return rawComments
    .filter((comment) => comment && typeof comment === "object")
    .map((comment, index) =>
      normalizePhotoWidgetCommentRecord(comment, widget, index),
    )
    .filter((comment) => comment.text)
    .sort(
      (left, right) =>
        new Date(left.createdAt || 0).getTime() -
        new Date(right.createdAt || 0).getTime(),
    );
}

function normalizePhotoWidgetComments(widget) {
  if (!widget?.data || typeof widget.data !== "object") {
    return false;
  }

  const normalizedComments = getPhotoWidgetComments(widget);
  const existingComments = Array.isArray(widget.data.comments)
    ? widget.data.comments
    : [];
  const hadLegacyCommentsKey = Object.prototype.hasOwnProperty.call(
    widget.data,
    "photoComments",
  );
  const alreadyNormalized =
    Array.isArray(widget.data.comments) &&
    existingComments.length === normalizedComments.length &&
    existingComments.every((comment, index) => {
      const normalizedComment = normalizedComments[index];
      return (
        String(comment?.id || "").trim() === normalizedComment.id &&
        String(comment?.userId || "").trim() === normalizedComment.userId &&
        String(comment?.actorName || "").trim() === normalizedComment.actorName &&
        String(comment?.text || "").trim() === normalizedComment.text &&
        String(comment?.createdAt || "").trim() === normalizedComment.createdAt &&
        JSON.stringify(
          Array.isArray(comment?.replies) ? comment.replies : [],
        ) === JSON.stringify(normalizedComment.replies) &&
        JSON.stringify(getWidgetCommentPreviewData(comment)) ===
          JSON.stringify(normalizedComment.preview)
      );
    });

  if (alreadyNormalized && !hadLegacyCommentsKey) {
    return false;
  }

  widget.data = {
    ...widget.data,
    comments: normalizedComments,
  };
  delete widget.data.photoComments;
  return true;
}

function getPhotoWidgetCommentSectionIds(prefix) {
  return {
    labelId: `${prefix}Label`,
    listId: `${prefix}List`,
    inputId: `${prefix}Input`,
    buttonId: `${prefix}Button`,
    ownerNoteId: `${prefix}OwnerNote`,
    replyLabelId: `${prefix}ReplyLabel`,
    cancelReplyId: `${prefix}CancelReply`,
  };
}

function isOwnPhotoPinWidget(widget) {
  return Boolean(isPhotoPinWidget(widget) && canEditPhotoPinWidget(widget));
}

function canReplyToPhotoWidgetComment(comment) {
  const currentUserId = currentProfile?.id || currentUser?.id || "";
  return Boolean(comment?.userId && comment.userId !== currentUserId);
}

function getPhotoWidgetCommentPreviewData(source) {
  const previewSource =
    source?.preview && typeof source.preview === "object" ? source.preview : source;
  return {
    kind: "photo",
    image: String(previewSource?.image || "").trim(),
    text: String(previewSource?.text || ""),
    textColor: normalizeHexColor(previewSource?.textColor, "#ffffff"),
    textSize: Math.max(12, Math.min(46, Number(previewSource?.textSize) || 22)),
    textX: Math.max(0, Math.min(100, Number(previewSource?.textX) || 50)),
    textY: Math.max(0, Math.min(100, Number(previewSource?.textY) || 86)),
    rotate: Number(previewSource?.rotate) || 0,
  };
}

function getSongWidgetCommentPreviewData(source) {
  const previewSource =
    source?.preview && typeof source.preview === "object" ? source.preview : source;
  return {
    kind: "song",
    spotifyUrl: String(previewSource?.spotifyUrl || "").trim(),
    coverUrl: String(previewSource?.coverUrl || "").trim(),
    songName: String(previewSource?.songName || "").trim(),
    durationLabel: String(previewSource?.durationLabel || "").trim(),
    caption: String(previewSource?.caption || "").trim(),
    accent: Math.max(6, Math.min(94, Number(previewSource?.accent) || 38)),
  };
}

function getWidgetCommentPreviewData(source) {
  const previewSource =
    source?.preview && typeof source.preview === "object" ? source.preview : source;
  const previewKind = String(previewSource?.kind || "").trim().toLowerCase();

  if (previewKind === "song") {
    return getSongWidgetCommentPreviewData(source);
  }

  if (
    previewKind === "photo" ||
    previewSource?.image ||
    previewSource?.textColor ||
    previewSource?.textSize ||
    previewSource?.textX ||
    previewSource?.textY ||
    previewSource?.rotate
  ) {
    return getPhotoWidgetCommentPreviewData(source);
  }

  if (previewSource?.coverUrl || previewSource?.songName || previewSource?.caption) {
    return getSongWidgetCommentPreviewData(source);
  }

  return getPhotoWidgetCommentPreviewData(source);
}

function getPhotoWidgetCommentPreviewMarkup(source, options = {}) {
  const { showLabel = false, compact = false } = options;
  const preview = getPhotoWidgetCommentPreviewData(source);
  const image = preview.image;
  const overlayText = escapeHtml(preview.text || "");
  const textColor = escapeHtml(
    normalizeHexColor(preview.textColor, "#ffffff"),
  );
  const textSize = Math.max(12, Math.min(46, Number(preview.textSize) || 22));
  const textX = Math.max(0, Math.min(100, Number(preview.textX) || 50));
  const textY = Math.max(0, Math.min(100, Number(preview.textY) || 86));
  const rotate = Number(preview.rotate) || 0;

  return `
    <div class="photo-widget-comment-preview-card${compact ? " is-inline" : ""}" aria-label="pin it preview">
      <div class="photo-widget-comment-preview-frame">
        ${
          image
            ? `
          <img
            class="photo-widget-comment-preview-image"
            src="${escapeHtml(image)}"
            alt="pin it preview"
            style="transform:rotate(${rotate}deg);"
            loading="lazy"
            decoding="async"
          />
          ${
            overlayText
              ? `<div class="photo-widget-comment-preview-text" style="left:${textX}%;top:${textY}%;color:${textColor};--photo-text-size:${textSize};">${overlayText}</div>`
              : ""
          }
        `
            : `<div class="photo-widget-comment-preview-empty">no photo pinned yet ♡</div>`
        }
      </div>
      ${
        showLabel
          ? '<div class="photo-widget-comment-preview-label">the pin you\'re commenting on ♡</div>'
          : ""
      }
    </div>
  `;
}

function getSongWidgetCommentPreviewMarkup(source, options = {}) {
  const { showLabel = false, compact = false } = options;
  const preview = getSongWidgetCommentPreviewData(source);
  const coverUrl = String(preview.coverUrl || "").trim();
  const spotifyUrl = String(preview.spotifyUrl || "").trim();
  const songName = escapeHtml(preview.songName || "saved song ♡");
  const caption = escapeHtml(preview.caption || preview.durationLabel || "");
  const accent = Math.max(6, Math.min(94, Number(preview.accent) || 38));

  if (!compact) {
    return `
      <div class="song-widget-comment-preview-card is-full" aria-label="song preview">
        <div class="song-widget-card${coverUrl ? " has-cover" : ""}">
          ${
            coverUrl
              ? `<img class="song-widget-cover" src="${escapeHtml(coverUrl)}" alt="Spotify cover art" loading="lazy" decoding="async" />`
              : '<div class="song-widget-art-placeholder">paste a Spotify track link to fill this card ♡</div>'
          }
          <div class="song-widget-meta">
            <div class="song-widget-name">${songName}</div>
            <div class="song-widget-time">${caption || "--:--"}</div>
          </div>
          <div class="song-widget-progress" aria-hidden="true">
            <span style="width:${accent}%"></span>
          </div>
          <div class="song-widget-controls" aria-hidden="true">
            <span class="song-widget-skip">⏮</span>
            <span class="song-widget-play">⏸</span>
            <span class="song-widget-skip">⏭</span>
          </div>
          <div class="song-widget-volume" aria-hidden="true">
            <span class="song-widget-volume-icon">🔈</span>
            <div class="song-widget-volume-bar"><span style="width:68%"></span></div>
          </div>
          ${
            spotifyUrl
              ? `<a class="song-widget-link" href="${escapeHtml(spotifyUrl)}" target="_blank" rel="noreferrer noopener">open in spotify</a>`
              : ""
          }
        </div>
        ${
          showLabel
            ? '<div class="photo-widget-comment-preview-label">the song you\'re commenting on ♡</div>'
            : ""
        }
      </div>
    `;
  }

  return `
    <div class="song-widget-comment-preview-card${compact ? " is-inline" : ""}" aria-label="song preview">
      <div class="song-widget-comment-preview-meta">
        <div class="song-widget-comment-preview-title">${songName}</div>
        ${
          caption
            ? `<div class="song-widget-comment-preview-caption">${caption}</div>`
            : ""
        }
      </div>
      ${
        showLabel
          ? '<div class="photo-widget-comment-preview-label">the song you\'re commenting on ♡</div>'
          : ""
      }
    </div>
  `;
}

function getWidgetCommentPreviewMarkup(source, options = {}) {
  const preview = getWidgetCommentPreviewData(source);
  if (preview.kind === "song") {
    return getSongWidgetCommentPreviewMarkup(preview, options);
  }

  return getPhotoWidgetCommentPreviewMarkup(preview, options);
}

function getWidgetCommentPreviewSnapshot(widget) {
  const normalizedId = String(widget?.id || "")
    .toLowerCase()
    .trim();

  if (normalizedId === "song") {
    const songData =
      widget?.data && typeof widget.data === "object" ? widget.data : {};
    return {
      kind: "song",
      spotifyUrl: String(songData.spotifyUrl || "").trim(),
      coverUrl: String(songData.coverUrl || "").trim(),
      songName: String(songData.songName || "").trim(),
      durationLabel: String(songData.durationLabel || "").trim(),
      caption: String(songData.durationLabel || "").trim(),
      accent: Math.max(6, Math.min(94, Number(songData.accent) || 38)),
    };
  }

  return getPhotoWidgetCommentPreviewData(widget?.data || {});
}

function getPhotoWidgetCommentSectionMarkup(widget, options = {}) {
  const {
    prefix = `photo-widget-comments-${widget?.id || "widget"}`,
    title = "comments",
    includeInput = true,
  } = options;
  const comments = getPhotoWidgetComments(widget);
  const ids = getPhotoWidgetCommentSectionIds(prefix);
  const commentCount = comments.reduce(
    (total, comment) => total + 1 + (comment.replies || []).length,
    0,
  );
  const countLabel = commentCount ? ` (${commentCount})` : "";

  return `
    <section class="photo-widget-comments-section" data-photo-widget-comments-prefix="${escapeHtml(prefix)}">
      <label
        class="popup-label photo-widget-comments-label"
        id="${escapeHtml(ids.labelId)}"
        ${includeInput ? `for="${escapeHtml(ids.inputId)}"` : ""}
      >
        ${escapeHtml(title)}${countLabel}
      </label>
      <div
        class="photo-widget-comments-list"
        id="${escapeHtml(ids.listId)}"
      ></div>
      ${
        includeInput
          ? `
        <textarea
          class="popup-input photo-widget-comment-input"
          id="${escapeHtml(ids.inputId)}"
          rows="3"
          maxlength="240"
        ></textarea>
        <div
          class="photo-widget-owner-comment-note"
          id="${escapeHtml(ids.ownerNoteId)}"
          hidden
        ></div>
        <div
          class="photo-widget-replying-label"
          id="${escapeHtml(ids.replyLabelId)}"
          hidden
        >
          <span></span>
          <button
            class="photo-widget-cancel-reply-btn"
            id="${escapeHtml(ids.cancelReplyId)}"
            type="button"
          >
            cancel
          </button>
        </div>
        <div class="popup-actions photo-widget-comments-actions">
          <button
            class="soft-btn"
            id="${escapeHtml(ids.buttonId)}"
            type="button"
          >
            post comment
          </button>
        </div>
      `
          : ""
      }
    </section>
  `;
}

function syncPhotoWidgetCommentComposer(widget, options = {}) {
  const { prefix = `photo-widget-comments-${widget?.id || "widget"}` } =
    options;
  const ids = getPhotoWidgetCommentSectionIds(prefix);
  const input = document.getElementById(ids.inputId);
  const saveBtn = document.getElementById(ids.buttonId);
  const ownerNoteEl = document.getElementById(ids.ownerNoteId);
  if (!input || !saveBtn) return;

  const comments = getPhotoWidgetComments(widget);
  const replyTargetId = activePhotoWidgetReplyTargets.get(prefix) || "";
  const replyTarget = comments.find((comment) => comment.id === replyTargetId);
  const ownsPhotoPin = isOwnPhotoPinWidget(widget);
  const canUseComposer =
    !ownsPhotoPin || Boolean(replyTarget && canReplyToPhotoWidgetComment(replyTarget));

  input.disabled = !canUseComposer;
  saveBtn.disabled = !canUseComposer;
  saveBtn.textContent = replyTarget ? "post reply" : "post comment";
  input.placeholder = ownsPhotoPin
    ? canUseComposer
      ? "write a reply ♡"
      : "reply to someone else's comment ♡"
    : "write a comment ♡";

  if (ownerNoteEl) {
    ownerNoteEl.hidden = true;
    ownerNoteEl.textContent = "";
  }
}

function renderPhotoWidgetCommentsSection(widget, options = {}) {
  const {
    prefix = `photo-widget-comments-${widget?.id || "widget"}`,
    title = "comments",
  } = options;
  const ids = getPhotoWidgetCommentSectionIds(prefix);
  const listEl = document.getElementById(ids.listId);
  const labelEl = document.getElementById(ids.labelId);
  const replyLabelEl = document.getElementById(ids.replyLabelId);
  if (!listEl) return;

  const comments = getPhotoWidgetComments(widget);
  if (labelEl) {
    const commentCount = comments.reduce(
      (total, comment) => total + 1 + (comment.replies || []).length,
      0,
    );
    labelEl.textContent = `${title}${commentCount ? ` (${commentCount})` : ""}`;
  }

  const replyTargetId = activePhotoWidgetReplyTargets.get(prefix) || "";
  const replyTarget = comments.find((comment) => comment.id === replyTargetId);
  if (replyLabelEl) {
    replyLabelEl.hidden = !replyTarget;
    const textEl = replyLabelEl.querySelector("span");
    if (textEl && replyTarget) {
      const actorName =
        replyTarget.actorName ||
        getProfileDisplayName(getKnownProfileById(replyTarget.userId), "memory");
      textEl.textContent = `replying to ${actorName} ♡`;
    }
  }

  syncPhotoWidgetCommentComposer(widget, options);

  if (!comments.length) {
    listEl.innerHTML = `<div class="comment-empty">no comments yet ♡</div>`;
    return;
  }

  listEl.innerHTML = comments
    .map((comment) => {
      const actorName = escapeHtml(
        comment.actorName ||
          getProfileDisplayName(getKnownProfileById(comment.userId), "memory"),
      );
      const preview = getWidgetCommentPreviewData(comment);
      const hasPreview =
        preview.kind === "song"
          ? Boolean(
              preview.coverUrl ||
                preview.songName ||
                preview.durationLabel ||
                preview.caption,
            )
          : Boolean(preview.image || preview.text);
      const canDelete =
        comment.userId &&
        comment.userId === (currentProfile?.id || currentUser?.id || "");
      const canReply = canReplyToPhotoWidgetComment(comment);
      const repliesHtml = (comment.replies || [])
        .map((reply) => {
          const replyActorName = escapeHtml(
            reply.actorName ||
              getProfileDisplayName(getKnownProfileById(reply.userId), "memory"),
          );
          const canDeleteReply =
            reply.userId &&
            reply.userId === (currentProfile?.id || currentUser?.id || "");

          return `
            <div
              class="photo-widget-comment-reply"
              data-photo-widget-comment-row-id="${escapeHtml(reply.id)}"
            >
              <div
                class="comment-name profile-trigger"
                role="button"
                tabindex="0"
                data-photo-widget-comment-profile-id="${escapeHtml(reply.userId)}"
              >
                ${replyActorName}
              </div>
              <div
                class="comment-text"
                data-photo-widget-comment-text-id="${escapeHtml(reply.id)}"
              ></div>
              <div
                class="comment-link-preview-list link-preview-list"
                data-photo-widget-comment-preview-id="${escapeHtml(reply.id)}"
                hidden
              ></div>
              <div class="photo-widget-comment-footer">
                <div class="comment-meta">${formatEntryDate(reply.createdAt)}</div>
                ${
                  canDeleteReply
                    ? `
                      <button
                        class="photo-widget-delete-reply-btn"
                        type="button"
                        data-photo-widget-delete-comment-id="${escapeHtml(reply.id)}"
                      >
                        delete
                      </button>
                    `
                    : ""
                }
              </div>
            </div>
          `;
        })
        .join("");

      return `
        <div
          class="comment-item photo-widget-comment-item"
          data-photo-widget-comment-row-id="${escapeHtml(comment.id)}"
        >
          <div class="photo-widget-comment-content">
            <div
              class="comment-name profile-trigger"
              role="button"
              tabindex="0"
              data-photo-widget-comment-profile-id="${escapeHtml(comment.userId)}"
            >
              ${actorName}
            </div>
            <div
              class="comment-text"
              data-photo-widget-comment-text-id="${escapeHtml(comment.id)}"
            ></div>
            <div
              class="comment-link-preview-list link-preview-list"
              data-photo-widget-comment-preview-id="${escapeHtml(comment.id)}"
              hidden
            ></div>
            <div class="photo-widget-comment-footer">
              <div class="comment-meta">${formatEntryDate(comment.createdAt)}</div>
              ${
                canReply
                  ? `
                    <button
                      class="photo-widget-reply-btn"
                      type="button"
                      data-photo-widget-reply-comment-id="${escapeHtml(comment.id)}"
                    >
                      reply
                    </button>
                  `
                  : ""
              }
            </div>
            ${repliesHtml ? `<div class="photo-widget-comment-replies">${repliesHtml}</div>` : ""}
          </div>
          ${hasPreview ? getWidgetCommentPreviewMarkup(comment, { compact: true }) : ""}
          ${
            canDelete
              ? `
                <div class="comment-actions photo-widget-comment-actions">
                  <button
                    class="delete-comment-btn"
                    type="button"
                    data-photo-widget-delete-comment-id="${escapeHtml(comment.id)}"
                    aria-label="delete comment"
                    title="delete comment"
                  >
                    ×
                  </button>
                </div>
              `
                  : ""
              }
        </div>
      `;
    })
    .join("");

  comments.forEach((comment) => {
    const textEl = listEl.querySelector(
      `[data-photo-widget-comment-text-id="${comment.id}"]`,
    );
    if (textEl) {
      renderTextWithLinkPreviews(
        textEl,
        listEl.querySelector(
          `[data-photo-widget-comment-preview-id="${comment.id}"]`,
        ),
        comment.text,
      );
    }

    (comment.replies || []).forEach((reply) => {
      const replyTextEl = listEl.querySelector(
        `[data-photo-widget-comment-text-id="${reply.id}"]`,
      );
      if (replyTextEl) {
        renderTextWithLinkPreviews(
          replyTextEl,
          listEl.querySelector(
            `[data-photo-widget-comment-preview-id="${reply.id}"]`,
          ),
          reply.text,
        );
      }
    });
  });

  listEl
    .querySelectorAll("[data-photo-widget-reply-comment-id]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const targetCommentId = String(
          button.dataset.photoWidgetReplyCommentId || "",
        ).trim();
        if (!targetCommentId) return;

        activePhotoWidgetReplyTargets.set(prefix, targetCommentId);
        renderPhotoWidgetCommentsSection(widget, options);

        const input = document.getElementById(ids.inputId);
        input?.focus();
      });
    });

  listEl
    .querySelectorAll("[data-photo-widget-delete-comment-id]")
    .forEach((button) => {
      button.addEventListener("click", async () => {
        await deletePhotoWidgetComment(
          widget.id,
          button.dataset.photoWidgetDeleteCommentId,
          options,
        );
      });
    });

  listEl
    .querySelectorAll("[data-photo-widget-comment-profile-id]")
    .forEach((nameEl) => {
      const profileId =
        String(nameEl.getAttribute("data-photo-widget-comment-profile-id") || "")
          .trim();
      const fallbackProfile = {
        id: profileId,
        nickname: nameEl.textContent?.trim() || "memory",
      };
      bindProfilePopupTrigger(nameEl, () =>
        openProfilePopupForUser(profileId, fallbackProfile),
      );
    });
}

function bindPhotoWidgetCommentSection(widget, options = {}) {
  const { prefix = `photo-widget-comments-${widget?.id || "widget"}` } =
    options;
  const ids = getPhotoWidgetCommentSectionIds(prefix);

  renderPhotoWidgetCommentsSection(widget, options);

  const saveBtn = document.getElementById(ids.buttonId);
  const input = document.getElementById(ids.inputId);
  const cancelReplyBtn = document.getElementById(ids.cancelReplyId);

  saveBtn?.addEventListener("click", async () => {
    await savePhotoWidgetComment(widget.id, options);
  });

  cancelReplyBtn?.addEventListener("click", () => {
    activePhotoWidgetReplyTargets.delete(prefix);
    renderPhotoWidgetCommentsSection(widget, options);
    input?.focus();
  });

  input?.addEventListener("keydown", async (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      await savePhotoWidgetComment(widget.id, options);
    }
  });
}

async function savePhotoWidgetComment(widgetId, options = {}) {
  const widget = widgets.find((item) => item.id === widgetId);
  if (!widget) return;

  const { prefix = `photo-widget-comments-${widget.id}` } = options;
  const ids = getPhotoWidgetCommentSectionIds(prefix);
  const input = document.getElementById(ids.inputId);
  const content = String(input?.value || "").trim();

  if (!content) {
    showMessage("write something first ♡");
    return;
  }

  const user = await getCurrentUser();
  if (!user) {
    showMessage("please log in first ♡");
    return;
  }

  normalizePhotoWidgetComments(widget);
  const previousComments = getPhotoWidgetComments(widget);
  const replyTargetId = activePhotoWidgetReplyTargets.get(prefix) || "";
  const replyTarget = previousComments.find(
    (comment) => comment.id === replyTargetId,
  );
  const replyTargetExists = Boolean(replyTarget);
  const ownsPhotoPin = isOwnPhotoPinWidget(widget);

  if (ownsPhotoPin && !replyTargetExists) {
    showMessage("you can only reply to comments on your own pin ♡");
    return;
  }

  if (replyTargetExists && !canReplyToPhotoWidgetComment(replyTarget)) {
    showMessage("you can only reply to someone else's comment ♡");
    return;
  }

  const nextComment = {
    id: createPhotoWidgetCommentId(),
    userId: user.id,
    actorName: getProfileDisplayName(currentProfile, "memory"),
    text: content,
    createdAt: new Date().toISOString(),
  };
  const nextComments = replyTargetExists
    ? previousComments.map((comment) =>
        comment.id === replyTargetId
          ? {
              ...comment,
              replies: [...(comment.replies || []), nextComment].slice(-40),
            }
          : comment,
      )
    : [
        ...previousComments,
        {
          ...nextComment,
          preview: getWidgetCommentPreviewSnapshot(widget),
          replies: [],
        },
      ].slice(-60);

  widget.data = {
    ...(widget.data && typeof widget.data === "object" ? widget.data : {}),
    comments: nextComments,
  };

  if (input) {
    input.value = "";
  }
  if (replyTargetExists) {
    activePhotoWidgetReplyTargets.delete(prefix);
  }
  renderPhotoWidgetCommentsSection(widget, options);
  syncWidgetCommentButton(widget.id);

  const saved = await saveWidgetToSupabase(widget, {
    recordHistory: false,
    notifyUpdate: false,
    suppressErrorMessage: false,
    preservePosition: true,
  });

  if (!saved) {
    widget.data.comments = previousComments;
    if (replyTargetExists) {
      activePhotoWidgetReplyTargets.set(prefix, replyTargetId);
    }
    if (input) {
      input.value = content;
    }
    renderPhotoWidgetCommentsSection(widget, options);
    syncWidgetCommentButton(widget.id);
    return;
  }
  showMessage(replyTargetExists ? "reply posted! ♡" : "comment posted! ♡");
}

async function deletePhotoWidgetComment(widgetId, commentId, options = {}) {
  const widget = widgets.find((item) => item.id === widgetId);
  const normalizedCommentId = String(commentId || "").trim();
  if (!widget || !normalizedCommentId) return;

  const row = document.querySelector(
    `[data-photo-widget-comment-row-id="${normalizedCommentId}"]`,
  );
  if (row) {
    row.style.transition = "opacity 0.25s ease, transform 0.25s ease";
    row.style.opacity = "0";
    row.style.transform = "translateY(6px) scale(0.98)";
  }

  const previousComments = getPhotoWidgetComments(widget);
  widget.data = {
    ...(widget.data && typeof widget.data === "object" ? widget.data : {}),
    comments: previousComments
      .filter((comment) => comment.id !== normalizedCommentId)
      .map((comment) => ({
        ...comment,
        replies: (comment.replies || []).filter(
          (reply) => reply.id !== normalizedCommentId,
        ),
      })),
  };
  renderPhotoWidgetCommentsSection(widget, options);
  syncWidgetCommentButton(widget.id);

  const saved = await saveWidgetToSupabase(widget, {
    recordHistory: false,
    notifyUpdate: false,
    suppressErrorMessage: false,
    preservePosition: true,
  });

  if (!saved) {
    widget.data.comments = previousComments;
    renderPhotoWidgetCommentsSection(widget, options);
    syncWidgetCommentButton(widget.id);
    return;
  }

  showMessage("comment deleted ♡");
}

function getPhotoHistorySnapshotSignature(entry) {
  return JSON.stringify({
    image: entry?.image || "",
    text: entry?.text || "",
    textColor: entry?.textColor || "",
    textSize: Number(entry?.textSize) || 22,
    textX: Number(entry?.textX) || 50,
    textY: Number(entry?.textY) || 86,
    rotate: Number(entry?.rotate) || 0,
  });
}

function recordPhotoPinHistory(widget) {
  if (!isPhotoPinWidget(widget)) return;

  const currentData =
    widget?.data && typeof widget.data === "object" ? widget.data : {};
  const image = String(currentData.image || "").trim();

  if (!image) return;

  const existing = getPhotoHistoryEntries(widget);
  const nextEntry = {
    id: crypto.randomUUID ? crypto.randomUUID() : `photo-history-${Date.now()}`,
    savedAt: new Date().toISOString(),
    actorId: currentProfile?.id || currentUser?.id || "",
    actorName: getProfileDisplayName(currentProfile, "someone"),
    sourceWidgetId: widget.id,
    sourceWidgetTitle: widget.title || "",
    image,
    text: String(currentData.text || ""),
    textColor: normalizeHexColor(currentData.textColor, "#ffffff"),
    textSize: Math.max(12, Math.min(46, Number(currentData.textSize) || 22)),
    textX: Math.max(0, Math.min(100, Number(currentData.textX) || 50)),
    textY: Math.max(0, Math.min(100, Number(currentData.textY) || 86)),
    rotate: Number(currentData.rotate) || 0,
  };

  if (
    existing.length &&
    getPhotoHistorySnapshotSignature(existing[0]) ===
      getPhotoHistorySnapshotSignature(nextEntry)
  ) {
    return;
  }

  widget.data = {
    ...currentData,
    photoHistory: [nextEntry, ...existing].slice(0, 36),
  };
}

function getCombinedPhotoHistoryEntries() {
  return getAllPhotoPinWidgets()
    .flatMap((widget) => getPhotoHistoryEntries(widget))
    .sort(
      (a, b) =>
        new Date(b?.savedAt || 0).getTime() - new Date(a?.savedAt || 0).getTime(),
    );
}

function groupPhotoHistoryEntries(entries) {
  const groups = [];

  entries.forEach((entry) => {
    const savedAt = entry?.savedAt ? new Date(entry.savedAt) : null;
    const label =
      savedAt && !Number.isNaN(savedAt.getTime())
        ? savedAt.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : "memories";
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.label === label) {
      lastGroup.entries.push(entry);
      return;
    }

    groups.push({
      label,
      entries: [entry],
    });
  });

  return groups;
}

function renderPhotoHistoryPopup(widget) {
  widgetPopup?.classList.remove("love-widget-popup");
  widgetPopupCard?.classList.add("photo-history-popup-card");
  const photoHistoryEntries = getCombinedPhotoHistoryEntries();
  widgetPopupTitle.textContent = "pin it history";
  saveWidgetBtn.style.display = "none";
  setHeaderWidgetSaveVisibility(false);
  setWidgetPopupLikeButton(null);

  if (clearWidgetHistoryBtn) {
    clearWidgetHistoryBtn.style.display = photoHistoryEntries.length
      ? "inline-flex"
      : "none";
    clearWidgetHistoryBtn.dataset.clearWidgetHistoryId = widget.id;
    clearWidgetHistoryBtn.dataset.clearWidgetHistoryMode = "photo-combined";
  }

  if (!photoHistoryEntries.length) {
    widgetEditorFields.innerHTML =
      '<div class="small-note">no pinned photos yet ♡</div>';
    widgetPopup.classList.add("open");
    return;
  }

  const groupedEntries = groupPhotoHistoryEntries(photoHistoryEntries);
  widgetEditorFields.innerHTML = `
    <div class="photo-history">
      ${groupedEntries
        .map(
          (group) => `
        <section class="photo-history-group">
          <h4 class="photo-history-heading">${escapeHtml(group.label)}</h4>
          <div class="photo-history-grid">
            ${group.entries
              .map((entry) => {
                const overlayText = escapeHtml(entry.text || "");
                const actorName = escapeHtml(getWidgetHistoryActorName(entry));
                const textColor = escapeHtml(
                  normalizeHexColor(entry.textColor, "#ffffff"),
                );
                const textSize = Math.max(
                  12,
                  Math.min(46, Number(entry.textSize) || 22),
                );
                const textX = Math.max(
                  0,
                  Math.min(100, Number(entry.textX) || 50),
                );
                const textY = Math.max(
                  0,
                  Math.min(100, Number(entry.textY) || 86),
                );
                const rotate = Number(entry.rotate) || 0;

                return `
                  <article class="photo-history-card">
                    <button
                      class="photo-history-delete-btn"
                      type="button"
                      data-photo-history-delete-id="${escapeHtml(entry.id || "")}"
                      data-photo-history-source-widget-id="${escapeHtml(entry.sourceWidgetId || "")}"
                      aria-label="delete pinned photo from history"
                      title="delete from history"
                    >
                      ×
                    </button>
                    <div class="photo-history-frame">
                      <img
                        class="photo-history-image"
                        src="${escapeHtml(entry.image || "")}"
                        alt="pinned photo history"
                        style="transform:rotate(${rotate}deg);"
                        loading="lazy"
                        decoding="async"
                      />
                      ${
                        overlayText
                          ? `<div class="photo-history-text" style="left:${textX}%;top:${textY}%;color:${textColor};--photo-text-size:${textSize};">${overlayText}</div>`
                          : ""
                      }
                    </div>
                    <div class="photo-history-meta">
                      <div class="photo-history-actor">${actorName}</div>
                      <div class="widget-history-time">${formatEntryDate(entry.savedAt)}</div>
                    </div>
                  </article>
                `;
              })
              .join("")}
          </div>
        </section>
      `,
        )
        .join("")}
    </div>
  `;

  widgetEditorFields
    .querySelectorAll("[data-photo-history-delete-id]")
    .forEach((button) => {
      button.addEventListener("click", async () => {
        const entryId = String(button.dataset.photoHistoryDeleteId || "").trim();
        const sourceWidgetId = String(
          button.dataset.photoHistorySourceWidgetId || "",
        ).trim();
        const sourceWidget = widgets.find((item) => item.id === sourceWidgetId);
        if (!entryId || !sourceWidget) return;

        sourceWidget.data = {
          ...(sourceWidget.data && typeof sourceWidget.data === "object"
            ? sourceWidget.data
            : {}),
          photoHistory: getPhotoHistoryEntries(sourceWidget).filter(
            (entry) => entry?.id !== entryId,
          ),
        };

        await saveWidgetToSupabase(sourceWidget, {
          recordHistory: false,
          notifyUpdate: false,
          suppressErrorMessage: false,
        });
        renderWidgets({ animateMobileReorder: false });
        renderPhotoHistoryPopup(widget);
      });
    });

  widgetPopup.classList.add("open");
}

function summarizeWidgetHistory(widget) {
  const normalizedId = String(widget.id || "")
    .toLowerCase()
    .trim();
  const normalizedTitle = String(widget.title || "").toLowerCase();

  if (normalizedId === "song") {
    return `${widget.data?.songName || "untitled"}\n${widget.data?.durationLabel || ""}`.trim();
  }

  if (normalizedId === "love") {
    return `since ${widget.data?.startDate || ""}`.trim();
  }

  if (
    normalizedId === "note" ||
    normalizedTitle.includes("little note") ||
    normalizedTitle.includes("smol note")
  ) {
    return widget.data?.text || "smol note";
  }

  if (normalizedId === "dates" || normalizedTitle.includes("important dates")) {
    const count = widget.data?.items?.length || 0;
    return `${count} saved date${count === 1 ? "" : "s"}`;
  }

  if (normalizedId === "wishlist" || normalizedTitle.includes("wishlist")) {
    const count = widget.data?.items?.length || 0;
    return `${count} wishlist item${count === 1 ? "" : "s"}`;
  }

  return widget.content || widget.title || "widget update";
}

function recordWidgetHistory(widget) {
  try {
    recordPhotoPinHistory(widget);
    const existing = getWidgetHistoryEntries(widget.id);
    const summary = summarizeWidgetHistory(widget);
    const previousEntry = existing[0];

    if (
      previousEntry?.summary === summary &&
      previousEntry?.title === (widget.title || "")
    ) {
      return;
    }

    const nextEntry = {
      id: createWidgetHistoryEntryId(),
      savedAt: new Date().toISOString(),
      summary,
      title: widget.title || "",
      actorId: currentProfile?.id || currentUser?.id || "",
      actorName: getProfileDisplayName(currentProfile, "someone"),
      side: widget.side || "",
      x: widget.x ?? null,
      y: widget.y ?? null,
    };

    widget.data = {
      ...(widget.data && typeof widget.data === "object" ? widget.data : {}),
      history: [nextEntry, ...existing].slice(0, 20),
    };

    localStorage.setItem(
      `widgetHistory:${widget.id}`,
      JSON.stringify([nextEntry, ...existing].slice(0, 20)),
    );
  } catch (error) {
    console.error(error);
  }
}

function clearWidgetHistory(widgetId) {
  try {
    const widget = widgets.find((item) => item.id === widgetId);
    if (widget) {
      widget.data = {
        ...(widget.data && typeof widget.data === "object" ? widget.data : {}),
        history: [],
        photoHistory: [],
      };
    }
    localStorage.removeItem(`widgetHistory:${widgetId}`);
  } catch (error) {
    console.error(error);
  }
}

function openWidgetHistory(widgetId) {
  const widget = widgets.find((item) => item.id === widgetId);
  if (!widget) return;
  const normalizedId = String(widget.id || "")
    .toLowerCase()
    .trim();
  const normalizedTitle = String(widget.title || "").toLowerCase();

  if (isPhotoPinWidget(widget)) {
    renderPhotoHistoryPopup(widget);
    return;
  }

  widgetPopup?.classList.remove("love-widget-popup");
  widgetPopupCard?.classList.remove("photo-history-popup-card");
  const historyEntries = getWidgetHistoryEntries(widget);
  widgetPopupTitle.textContent =
    normalizedId === "note" ||
    normalizedTitle.includes("little note") ||
    normalizedTitle.includes("smol note")
      ? widget.title
      : `${widget.title} history`;
  saveWidgetBtn.style.display = "none";
  setHeaderWidgetSaveVisibility(false);
  setWidgetPopupLikeButton(null);
  if (clearWidgetHistoryBtn) {
    clearWidgetHistoryBtn.style.display = historyEntries.length
      ? "inline-flex"
      : "none";
    clearWidgetHistoryBtn.dataset.clearWidgetHistoryId = widget.id;
    delete clearWidgetHistoryBtn.dataset.clearWidgetHistoryMode;
  }

  widgetEditorFields.innerHTML = historyEntries.length
    ? `
      <div class="widget-history-list">
        ${historyEntries
          .map(
            (entry, index) => `
          <div class="widget-history-item">
            <div class="widget-history-item-top">
              <div class="widget-history-time">${formatEntryDate(entry.savedAt)}</div>
              <button
                class="widget-history-delete-btn"
                type="button"
                data-widget-history-delete-entry="${escapeHtml(serializeWidgetHistoryEntryTarget(entry))}"
                aria-label="delete this history message"
                title="delete this history message"
              >
                ×
              </button>
            </div>
            <div class="widget-history-summary${entry?.actorId === (currentProfile?.id || currentUser?.id || "") ? " widget-history-actor-editable" : ""}" ${entry?.actorId === (currentProfile?.id || currentUser?.id || "") ? `role="button" tabindex="0" aria-label="edit displayed name" title="edit name" data-widget-history-actor-index="${index}"` : ""}>${escapeHtml(getWidgetHistoryActorName(entry))}</div>
            <div class="widget-history-summary">${escapeHtml(entry.summary || "widget update")}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    `
    : `<div class="small-note">no widget history yet ♡</div>`;

  widgetEditorFields
    .querySelectorAll("[data-widget-history-actor-index]")
    .forEach((actorEl) => {
      const openHistoryNameEditor = (triggerEvent) => {
        triggerEvent?.preventDefault?.();
        triggerEvent?.stopPropagation?.();
        if (actorEl.querySelector("input")) return;

        const currentName = String(currentProfile?.nickname || actorEl.textContent || "")
          .trim();
        const input = document.createElement("input");
        input.type = "text";
        input.className = "post-author-name-input";
        input.maxLength = 60;
        input.value = currentName;
        input.setAttribute("aria-label", "edit displayed name");

        actorEl.textContent = "";
        actorEl.appendChild(input);
        input.focus();
        input.select();
        let didFinish = false;

        const finish = async (shouldSave) => {
          if (didFinish) return;
          didFinish = true;
          const nextName = input.value.trim();
          actorEl.textContent = currentName || "someone";

          if (!shouldSave || !nextName || nextName === currentName) return;

          await saveInlinePostDisplayName(nextName);
          openWidgetHistory(widget.id);
        };

        ["click", "mousedown", "pointerdown"].forEach((eventName) => {
          input.addEventListener(eventName, (event) => {
            event.stopPropagation();
          });
        });

        input.addEventListener("keydown", async (event) => {
          event.stopPropagation();
          if (event.key === "Enter") {
            event.preventDefault();
            await finish(true);
          }

          if (event.key === "Escape") {
            event.preventDefault();
            await finish(false);
          }
        });

        input.addEventListener("blur", (event) => {
          event.stopPropagation();
          finish(true);
        });
      };

      actorEl.addEventListener("click", openHistoryNameEditor);
      actorEl.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        event.stopPropagation();
        openHistoryNameEditor(event);
      });
    });

  widgetEditorFields
    .querySelectorAll("[data-widget-history-delete-entry]")
    .forEach((button) => {
      button.addEventListener("click", async () => {
        const targetEntry = parseWidgetHistoryEntryTarget(
          button.dataset.widgetHistoryDeleteEntry,
        );
        if (!targetEntry) return;

        const shouldDelete = window.confirm("Delete this history message?");
        if (!shouldDelete) return;

        const removed = removeWidgetHistoryEntry(widget.id, targetEntry);
        if (!removed) return;

        const saved = await saveWidgetToSupabase(widget, {
          recordHistory: false,
          notifyUpdate: false,
          suppressErrorMessage: false,
        });

        if (!saved) return;

        openWidgetHistory(widget.id);
        renderWidgets({ animateMobileReorder: false });
        showMessage("history message deleted ♡");
      });
    });

  widgetPopup.classList.add("open");
}

function resetEntryPopup() {
  editingPostId = null;
  if (entryPopupTitle) entryPopupTitle.textContent = "new entry ♡";
  if (entryPopupLabel) entryPopupLabel.textContent = "write something ♡";
  if (saveEntryBtn) saveEntryBtn.textContent = "post";
  clearEntryComposer();
}

async function openNewEntryComposer() {
  const user = await getCurrentUser();

  if (!user) {
    if (newEntryBtn) {
      newEntryBtn.classList.add("is-hidden");
    }
    showMessage("please log in first ♡");
    return;
  }

  resetEntryPopup();
  entryPopup.classList.add("open");
  if (newEntryBtn) {
    newEntryBtn.classList.remove("is-hidden");
  }
  focusEntryComposerToEnd();
}

function openEntryEditor(postId) {
  const post = posts.find((item) => item.id === postId);
  if (!post) return;

  editingPostId = postId;
  if (entryPopupTitle) entryPopupTitle.textContent = "edit entry ♡";
  if (entryPopupLabel) entryPopupLabel.textContent = "change some words ♡";
  if (saveEntryBtn) saveEntryBtn.textContent = "save";
  setEntryComposerFromStoredContent(post.text || "");
  entryPopup.classList.add("open");
  focusEntryComposerToEnd();
}

function setCurrentUser(user) {
  currentUser = user || null;
  document.body.classList.toggle("app-authenticated", Boolean(currentUser));
  if (appToolbar) {
    appToolbar.dataset.authState = currentUser ? "logged-in" : "logged-out";
  }
  if (!currentUser) {
    stopProfilePresenceHeartbeat();
    stopLiveUpdates();
    closeNotificationsPanel();
  } else {
    startProfilePresenceHeartbeat();
    startLiveUpdates();
  }
  updateFloatingEntryButtonVisibility();
}

function setToolbarAuthState(state) {
  if (appToolbar) {
    appToolbar.dataset.authState = state;
  }
}

function setAppBootingState(isBooting) {
  document.body.classList.toggle("app-booting", isBooting);
}

function hideLaunchSplash() {
  if (!launchSplash) {
    setAppBootingState(false);
    return Promise.resolve();
  }

  setAppBootingState(false);
  launchSplash.classList.add("is-hiding");

  return new Promise((resolve) => {
    window.setTimeout(() => {
      launchSplash.hidden = true;
      resolve();
    }, BOOT_SPLASH_FADE_MS);
  });
}

function waitForAnimationFrames(count = 2) {
  return new Promise((resolve) => {
    const tick = (remaining) => {
      if (remaining <= 0) {
        resolve();
        return;
      }

      requestAnimationFrame(() => tick(remaining - 1));
    };

    tick(count);
  });
}

function withBootTimeout(promise, timeoutMs = 9000) {
  return Promise.race([
    promise,
    new Promise((resolve) => {
      window.setTimeout(resolve, timeoutMs);
    }),
  ]);
}

function renderBootFallbackShell() {
  console.warn("App boot timed out before user data finished loading.");
  currentProfile = null;
  knownProfiles = [];
  posts = [];
  placedStickers = [];
  notifications = [];
  setCurrentUser(null);
  closeProfileDetailsPopup();
  closeNotificationsPanel();
  authPopup?.classList.add("open");
  renderSignedOutShell();
}

function waitForWindowLoad() {
  if (document.readyState === "complete") {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    window.addEventListener("load", resolve, { once: true });
  });
}

function waitForImageLoad(image) {
  if (!image || (image.complete && image.naturalWidth > 0)) {
    return Promise.resolve();
  }

  image.loading = "eager";

  return new Promise((resolve) => {
    image.addEventListener("load", resolve, { once: true });
    image.addEventListener("error", resolve, { once: true });
  });
}

async function waitForInitialPageReady() {
  await waitForAnimationFrames(1);

  const splashImage = launchSplash?.querySelector("img");
  const readinessTasks = [waitForImageLoad(splashImage)];

  await withBootTimeout(Promise.allSettled(readinessTasks), 4000);
  await waitForAnimationFrames(1);
}

function renderSignedOutShell() {
  timelineEl.innerHTML = "";
  leftZone.innerHTML = "";
  rightZone.innerHTML = "";
  renderNotifications();
}

function getNotificationStorageUserId() {
  return currentUser?.id || currentProfile?.id || "";
}

function getNotificationsSeenStorageKey() {
  const userId = getNotificationStorageUserId();
  return userId ? `notificationsSeenAt:${userId}` : "";
}

function getNotificationsSeenAt() {
  const key = getNotificationsSeenStorageKey();
  if (!key) return "";

  try {
    return localStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

function setNotificationsSeenAt(value) {
  const key = getNotificationsSeenStorageKey();
  if (!key) return;

  try {
    if (!value) return;
    const existingValue = localStorage.getItem(key) || "";
    const existingTimestamp = existingValue
      ? new Date(existingValue).getTime()
      : 0;
    const nextTimestamp = new Date(value).getTime();

    if (!nextTimestamp) return;
    if (existingTimestamp && nextTimestamp < existingTimestamp) return;

    localStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
}

function getNotificationsClearedStorageKey() {
  const userId = getNotificationStorageUserId();
  return userId ? `notificationsClearedAt:${userId}` : "";
}

function getNotificationsClearedAt() {
  const key = getNotificationsClearedStorageKey();
  if (!key) return "";

  try {
    return localStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

function setNotificationsClearedAt(value) {
  const key = getNotificationsClearedStorageKey();
  if (!key) return;

  try {
    if (value) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error(error);
  }
}

function getNotificationTimestamp(value) {
  const timestamp = new Date(value || "").getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function getLatestNotificationCreatedAt(items = []) {
  const latestItem = [...items].sort(
    (left, right) =>
      getNotificationTimestamp(right?.created_at) -
      getNotificationTimestamp(left?.created_at),
  )[0];

  return String(latestItem?.created_at || "");
}

function getNotificationDedupKey(item) {
  const explicitId = String(item?.id || "").trim();
  if (explicitId) return explicitId;

  return JSON.stringify({
    type: String(item?.type || ""),
    created_at: String(item?.created_at || ""),
    message: String(item?.message || ""),
    postId: String(item?.postId || ""),
    widgetId: String(item?.widgetId || ""),
    openComments: Boolean(item?.openComments),
  });
}

function normalizeNotifications(items = []) {
  const seenKeys = new Set();

  return items
    .filter((item) => item && typeof item === "object")
    .filter((item) => getNotificationTimestamp(item.created_at) > 0)
    .filter((item) => {
      const key = getNotificationDedupKey(item);
      if (!key || seenKeys.has(key)) return false;
      seenKeys.add(key);
      return true;
    })
    .sort((left, right) => {
      const timestampDifference =
        getNotificationTimestamp(right?.created_at) -
        getNotificationTimestamp(left?.created_at);

      if (timestampDifference !== 0) {
        return timestampDifference;
      }

      return getNotificationDedupKey(left).localeCompare(
        getNotificationDedupKey(right),
      );
    });
}

function getVisibleNotifications() {
  const clearedAt = getNotificationsClearedAt();
  const clearedTimestamp = getNotificationTimestamp(clearedAt);

  return notifications.filter((item) => {
    const createdAt = getNotificationTimestamp(item.created_at);
    return !clearedTimestamp || createdAt > clearedTimestamp;
  });
}

function getUnreadNotificationCount(
  visibleNotifications = getVisibleNotifications(),
) {
  const seenAt = getNotificationsSeenAt();
  const seenTimestamp = getNotificationTimestamp(seenAt);

  return visibleNotifications.filter((item) => {
    const createdAt = getNotificationTimestamp(item.created_at);
    return createdAt > seenTimestamp;
  }).length;
}

function ensureNotificationsSeenBaseline() {
  const key = getNotificationsSeenStorageKey();
  if (!key || !notifications.length) return;

  const existingSeenAt = getNotificationsSeenAt();
  if (existingSeenAt) return;

  const latestCreatedAt = notifications[0]?.created_at || "";
  if (latestCreatedAt) {
    setNotificationsSeenAt(latestCreatedAt);
  }
}

function formatNotificationRelativeTime(dateString) {
  const timestamp = getNotificationTimestamp(dateString);
  if (!timestamp) return "";

  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return formatEntryDate(dateString);
}

function getNotificationActorPronoun(profile) {
  return getProfileSubjectPronoun(profile);
}

function getNotificationTypeLabel(notificationOrType) {
  const notification =
    notificationOrType && typeof notificationOrType === "object"
      ? notificationOrType
      : { type: notificationOrType };
  const { type } = notification;

  if (type === "entry") return "entry";
  if (type === "entry_update") return "entry";
  if (type === "reply") return "reply";
  if (type === "comment") return "comment";
  if (type === "post_like") return "like";
  if (type === "comment_like") return "comment like";
  if (type === "widget_comment") return "comment";
  if (type === "widget_like") return "widget like";
  if (type === "miss_you") return `${notification.actorPronoun || "they"} misses you`;
  if (type === "poem") return "poem";
  if (type === "widget_update") return "widget";
  if (type === "sticker") return "sticker";
  return "update";
}

function closeNotificationsPanel() {
  if (!notificationsPanel || !notificationsBtn) return;
  notificationsPanel.hidden = true;
  notificationsBtn.setAttribute("aria-expanded", "false");
}

function markNotificationsRead() {
  const visibleNotifications = getVisibleNotifications();
  if (!visibleNotifications.length) {
    renderNotifications();
    syncWidgetCommentButtons();
    return;
  }

  const latestCreatedAt =
    getLatestNotificationCreatedAt(visibleNotifications) ||
    new Date().toISOString();
  setNotificationsSeenAt(latestCreatedAt);
  renderNotifications();
  syncWidgetCommentButtons();
}

function clearNotifications() {
  const visibleNotifications = getVisibleNotifications();
  if (!visibleNotifications.length) {
    renderNotifications();
    return;
  }

  const latestCreatedAt =
    getLatestNotificationCreatedAt(visibleNotifications) ||
    new Date().toISOString();
  setNotificationsClearedAt(latestCreatedAt);
  setNotificationsSeenAt(latestCreatedAt);
  renderNotifications();
  syncWidgetCommentButtons();
}

function openNotificationsPanel() {
  if (!currentUser || !notificationsPanel || !notificationsBtn) return;
  notificationsPanel.hidden = false;
  notificationsBtn.setAttribute("aria-expanded", "true");
  markNotificationsRead();
}

function focusPost(postId, options = {}) {
  const { openComments = false } = options;
  const target = document.querySelector(`[data-post-id="${postId}"]`);

  if (isTabbedLayoutActive()) {
    setMobileView("timeline", { persist: false });
  }

  const scrollToTarget = () => {
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("post-highlight");
    window.setTimeout(() => target.classList.remove("post-highlight"), 1400);
  };

  if (isTabbedLayoutActive()) {
    requestAnimationFrame(scrollToTarget);
  } else {
    scrollToTarget();
  }

  if (openComments) {
    openCommentsPopup(postId);
  }
}

function focusWidget(widgetId) {
  if (!widgetId) return;

  const target = Array.from(
    document.querySelectorAll(
      ".widget[data-widget-id], .widget[data-widget-source-id]",
    ),
  ).find(
    (widgetEl) =>
      widgetEl.dataset.widgetId === widgetId ||
      widgetEl.dataset.widgetSourceId === widgetId,
  );

  if (!target) return;

  if (isTabbedLayoutActive()) {
    if (leftZone?.contains(target)) {
      setMobileView("left", { persist: false });
    } else if (rightZone?.contains(target)) {
      setMobileView("right", { persist: false });
    }
  }

  const scrollToTarget = () => {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("post-highlight");
    window.setTimeout(() => target.classList.remove("post-highlight"), 1400);
  };

  if (isTabbedLayoutActive()) {
    requestAnimationFrame(scrollToTarget);
  } else {
    scrollToTarget();
  }
}

function renderNotifications() {
  if (!notificationsList || !notificationsBtn || !notificationsBadge) {
    return;
  }

  const visibleNotifications = getVisibleNotifications();
  const seenAt = getNotificationsSeenAt();
  const seenTimestamp = getNotificationTimestamp(seenAt);
  const unreadCount = getUnreadNotificationCount(visibleNotifications);

  notificationsBadge.hidden = unreadCount === 0;
  notificationsBadge.textContent =
    unreadCount > 99 ? "99+" : String(unreadCount);

  if (!visibleNotifications.length) {
    notificationsList.innerHTML = `<div class="notification-empty">no little updates yet ♡</div>`;
    return;
  }

  notificationsList.innerHTML = visibleNotifications
    .map((item) => {
      const createdAt = getNotificationTimestamp(item.created_at);
      const isUnread = createdAt > seenTimestamp;

      return `
        <button
          class="notification-item${isUnread ? " is-unread" : ""}"
          type="button"
          data-notification-post-id="${item.postId || ""}"
          data-notification-widget-id="${item.widgetId || ""}"
          data-notification-open-comments="${item.openComments ? "true" : "false"}"
        >
          <div class="notification-topline">
            <span class="notification-type">${getNotificationTypeLabel(item)}</span>
            <span class="notification-time">${formatNotificationRelativeTime(item.created_at)}</span>
          </div>
          <div class="notification-message">${escapeHtml(item.message)}</div>
        </button>
      `;
    })
    .join("");

  notificationsList.querySelectorAll(".notification-item").forEach((button) => {
    button.addEventListener("click", () => {
      const postId = button.dataset.notificationPostId;
      const widgetId = button.dataset.notificationWidgetId;
      const openComments = button.dataset.notificationOpenComments === "true";

      closeNotificationsPanel();

      if (postId) {
        focusPost(postId, { openComments });
      } else if (widgetId) {
        if (openComments) {
          openWidgetComments(widgetId);
        } else {
          focusWidget(widgetId);
        }
      }
    });
  });
}

function getWidgetNotificationName(widget) {
  const normalizedId = String(widget?.id || "")
    .toLowerCase()
    .trim();
  const normalizedTitle = String(widget?.title || "").toLowerCase();
  if (normalizedId === "song") return "now playing";
  if (
    normalizedId === "note" ||
    normalizedTitle.includes("little note") ||
    normalizedTitle.includes("smol note")
  )
    return "smol note";
  if (normalizedId === "entry-preview") return "TOTO’S POEMS";
  if (normalizedId === "dates" || normalizedTitle.includes("important dates"))
    return "important dates";
  if (normalizedId === "wishlist" || normalizedTitle.includes("wishlist"))
    return "wishlist";
  if (
    normalizedId.startsWith("photo-pin") ||
    normalizedTitle.includes("pin it")
  )
    return "pinned photo";
  return String(widget?.title || "a widget").trim() || "a widget";
}

function getWidgetDataForNotifications(widget) {
  return widget?.data &&
    typeof widget.data === "object" &&
    !Array.isArray(widget.data)
    ? widget.data
    : {};
}

function markWidgetContentUpdated(widget) {
  const actorId = currentProfile?.id || currentUser?.id || "";
  if (!widget || !actorId) return;

  widget.data = {
    ...getWidgetDataForNotifications(widget),
    lastUpdatedBy: actorId,
    lastUpdatedAt: new Date().toISOString(),
  };
}

function getPoemWidgetNotificationMessage(actorName, widgetData) {
  const action = String(widgetData?.lastPoemAction || "").trim();
  const title = String(widgetData?.lastPoemTitle || "").trim();
  const titleText = title ? `: ${title}` : "";

  if (action === "added") return `${actorName} added a new poem${titleText}`;
  if (action === "deleted") return `${actorName} deleted a poem${titleText}`;
  if (action === "edited") return `${actorName} edited a poem${titleText}`;
  return `${actorName} updated TOTO’S POEMS`;
}

function getWidgetUpdateNotificationType(widget) {
  return widget?.id === "entry-preview"
    ? "poem"
    : widget?.id === "miss-you"
      ? "miss_you"
      : "widget_update";
}

function getWidgetUpdateNotificationMessage(widget, actorName, widgetData) {
  if (widget?.id === "entry-preview") {
    return getPoemWidgetNotificationMessage(actorName, widgetData);
  }

  if (widget?.id === "miss-you") {
    return `${actorName} missed you sooo many`;
  }

  return `${actorName} updated ${getWidgetNotificationName(widget)}`;
}

function buildNotifications({
  postsData = [],
  commentsData = [],
  likesData = [],
  stickersData = [],
  widgetsData = widgets,
  profilesData = [],
  render = true,
}) {
  if (!currentProfile?.id) {
    notifications = [];
    if (render) {
      renderNotifications();
    }
    return;
  }

  const myUserId = currentProfile.id;
  const postById = new Map(postsData.map((post) => [post.id, post]));
  const commentById = new Map(
    commentsData.map((comment) => [comment.id, comment]),
  );
  const profileById = new Map(
    profilesData.map((profile) => [profile.id, profile]),
  );
  const ownPostIds = new Set(
    postsData
      .filter((post) => post.user_id === myUserId)
      .map((post) => post.id),
  );
  const ownCommentIds = new Set(
    commentsData
      .filter((comment) => comment.user_id === myUserId)
      .map((comment) => comment.id),
  );
  const nextNotifications = [];

  postsData.forEach((post) => {
    if (!post.created_at || post.user_id === myUserId) return;

    const actorProfile = profileById.get(post.user_id);
    const actorName =
      post.profiles?.nickname ||
      post.profiles?.username ||
      actorProfile?.nickname ||
      actorProfile?.username ||
      "someone";

    nextNotifications.push({
      id: `entry:${post.id}`,
      type: "entry",
      created_at: post.created_at,
      postId: post.id,
      openComments: false,
      message: `${actorName} posted a new entry`,
    });

    const createdAt = getNotificationTimestamp(post.created_at);
    const updatedAt = getNotificationTimestamp(post.updated_at);
    if (updatedAt && createdAt && updatedAt - createdAt > 1000) {
      nextNotifications.push({
        id: `entry-update:${post.id}:${post.updated_at}`,
        type: "entry_update",
        created_at: post.updated_at,
        postId: post.id,
        openComments: false,
        message: `${actorName} updated an entry`,
      });
    }
  });

  commentsData.forEach((comment) => {
    if (!comment.created_at || comment.user_id === myUserId) return;

    const actorProfile = profileById.get(comment.user_id);
    const actorName =
      comment.profiles?.nickname ||
      comment.profiles?.username ||
      actorProfile?.nickname ||
      actorProfile?.username ||
      "someone";
    const parentComment = comment.parent_comment_id
      ? commentById.get(comment.parent_comment_id)
      : null;
    const post = postById.get(comment.post_id);

    if (parentComment?.user_id === myUserId) {
      nextNotifications.push({
        id: `reply:${comment.id}`,
        type: "reply",
        created_at: comment.created_at,
        postId: comment.post_id,
        openComments: true,
        message: `${actorName} replied to your comment`,
      });
      return;
    }

    if (post?.user_id === myUserId) {
      nextNotifications.push({
        id: `comment:${comment.id}`,
        type: "comment",
        created_at: comment.created_at,
        postId: comment.post_id,
        openComments: true,
        message: `${actorName} commented on your entry`,
      });
    }
  });

  likesData.forEach((like) => {
    if (!like.created_at || like.user_id === myUserId) return;

    const actorProfile = profileById.get(like.user_id);
    const actorName =
      actorProfile?.nickname || actorProfile?.username || "someone";

    if (like.post_id && ownPostIds.has(like.post_id)) {
      nextNotifications.push({
        id: `post-like:${like.id}`,
        type: "post_like",
        created_at: like.created_at,
        postId: like.post_id,
        openComments: false,
        message: `${actorName} liked your entry`,
      });
      return;
    }

    if (like.comment_id && ownCommentIds.has(like.comment_id)) {
      const comment = commentById.get(like.comment_id);
      nextNotifications.push({
        id: `comment-like:${like.id}`,
        type: "comment_like",
        created_at: like.created_at,
        postId: comment?.post_id || "",
        openComments: Boolean(comment?.post_id),
        message: `${actorName} liked your comment`,
      });
    }
  });

  stickersData.forEach((sticker) => {
    if (
      !sticker.created_at ||
      sticker.user_id === myUserId ||
      !ownPostIds.has(sticker.post_id)
    )
      return;

    const actorProfile = profileById.get(sticker.user_id);
    const actorName =
      actorProfile?.nickname || actorProfile?.username || "someone";
    nextNotifications.push({
      id: `sticker:${sticker.id}`,
      type: "sticker",
      created_at: sticker.created_at,
      postId: sticker.post_id,
      openComments: false,
      message: isGifSticker(sticker.emoji)
        ? `${actorName} added a gif sticker to your entry`
        : `${actorName} added ${sticker.emoji} to your entry`,
    });
  });

  (widgetsData || []).forEach((widget) => {
    const widgetName = getWidgetNotificationName(widget);
    const widgetData = getWidgetDataForNotifications(widget);
    const updatedBy = widgetData.lastUpdatedBy || "";
    const lastUpdatedAt = widgetData.lastUpdatedAt || "";

    if (updatedBy && updatedBy !== myUserId && lastUpdatedAt) {
      const actorProfile = profileById.get(updatedBy);
      const actorName =
        actorProfile?.nickname || actorProfile?.username || "someone";

      nextNotifications.push({
        id: `widget-update:${widget.id}:${lastUpdatedAt}`,
        type: getWidgetUpdateNotificationType(widget),
        actorPronoun: getNotificationActorPronoun(actorProfile),
        created_at: lastUpdatedAt,
        widgetId: widget.id,
        openComments: false,
        message: getWidgetUpdateNotificationMessage(
          widget,
          actorName,
          widgetData,
        ),
      });
    }

    if (Array.isArray(widgetData.comments)) {
      widgetData.comments.forEach((comment) => {
        const actorId = String(comment?.userId || comment?.user_id || "");
        const createdAt = String(
          comment?.createdAt || comment?.created_at || "",
        );

        if (!actorId || actorId === myUserId || !createdAt) return;

        const actorProfile = profileById.get(actorId);
        const actorName =
          comment?.actorName ||
          actorProfile?.nickname ||
          actorProfile?.username ||
          "someone";
        const commentId = String(comment?.id || createdAt);

        nextNotifications.push({
          id: `widget-comment:${widget.id}:${commentId}:${actorId}`,
          type: "widget_comment",
          created_at: createdAt,
          widgetId: widget.id,
          openComments: true,
          message: `${actorName} commented on ${widgetName}`,
        });
      });
    }

    if (!isLikeableWidget(widget)) return;

    normalizeWidgetLikesData(widget);
    const likeTimestamps = getWidgetLikeTimestamps(widget);

    getWidgetLikeUserIds(widget).forEach((userId) => {
      if (!userId || userId === myUserId) return;

      const createdAt = likeTimestamps[userId] || "";
      if (!createdAt) return;

      const actorProfile = profileById.get(userId);
      const actorName =
        actorProfile?.nickname || actorProfile?.username || "someone";

      nextNotifications.push({
        id: `widget-like:${widget.id}:${userId}`,
        type: "widget_like",
        created_at: createdAt,
        widgetId: widget.id,
        openComments: false,
        message: `${actorName} liked ${widgetName}`,
      });
    });
  });

  notifications = normalizeNotifications(nextNotifications);
  ensureNotificationsSeenBaseline();

  if (render) {
    renderNotifications();
  }
}

function refreshNotificationsFromCurrentData(render = true) {
  buildNotifications({
    ...notificationSourceData,
    widgetsData: widgets,
    render,
  });
}

function isVisualInteractionActive() {
  return Boolean(
    dragWidget ||
      pendingWidgetDrag ||
      draggingPlacedSticker ||
      document.body.classList.contains("dragging-widget") ||
      document.body.classList.contains("sticker-dragging") ||
      authPopup?.classList.contains("open") ||
      profilePopup?.classList.contains("open") ||
      entryPopup?.classList.contains("open") ||
      widgetPopup?.classList.contains("open") ||
      widgetCommentsPopup?.classList.contains("open") ||
      commentsPopup?.classList.contains("open") ||
      stickerPopup?.classList.contains("open") ||
      entryPreviewPopup?.classList.contains("open") ||
      deleteEntryPopup?.classList.contains("open") ||
      pendingPostLikeIds.size > 0 ||
      pendingWidgetLikeIds.size > 0 ||
      entrySaveInFlight ||
      commentSaveInFlight ||
      widgetSaveInFlight ||
      profileSaveInFlight,
  );
}

function getRealtimeActorUserId(table, payload = {}) {
  const newRow = payload.new || {};
  const oldRow = payload.old || {};

  if (table === "profiles") {
    return String(newRow.id || oldRow.id || "");
  }

  if (table === "widgets") {
    const data = newRow.data && typeof newRow.data === "object" ? newRow.data : {};
    return String(data.lastUpdatedBy || data.updatedBy || "");
  }

  return String(newRow.user_id || oldRow.user_id || "");
}

function markLocalRealtimeTable(table) {
  recentLocalRealtimeTables.set(table, Date.now() + 4000);
}

function isOwnRealtimeEcho(table, payload = {}) {
  const myUserId = currentUser?.id || currentProfile?.id || "";
  if (!myUserId) return false;

  if (table === "widgets") {
    const row = payload.new || payload.old || {};
    const pendingUpdatedAt = pendingLocalWidgetUpdates.get(row.id);
    return Boolean(
      pendingUpdatedAt && String(row.updated_at || "") === pendingUpdatedAt,
    );
  }

  const localEchoUntil = recentLocalRealtimeTables.get(table) || 0;
  if (localEchoUntil > Date.now()) {
    return true;
  }

  return getRealtimeActorUserId(table, payload) === myUserId;
}

function handleProfileRealtimeChange(payload = {}) {
  const incomingProfile = payload.new || payload.old || {};
  if (!incomingProfile?.id) return;

  upsertKnownProfile(incomingProfile);

  if (currentProfile?.id === incomingProfile.id) {
    currentProfile = mergeProfileRecords(currentProfile, incomingProfile);
  }

  applyProfileToTimeline(getKnownProfileById(incomingProfile.id, incomingProfile));

  if (
    profilePopup?.classList.contains("open") &&
    activeProfilePopupUserId === incomingProfile.id
  ) {
    renderProfilePopup(getKnownProfileById(incomingProfile.id));
  }
}

function handleRealtimeChange(table, payload = {}) {
  if (isOwnRealtimeEcho(table, payload)) {
    return;
  }

  if (table === "profiles") {
    handleProfileRealtimeChange(payload);
    return;
  }

  if (
    table === "widgets" &&
    String(payload.new?.id || payload.old?.id || "") === PROFILE_BIO_WIDGET_ID
  ) {
    void loadSharedProfileBios({ force: true }).then(() => {
      if (profilePopup?.classList.contains("open") && activeProfilePopupUserId) {
        renderProfilePopup(getKnownProfileById(activeProfilePopupUserId));
      }
    });
    return;
  }

  if (isVisualInteractionActive()) {
    scheduleLiveDataRefresh({
      includeWidgets: table === "widgets",
      debounceMs: 1200,
    });
    return;
  }

  scheduleLiveDataRefresh({ includeWidgets: table === "widgets" });
}

function scheduleLiveDataRefresh(options = {}) {
  if (!currentUser) return;
  if (document.visibilityState === "hidden" && !options.allowHidden) return;

  if (!options.force && isVisualInteractionActive()) {
    liveRefreshIncludeWidgets =
      liveRefreshIncludeWidgets || Boolean(options.includeWidgets);
    if (liveRefreshTimer) {
      window.clearTimeout(liveRefreshTimer);
    }
    liveRefreshTimer = window.setTimeout(
      runScheduledLiveDataRefresh,
      Number.isFinite(options.debounceMs) ? options.debounceMs : 1200,
    );
    return;
  }

  liveRefreshIncludeWidgets =
    liveRefreshIncludeWidgets || Boolean(options.includeWidgets);

  if (liveRefreshTimer) {
    window.clearTimeout(liveRefreshTimer);
  }

  liveRefreshTimer = window.setTimeout(
    runScheduledLiveDataRefresh,
    Number.isFinite(options.debounceMs)
      ? options.debounceMs
      : LIVE_REFRESH_DEBOUNCE_MS,
  );
}

async function runScheduledLiveDataRefresh() {
  liveRefreshTimer = 0;

  if (!currentUser) return;

  if (isVisualInteractionActive()) {
    scheduleLiveDataRefresh({
      includeWidgets: liveRefreshIncludeWidgets,
      debounceMs: 1200,
    });
    return;
  }

  if (liveRefreshInFlight) {
    liveRefreshQueued = true;
    return;
  }

  const includeWidgets = liveRefreshIncludeWidgets;
  liveRefreshIncludeWidgets = false;
  liveRefreshInFlight = true;

  try {
    await refreshUserData({ includeWidgets });
  } catch (error) {
    console.error(error);
  } finally {
    liveRefreshInFlight = false;

    if (liveRefreshQueued || liveRefreshIncludeWidgets) {
      const queuedIncludeWidgets = liveRefreshIncludeWidgets;
      liveRefreshQueued = false;
      liveRefreshIncludeWidgets = false;
      scheduleLiveDataRefresh({
        includeWidgets: queuedIncludeWidgets,
        debounceMs: LIVE_REFRESH_DEBOUNCE_MS,
      });
    }
  }
}

function stopLiveUpdates() {
  if (liveRefreshTimer) {
    window.clearTimeout(liveRefreshTimer);
    liveRefreshTimer = 0;
  }

  liveRefreshQueued = false;
  liveRefreshIncludeWidgets = false;

  if (liveUpdatesChannel) {
    if (typeof supabaseClient.removeChannel === "function") {
      void supabaseClient.removeChannel(liveUpdatesChannel);
    } else {
      void liveUpdatesChannel.unsubscribe?.();
    }
    liveUpdatesChannel = null;
  }
}

function startLiveUpdates() {
  stopLiveUpdates();

  if (!currentUser || typeof supabaseClient.channel !== "function") return;

  const channel = supabaseClient.channel(`our-memories-live:${currentUser.id}`);
  ["posts", "comments", "likes", "post_stickers", "profiles"].forEach((table) => {
    channel.on(
      "postgres_changes",
      { event: "*", schema: "public", table },
      (payload) => handleRealtimeChange(table, payload),
    );
  });
  channel.on(
    "postgres_changes",
    { event: "*", schema: "public", table: "widgets" },
    (payload) => handleRealtimeChange("widgets", payload),
  );

  liveUpdatesChannel = channel;
  channel.subscribe();
}

function syncPopupScrollLock() {
  const hasOpenPopup = Boolean(document.querySelector(".popup.open"));

  if (hasOpenPopup) {
    if (!document.body.classList.contains("popup-scroll-locked")) {
      popupScrollLockTop = window.scrollY || window.pageYOffset || 0;
      popupScrollLockLeft = window.scrollX || window.pageXOffset || 0;
      popupScrollLockBodyStyles = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        right: document.body.style.right,
        width: document.body.style.width,
      };
      document.documentElement.classList.add("popup-scroll-locked");
      document.body.classList.add("popup-scroll-locked");
      document.body.style.position = "fixed";
      document.body.style.top = `-${popupScrollLockTop}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      lastScrollY = popupScrollLockTop;
    }
    return;
  }

  if (!document.body.classList.contains("popup-scroll-locked")) {
    return;
  }

  const restoredScrollTop = popupScrollLockTop;
  const restoredScrollLeft = popupScrollLockLeft;

  document.documentElement.classList.remove("popup-scroll-locked");
  document.body.classList.remove("popup-scroll-locked");
  if (popupScrollLockBodyStyles) {
    document.body.style.position = popupScrollLockBodyStyles.position;
    document.body.style.top = popupScrollLockBodyStyles.top;
    document.body.style.left = popupScrollLockBodyStyles.left;
    document.body.style.right = popupScrollLockBodyStyles.right;
    document.body.style.width = popupScrollLockBodyStyles.width;
  }
  popupScrollLockBodyStyles = null;
  popupScrollLockTop = 0;
  popupScrollLockLeft = 0;
  window.scrollTo({
    left: restoredScrollLeft,
    top: restoredScrollTop,
    behavior: "auto",
  });
  lastScrollY = restoredScrollTop;
}

let popupPointerStartedInsideCard = false;

document.querySelectorAll(".popup-card").forEach((card) => {
  ["click", "mousedown", "pointerdown"].forEach((eventName) => {
    card.addEventListener(eventName, (event) => {
      if (eventName === "mousedown" || eventName === "pointerdown") {
        popupPointerStartedInsideCard = true;
      }
      event.stopPropagation();
    });
  });
});

document.querySelectorAll(".popup").forEach((popupEl) => {
  const observer = new MutationObserver(() => {
    syncPopupScrollLock();
  });

  observer.observe(popupEl, {
    attributes: true,
    attributeFilter: ["class"],
  });
});

syncPopupScrollLock();

window.addEventListener("pointerup", () => {
  requestAnimationFrame(() => {
    popupPointerStartedInsideCard = false;
  });
});

window.addEventListener("mouseup", () => {
  requestAnimationFrame(() => {
    popupPointerStartedInsideCard = false;
  });
});

async function getCurrentUser() {
  if (currentUser) return currentUser;

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  currentUser = user || null;
  if (currentUser) {
    void loadSharedProfileBios();
  }
  return currentUser;
}

async function refreshUserData(options = {}) {
  const {
    includeWidgets = false,
    preserveScroll = true,
    showSkeleton = false,
  } = options;

  if (showSkeleton) {
    renderAppSkeleton({
      timeline: true,
      widgets: includeWidgets,
      notifications: true,
    });
  }

  if (!showSkeleton) {
    renderNotifications();
  }

  const tasks = [loadPosts({ render: false, showSkeleton: false })];

  if (includeWidgets) {
    tasks.push(loadWidgets({ render: false, showSkeleton: false }));
  }

  await Promise.all(tasks);
  const scrollSnapshot = preserveScroll ? getViewportScrollSnapshot() : null;
  renderTimeline();
  renderNotifications();
  if (includeWidgets) {
    renderWidgets({ animateMobileReorder: false });
    void refreshWeatherWidget({ render: true });
  }
  restoreViewportScroll(scrollSnapshot);
}

profileBtn.addEventListener("click", () => {
  void openProfilePopupForUser(currentProfile?.id || currentUser?.id || "");
});

closeProfilePopup.addEventListener("click", () => {
  closeProfileDetailsPopup();
});

if (editProfileBtn) {
  editProfileBtn.addEventListener("click", () => {
    setProfilePopupEditMode(true);
  });
}

if (cancelProfileEditBtn) {
  cancelProfileEditBtn.addEventListener("click", () => {
    renderProfilePopup(getKnownProfileById(activeProfilePopupUserId), {
      startEditing: false,
    });
  });
}

profilePopup.addEventListener("click", (event) => {
  if (event.target === profilePopup && !popupPointerStartedInsideCard) {
    closeProfileDetailsPopup();
  }
});

async function ensureProfile(user, fallbackNickname = "") {
  const { data: existing, error: selectError } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (selectError) {
    console.error(selectError);
    return null;
  }

  if (existing) return existing;

  const usernameBase = user.email
    ? user.email.split("@")[0]
    : `user-${user.id.slice(0, 6)}`;

  const { data: created, error: insertError } = await supabaseClient
    .from("profiles")
    .insert({
      id: user.id,
      username: usernameBase,
      nickname: fallbackNickname || usernameBase,
      avatar_url: null,
    })
    .select()
    .single();

  if (insertError) {
    console.error(insertError);
    return null;
  }

  return created;
}

async function loadProfile(user) {
  await loadSharedProfileBios();

  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  currentProfile = data;

  if (currentProfile) {
    if (!Object.prototype.hasOwnProperty.call(currentProfile, "bio")) {
      const fallbackBio =
        getProfileBioFromAuthUser(user) ?? getStoredProfileBio(user.id);
      currentProfile = {
        ...currentProfile,
        bio: fallbackBio || "",
      };
    }
    upsertKnownProfile(currentProfile);
    nicknameInput.value = currentProfile.nickname || "";
    const profileBio = getProfileBio(currentProfile, user.id, user);
    if (bioInput) {
      bioInput.value = profileBio;
    }
    if (profileBio && getSharedProfileBio(user.id) !== profileBio) {
      void saveSharedProfileBio(user.id, profileBio);
    }
  }

  return currentProfile;
}

async function loadPlacedStickers() {
  const { data, error } = await supabaseClient
    .from("post_stickers")
    .select("id, post_id, user_id, emoji, x, y");

  if (error) {
    console.error(error);
    showMessage(error.message);
    return;
  }

  const stickerRows = data || [];
  const seenStickerKeys = new Map();
  const duplicateStickerIds = [];

  stickerRows.forEach((row) => {
    const key = [row.post_id, row.user_id, row.emoji, row.x, row.y].join("::");

    if (seenStickerKeys.has(key)) {
      duplicateStickerIds.push(row.id);
      return;
    }

    seenStickerKeys.set(key, row.id);
  });

  if (duplicateStickerIds.length) {
    const { error: cleanupError } = await supabaseClient
      .from("post_stickers")
      .delete()
      .in("id", duplicateStickerIds);

    if (cleanupError) {
      console.error(cleanupError);
      showMessage(cleanupError.message);
      return;
    }
  }

  const uniqueStickerRows = stickerRows.filter(
    (row) => !duplicateStickerIds.includes(row.id),
  );

  placedStickers = uniqueStickerRows.map((row) => {
    const savedPosition = getSavedPlacedStickerPosition(row.id);

    return {
      id: row.id,
      postId: row.post_id,
      userId: row.user_id,
      sticker: row.emoji,
      x: savedPosition?.x ?? row.x,
      y: savedPosition?.y ?? row.y,
    };
  });

  renderPlacedStickers();

  if (duplicateStickerIds.length) {
    showMessage("cleaned up duplicate stickers ♡");
  }
}

async function deletePlacedSticker(stickerId) {
  const removedSticker = placedStickers.find((item) => item.id === stickerId);
  placedStickers = placedStickers.filter((item) => item.id !== stickerId);
  clearPlacedGifSize(stickerId);
  clearPlacedStickerPosition(stickerId);
  renderPlacedStickers();

  const { error } = await supabaseClient
    .from("post_stickers")
    .delete()
    .eq("id", stickerId);

  if (error) {
    console.error(error);
    showMessage(error.message);
    if (removedSticker) {
      placedStickers.push(removedSticker);
      renderPlacedStickers();
    }
    return;
  }

  markLocalRealtimeTable("post_stickers");
  showMessage("sticker removed ♡");
}

async function updatePlacedStickerPosition(stickerId, x, y) {
  const user = await getCurrentUser();

  if (!user) {
    showMessage("please log in first ♡");
    return false;
  }

  const nextX = clampStickerPercent(x);
  const nextY = clampStickerPercent(y);
  const localSticker = placedStickers.find((item) => item.id === stickerId);
  const updatePayload = {
    x: nextX,
    y: nextY,
  };

  savePlacedStickerPosition(stickerId, nextX, nextY);
  if (localSticker) {
    localSticker.x = nextX;
    localSticker.y = nextY;
  }

  let updateQuery = supabaseClient
    .from("post_stickers")
    .update(updatePayload)
    .eq("id", stickerId);

  if (localSticker?.userId) {
    updateQuery = updateQuery.eq("user_id", localSticker.userId);
  } else {
    updateQuery = updateQuery.eq("user_id", user.id);
  }

  let { data: updatedSticker, error } = await updateQuery
    .select("id")
    .maybeSingle();

  if (error) {
    console.error(error);
    showMessage(error.message);
    showMessage("position saved on this device ♡");
    return true;
  }

  if (
    !updatedSticker ||
    !localSticker?.userId ||
    localSticker.userId !== user.id
  ) {
    const fallbackResult = await supabaseClient
      .from("post_stickers")
      .update(updatePayload)
      .eq("id", stickerId)
      .select("id")
      .maybeSingle();

    if (fallbackResult.error) {
      console.error(fallbackResult.error);
      showMessage(fallbackResult.error.message);
      showMessage("position saved on this device ♡");
      return true;
    }

    updatedSticker = fallbackResult.data;
  }

  if (!updatedSticker) {
    showMessage("position saved on this device ♡");
    return true;
  }

  if (localSticker) {
    localSticker.x = nextX;
    localSticker.y = nextY;
  }

  clearPlacedStickerPosition(stickerId);
  return true;
}

async function signUpUser() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const { count, error: countError } = await supabaseClient
    .from("profiles")
    .select("*", { count: "exact", head: true });

  if (countError) {
    console.error(countError);
    showMessage(countError.message);
    return;
  }

  if ((count || 0) >= 2) {
    showMessage("only me and you are allowed here ♡");
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    showMessage(error.message);
    return;
  }

  if (data.user) {
    currentUser = data.user;
    setToolbarAuthState("checking");
    authPopup.classList.remove("open");
    renderAppSkeleton();
    await ensureProfile(data.user);
    await loadProfile(data.user);
    await refreshUserData({ includeWidgets: true, showSkeleton: true });
    setCurrentUser(data.user);
  }

  showMessage("account created ♡");
  authPopup.classList.remove("open");
}

async function loginUser() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    showMessage(error.message);
    return;
  }

  if (data.user) {
    currentUser = data.user;
    setToolbarAuthState("checking");
    authPopup.classList.remove("open");
    renderAppSkeleton();
    await loadProfile(data.user);
    await refreshUserData({ includeWidgets: true, showSkeleton: true });
    setCurrentUser(data.user);
  }

  showMessage("hi again hehe ♡");
  authPopup.classList.remove("open");
}

function setPasswordVisibility(isVisible) {
  if (!passwordInput || !passwordToggleBtn) return;

  passwordInput.type = isVisible ? "text" : "password";
  passwordToggleBtn.innerHTML = `<span class="password-toggle-icon" aria-hidden="true">${isVisible ? "◌" : "◉"}</span>`;
  passwordToggleBtn.setAttribute(
    "aria-label",
    isVisible ? "hide password" : "show password",
  );
  passwordToggleBtn.setAttribute("aria-pressed", String(isVisible));
}

async function updateCurrentUserProfile(profileUpdates = {}) {
  const user = await getCurrentUser();

  if (!user) {
    showMessage("please log in first ♡");
    return null;
  }

  const loadedProfile = currentProfile || (await loadProfile(user));
  if (!loadedProfile?.id) {
    showMessage("could not find your profile ♡");
    return null;
  }

  const nextProfilePayload = {
    username: loadedProfile.username,
    nickname: loadedProfile.nickname,
    avatar_url: loadedProfile.avatar_url || null,
    ...profileUpdates,
  };
  const hasBioUpdate = Object.prototype.hasOwnProperty.call(
    profileUpdates,
    "bio",
  );

  let { data: savedProfile, error } = await supabaseClient
    .from("profiles")
    .update(nextProfilePayload)
    .eq("id", user.id)
    .select()
    .single();

  if (
    error &&
    Object.prototype.hasOwnProperty.call(nextProfilePayload, "bio") &&
    String(error.message || "").toLowerCase().includes("bio")
  ) {
    profileBioColumnSupported = false;
    const { bio, ...fallbackPayload } = nextProfilePayload;
    const fallbackResult = await supabaseClient
      .from("profiles")
      .update(fallbackPayload)
      .eq("id", user.id)
      .select()
      .single();

    savedProfile = fallbackResult.data;
    error = fallbackResult.error;

    if (!error && savedProfile) {
      savedProfile = {
        ...savedProfile,
        bio: String(nextProfilePayload.bio || ""),
      };
    }
  }

  if (error) {
    console.error(error);
    showMessage(error.message);
    return null;
  }

  if (hasBioUpdate && profileBioColumnSupported !== false) {
    profileBioColumnSupported = true;
  }

  if (hasBioUpdate) {
    await persistProfileBioBackup(user, nextProfilePayload.bio);
    const sharedBioSaved = await saveSharedProfileBio(
      user.id,
      nextProfilePayload.bio,
    );
    if (!sharedBioSaved && profileBioColumnSupported === false) {
      showMessage("bio saved here, but could not sync it for both profiles ♡");
    }
    savedProfile = {
      ...savedProfile,
      bio: String(nextProfilePayload.bio || ""),
    };
  }

  currentProfile = savedProfile;
  nicknameInput.value = currentProfile.nickname || "";
  if (bioInput) {
    bioInput.value = getProfileBio(currentProfile, user.id, currentUser || user);
  }
  upsertKnownProfile(currentProfile);

  return savedProfile;
}

async function uploadProfileAvatarFile(userId, file) {
  const filePath = `${userId}/${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabaseClient.storage
    .from("profile-pictures")
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabaseClient.storage
    .from("profile-pictures")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

async function saveProfile() {
  if (profileSaveInFlight) return;
  profileSaveInFlight = true;
  if (saveProfileBtn) saveProfileBtn.disabled = true;

  try {
  const nickname = nicknameInput.value.trim();
  const bio = String(bioInput?.value || "").trim();
  const file = pfpInput.files[0];

  const user = await getCurrentUser();

  if (!user) {
    showMessage("please log in first ♡");
    return;
  }

  let avatarUrl = currentProfile?.avatar_url || null;

  if (file) {
    try {
      avatarUrl = await uploadProfileAvatarFile(user.id, file);
    } catch (uploadError) {
      showMessage(uploadError.message);
      return;
    }
  }

  const usernameBase = user.email
    ? user.email.split("@")[0]
    : `user-${user.id.slice(0, 6)}`;

  const finalNickname = nickname || currentProfile?.nickname || usernameBase;

  const savedProfile = await updateCurrentUserProfile({
    username: currentProfile?.username || usernameBase,
    nickname: finalNickname,
    avatar_url: avatarUrl,
    bio,
  });

  if (!savedProfile) {
    return;
  }

  posts = posts.map((post) =>
    post.userId === user.id
      ? {
          ...post,
          nickname: currentProfile.nickname,
          avatarUrl: currentProfile.avatar_url || "",
        }
      : post,
  );

  applyProfileToTimeline(currentProfile);
  pfpInput.value = "";
  renderProfilePopup(savedProfile, { startEditing: false });

  showMessage("updated! <3");
  } finally {
    profileSaveInFlight = false;
    if (saveProfileBtn) saveProfileBtn.disabled = false;
  }
}

async function saveInlinePostDisplayName(nextNickname) {
  const user = await getCurrentUser();

  if (!user) {
    showMessage("please log in first ♡");
    return;
  }

  const trimmedNickname = String(nextNickname || "").trim();
  if (!trimmedNickname) {
    showMessage("name can't be empty ♡");
    return;
  }

  const usernameBase = user.email
    ? user.email.split("@")[0]
    : `user-${user.id.slice(0, 6)}`;

  const savedProfile = await updateCurrentUserProfile({
    username: currentProfile?.username || usernameBase,
    nickname: trimmedNickname,
    avatar_url: currentProfile?.avatar_url || null,
  });

  if (!savedProfile) {
    return;
  }

  updateCurrentUserHistoryActorNames(trimmedNickname);
  await Promise.all(
    widgets
      .filter(
        (widget) =>
          Array.isArray(widget?.data?.history) ||
          Array.isArray(widget?.data?.photoHistory),
      )
      .map((widget) =>
        saveWidgetToSupabase(widget, {
          recordHistory: false,
          notifyUpdate: false,
          suppressErrorMessage: true,
        }),
      ),
  );
  showMessage("name updated ♡");
  applyProfileToTimeline(savedProfile);
}

async function saveInlinePostAvatar(file) {
  const user = await getCurrentUser();

  if (!user) {
    showMessage("please log in first ♡");
    return;
  }

  let avatarUrl = currentProfile?.avatar_url || null;

  try {
    avatarUrl = await uploadProfileAvatarFile(user.id, file);
  } catch (uploadError) {
    console.error(uploadError);
    showMessage(uploadError.message);
    return;
  }

  const usernameBase = user.email
    ? user.email.split("@")[0]
    : `user-${user.id.slice(0, 6)}`;

  const savedProfile = await updateCurrentUserProfile({
    username: currentProfile?.username || usernameBase,
    nickname: currentProfile?.nickname || usernameBase,
    avatar_url: avatarUrl,
  });

  if (!savedProfile) {
    return;
  }

  posts = posts.map((post) =>
    post.userId === user.id
      ? {
          ...post,
          avatarUrl: savedProfile.avatar_url || "",
        }
      : post,
  );

  applyProfileToTimeline(savedProfile);
  pfpInput.value = "";
  showMessage("avatar updated ♡");
}

function getPostsTimelineSelect(includeUpdatedAt = true) {
  return `
        id,
        content,
        created_at,
        ${includeUpdatedAt ? "updated_at," : ""}
        user_id,
        profiles (
          nickname,
          avatar_url,
          username
        )
      `;
}

async function fetchPostsForTimeline() {
  const queryPosts = (includeUpdatedAt = true) =>
    supabaseClient
      .from("posts")
      .select(getPostsTimelineSelect(includeUpdatedAt))
      .order("created_at", { ascending: false });

  const result = await queryPosts(true);

  if (
    !result.error ||
    !String(result.error.message || "")
      .toLowerCase()
      .includes("updated_at")
  ) {
    return result;
  }

  return queryPosts(false);
}

function isPostEditedFromTimestamps(post) {
  const createdAt = new Date(post?.created_at || "").getTime();
  const updatedAt = new Date(post?.updated_at || "").getTime();

  return Number.isFinite(createdAt) && Number.isFinite(updatedAt)
    ? updatedAt - createdAt > 1000
    : false;
}

async function loadPosts(options = {}) {
  const { render = true, showSkeleton = render } = options;
  if (showSkeleton) {
    renderTimelineSkeleton();
  }

  const editedPostIds = new Set(getEditedPostIds());
  const [
    { data: postsData, error: postsError },
    { data: commentsData, error: commentsError },
    { data: stickersData, error: stickersError },
    likesResult,
    { data: profilesData, error: profilesError },
  ] = await Promise.all([
    fetchPostsForTimeline(),
    supabaseClient
      .from("comments")
      .select(
        `
        id,
        post_id,
        user_id,
        content,
        created_at,
        parent_comment_id,
        profiles (
          nickname,
          username
        )
      `,
      )
      .order("created_at", { ascending: true }),
    supabaseClient
      .from("post_stickers")
      .select("id, post_id, user_id, emoji, x, y, created_at"),
    supabaseClient
      .from("likes")
      .select("id, post_id, comment_id, user_id, created_at"),
    fetchProfilesDirectory(),
  ]);

  if (postsError) {
    console.error(postsError);
    showMessage(postsError.message);
    return;
  }

  if (commentsError) {
    console.error(commentsError);
    showMessage(commentsError.message);
    return;
  }

  if (stickersError) {
    console.error(stickersError);
    showMessage(stickersError.message);
    return;
  }

  if (profilesError) {
    console.error(profilesError);
    showMessage(profilesError.message);
    return;
  }

  await loadSharedProfileBios();
  replaceKnownProfiles(profilesData || []);

  let { data: likesData, error: likesError } = likesResult;

  if (likesError) {
    commentLikesEnabled = false;

    const fallbackLikes = await supabaseClient
      .from("likes")
      .select("id, post_id, user_id, created_at");

    likesData = fallbackLikes.data;
    likesError = fallbackLikes.error;
  } else {
    commentLikesEnabled = true;
  }

  if (likesError) {
    console.error(likesError);
    showMessage(likesError.message);
    return;
  }

  const likesByPostId = new Map();
  const likesByCommentId = new Map();
  const commentsByPostId = new Map();
  const repliesByParentId = new Map();

  (likesData || []).forEach((like) => {
    if (like.post_id) {
      const postLikes = likesByPostId.get(like.post_id) || [];
      postLikes.push(like);
      likesByPostId.set(like.post_id, postLikes);
    }

    if (like.comment_id) {
      const commentLikes = likesByCommentId.get(like.comment_id) || [];
      commentLikes.push(like);
      likesByCommentId.set(like.comment_id, commentLikes);
    }
  });

  const normalizedComments = (commentsData || []).map((comment) => ({
    id: comment.id,
    post_id: comment.post_id,
    userId: comment.user_id,
    text: comment.content,
    created_at: comment.created_at,
    parent_comment_id: comment.parent_comment_id,
    nickname:
      comment.profiles?.nickname || comment.profiles?.username || "memory",
    likesCount: (likesByCommentId.get(comment.id) || []).length,
    likedByMe: (likesByCommentId.get(comment.id) || []).some(
      (like) => like.user_id === currentProfile?.id,
    ),
  }));

  normalizedComments.forEach((comment) => {
    const commentsForPost = commentsByPostId.get(comment.post_id) || [];
    commentsForPost.push(comment);
    commentsByPostId.set(comment.post_id, commentsForPost);

    if (comment.parent_comment_id) {
      const replies = repliesByParentId.get(comment.parent_comment_id) || [];
      replies.push(comment);
      repliesByParentId.set(comment.parent_comment_id, replies);
    }
  });

  posts = (postsData || []).map((row) => {
    const postLikes = likesByPostId.get(row.id) || [];
    const allPostComments = commentsByPostId.get(row.id) || [];

    const topLevelComments = allPostComments
      .filter((comment) => !comment.parent_comment_id)
      .map((comment) => ({
        ...comment,
        replies: repliesByParentId.get(comment.id) || [],
      }));

    return {
      id: row.id,
      userId: row.user_id,
      text: row.content,
      created_at: row.created_at,
      isEdited: editedPostIds.has(row.id) || isPostEditedFromTimestamps(row),
      author:
        row.user_id === currentProfile?.id ? "posted by you" : "posted by them",
      nickname: row.profiles?.nickname || row.profiles?.username || "memory",
      avatarUrl: row.profiles?.avatar_url || "",
      likesCount: postLikes.length,
      likedByMe: postLikes.some((like) => like.user_id === currentProfile?.id),
      comments: topLevelComments,
    };
  });

  placedStickers = (stickersData || []).map((row) => {
    const savedPosition = getSavedPlacedStickerPosition(row.id);

    return {
      id: row.id,
      postId: row.post_id,
      userId: row.user_id,
      sticker: row.emoji,
      x: savedPosition?.x ?? row.x,
      y: savedPosition?.y ?? row.y,
    };
  });

  notificationSourceData = {
    postsData: postsData || [],
    commentsData: commentsData || [],
    likesData: likesData || [],
    stickersData: stickersData || [],
    profilesData: profilesData || [],
  };

  buildNotifications({
    postsData: postsData || [],
    commentsData: commentsData || [],
    likesData: likesData || [],
    stickersData: stickersData || [],
    widgetsData: widgets,
    profilesData: profilesData || [],
    render,
  });

  if (profilePopup?.classList.contains("open") && activeProfilePopupUserId) {
    renderProfilePopup(getKnownProfileById(activeProfilePopupUserId));
  }

  if (render) {
    renderTimeline();
  }
}

async function saveEntry() {
  if (entrySaveInFlight) return;
  entrySaveInFlight = true;
  if (saveEntryBtn) saveEntryBtn.disabled = true;

  try {
  let content = "";
  let plainText = "";

  if (entryQuill) {
    plainText = entryQuill.getText().trim();
    content = sanitizePostHtml(entryQuill.root?.innerHTML || "");
  } else {
    plainText = String(entryContentFallback?.value || "").trim();
    content = toSafeHtmlFromPlainText(plainText);
  }

  const attachedImage = String(entryImageData?.value || "").trim();
  if (!plainText && !attachedImage) {
    showMessage("write something first ♡");
    return;
  }

  const user = await getCurrentUser();

  if (!user) {
    showMessage("please log in first ♡");
    return;
  }

  let entryImageUrl = attachedImage;

  if (isInlineImageDataUrl(attachedImage)) {
    try {
      entryImageUrl = await uploadEntryImageData(user.id, attachedImage);
    } catch (error) {
      console.error(error);
      showMessage(error.message || "could not upload image ♡");
      return;
    }
  }

  content = composeEntryContentWithAttachment(content, entryImageUrl);

  let error;
  let savedPost = null;

  if (editingPostId) {
    const existingPost = posts.find((item) => item.id === editingPostId);
    const updatePayload = { content };

    if (existingPost?.created_at) {
      updatePayload.created_at = existingPost.created_at;
    }

    markPostAsEdited(editingPostId);
    const updateResult = await supabaseClient
      .from("posts")
      .update(updatePayload)
      .eq("id", editingPostId)
      .eq("user_id", user.id)
      .select("id, content, created_at, updated_at, user_id")
      .maybeSingle();

    error = updateResult.error;
    savedPost = updateResult.data;
  } else {
    const insertResult = await supabaseClient
      .from("posts")
      .insert({
        user_id: user.id,
        content,
      })
      .select("id, content, created_at, user_id")
      .single();

    error = insertResult.error;
    savedPost = insertResult.data;
  }

  if (error) {
    console.error(error);
    showMessage(error.message);
    return;
  }

  const successMessage = editingPostId ? "entry updated ♡" : "entry posted! <3";
  if (editingPostId) {
    markLocalRealtimeTable("posts");
    const post = posts.find((item) => item.id === editingPostId);
    if (post) {
      post.text = savedPost?.content || content;
      post.isEdited = true;
      syncPostContent(editingPostId);
    }
  } else if (savedPost?.id) {
    markLocalRealtimeTable("posts");
    posts = [
      {
        id: savedPost.id,
        userId: savedPost.user_id || user.id,
        text: savedPost.content || content,
        created_at: savedPost.created_at || new Date().toISOString(),
        isEdited: false,
        author: "posted by you",
        nickname:
          currentProfile?.nickname || currentProfile?.username || "memory",
        avatarUrl: currentProfile?.avatar_url || "",
        likesCount: 0,
        likedByMe: false,
        comments: [],
      },
      ...posts,
    ];
    renderTimeline();
  }
  resetEntryPopup();
  entryPopup.classList.remove("open");
  showMessage(successMessage);
  } finally {
    entrySaveInFlight = false;
    if (saveEntryBtn) saveEntryBtn.disabled = false;
  }
}

function openDeleteEntryConfirmation(postId) {
  if (!postId || !deleteEntryPopup) return;

  pendingDeletePostId = postId;
  if (confirmDeleteEntryBtn) {
    confirmDeleteEntryBtn.disabled = false;
    confirmDeleteEntryBtn.textContent = "delete";
  }
  deleteEntryPopup.classList.add("open");
}

function closeDeleteEntryConfirmation() {
  pendingDeletePostId = null;
  if (deleteEntryPopup) {
    deleteEntryPopup.classList.remove("open");
  }
  if (confirmDeleteEntryBtn) {
    confirmDeleteEntryBtn.disabled = false;
    confirmDeleteEntryBtn.textContent = "delete";
  }
}

async function confirmDeleteEntry() {
  const postId = pendingDeletePostId;
  if (!postId || !confirmDeleteEntryBtn) return;

  confirmDeleteEntryBtn.disabled = true;
  confirmDeleteEntryBtn.textContent = "deleting...";
  const deleted = await deleteEntry(postId);
  if (deleted) {
    closeDeleteEntryConfirmation();
  } else {
    confirmDeleteEntryBtn.disabled = false;
    confirmDeleteEntryBtn.textContent = "delete";
  }
}

async function deleteEntry(postId) {
  const postEl = document.querySelector(`[data-post-id="${postId}"]`);
  const previousPosts = posts;
  const deletedPost = posts.find((post) => post.id === postId);

  if (postEl) {
    postEl.style.transition = "opacity 0.25s ease, transform 0.25s ease";
    postEl.style.opacity = "0";
    postEl.style.transform = "translateY(10px)";
  }

  posts = posts.filter((post) => post.id !== postId);

  const { error } = await supabaseClient
    .from("posts")
    .delete()
    .eq("id", postId);

  if (error) {
    console.error(error);
    showMessage(error.message);
    posts = previousPosts;
    if (deletedPost || postEl) {
      renderTimeline();
    }
    return false;
  }

  unmarkPostAsEdited(postId);
  markLocalRealtimeTable("posts");
  placedStickers = placedStickers.filter((sticker) => sticker.postId !== postId);
  postEl?.remove();
  syncPostCommentButton(postId);
  showMessage("entry deleted ♡");
  return true;
}

async function toggleLike(postId) {
  if (pendingPostLikeIds.has(postId)) return;

  const user = await getCurrentUser();

  if (!user) {
    showMessage("please log in first ♡");
    return;
  }

  const post = posts.find((item) => item.id === postId);
  if (!post) return;

  const wasLiked = Boolean(post.likedByMe);
  const previousCount = post.likesCount || 0;

  pendingPostLikeIds.add(postId);
  post.likedByMe = !wasLiked;
  post.likesCount = Math.max(0, previousCount + (wasLiked ? -1 : 1));
  syncPostLikeButton(postId);

  try {
    const result = wasLiked
      ? await supabaseClient
          .from("likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id)
      : await supabaseClient.from("likes").insert({
          post_id: postId,
          user_id: user.id,
        });

    if (result.error) throw result.error;
    markLocalRealtimeTable("likes");
  } catch (error) {
    console.error(error);
    post.likedByMe = wasLiked;
    post.likesCount = previousCount;
    showMessage(error.message);
  } finally {
    pendingPostLikeIds.delete(postId);
    syncPostLikeButton(postId);
  }
}

async function fetchLatestWidgetRow(widgetId) {
  const { data, error } = await supabaseClient
    .from("widgets")
    .select("*")
    .eq("id", widgetId)
    .order("updated_at", { ascending: false })
    .limit(1);

  if (error) {
    throw error;
  }

  return data?.[0] || null;
}

function mergeWidgetFromSavedRow(widget, savedRow, options = {}) {
  if (!widget || !savedRow) return;

  const { preservePosition = false } = options;

  widget.title = savedRow.title ?? widget.title;
  widget.side = savedRow.side ?? widget.side;
  if (!preservePosition) {
    widget.x = savedRow.x ?? widget.x;
    widget.y = savedRow.y ?? widget.y;
  }
  widget.data = savedRow.data ?? widget.data;
  widget.content = savedRow.content ?? widget.content;
  widget.updated_at = savedRow.updated_at ?? widget.updated_at;
}

async function toggleWidgetLike(widgetId) {
  if (pendingWidgetLikeIds.has(widgetId)) return;

  const user = await getCurrentUser();

  if (!user) {
    showMessage("please log in first ♡");
    return;
  }

  const widget = widgets.find((item) => item.id === widgetId);
  if (!widget || !isLikeableWidget(widget)) return;

  let previousLikes = getWidgetLikeUserIds(widget);
  let previousLikeTimestamps = {
    ...getWidgetLikeTimestamps(widget),
  };

  pendingWidgetLikeIds.add(widgetId);
  normalizeWidgetLikesData(widget);
  previousLikes = getWidgetLikeUserIds(widget);
  previousLikeTimestamps = {
    ...getWidgetLikeTimestamps(widget),
  };

  const wasLiked = previousLikes.includes(user.id);
  widget.data.likes = wasLiked
    ? previousLikes.filter((likedUserId) => likedUserId !== user.id)
    : [...previousLikes, user.id];
  widget.data.likeTimestamps = {
    ...getWidgetLikeTimestamps(widget),
  };

  if (wasLiked) {
    delete widget.data.likeTimestamps[user.id];
  } else {
    widget.data.likeTimestamps[user.id] = new Date().toISOString();
  }

  syncWidgetLikeButton(widgetId);

  try {
    const saved = await saveWidgetToSupabase(widget, {
      recordHistory: false,
      suppressErrorMessage: true,
      preservePosition: true,
    });

    if (!saved) {
      throw new Error("could not update widget like ♡");
    }
  } catch (error) {
    console.error(error);
    widget.data = {
      ...(widget.data && typeof widget.data === "object" ? widget.data : {}),
      likes: previousLikes,
      likeTimestamps: previousLikeTimestamps,
    };
    syncWidgetLikeButton(widgetId);
    showMessage(error.message || "could not update widget like ♡");
  } finally {
    pendingWidgetLikeIds.delete(widgetId);
    syncWidgetLikeButton(widgetId);
    refreshNotificationsFromCurrentData();
  }
}

async function toggleCommentLike(commentId) {
  const user = await getCurrentUser();

  if (!user) {
    showMessage("please log in first ♡");
    return;
  }

  const post = posts.find((item) => item.id === currentCommentsPostId);
  if (!post) return;

  const allComments = [
    ...(post.comments || []),
    ...(post.comments || []).flatMap((comment) => comment.replies || []),
  ];
  const comment = allComments.find((item) => item.id === commentId);

  if (!comment) return;

  if (!commentLikesEnabled) {
    showMessage("comment likes need a comment_id column in your likes table ♡");
    return;
  }

  const wasLiked = Boolean(comment.likedByMe);
  const previousCount = comment.likesCount || 0;

  comment.likedByMe = !wasLiked;
  comment.likesCount = Math.max(0, previousCount + (wasLiked ? -1 : 1));
  syncCommentLikeButton(commentId);

  try {
    const result = wasLiked
      ? await supabaseClient
          .from("likes")
          .delete()
          .eq("comment_id", commentId)
          .eq("user_id", user.id)
      : await supabaseClient.from("likes").insert({
          comment_id: commentId,
          user_id: user.id,
        });

    if (result.error) throw result.error;
    markLocalRealtimeTable("likes");
  } catch (error) {
    console.error(error);
    comment.likedByMe = wasLiked;
    comment.likesCount = previousCount;
    syncCommentLikeButton(commentId);
    showMessage(error.message);
  }
}

function openCommentsPopup(postId) {
  currentCommentsPostId = postId;
  replyingToCommentId = null;
  replyingToLabel.style.display = "none";
  replyingToLabel.textContent = "";
  commentInput.value = "";
  renderCommentsList(postId);
  commentsPopup.classList.add("open");
}

function renderCommentsList(postId) {
  const post = posts.find((item) => item.id === postId);

  if (!post) {
    renderCommentsSkeleton();
    return;
  }

  if (!post.comments || !post.comments.length) {
    commentsList.innerHTML = `<div class="comment-empty">no comments yet ♡</div>`;
    return;
  }

  commentsList.innerHTML = post.comments
    .map((comment) => {
      const repliesHtml = (comment.replies || [])
        .map((reply) => {
          return `
        <div class="comment-reply" data-comment-id="${reply.id}">
          <div class="comment-name profile-trigger" role="button" tabindex="0" data-comment-profile-id="${reply.userId}">${reply.nickname || "memory"}</div>
          <div class="comment-text" data-comment-text-id="${reply.id}"></div>
          <div class="comment-link-preview-list link-preview-list" data-comment-preview-id="${reply.id}" hidden></div>

          <div class="comment-actions">
            <button class="comment-like-btn" type="button" data-comment-id="${reply.id}">
              ${reply.likedByMe ? "🩷 liked" : "♡ like"} (${reply.likesCount || 0})
            </button>
            ${
              reply.userId === currentProfile?.id
                ? `
              <button class="delete-reply-btn" type="button" data-comment-id="${reply.id}">
                delete
              </button>
            `
                : ""
            }
          </div>
        </div>
      `;
        })
        .join("");

      return `
      <div class="comment-item" data-comment-id="${comment.id}">
        <div class="comment-name profile-trigger" role="button" tabindex="0" data-comment-profile-id="${comment.userId}">${comment.nickname || "memory"}</div>
        <div class="comment-text" data-comment-text-id="${comment.id}"></div>
        <div class="comment-link-preview-list link-preview-list" data-comment-preview-id="${comment.id}" hidden></div>

        <div class="comment-actions">
          <button class="comment-like-btn" type="button" data-comment-id="${comment.id}">
            ${comment.likedByMe ? "🩷 liked" : "♡ like"} (${comment.likesCount || 0})
          </button>
          <button class="reply-btn" type="button" data-comment-id="${comment.id}">
            reply
          </button>

          ${
            comment.userId === currentProfile?.id
              ? `
            <button class="delete-comment-btn" type="button" data-comment-id="${comment.id}">
              delete
            </button>
          `
              : ""
          }
        </div>

        ${repliesHtml}
      </div>
    `;
    })
    .join("");

  post.comments.forEach((comment) => {
    const commentTextEl = commentsList.querySelector(
      `[data-comment-text-id="${comment.id}"]`,
    );
    if (commentTextEl) {
      renderTextWithLinkPreviews(
        commentTextEl,
        commentsList.querySelector(`[data-comment-preview-id="${comment.id}"]`),
        comment.text,
      );
    }

    (comment.replies || []).forEach((reply) => {
      const replyTextEl = commentsList.querySelector(
        `[data-comment-text-id="${reply.id}"]`,
      );
      if (replyTextEl) {
        renderTextWithLinkPreviews(
          replyTextEl,
          commentsList.querySelector(`[data-comment-preview-id="${reply.id}"]`),
          reply.text,
        );
      }
    });
  });

  commentsList.querySelectorAll(".reply-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      replyingToCommentId = btn.dataset.commentId;
      replyingToLabel.style.display = "block";
      replyingToLabel.textContent = "replying to a comment ♡";
      commentInput.focus();
    });
  });

  commentsList.querySelectorAll(".comment-like-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await toggleCommentLike(btn.dataset.commentId);
    });
  });

  commentsList.querySelectorAll(".delete-comment-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await deleteComment(btn.dataset.commentId);
    });
  });

  commentsList.querySelectorAll(".delete-reply-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await deleteComment(btn.dataset.commentId);
    });
  });

  commentsList.querySelectorAll("[data-comment-profile-id]").forEach((nameEl) => {
    const profileId = nameEl.getAttribute("data-comment-profile-id") || "";
    const fallbackProfile = {
      id: profileId,
      nickname: nameEl.textContent?.trim() || "memory",
    };
    bindProfilePopupTrigger(nameEl, () =>
      openProfilePopupForUser(profileId, fallbackProfile),
    );
  });
}

async function saveComment() {
  if (commentSaveInFlight) return;
  commentSaveInFlight = true;
  if (saveCommentBtn) saveCommentBtn.disabled = true;

  try {
  const content = commentInput.value.trim();

  if (!content || !currentCommentsPostId) {
    showMessage("write something first silly! ♡");
    return;
  }

  const user = await getCurrentUser();

  if (!user) {
    showMessage("log in first silly! ♡");
    return;
  }

  const postId = currentCommentsPostId;
  const parentCommentId = replyingToCommentId;
  const temporaryCommentId = `local-comment-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
  const optimisticComment = {
    id: temporaryCommentId,
    post_id: postId,
    userId: user.id,
    text: content,
    created_at: new Date().toISOString(),
    parent_comment_id: parentCommentId,
    nickname: currentProfile?.nickname || currentProfile?.username || "memory",
    likesCount: 0,
    likedByMe: false,
    replies: [],
  };

  addCommentToPost(postId, optimisticComment);

  commentInput.value = "";
  replyingToCommentId = null;
  replyingToLabel.style.display = "none";
  replyingToLabel.textContent = "";
  renderCommentsList(postId);
  syncPostCommentButton(postId);
  showMessage("comment posted! ♡");

  const { data: savedComment, error } = await supabaseClient
    .from("comments")
    .insert({
      post_id: postId,
      user_id: user.id,
      content,
      parent_comment_id: parentCommentId,
    })
    .select("id, created_at")
    .single();

  if (error) {
    console.error(error);
    removeCommentFromPost(postId, temporaryCommentId);
    renderCommentsList(postId);
    syncPostCommentButton(postId);
    showMessage(error.message);
    return;
  }

  updateLocalCommentId(postId, temporaryCommentId, savedComment);
  markLocalRealtimeTable("comments");
  if (currentCommentsPostId === postId) {
    renderCommentsList(postId);
  }
  } finally {
    commentSaveInFlight = false;
    if (saveCommentBtn) saveCommentBtn.disabled = false;
  }
}

async function deleteComment(commentId) {
  const postId = currentCommentsPostId;
  const removal = removeCommentFromPost(postId, commentId);
  const el = document.querySelector(`[data-comment-id="${commentId}"]`);

  if (el) {
    el.style.transition = "opacity 0.35s ease, transform 0.35s ease";
    el.style.opacity = "0";
    el.style.transform = "translateY(6px) scale(0.98)";
  }

  window.setTimeout(() => {
    if (currentCommentsPostId === postId) {
      renderCommentsList(postId);
    }
  }, 160);
  syncPostCommentButton(postId);

  const { error } = await supabaseClient
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    console.error(error);
    removal?.restore();
    renderCommentsList(postId);
    syncPostCommentButton(postId);
    showMessage(error.message);
    return;
  }

  markLocalRealtimeTable("comments");
  showMessage("comment deleted ♡");
}

async function logoutUser() {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    showMessage(error.message);
    return;
  }

  currentProfile = null;
  knownProfiles = [];
  setCurrentUser(null);
  closeProfileDetailsPopup();
  authPopup.classList.add("open");

  emailInput.value = "";
  passwordInput.value = "";
  nicknameInput.value = "";
  if (bioInput) {
    bioInput.value = "";
  }
  pfpInput.value = "";

  placedStickers = [];
  renderPlacedStickers();
  notifications = [];
  closeNotificationsPanel();
  renderSignedOutShell();

  showMessage("logged out ♡");
}

async function checkSession() {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (session?.user) {
    currentUser = session.user;
    setToolbarAuthState("checking");
    authPopup.classList.remove("open");
    renderAppSkeleton();
    await loadProfile(session.user);
    await refreshUserData({ includeWidgets: true, showSkeleton: true });
    setCurrentUser(session.user);
  } else {
    currentProfile = null;
    knownProfiles = [];
    setCurrentUser(null);
    closeProfileDetailsPopup();
    authPopup.classList.add("open");
    posts = [];
    placedStickers = [];
    notifications = [];
    closeNotificationsPanel();
    renderSignedOutShell();
  }
}

if (signupBtn) signupBtn.addEventListener("click", signUpUser);
if (loginBtn) loginBtn.addEventListener("click", loginUser);
if (notificationsBtn) {
  notificationsBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!currentUser || !notificationsPanel) return;

    if (notificationsPanel.hidden) {
      openNotificationsPanel();
    } else {
      closeNotificationsPanel();
    }
  });
}
if (clearNotificationsBtn) {
  clearNotificationsBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    clearNotifications();
  });
}
if (passwordToggleBtn) {
  passwordToggleBtn.addEventListener("click", () => {
    setPasswordVisibility(passwordInput?.type === "password");
  });
}
if (emailInput) {
  emailInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    loginUser();
  });
}
if (passwordInput) {
  passwordInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    loginUser();
  });
}
if (saveProfileBtn) saveProfileBtn.addEventListener("click", saveProfile);
if (logoutBtn) logoutBtn.addEventListener("click", logoutUser);
if (saveEntryBtn) saveEntryBtn.addEventListener("click", saveEntry);
if (saveCommentBtn) saveCommentBtn.addEventListener("click", saveComment);
if (zoomOutBtn) {
  zoomOutBtn.addEventListener("click", () => adjustAppZoom(-APP_ZOOM_STEP));
}
if (zoomInBtn) {
  zoomInBtn.addEventListener("click", () => adjustAppZoom(APP_ZOOM_STEP));
}
if (zoomResetBtn) {
  zoomResetBtn.addEventListener("click", () =>
    setAppZoom(DEFAULT_APP_ZOOM, { persist: true }),
  );
}
if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
mobileViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMobileView(button.dataset.mobileView || "timeline");
  });
});
window.addEventListener("scroll", requestFloatingEntryButtonVisibilityUpdate, {
  passive: true,
});
window.addEventListener("resize", requestMobileViewSwitcherVisibilitySync, {
  passive: true,
});
window.addEventListener("focus", () => {
  if (!currentUser) return;
  void touchCurrentUserPresence({ force: true });
  scheduleLiveDataRefresh({ includeWidgets: true, debounceMs: 120 });
});
document.addEventListener("visibilitychange", () => {
  if (!currentUser || document.visibilityState !== "visible") return;
  void touchCurrentUserPresence({ force: true });
  scheduleLiveDataRefresh({ includeWidgets: true, debounceMs: 120 });
});
updateFloatingEntryButtonVisibility();
document.addEventListener("click", (event) => {
  if (!notificationsMenu?.contains(event.target)) {
    closeNotificationsPanel();
  }
});
document.addEventListener(
  "click",
  (event) => {
    const link = event.target.closest?.("a[href]");

    if (
      !link ||
      (!isLegacyAnniversaryUrl(link.href) &&
        !isAnniversaryWrapperUrl(link.href))
    ) {
      return;
    }

    event.preventDefault();
    window.open(getAnniversaryWrapperUrl(), "_blank", "noopener,noreferrer");
  },
  true,
);

setTheme(document.documentElement.dataset.theme);
setAppZoom(getStoredAppZoomPreference());
window
  .matchMedia?.("(prefers-color-scheme: dark)")
  ?.addEventListener?.("change", syncThemeWithSystemPreference);
normalizeChromeSymbols();
activeMobileView = "timeline";
applyMobileView();
syncMobileViewSwitcherVisibility();
initEntryEditor();
renderDecor();
renderNotifications();

async function initApp() {
  try {
    const sessionCheckCompleted = await withBootTimeout(
      checkSession().then(() => true),
      7000,
    );

    if (!sessionCheckCompleted && !currentUser) {
      renderBootFallbackShell();
    }

    await waitForInitialPageReady();
  } catch (error) {
    console.error(error);
    renderBootFallbackShell();
  } finally {
    if (!shouldUseLaunchSplash()) {
      if (launchSplash) {
        launchSplash.hidden = true;
      }
      setAppBootingState(false);
      return;
    }

    const elapsed =
      (typeof performance !== "undefined" ? performance.now() : Date.now()) -
      bootStartedAt;
    const remaining = Math.max(0, BOOT_SPLASH_MIN_MS - elapsed);

    window.setTimeout(() => {
      void hideLaunchSplash();
    }, remaining);
  }
}

initApp();
