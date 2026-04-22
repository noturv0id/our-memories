const SUPABASE_URL = 'https://ytrbsxknhlsfqkqphlms.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_oyurIPBCFJuFsjN0L6LyIg_PaXihCYn';

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
const ANNIVERSARY_WRAPPER_URL =
  'https://noturv0id.github.io/our-memories/anniversary-wrapper.html?v=20260422-3';
const STICKER_MIME_TYPE = 'application/x-our-memories-sticker';
let hasRenderedEmojiPicker = false;
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
      title: " ",
      subtitle: ' ',
      note: ' '
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
        <div style="font-size:0.94rem;line-height:1.5;">drink some water, take a breath, and remember you are loved ♡</div>
        <a
          class="soft-btn"
          href="${ANNIVERSARY_WRAPPER_URL}"
          target="_blank"
          style="justify-self:start;text-decoration:none;display:inline-flex;align-items:center;"
        >
          open website
        </a>
      </div>
    `,
  },

  {
    id: '˖⁺‧₊stickers₊‧⁺˖',
    title: '˖⁺‧₊my stickers₊‧⁺˖',
    side: 'right',
    x: 0,
    y: 455,
    content: `<div class="sticker-widget-body"><div class="sticker-grid" id="stickerGrid"></div><div class="sticker-widget-footer"><button class="soft-btn" id="openStickerPopup">+ add sticker</button></div></div>`,
  },
];

      let posts = [];
      let personalStickers = [];
      let placedStickers = [];
      let notifications = [];
      let activeSticker = null;
      let dragWidget = null;
       let currentCommentsPostId = null;
       let replyingToCommentId = null;
       let editingWidgetId = null;
       let editingPostId = null;
       let pendingWidgetDrag = null;
       let commentLikesEnabled = true;
       let currentUser = null;
       let entryQuill = null;
       const pendingPostLikeIds = new Set();

       const floatingDecorEl = document.getElementById('floatingDecor');
       const leftZone = document.getElementById('leftZone');
       const rightZone = document.getElementById('rightZone');
       const timelineEl = document.getElementById('timeline');
      const stickerPopup = document.getElementById('stickerPopup');
      const stickerTabs = document.getElementById('stickerTabs');
      const stickerInput = document.getElementById('stickerInput');
      const emojiPickerGrid = document.getElementById('emojiPickerGrid');
      const saveStickerBtn = document.getElementById('saveStickerBtn');
      const closeStickerPopup = document.getElementById('closeStickerPopup');
       const newEntryBtn = document.getElementById('newEntryBtn');
      const appToolbar = document.getElementById('appToolbar');
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
       const widgetEditorFields = document.getElementById('widgetEditorFields');
       const saveWidgetBtn = document.getElementById('saveWidgetBtn');
       const clearWidgetHistoryBtn = document.getElementById('clearWidgetHistoryBtn');

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
           const label = themeToggle.querySelector('.theme-toggle-label');
           if (label) label.textContent = isDark ? 'light' : 'dark';
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

       function escapeHtml(value) {
         return String(value || '')
           .replaceAll('&', '&amp;')
           .replaceAll('<', '&lt;')
           .replaceAll('>', '&gt;')
           .replaceAll('"', '&quot;')
           .replaceAll("'", '&#39;');
       }

       function looksLikeHtml(value) {
         return /<\/?[a-z][\s>]/i.test(String(value || ''));
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

      function getPostDisplayHtml(content) {
        const value = String(content || '');
        if (!value) return '';
        return looksLikeHtml(value) ? sanitizePostHtml(value) : toSafeHtmlFromPlainText(value);
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
           return;
         }

         if (entryContentFallback) entryContentFallback.value = '';
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
         const html = getPostDisplayHtml(content);

         if (entryQuill) {
           entryQuill.clipboard.dangerouslyPasteHTML(html || '');
           return;
         }

         if (entryContentFallback) entryContentFallback.value = htmlToPlainText(html);
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

      function getWidgetContent(widget) {
  const normalizedId = String(widget.id || '').toLowerCase().trim();
  const normalizedTitle = String(widget.title || '').toLowerCase();

  const isDatesWidget =
    normalizedId === 'dates' || normalizedTitle.includes('important dates');

  if (normalizedId === 'song') {
    return `
      <p style="margin:0;font-size:0.96rem;font-weight:700;">${widget.data.title} — ${widget.data.subtitle}</p>
      <p style="margin:10px 0 0;font-size:0.82rem;opacity:0.75;">“${widget.data.note}”</p>
    `;
  }

  const isNoteWidget =
  normalizedId === 'note' || normalizedTitle.includes('little note');

if (isNoteWidget) {
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

  if (!items.length) {
    return `<div style="font-size:0.92rem;opacity:0.75;">nothing on the wishlist yet ⋆˙⟡</div>`;
  }

  const html = items.map((item) => `
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
    .select('*');

  if (error) {
    console.error(error);
    showMessage(error.message);
    return;
  }

  if (data && data.length) {
    const widgetsNeedingWishlistNormalization = [];

    widgets = widgets.map((defaultWidget) => {
      const savedWidget = data.find((row) => row.id === defaultWidget.id);

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
          widgetsNeedingWishlistNormalization.push(mergedWidget);
        }
      }

      return mergedWidget;
    });

    for (const widget of widgetsNeedingWishlistNormalization) {
      await saveWidgetToSupabase(widget);
    }
  }

  if (render) {
    renderWidgets();
  }
}

