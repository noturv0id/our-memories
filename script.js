const SUPABASE_URL = 'https://ytrbsxknhlsfqkqphlms.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_oyurIPBCFJuFsjN0L6LyIg_PaXihCYn';

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
const ANNIVERSARY_WRAPPER_URL =
  'https://noturv0id.github.io/our-memories/anniversary-wrapper.html?v=20260426-8';
const STICKER_MIME_TYPE = 'application/x-our-memories-sticker';
const ENTRY_IMAGE_BUCKET = 'profile-pictures';
// Add your GIPHY API key here to enable public GIF search in the sticker popup.
const GIPHY_API_KEY = '34udc7WiSDjXKrRbb9UgwcD2piNXT3uO';
const GIPHY_CLIENT_KEY = 'our_memories_sticker_box';
const GIPHY_SEARCH_ENDPOINT = 'https://api.giphy.com/v1/gifs/search';
const OPEN_METEO_FORECAST_ENDPOINT = 'https://api.open-meteo.com/v1/forecast';
const WEATHER_WIDGET_LOCATIONS = [
  { label: 'Hateen, Kuwait', latitude: 29.28233, longitude: 48.02874 },
  { label: 'Dammam, Saudi Arabia', latitude: 26.43442, longitude: 50.10326 }
];
const RECENT_GIF_STORAGE_KEY = 'recentGifStickers';
const PLACED_GIF_SIZE_STORAGE_KEY = 'placedGifStickerSizes';
const PLACED_STICKER_POSITION_STORAGE_KEY = 'placedStickerPositions';
const DEFAULT_GIF_STICKER_SIZE = 72;
const MIN_GIF_STICKER_SIZE = 44;
const MAX_GIF_STICKER_SIZE = 160;
let hasRenderedEmojiPicker = false;
let hasRenderedGifPicker = false;
let selectedGifStickerUrl = '';
let gifSearchResults = [];
let gifSearchQuery = '';
let gifSearchLoading = false;
let activeStickerSize = null;
const STICKER_GIF_LIBRARY = [
  { label: 'heart bear', url: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif' },
  { label: 'cute cat', url: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif' },
  { label: 'pink hearts', url: 'https://media.giphy.com/media/l4FGpP4lxGGgK5CBW/giphy.gif' },
  { label: 'happy dance', url: 'https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif' },
  { label: 'love letter', url: 'https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif' },
  { label: 'sparkly hug', url: 'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif' },
  { label: 'blushing heart', url: 'https://media.giphy.com/media/LYJLrM8VkBmyCKOd1O/giphy.gif' },
  { label: 'sleepy bunny', url: 'https://media.giphy.com/media/9Y5BbDSkSTiY8/giphy.gif' }
];
const STICKER_PICKER_GROUPS = [
  {
    label: 'hearts + symbols',
    emojis: '♡ ♥ ❤ 💕 💖 💗 💘 💙 💚 💛 💜 🖤 🤍 🤎 💔 ❣️ 💞 💓 💟 ☀️ ⭐ 🌟 ✨ ⚡ 💫 🔥 🌈 ☁️ 🌙 🌻 🌸 🌷 🪷 🍀 🎀 🎁 🎈 🫧 💌 📸 🎵 🎶'
      .split(' ')
  },
  {
    label: 'smileys',
    emojis: '😀 😃 😄 😁 😆 😅 😂 🙂 🙃 😉 😊 😇 🥰 😍 🤩 😘 😗 ☺️ 😚 😙 🥲 😋 😛 😜 🤪 😝 🫠 🤗 🤭 🫢 🤫 🤔 🫡 🤐 🤨 😐 😑 😶 🫥 😏 😒 🙄 😬 😮‍💨 🤥 😌 😔 😪 🤤 😴 😷 🤒 🤕 🤢 🤮 🤧 🥵 🥶 😵 😵‍💫 🤯 🥴 😎 🤓 🧐 😕 🫤 😟 🙁 ☹️ 😮 😯 😲 😳 🥺 🥹 😦 😧 😨 😰 😥 😢 😭 😱 😖 😣 😞 😓 😩 😫 🥱 😤 😡 😠 🤬 😈 👿 💀 ☠️ 💩 🤡 👻 👽 🤖'
      .split(' ')
  },
  {
    label: 'people',
    emojis: '👋 🤚 🖐️ ✋ 🖖 🫶 🫰 🫳 🫴 👌 🤌 🤏 ✌️ 🤞 🫡 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🙏 ✍️ 💅 🤳 💪 🦾 🦿 🦵 🦶 👂 🦻 👃 🧠 🫀 🫁 👀 👁️ 👄 👶 🧒 👦 👧 🧑 👱 👨 🧔 👩 👵 👴'
      .split(' ')
  },
  {
    label: 'animals + nature',
    emojis: '🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐻‍❄️ 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🙈 🙉 🙊 🐔 🐧 🐦 🐤 🐣 🦆 🦅 🦉 🦇 🐺 🐗 🐴 🦄 🐝 🪲 🦋 🐌 🐞 🐢 🐍 🦎 🦂 🦀 🐙 🐠 🐟 🐬 🐳 🐋 🦭 🪼 🌱 🌿 ☘️ 🍃 🍂 🍁 🌵 🌴 🌳 🌲 🌹 🌺 🌼 🌸 🌞 🌝 🌛 🌜 ⭐ 🌎 🌍 🌏'
      .split(' ')
  },
  {
    label: 'food + drink',
    emojis: '🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🥑 🫒 🥕 🌽 🌶️ 🫑 🥒 🥬 🥦 🧄 🧅 🍄 🥜 🫘 🍞 🥐 🥖 🫓 🥨 🥯 🧀 🍳 🧈 🥞 🧇 🥓 🍔 🍟 🍕 🌭 🌮 🌯 🥪 🥙 🧆 🍝 🍜 🍲 🍛 🍣 🍱 🍤 🍙 🍚 🍘 🍥 🍡 🍦 🍧 🍨 🍩 🍪 🎂 🍰 🧁 🍫 🍬 🍭 ☕ 🍵 🧃 🥤 🧋'
      .split(' ')
  },
  {
    label: 'activities + travel',
    emojis: '⚽ 🏀 🏈 ⚾ 🎾 🏐 🏉 🎱 🪀 🏓 🏸 🥅 🥊 🎳 🎮 🕹️ 🎲 ♟️ 🎯 🎨 🎭 🎤 🎧 🎼 🎹 🥁 🎷 🎺 🎸 🪕 🎻 🛼 🛹 🛴 🚲 🛵 🏎️ 🚗 🚕 🚙 🚌 🚎 🚓 🚑 🚒 🚚 🚲 ✈️ 🛫 🛬 🚀 🛸 🚁 ⛵ 🚤 🚢 🗺️ 🧭 ⛺ 🏕️ 🗽 🗼 🏰 🎡 🎢 🎠 🌋 🏝️ 🏖️ 🏜️ 🏞️'
      .split(' ')
  },
  {
    label: 'objects',
    emojis: '⌚ 📱 💻 ⌨️ 🖥️ 🖨️ 🖱️ 💾 💿 📷 📹 🎥 📞 ☎️ 📺 📻 🎙️ ⏰ ⌛ ⏳ 🔋 🔌 💡 🔦 🕯️ 🧯 🪞 🚿 🛁 🧼 🪥 🧽 🧸 🛍️ 💎 🔑 🗝️ 🔒 🔓 🧰 🧲 🪜 ⚙️ 🪛 🔧 🔨 ⚒️ 🧱 🪵 🧪 🧫 🧬 💊 💉 🩹 🩺 📚 📖 📝 ✏️ 📌 📍 ✂️ 📎 📐 📏 💰 💳 💵 💴 💶 💷 ⚖️ 🔔 🛎️'
      .split(' ')
  },
  {
    label: 'symbols',
    emojis: '➕ ➖ ✖️ ➗ 🟰 ♾️ ‼️ ⁉️ ❓ ❔ ❕ ❗ 〰️ 💱 💲 ⚜️ 🔱 📛 🔰 ⭕ ✅ ☑️ ✔️ ❌ ❎ ➰ ➿ 〽️ ✳️ ✴️ ❇️ ©️ ®️ ™️ #️⃣ *️⃣ 0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 ⏺️ ⏹️ ⏸️ ▶️ ⏯️ ◀️ 🔼 🔽 ⏫ ⏬ ◾ ◽ ▪️ ▫️ ⬛ ⬜ 🟥 🟧 🟨 🟩 🟦 🟪 🟫 🔺 🔻 🔶 🔷 🔸 🔹'
      .split(' ')
  }
];
      const floatingDecor = [
        { icon: '✦', top: '4%', left: '5%', size: '22px', delay: '0s' },
        { icon: '♡', top: '8%', right: '8%', size: '28px', delay: '0.6s' },
        { icon: '☁', top: '16%', left: '18%', size: '34px', delay: '1.2s' },
        { icon: '🎀', top: '14%', right: '20%', size: '28px', delay: '1.8s' },
        { icon: '✦', top: '26%', left: '10%', size: '20px', delay: '0.9s' },
        { icon: '♡', top: '34%', right: '10%', size: '24px', delay: '1.4s' },
        { icon: '☁', top: '48%', left: '4%', size: '34px', delay: '2.2s' },
        { icon: '✦', top: '57%', right: '18%', size: '22px', delay: '0.3s' },
        { icon: '🎀', top: '70%', left: '14%', size: '28px', delay: '1.7s' },
        { icon: '♡', top: '78%', right: '5%', size: '28px', delay: '2.5s' },
        { icon: '☁', top: '86%', left: '24%', size: '34px', delay: '0.8s' },
        { icon: '✦', top: '90%', right: '24%', size: '20px', delay: '1.9s' },
        { icon: '♡', top: '18%', left: '48%', size: '18px', delay: '1.3s' },
        { icon: '✦', top: '64%', left: '52%', size: '18px', delay: '2.1s' },
       { icon: '☁', top: '8%', left: '72%', size: '26px', delay: '0.5s' },
      ];
      const sparkleDecor = Array.from({ length: 70 }, (_, index) => ({
        icon: '✦',
        top: `${(index * 37) % 96 + 1}%`,
        left: `${(index * 53) % 96 + 1}%`,
        size: `${30 + (index % 4)}px`,
        delay: `${(index % 14) * 0.32}s`,
        duration: `${3.4 + (index % 6) * 0.45}s`
      }));

      let widgets = [
  {
    id: 'song',
    title: 'currently listening to ₊˚⊹ᰔ ',
    side: 'left',
    x: 8,
    y: 20,
    data: {
      spotifyUrl: '',
      spotifyUri: '',
      songName: '',
      durationLabel: '',
      coverUrl: '',
      accent: 38
    }
  },
  {
    id: '⋆𐙚₊little note˚⊹♡',
    title: '⋆𐙚₊little note˚⊹♡',
    side: 'left',
    x: 16,
    y: 255,
    data: {
      text: ''
    }
  },

  {
  id: '. ݁₊ ⊹ . ݁ dates ݁ . ⊹ ₊ ݁.',
  title: '⊹ ࣪ ˖important dates⊹ ࣪ ˖',
  side: 'right',
  x: 8,
  y: 34,
  data: {
    items: [
      { id: crypto.randomUUID ? crypto.randomUUID() : 'date1', title: 'birthday', date: '2026-05-08' },
      { id: crypto.randomUUID ? crypto.randomUUID() : 'date2', title: 'anniversary', date: '2026-06-01' }
    ]
  }
},

{
  id: '𓂃˖˳·˖ ִֶָ ⋆wishlist⋆ ִֶָ˖·˳˖𓂃',
  title: '𓂃˖˳·˖ ִֶָ ⋆wishlist⋆ ִֶָ˖·˳˖𓂃',
  side: 'left',
  x: 4,
  y: 470,
  data: {
    items: [
      { id: crypto.randomUUID ? crypto.randomUUID() : 'wish1', text: 'picnic date', done: false },
      { id: crypto.randomUUID ? crypto.randomUUID() : 'wish2', text: 'bake brownies together', done: false }
    ]
  }
},

{
  id: 'weather',
  title: '˚₊‧꒰ა current weather ໒꒱ ‧₊˚',
  side: 'left',
  x: 8,
  y: 620,
  data: {
    locations: [],
    status: 'idle'
  }
},

{
  id: 'miss-you',
  title: '˚₊‧ i miss you counter ‧₊˚',
  side: 'right',
  x: 8,
  y: 610,
  data: {
    countsByUser: {},
    lastResetDate: ''
  }
},

  {
  id: 'love',
  title: '｡ ₊°༺ together for ༻°₊ ｡',
  side: 'right',
  x: 28,
  y: 245,
  data: {
    startDate: '2025-04-22'
  }
},

  {
    id: 'sweet-reminder',
    title: '⊹ little reminder ⊹',
    side: 'right',
    x: 10,
    y: 352,
    content: `
      <div style="display:grid;gap:12px;">
         <a
           class="soft-btn widget-miss-you-btn"
           href="${ANNIVERSARY_WRAPPER_URL}"
           target="_blank"
           style="justify-self:center;text-decoration:none;display:inline-flex;align-items:center;"
         >
           open website
         </a>
      </div>
    `,
  },

  {
    id: 'photo-pin',
    title: '✦ pinned photo ♡',
    side: 'left',
    x: 12,
    y: 760,
      data: {
        image: '',
        text: '',
        textColor: '#ffffff',
        textSize: 22,
        textX: 50,
        textY: 86,
        rotate: 0
      }
  },

  // Duplicate of pinned photo widget on the right side
  {
    id: 'photo-pin-right',
    title: '✦ pinned photo ♡',
    side: 'right',
    x: 12,
    y: 760,
    data: {
      image: '',
      text: '',
      textColor: '#ffffff',
      textSize: 22,
      textX: 50,
      textY: 86,
      rotate: 0
    }
  },

];

      function getWidgetDataObject(widget) {
        if (widget?.data && typeof widget.data === 'object' && !Array.isArray(widget.data)) {
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
          mobileOrder: order
        };
      }

      function normalizeWidgetMobileOrders(widgetList = widgets) {
        const sideOrders = {
          left: new Set(),
          right: new Set()
        };

        const needsReset = widgetList.some((widget) => {
          const side = widget?.side === 'right' ? 'right' : 'left';
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
          right: 0
        };
        const changedWidgets = [];

        widgetList.forEach((widget) => {
          const side = widget?.side === 'right' ? 'right' : 'left';
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
          .filter((widget) => (widget?.side === 'right' ? 'right' : 'left') === side)
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
        right: ['photo-pin', 'photo-pin-right', 'miss-you', 'song', 'note'],
        left: ['wishlist', 'weather', 'dates', 'reminder-copy', 'love']
      };

      function getWidgetMobileTabOrders(widget) {
        const data = getWidgetDataObject(widget);
        return data.mobileTabOrders && typeof data.mobileTabOrders === 'object'
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
            ...(data.mobileTabOrders && typeof data.mobileTabOrders === 'object' ? data.mobileTabOrders : {}),
            [side]: order
          }
        };
      }

      function getWidgetMobileRole(widget) {
        const normalizedId = String(widget?.id || '').toLowerCase().trim();
        const normalizedTitle = String(widget?.title || '').toLowerCase();

        if (normalizedId === 'song') return 'song';
        if (normalizedId === 'weather' || normalizedTitle.includes('current weather')) return 'weather';
        if (normalizedId === 'miss-you' || normalizedTitle.includes('miss you counter')) return 'miss-you';
        if (normalizedId === 'love') return 'love';
        if (normalizedId === 'sweet-reminder') return 'reminder';
        if (normalizedId === 'wishlist' || normalizedTitle.includes('wishlist')) return 'wishlist';
        if (normalizedId === 'dates' || normalizedTitle.includes('important dates')) return 'dates';
        if (normalizedId === 'note' || normalizedTitle.includes('little note')) return 'note';
        if (normalizedId === 'photo-pin' || normalizedId === 'photo-pin-right') return normalizedId;
        if (normalizedTitle.includes('pinned photo')) return 'photo-pin';

        return '';
      }

      function getMobileWidgetForRole(role) {
        const lookupRole = role === 'reminder-copy' ? 'reminder' : role;
        return widgets.find((widget) => getWidgetMobileRole(widget) === lookupRole);
      }

      function getMobileWidgetRenderItems() {
        return Object.entries(MOBILE_WIDGET_LAYOUT).flatMap(([side, roles]) =>
          roles.flatMap((role, order) => {
            const widget = getMobileWidgetForRole(role);
            if (!widget) return [];

            const isReminderCopy = role === 'reminder-copy';
            return {
              widget: isReminderCopy
                ? {
                    ...widget,
                    id: `${widget.id}-mobile-left`,
                    side,
                    zIndex: widget.zIndex || 1
                  }
                : widget,
              renderId: isReminderCopy ? `${widget.id}-mobile-left` : widget.id,
              sourceId: widget.id,
              side,
              order: getWidgetMobileTabOrder(widget, side, order),
              isVirtual: isReminderCopy
            };
          })
        );
      }

      function sortMobileRenderItems(items) {
        return [...items].sort((a, b) => {
          const orderDifference = a.order - b.order;
          if (orderDifference !== 0) return orderDifference;
          return MOBILE_WIDGET_LAYOUT[a.side].indexOf(a.renderId) - MOBILE_WIDGET_LAYOUT[b.side].indexOf(b.renderId);
        });
      }

      async function moveMobileWidgetInOrder(renderId, direction) {
        const renderItems = getMobileWidgetRenderItems();
        const currentItem = renderItems.find((item) => item.renderId === renderId);
        if (!currentItem) return;

        const sideItems = sortMobileRenderItems(
          renderItems.filter((item) => item.side === currentItem.side)
        );
        const currentIndex = sideItems.findIndex((item) => item.renderId === renderId);
        const targetIndex =
          direction === 'up' ? currentIndex - 1 :
          direction === 'down' ? currentIndex + 1 :
          currentIndex;

        if (currentIndex === -1 || targetIndex < 0 || targetIndex >= sideItems.length) {
          return;
        }

        [sideItems[currentIndex], sideItems[targetIndex]] =
          [sideItems[targetIndex], sideItems[currentIndex]];

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
          (widget, index, list) => list.findIndex((item) => item.id === widget.id) === index
        );
        const saveResults = await Promise.all(
          uniqueChangedWidgets.map((item) =>
            saveWidgetToSupabase(item, {
              recordHistory: false,
              suppressErrorMessage: true
            })
          )
        );

        if (saveResults.some((didSave) => !didSave)) {
          showMessage('could not save widget order');
        }
      }

      async function moveWidgetInMobileOrder(widgetId, direction) {
        if (isMobileLayoutActive()) {
          await moveMobileWidgetInOrder(widgetId, direction);
          return;
        }

        const widget = widgets.find((item) => item.id === widgetId);
        if (!widget) return;

        const side = widget.side === 'right' ? 'right' : 'left';
        const orderedWidgets = getWidgetsForSideInMobileOrder(side);
        const currentIndex = orderedWidgets.findIndex((item) => item.id === widgetId);
        const targetIndex =
          direction === 'up' ? currentIndex - 1 :
          direction === 'down' ? currentIndex + 1 :
          currentIndex;

        if (currentIndex === -1 || targetIndex < 0 || targetIndex >= orderedWidgets.length) {
          return;
        }

        [orderedWidgets[currentIndex], orderedWidgets[targetIndex]] =
          [orderedWidgets[targetIndex], orderedWidgets[currentIndex]];

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
              suppressErrorMessage: true
            })
          )
        );

        if (saveResults.some((didSave) => !didSave)) {
          showMessage('could not save widget order');
        }
      }

      normalizeWidgetMobileOrders(widgets);

      let posts = [];
      let personalStickers = [];
      let placedStickers = [];
let notifications = [];
let activeSticker = null;
let dragWidget = null;
let draggingPlacedSticker = null;
let knownProfiles = [];
const visibleGifStickerControlTimers = new Map();
const minimizedWidgetIds = new Set();
const previousMobileWidgetRects = new Map();
let allWidgetsHidden = false;
let missYouSaveInFlight = false;
let missYouSaveQueued = false;
       let currentCommentsPostId = null;
       let replyingToCommentId = null;
       let editingWidgetId = null;
       let editingPostId = null;
       let pendingWidgetDrag = null;
       let commentLikesEnabled = true;
       let currentUser = null;
       let entryQuill = null;
       const pendingPostLikeIds = new Set();
       const pendingWidgetLikeIds = new Set();

       const floatingDecorEl = document.getElementById('floatingDecor');
       const leftZone = document.getElementById('leftZone');
const rightZone = document.getElementById('rightZone');
const timelineEl = document.getElementById('timeline');
      const mobileViewSwitcher = document.getElementById('mobileViewSwitcher');
      const mobileViewButtons = Array.from(document.querySelectorAll('[data-mobile-view]'));
      const launchSplash = document.getElementById('launchSplash');
      const stickerPopup = document.getElementById('stickerPopup');
      const stickerTabs = document.getElementById('stickerTabs');
      const stickerInput = document.getElementById('stickerInput');
      const typedStickerPreviewWrap = document.getElementById('typedStickerPreviewWrap');
      const typedStickerPreview = document.getElementById('typedStickerPreview');
      const emojiPickerGrid = document.getElementById('emojiPickerGrid');
      const gifPickerGrid = document.getElementById('gifPickerGrid');
      const gifSearchInput = document.getElementById('gifSearchInput');
      const gifSearchBtn = document.getElementById('gifSearchBtn');
       const gifSearchStatus = document.getElementById('gifSearchStatus');
       const closeStickerPopup = document.getElementById('closeStickerPopup');
      const toggleWidgetsBtn = document.getElementById('toggleWidgetsBtn');
       const appToolbar = document.getElementById('appToolbar');
      const newEntryBtn = document.getElementById('newEntryBtn');
      const notificationsMenu = document.getElementById('notificationsMenu');
      const notificationsBtn = document.getElementById('notificationsBtn');
      const notificationsBadge = document.getElementById('notificationsBadge');
      const notificationsPanel = document.getElementById('notificationsPanel');
      const notificationsList = document.getElementById('notificationsList');
      const markAllReadBtn = document.getElementById('markAllReadBtn');
      const clearNotificationsBtn = document.getElementById('clearNotificationsBtn');
       const themeToggle = document.getElementById('themeToggle');
       const entryPopup = document.getElementById('entryPopup');
       const entryPopupTitle = entryPopup?.querySelector('.popup-title');
       const entryPopupLabel = entryPopup?.querySelector('.popup-label');
       const closeEntryPopup = document.getElementById('closeEntryPopup');
      const entryEditor = document.getElementById('entryEditor');
      const entryContentFallback = document.getElementById('entryContentFallback');
      const entryImageInput = document.getElementById('entryImageInput');
      const entryImageData = document.getElementById('entryImageData');
      const entryImagePreview = document.getElementById('entryImagePreview');
      const removeEntryImageBtn = document.getElementById('removeEntryImageBtn');
      const saveEntryBtn = document.getElementById('saveEntryBtn');
       const commentsPopup = document.getElementById('commentsPopup');
       const closeCommentsPopup = document.getElementById('closeCommentsPopup');
       const commentsList = document.getElementById('commentsList');
       const commentInput = document.getElementById('commentInput');
      const saveCommentBtn = document.getElementById('saveCommentBtn');
      const replyingToLabel = document.getElementById('replyingToLabel');
      const widgetPopup = document.getElementById('widgetPopup');
      const closeWidgetPopup = document.getElementById('closeWidgetPopup');
      const widgetPopupTitle = document.getElementById('widgetPopupTitle');
      const headerSaveWidgetBtn = document.getElementById('headerSaveWidgetBtn');
      const widgetPopupLikeBtn = document.getElementById('widgetPopupLikeBtn');
       const widgetEditorFields = document.getElementById('widgetEditorFields');
       const saveWidgetBtn = document.getElementById('saveWidgetBtn');
      const clearWidgetHistoryBtn = document.getElementById('clearWidgetHistoryBtn');
      let lastScrollY = window.scrollY || 0;
      const MOBILE_VIEW_STORAGE_KEY = 'ourMemoriesMobileView';
      const BOOT_SPLASH_MIN_MS = 2000;
      const BOOT_SPLASH_FADE_MS = 450;
      const bootStartedAt = typeof performance !== 'undefined' ? performance.now() : Date.now();
      let activeMobileView = 'timeline';
      let wasMobileLayoutActive = isMobileLayoutActive();
      let mobileViewTransitionTimer = null;
      let mobileViewTransitionId = 0;

      function normalizeChromeSymbols() {
        const brandIconsEl = document.querySelector('.brand-icons');
        if (brandIconsEl) {
          brandIconsEl.innerHTML = `
            <span aria-hidden="true">♡</span>
            <span aria-hidden="true">✦</span>
            <span aria-hidden="true">🎀</span>
          `;
        }

        const siteTitleEl = document.querySelector('.site-title');
        if (siteTitleEl) {
          siteTitleEl.textContent = 'our memories ♡';
        }

        const quotePillEl = document.querySelector('.quote-pill');
        if (quotePillEl) {
          quotePillEl.textContent = 'forever and always ♡';
        }

        const notificationsIconEl = document.querySelector('.notifications-btn-icon');
        if (notificationsIconEl) {
          notificationsIconEl.textContent = '🕭';
        }

        const notificationTitleEl = document.querySelector('.notifications-title');
        if (notificationTitleEl) {
          notificationTitleEl.textContent = 'inbox ♡';
        }

        const profileTitleEl = document.querySelector('#profilePopup .popup-title');
        if (profileTitleEl) {
          profileTitleEl.textContent = 'my profile ♡';
        }

        if (entryPopupTitle) {
          entryPopupTitle.textContent = 'new entry ✎';
        }

        if (entryPopupLabel) {
          entryPopupLabel.textContent = 'write something ♡';
        }

        const commentsTitleEl = document.querySelector('#commentsPopup .popup-title');
        if (commentsTitleEl) {
          commentsTitleEl.textContent = 'comments ♡';
        }

        const stickerTitleEl = document.querySelector('#stickerPopup .popup-title');
        if (stickerTitleEl) {
          stickerTitleEl.textContent = '✦ sticker box ♡';
        }
      }

      function setHeaderWidgetSaveVisibility(isVisible) {
        if (!headerSaveWidgetBtn) return;
        headerSaveWidgetBtn.hidden = !isVisible;
        headerSaveWidgetBtn.style.display = isVisible ? 'inline-flex' : 'none';
      }

      function setWidgetPopupLikeButton(widget = null) {
        if (!widgetPopupLikeBtn) return;

        const shouldShow = Boolean(widget && isLikeableWidget(widget));
        widgetPopupLikeBtn.hidden = !shouldShow;
        widgetPopupLikeBtn.style.display = shouldShow ? 'inline-flex' : 'none';

        if (!shouldShow) {
          widgetPopupLikeBtn.removeAttribute('data-widget-like-id');
          widgetPopupLikeBtn.innerHTML = '';
          widgetPopupLikeBtn.classList.remove('liked', 'is-pending');
          widgetPopupLikeBtn.setAttribute('aria-label', 'like widget');
          widgetPopupLikeBtn.setAttribute('aria-pressed', 'false');
          return;
        }

        widgetPopupLikeBtn.dataset.widgetLikeId = widget.id;
        syncWidgetLikeButton(widget.id);
      }

      function isMobileLayoutActive() {
        return window.matchMedia('(max-width: 720px)').matches;
      }

      function shouldUseLaunchSplash() {
        return window.matchMedia('(max-width: 720px)').matches;
      }

      function syncMobileViewButtons() {
        mobileViewButtons.forEach((button) => {
          const isActive = button.dataset.mobileView === activeMobileView;
          button.classList.toggle('active', isActive);
          button.setAttribute('aria-pressed', String(isActive));
        });
      }

      function getMobileViewSection(view) {
        if (view === 'left') return leftZone;
        if (view === 'right') return rightZone;
        return timelineEl;
      }

      function canAnimateMobileViewTransition() {
        return (
          isMobileLayoutActive() &&
          !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        );
      }

      function animateMobileViewTransition(nextView, previousView, previousHeight = 0) {
        if (!canAnimateMobileViewTransition()) {
          applyMobileView();
          return;
        }

        const layoutEl = document.querySelector('.layout');
        const previousSection = getMobileViewSection(previousView);
        const nextSection = getMobileViewSection(nextView);
        if (!nextSection) return;
        const transitionId = ++mobileViewTransitionId;

        if (mobileViewTransitionTimer) {
          window.clearTimeout(mobileViewTransitionTimer);
          mobileViewTransitionTimer = null;
        }

        [timelineEl, leftZone, rightZone].forEach((section) => {
          section?.getAnimations?.().forEach((animation) => animation.cancel());
        });

        const viewOrder = ['left', 'timeline', 'right'];
        const nextIndex = viewOrder.indexOf(nextView);
        const previousIndex = viewOrder.indexOf(previousView);
        const direction = nextIndex >= previousIndex ? 1 : -1;
        const nextHeight = nextSection.scrollHeight || nextSection.getBoundingClientRect().height || previousHeight;

        if (layoutEl) {
          layoutEl.classList.add('mobile-view-transitioning');
          if (previousHeight) {
            layoutEl.style.minHeight = `${Math.round(previousHeight)}px`;
          }
        }

        const finishTransition = () => {
          if (transitionId !== mobileViewTransitionId) return;

          applyMobileView();

          requestAnimationFrame(() => {
            if (transitionId !== mobileViewTransitionId) return;

            const renderedNextHeight = nextSection.getBoundingClientRect().height || nextHeight;
            if (layoutEl && renderedNextHeight) {
              layoutEl.style.minHeight = `${Math.round(renderedNextHeight)}px`;
            }

            nextSection.animate(
              [
                {
                  opacity: 0,
                  transform: `translate3d(${direction * 8}px, 6px, 0) scale(0.996)`
                },
                {
                  opacity: 1,
                  transform: 'translate3d(0, 0, 0) scale(1)'
                }
              ],
              {
                duration: 240,
                easing: 'cubic-bezier(0.2, 0, 0, 1)'
              }
            );

            mobileViewTransitionTimer = window.setTimeout(() => {
              if (transitionId !== mobileViewTransitionId) return;
              layoutEl?.classList.remove('mobile-view-transitioning');
              if (layoutEl) {
                layoutEl.style.minHeight = '';
              }
              mobileViewTransitionTimer = null;
            }, 260);
          });
        };

        if (!previousSection || previousSection === nextSection) {
          finishTransition();
          return;
        }

        const outAnimation = previousSection.animate(
          [
            {
              opacity: 1,
              transform: 'translate3d(0, 0, 0) scale(1)'
            },
            {
              opacity: 0,
              transform: `translate3d(${direction * -6}px, -4px, 0) scale(0.998)`
            }
          ],
          {
            duration: 110,
            easing: 'cubic-bezier(0.4, 0, 1, 1)',
            fill: 'forwards'
          }
        );

        outAnimation.finished.then(finishTransition).catch(finishTransition);
      }

      function applyMobileView() {
        const pageEl = document.querySelector('.page');
        if (!pageEl) return;

        pageEl.dataset.mobileView = activeMobileView;
        syncMobileViewButtons();
      }

      function setMobileView(nextView, options = {}) {
        const { persist = true } = options;
        const allowedViews = new Set(['timeline', 'left', 'right']);
        const pageEl = document.querySelector('.page');
        const visibleView = pageEl?.dataset.mobileView;
        const previousView = allowedViews.has(visibleView) ? visibleView : activeMobileView;
        const previousHeight =
          isMobileLayoutActive()
            ? getMobileViewSection(previousView)?.getBoundingClientRect().height || 0
            : 0;
        activeMobileView = allowedViews.has(nextView) ? nextView : 'timeline';
        if (activeMobileView !== previousView && canAnimateMobileViewTransition()) {
          syncMobileViewButtons();
          animateMobileViewTransition(activeMobileView, previousView, previousHeight);
        } else {
          mobileViewTransitionId += 1;
          if (mobileViewTransitionTimer) {
            window.clearTimeout(mobileViewTransitionTimer);
            mobileViewTransitionTimer = null;
          }
          const layoutEl = document.querySelector('.layout');
          layoutEl?.classList.remove('mobile-view-transitioning');
          if (layoutEl) {
            layoutEl.style.minHeight = '';
          }
          applyMobileView();
        }

        if (!persist) return;

        try {
          localStorage.setItem(MOBILE_VIEW_STORAGE_KEY, activeMobileView);
        } catch (error) {
          console.error(error);
        }
      }

      function syncMobileViewSwitcherVisibility() {
        if (!mobileViewSwitcher) return;

        const isMobile = isMobileLayoutActive();
        const layoutChanged = isMobile !== wasMobileLayoutActive;
        wasMobileLayoutActive = isMobile;
        mobileViewSwitcher.hidden = !isMobile;

        if (!isMobile) {
          const pageEl = document.querySelector('.page');
          if (pageEl) {
            pageEl.dataset.mobileView = 'all';
          }
        } else {
          applyMobileView();
        }

        if (layoutChanged && currentUser) {
          renderWidgets();
        }
      }

       function setTheme(theme) {
         const nextTheme = theme === 'dark' ? 'dark' : 'light';
         document.documentElement.dataset.theme = nextTheme;

         if (themeToggle) {
           const isDark = nextTheme === 'dark';
           themeToggle.classList.toggle('active', isDark);
           themeToggle.setAttribute('aria-pressed', String(isDark));
           themeToggle.setAttribute(
             'aria-label',
             isDark ? 'switch to light mode' : 'switch to dark mode'
           );
           const icon = themeToggle.querySelector('.theme-toggle-icon');
           if (icon) icon.textContent = isDark ? '☀' : '☾';
         }
       }

      function toggleTheme() {
        const currentTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);

         try {
           localStorage.setItem('ourMemoriesTheme', nextTheme);
         } catch (error) {
         console.error(error);
        }
      }

      function updateFloatingEntryButtonVisibility() {
        if (!newEntryBtn) return;

        const currentScrollY = window.scrollY || 0;
        const scrollDelta = currentScrollY - lastScrollY;
        const shouldHide =
          currentScrollY > 140 &&
          scrollDelta > 8 &&
          !entryPopup?.classList.contains('open');

        if (shouldHide) {
          newEntryBtn.classList.add('is-hidden');
        } else if (scrollDelta < -8 || currentScrollY <= 80 || entryPopup?.classList.contains('open')) {
          newEntryBtn.classList.remove('is-hidden');
        }

        lastScrollY = currentScrollY;
      }

      function isGifSticker(value) {
        const normalizedValue = String(value || '').trim().toLowerCase();
        return normalizedValue.startsWith('http') && normalizedValue.includes('.gif');
      }

      function createStickerVisual(value, options = {}) {
        const { forGrid = false, size = DEFAULT_GIF_STICKER_SIZE } = options;

        if (isGifSticker(value)) {
          const media = document.createElement('img');
          media.className = forGrid ? 'sticker-pill-media' : 'reaction-sticker-media';
          media.src = value;
          media.alt = 'gif sticker';
          media.loading = 'lazy';
          media.draggable = false;
          if (!forGrid) {
            media.style.width = `${size}px`;
            media.style.height = `${size}px`;
          }
          return media;
        }

        const text = document.createElement('span');
        text.className = 'reaction-sticker-emoji';
        text.textContent = value;
        return text;
      }

      function setGifSearchStatus(message) {
        if (gifSearchStatus) {
          gifSearchStatus.textContent = message;
        }
      }

      function escapeQueryParam(value) {
        return encodeURIComponent(String(value || '').trim());
      }

      function getGiphyStickerUrl(gifObject) {
        return (
          gifObject?.images?.fixed_height?.url ||
          gifObject?.images?.downsized?.url ||
          gifObject?.images?.original?.url ||
          ''
        );
      }

      function getRecentGifStickers() {
        try {
          const raw = localStorage.getItem(RECENT_GIF_STORAGE_KEY);
          const parsed = JSON.parse(raw || '[]');
          return Array.isArray(parsed) ? parsed.filter((item) => item?.url) : [];
        } catch (error) {
          console.error(error);
          return [];
        }
      }

      function saveRecentGifSticker(gifItem) {
        if (!gifItem?.url) return;

        try {
          const nextItems = [
            gifItem,
            ...getRecentGifStickers().filter((item) => item.url !== gifItem.url)
          ].slice(0, 6);
          localStorage.setItem(RECENT_GIF_STORAGE_KEY, JSON.stringify(nextItems));
        } catch (error) {
          console.error(error);
        }
      }

      function getPlacedGifSizeMap() {
        try {
          const raw = localStorage.getItem(PLACED_GIF_SIZE_STORAGE_KEY);
          const parsed = JSON.parse(raw || '{}');
          return parsed && typeof parsed === 'object' ? parsed : {};
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
          sizeMap[stickerId] = Math.max(MIN_GIF_STICKER_SIZE, Math.min(MAX_GIF_STICKER_SIZE, Math.round(size)));
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
          const parsed = JSON.parse(raw || '{}');
          return parsed && typeof parsed === 'object' ? parsed : {};
        } catch (error) {
          console.error(error);
          return {};
        }
      }

      function getSavedPlacedStickerPosition(stickerId) {
        if (!stickerId) return null;
        const positionMap = getPlacedStickerPositionMap();
        const savedPosition = positionMap[stickerId];
        if (!savedPosition || typeof savedPosition !== 'object') return null;

        const x = Number(savedPosition.x);
        const y = Number(savedPosition.y);
        if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

        return {
          x: clampStickerPercent(x),
          y: clampStickerPercent(y)
        };
      }

      function savePlacedStickerPosition(stickerId, x, y) {
        if (!stickerId) return;

        try {
          const positionMap = getPlacedStickerPositionMap();
          positionMap[stickerId] = {
            x: clampStickerPercent(x),
            y: clampStickerPercent(y)
          };
          localStorage.setItem(PLACED_STICKER_POSITION_STORAGE_KEY, JSON.stringify(positionMap));
        } catch (error) {
          console.error(error);
        }
      }

      function clearPlacedStickerPosition(stickerId) {
        if (!stickerId) return;

        try {
          const positionMap = getPlacedStickerPositionMap();
          delete positionMap[stickerId];
          localStorage.setItem(PLACED_STICKER_POSITION_STORAGE_KEY, JSON.stringify(positionMap));
        } catch (error) {
          console.error(error);
        }
      }

      function isPercentStickerPosition(item) {
        const x = Number(item?.x);
        const y = Number(item?.y);
        return Number.isFinite(x) && Number.isFinite(y) && x >= 0 && x <= 100 && y >= 0 && y <= 100;
      }

      function getStickerPositionFromPointer(event, layer, stickerRadius = 16) {
        const rect = layer.getBoundingClientRect();
        const xPx = Math.max(stickerRadius, Math.min(rect.width - stickerRadius, event.clientX - rect.left));
        const yPx = Math.max(stickerRadius, Math.min(rect.height - stickerRadius, event.clientY - rect.top));

        return {
          x: Math.round((xPx / rect.width) * 100),
          y: Math.round((yPx / rect.height) * 100),
          xPx: Math.round(xPx),
          yPx: Math.round(yPx),
          rect
        };
      }

       function escapeHtml(value) {
         return String(value || '')
           .replaceAll('&', '&amp;')
           .replaceAll('<', '&lt;')
           .replaceAll('>', '&gt;')
           .replaceAll('"', '&quot;')
           .replaceAll("'", '&#39;');
       }