function renderWidgets() {
  leftZone.innerHTML = '';
  rightZone.innerHTML = '';

  widgets.forEach((widget) => {
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

    const hasHistory =
      normalizedId === 'song' ||
      isNoteWidget;

    const isEditable =
      ['song', 'memories', 'love'].includes(normalizedId) ||
      isNoteWidget ||
      isDatesWidget ||
      isWishlistWidget;

    const editTargetId =
      isDatesWidget ? 'dates' :
      isWishlistWidget ? 'wishlist' :
      isNoteWidget ? 'note' :
      normalizedId;

    const el = document.createElement('div');
    el.className = 'widget';
    if (isStickerWidget) {
      el.classList.add('sticker-widget');
    }
    el.style.left = widget.x + 'px';
    el.style.top = widget.y + 'px';

    el.innerHTML = `
      <div class="widget-bar" data-widget-id="${widget.id}">
        <span>${widget.title}</span>
        <div class="widget-bar-actions">
          ${hasHistory ? `<button class="widget-history-btn" type="button" data-widget-history-id="${widget.id}">🕘</button>` : ''}
          <button class="widget-edit-btn" type="button" data-widget-id="${widget.id}">
            ${isEditable ? '✎' : '✦'}
          </button>
        </div>
      </div>
      <div class="widget-content">${getWidgetContent(widget)}</div>
    `;
    upgradeLegacyAnniversaryLinks(el);

    const bar = el.querySelector('.widget-bar');
    const editBtn = el.querySelector('.widget-edit-btn');
    const historyBtn = el.querySelector('.widget-history-btn');

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

    if (editBtn && isEditable) {
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

    bar.addEventListener('pointerdown', (event) => {
      if (event.target.closest('.widget-edit-btn')) return;
      startWidgetDrag(event, widget, el);
    });

    if (widget.side === 'left') {
      leftZone.appendChild(el);
    } else {
      rightZone.appendChild(el);
    }
  });

  renderStickerGrid();
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

  const normalizedId = String(widgetId || '').toLowerCase().trim();

  const widget = widgets.find((item) => {
    const itemId = String(item.id || '').toLowerCase().trim();
    const itemTitle = String(item.title || '').toLowerCase();

    if (itemId === normalizedId) return true;
    if (normalizedId === 'dates' && itemTitle.includes('important dates')) return true;
    if (normalizedId === 'wishlist' && itemTitle.includes('wishlist')) return true;
    if (normalizedId === 'note' && itemTitle.includes('little note')) return true;

    return false;
  });

  if (!widget) return;

  editingWidgetId = normalizedId;

  if (normalizedId === 'love') {
    widgetPopupTitle.textContent = "｡ ₊°༺ together for ༻°₊ ｡:";
    saveWidgetBtn.style.display = 'none';

    widgetEditorFields.innerHTML = `
      <div class="small-note">i hope i get forever with you, sweetie ᰔᩚ</div>
    `;
  } else if (normalizedId === 'song') {
    widgetPopupTitle.textContent = `edit ${widget.title}`;
    saveWidgetBtn.style.display = 'inline-flex';

    widgetEditorFields.innerHTML = `
      <label class="popup-label">widget title</label>
      <input class="popup-input" id="widgetFieldWidgetTitle" type="text" value="${widget.title || ''}" />

      <label class="popup-label" style="margin-top:12px;">song title</label>
      <input class="popup-input" id="widgetFieldTitle" type="text" value="${widget.data?.title || ''}" />

      <label class="popup-label" style="margin-top:12px;">artist</label>
      <input class="popup-input" id="widgetFieldSubtitle" type="text" value="${widget.data?.subtitle || ''}" />

      <label class="popup-label" style="margin-top:12px;">little note</label>
      <textarea class="popup-input" id="widgetFieldNote" rows="4" style="resize: vertical; min-height: 96px;">${widget.data?.note || ''}</textarea>
    `;
  } else if (normalizedId === 'note') {
    widgetPopupTitle.textContent = '⋆𐙚₊little note˚⊹♡';
    saveWidgetBtn.style.display = 'inline-flex';

    widgetEditorFields.innerHTML = `
      <label class="popup-label">little note</label>
      <textarea class="popup-input" id="widgetFieldText" rows="5" style="resize: vertical; min-height: 110px;">${widget.data?.text || ''}</textarea>
    `;
  } else if (normalizedId === 'dates') {
    const items = widget.data?.items || [];

    widgetPopupTitle.textContent = 'important dates ♡';
    saveWidgetBtn.style.display = 'none';

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
          order: (getWishlistItemsInDisplayOrder(widget.data.items)[0]?.order ?? 0) - 1
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

        // Toggle done state; if item becomes done, remove it so it disappears from the list
        widget.data.items = (widget.data.items || []).map((item) =>
          item.id === wishId ? { ...item, done: !item.done } : item
        ).filter((item) => !item.done);

        await saveWidgetToSupabase(widget);
        renderWidgets();
        openWidgetEditor('wishlist');
        showMessage('wishlist updated ♡');
      });
    });
  } else {
    widgetPopupTitle.textContent = `edit ${widget.title}`;
    widgetEditorFields.innerHTML = `<div class="small-note">this widget is not editable yet ♡</div>`;
    saveWidgetBtn.style.display = 'none';
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

    return false;
  });

  if (!widget) return;

  const beforeSaveState = JSON.stringify({
    title: widget.title || '',
    data: widget.data || null
  });

  if (editingWidgetId === 'song') {
    widget.title = document.getElementById('widgetFieldWidgetTitle').value.trim() || 'currently listening to ₊˚⊹ᰔ ';
    widget.data.title = document.getElementById('widgetFieldTitle').value.trim();
    widget.data.subtitle = document.getElementById('widgetFieldSubtitle').value.trim();
    widget.data.note = document.getElementById('widgetFieldNote').value.trim();
  } else if (editingWidgetId === 'note') {
    if (!widget.data) widget.data = {};
    widget.data.text = document.getElementById('widgetFieldText').value.trim();
  } else {
    return;
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
  showMessage('widget updated ♡');
}