function normalizeHexColor(value, fallback = '#ffffff') {
  const fallbackHex = String(fallback || '#ffffff').trim().toLowerCase();
  const raw = String(value || '').trim();
  const matchThree = raw.match(/^#?([0-9a-fA-F]{3})$/);
  if (matchThree) {
    const [r, g, b] = matchThree[1].toLowerCase().split('');
    return `#${r}${r}${g}${g}${b}${b}`;
  }

  const matchSix = raw.match(/^#?([0-9a-fA-F]{6})$/);
  if (matchSix) {
    return `#${matchSix[1].toLowerCase()}`;
  }

  return /^#[0-9a-f]{6}$/.test(fallbackHex) ? fallbackHex : '#ffffff';
}

       function looksLikeHtml(value) {
         return /<\/?[a-z][\w:-]*(?:\s[^<>]*?)?>/i.test(String(value || ''));
       }

       function sanitizePostHtml(html) {
         if (window.DOMPurify?.sanitize) {
           return window.DOMPurify.sanitize(String(html || ''), {
             USE_PROFILES: { html: true },
             ADD_ATTR: ['style', 'class', 'target', 'rel'],
             FORBID_TAGS: ['style', 'script']
           });
         }

         return String(html || '');
       }

      function toSafeHtmlFromPlainText(text) {
         return sanitizePostHtml(escapeHtml(text).replaceAll('\n', '<br>'));
       }

      function decodeHtmlEntities(value) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = String(value || '');
        return textarea.value;
      }

      function decodeStoredHtml(value, maxPasses = 4) {
        let currentValue = String(value || '');

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
        const template = document.createElement('template');
        template.innerHTML = String(html || '');
        const allowedLiteralTagPattern = /<\/?(?:p|h[1-6]|strong|em|u|blockquote|ul|ol|li|figure|img|br|a|span)\b/i;
        const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_TEXT);
        const textNodes = [];

        while (walker.nextNode()) {
          textNodes.push(walker.currentNode);
        }

        textNodes.forEach((textNode) => {
          const rawText = String(textNode.textContent || '');
          if (!allowedLiteralTagPattern.test(rawText) || !rawText.includes('<')) {
            return;
          }

          const revivedHtml = sanitizePostHtml(rawText);
          if (!looksLikeHtml(revivedHtml)) {
            return;
          }

          const fragmentTemplate = document.createElement('template');
          fragmentTemplate.innerHTML = revivedHtml;
          textNode.replaceWith(fragmentTemplate.content.cloneNode(true));
        });

        return template.innerHTML;
      }

      function isInlineImageDataUrl(value) {
        return /^data:image\/[a-zA-Z0-9.+-]+;base64,/i.test(String(value || '').trim());
      }

      async function uploadEntryImageData(userId, imageDataUrl) {
        const normalizedImage = String(imageDataUrl || '').trim();
        if (!userId || !isInlineImageDataUrl(normalizedImage)) {
          return normalizedImage;
        }

        const response = await fetch(normalizedImage);
        const blob = await response.blob();
        const extension = blob.type === 'image/png' ? 'png' : 'jpg';
        const filePath = `${userId}/entry-images/${Date.now()}-${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)}.${extension}`;

        const { error: uploadError } = await supabaseClient.storage
          .from(ENTRY_IMAGE_BUCKET)
          .upload(filePath, blob, {
            contentType: blob.type || 'image/jpeg'
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
        const template = document.createElement('template');
        template.innerHTML = sanitizePostHtml(String(content || ''));
        const attachmentImage = template.content.querySelector('img.entry-attachment-image');
        const image = attachmentImage?.getAttribute('src') || '';
        attachmentImage?.closest('.entry-attachment')?.remove();
        return {
          content: template.innerHTML.trim(),
          image
        };
      }

      function composeEntryContentWithAttachment(content, image) {
        const normalizedContent = sanitizePostHtml(String(content || '')).trim();
        const normalizedImage = String(image || '').trim();

        if (!normalizedImage) {
          return normalizedContent;
        }

        const attachmentHtml = `
          <figure class="entry-attachment">
            <img class="entry-attachment-image" src="${escapeHtml(normalizedImage)}" alt="entry attachment" loading="lazy" decoding="async" />
          </figure>
        `;

        return normalizedContent ? `${normalizedContent}${attachmentHtml}` : attachmentHtml;
      }

      function renderEntryImagePreview(image) {
        if (!entryImagePreview || !removeEntryImageBtn || !entryImageData) return;

        const normalizedImage = String(image || '').trim();
        entryImageData.value = normalizedImage;
        entryImagePreview.hidden = !normalizedImage;
        removeEntryImageBtn.hidden = !normalizedImage;
        entryImagePreview.innerHTML = normalizedImage
          ? `<img src="${escapeHtml(normalizedImage)}" alt="entry attachment preview" />`
          : '';
      }

      function compressImageFile(file, options = {}) {
        const { maxSize = 900, quality = 0.82 } = options;

        return new Promise((resolve, reject) => {
          if (!file) {
            resolve('');
            return;
          }

          const reader = new FileReader();
          reader.onerror = () => reject(reader.error || new Error('could not read image'));
          reader.onload = () => {
            const image = new Image();
            image.onerror = () => reject(new Error('could not load image'));
            image.onload = () => {
              const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
              const width = Math.max(1, Math.round(image.width * scale));
              const height = Math.max(1, Math.round(image.height * scale));
              const canvas = document.createElement('canvas');
              canvas.width = width;
              canvas.height = height;
              const context = canvas.getContext('2d');
              context.drawImage(image, 0, 0, width, height);
              resolve(canvas.toDataURL('image/jpeg', quality));
            };
            image.src = reader.result;
          };
          reader.readAsDataURL(file);
        });
      }

      function getPostDisplayHtml(content) {
        const value = String(content || '');
        if (!value) return '';

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

        postTextEl.querySelectorAll('a[href]').forEach((link) => {
          urls.add(link.href);
        });

        return [...urls];
      }

      function getYouTubeVideoId(url) {
        try {
          const parsedUrl = new URL(url);
          const host = parsedUrl.hostname.replace(/^www\./, '');

          if (host === 'youtu.be') {
            return parsedUrl.pathname.split('/').filter(Boolean)[0] || '';
          }

          if (!['youtube.com', 'm.youtube.com', 'music.youtube.com'].includes(host)) {
            return '';
          }

          if (parsedUrl.pathname === '/watch') {
            return parsedUrl.searchParams.get('v') || '';
          }

          const parts = parsedUrl.pathname.split('/').filter(Boolean);
          if (['embed', 'shorts', 'live'].includes(parts[0])) {
            return parts[1] || '';
          }
        } catch {
          return '';
        }

        return '';
      }

      function createYouTubePreview(videoId, sourceUrl) {
        const preview = document.createElement('a');
        preview.className = 'link-preview youtube-preview';
        preview.href = sourceUrl;
        preview.target = '_blank';
        preview.rel = 'noopener noreferrer';

        const thumbnail = document.createElement('img');
        thumbnail.className = 'youtube-preview-thumb';
        thumbnail.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        thumbnail.alt = 'YouTube video preview';
        thumbnail.loading = 'lazy';

        const play = document.createElement('span');
        play.className = 'youtube-preview-play';
        play.textContent = '▶';

        const label = document.createElement('span');
        label.className = 'youtube-preview-label';
        label.textContent = 'Watch on YouTube';

        preview.append(thumbnail, play, label);
        return preview;
      }

      function renderLinkPreviews(postTextEl, previewContainer) {
        if (!previewContainer) return;

        previewContainer.innerHTML = '';
        const seenVideos = new Set();
        const previews = getUrlsFromPostText(postTextEl)
          .map((url) => ({
            url,
            videoId: getYouTubeVideoId(url)
          }))
          .filter((item) => item.videoId && !seenVideos.has(item.videoId))
          .slice(0, 3);

        previews.forEach((item) => {
          seenVideos.add(item.videoId);
          previewContainer.appendChild(createYouTubePreview(item.videoId, item.url));
        });

        previewContainer.hidden = previews.length === 0;
      }

      function htmlToPlainText(html) {
         const container = document.createElement('div');
         container.innerHTML = sanitizePostHtml(html);
         return (container.textContent || '').replace(/\u00a0/g, ' ');
       }

       function initEntryEditor() {
         if (!entryEditor) return;

         if (!window.Quill || !window.DOMPurify?.sanitize) {
           document.body.classList.add('no-quill');
           entryQuill = null;
           return;
         }

         document.body.classList.remove('no-quill');

         entryQuill = new window.Quill(entryEditor, {
           theme: 'snow',
          placeholder: 'write something ♡',
          modules: {
            toolbar: [
              [{ font: [] }],
              [{ header: [false, 2, 3] }],
              ['bold', 'italic', 'underline'],
              [{ color: [] }, { background: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['blockquote'],
              ['link'],
              ['clean']
            ]
           }
         });
       }

       function clearEntryComposer() {
         if (entryQuill) {
           entryQuill.setContents([]);
         } else if (entryContentFallback) {
           entryContentFallback.value = '';
         }

         if (entryImageInput) {
           entryImageInput.value = '';
         }

         renderEntryImagePreview('');
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
         const { content: textContent, image } = extractEntryAttachment(getPostDisplayHtml(content));
         const html = textContent;

         if (entryQuill) {
           entryQuill.clipboard.dangerouslyPasteHTML(html || '');
         } else if (entryContentFallback) {
           entryContentFallback.value = htmlToPlainText(html);
         }

         if (entryImageInput) {
           entryImageInput.value = '';
         }

         renderEntryImagePreview(image);
       }

      function renderDecor() {
         floatingDecorEl.innerHTML = '';
       floatingDecor.forEach((item) => {
         const node = document.createElement('div');
          node.className = 'decor';
          node.textContent = item.icon;
          node.style.top = item.top;
          if (item.left) node.style.left = item.left;
          if (item.right) node.style.right = item.right;
          node.style.fontSize = item.size;
          node.style.animationDelay = item.delay;
          floatingDecorEl.appendChild(node);
        });

        sparkleDecor.forEach((item) => {
          const node = document.createElement('div');
          node.className = 'decor sparkle-decor';
          node.textContent = item.icon;
          node.style.top = item.top;
          node.style.left = item.left;
          node.style.fontSize = item.size;
          node.style.animationDelay = item.delay;
          node.style.animationDuration = item.duration;
          floatingDecorEl.appendChild(node);
        });
      }

      function getWishlistItemsInDisplayOrder(items = []) {
  return [...items]
    .map((item, index) => ({
      ...item,
      order: Number.isFinite(item?.order) ? item.order : index
    }))
    .sort((a, b) => a.order - b.order);
}

      function getNextWishlistOrder(items = []) {
  return items.reduce((maxOrder, item, index) => {
    const itemOrder = Number.isFinite(item?.order) ? item.order : index;
    return Math.max(maxOrder, itemOrder);
  }, -1) + 1;
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
    0: isDay ? 'clear sky' : 'clear night',
    1: isDay ? 'mostly sunny' : 'mostly clear',
    2: 'partly cloudy',
    3: 'overcast',
    45: 'foggy',
    48: 'rime fog',
    51: 'light drizzle',
    53: 'drizzle',
    55: 'heavy drizzle',
    56: 'freezing drizzle',
    57: 'heavy freezing drizzle',
    61: 'light rain',
    63: 'rain',
    65: 'heavy rain',
    66: 'freezing rain',
    67: 'heavy freezing rain',
    71: 'light snow',
    73: 'snow',
    75: 'heavy snow',
    77: 'snow grains',
    80: 'rain showers',
    81: 'heavy showers',
    82: 'violent showers',
    85: 'snow showers',
    86: 'heavy snow showers',
    95: 'thunderstorm',
    96: 'storm with hail',
    99: 'heavy hail storm'
  };

  return weatherMap[weatherCode] || 'weather update';
}

function getWeatherWidget() {
  return widgets.find((widget) => String(widget.id || '').toLowerCase().trim() === 'weather');
}

function getMissYouWidget() {
  return widgets.find((widget) => String(widget.id || '').toLowerCase().trim() === 'miss-you');
}

function getTodayDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDurationLabel(durationMs) {
  const totalSeconds = Math.max(0, Math.round((Number(durationMs) || 0) / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function getSongWidget() {
  return widgets.find((widget) => String(widget.id || '').toLowerCase().trim() === 'song');
}

function normalizeSpotifyTrackUrl(value) {
  const rawValue = String(value || '').trim();
  if (!rawValue) return null;

  const spotifyUriMatch = rawValue.match(/^spotify:track:([a-zA-Z0-9]+)$/i);
  if (spotifyUriMatch) {
    const trackId = spotifyUriMatch[1];
    return {
      trackId,
      spotifyUrl: `https://open.spotify.com/track/${trackId}`,
      spotifyUri: `spotify:track:${trackId}`
    };
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(rawValue);
  } catch (error) {
    return null;
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
  const trackIndex = pathParts.findIndex((part) => part.toLowerCase() === 'track');

  if (hostname === 'spotify.link') {
    return {
      trackId: '',
      spotifyUrl: parsedUrl.toString(),
      spotifyUri: ''
    };
  }

  if (
    hostname !== 'open.spotify.com' ||
    trackIndex === -1 ||
    !pathParts[trackIndex + 1]
  ) {
    return null;
  }

  const trackId = pathParts[trackIndex + 1];
  return {
    trackId,
    spotifyUrl: `https://open.spotify.com/track/${trackId}`,
    spotifyUri: `spotify:track:${trackId}`
  };
}

function normalizeSongWidget(widget) {
  if (!widget) return false;

  const rawData = widget.data && typeof widget.data === 'object' ? widget.data : {};
  let changed = widget.data !== rawData;
  const normalizedTrack = normalizeSpotifyTrackUrl(rawData.spotifyUrl || rawData.note || '');
  const accentValue = Number(rawData.accent);
  const durationLabel =
    typeof rawData.durationLabel === 'string' && rawData.durationLabel.trim()
      ? rawData.durationLabel.trim()
      : Number.isFinite(rawData.durationMs)
        ? formatDurationLabel(rawData.durationMs)
        : '';

  const nextData = {
    spotifyUrl: normalizedTrack?.spotifyUrl || (typeof rawData.spotifyUrl === 'string' ? rawData.spotifyUrl.trim() : ''),
    spotifyUri: normalizedTrack?.spotifyUri || (typeof rawData.spotifyUri === 'string' ? rawData.spotifyUri.trim() : ''),
    songName:
      typeof rawData.songName === 'string' && rawData.songName.trim()
        ? rawData.songName.trim()
        : typeof rawData.title === 'string'
          ? rawData.title.trim()
          : '',
    durationLabel,
    coverUrl:
      typeof rawData.coverUrl === 'string' && rawData.coverUrl.trim()
        ? rawData.coverUrl.trim()
        : typeof rawData.image === 'string'
          ? rawData.image.trim()
          : '',
    accent: Math.max(6, Math.min(94, Number.isFinite(accentValue) ? accentValue : 38))
  };

  const keysToKeep = ['spotifyUrl', 'spotifyUri', 'songName', 'durationLabel', 'coverUrl', 'accent'];
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
    throw new Error('please paste a Spotify track link ♡');
  }

  const response = await fetch(
    `https://open.spotify.com/oembed?url=${encodeURIComponent(normalizedTrack.spotifyUrl)}`
  );

  if (!response.ok) {
    throw new Error('could not fetch this Spotify track ♡');
  }

  const data = await response.json();
  const iframeUrl = String(data?.iframe_url || '');
  const isTrackEmbed = iframeUrl.includes('/embed/track/');
  const iframeTrackMatch = iframeUrl.match(/\/embed\/track\/([a-zA-Z0-9]+)/i);
  const iframeTrackId = iframeTrackMatch?.[1] || normalizedTrack.trackId || '';

  if (!isTrackEmbed) {
    throw new Error('that link is not a Spotify track ♡');
  }

  return {
    spotifyUrl: iframeTrackId ? `https://open.spotify.com/track/${iframeTrackId}` : normalizedTrack.spotifyUrl,
    spotifyUri: iframeTrackId ? `spotify:track:${iframeTrackId}` : normalizedTrack.spotifyUri,
    songName: String(data?.title || '').trim(),
    coverUrl: String(data?.thumbnail_url || '').trim(),
    durationLabel: '',
    accent: 38
  };
}

function normalizeMissYouWidget(widget) {
  if (!widget) return false;

  const todayKey = getTodayDateKey();
  if (!widget.data) {
    widget.data = { countsByUser: {}, lastResetDate: todayKey };
    return true;
  }

  let changed = false;

  if (!widget.data.countsByUser || typeof widget.data.countsByUser !== 'object') {
    const migratedCounts = {};
    const legacyCount = Number.isFinite(widget.data.count) ? widget.data.count : 0;
    const currentUserId = currentProfile?.id || currentUser?.id || '';

    if (legacyCount > 0 && currentUserId) {
      migratedCounts[currentUserId] = legacyCount;
    }

    widget.data.countsByUser = migratedCounts;
    changed = true;
  }

  if (widget.data.lastResetDate !== todayKey) {
    widget.data.countsByUser = {};
    widget.data.lastResetDate = todayKey;
    changed = true;
  }

  Object.keys(widget.data.countsByUser).forEach((userId) => {
    const count = widget.data.countsByUser[userId];
    if (!Number.isFinite(count) || count < 0) {
      widget.data.countsByUser[userId] = 0;
      changed = true;
    }
  });

  if ('count' in widget.data) {
    delete widget.data.count;
    changed = true;
  }

  return changed;
}

function isLikeableWidget(widget) {
  const normalizedId = String(widget?.id || '').toLowerCase().trim();
  const normalizedTitle = String(widget?.title || '').toLowerCase();

  return (
    normalizedId === 'note' ||
    normalizedTitle.includes('little note') ||
    normalizedId.startsWith('photo-pin') ||
    normalizedTitle.includes('pinned photo')
  );
}

function getWidgetLikeUserIds(widget) {
  const widgetData = widget?.data && typeof widget.data === 'object' ? widget.data : {};
  const rawLikes = Array.isArray(widgetData.likes)
    ? widgetData.likes
    : Array.isArray(widgetData.likedUserIds)
      ? widgetData.likedUserIds
      : [];

  return [...new Set(
    rawLikes
      .map((userId) => String(userId || '').trim())
      .filter(Boolean)
  )];
}

function normalizeWidgetLikesData(widget) {
  if (!widget || !isLikeableWidget(widget)) return false;

  const rawData = widget.data && typeof widget.data === 'object' ? widget.data : {};
  const normalizedLikes = getWidgetLikeUserIds({ data: rawData });
  const hadLegacyLikesKey = Object.prototype.hasOwnProperty.call(rawData, 'likedUserIds');
  const likesAlreadyNormalized =
    Array.isArray(rawData.likes) &&
    rawData.likes.length === normalizedLikes.length &&
    rawData.likes.every((userId, index) => String(userId || '').trim() === normalizedLikes[index]);

  if (widget.data === rawData && likesAlreadyNormalized && !hadLegacyLikesKey) {
    return false;
  }

  const nextData = {
    ...rawData,
    likes: normalizedLikes
  };
  delete nextData.likedUserIds;
  widget.data = nextData;
  return true;
}

function getLikeButtonMarkup(likedByMe, likesCount) {
  return `
    <span class="post-btn-icon" aria-hidden="true">${likedByMe ? '🩷' : '♡'}</span>
    <span class="post-btn-label">${likedByMe ? 'liked' : 'like'}</span>
    <span class="post-btn-count">(${likesCount || 0})</span>
  `;
}

function getWidgetLikeButtonMarkup(widget) {
  const currentUserId = currentUser?.id || currentProfile?.id || '';
  const likes = getWidgetLikeUserIds(widget);
  const likedByMe = Boolean(currentUserId && likes.includes(currentUserId));
  return `
    <span class="post-btn-icon" aria-hidden="true">${likedByMe ? '🩷' : '♡'}</span>
    <span class="post-btn-count">${likes.length || 0}</span>
  `;
}

function getWidgetLikeContentSignature(widget) {
  if (!widget || !isLikeableWidget(widget)) return '';

  const normalizedId = String(widget.id || '').toLowerCase().trim();
  const normalizedTitle = String(widget.title || '').toLowerCase();
  const data = widget.data && typeof widget.data === 'object' ? widget.data : {};

  if (normalizedId === 'note' || normalizedTitle.includes('little note')) {
    return JSON.stringify({
      text: data.text || ''
    });
  }

  return JSON.stringify({
    image: data.image || '',
    text: data.text || '',
    textColor: normalizeHexColor(data.textColor, '#ffffff'),
    textSize: Math.max(12, Math.min(46, Number(data.textSize) || 22)),
    textX: Math.max(0, Math.min(100, Number.isFinite(Number(data.textX)) ? Number(data.textX) : 50)),
    textY: Math.max(0, Math.min(100, Number.isFinite(Number(data.textY)) ? Number(data.textY) : 86)),
    rotate: Number(data.rotate) || 0
  });
}

function syncWidgetLikeButton(widgetId) {
  const widget = widgets.find((item) => item.id === widgetId);
  const buttons = Array.from(document.querySelectorAll(`.widget-like-btn[data-widget-like-id="${widgetId}"]`));

  if (!widget || !buttons.length || !isLikeableWidget(widget)) return;

  const currentUserId = currentUser?.id || currentProfile?.id || '';
  const likes = getWidgetLikeUserIds(widget);
  const likedByMe = Boolean(currentUserId && likes.includes(currentUserId));

  buttons.forEach((btn) => {
    btn.innerHTML = getWidgetLikeButtonMarkup(widget);
    btn.classList.toggle('liked', likedByMe);
    btn.classList.toggle('is-pending', pendingWidgetLikeIds.has(widgetId));
    btn.setAttribute('aria-label', likedByMe ? 'liked widget' : 'like widget');
    btn.setAttribute('aria-pressed', String(likedByMe));
  });
}

function getProfileDisplayName(profile, fallback) {
  if (!profile || typeof profile !== 'object') return fallback;
  const name = String(profile.nickname || profile.username || '').trim();
  return name || fallback;
}

function getMissYouCounterLabels() {
  const activeUserId = currentProfile?.id || currentUser?.id || '';
  const myLabel = getProfileDisplayName(currentProfile, 'mine');
  const otherProfile = knownProfiles.find((profile) => profile?.id && profile.id !== activeUserId);
  const herLabel = getProfileDisplayName(otherProfile, 'hers');

  return {
    myLabel: escapeHtml(myLabel),
    herLabel: escapeHtml(herLabel)
  };
}

async function incrementMissYouWidget() {
  const widget = getMissYouWidget();
  if (!widget) return;

  const activeUserId = currentProfile?.id || currentUser?.id;
  if (!activeUserId) return;

  normalizeMissYouWidget(widget);
  widget.data.countsByUser[activeUserId] = (widget.data.countsByUser[activeUserId] || 0) + 1;
  widget.data.lastResetDate = getTodayDateKey();

  renderWidgets();
  queueMissYouWidgetSave();
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
        suppressErrorMessage: true
      });
    } while (missYouSaveQueued);
  } finally {
    missYouSaveInFlight = false;
  }
}

async function refreshWeatherWidget(options = {}) {
  const { render = true } = options;
  const widget = getWeatherWidget();
  if (!widget) return;

  try {
    const locationWeather = await Promise.all(
      WEATHER_WIDGET_LOCATIONS.map(async (location) => {
        const response = await fetch(
          `${OPEN_METEO_FORECAST_ENDPOINT}?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&timezone=auto`
        );

        if (!response.ok) {
          throw new Error(`Weather request failed with ${response.status}`);
        }

        const payload = await response.json();
        const currentWeather = payload?.current;

        if (!currentWeather) {
          throw new Error('Weather data is unavailable right now.');
        }

        return {
          label: location.label,
          temperature: currentWeather.temperature_2m,
          apparentTemperature: currentWeather.apparent_temperature,
          weatherCode: currentWeather.weather_code,
          windSpeed: currentWeather.wind_speed_10m,
          isDay: Boolean(currentWeather.is_day)
        };
      })
    );

    widget.data = {
      ...(widget.data || {}),
      locations: locationWeather,
      fetchedAt: new Date().toISOString(),
      status: 'ready',
      error: ''
    };

    await saveWidgetToSupabase(widget, { recordHistory: false });
  } catch (error) {
    console.error(error);
    widget.data = {
      ...(widget.data || {}),
      status: 'error',
      error: 'weather unavailable'
    };
  }

  if (render) {
    renderWidgets();
  }
}

      function getWidgetContent(widget) {
  const normalizedId = String(widget.id || '').toLowerCase().trim();
  const normalizedTitle = String(widget.title || '').toLowerCase();

  const isDatesWidget =
    normalizedId === 'dates' || normalizedTitle.includes('important dates');

  if (normalizedId === 'song') {
    const songData = widget.data || {};
    const songName = escapeHtml(songData.songName || 'drop a spotify track into the widget editor ♡');
    const durationLabel = escapeHtml(songData.durationLabel || '--:--');
    const spotifyUrl = escapeHtml(songData.spotifyUrl || '');
    const coverUrl = escapeHtml(songData.coverUrl || '');
    const accent = Math.max(6, Math.min(94, Number(songData.accent) || 38));

    return `
      <div class="song-widget-card${coverUrl ? ' has-cover' : ''}">
        ${coverUrl
          ? `<img class="song-widget-cover" src="${coverUrl}" alt="Spotify cover art" loading="lazy" />`
          : '<div class="song-widget-art-placeholder">paste a Spotify track link to fill this card ♡</div>'}
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
        ${spotifyUrl
          ? `<a class="song-widget-link" href="${spotifyUrl}" target="_blank" rel="noreferrer noopener">open in spotify</a>`
          : ''}
      </div>
    `;
  }

  const isNoteWidget =
  normalizedId === 'note' || normalizedTitle.includes('little note');

if (isNoteWidget) {
  normalizeWidgetLikesData(widget);
  return `<div style="font-size:0.96rem;line-height:1.5;white-space:normal;word-break:break-word;overflow-wrap:anywhere;">${widget.data?.text || ''}</div>`;
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

  const html = sortedItems.map((item) => {
    const target = new Date(item.date);
    target.setHours(0, 0, 0, 0);

    const diffMs = target - today;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    let countdownText = '';
    if (diffDays > 0) {
      countdownText = `${diffDays} days left`;
    } else if (diffDays === 0) {
      countdownText = 'today ♡';
    } else {
      countdownText = `${Math.abs(diffDays)} days ago`;
    }

    return `
      <div style="padding:8px 0;border-bottom:1px solid rgba(241,221,232,0.7);">
        <div style="font-size:0.95rem;font-weight:700;">${item.title}</div>
        <div style="margin-top:4px;font-size:0.82rem;opacity:0.75;">${countdownText}</div>
      </div>
    `;
  }).join('');

  return `<div style="display:grid;gap:2px;">${html}</div>`;
}

if (normalizedId === 'wishlist' || normalizedTitle.includes('wishlist')) {
  const items = getWishlistItemsInDisplayOrder(widget.data?.items || []);
  const visibleItems = items.filter((item) => !item.done);

  if (!visibleItems.length) {
    return `<div style="font-size:0.92rem;opacity:0.75;">nothing on the wishlist yet ⋆˙⟡</div>`;
  }

  const html = visibleItems.map((item) => `
    <div class="widget-wishlist-row">
      <button
        class="widget-wish-toggle"
        type="button"
        data-widget-wish-id="${item.id}"
        aria-pressed="${item.done ? 'true' : 'false'}"
        aria-label="${item.done ? 'mark wishlist item incomplete' : 'mark wishlist item complete'}"
      >
        ${item.done ? '☑' : '☐'}
      </button>
      <div class="widget-wish-text${item.done ? ' is-done' : ''}">
        ${item.text}
      </div>
    </div>
  `).join('');

  return `<div class="widget-wishlist-list">${html}</div>`;
}

if (normalizedId === 'weather' || normalizedTitle.includes('current weather')) {
  const weatherData = widget.data || {};

  if (weatherData.status === 'error') {
    return `
      <div style="display:grid;gap:10px;">
        <div style="font-size:0.92rem;opacity:0.8;">weather unavailable right now ♡</div>
      </div>
    `;
  }

  if (weatherData.status !== 'ready') {
    return `
      <div style="display:grid;gap:10px;">
        <div style="font-size:0.92rem;opacity:0.8;">loading Kuwait and Dammam ♡</div>
      </div>
    `;
  }

  const updatedTime = weatherData.fetchedAt
    ? new Date(weatherData.fetchedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    : '';
  const locationHtml = (weatherData.locations || []).map((location) => {
    const conditionLabel = getWeatherDescription(location.weatherCode, location.isDay);

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
  }).join('');

  return `
    <div style="display:grid;gap:10px;">
      ${updatedTime ? `<div style="font-size:0.8rem;opacity:0.68;">updated ${updatedTime}</div>` : ''}
      <div style="display:grid;gap:2px;">${locationHtml}</div>
    </div>
  `;
}

if (normalizedId === 'miss-you' || normalizedTitle.includes('miss you counter')) {
  normalizeMissYouWidget(widget);
  const activeUserId = currentProfile?.id || currentUser?.id || '';
  const countsByUser = widget.data?.countsByUser || {};
  const myCount = activeUserId ? (countsByUser[activeUserId] || 0) : 0;
  const { myLabel, herLabel } = getMissYouCounterLabels();
  const herCount = Object.entries(countsByUser).reduce((total, [userId, count]) => {
    if (userId === activeUserId) return total;
    return total + (Number.isFinite(count) ? count : 0);
  }, 0);
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
        <button class="soft-btn widget-miss-you-btn" type="button" data-miss-you-widget-id="${widget.id}" ${isMineClickable ? '' : 'disabled'}>i miss you</button>
      </div>
    </div>
  `;
}

if (normalizedId === 'photo-pin' || normalizedTitle.includes('pinned photo')) {
  normalizeWidgetLikesData(widget);
  const photoData = widget.data || {};
  const overlayText = escapeHtml(photoData.text || '');
  const textColor = escapeHtml(photoData.textColor || '#ffffff');
  const textSize = Math.max(12, Math.min(46, Number(photoData.textSize) || 22));
  const textXValue = Number(photoData.textX);
  const textYValue = Number(photoData.textY);
  const textX = Math.max(0, Math.min(100, Number.isFinite(textXValue) ? textXValue : 50));
  const textY = Math.max(0, Math.min(100, Number.isFinite(textYValue) ? textYValue : 86));
  const rotate = Number(photoData.rotate) || 0;
  const imageStyle = `transform:rotate(${rotate}deg);`;

  if (!photoData.image) {
    return `
      <button class="soft-btn widget-photo-empty widget-miss-you-btn" type="button" data-photo-widget-id="${widget.id}">
        + pin photo
      </button>
    `;
  }

  return `
    <div class="widget-photo-card">
      <div class="widget-photo-frame">
        <img class="widget-photo-image" src="${photoData.image}" alt="pinned photo" style="${imageStyle}" />
        ${overlayText ? `<div class="widget-photo-text" style="left:${textX}%;top:${textY}%;color:${textColor};--photo-text-size:${textSize};">${overlayText}</div>` : ''}
      </div>
    </div>
  `;
}

  if (normalizedId === 'love') {
    const start = new Date(widget.data.startDate);
    const today = new Date();

    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffMs = today - start;
    const diffDays = diffMs >= 0 ? Math.floor(diffMs / (1000 * 60 * 60 * 24)) : 0;

    return `
      <div style="font-size:0.96rem;font-weight:700;">${diffDays} days together ᰔᩚ</div>
      <p style="margin:8px 0 0;font-size:0.82rem;opacity:0.75;">since ${widget.data.startDate}</p>
    `;
  }

  return normalizeAnniversaryLinks(widget.content || '');
}

function normalizeAnniversaryLinks(html) {
  const template = document.createElement('template');
  template.innerHTML = String(html || '');
  upgradeLegacyAnniversaryLinks(template.content);
  return template.innerHTML;
}

function isLegacyAnniversaryUrl(url) {
  const decodedUrl = decodeURIComponent(String(url || '')).toLowerCase();
  return (
    decodedUrl.includes('toto') &&
    decodedUrl.includes('dodo') &&
    decodedUrl.includes('anniversary') &&
    decodedUrl.includes('index.html')
  );
}

function upgradeLegacyAnniversaryLinks(root = document) {
  root.querySelectorAll?.('a[href]').forEach((link) => {
    if (!isLegacyAnniversaryUrl(link.getAttribute('href')) && !isLegacyAnniversaryUrl(link.href)) {
      return;
    }

    link.href = ANNIVERSARY_WRAPPER_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

async function loadWidgets(options = {}) {
  const { render = true } = options;
  const { data, error } = await supabaseClient
    .from('widgets')
    .select('*')
    .order('updated_at', { ascending: false });

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
        content: savedWidget.content ?? defaultWidget.content
      };

      const normalizedId = String(mergedWidget.id || '').toLowerCase().trim();
      const normalizedTitle = String(mergedWidget.title || '').toLowerCase();
      const isWishlistWidget =
        normalizedId === 'wishlist' || normalizedTitle.includes('wishlist');
      const isMissYouWidget =
        normalizedId === 'miss-you' || normalizedTitle.includes('miss you counter');
      const isSweetReminderWidget = normalizedId === 'sweet-reminder';
      const isSongWidget = normalizedId === 'song';
      const isLikeable = isLikeableWidget(mergedWidget);

      if (isWishlistWidget && Array.isArray(mergedWidget.data?.items)) {
        const normalizedItems = getWishlistItemsInDisplayOrder(mergedWidget.data.items).map((item, index) => ({
          ...item,
          order: Number.isFinite(item?.order) ? item.order : index
        }));

        const wishlistChanged = normalizedItems.some((item, index) => {
          const originalItem = mergedWidget.data.items[index];
          return !originalItem || item.order !== originalItem.order;
        });

        if (wishlistChanged) {
          mergedWidget.data = {
            ...mergedWidget.data,
            items: normalizedItems
          };
          widgetsNeedingNormalization.push(mergedWidget);
        }
      }

      if (isMissYouWidget) {
        const missYouChanged = normalizeMissYouWidget(mergedWidget);
        const shouldMoveMissYouWidget =
          mergedWidget.side === 'left' ||
          (
            Number.isFinite(mergedWidget.x) &&
            Number.isFinite(mergedWidget.y) &&
            mergedWidget.x === 12 &&
            mergedWidget.y === 770
          );

        if (shouldMoveMissYouWidget) {
          mergedWidget.side = 'right';
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

      if (isSweetReminderWidget) {
        const reminderChanged =
          mergedWidget.title !== defaultWidget.title ||
          mergedWidget.content !== defaultWidget.content;

        if (reminderChanged) {
          mergedWidget.title = defaultWidget.title;
          mergedWidget.content = defaultWidget.content;
          widgetsNeedingNormalization.push(mergedWidget);
        }
      }

      if (normalizedId === 'photo-pin-right' && mergedWidget.title !== defaultWidget.title) {
        mergedWidget.title = defaultWidget.title;
        widgetsNeedingNormalization.push(mergedWidget);
      }

      return mergedWidget;
    });

    widgetsNeedingNormalization.push(...normalizeWidgetMobileOrders(widgets));

    const uniqueWidgetsNeedingNormalization = widgetsNeedingNormalization.filter(
      (widget, index, array) => array.findIndex((item) => item.id === widget.id) === index
    );

    for (const widget of uniqueWidgetsNeedingNormalization) {
      await saveWidgetToSupabase(widget, { recordHistory: false });
    }
  }

  if (render) {
    renderWidgets();
  }
}

function renderWidgets() {
  const shouldAnimateMobileReorder = isMobileLayoutActive();
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  previousMobileWidgetRects.clear();
  if (shouldAnimateMobileReorder) {
    document.querySelectorAll('.widget[data-widget-id]').forEach((widgetEl) => {
      previousMobileWidgetRects.set(widgetEl.dataset.widgetId, widgetEl.getBoundingClientRect());
    });
  }

  leftZone.innerHTML = '';
  rightZone.innerHTML = '';

  ensureWidgetStackOrder();
  syncToggleWidgetsButton();

  const isMobileWidgetOrderActive = isMobileLayoutActive();
  const mobileRenderItems = isMobileWidgetOrderActive ? getMobileWidgetRenderItems() : null;
  const mobileWidgetOrderLookup = new Map();

  if (isMobileWidgetOrderActive) {
    ['left', 'right'].forEach((side) => {
      const orderedWidgets = sortMobileRenderItems(
        (mobileRenderItems || []).filter((item) => item.side === side)
      );
      orderedWidgets.forEach((item, index) => {
        mobileWidgetOrderLookup.set(item.renderId, {
          index,
          count: orderedWidgets.length
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
        side: widget.side === 'right' ? 'right' : 'left',
        order: getWidgetMobileOrder(widget, 0),
        isVirtual: false
      }));

  widgetsToRender
    .sort((a, b) => {
      if (isMobileWidgetOrderActive) {
        const sideDifference = a.side === b.side ? 0 : a.side === 'left' ? -1 : 1;
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
    const normalizedId = String(widget.id || '').toLowerCase().trim();
    const normalizedTitle = String(widget.title || '').toLowerCase();

    const isDatesWidget =
      normalizedId === 'dates' || normalizedTitle.includes('important dates');

    const isWishlistWidget =
      normalizedId === 'wishlist' || normalizedTitle.includes('wishlist');

    const isNoteWidget =
      normalizedId === 'note' || normalizedTitle.includes('little note');

    const isStickerWidget =
      normalizedId.includes('stickers') || normalizedTitle.includes('stickers');
    const isPhotoWidget =
      normalizedId.startsWith('photo-pin') || normalizedTitle.includes('pinned photo');

    const hasHistory =
      normalizedId === 'song' ||
      isNoteWidget;

    const isEditable =
      ['song', 'memories', 'love'].includes(normalizedId) ||
      isNoteWidget ||
      isDatesWidget ||
      isWishlistWidget ||
      isPhotoWidget;

    const editTargetId =
      isDatesWidget ? 'dates' :
      isWishlistWidget ? 'wishlist' :
      isPhotoWidget ? widget.id :
      isNoteWidget ? 'note' :
      normalizedId;
    const isMinimized = minimizedWidgetIds.has(widget.id);
    const isHidden = allWidgetsHidden;
    const mobileOrderState = mobileWidgetOrderLookup.get(renderId);
    const canMoveWidgetUp = Boolean(mobileOrderState && mobileOrderState.index > 0);
    const canMoveWidgetDown = Boolean(
      mobileOrderState && mobileOrderState.index < mobileOrderState.count - 1
    );
    const showMobileOrderControls = isMobileWidgetOrderActive;

    const el = document.createElement('div');
    el.className = 'widget';
    el.classList.toggle('is-minimized', isMinimized);
    el.classList.toggle('is-hidden-all', isHidden);
    el.dataset.widgetId = renderId;
    el.dataset.widgetSourceId = renderItem.sourceId;
    if (isStickerWidget) {
      el.classList.add('sticker-widget');
    }
    if (normalizedId === 'song') {
      el.classList.add('song-widget');
    }
    if (isPhotoWidget) {
      el.classList.add('photo-widget');
    }
    el.style.left = widget.x + 'px';
    el.style.top = widget.y + 'px';
    el.style.zIndex = String(widget.zIndex || 1);

    el.innerHTML = `
      <div class="widget-bar" data-widget-id="${widget.id}">
        <span>${widget.title}</span>
        <div class="widget-bar-actions">
          ${showMobileOrderControls ? `
            <button
              class="widget-order-btn"
              type="button"
              data-widget-move-id="${renderId}"
              data-widget-move-direction="up"
              aria-label="move widget up"
              ${canMoveWidgetUp ? '' : 'disabled'}
            >
              ↑
            </button>
            <button
              class="widget-order-btn"
              type="button"
              data-widget-move-id="${renderId}"
              data-widget-move-direction="down"
              aria-label="move widget down"
              ${canMoveWidgetDown ? '' : 'disabled'}
            >
              ↓
            </button>
          ` : ''}
          <button
            class="widget-minimize-btn"
            type="button"
            data-widget-minimize-id="${widget.id}"
            aria-label="${isMinimized ? 'restore widget' : 'minimize widget'}"
            aria-pressed="${isMinimized ? 'true' : 'false'}"
          >
            ${isMinimized ? '+' : '–'}
          </button>
          ${hasHistory && !isVirtualWidget ? `<button class="widget-history-btn" type="button" data-widget-history-id="${widget.id}">🕘</button>` : ''}
          ${!isVirtualWidget ? `
            <button class="widget-edit-btn" type="button" data-widget-id="${widget.id}">
              ${isEditable ? '✎' : '✦'}
            </button>
          ` : ''}
        </div>
      </div>
      <div class="widget-content">${getWidgetContent(widget)}</div>
    `;
    upgradeLegacyAnniversaryLinks(el);

    const bar = el.querySelector('.widget-bar');
    const editBtn = el.querySelector('.widget-edit-btn');
    const historyBtn = el.querySelector('.widget-history-btn');
    const minimizeBtn = el.querySelector('.widget-minimize-btn');
    const moveButtons = Array.from(el.querySelectorAll('.widget-order-btn'));

    moveButtons.forEach((button) => {
      ['mousedown', 'pointerdown'].forEach((eventName) => {
        button.addEventListener(eventName, (event) => {
          event.preventDefault();
          event.stopPropagation();
        });
      });

      button.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (button.disabled) {
          return;
        }

        await moveWidgetInMobileOrder(
          button.dataset.widgetMoveId || widget.id,
          button.dataset.widgetMoveDirection
        );
      });
    });

    if (minimizeBtn) {
      ['mousedown', 'pointerdown'].forEach((eventName) => {
        minimizeBtn.addEventListener(eventName, (event) => {
          event.preventDefault();
          event.stopPropagation();
        });
      });

      minimizeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleWidgetMinimized(widget.id);
      });
    }

    if (historyBtn) {
      historyBtn.addEventListener('mousedown', (event) => {
        event.preventDefault();
        event.stopPropagation();
      });

      historyBtn.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        event.stopPropagation();
      });

      historyBtn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        openWidgetHistory(widget.id);
      });
    }

    if (isWishlistWidget) {
      el.querySelectorAll('.widget-wish-toggle').forEach((btn) => {
        btn.addEventListener('mousedown', (event) => {
          event.preventDefault();
          event.stopPropagation();
        });

        btn.addEventListener('pointerdown', (event) => {
          event.preventDefault();
          event.stopPropagation();
        });

        btn.addEventListener('click', async (event) => {
          event.preventDefault();
          event.stopPropagation();
          await toggleWidgetWishlistItem(widget.id, btn.dataset.widgetWishId);
        });
      });
    }

    if (isPhotoWidget) {
      el.querySelectorAll('.widget-photo-empty').forEach((btn) => {
        ['mousedown', 'pointerdown'].forEach((eventName) => {
          btn.addEventListener(eventName, (event) => {
            event.preventDefault();
            event.stopPropagation();
          });
        });

        btn.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          const targetId = btn.dataset.photoWidgetId || btn.getAttribute('data-photo-widget-id') || widget.id;
          openWidgetEditor(targetId);
        });
      });
    }

    if (isLikeableWidget(widget)) {
      el.querySelectorAll('.widget-like-btn').forEach((btn) => {
        ['mousedown', 'pointerdown'].forEach((eventName) => {
          btn.addEventListener(eventName, (event) => {
            event.preventDefault();
            event.stopPropagation();
          });
        });

        btn.addEventListener('click', async (event) => {
          event.preventDefault();
          event.stopPropagation();
          await toggleWidgetLike(btn.dataset.widgetLikeId || widget.id);
        });
      });
    }

    if (normalizedId === 'miss-you') {
      el.querySelectorAll('.widget-miss-you-btn').forEach((btn) => {
        btn.addEventListener('mousedown', (event) => {
          event.preventDefault();
          event.stopPropagation();
        });

        btn.addEventListener('pointerdown', (event) => {
          event.preventDefault();
          event.stopPropagation();
        });

        btn.addEventListener('click', async (event) => {
          event.preventDefault();
          event.stopPropagation();
          if (btn.hasAttribute('disabled')) return;
          incrementMissYouWidget();
        });
      });
    }

    if (editBtn && isEditable && !isVirtualWidget) {
      editBtn.addEventListener('mousedown', (event) => {
        event.preventDefault();
        event.stopPropagation();
      });

      editBtn.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        event.stopPropagation();
      });

      editBtn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        openWidgetEditor(editTargetId);
      });
    }

    if (!isVirtualWidget) {
      bar.addEventListener('pointerdown', (event) => {
        if (event.target.closest('button')) return;
        startWidgetDrag(event, widget, el);
      });
    }

    if (renderSide === 'left') {
      leftZone.appendChild(el);
    } else {
      rightZone.appendChild(el);
    }
  });

  if (shouldAnimateMobileReorder && !prefersReducedMotion) {
    requestAnimationFrame(() => {
      document.querySelectorAll('.widget[data-widget-id]').forEach((widgetEl) => {
        const previousRect = previousMobileWidgetRects.get(widgetEl.dataset.widgetId);
        if (!previousRect) return;

        const nextRect = widgetEl.getBoundingClientRect();
        const deltaX = previousRect.left - nextRect.left;
        const deltaY = previousRect.top - nextRect.top;

        if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) {
          return;
        }

        widgetEl.classList.add('widget-mobile-reordering');
        widgetEl.getAnimations?.().forEach((animation) => animation.cancel());
        const reorderAnimation = widgetEl.animate(
          [
            {
              transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(0.985)`,
              opacity: 0.82
            },
            {
              transform: 'translate3d(0, 0, 0) scale(1)',
              opacity: 1
            }
          ],
          {
            duration: 460,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
          }
        );

        reorderAnimation.addEventListener('finish', () => {
          widgetEl.classList.remove('widget-mobile-reordering');
        }, { once: true });

        reorderAnimation.addEventListener('cancel', () => {
          widgetEl.classList.remove('widget-mobile-reordering');
        }, { once: true });
      });
    });
  }

  renderStickerGrid();
}

function syncToggleWidgetsButton() {
  if (!toggleWidgetsBtn) return;

  toggleWidgetsBtn.textContent = allWidgetsHidden ? 'show all' : 'hide all';
  toggleWidgetsBtn.setAttribute('aria-pressed', String(allWidgetsHidden));
  toggleWidgetsBtn.setAttribute(
    'aria-label',
    allWidgetsHidden ? 'show all widgets' : 'hide all widgets'
  );
}

function toggleWidgetMinimized(widgetId) {
  if (minimizedWidgetIds.has(widgetId)) {
    minimizedWidgetIds.delete(widgetId);
  } else {
    minimizedWidgetIds.add(widgetId);
  }

  renderWidgets();
}

function toggleAllWidgetsMinimized() {
  allWidgetsHidden = !allWidgetsHidden;
  renderWidgets();
}

function renderWidgetSkeletons() {
  const skeletons = widgets.map((widget) => {
    const normalizedId = String(widget.id || '').toLowerCase().trim();
    const normalizedTitle = String(widget.title || '').toLowerCase();

    let lines = 2;

    if (normalizedId === 'song') {
      lines = 3;
    } else if (normalizedId === 'love') {
      lines = 2;
    } else if (
      normalizedId.includes('wishlist') ||
      normalizedTitle.includes('wishlist') ||
      normalizedId.includes('stickers') ||
      normalizedTitle.includes('stickers') ||
      normalizedTitle.includes('important dates')
    ) {
      lines = 3;
    }

    return {
      side: widget.side,
      x: widget.x ?? 0,
      y: widget.y ?? 0,
      lines
    };
  });

  leftZone.innerHTML = '';
  rightZone.innerHTML = '';

  skeletons.forEach((item) => {
    const node = document.createElement('div');
    node.className = 'widget widget-skeleton';
    node.style.left = `${item.x}px`;
    node.style.top = `${item.y}px`;
    node.innerHTML = `
      <div class="skeleton-block skeleton-header"></div>
      <div class="skeleton-widget-body">
        ${Array.from({ length: item.lines }).map(() => '<span class="skeleton-line"></span>').join('')}
      </div>
    `;

    (item.side === 'left' ? leftZone : rightZone).appendChild(node);
  });
}