async function saveWidgetToSupabase(widget) {
  const { error } = await supabaseClient
    .from('widgets')
    .upsert({
      id: widget.id,
      title: widget.title,
      side: widget.side,
      x: Math.round(widget.x),
      y: Math.round(widget.y),
      data: widget.data || null,
      content: widget.content || null,
      updated_at: new Date().toISOString()
    });

  if (error) {
    console.error(error);
    showMessage(error.message);
    return;
  }

  recordWidgetHistory(widget);
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
  })).filter((item) => !item.done);

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

function syncPostLikeButton(postId) {
  const post = posts.find((item) => item.id === postId);
  const btn = document.querySelector(`.like-btn[data-post-id="${postId}"]`);

  if (!post || !btn) return;

  btn.textContent = getPostLikeLabel(post);
  btn.classList.toggle('liked', Boolean(post.likedByMe));
  btn.classList.toggle('is-pending', pendingPostLikeIds.has(postId));
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
            aria-pressed="${post.likedByMe ? 'true' : 'false'}"
          >
            ${getPostLikeLabel(post)}
          </button>
          <button class="post-btn comments-btn" type="button" data-post-id="${post.id}">
            comments (${post.comments?.length || 0})
          </button>
          ${isOwner ? `<button class="post-btn edit-entry-btn" type="button" data-post-id="${post.id}">edit</button>` : ''}
          ${isOwner ? `<button class="post-btn delete-entry-btn" type="button" data-post-id="${post.id}">delete</button>` : ''}
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

  document.querySelectorAll('.like-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      await toggleLike(btn.dataset.postId);
    });
  });

  document.querySelectorAll('.comments-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      openCommentsPopup(btn.dataset.postId);
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

  if (typePanel) {
    typePanel.classList.toggle('active', nextTab === 'type');
  }

  if (pickPanel) {
    pickPanel.classList.toggle('active', nextTab === 'pick');
  }

  if (nextTab === 'type') {
    stickerInput.focus();
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
      button.textContent = emojiValue;
      button.setAttribute('aria-label', `choose ${emojiValue}`);
      button.addEventListener('click', () => {
        stickerInput.value = emojiValue;
        switchStickerTab('type');
      });
      sectionGrid.appendChild(button);
    });

    section.appendChild(sectionGrid);
    emojiPickerGrid.appendChild(section);
  });

  hasRenderedEmojiPicker = true;
}

      function renderStickerGrid() {
        const grid = document.getElementById('stickerGrid');
        if (!grid) return;

        grid.innerHTML = '';
        personalStickers.forEach((sticker) => {
          const item = document.createElement('div');
          item.className = 'sticker-grid-item';

          const pill = document.createElement('button');
          pill.className = 'sticker-pill';
          pill.type = 'button';
          pill.draggable = true;
          pill.textContent = sticker.emoji;
          pill.title = 'drag onto a diary entry';

          pill.addEventListener('dragstart', (event) => {
            activeSticker = sticker.emoji;
            document.body.classList.add('sticker-dragging');

            if (event.dataTransfer) {
              event.dataTransfer.setData(STICKER_MIME_TYPE, sticker.emoji);
              event.dataTransfer.setData('text/plain', sticker.emoji);
              event.dataTransfer.effectAllowed = 'copy';
              event.dataTransfer.dropEffect = 'copy';
            }
          });

          pill.addEventListener('dragend', () => {
            activeSticker = null;
            document.body.classList.remove('sticker-dragging');
            document
              .querySelectorAll('.post-body.sticker-drop-ready')
              .forEach((node) => node.classList.remove('sticker-drop-ready'));
          });

          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'sticker-delete-btn';
          deleteBtn.type = 'button';
          deleteBtn.textContent = 'delete';
          deleteBtn.addEventListener('click', async () => {
            await deleteUserSticker(sticker.id);
          });

          item.appendChild(pill);
          item.appendChild(deleteBtn);
          grid.appendChild(item);
        });

        const openBtn = document.getElementById('openStickerPopup');
        if (openBtn) {
          openBtn.onclick = () => {
            stickerPopup.classList.add('open');
            renderEmojiPicker();
            switchStickerTab('type');
            stickerInput.focus();
          };
        }
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
        const rect = body.getBoundingClientRect();
        const stickerRadius = 16;
        const x = Math.round(
          Math.max(stickerRadius, Math.min(rect.width - stickerRadius, event.clientX - rect.left))
        );
        const y = Math.round(
          Math.max(stickerRadius, Math.min(rect.height - stickerRadius, event.clientY - rect.top))
        );

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

        activeSticker = null;
        document.body.classList.remove('sticker-dragging');
        showMessage('sticker placed ♡');
        await loadPlacedStickers();
      }