function openWidgetEditor(widgetId) {
  dragWidget = null;
  pendingWidgetDrag = null;
  if (clearWidgetHistoryBtn) clearWidgetHistoryBtn.style.display = 'none';
  setWidgetPopupLikeButton(null);

  const normalizedId = String(widgetId || '').toLowerCase().trim();

  const widget = widgets.find((item) => {
    const itemId = String(item.id || '').toLowerCase().trim();
    const itemTitle = String(item.title || '').toLowerCase();

    if (itemId === normalizedId) return true;
    if (normalizedId === 'dates' && itemTitle.includes('important dates')) return true;
    if (normalizedId === 'wishlist' && itemTitle.includes('wishlist')) return true;
    if (normalizedId === 'note' && itemTitle.includes('little note')) return true;
    if (normalizedId === 'photo-pin' && itemTitle.includes('pinned photo')) return true;

    return false;
  });

  if (!widget) return;

  editingWidgetId = normalizedId;

  if (normalizedId === 'love') {
    widgetPopupTitle.textContent = "｡ ₊°༺ together for ༻°₊ ｡:";
    saveWidgetBtn.style.display = 'none';
    setHeaderWidgetSaveVisibility(false);

    widgetEditorFields.innerHTML = `
      <div class="small-note">i hope i get forever with you, sweetie ᰔᩚ</div>
    `;
  } else if (normalizedId === 'song') {
    normalizeSongWidget(widget);
    widgetPopupTitle.textContent = `edit ${widget.title}`;
    saveWidgetBtn.style.display = 'none';
    setHeaderWidgetSaveVisibility(true);

    widgetEditorFields.innerHTML = `
      <div class="song-editor-layout">
        <div class="song-editor-preview${widget.data?.coverUrl ? ' has-cover' : ''}" id="songEditorPreview">
          ${widget.data?.coverUrl
            ? `<img class="song-editor-preview-cover" src="${escapeHtml(widget.data.coverUrl)}" alt="Spotify cover preview" />`
            : '<div class="song-editor-preview-empty">cover preview will show here ♡</div>'}
        </div>

        <label class="popup-label">spotify track link</label>
        <div class="song-editor-fetch-row">
          <input
            class="popup-input"
            id="widgetFieldSpotifyUrl"
            type="url"
            placeholder="https://open.spotify.com/track/..."
            value="${escapeHtml(widget.data?.spotifyUrl || '')}"
          />
          <button class="soft-btn" id="fetchSpotifySongBtn" type="button">fetch</button>
        </div>

        <label class="popup-label" style="margin-top:12px;">caption</label>
        <input
          class="popup-input"
          id="widgetFieldSongDuration"
          type="text"
          value="${escapeHtml(widget.data?.durationLabel || '')}"
        />

        <input id="widgetFieldSongCover" type="hidden" value="${escapeHtml(widget.data?.coverUrl || '')}" />
        <input id="widgetFieldSongUri" type="hidden" value="${escapeHtml(widget.data?.spotifyUri || '')}" />
      </div>
    `;

    const spotifyUrlInput = document.getElementById('widgetFieldSpotifyUrl');
    const songDurationInput = document.getElementById('widgetFieldSongDuration');
    const songCoverInput = document.getElementById('widgetFieldSongCover');
    const songUriInput = document.getElementById('widgetFieldSongUri');
    const fetchSpotifySongBtn = document.getElementById('fetchSpotifySongBtn');
    const songEditorPreview = document.getElementById('songEditorPreview');

    const renderSongEditorPreview = () => {
      if (!songEditorPreview) return;

      const coverUrl = String(songCoverInput?.value || '').trim();
      songEditorPreview.classList.toggle('has-cover', Boolean(coverUrl));
      songEditorPreview.innerHTML = coverUrl
        ? `<img class="song-editor-preview-cover" src="${escapeHtml(coverUrl)}" alt="Spotify cover preview" />`
        : '<div class="song-editor-preview-empty">cover preview will show here ♡</div>';
    };

    songCoverInput?.addEventListener('input', renderSongEditorPreview);

    fetchSpotifySongBtn?.addEventListener('click', async () => {
      const rawUrl = spotifyUrlInput?.value || '';

      if (!rawUrl.trim()) {
        showMessage('paste a Spotify track link first ♡');
        return;
      }

      fetchSpotifySongBtn.disabled = true;
      fetchSpotifySongBtn.textContent = 'fetching...';

      try {
        const spotifyData = await fetchSpotifyTrackCardData(rawUrl);
        if (spotifyUrlInput) spotifyUrlInput.value = spotifyData.spotifyUrl;
        if (songUriInput) songUriInput.value = spotifyData.spotifyUri;
        if (songCoverInput) songCoverInput.value = spotifyData.coverUrl;
        widget.data.songName = spotifyData.songName;
        if (songDurationInput && !songDurationInput.value.trim()) {
          songDurationInput.value = spotifyData.durationLabel;
        }
        renderSongEditorPreview();
        showMessage('Spotify track loaded ♡');
      } catch (error) {
        console.error(error);
        showMessage(error.message || 'could not fetch this Spotify track ♡');
      } finally {
        fetchSpotifySongBtn.disabled = false;
        fetchSpotifySongBtn.textContent = 'fetch';
      }
    });
  } else if (normalizedId === 'note') {
    normalizeWidgetLikesData(widget);
    widgetPopupTitle.textContent = '⋆𐙚₊little note˚⊹♡';
    saveWidgetBtn.style.display = 'inline-flex';
    setHeaderWidgetSaveVisibility(false);
    setWidgetPopupLikeButton(widget);

    widgetEditorFields.innerHTML = `
      <label class="popup-label">little note</label>
      <textarea class="popup-input" id="widgetFieldText" rows="5" style="resize: vertical; min-height: 110px;">${widget.data?.text || ''}</textarea>
    `;
  } else if (normalizedId === 'dates') {
    const items = widget.data?.items || [];

    widgetPopupTitle.textContent = 'important dates ♡';
    saveWidgetBtn.style.display = 'none';
    setHeaderWidgetSaveVisibility(false);

    const itemsHtml = items.map((item) => `
      <div class="date-edit-item" data-date-id="${item.id}" style="border:1px solid var(--border);border-radius:16px;padding:12px;background:rgba(255,250,253,0.92);">
        <div style="font-weight:700;margin-bottom:8px;">${item.title}</div>
        <div style="font-size:0.88rem;opacity:0.75;margin-bottom:10px;">${item.date}</div>
        <div style="display:flex;justify-content:flex-end;">
          <button class="delete-date-btn" type="button" data-date-id="${item.id}">delete</button>
        </div>
      </div>
    `).join('');

    widgetEditorFields.innerHTML = `
      <div style="display:grid;gap:12px;">
        <label class="popup-label">title</label>
        <input class="popup-input" id="dateTitleInput" type="text" placeholder="birthday" />

        <label class="popup-label">date</label>
        <input class="popup-input" id="dateValueInput" type="date" />

        <div class="popup-actions" style="margin-top:4px;">
          <button class="soft-btn" id="addDateBtn" type="button">add date</button>
        </div>

        <div style="margin-top:8px;display:grid;gap:10px;">
          ${itemsHtml || `<div class="small-note">no dates yet ♡</div>`}
        </div>
      </div>
    `;

    const addDateBtn = document.getElementById('addDateBtn');

    if (addDateBtn) {
      addDateBtn.addEventListener('click', async () => {
        const titleInput = document.getElementById('dateTitleInput');
        const dateInput = document.getElementById('dateValueInput');

        const title = titleInput.value.trim();
        const date = dateInput.value.trim();

        if (!title || !date) {
          showMessage('add a title and date ♡');
          return;
        }

        if (!widget.data) widget.data = { items: [] };
        if (!widget.data.items) widget.data.items = [];

        widget.data.items.push({
          id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
          title,
          date
        });

        await saveWidgetToSupabase(widget);
        renderWidgets();
        openWidgetEditor('dates');
        showMessage('date added ♡');
      });
    }

    document.querySelectorAll('.delete-date-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const dateId = btn.dataset.dateId;

        widget.data.items = (widget.data.items || []).filter((item) => item.id !== dateId);

        await saveWidgetToSupabase(widget);
        renderWidgets();
        openWidgetEditor('dates');
        showMessage('date deleted ♡');
      });
    });
  } else if (normalizedId === 'wishlist') {
    const items = getWishlistItemsInDisplayOrder(widget.data?.items || []);

    widgetPopupTitle.textContent = 'wishlist ♡';
    saveWidgetBtn.style.display = 'none';
    setHeaderWidgetSaveVisibility(false);

    const itemsHtml = items.map((item) => `
      <div class="wishlist-item-row">
        <div class="wishlist-item-main">
          <button class="toggle-wish-btn" type="button" data-wish-id="${item.id}">
            ${item.done ? '☑' : '☐'}
          </button>
          <div class="wishlist-item-text${item.done ? ' is-done' : ''}">${item.text}</div>
        </div>
        <button class="delete-wish-btn" type="button" data-wish-id="${item.id}">delete</button>
      </div>
    `).join('');

    widgetEditorFields.innerHTML = `
      <div style="display:grid;gap:12px;">
        <label class="popup-label">add to wishlist</label>
        <input class="popup-input" id="wishTextInput" type="text" placeholder="picnic date" />

        <div class="popup-actions" style="margin-top:4px;">
          <button class="soft-btn" id="addWishBtn" type="button">add item</button>
        </div>

        <div style="margin-top:8px;display:grid;gap:10px;">
          ${itemsHtml || `<div class="small-note">nothing on the wishlist yet ♡</div>`}
        </div>
      </div>
    `;

    const addWishBtn = document.getElementById('addWishBtn');

    if (addWishBtn) {
      addWishBtn.addEventListener('click', async () => {
        const wishInput = document.getElementById('wishTextInput');
        const text = wishInput.value.trim();

        if (!text) {
          showMessage('write something for the wishlist ♡');
          return;
        }

        if (!widget.data) widget.data = { items: [] };
        if (!widget.data.items) widget.data.items = [];

        widget.data.items.push({
          id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
          text,
          done: false,
          order: getNextWishlistOrder(widget.data.items)
        });

        await saveWidgetToSupabase(widget);
        renderWidgets();
        openWidgetEditor('wishlist');
        showMessage('added to wishlist ♡');
      });
    }

    document.querySelectorAll('.delete-wish-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const wishId = btn.dataset.wishId;

        widget.data.items = (widget.data.items || []).filter((item) => item.id !== wishId);

        await saveWidgetToSupabase(widget);
        renderWidgets();
        openWidgetEditor('wishlist');
        showMessage('wishlist item deleted ♡');
      });
    });

    document.querySelectorAll('.toggle-wish-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const wishId = btn.dataset.wishId;

        widget.data.items = (widget.data.items || []).map((item) =>
          item.id === wishId ? { ...item, done: !item.done } : item
        );

        await saveWidgetToSupabase(widget);
        renderWidgets();
        openWidgetEditor('wishlist');
        showMessage('wishlist updated ♡');
      });
    });
  } else if (normalizedId.startsWith('photo-pin')) {
    if (!widget.data) {
      widget.data = {};
    }
    normalizeWidgetLikesData(widget);

    widgetPopupTitle.textContent =
      normalizedId === 'photo-pin-right' ? 'dodos pinned photo' : 'dodos pinned photo';
    saveWidgetBtn.style.display = 'none';
    setHeaderWidgetSaveVisibility(false);
    setWidgetPopupLikeButton(widget);

    const photoData = {
      image: widget.data.image || '',
      text: widget.data.text || '',
      textColor: normalizeHexColor(widget.data.textColor, '#ffffff'),
      textSize: Number(widget.data.textSize) || 22,
      textX: Number.isFinite(Number(widget.data.textX)) ? Number(widget.data.textX) : 50,
      textY: Number.isFinite(Number(widget.data.textY)) ? Number(widget.data.textY) : 86,
      rotate: Number(widget.data.rotate) || 0
    };
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
          <button class="soft-btn photo-editor-tool-btn" id="savePhotoWidgetBtn" type="button">save</button>
        </div>
        <div class="photo-editor-preview${photoData.image ? ' has-image' : ''}" id="photoEditorPreview">
          ${photoData.image ? `
            <img id="photoEditorPreviewImage" src="${photoData.image}" alt="photo preview" />
            <div class="photo-editor-preview-text" id="photoEditorPreviewText"></div>
          ` : '<span>no photo pinned yet</span>'}
        </div>

      </div>
    `;

    const photoInput = document.getElementById('photoWidgetInput');
    const photoImageData = document.getElementById('photoWidgetImageData');
    const photoRotateInput = document.getElementById('photoWidgetRotate');
    const photoTextXInput = document.getElementById('photoWidgetTextX');
    const photoTextYInput = document.getElementById('photoWidgetTextY');
    const preview = document.getElementById('photoEditorPreview');
    const textInput = document.getElementById('photoWidgetText');
    const textColorInput = document.getElementById('photoTextColor');
    const textColorTrigger = document.getElementById('photoColorTrigger');
    const textSizeInput = document.getElementById('photoTextSize');
    const centerPhotoTextXBtn = document.getElementById('centerPhotoTextXBtn');
    const rotateBtn = document.getElementById('rotatePhotoBtn');
    const clearPhotoBtn = document.getElementById('clearPhotoBtn');
    const savePhotoWidgetBtn = document.getElementById('savePhotoWidgetBtn');
    let photoRotation = photoData.rotate;
    let textX = Math.max(0, Math.min(100, photoData.textX));
    let textY = Math.max(0, Math.min(100, photoData.textY));
    let activeTextColor = normalizeHexColor(textColorInput?.value, photoData.textColor);

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
      const image = document.getElementById('photoEditorPreviewImage');
      const text = document.getElementById('photoEditorPreviewText');
      if (image) {
        image.style.transform = `rotate(${photoRotation}deg)`;
      }
      if (text) {
        text.textContent = textInput?.value || '';
        text.style.left = `${textX}%`;
        text.style.top = `${textY}%`;
        text.style.color = activeTextColor;
        text.style.setProperty('--photo-text-size', String(Math.max(12, Math.min(46, Number(textSizeInput?.value) || 22))));
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
      textX = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
      textY = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
      updatePhotoPreview();
    };

    const wirePhotoTextDrag = () => {
      const text = document.getElementById('photoEditorPreviewText');
      if (!text) return;

      text.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        event.stopPropagation();
        text.setPointerCapture?.(event.pointerId);
        text.classList.add('is-dragging');
        movePhotoTextToPointer(event);
      });

      text.addEventListener('pointermove', (event) => {
        if (!text.classList.contains('is-dragging')) return;
        event.preventDefault();
        movePhotoTextToPointer(event);
      });

      text.addEventListener('pointerup', (event) => {
        text.classList.remove('is-dragging');
        text.releasePointerCapture?.(event.pointerId);
      });
    };

    if (photoData.image) {
      wirePhotoTextDrag();
      updatePhotoPreview();
    }

    textInput?.addEventListener('input', updatePhotoPreview);
    textSizeInput?.addEventListener('input', updatePhotoPreview);
    const handleColorInput = (sourceInput) => {
      const raw = String(sourceInput?.value || '').trim();
      if (!raw) return;
      setActiveTextColor(raw);
      updatePhotoPreview();
    };
    textColorInput?.addEventListener('input', () => handleColorInput(textColorInput));
    textColorTrigger?.addEventListener('input', () => handleColorInput(textColorTrigger));
    textColorInput?.addEventListener('blur', syncColorFields);
    setActiveTextColor(activeTextColor);
    updatePhotoPreview();

    photoInput?.addEventListener('change', async () => {
      const file = photoInput.files?.[0];
      if (!file) return;

      try {
        const imageData = await compressImageFile(file);
        photoImageData.value = imageData;
        preview.classList.add('has-image');
        preview.innerHTML = `
          <img id="photoEditorPreviewImage" src="${imageData}" alt="photo preview" />
          <div class="photo-editor-preview-text" id="photoEditorPreviewText"></div>
        `;
        wirePhotoTextDrag();
        updatePhotoPreview();
      } catch (error) {
        console.error(error);
        showMessage('could not load photo ♡');
      }
    });

    rotateBtn?.addEventListener('click', () => {
      photoRotation = (photoRotation + 90) % 360;
      updatePhotoPreview();
    });

    centerPhotoTextXBtn?.addEventListener('click', () => {
      textX = 50;
      updatePhotoPreview();
    });

    clearPhotoBtn?.addEventListener('click', () => {
      photoImageData.value = '';
      photoRotation = 0;
      textX = 50;
      textY = 86;
      preview.classList.remove('has-image');
      preview.innerHTML = '<span>no photo pinned yet</span>';
      updatePhotoPreview();
    });

    savePhotoWidgetBtn?.addEventListener('click', saveWidgetChanges);
  } else {
    widgetPopupTitle.textContent = `edit ${widget.title}`;
    widgetEditorFields.innerHTML = `<div class="small-note">this widget is not editable yet ♡</div>`;
    saveWidgetBtn.style.display = 'none';
    setHeaderWidgetSaveVisibility(false);
  }

  widgetPopup.classList.add('open');
}

async function saveWidgetChanges() {
  const widget = widgets.find((item) => {
    const itemId = String(item.id || '').toLowerCase().trim();
    const itemTitle = String(item.title || '').toLowerCase();

    if (itemId === editingWidgetId) return true;
    if (editingWidgetId === 'dates' && itemTitle.includes('important dates')) return true;
    if (editingWidgetId === 'wishlist' && itemTitle.includes('wishlist')) return true;
    if (editingWidgetId === 'note' && itemTitle.includes('little note')) return true;
    if (editingWidgetId === 'photo-pin' && itemTitle.includes('pinned photo')) return true;

    return false;
  });

  if (!widget) return;

  let beforeLikeContentSignature = '';

  if (isLikeableWidget(widget)) {
    try {
      const latestSavedRow = await fetchLatestWidgetRow(widget.id);
      if (latestSavedRow) {
        mergeWidgetFromSavedRow(widget, latestSavedRow);
      }
      normalizeWidgetLikesData(widget);
      beforeLikeContentSignature = getWidgetLikeContentSignature(widget);
    } catch (error) {
      console.error(error);
      showMessage(error.message || 'could not load the latest widget state ♡');
      return;
    }
  }

  const beforeSaveState = JSON.stringify({
    title: widget.title || '',
    data: widget.data || null
  });

  if (editingWidgetId === 'song') {
    if (!widget.data) widget.data = {};
    widget.title = widget.title || 'currently listening to ₊˚⊹ᰔ ';
    const rawSpotifyUrl = document.getElementById('widgetFieldSpotifyUrl')?.value.trim() || '';
    const normalizedTrack = normalizeSpotifyTrackUrl(rawSpotifyUrl);
    widget.data.spotifyUrl = normalizedTrack?.spotifyUrl || '';
    widget.data.spotifyUri =
      widget.data.spotifyUrl
        ? (
            document.getElementById('widgetFieldSongUri')?.value.trim() ||
            normalizedTrack?.spotifyUri ||
          ''
          )
        : '';
    widget.data.durationLabel = document.getElementById('widgetFieldSongDuration')?.value.trim() || '';
    widget.data.coverUrl = document.getElementById('widgetFieldSongCover')?.value.trim() || '';
    widget.data.accent = Math.max(6, Math.min(94, Number(widget.data.accent) || 38));
  } else if (editingWidgetId === 'note') {
    if (!widget.data) widget.data = {};
    widget.data.text = document.getElementById('widgetFieldText').value.trim();
  } else if (String(widget.title || '').toLowerCase().includes('pinned photo') || String(editingWidgetId || '').toLowerCase().startsWith('photo-pin')) {
    if (!widget.data) widget.data = {};
    widget.data.image = document.getElementById('photoWidgetImageData')?.value || '';
    delete widget.data.caption;
    widget.data.text = document.getElementById('photoWidgetText')?.value.trim() || '';
    widget.data.textColor = normalizeHexColor(document.getElementById('photoTextColor')?.value, '#ffffff');
    widget.data.textSize = Math.max(12, Math.min(46, Number(document.getElementById('photoTextSize')?.value) || 22));
    const savedTextX = Number(document.getElementById('photoWidgetTextX')?.value);
    const savedTextY = Number(document.getElementById('photoWidgetTextY')?.value);
    widget.data.textX = Math.max(0, Math.min(100, Number.isFinite(savedTextX) ? savedTextX : 50));
    widget.data.textY = Math.max(0, Math.min(100, Number.isFinite(savedTextY) ? savedTextY : 86));
    widget.data.rotate = Number(document.getElementById('photoWidgetRotate')?.value) || 0;
  } else {
    return;
  }

  if (
    beforeLikeContentSignature &&
    getWidgetLikeContentSignature(widget) !== beforeLikeContentSignature
  ) {
    widget.data.likes = [];
  }

  const afterSaveState = JSON.stringify({
    title: widget.title || '',
    data: widget.data || null
  });

  if (beforeSaveState === afterSaveState) {
    showMessage('no changes to save ♡');
    return;
  }

  await saveWidgetToSupabase(widget);
  renderWidgets();
  widgetPopup.classList.remove('open');
  setWidgetPopupLikeButton(null);
  showMessage('widget updated ♡');
}

async function saveWidgetToSupabase(widget, options = {}) {
  const { recordHistory = true, suppressErrorMessage = false } = options;
  const payload = {
    title: widget.title,
    side: widget.side,
    x: Math.round(widget.x),
    y: Math.round(widget.y),
    data: widget.data || null,
    content: widget.content || null,
    updated_at: new Date().toISOString()
  };

  const { data: updatedRows, error: updateError } = await supabaseClient
    .from('widgets')
    .update(payload)
    .eq('id', widget.id)
    .select('id');

  if (updateError) {
    console.error(updateError);
    if (!suppressErrorMessage) {
      showMessage(updateError.message);
    }
    return false;
  }

  if (!updatedRows?.length) {
    const { error: insertError } = await supabaseClient
      .from('widgets')
      .insert({
        id: widget.id,
        ...payload
      });

    if (insertError) {
      console.error(insertError);
      if (!suppressErrorMessage) {
        showMessage(insertError.message);
      }
      return false;
    }
  }

  if (recordHistory) {
    recordWidgetHistory(widget);
  }

  return true;
}

async function toggleWidgetWishlistItem(widgetId, wishId) {
  const normalizedWidgetId = String(widgetId || '').toLowerCase().trim();
  const widget = widgets.find((item) => {
    const itemId = String(item.id || '').toLowerCase().trim();
    const itemTitle = String(item.title || '').toLowerCase();

    if (itemId === normalizedWidgetId) return true;
    if (normalizedWidgetId === 'wishlist' && itemTitle.includes('wishlist')) return true;
    return false;
  });

  if (!widget?.data?.items?.length) return;

  widget.data.items = getWishlistItemsInDisplayOrder(widget.data.items).map((item, index) => ({
    ...item,
    order: Number.isFinite(item?.order) ? item.order : index,
    done: item.id === wishId ? !item.done : item.done
  }));

  await saveWidgetToSupabase(widget);
  renderWidgets();
  // if the wishlist editor is open, refresh it so the editor list matches the widget
  if (widgetPopup?.classList.contains('open') && editingWidgetId === 'wishlist') {
    openWidgetEditor('wishlist');
  }
}

function formatEntryDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString([], {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

function getPostLikeLabel(post) {
  return `${post.likedByMe ? '🩷 liked' : '♡ like'} (${post.likesCount || 0})`;
}

function getPostLikeIcon(post) {
  return post.likedByMe ? '🩷' : '♡';
}

function getPostLikeButtonMarkup(post) {
  return getLikeButtonMarkup(post.likedByMe, post.likesCount || 0);
}

function syncPostLikeButton(postId) {
  const post = posts.find((item) => item.id === postId);
  const btn = document.querySelector(`.like-btn[data-post-id="${postId}"]`);

  if (!post || !btn) return;

  btn.innerHTML = getPostLikeButtonMarkup(post);
  btn.classList.toggle('liked', Boolean(post.likedByMe));
  btn.classList.toggle('is-pending', pendingPostLikeIds.has(postId));
  btn.setAttribute('aria-label', post.likedByMe ? 'liked post' : 'like post');
  btn.setAttribute('aria-pressed', String(Boolean(post.likedByMe)));
}

function renderTimeline() {
  timelineEl.innerHTML = '';

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
    const avatarHtml = post.avatarUrl
      ? `<img class="post-avatar" src="${post.avatarUrl}" alt="${post.nickname || 'profile'}" />`
      : `<div class="post-avatar"></div>`;

    const isOwner = currentProfile && post.userId === currentProfile.id;

    const postEl = document.createElement('article');
    postEl.className = 'post';
    postEl.dataset.postId = post.id;
    postEl.innerHTML = `
      <div class="post-header">
        <span>˚₊‧ entry ❤︎‧₊˚ — ${formatEntryDate(post.created_at)}</span>
        ${post.isEdited ? `<span class="post-edited-badge">edited</span>` : ''}
      </div>
      <div class="post-body">
        <div class="post-meta">
          ${avatarHtml}
          <div class="post-author-text">
            <span class="post-author-name">${post.nickname || post.author}</span>
            <span>${post.author}</span>
          </div>
       </div>
        <div class="post-text ql-editor"></div>
        <div class="link-preview-list" hidden></div>
        <div class="post-actions">
          <button
            class="post-btn like-btn${post.likedByMe ? ' liked' : ''}${pendingPostLikeIds.has(post.id) ? ' is-pending' : ''}"
            type="button"
            data-post-id="${post.id}"
            aria-label="${post.likedByMe ? 'liked post' : 'like post'}"
            aria-pressed="${post.likedByMe ? 'true' : 'false'}"
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
            <span class="post-btn-count">(${post.comments?.length || 0})</span>
          </button>
          <button
            class="post-btn stickers-btn"
            type="button"
            data-post-id="${post.id}"
            aria-label="open stickers"
            aria-pressed="false"
          >
            <span class="post-btn-icon" aria-hidden="true">✦</span>
            <span class="post-btn-label">stickers</span>
          </button>
          ${isOwner ? `<button class="post-btn edit-entry-btn" type="button" data-post-id="${post.id}" aria-label="edit entry"><span class="post-btn-icon" aria-hidden="true">✎</span><span class="post-btn-label">edit</span></button>` : ''}
          ${isOwner ? `<button class="post-btn delete-entry-btn" type="button" data-post-id="${post.id}" aria-label="delete entry"><span class="post-btn-icon" aria-hidden="true">🗑</span><span class="post-btn-label">delete</span></button>` : ''}
        </div>
        <div class="reaction-layer"></div>
      </div>
    `;

    const postTextEl = postEl.querySelector('.post-text');
    postTextEl.innerHTML = getPostDisplayHtml(post.text);
    postTextEl.querySelectorAll('a').forEach((link) => {
      link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });
    renderLinkPreviews(postTextEl, postEl.querySelector('.link-preview-list'));

    const postBody = postEl.querySelector('.post-body');

    postBody.addEventListener('dragenter', (event) => {
      event.preventDefault();
      postBody.classList.add('sticker-drop-ready');
    });

    postBody.addEventListener('dragover', (event) => {
      event.preventDefault();
      postBody.classList.add('sticker-drop-ready');
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'copy';
      }
    });

    postBody.addEventListener('dragleave', (event) => {
      if (!postBody.contains(event.relatedTarget)) {
        postBody.classList.remove('sticker-drop-ready');
      }
    });

    postBody.addEventListener('drop', (event) => {
      event.stopPropagation();
      handleStickerDrop(event, post.id);
    });

    postEl.addEventListener('dragover', (event) => {
      event.preventDefault();
      const dropBody = getDropBodyFromTarget(event.target) || postBody;
      dropBody.classList.add('sticker-drop-ready');
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'copy';
      }
    });

    postEl.addEventListener('drop', (event) => {
      handleStickerDrop(event, post.id);
    });

    timelineEl.appendChild(postEl);
  });

  document.querySelectorAll('.delete-entry-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      await deleteEntry(btn.dataset.postId);
    });
  });

  document.querySelectorAll('.edit-entry-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      openEntryEditor(btn.dataset.postId);
    });
  });

  document.querySelectorAll('.like-btn[data-post-id]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      await toggleLike(btn.dataset.postId);
    });
  });

  document.querySelectorAll('.comments-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      openCommentsPopup(btn.dataset.postId);
    });
  });

  document.querySelectorAll('.stickers-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      stickerPopup.classList.add('open');
      renderEmojiPicker();
      renderGifPicker();
      switchStickerTab('type');
      stickerInput.focus();
    });
  });
  renderPlacedStickers();
}

function renderTimelineSkeleton() {
  timelineEl.innerHTML = Array.from({ length: 3 }).map(() => `
    <article class="post post-skeleton">
      <div class="post-header">
        <span class="skeleton-line skeleton-line-short"></span>
      </div>
      <div class="post-body">
        <div class="post-meta">
          <span class="skeleton-avatar"></span>
          <div class="post-author-text skeleton-author-lines">
            <span class="skeleton-line skeleton-line-name"></span>
            <span class="skeleton-line skeleton-line-tiny"></span>
          </div>
        </div>
        <div class="skeleton-paragraph">
          <span class="skeleton-line"></span>
          <span class="skeleton-line"></span>
          <span class="skeleton-line skeleton-line-wide"></span>
          <span class="skeleton-line skeleton-line-medium"></span>
        </div>
        <div class="post-actions">
          <span class="skeleton-button"></span>
          <span class="skeleton-button"></span>
        </div>
      </div>
    </article>
  `).join('');
}

function getDropBodyFromTarget(target) {
  if (!target) return null;
  if (target.classList?.contains('post-body')) return target;
  return target.closest?.('.post-body') || null;
}

function switchStickerTab(nextTab) {
  document.querySelectorAll('.sticker-tab').forEach((button) => {
    button.classList.toggle('active', button.dataset.stickerTab === nextTab);
  });

  const typePanel = document.getElementById('stickerTypePanel');
  const pickPanel = document.getElementById('stickerPickPanel');
  const gifPanel = document.getElementById('stickerGifPanel');

  if (typePanel) {
    typePanel.classList.toggle('active', nextTab === 'type');
  }

  if (pickPanel) {
    pickPanel.classList.toggle('active', nextTab === 'pick');
  }

  if (gifPanel) {
    gifPanel.classList.toggle('active', nextTab === 'gif');
  }

  if (nextTab === 'type') {
    renderTypedStickerPreview();
    stickerInput.focus();
  }

  if (nextTab === 'gif') {
    if (!gifSearchQuery && !gifSearchResults.length) {
      setGifSearchStatus(
        GIPHY_API_KEY
          ? 'search public gifs or pick one below ♡'
          : 'add your GIPHY API key in script.js to enable public search'
      );
    }
    renderGifPicker();
  }
}

function renderEmojiPicker() {
  if (!emojiPickerGrid || hasRenderedEmojiPicker) return;

  emojiPickerGrid.innerHTML = '';

  STICKER_PICKER_GROUPS.forEach((group) => {
    const section = document.createElement('section');
    section.className = 'emoji-picker-section';

    const heading = document.createElement('div');
    heading.className = 'emoji-picker-heading';
    heading.textContent = group.label;
    section.appendChild(heading);

    const sectionGrid = document.createElement('div');
    sectionGrid.className = 'emoji-picker-section-grid';

    group.emojis.forEach((emojiValue) => {
      const button = document.createElement('button');
      button.className = 'emoji-picker-btn';
      button.type = 'button';
      button.draggable = true;
      button.textContent = emojiValue;
      button.setAttribute('aria-label', `choose ${emojiValue}`);
      button.addEventListener('click', () => {
        stickerInput.value = emojiValue;
        switchStickerTab('type');
      });
      button.addEventListener('dragstart', (event) => {
        activeSticker = emojiValue;
        activeStickerSize = null;
        requestAnimationFrame(() => {
          stickerPopup.classList.remove('open');
        });
        document.body.classList.add('sticker-dragging');

        if (event.dataTransfer) {
          event.dataTransfer.setData(STICKER_MIME_TYPE, emojiValue);
          event.dataTransfer.setData('text/plain', emojiValue);
          event.dataTransfer.effectAllowed = 'copy';
          event.dataTransfer.dropEffect = 'copy';
        }
      });
      button.addEventListener('dragend', () => {
        activeSticker = null;
        activeStickerSize = null;
        document.body.classList.remove('sticker-dragging');
        document
          .querySelectorAll('.post-body.sticker-drop-ready')
          .forEach((node) => node.classList.remove('sticker-drop-ready'));
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
  gifPickerGrid.innerHTML = '';
  const gifItems = gifSearchResults.length
    ? gifSearchResults
    : [
        ...getRecentGifStickers(),
        ...STICKER_GIF_LIBRARY.filter(
          (gifItem) => !getRecentGifStickers().some((recentItem) => recentItem.url === gifItem.url)
        )
      ];

  if (!gifSearchResults.length) {
    setGifSearchStatus(
      getRecentGifStickers().length
        ? 'recently used gifs ♡'
        : GIPHY_API_KEY
          ? 'search public gifs or pick one below ♡'
          : 'add your GIPHY API key in script.js to enable public search'
    );
  }

  gifItems.forEach((gifItem) => {
    const button = document.createElement('button');
    button.className = 'gif-picker-card';
    button.type = 'button';
    button.dataset.gifUrl = gifItem.url;
    button.draggable = true;
    button.setAttribute('aria-label', `choose ${gifItem.label} gif`);

    const image = document.createElement('img');
    image.src = gifItem.url;
    image.alt = gifItem.label;
    image.loading = 'lazy';

    const label = document.createElement('span');
    label.textContent = gifItem.label;

    button.append(image, label);
    button.addEventListener('click', () => {
      selectedGifStickerUrl = gifItem.url;
      gifPickerGrid.querySelectorAll('.gif-picker-card').forEach((card) => {
        card.classList.toggle('active', card === button);
      });
    });

    button.addEventListener('dragstart', (event) => {
      activeSticker = gifItem.url;
      activeStickerSize = DEFAULT_GIF_STICKER_SIZE;
      selectedGifStickerUrl = gifItem.url;
      requestAnimationFrame(() => {
        stickerPopup.classList.remove('open');
      });
      document.body.classList.add('sticker-dragging');

      if (event.dataTransfer) {
        event.dataTransfer.setData(STICKER_MIME_TYPE, gifItem.url);
        event.dataTransfer.setData('text/plain', gifItem.url);
        event.dataTransfer.effectAllowed = 'copy';
        event.dataTransfer.dropEffect = 'copy';
      }
    });

    button.addEventListener('dragend', () => {
      activeSticker = null;
      activeStickerSize = null;
      document.body.classList.remove('sticker-dragging');
      document
        .querySelectorAll('.post-body.sticker-drop-ready')
        .forEach((node) => node.classList.remove('sticker-drop-ready'));
    });

    gifPickerGrid.appendChild(button);
  });

  hasRenderedGifPicker = true;
}

function renderTypedStickerPreview() {
  if (!typedStickerPreviewWrap || !typedStickerPreview) return;

  const typedValue = String(stickerInput?.value || '').trim();
  const hasValue = Boolean(typedValue);

  typedStickerPreviewWrap.hidden = !hasValue;
  typedStickerPreview.textContent = typedValue;
  typedStickerPreview.setAttribute(
    'aria-label',
    hasValue ? `use typed sticker ${typedValue}` : 'typed sticker preview'
  );
  typedStickerPreview.classList.toggle('is-ready', hasValue);
}

async function searchPublicGifs() {
  if (!gifSearchInput) return;

  const query = gifSearchInput.value.trim();
  gifSearchQuery = query;

  if (!query) {
    gifSearchResults = [];
    setGifSearchStatus('search public gifs or pick one below ♡');
    renderGifPicker();
    return;
  }

  if (!GIPHY_API_KEY) {
    gifSearchResults = [];
    setGifSearchStatus('add your GIPHY API key in script.js to enable public search');
    renderGifPicker();
    return;
  }

  gifSearchLoading = true;
  setGifSearchStatus(`searching for "${query}"...`);

  try {
    const response = await fetch(
      `${GIPHY_SEARCH_ENDPOINT}?api_key=${encodeURIComponent(GIPHY_API_KEY)}&q=${escapeQueryParam(query)}&limit=12&rating=g&bundle=messaging_non_clips`,
      {
        headers: {
          'X-Requested-With': GIPHY_CLIENT_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GIF search failed with ${response.status}`);
    }

    const payload = await response.json();
    gifSearchResults = (payload?.data || [])
      .map((gifItem) => ({
        label: gifItem?.title || query,
        url: getGiphyStickerUrl(gifItem)
      }))
      .filter((gifItem) => gifItem.url);

    if (gifSearchResults.length) {
      setGifSearchStatus(`showing public gifs for "${query}"`);
    } else {
      setGifSearchStatus(`no public gifs found for "${query}"`);
    }
    renderGifPicker();
  } catch (error) {
    console.error(error);
    gifSearchResults = [];
    setGifSearchStatus('could not load public gifs right now');
    renderGifPicker();
  } finally {
    gifSearchLoading = false;
  }
}

      function renderStickerGrid() {
        return;
      }

      async function handleStickerDrop(event, postId) {
        event.preventDefault();

        let droppedSticker = activeSticker;

        if (!droppedSticker && event.dataTransfer) {
          droppedSticker = event.dataTransfer.getData(STICKER_MIME_TYPE);
        }

        if (!droppedSticker) {
          showMessage('no sticker selected ♡');
          return;
        }

        const user = await getCurrentUser();

        if (!user) {
          showMessage('please log in first ♡');
          return;
        }

        const body =
          getDropBodyFromTarget(event.currentTarget) ||
          getDropBodyFromTarget(event.target);

        if (!body) {
          showMessage('could not find the post area ♡');
          return;
        }

        body.classList.remove('sticker-drop-ready');
        const stickerRadius = isGifSticker(droppedSticker)
          ? Math.max(16, (activeStickerSize || DEFAULT_GIF_STICKER_SIZE) / 2)
          : 16;
        const { x, y } = getStickerPositionFromPointer(event, body, stickerRadius);

        const { error } = await supabaseClient
          .from('post_stickers')
          .insert({
            post_id: postId,
            user_id: user.id,
            emoji: droppedSticker,
            x,
            y
          });

        if (error) {
          console.error('POST STICKER INSERT ERROR:', error);
          showMessage(error.message);
          return;
        }

        if (isGifSticker(droppedSticker)) {
          const gifItem =
            gifSearchResults.find((item) => item.url === droppedSticker) ||
            STICKER_GIF_LIBRARY.find((item) => item.url === droppedSticker) ||
            getRecentGifStickers().find((item) => item.url === droppedSticker) ||
            { label: 'gif sticker', url: droppedSticker };
          saveRecentGifSticker(gifItem);
        }

        activeSticker = null;
        document.body.classList.remove('sticker-dragging');
        showMessage('sticker placed ♡');
        await loadPlacedStickers();

        if (isGifSticker(droppedSticker)) {
          const insertedSticker = [...placedStickers]
            .reverse()
            .find((item) =>
              item.postId === postId &&
              item.userId === user.id &&
              item.sticker === droppedSticker &&
              item.x === x &&
              item.y === y
            );

          if (insertedSticker) {
            savePlacedGifSize(insertedSticker.id, activeStickerSize || DEFAULT_GIF_STICKER_SIZE);
            renderPlacedStickers();
          }
        }

        activeStickerSize = null;
      }

function renderPlacedStickers() {
  document.querySelectorAll('.reaction-layer').forEach((layer) => {
    layer.innerHTML = '';
  });

  placedStickers.forEach((item) => {
    const layer = document.querySelector(`[data-post-id="${item.postId}"] .reaction-layer`);
    if (!layer) return;
    const isGif = isGifSticker(item.sticker);
    const gifSize = isGif ? getPlacedGifSize(item.id) : DEFAULT_GIF_STICKER_SIZE;

    const el = document.createElement('div');
    el.className = 'reaction-sticker';
    el.dataset.stickerId = item.id;
    if (visibleGifStickerControlTimers.has(item.id)) {
      el.classList.add('show-controls');
    }
    if (isPercentStickerPosition(item)) {
      el.style.left = `${item.x}%`;
      el.style.top = `${item.y}%`;
    } else {
      const layerWidth = layer.clientWidth || layer.getBoundingClientRect().width;
      const layerHeight = layer.clientHeight || layer.getBoundingClientRect().height;
      const stickerRadius = Math.max(16, gifSize / 2);
      const xPx = Math.max(stickerRadius, Math.min(layerWidth - stickerRadius, Number(item.x) || stickerRadius));
      const yPx = Math.max(stickerRadius, Math.min(layerHeight - stickerRadius, Number(item.y) || stickerRadius));
      el.style.left = `${Math.round(xPx)}px`;
      el.style.top = `${Math.round(yPx)}px`;
    }

    const stickerVisual = createStickerVisual(item.sticker, { size: gifSize });
    el.appendChild(stickerVisual);

    if (currentProfile?.id === item.userId) {
      const controlRow = document.createElement('div');
      controlRow.className = 'sticker-control-row';

      stickerVisual.addEventListener('pointerdown', (event) => {
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
          pointerId: event.pointerId
        };

        el.classList.add('is-dragging');
        document.body.classList.add('sticker-repositioning');
        stickerVisual.setPointerCapture?.(event.pointerId);
      });

      stickerVisual.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        showGifStickerControls(item.id);
      });

      if (isGif) {
        const resizeControls = document.createElement('div');
        resizeControls.className = 'sticker-size-controls';

        const shrinkBtn = document.createElement('button');
        shrinkBtn.className = 'sticker-size-btn';
        shrinkBtn.type = 'button';
        shrinkBtn.textContent = '-';
        shrinkBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          hideGifStickerControls(item.id);
          savePlacedGifSize(item.id, gifSize - 12);
          renderPlacedStickers();
          showGifStickerControls(item.id);
        });

        const growBtn = document.createElement('button');
        growBtn.className = 'sticker-size-btn';
        growBtn.type = 'button';
        growBtn.textContent = '+';
        growBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          hideGifStickerControls(item.id);
          savePlacedGifSize(item.id, gifSize + 12);
          renderPlacedStickers();
          showGifStickerControls(item.id);
        });

        resizeControls.append(shrinkBtn, growBtn);
        controlRow.appendChild(resizeControls);

        const undoBtn = document.createElement('button');
        undoBtn.className = 'sticker-undo-btn';
        undoBtn.type = 'button';
        undoBtn.textContent = 'undo';
        undoBtn.addEventListener('click', async (event) => {
          event.stopPropagation();
          hideGifStickerControls(item.id);
          await deletePlacedSticker(item.id);
        });
        controlRow.appendChild(undoBtn);
      } else {
        const undoBtn = document.createElement('button');
        undoBtn.className = 'sticker-undo-btn';
        undoBtn.type = 'button';
        undoBtn.textContent = 'undo';
        undoBtn.addEventListener('click', async (event) => {
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
  const stickerEl = document.querySelector(`.reaction-sticker[data-sticker-id="${stickerId}"]`);
  if (stickerEl) {
    stickerEl.classList.remove('show-controls');
  }

  const timer = visibleGifStickerControlTimers.get(stickerId);
  if (timer) {
    clearTimeout(timer);
    visibleGifStickerControlTimers.delete(stickerId);
  }
}

function showGifStickerControls(stickerId) {
  const stickerEl = document.querySelector(`.reaction-sticker[data-sticker-id="${stickerId}"]`);
  if (!stickerEl) return;

  const existingTimer = visibleGifStickerControlTimers.get(stickerId);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  stickerEl.classList.add('show-controls');
  const timer = window.setTimeout(() => hideGifStickerControls(stickerId), 2000);
  visibleGifStickerControlTimers.set(stickerId, timer);
}

function startWidgetDrag(event, widget, element) {
  if (window.matchMedia('(max-width: 1180px), (pointer: coarse)').matches) {
    return;
  }

  const zone = widget.side === 'left' ? leftZone : rightZone;
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
    frameId: null
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
    latestClientY
  } = dragWidget;

  const pageRect = document.querySelector('.page')?.getBoundingClientRect() || document.documentElement.getBoundingClientRect();
  const zoneRect = zone.getBoundingClientRect();
  const widgetWidth = element.offsetWidth || 240;
  const widgetHeight = element.offsetHeight || 100;
  const nextX = originX + (latestClientX - startX);
  const nextY = originY + (latestClientY - startY);
  const gutter = 8;
  const midpoint = pageRect.left + (pageRect.width / 2);
  const minX =
    widget.side === 'left'
      ? pageRect.left - zoneRect.left + gutter
      : midpoint - zoneRect.left + gutter;
  const maxX =
    widget.side === 'left'
      ? midpoint - zoneRect.left - widgetWidth - gutter
      : pageRect.right - zoneRect.left - widgetWidth - gutter;
  const minY = Math.max(pageRect.top - zoneRect.top + gutter, 0);
  const maxY = Math.max(minY, pageRect.bottom - zoneRect.top - widgetHeight - gutter);

  widget.x = Math.round(Math.max(minX, Math.min(maxX, nextX)));
  widget.y = Math.round(Math.max(minY, Math.min(maxY, nextY)));

  element.style.left = `${widget.x}px`;
  element.style.top = `${widget.y}px`;
}

function scheduleDraggedWidgetPositionUpdate() {
  if (!dragWidget || dragWidget.frameId) return;
  dragWidget.frameId = window.requestAnimationFrame(updateDraggedWidgetPosition);
}

window.addEventListener('pointermove', (event) => {
  if (draggingPlacedSticker) {
    event.preventDefault();
    const { element, layerRect, stickerId, sticker } = draggingPlacedSticker;
    const isGif = isGifSticker(sticker.sticker);
    const stickerSize = isGif ? getPlacedGifSize(stickerId) : 32;
    const stickerRadius = Math.max(16, stickerSize / 2);
    const nextXpx = Math.round(
      Math.max(stickerRadius, Math.min(layerRect.width - stickerRadius, event.clientX - layerRect.left))
    );
    const nextYpx = Math.round(
      Math.max(stickerRadius, Math.min(layerRect.height - stickerRadius, event.clientY - layerRect.top))
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
  dragWidget.element.classList.add('dragging');
  document.body.classList.add('dragging-widget');
  pendingWidgetDrag = null;
}
  }

  if (!dragWidget) return;

  dragWidget.latestClientX = event.clientX;
  dragWidget.latestClientY = event.clientY;
  scheduleDraggedWidgetPositionUpdate();
});

window.addEventListener('pointerup', async () => {
  if (draggingPlacedSticker) {
    const finishedStickerDrag = draggingPlacedSticker;
    draggingPlacedSticker = null;
    document.body.classList.remove('sticker-repositioning');

    finishedStickerDrag.element.classList.remove('is-dragging');

    if (
      Number.isFinite(finishedStickerDrag.nextX) &&
      Number.isFinite(finishedStickerDrag.nextY) &&
      (
        finishedStickerDrag.nextX !== finishedStickerDrag.sticker.x ||
        finishedStickerDrag.nextY !== finishedStickerDrag.sticker.y
      )
    ) {
      const didSave = await updatePlacedStickerPosition(
        finishedStickerDrag.stickerId,
        finishedStickerDrag.nextX,
        finishedStickerDrag.nextY
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
    dragWidget.element.classList.remove('dragging');
  }

  document.body.classList.remove('dragging-widget');
  document.body.classList.remove('sticker-repositioning');

  dragWidget = null;
  pendingWidgetDrag = null;

  if (finishedDrag) {
    await saveWidgetToSupabase(finishedDrag.widget);
  }
});

window.addEventListener('pointercancel', () => {
  if (dragWidget?.frameId) {
    window.cancelAnimationFrame(dragWidget.frameId);
  }

  if (dragWidget?.element) {
    dragWidget.element.classList.remove('dragging');
  }

  dragWidget = null;
  pendingWidgetDrag = null;
  document.body.classList.remove('dragging-widget');

  if (draggingPlacedSticker?.element) {
    draggingPlacedSticker.element.classList.remove('is-dragging');
  }

  draggingPlacedSticker = null;
  document.body.classList.remove('sticker-repositioning');
});
if (stickerTabs) {
  stickerTabs.addEventListener('click', (event) => {
    const button = event.target.closest('[data-sticker-tab]');
    if (!button) return;
    switchStickerTab(button.dataset.stickerTab);
  });
}

if (gifSearchBtn) {
  gifSearchBtn.addEventListener('click', searchPublicGifs);
}

if (gifSearchInput) {
  gifSearchInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    searchPublicGifs();
  });
}

if (stickerInput) {
  stickerInput.addEventListener('input', () => {
    renderTypedStickerPreview();
  });
}

if (typedStickerPreview) {
  typedStickerPreview.addEventListener('click', () => {
    const typedValue = String(stickerInput?.value || '').trim();
    if (!typedValue) return;
    activeSticker = typedValue;
    activeStickerSize = null;
    typedStickerPreview.classList.add('is-active');
    showMessage('drag it onto a diary entry ♡');
  });

  typedStickerPreview.addEventListener('dragstart', (event) => {
    const typedValue = String(stickerInput?.value || '').trim();
    if (!typedValue) {
      event.preventDefault();
      return;
    }

    activeSticker = typedValue;
    activeStickerSize = null;
    requestAnimationFrame(() => {
      stickerPopup.classList.remove('open');
    });
    document.body.classList.add('sticker-dragging');

    if (event.dataTransfer) {
      event.dataTransfer.setData(STICKER_MIME_TYPE, typedValue);
      event.dataTransfer.setData('text/plain', typedValue);
      event.dataTransfer.effectAllowed = 'copy';
      event.dataTransfer.dropEffect = 'copy';
    }
  });

  typedStickerPreview.addEventListener('dragend', () => {
    activeSticker = null;
    activeStickerSize = null;
    typedStickerPreview.classList.remove('is-active');
    document.body.classList.remove('sticker-dragging');
    document
      .querySelectorAll('.post-body.sticker-drop-ready')
      .forEach((node) => node.classList.remove('sticker-drop-ready'));
  });
}

      closeStickerPopup.addEventListener('click', () => {
        selectedGifStickerUrl = '';
        if (typedStickerPreview) {
          typedStickerPreview.classList.remove('is-active');
        }
        stickerPopup.classList.remove('open');
      });

      stickerPopup.addEventListener('click', (event) => {
        if (event.target === stickerPopup && !popupPointerStartedInsideCard) {
          selectedGifStickerUrl = '';
          if (typedStickerPreview) {
            typedStickerPreview.classList.remove('is-active');
          }
          stickerPopup.classList.remove('open');
        }
      });

      if (newEntryBtn) {
        newEntryBtn.addEventListener('click', () => {
          resetEntryPopup();
          entryPopup.classList.add('open');
          newEntryBtn.classList.remove('is-hidden');
          focusEntryComposerToEnd();
        });
      }

      closeEntryPopup.addEventListener('click', () => {
        resetEntryPopup();
        entryPopup.classList.remove('open');
      });

      if (entryImageInput) {
        entryImageInput.addEventListener('change', async () => {
          const file = entryImageInput.files?.[0];

          if (!file) {
            return;
          }

          try {
            const imageData = await compressImageFile(file, {
              maxSize: 1200,
              quality: 0.84
            });
            renderEntryImagePreview(imageData);
          } catch (error) {
            console.error(error);
            showMessage(error.message || 'could not load image ♡');
            entryImageInput.value = '';
            renderEntryImagePreview('');
          }
        });
      }

      if (removeEntryImageBtn) {
        removeEntryImageBtn.addEventListener('click', () => {
          if (entryImageInput) {
            entryImageInput.value = '';
          }

          renderEntryImagePreview('');
        });
      }

      entryPopup.addEventListener('click', (event) => {
         if (event.target === entryPopup && !popupPointerStartedInsideCard) {
          resetEntryPopup();
          entryPopup.classList.remove('open');
        }
      });

      closeCommentsPopup.addEventListener('click', () => {
        commentsPopup.classList.remove('open');
        replyingToCommentId = null;
        replyingToLabel.style.display = 'none';
        replyingToLabel.textContent = '';
      });

      commentsPopup.addEventListener('click', (event) => {
        if (event.target === commentsPopup && !popupPointerStartedInsideCard) {
          commentsPopup.classList.remove('open');
        }
      });

      closeWidgetPopup.addEventListener('click', () => {
        widgetPopup.classList.remove('open');
        saveWidgetBtn.style.display = 'inline-flex';
        setHeaderWidgetSaveVisibility(false);
        setWidgetPopupLikeButton(null);
        if (clearWidgetHistoryBtn) clearWidgetHistoryBtn.style.display = 'none';
      });

      widgetPopup.addEventListener('click', (event) => {
        if (event.target === widgetPopup && !popupPointerStartedInsideCard) {
          widgetPopup.classList.remove('open');
          saveWidgetBtn.style.display = 'inline-flex';
          setHeaderWidgetSaveVisibility(false);
          setWidgetPopupLikeButton(null);
          if (clearWidgetHistoryBtn) clearWidgetHistoryBtn.style.display = 'none';
        }
      });

      widgetPopup.addEventListener('pointerdown', (event) => {
        event.stopPropagation();
      });

      widgetPopup.addEventListener('mousedown', (event) => {
        event.stopPropagation();
      });

      saveWidgetBtn.addEventListener('click', saveWidgetChanges);
      if (headerSaveWidgetBtn) {
        headerSaveWidgetBtn.addEventListener('click', saveWidgetChanges);
      }
      if (widgetPopupLikeBtn) {
        widgetPopupLikeBtn.addEventListener('click', async () => {
          const widgetId = widgetPopupLikeBtn.dataset.widgetLikeId;
          if (!widgetId) return;
          await toggleWidgetLike(widgetId);
        });
      }
      if (clearWidgetHistoryBtn) {
        clearWidgetHistoryBtn.addEventListener('click', () => {
          const widgetId = clearWidgetHistoryBtn.dataset.clearWidgetHistoryId;
          const widget = widgets.find((item) => item.id === widgetId);
          if (!widget) return;

          const shouldClear = window.confirm(`Clear history for ${widget.title}?`);
          if (!shouldClear) return;

          clearWidgetHistory(widget.id);
          openWidgetHistory(widget.id);
          showMessage('history cleared ♡');
        });
      }

      const authPopup = document.getElementById('authPopup');
      const emailInput = document.getElementById('emailInput');
      const passwordInput = document.getElementById('passwordInput');
      const passwordToggleBtn = document.getElementById('passwordToggleBtn');
      const signupBtn = document.getElementById('signupBtn');
      const loginBtn = document.getElementById('loginBtn');
      const profileBtn = document.getElementById('profileBtn');
      const profilePopup = document.getElementById('profilePopup');
      const closeProfilePopup = document.getElementById('closeProfilePopup');
      const nicknameInput = document.getElementById('nicknameInput');
      const pfpInput = document.getElementById('pfpInput');
      const saveProfileBtn = document.getElementById('saveProfileBtn');
      const messageBox = document.getElementById('messageBox');
      const logoutBtn = document.getElementById('logoutBtn');

      let currentProfile = null;

function showMessage(text) {
  if (!messageBox) {
    alert(text);
    return;
  }

  messageBox.textContent = text;
  messageBox.classList.add('show');

  clearTimeout(showMessage.timeout);
  showMessage.timeout = setTimeout(() => {
    messageBox.classList.remove('show');
  }, 2200);
}

function getEditedPostIds() {
  try {
    const raw = localStorage.getItem('editedPostIds');
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
    localStorage.setItem('editedPostIds', JSON.stringify([...ids]));
  } catch (error) {
    console.error(error);
  }
}

function unmarkPostAsEdited(postId) {
  try {
    const ids = getEditedPostIds().filter((id) => id !== postId);
    localStorage.setItem('editedPostIds', JSON.stringify(ids));
  } catch (error) {
    console.error(error);
  }
}

function getWidgetHistoryEntries(widgetId) {
  try {
    const raw = localStorage.getItem(`widgetHistory:${widgetId}`);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function summarizeWidgetHistory(widget) {
  const normalizedId = String(widget.id || '').toLowerCase().trim();
  const normalizedTitle = String(widget.title || '').toLowerCase();

  if (normalizedId === 'song') {
    return `${widget.data?.songName || 'untitled'}\n${widget.data?.durationLabel || ''}`.trim();
  }

  if (normalizedId === 'love') {
    return `since ${widget.data?.startDate || ''}`.trim();
  }

  if (normalizedId === 'note' || normalizedTitle.includes('little note')) {
    return widget.data?.text || 'little note';
  }

  if (normalizedId === 'dates' || normalizedTitle.includes('important dates')) {
    const count = widget.data?.items?.length || 0;
    return `${count} saved date${count === 1 ? '' : 's'}`;
  }

  if (normalizedId === 'wishlist' || normalizedTitle.includes('wishlist')) {
    const count = widget.data?.items?.length || 0;
    return `${count} wishlist item${count === 1 ? '' : 's'}`;
  }

  return widget.content || widget.title || 'widget update';
}

function recordWidgetHistory(widget) {
  try {
    const existing = getWidgetHistoryEntries(widget.id);
    const nextEntry = {
      savedAt: new Date().toISOString(),
      summary: summarizeWidgetHistory(widget),
      title: widget.title || '',
      side: widget.side || '',
      x: widget.x ?? null,
      y: widget.y ?? null
    };

    localStorage.setItem(
      `widgetHistory:${widget.id}`,
      JSON.stringify([nextEntry, ...existing].slice(0, 20))
    );
  } catch (error) {
    console.error(error);
  }
}

function clearWidgetHistory(widgetId) {
  try {
    localStorage.removeItem(`widgetHistory:${widgetId}`);
  } catch (error) {
    console.error(error);
  }
}

function openWidgetHistory(widgetId) {
  const widget = widgets.find((item) => item.id === widgetId);
  if (!widget) return;

  const historyEntries = getWidgetHistoryEntries(widget.id);
  widgetPopupTitle.textContent = `${widget.title} history`;
  saveWidgetBtn.style.display = 'none';
  setHeaderWidgetSaveVisibility(false);
  setWidgetPopupLikeButton(null);
  if (clearWidgetHistoryBtn) {
    clearWidgetHistoryBtn.style.display = historyEntries.length ? 'inline-flex' : 'none';
    clearWidgetHistoryBtn.dataset.clearWidgetHistoryId = widget.id;
  }

  widgetEditorFields.innerHTML = historyEntries.length
    ? `
      <div class="widget-history-list">
        ${historyEntries.map((entry) => `
          <div class="widget-history-item">
            <div class="widget-history-time">${formatEntryDate(entry.savedAt)}</div>
            <div class="widget-history-summary">${entry.summary || 'widget update'}</div>
          </div>
        `).join('')}
      </div>
    `
    : `<div class="small-note">no widget history yet ♡</div>`;

  widgetPopup.classList.add('open');
}

function resetEntryPopup() {
  editingPostId = null;
  if (entryPopupTitle) entryPopupTitle.textContent = 'new entry ♡';
  if (entryPopupLabel) entryPopupLabel.textContent = 'write something ♡';
  if (saveEntryBtn) saveEntryBtn.textContent = 'post';
  clearEntryComposer();
}

function openEntryEditor(postId) {
  const post = posts.find((item) => item.id === postId);
  if (!post) return;

  editingPostId = postId;
  if (entryPopupTitle) entryPopupTitle.textContent = 'edit entry ♡';
  if (entryPopupLabel) entryPopupLabel.textContent = 'change your words ♡';
  if (saveEntryBtn) saveEntryBtn.textContent = 'save';
  setEntryComposerFromStoredContent(post.text || '');
  entryPopup.classList.add('open');
  focusEntryComposerToEnd();
}

function setCurrentUser(user) {
  currentUser = user || null;
  if (appToolbar) {
    appToolbar.dataset.authState = currentUser ? 'logged-in' : 'logged-out';
  }
  if (!currentUser) {
    closeNotificationsPanel();
  }
}

function setToolbarAuthState(state) {
  if (appToolbar) {
    appToolbar.dataset.authState = state;
  }
}

function setAppBootingState(isBooting) {
  document.body.classList.toggle('app-booting', isBooting);
}

function hideLaunchSplash() {
  if (!launchSplash) {
    setAppBootingState(false);
    return Promise.resolve();
  }

  launchSplash.classList.add('is-hiding');

  return new Promise((resolve) => {
    window.setTimeout(() => {
      setAppBootingState(false);
      launchSplash.hidden = true;
      resolve();
    }, BOOT_SPLASH_FADE_MS);
  });
}

function renderSignedOutShell() {
  renderTimelineSkeleton();
  renderWidgetSkeletons();
  renderNotifications();
}

function getNotificationStorageUserId() {
  return currentUser?.id || currentProfile?.id || '';
}

function getNotificationsSeenStorageKey() {
  const userId = getNotificationStorageUserId();
  return userId ? `notificationsSeenAt:${userId}` : '';
}

function getNotificationsSeenAt() {
  const key = getNotificationsSeenStorageKey();
  if (!key) return '';

  try {
    return localStorage.getItem(key) || '';
  } catch {
    return '';
  }
}

function setNotificationsSeenAt(value) {
  const key = getNotificationsSeenStorageKey();
  if (!key) return;

  try {
    if (!value) return;
    const existingValue = localStorage.getItem(key) || '';
    const existingTimestamp = existingValue ? new Date(existingValue).getTime() : 0;
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
  return userId ? `notificationsClearedAt:${userId}` : '';
}

function getNotificationsClearedAt() {
  const key = getNotificationsClearedStorageKey();
  if (!key) return '';

  try {
    return localStorage.getItem(key) || '';
  } catch {
    return '';
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

function getVisibleNotifications() {
  const clearedAt = getNotificationsClearedAt();
  const clearedTimestamp = clearedAt ? new Date(clearedAt).getTime() : 0;

  return notifications.filter((item) => {
    const createdAt = new Date(item.created_at).getTime();
    return !clearedTimestamp || createdAt > clearedTimestamp;
  });
}

function ensureNotificationsSeenBaseline() {
  const key = getNotificationsSeenStorageKey();
  if (!key || !notifications.length) return;

  const existingSeenAt = getNotificationsSeenAt();
  if (existingSeenAt) return;

  const latestCreatedAt = notifications[0]?.created_at || '';
  if (latestCreatedAt) {
    setNotificationsSeenAt(latestCreatedAt);
  }
}

function formatNotificationRelativeTime(dateString) {
  const timestamp = new Date(dateString).getTime();
  if (!timestamp) return '';

  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return formatEntryDate(dateString);
}

function getNotificationTypeLabel(type) {
  if (type === 'reply') return 'reply';
  if (type === 'comment') return 'comment';
  if (type === 'post_like') return 'like';
  if (type === 'comment_like') return 'comment like';
  if (type === 'sticker') return 'sticker';
  return 'update';
}

function closeNotificationsPanel() {
  if (!notificationsPanel || !notificationsBtn) return;
  notificationsPanel.hidden = true;
  notificationsBtn.setAttribute('aria-expanded', 'false');
}

function markNotificationsRead() {
  const visibleNotifications = getVisibleNotifications();
  if (!visibleNotifications.length) {
    renderNotifications();
    return;
  }

  const latestCreatedAt = visibleNotifications[0]?.created_at || new Date().toISOString();
  setNotificationsSeenAt(latestCreatedAt);
  renderNotifications();
}

function clearNotifications() {
  const visibleNotifications = getVisibleNotifications();
  if (!visibleNotifications.length) {
    renderNotifications();
    return;
  }

  const latestCreatedAt = visibleNotifications[0]?.created_at || new Date().toISOString();
  setNotificationsClearedAt(latestCreatedAt);
  setNotificationsSeenAt(latestCreatedAt);
  renderNotifications();
}

function openNotificationsPanel() {
  if (!currentUser || !notificationsPanel || !notificationsBtn) return;
  notificationsPanel.hidden = false;
  notificationsBtn.setAttribute('aria-expanded', 'true');
  markNotificationsRead();
}

function focusPost(postId, options = {}) {
  const { openComments = false } = options;
  const target = document.querySelector(`[data-post-id="${postId}"]`);

  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target.classList.add('post-highlight');
    window.setTimeout(() => target.classList.remove('post-highlight'), 1400);
  }

  if (openComments) {
    openCommentsPopup(postId);
  }
}

function renderNotifications() {
  if (!notificationsList || !notificationsBtn || !notificationsBadge) return;

  const visibleNotifications = getVisibleNotifications();
  const seenAt = getNotificationsSeenAt();
  const seenTimestamp = seenAt ? new Date(seenAt).getTime() : 0;
  const unreadCount = visibleNotifications.filter((item) => {
    const createdAt = new Date(item.created_at).getTime();
    return createdAt > seenTimestamp;
  }).length;

  notificationsBadge.hidden = unreadCount === 0;
  notificationsBadge.textContent = unreadCount > 99 ? '99+' : String(unreadCount);

  if (!visibleNotifications.length) {
    notificationsList.innerHTML = `<div class="notification-empty">no little updates yet ♡</div>`;
    return;
  }

  notificationsList.innerHTML = visibleNotifications
    .map((item) => {
      const createdAt = new Date(item.created_at).getTime();
      const isUnread = createdAt > seenTimestamp;

      return `
        <button
          class="notification-item${isUnread ? ' is-unread' : ''}"
          type="button"
          data-notification-post-id="${item.postId || ''}"
          data-notification-open-comments="${item.openComments ? 'true' : 'false'}"
        >
          <div class="notification-topline">
            <span class="notification-type">${getNotificationTypeLabel(item.type)}</span>
            <span class="notification-time">${formatNotificationRelativeTime(item.created_at)}</span>
          </div>
          <div class="notification-message">${item.message}</div>
        </button>
      `;
    })
    .join('');

  notificationsList.querySelectorAll('.notification-item').forEach((button) => {
    button.addEventListener('click', () => {
      const postId = button.dataset.notificationPostId;
      const openComments = button.dataset.notificationOpenComments === 'true';

      closeNotificationsPanel();

      if (postId) {
        focusPost(postId, { openComments });
      }
    });
  });
}

function buildNotifications({
  postsData = [],
  commentsData = [],
  likesData = [],
  stickersData = [],
  profilesData = [],
  render = true
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
  const commentById = new Map(commentsData.map((comment) => [comment.id, comment]));
  const profileById = new Map(profilesData.map((profile) => [profile.id, profile]));
  const ownPostIds = new Set(postsData.filter((post) => post.user_id === myUserId).map((post) => post.id));
  const ownCommentIds = new Set(commentsData.filter((comment) => comment.user_id === myUserId).map((comment) => comment.id));
  const nextNotifications = [];

  commentsData.forEach((comment) => {
    if (!comment.created_at || comment.user_id === myUserId) return;

    const actorProfile = profileById.get(comment.user_id);
    const actorName = comment.profiles?.nickname || comment.profiles?.username || actorProfile?.nickname || actorProfile?.username || 'someone';
    const parentComment = comment.parent_comment_id ? commentById.get(comment.parent_comment_id) : null;
    const post = postById.get(comment.post_id);

    if (parentComment?.user_id === myUserId) {
      nextNotifications.push({
        id: `reply:${comment.id}`,
        type: 'reply',
        created_at: comment.created_at,
        postId: comment.post_id,
        openComments: true,
        message: `${actorName} replied to your comment`
      });
      return;
    }

    if (post?.user_id === myUserId) {
      nextNotifications.push({
        id: `comment:${comment.id}`,
        type: 'comment',
        created_at: comment.created_at,
        postId: comment.post_id,
        openComments: true,
        message: `${actorName} commented on your entry`
      });
    }
  });

  likesData.forEach((like) => {
    if (!like.created_at || like.user_id === myUserId) return;

    const actorProfile = profileById.get(like.user_id);
    const actorName = actorProfile?.nickname || actorProfile?.username || 'someone';

    if (like.post_id && ownPostIds.has(like.post_id)) {
      nextNotifications.push({
        id: `post-like:${like.id}`,
        type: 'post_like',
        created_at: like.created_at,
        postId: like.post_id,
        openComments: false,
        message: `${actorName} liked your entry`
      });
      return;
    }

    if (like.comment_id && ownCommentIds.has(like.comment_id)) {
      const comment = commentById.get(like.comment_id);
      nextNotifications.push({
        id: `comment-like:${like.id}`,
        type: 'comment_like',
        created_at: like.created_at,
        postId: comment?.post_id || '',
        openComments: Boolean(comment?.post_id),
        message: `${actorName} liked your comment`
      });
    }
  });

  stickersData.forEach((sticker) => {
    if (!sticker.created_at || sticker.user_id === myUserId || !ownPostIds.has(sticker.post_id)) return;

    const actorProfile = profileById.get(sticker.user_id);
    const actorName = actorProfile?.nickname || actorProfile?.username || 'someone';
    nextNotifications.push({
      id: `sticker:${sticker.id}`,
      type: 'sticker',
      created_at: sticker.created_at,
      postId: sticker.post_id,
      openComments: false,
      message: isGifSticker(sticker.emoji)
        ? `${actorName} added a gif sticker to your entry`
        : `${actorName} added ${sticker.emoji} to your entry`
    });
  });

  notifications = nextNotifications.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  ensureNotificationsSeenBaseline();

  if (render) {
    renderNotifications();
  }
}

let popupPointerStartedInsideCard = false;

document.querySelectorAll('.popup-card').forEach((card) => {
  ['click', 'mousedown', 'pointerdown'].forEach((eventName) => {
    card.addEventListener(eventName, (event) => {
      if (eventName === 'mousedown' || eventName === 'pointerdown') {
        popupPointerStartedInsideCard = true;
      }
      event.stopPropagation();
    });
  });
});

window.addEventListener('pointerup', () => {
  requestAnimationFrame(() => {
    popupPointerStartedInsideCard = false;
  });
});

window.addEventListener('mouseup', () => {
  requestAnimationFrame(() => {
    popupPointerStartedInsideCard = false;
  });
});

async function getCurrentUser() {
  if (currentUser) return currentUser;

  const {
    data: { user }
  } = await supabaseClient.auth.getUser();

  currentUser = user || null;
  return currentUser;
}

async function refreshUserData(options = {}) {
  const { includeWidgets = false } = options;
  renderTimelineSkeleton();
  renderNotifications();
  if (includeWidgets) {
    renderWidgetSkeletons();
  }

  const tasks = [
    loadPosts({ render: false }),
    loadUserStickers({ render: false })
  ];

  if (includeWidgets) {
    tasks.push(loadWidgets({ render: false }));
  }

  await Promise.all(tasks);
  if (includeWidgets) {
    await refreshWeatherWidget({ render: false });
  }
  renderTimeline();
  renderStickerGrid();
  renderNotifications();
  if (includeWidgets) {
    renderWidgets();
  }
}

profileBtn.addEventListener('click', () => {
  profilePopup.classList.add('open');
});

closeProfilePopup.addEventListener('click', () => {
  profilePopup.classList.remove('open');
});

profilePopup.addEventListener('click', (event) => {
  if (event.target === profilePopup && !popupPointerStartedInsideCard) {
    profilePopup.classList.remove('open');
  }
});

async function ensureProfile(user, fallbackNickname = '') {
  const { data: existing, error: selectError } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (selectError) {
    console.error(selectError);
    return null;
  }

  if (existing) return existing;

  const usernameBase = user.email
    ? user.email.split('@')[0]
    : `user-${user.id.slice(0, 6)}`;

  const { data: created, error: insertError } = await supabaseClient
    .from('profiles')
    .insert({
      id: user.id,
      username: usernameBase,
      nickname: fallbackNickname || usernameBase,
      avatar_url: null
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
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  currentProfile = data;

  if (currentProfile) {
    const hasCurrentProfile = knownProfiles.some((profile) => profile?.id === currentProfile.id);
    knownProfiles = hasCurrentProfile
      ? knownProfiles.map((profile) => (profile?.id === currentProfile.id ? currentProfile : profile))
      : [currentProfile, ...knownProfiles];
    nicknameInput.value = currentProfile.nickname || '';
  }

  return data;
}

async function loadUserStickers(options = {}) {
  const { render = true } = options;
  const user = await getCurrentUser();

  if (!user) {
    personalStickers = [];
    if (render) {
      renderStickerGrid();
    }
    return;
  }

  const { data, error } = await supabaseClient
    .from('user_stickers')
    .select('id, emoji')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    showMessage(error.message);
    return;
  }

  personalStickers = data || [];
  if (render) {
    renderStickerGrid();
  }
}

async function loadPlacedStickers() {
  const { data, error } = await supabaseClient
    .from('post_stickers')
    .select('id, post_id, user_id, emoji, x, y');

  if (error) {
    console.error(error);
    showMessage(error.message);
    return;
  }

  const stickerRows = data || [];
  const seenStickerKeys = new Map();
  const duplicateStickerIds = [];

  stickerRows.forEach((row) => {
    const key = [row.post_id, row.user_id, row.emoji, row.x, row.y].join('::');

    if (seenStickerKeys.has(key)) {
      duplicateStickerIds.push(row.id);
      return;
    }

    seenStickerKeys.set(key, row.id);
  });

  if (duplicateStickerIds.length) {
    const { error: cleanupError } = await supabaseClient
      .from('post_stickers')
      .delete()
      .in('id', duplicateStickerIds);

    if (cleanupError) {
      console.error(cleanupError);
      showMessage(cleanupError.message);
      return;
    }
  }

  const uniqueStickerRows = stickerRows.filter(
    (row) => !duplicateStickerIds.includes(row.id)
  );

  placedStickers = uniqueStickerRows.map((row) => {
    const savedPosition = getSavedPlacedStickerPosition(row.id);

    return {
      id: row.id,
      postId: row.post_id,
      userId: row.user_id,
      sticker: row.emoji,
      x: savedPosition?.x ?? row.x,
      y: savedPosition?.y ?? row.y
    };
  });

  renderPlacedStickers();

  if (duplicateStickerIds.length) {
    showMessage('cleaned up duplicate stickers ♡');
  }
}

async function deleteUserSticker(stickerId) {
  const { error } = await supabaseClient
    .from('user_stickers')
    .delete()
    .eq('id', stickerId);

  if (error) {
    console.error(error);
    showMessage(error.message);
    return;
  }

  await loadUserStickers();
  showMessage('sticker deleted ♡');
}

async function deletePlacedSticker(stickerId) {
  const { error } = await supabaseClient
    .from('post_stickers')
    .delete()
    .eq('id', stickerId);

  if (error) {
    console.error(error);
    showMessage(error.message);
    return;
  }

  clearPlacedGifSize(stickerId);
  clearPlacedStickerPosition(stickerId);
  await loadPlacedStickers();
  showMessage('sticker removed ♡');
}

async function updatePlacedStickerPosition(stickerId, x, y) {
  const user = await getCurrentUser();

  if (!user) {
    showMessage('please log in first ♡');
    return false;
  }

  const nextX = clampStickerPercent(x);
  const nextY = clampStickerPercent(y);
  const localSticker = placedStickers.find((item) => item.id === stickerId);
  const updatePayload = {
    x: nextX,
    y: nextY
  };

  savePlacedStickerPosition(stickerId, nextX, nextY);
  if (localSticker) {
    localSticker.x = nextX;
    localSticker.y = nextY;
  }

  let updateQuery = supabaseClient
    .from('post_stickers')
    .update(updatePayload)
    .eq('id', stickerId);

  if (localSticker?.userId) {
    updateQuery = updateQuery.eq('user_id', localSticker.userId);
  } else {
    updateQuery = updateQuery.eq('user_id', user.id);
  }

  let { data: updatedSticker, error } = await updateQuery.select('id').maybeSingle();

  if (error) {
    console.error(error);
    showMessage(error.message);
    showMessage('position saved on this device ♡');
    return true;
  }

  if (!updatedSticker || !localSticker?.userId || localSticker.userId !== user.id) {
    const fallbackResult = await supabaseClient
      .from('post_stickers')
      .update(updatePayload)
      .eq('id', stickerId)
      .select('id')
      .maybeSingle();

    if (fallbackResult.error) {
      console.error(fallbackResult.error);
      showMessage(fallbackResult.error.message);
      showMessage('position saved on this device ♡');
      return true;
    }

    updatedSticker = fallbackResult.data;
  }

  if (!updatedSticker) {
    showMessage('position saved on this device ♡');
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
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error(countError);
    showMessage(countError.message);
    return;
  }

  if ((count || 0) >= 2) {
    showMessage('only me and you are allowed here ♡');
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) {
    showMessage(error.message);
    return;
  }

  if (data.user) {
    currentUser = data.user;
    setToolbarAuthState('checking');
    await ensureProfile(data.user);
    await loadProfile(data.user);
    await refreshUserData({ includeWidgets: true });
    setCurrentUser(data.user);
  }

  showMessage('account created ♡');
  authPopup.classList.remove('open');
}

async function loginUser() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const { data, error } =
    await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

  if (error) {
    showMessage(error.message);
    return;
  }

  if (data.user) {
    currentUser = data.user;
    setToolbarAuthState('checking');
    await loadProfile(data.user);
    await refreshUserData({ includeWidgets: true });
    setCurrentUser(data.user);
  }

  showMessage('hi again hehe ♡');
  authPopup.classList.remove('open');
}

function setPasswordVisibility(isVisible) {
  if (!passwordInput || !passwordToggleBtn) return;

  passwordInput.type = isVisible ? 'text' : 'password';
  passwordToggleBtn.innerHTML = `<span class="password-toggle-icon" aria-hidden="true">${isVisible ? '◌' : '◉'}</span>`;
  passwordToggleBtn.setAttribute('aria-label', isVisible ? 'hide password' : 'show password');
  passwordToggleBtn.setAttribute('aria-pressed', String(isVisible));
}

async function saveProfile() {

  const nickname = nicknameInput.value.trim();
  const file = pfpInput.files[0];

  const user = await getCurrentUser();

  if (!user) {
    showMessage('please log in first ♡');
    return;
  }

  let avatarUrl = currentProfile?.avatar_url || null;

  if (file) {
    const filePath = `${user.id}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabaseClient.storage
      .from('profile-pictures')
      .upload(filePath, file);

    if (uploadError) {
      showMessage(uploadError.message);
      return;
    }

    const { data } = supabaseClient.storage
      .from('profile-pictures')
      .getPublicUrl(filePath);

    avatarUrl = data.publicUrl;
  }

  const usernameBase = user.email
    ? user.email.split('@')[0]
    : `user-${user.id.slice(0, 6)}`;

  const finalNickname =
    nickname || currentProfile?.nickname || usernameBase;

  const { data: savedProfile, error } = await supabaseClient
    .from('profiles')
    .upsert({
      id: user.id,
      username: currentProfile?.username || usernameBase,
      nickname: finalNickname,
      avatar_url: avatarUrl
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    showMessage(error.message);
    return;
  }

  currentProfile = savedProfile;

  posts = posts.map((post) =>
    post.userId === user.id
      ? {
          ...post,
          nickname: currentProfile.nickname,
          avatarUrl: currentProfile.avatar_url || ''
        }
      : post
  );

  renderTimeline();
  profilePopup.classList.remove('open');
  pfpInput.value = '';

  showMessage('updated! <3');
}

async function loadPosts(options = {}) {
  const { render = true } = options;
  const editedPostIds = new Set(getEditedPostIds());
  const [
    { data: postsData, error: postsError },
    { data: commentsData, error: commentsError },
    { data: stickersData, error: stickersError },
    likesResult,
    { data: profilesData, error: profilesError }
  ] = await Promise.all([
    supabaseClient
      .from('posts')
      .select(`
        id,
        content,
        created_at,
        user_id,
        profiles (
          nickname,
          avatar_url,
          username
        )
      `)
      .order('created_at', { ascending: false }),
    supabaseClient
      .from('comments')
      .select(`
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
      `)
      .order('created_at', { ascending: true }),
    supabaseClient
      .from('post_stickers')
      .select('id, post_id, user_id, emoji, x, y, created_at'),
    supabaseClient
      .from('likes')
      .select('id, post_id, comment_id, user_id, created_at'),
    supabaseClient
      .from('profiles')
      .select('id, nickname, username')
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

  knownProfiles = profilesData || [];

  let { data: likesData, error: likesError } = likesResult;

  if (likesError) {
    commentLikesEnabled = false;

    const fallbackLikes = await supabaseClient
      .from('likes')
      .select('id, post_id, user_id, created_at');

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
    nickname: comment.profiles?.nickname || comment.profiles?.username || 'memory',
    likesCount: (likesByCommentId.get(comment.id) || []).length,
    likedByMe: (likesByCommentId.get(comment.id) || []).some(
      (like) => like.user_id === currentProfile?.id
    )
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
        replies: repliesByParentId.get(comment.id) || []
      }));

    return {
      id: row.id,
      userId: row.user_id,
      text: row.content,
      created_at: row.created_at,
      isEdited: editedPostIds.has(row.id),
      author: row.user_id === currentProfile?.id ? 'posted by you' : 'posted by them',
      nickname: row.profiles?.nickname || row.profiles?.username || 'memory',
      avatarUrl: row.profiles?.avatar_url || '',
      likesCount: postLikes.length,
      likedByMe: postLikes.some((like) => like.user_id === currentProfile?.id),
      comments: topLevelComments
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
      y: savedPosition?.y ?? row.y
    };
  });

  buildNotifications({
    postsData: postsData || [],
    commentsData: commentsData || [],
    likesData: likesData || [],
    stickersData: stickersData || [],
    profilesData: profilesData || [],
    render
  });

  if (render) {
    renderTimeline();
  }
}

async function saveEntry() {
  let content = '';
  let plainText = '';

  if (entryQuill) {
    plainText = entryQuill.getText().trim();
    content = sanitizePostHtml(entryQuill.root?.innerHTML || '');
  } else {
    plainText = String(entryContentFallback?.value || '').trim();
    content = toSafeHtmlFromPlainText(plainText);
  }

  const attachedImage = String(entryImageData?.value || '').trim();
  if (!plainText && !attachedImage) {
    showMessage('write something first ♡');
    return;
  }

  const user = await getCurrentUser();

  if (!user) {
    showMessage('please log in first ♡');
    return;
  }

  let entryImageUrl = attachedImage;

  if (isInlineImageDataUrl(attachedImage)) {
    try {
      entryImageUrl = await uploadEntryImageData(user.id, attachedImage);
    } catch (error) {
      console.error(error);
      showMessage(error.message || 'could not upload image ♡');
      return;
    }
  }

  content = composeEntryContentWithAttachment(content, entryImageUrl);

  let error;

  if (editingPostId) {
    markPostAsEdited(editingPostId);
    const updateResult = await supabaseClient
      .from('posts')
      .update({ content })
      .eq('id', editingPostId)
      .eq('user_id', user.id);

    error = updateResult.error;
  } else {
    const insertResult = await supabaseClient
      .from('posts')
      .insert({
        user_id: user.id,
        content
      });

    error = insertResult.error;
  }

  if (error) {
    console.error(error);
    showMessage(error.message);
    return;
  }

  const successMessage = editingPostId ? 'entry updated ♡' : 'entry posted! <3';
  resetEntryPopup();
  entryPopup.classList.remove('open');
  showMessage(successMessage);
  await loadPosts();
}

async function deleteEntry(postId) {
  const postEl = document.querySelector(`[data-post-id="${postId}"]`);

  if (postEl) {
    postEl.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    postEl.style.opacity = '0';
    postEl.style.transform = 'translateY(10px)';
  }

  const { error } = await supabaseClient
    .from('posts')
    .delete()
    .eq('id', postId);

  if (error) {
    console.error(error);
    showMessage(error.message);
    await loadPosts();
    return;
  }

  unmarkPostAsEdited(postId);
  showMessage('entry deleted ♡');
  await loadPosts();
}

async function toggleLike(postId) {
  if (pendingPostLikeIds.has(postId)) return;

  const user = await getCurrentUser();

  if (!user) {
    showMessage('please log in first ♡');
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
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id)
      : await supabaseClient
          .from('likes')
          .insert({
            post_id: postId,
            user_id: user.id
          });

    if (result.error) throw result.error;

    loadPosts();
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
    .from('widgets')
    .select('*')
    .eq('id', widgetId)
    .order('updated_at', { ascending: false })
    .limit(1);

  if (error) {
    throw error;
  }

  return data?.[0] || null;
}

function mergeWidgetFromSavedRow(widget, savedRow) {
  if (!widget || !savedRow) return;

  widget.title = savedRow.title ?? widget.title;
  widget.side = savedRow.side ?? widget.side;
  widget.x = savedRow.x ?? widget.x;
  widget.y = savedRow.y ?? widget.y;
  widget.data = savedRow.data ?? widget.data;
  widget.content = savedRow.content ?? widget.content;
}

async function toggleWidgetLike(widgetId) {
  if (pendingWidgetLikeIds.has(widgetId)) return;

  const user = await getCurrentUser();

  if (!user) {
    showMessage('please log in first ♡');
    return;
  }

  const widget = widgets.find((item) => item.id === widgetId);
  if (!widget || !isLikeableWidget(widget)) return;

  let previousLikes = getWidgetLikeUserIds(widget);

  pendingWidgetLikeIds.add(widgetId);

  try {
    const latestSavedRow = await fetchLatestWidgetRow(widgetId);
    if (latestSavedRow) {
      mergeWidgetFromSavedRow(widget, latestSavedRow);
    }

    normalizeWidgetLikesData(widget);
    previousLikes = getWidgetLikeUserIds(widget);

    const wasLiked = previousLikes.includes(user.id);
    widget.data.likes = wasLiked
      ? previousLikes.filter((likedUserId) => likedUserId !== user.id)
      : [...previousLikes, user.id];

    renderWidgets();

    const saved = await saveWidgetToSupabase(widget, {
      recordHistory: false,
      suppressErrorMessage: true
    });

    if (!saved) {
      throw new Error('could not update widget like ♡');
    }
  } catch (error) {
    console.error(error);
    widget.data = {
      ...(widget.data && typeof widget.data === 'object' ? widget.data : {}),
      likes: previousLikes
    };
    renderWidgets();
    showMessage(error.message || 'could not update widget like ♡');
  } finally {
    pendingWidgetLikeIds.delete(widgetId);
    syncWidgetLikeButton(widgetId);
  }
}

async function toggleCommentLike(commentId) {
  const user = await getCurrentUser();

  if (!user) {
    showMessage('please log in first ♡');
    return;
  }

  const post = posts.find((item) => item.id === currentCommentsPostId);
  if (!post) return;

  const allComments = [
    ...(post.comments || []),
    ...(post.comments || []).flatMap((comment) => comment.replies || [])
  ];
  const comment = allComments.find((item) => item.id === commentId);

  if (!comment) return;

  if (!commentLikesEnabled) {
    showMessage('comment likes need a comment_id column in your likes table ♡');
    return;
  }

  if (comment.likedByMe) {
    const { error } = await supabaseClient
      .from('likes')
      .delete()
      .eq('comment_id', commentId)
      .eq('user_id', user.id);

    if (error) {
      console.error(error);
      showMessage(error.message);
      return;
    }
  } else {
    const { error } = await supabaseClient
      .from('likes')
      .insert({
        comment_id: commentId,
        user_id: user.id
      });

    if (error) {
      console.error(error);
      showMessage(error.message);
      return;
    }
  }

  await loadPosts();
  renderCommentsList(currentCommentsPostId);
}

function openCommentsPopup(postId) {
  currentCommentsPostId = postId;
  replyingToCommentId = null;
  replyingToLabel.style.display = 'none';
  replyingToLabel.textContent = '';
  commentInput.value = '';
  renderCommentsList(postId);
  commentsPopup.classList.add('open');
}

function renderCommentsList(postId) {
  const post = posts.find((item) => item.id === postId);

  if (!post || !post.comments || !post.comments.length) {
    commentsList.innerHTML = `<div class="comment-empty">no comments yet ♡</div>`;
    return;
  }

  commentsList.innerHTML = post.comments.map((comment) => {
    const repliesHtml = (comment.replies || []).map((reply) => {
      return `
        <div class="comment-reply" data-comment-id="${reply.id}">
          <div class="comment-name">${reply.nickname || 'memory'}</div>
          <div class="comment-text" data-comment-text-id="${reply.id}"></div>

          <div class="comment-actions">
            <button class="comment-like-btn" type="button" data-comment-id="${reply.id}">
              ${reply.likedByMe ? '🩷 liked' : '♡ like'} (${reply.likesCount || 0})
            </button>
            ${reply.userId === currentProfile?.id ? `
              <button class="delete-reply-btn" type="button" data-comment-id="${reply.id}">
                delete
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="comment-item" data-comment-id="${comment.id}">
        <div class="comment-name">${comment.nickname || 'memory'}</div>
        <div class="comment-text" data-comment-text-id="${comment.id}"></div>

        <div class="comment-actions">
          <button class="comment-like-btn" type="button" data-comment-id="${comment.id}">
            ${comment.likedByMe ? '🩷 liked' : '♡ like'} (${comment.likesCount || 0})
          </button>
          <button class="reply-btn" type="button" data-comment-id="${comment.id}">
            reply
          </button>

          ${comment.userId === currentProfile?.id ? `
            <button class="delete-comment-btn" type="button" data-comment-id="${comment.id}">
              delete
            </button>
          ` : ''}
        </div>

        ${repliesHtml}
      </div>
    `;
  }).join('');

  post.comments.forEach((comment) => {
    const commentTextEl = commentsList.querySelector(
      `[data-comment-text-id="${comment.id}"]`
    );
    if (commentTextEl) {
      commentTextEl.textContent = comment.text;
    }

    (comment.replies || []).forEach((reply) => {
      const replyTextEl = commentsList.querySelector(
        `[data-comment-text-id="${reply.id}"]`
      );
      if (replyTextEl) {
        replyTextEl.textContent = reply.text;
      }
    });
  });

  document.querySelectorAll('.reply-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      replyingToCommentId = btn.dataset.commentId;
      replyingToLabel.style.display = 'block';
      replyingToLabel.textContent = 'replying to a comment ♡';
      commentInput.focus();
    });
  });

  document.querySelectorAll('.comment-like-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      await toggleCommentLike(btn.dataset.commentId);
    });
  });

  document.querySelectorAll('.delete-comment-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      await deleteComment(btn.dataset.commentId);
    });
  });

  document.querySelectorAll('.delete-reply-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      await deleteComment(btn.dataset.commentId);
    });
  });
}