function renderPlacedStickers() {
  document.querySelectorAll('.reaction-layer').forEach((layer) => {
    layer.innerHTML = '';
  });

  placedStickers.forEach((item) => {
    const layer = document.querySelector(`[data-post-id="${item.postId}"] .reaction-layer`);
    if (!layer) return;

    const el = document.createElement('div');
    el.className = 'reaction-sticker';
    el.style.left = `${item.x}px`;
    el.style.top = `${item.y}px`;

    const emoji = document.createElement('span');
    emoji.className = 'reaction-sticker-emoji';
    emoji.textContent = item.sticker;
    el.appendChild(emoji);

    if (currentProfile?.id === item.userId) {
      const undoBtn = document.createElement('button');
      undoBtn.className = 'sticker-undo-btn';
      undoBtn.type = 'button';
      undoBtn.textContent = 'undo';
      undoBtn.addEventListener('click', async (event) => {
        event.stopPropagation();
        await deletePlacedSticker(item.id);
      });
      el.appendChild(undoBtn);
    }

    layer.appendChild(el);
  });
}

function startWidgetDrag(event, widget, element) {
  const zone = widget.side === 'left' ? leftZone : rightZone;

  pendingWidgetDrag = {
    widget,
    element,
    zone,
    startX: event.clientX,
    startY: event.clientY,
    originX: widget.x,
    originY: widget.y,
    pointerId: event.pointerId
  };
}