async function saveComment() {
  const content = commentInput.value.trim();

  if (!content || !currentCommentsPostId) {
    showMessage('write something first silly! ♡');
    return;
  }

  const user = await getCurrentUser();

  if (!user) {
    showMessage('log in first silly! ♡');
    return;
  }

  const { error } = await supabaseClient
    .from('comments')
    .insert({
      post_id: currentCommentsPostId,
      user_id: user.id,
      content,
      parent_comment_id: replyingToCommentId
    });

  if (error) {
    console.error(error);
    showMessage(error.message);
    return;
  }

  commentInput.value = '';
  replyingToCommentId = null;
  replyingToLabel.style.display = 'none';
  replyingToLabel.textContent = '';

  await loadPosts();
  renderCommentsList(currentCommentsPostId);
  showMessage('comment posted! ♡');
}

async function deleteComment(commentId) {
  const el = document.querySelector(`[data-comment-id="${commentId}"]`);

  if (el) {
    el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateY(6px) scale(0.98)';
  }

  setTimeout(async () => {
    const { error } = await supabaseClient
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) {
      console.error(error);
      showMessage(error.message);
      await loadPosts();
      return;
    }

    showMessage('comment deleted ♡');
    await loadPosts();
    renderCommentsList(currentCommentsPostId);
  }, 250);
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
  profilePopup.classList.remove('open');
  authPopup.classList.add('open');

  emailInput.value = '';
  passwordInput.value = '';
  nicknameInput.value = '';
  pfpInput.value = '';

  personalStickers = [];
  renderStickerGrid();

  placedStickers = [];
  renderPlacedStickers();
  notifications = [];
  closeNotificationsPanel();
  renderSignedOutShell();

  showMessage('logged out ♡');
}

async function checkSession() {
  const {
    data: { session }
  } = await supabaseClient.auth.getSession();

  if (session?.user) {
    currentUser = session.user;
    setToolbarAuthState('checking');
    authPopup.classList.remove('open');
    await loadProfile(session.user);
    await refreshUserData({ includeWidgets: true });
    setCurrentUser(session.user);
  } else {
    currentProfile = null;
    knownProfiles = [];
    setCurrentUser(null);
    authPopup.classList.add('open');
    posts = [];
    personalStickers = [];
    placedStickers = [];
    notifications = [];
    closeNotificationsPanel();
    renderSignedOutShell();
  }
}

if (signupBtn) signupBtn.addEventListener('click', signUpUser);
if (loginBtn) loginBtn.addEventListener('click', loginUser);
if (notificationsBtn) {
  notificationsBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!currentUser || !notificationsPanel) return;

    if (notificationsPanel.hidden) {
      openNotificationsPanel();
    } else {
      closeNotificationsPanel();
    }
  });
}
if (markAllReadBtn) {
  markAllReadBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    markNotificationsRead();
  });
}
if (clearNotificationsBtn) {
  clearNotificationsBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    clearNotifications();
  });
}
if (passwordToggleBtn) {
  passwordToggleBtn.addEventListener('click', () => {
    setPasswordVisibility(passwordInput?.type === 'password');
  });
}
if (emailInput) {
  emailInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    loginUser();
  });
}
if (passwordInput) {
  passwordInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    loginUser();
  });
}
if (saveProfileBtn) saveProfileBtn.addEventListener('click', saveProfile);
if (logoutBtn) logoutBtn.addEventListener('click', logoutUser);
if (saveEntryBtn) saveEntryBtn.addEventListener('click', saveEntry);
if (saveCommentBtn) saveCommentBtn.addEventListener('click', saveComment);
if (toggleWidgetsBtn) toggleWidgetsBtn.addEventListener('click', toggleAllWidgetsMinimized);
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
mobileViewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setMobileView(button.dataset.mobileView || 'timeline');
  });
});
window.addEventListener('scroll', updateFloatingEntryButtonVisibility, { passive: true });
window.addEventListener('resize', syncMobileViewSwitcherVisibility, { passive: true });
updateFloatingEntryButtonVisibility();
document.addEventListener('click', (event) => {
  if (!notificationsMenu?.contains(event.target)) {
    closeNotificationsPanel();
  }
});
document.addEventListener('click', (event) => {
  const link = event.target.closest?.('a[href]');

  if (!link || !isLegacyAnniversaryUrl(link.href)) {
    return;
  }

  event.preventDefault();
        window.open(ANNIVERSARY_WRAPPER_URL, '_blank', 'noopener,noreferrer');
}, true);

setTheme(document.documentElement.dataset.theme);
normalizeChromeSymbols();
try {
  activeMobileView = localStorage.getItem(MOBILE_VIEW_STORAGE_KEY) || 'timeline';
} catch (error) {
  console.error(error);
  activeMobileView = 'timeline';
}
applyMobileView();
syncMobileViewSwitcherVisibility();
initEntryEditor();
renderDecor();
renderTimelineSkeleton();
renderWidgetSkeletons();
renderNotifications();

async function initApp() {
  try {
    await checkSession();
  } finally {
    if (!shouldUseLaunchSplash()) {
      if (launchSplash) {
        launchSplash.hidden = true;
      }
      setAppBootingState(false);
      return;
    }

    const elapsed = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - bootStartedAt;
    const remaining = Math.max(0, BOOT_SPLASH_MIN_MS - elapsed);

    window.setTimeout(() => {
      void hideLaunchSplash();
    }, remaining);
  }
}

initApp();