window.addEventListener('pointermove', (event) => {
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

  const { widget, zone, startX, startY, originX, originY } = dragWidget;
  const zoneRect = zone.getBoundingClientRect();
  const nextX = originX + (event.clientX - startX);
  const nextY = originY + (event.clientY - startY);

  widget.x = Math.max(-24, Math.min(zoneRect.width - 160, nextX));
  widget.y = Math.max(0, Math.min(zoneRect.height - 100, nextY));

  dragWidget.element.style.left = widget.x + 'px';
  dragWidget.element.style.top = widget.y + 'px';
});

window.addEventListener('pointerup', async () => {
  const finishedDrag = dragWidget;

  if (dragWidget?.element) {
    dragWidget.element.classList.remove('dragging');
  }

  document.body.classList.remove('dragging-widget');

  dragWidget = null;
  pendingWidgetDrag = null;

  if (finishedDrag) {
    await saveWidgetToSupabase(finishedDrag.widget);
  }
});
saveStickerBtn.addEventListener('click', async () => {
  const value = stickerInput.value.trim();
  if (!value) return;

  const user = await getCurrentUser();

  if (!user) {
    showMessage('please log in first ♡');
    return;
  }

  const { error } = await supabaseClient
    .from('user_stickers')
    .insert({
  user_id: user.id,
  emoji: value
});

  if (error) {
    console.error(error);
    showMessage(error.message);
    return;
  }

  stickerInput.value = '';
  stickerPopup.classList.remove('open');
  await loadUserStickers();
  showMessage('sticker saved ♡');
});

if (stickerTabs) {
  stickerTabs.addEventListener('click', (event) => {
    const button = event.target.closest('[data-sticker-tab]');
    if (!button) return;
    switchStickerTab(button.dataset.stickerTab);
  });
}

      closeStickerPopup.addEventListener('click', () => {
        stickerPopup.classList.remove('open');
      });

      stickerPopup.addEventListener('click', (event) => {
        if (event.target === stickerPopup && !popupPointerStartedInsideCard) {
          stickerPopup.classList.remove('open');
        }
      });

      newEntryBtn.addEventListener('click', () => {
        resetEntryPopup();
        entryPopup.classList.add('open');
        focusEntryComposerToEnd();
      });

      closeEntryPopup.addEventListener('click', () => {
        resetEntryPopup();
        entryPopup.classList.remove('open');
      });

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
        if (clearWidgetHistoryBtn) clearWidgetHistoryBtn.style.display = 'none';
      });

      widgetPopup.addEventListener('click', (event) => {
        if (event.target === widgetPopup && !popupPointerStartedInsideCard) {
          widgetPopup.classList.remove('open');
          saveWidgetBtn.style.display = 'inline-flex';
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
    return `${widget.data?.title || 'untitled'} — ${widget.data?.subtitle || 'unknown artist'}\n${widget.data?.note || ''}`.trim();
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

function getNotificationsSeenStorageKey() {
  const userId = currentProfile?.id || currentUser?.id;
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
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
}

function getNotificationsClearedStorageKey() {
  const userId = currentProfile?.id || currentUser?.id;
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
      message: `${actorName} added ${sticker.emoji} to your entry`
    });
  });

  notifications = nextNotifications.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

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

  placedStickers = uniqueStickerRows.map((row) => ({
    id: row.id,
    postId: row.post_id,
    userId: row.user_id,
    sticker: row.emoji,
    x: row.x,
    y: row.y
  }));

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

  await loadPlacedStickers();
  showMessage('sticker removed ♡');
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

  placedStickers = (stickersData || []).map((row) => ({
    id: row.id,
    postId: row.post_id,
    userId: row.user_id,
    sticker: row.emoji,
    x: row.x,
    y: row.y
  }));

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

  if (!plainText) {
    showMessage('write something first ♡');
    return;
  }

  const user = await getCurrentUser();

  if (!user) {
    showMessage('please log in first ♡');
    return;
  }

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
  renderNotifications();

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
    setCurrentUser(null);
    authPopup.classList.add('open');
    posts = [];
    personalStickers = [];
    notifications = [];
    closeNotificationsPanel();
    renderTimeline();
    renderNotifications();
    renderWidgets();
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
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
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
initEntryEditor();
renderDecor();
renderTimelineSkeleton();
renderWidgetSkeletons();
renderNotifications();

async function initApp() {
  try {
    await checkSession();
  } finally {
    requestAnimationFrame(() => {
      setAppBootingState(false);
    });
  }
}

initApp();
