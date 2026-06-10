const CAMERA_SYSTEMS = [
    {
        id: 'pi5_cam_1_myrtle',
        name: 'Incubator Myrtle #1',
        location: 'Incubator Bay A',
        ip: '192.168.2.43',
        uptime: '12d 08h',
        temperature: '33.4°C',
        cameras: [
            {
                id: 'pi1-cam1',
                label: 'Visible spectrum',
                streamUrl: 'http://192.168.2.43:5000/Camera_1',
                sensor: 'Camera Module 3',
                lens: 'Wide',
                fps: 30,
                resolution: '1536p',
                spectrum: 'RGB',
                autofocus: true,
            },
            {
                id: 'pi1-cam2',
                label: 'NoIR monitor',
                streamUrl: 'http://192.168.2.43:5000/camera2',
                sensor: 'Camera Module 3 NoIR',
                lens: 'Standard',
                fps: 30,
                resolution: '1536p',
                spectrum: 'IR',
                autofocus: true,
            },
        ],
    },
    {
        id: 'pi5_cam_2_myrtle',
        name: 'Incubator Myrtle #2',
        location: 'Incubator Bay B',
        ip: '192.168.2.158',
        uptime: '7d 21h',
        temperature: '32.9°C',
        cameras: [
            {
                id: 'pi2-cam1',
                label: 'Sample rail',
                streamUrl: 'http://192.168.2.158:5000/camera1',
                sensor: 'Camera Module 3',
                lens: 'Tele',
                fps: 40,
                resolution: '2028p',
                spectrum: 'RGB',
                autofocus: true,
            },
            {
                id: 'pi2-cam2',
                label: 'Chamber overview',
                streamUrl: 'http://192.168.2.18:5000/camera2',
                sensor: 'Camera Module 3 NoIR',
                lens: 'Wide',
                fps: 25,
                resolution: '1536p',
                spectrum: 'IR',
                autofocus: false,
            },
        ],
    },
    {
        id: 'pi5_cam_3_myrtle',
        name: 'Incubator Myrtle #3',
        location: 'Incubator Bay C',
        ip: '192.168.2.168',
        uptime: '18d 02h',
        temperature: '34.1°C',
        cameras: [
            {
                id: 'pi3-cam1',
                label: 'Tray monitor',
                streamUrl: 'http://192.168.2.168:5000/camera1',
                sensor: 'Camera Module 3',
                lens: 'Standard',
                fps: 30,
                resolution: '2028p',
                spectrum: 'RGB',
                autofocus: true,
            },
            {
                id: 'pi3-cam2',
                label: 'Humidity check',
                streamUrl: 'http://192.168.2.168:5000/camera2',
                sensor: 'Camera Module 3 NoIR',
                lens: 'Standard',
                fps: 25,
                resolution: '1536p',
                spectrum: 'IR',
                autofocus: false,
            },
        ],
    },
];

const YOUTUBE_INTEGRATION = {
    channelHandle: '@aaronhodgkins',
    channelUrl: 'https://www.youtube.com/@aaronhodgkins',
    featuredVideoId: '3BTijzaFmEY',
    liveChannelId: '@aaronhodgkins',
    studioLiveUrl: 'https://studio.youtube.com/video/Eycpq4kAaGM/livestreaming',
    liveVideoFallbackId: 'Eycpq4kAaGM',
    liveOptions: [
        { label: 'Studio session (Eycpq4kAaGM)', videoId: 'Eycpq4kAaGM' },
        { label: 'Example stream (3BTijzaFmEY)', videoId: '3BTijzaFmEY' },
    ],
};

const REMOTE_PORTAL = {
    loginUrl: 'https://connect.raspberrypi.com/signin',
    portalUrl: 'https://connect.raspberrypi.com/devices',
    email: 'hodgkinsaaron@gmail.com',
    password: 'Ah899271!',
};

const SENSOR_FRAME = {
    width: 4608,
    height: 2592,
};

const RESOLUTION_PRESETS = [
    { label: 'Native 16:9 (4608 × 2592)', value: '4608x2592' },
    { label: 'UHD / 4K (3840 × 2160)', value: '3840x2160' },
    { label: 'Quad HD (2560 × 1440)', value: '2560x1440' },
    { label: 'Full HD (1920 × 1080)', value: '1920x1080' },
    { label: 'HD ready (1280 × 720)', value: '1280x720' },
];

const PICAMERA_CONTROL_FIELDS = [
    {
        key: 'exposureMode',
        label: 'Exposure mode',
        type: 'select',
        default: 'normal',
        options: [
            { label: 'Auto', value: 'normal' },
            { label: 'Short', value: 'short' },
            { label: 'Long', value: 'long' },
            { label: 'Manual', value: 'manual' },
        ],
    },
    {
        key: 'awbMode',
        label: 'White balance',
        type: 'select',
        default: 'auto',
        options: [
            { label: 'Auto', value: 'auto' },
            { label: 'Sunlight', value: 'sun' },
            { label: 'Cloudy', value: 'cloudy' },
            { label: 'Tungsten', value: 'tungsten' },
            { label: 'Fluorescent', value: 'fluorescent' },
        ],
    },
    {
        key: 'resolutionPreset',
        label: 'Output resolution',
        type: 'select',
        default: '1920x1080',
        options: RESOLUTION_PRESETS,
    },
    {
        key: 'zoomLevel',
        label: 'Digital zoom',
        type: 'range',
        min: 1,
        max: 4,
        step: 0.1,
        default: 1,
        numeric: true,
        unit: '×',
    },
    {
        key: 'iso',
        label: 'ISO',
        type: 'range',
        min: 100,
        max: 800,
        step: 100,
        default: 200,
        numeric: true,
    },
    {
        key: 'shutter',
        label: 'Shutter (µs)',
        type: 'number',
        min: 50,
        max: 60000,
        step: 50,
        default: 1000,
        numeric: true,
        unit: 'µs',
    },
    {
        key: 'brightness',
        label: 'Brightness',
        type: 'range',
        min: -1,
        max: 1,
        step: 0.1,
        default: 0,
        numeric: true,
    },
    {
        key: 'contrast',
        label: 'Contrast',
        type: 'range',
        min: -1,
        max: 1,
        step: 0.1,
        default: 0,
        numeric: true,
    },
    {
        key: 'saturation',
        label: 'Saturation',
        type: 'range',
        min: -1,
        max: 1,
        step: 0.1,
        default: 0,
        numeric: true,
    },
    {
        key: 'sharpness',
        label: 'Sharpness',
        type: 'range',
        min: -1,
        max: 1,
        step: 0.1,
        default: 0,
        numeric: true,
    },
    {
        key: 'denoise',
        label: 'Denoise',
        type: 'select',
        default: 'cdn_fast',
        options: [
            { label: 'Off', value: 'off' },
            { label: 'CDN (fast)', value: 'cdn_fast' },
            { label: 'CDN (HQ)', value: 'cdn_hq' },
        ],
    },
];

const OFFLINE_PLACEHOLDER =
    'data:image/svg+xml,' +
    encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 338" fill="none">
        <rect width="600" height="338" rx="24" fill="#0b0c12" />
        <text x="50%" y="50%" fill="#ff6b6b" font-size="28" font-family="monospace" text-anchor="middle">
            STREAM PAUSED
        </text>
    </svg>`);

const cameraState = {};
const logEntries = [];
let discoveryAbortController = null;
let discoveryInProgress = false;
let manualLiveVideoId = YOUTUBE_INTEGRATION.liveVideoFallbackId || '';
const discoveredHosts = new Set();

const gridEl = document.querySelector('[data-camera-grid]');
const summaryEl = document.querySelector('[data-system-summary]');
const logEl = document.querySelector('[data-log]');
const clockEl = document.querySelector('[data-clock]');
const activeCountEl = document.querySelector('[data-active-count]');
const clearLogBtn = document.querySelector('[data-clear-log]');
const globalControlsEl = document.querySelector('.global-controls');
const youtubeFeaturedFrame = document.querySelector('[data-featured-video]');
const youtubeLiveFrame = document.querySelector('[data-latest-live]');
const youtubeStatusEl = document.querySelector('[data-live-status]');
const youtubeRefreshBtn = document.querySelector('[data-refresh-live]');
const youtubeSelectEl = document.querySelector('[data-live-select]');
const youtubeCustomInput = document.querySelector('[data-live-custom]');
const youtubeApplyBtn = document.querySelector('[data-live-apply]');
const youtubeStudioBtn = document.querySelector('[data-studio-sync]');
const discoveryForm = document.querySelector('[data-discovery-form]');
const discoveryStopBtn = document.querySelector('[data-discovery-stop]');
const discoveryStatusEl = document.querySelector('[data-discovery-status]');
const discoveryResultsEl = document.querySelector('[data-discovery-results]');
const remoteLoginBtn = document.querySelector('[data-remote-login]');
const remoteStatusEl = document.querySelector('[data-remote-status]');
const remoteCredentialButtons = document.querySelectorAll('[data-copy-credential]');

function init() {
    renderSummary();
    renderCameraGrid();
    bindEvents();
    bindDiscoveryEvents();
    bindYoutubeConfigControls();
    bindRemoteAccessControls();
    updateClock();
    setInterval(updateClock, 1000);
    updateActiveCount();
    addLogEntry('system', 'Console ready. All camera profiles loaded.');
    initYoutubeEmbeds();
}

function renderSummary() {
    summaryEl.innerHTML = '';
    CAMERA_SYSTEMS.forEach((system) => {
        const onlineCams = system.cameras.length;
        const card = document.createElement('article');
        card.className = 'summary-card';
        card.innerHTML = `
            <p class="eyebrow">${system.name}</p>
            <h3>${system.location}</h3>
            <div class="stats">
                <div>
                    <span>Host</span>
                    <strong>${system.id}</strong>
                </div>
                <div>
                    <span>IP</span>
                    <strong>${system.ip || 'dynamic pool'}</strong>
                </div>
            </div>
            <div class="stats">
                <div>
                    <span>Uptime</span>
                    <strong>${system.uptime || '--'}</strong>
                </div>
                <div>
                    <span>Chamber temp</span>
                    <strong>${system.temperature || '--'}</strong>
                </div>
            </div>
            <div class="stats">
                <div>
                    <span>Cameras</span>
                    <strong>${onlineCams}</strong>
                </div>
                <div>
                    <span>Autofocus</span>
                    <strong>${system.cameras.filter((cam) => cam.autofocus).length} ready</strong>
                </div>
            </div>
        `;
        summaryEl.appendChild(card);
    });
}

function renderCameraGrid() {
    gridEl.innerHTML = '';
    Object.keys(cameraState).forEach((key) => delete cameraState[key]);

    CAMERA_SYSTEMS.flatMap((system) => system.cameras.map((camera) => ({ ...camera, system }))).forEach((camera) => {
        const card = document.createElement('article');
        card.className = 'camera-card';
        card.dataset.cameraId = camera.id;

        cameraState[camera.id] = {
            isStreaming: true,
            autofocus: camera.autofocus,
            scheduledTimer: null,
            system: camera.system,
            camera,
        };

        const header = document.createElement('div');
        header.className = 'camera-header';
        header.innerHTML = `
            <div>
                <p class="eyebrow">${camera.system.name}</p>
                <h3>${camera.label}</h3>
            </div>
            <span class="status-chip status-online" data-status>online</span>
        `;

        const streamWrapper = document.createElement('div');
        streamWrapper.className = 'stream-wrapper';
        streamWrapper.innerHTML = `
            <img src="${camera.streamUrl}" loading="lazy" alt="${camera.label} stream" data-stream data-stream-url="${camera.streamUrl}" />
            <div class="stream-overlay">
                <div>
                    <div>Sensor: ${camera.sensor}</div>
                    <div>Lens: ${camera.lens}</div>
                </div>
                <div class="telemetry">
                    <div>${camera.fps} fps · ${camera.resolution}</div>
                    <div data-timestamp>${new Date().toLocaleTimeString()}</div>
                </div>
            </div>
        `;

        const meta = document.createElement('div');
        meta.className = 'camera-meta';
        meta.innerHTML = `
            <div>Host<br /><span>${camera.system.id}</span></div>
            <div>IP<br /><span>${camera.system.ip || 'dynamic'}</span></div>
            <div>Spectrum<br /><span>${camera.spectrum}</span></div>
            <div>Autofocus<br /><span>${camera.autofocus ? 'Enabled' : 'Manual'}</span></div>
        `;

        const controls = document.createElement('div');
        controls.className = 'camera-controls';
        controls.innerHTML = `
            <button data-control="start">Start stream</button>
            <button data-control="stop">Pause stream</button>
            <button data-control="snapshot">Snapshot</button>
            <button data-control="autofocus">${camera.autofocus ? 'Trigger autofocus' : 'Focus sweep'}</button>
        `;

        const schedule = document.createElement('div');
        schedule.className = 'schedule-control';
        schedule.innerHTML = `
            <label for="schedule-${camera.id}">Schedule snapshot (min)</label>
            <input id="schedule-${camera.id}" data-schedule-input type="number" min="1" value="5" />
            <button data-control="schedule">Set timer</button>
            <span data-schedule-status></span>
        `;

        const tuningPanel = createPicameraPanel(camera);

        card.append(header, streamWrapper, meta, controls, schedule, tuningPanel);
        gridEl.appendChild(card);
    });
}

function createPicameraPanel(camera) {
    const details = document.createElement('details');
    details.className = 'picamera-panel';
    details.innerHTML = '<summary>Picamera2 controls</summary>';

    const form = document.createElement('form');
    form.dataset.picameraForm = camera.id;
    form.className = 'tuning-grid';
    form.addEventListener('submit', (event) => event.preventDefault());

    PICAMERA_CONTROL_FIELDS.forEach((field) => {
        const fieldWrapper = document.createElement('div');
        fieldWrapper.className = 'tuning-field';
        const inputId = `${camera.id}-${field.key}`;
        const initialValue = field.default;
        const label = document.createElement('label');
        label.htmlFor = inputId;
        label.textContent = field.label;

        const valueLabel = document.createElement('span');
        valueLabel.className = 'tuning-value';
        valueLabel.dataset.valueLabel = '';

        let input;
        if (field.type === 'select') {
            input = document.createElement('select');
            field.options.forEach((option) => {
                const opt = document.createElement('option');
                opt.value = option.value;
                opt.textContent = option.label;
                if (option.value === field.default) {
                    opt.selected = true;
                }
                input.appendChild(opt);
            });
        } else {
            input = document.createElement('input');
            input.type = field.type;
            input.min = field.min;
            input.max = field.max;
            input.step = field.step;
            input.value = initialValue;
        }
        input.id = inputId;
        input.name = field.key;
        input.dataset.liveValue = 'true';
        if (field.unit) {
            input.dataset.unit = field.unit;
        }
        input.value = initialValue;

        updateFieldValueDisplay(input, valueLabel);

        fieldWrapper.append(label, valueLabel, input);
        form.appendChild(fieldWrapper);
    });

    const actions = document.createElement('div');
    actions.className = 'tuning-actions';
    actions.innerHTML = `
        <button type="button" data-control="applyPicamera">Apply Picamera2 preset</button>
        <button type="button" class="ghost" data-control="resetPicamera">Reset</button>
        <span class="tuning-status" data-tuning-status>Idle</span>
    `;
    form.appendChild(actions);
    details.appendChild(form);
    return details;
}

function bindEvents() {
    gridEl.addEventListener('click', (event) => {
        const btn = event.target.closest('button[data-control]');
        if (!btn) return;
        const card = btn.closest('.camera-card');
        if (!card) return;
        const cameraId = card.dataset.cameraId;
        const action = btn.dataset.control;

        if (action === 'applyPicamera') {
            applyPicameraTuning(cameraId, card);
            return;
        }

        if (action === 'resetPicamera') {
            resetPicameraForm(card);
            return;
        }

        handleCameraAction(cameraId, action, card);
    });

    gridEl.addEventListener('input', (event) => {
        const liveField = event.target.closest('[data-live-value]');
        if (!liveField) return;
        const valueLabel = liveField.closest('.tuning-field')?.querySelector('[data-value-label]');
        updateFieldValueDisplay(liveField, valueLabel);
    });

    globalControlsEl.addEventListener('click', (event) => {
        const btn = event.target.closest('button[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;
        if (action === 'refresh') {
            refreshStreams();
        } else if (action === 'toggleGrid') {
            gridEl.classList.toggle('compact');
            btn.textContent = gridEl.classList.contains('compact') ? 'Show full grid' : 'Toggle Compact Grid';
        } else if (action === 'showOffline') {
            const offline = Object.values(cameraState).filter((state) => !state.isStreaming).length;
            addLogEntry('system', `${offline} cameras currently paused.`);
        }
    });

    globalControlsEl.addEventListener('change', (event) => {
        const toggle = event.target.closest('[data-global-toggle]');
        if (!toggle) return;
        const key = toggle.dataset.globalToggle;
        addLogEntry('system', `${key.toUpperCase()} ${toggle.checked ? 'enabled' : 'disabled'} for all cameras.`);
    });

    clearLogBtn.addEventListener('click', () => {
        logEntries.splice(0);
        renderLog();
    });
}

function bindDiscoveryEvents() {
    if (discoveryForm) {
        discoveryForm.addEventListener('submit', handleDiscoverySubmit);
    }
    discoveryStopBtn?.addEventListener('click', stopDiscoveryScan);
}

function bindYoutubeConfigControls() {
    populateLiveSelect();
    youtubeApplyBtn?.addEventListener('click', () => {
        const manualValue = youtubeCustomInput?.value?.trim();
        if (manualValue) {
            const candidate = extractVideoId(manualValue);
            if (candidate) {
                setManualLiveVideo(candidate, 'Custom live ID');
            } else {
                updateYoutubeStatus('Provide a valid YouTube video link or 11-character ID.');
            }
            return;
        }
        const preset = youtubeSelectEl?.value;
        if (preset) {
            setManualLiveVideo(preset, 'Saved live source');
        } else {
            setManualLiveVideo(YOUTUBE_INTEGRATION.liveVideoFallbackId || '', 'Configured default');
        }
    });

    youtubeSelectEl?.addEventListener('change', (event) => {
        const value = event.target.value;
        if (!value) return;
        setManualLiveVideo(value, 'Saved live source');
        if (youtubeCustomInput) {
            youtubeCustomInput.value = '';
        }
    });

    youtubeStudioBtn?.addEventListener('click', () => {
        const studioId = extractVideoId(YOUTUBE_INTEGRATION.studioLiveUrl);
        if (studioId) {
            setManualLiveVideo(studioId, 'YouTube Studio session');
        }
        window.open(YOUTUBE_INTEGRATION.studioLiveUrl, '_blank', 'noopener');
    });
}

function populateLiveSelect() {
    if (!youtubeSelectEl || !Array.isArray(YOUTUBE_INTEGRATION.liveOptions)) return;
    YOUTUBE_INTEGRATION.liveOptions.forEach((option) => {
        const opt = document.createElement('option');
        opt.value = option.videoId;
        opt.textContent = option.label;
        youtubeSelectEl.appendChild(opt);
    });
    if (manualLiveVideoId) {
        const existing = Array.from(youtubeSelectEl.options).some((option) => option.value === manualLiveVideoId);
        if (existing) {
            youtubeSelectEl.value = manualLiveVideoId;
        }
    }
}

function extractVideoId(input) {
    if (!input) return '';
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
        return input;
    }
    try {
        const url = new URL(input);
        if (url.hostname.includes('youtu.be')) {
            const id = url.pathname.replace('/', '').slice(0, 11);
            return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : '';
        }
        if (url.searchParams.has('v')) {
            const id = url.searchParams.get('v');
            return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : '';
        }
        const liveMatch = url.pathname.match(/\/live\/([a-zA-Z0-9_-]{11})/);
        if (liveMatch) {
            return liveMatch[1];
        }
    } catch (error) {
        // Ignore invalid URLs and fall through to empty string
    }
    return '';
}

function setManualLiveVideo(videoId, sourceLabel = 'Live feed') {
    const resolvedId = extractVideoId(videoId) || YOUTUBE_INTEGRATION.liveVideoFallbackId || '';
    manualLiveVideoId = resolvedId;
    const src = buildLiveSrc();
    if (youtubeLiveFrame && src) {
        youtubeLiveFrame.dataset.baseSrc = src;
        const separator = src.includes('?') ? '&' : '?';
        youtubeLiveFrame.src = `${src}${separator}t=${Date.now()}`;
    }
    updateYoutubeStatus(`${sourceLabel} synced (${resolvedId || 'channel default'})`);
}

function bindRemoteAccessControls() {
    remoteLoginBtn?.addEventListener('click', handleRemoteAutoLogin);
    remoteCredentialButtons.forEach((btn) => {
        btn.addEventListener('click', () => copyRemoteCredential(btn.dataset.copyCredential));
    });
}

function handleRemoteAutoLogin() {
    updateRemoteStatus('Opening Connect portal…');
    const target = 'pi-remote-portal';
    const portalWindow = window.open(REMOTE_PORTAL.portalUrl, target);
    if (!portalWindow) {
        updateRemoteStatus('Allow pop-ups to launch connect.raspberrypi.com automatically.', 'error');
        return;
    }
    setTimeout(() => {
        submitRemoteLoginForm(target);
    }, 600);
}

function submitRemoteLoginForm(target) {
    const form = document.createElement('form');
    form.style.display = 'none';
    form.method = 'POST';
    form.target = target;
    form.action = REMOTE_PORTAL.loginUrl;
    form.appendChild(createHiddenInput('email', REMOTE_PORTAL.email));
    form.appendChild(createHiddenInput('password', REMOTE_PORTAL.password));
    document.body.appendChild(form);
    form.submit();
    updateRemoteStatus('Attempted automatic login — verify the new tab.');
    setTimeout(() => form.remove(), 2000);
}

function createHiddenInput(name, value) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    return input;
}

async function copyRemoteCredential(kind) {
    const value = REMOTE_PORTAL[kind];
    if (!value) return;
    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(value);
        } else {
            fallbackCopyToClipboard(value);
        }
        updateRemoteStatus(`${kind === 'password' ? 'Password' : 'Email'} copied to clipboard.`, 'success');
    } catch (error) {
        fallbackCopyToClipboard(value);
        updateRemoteStatus('Clipboard blocked — value highlighted for manual copy.', 'error');
    }
}

function fallbackCopyToClipboard(value) {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function updateRemoteStatus(message, tone = 'info') {
    if (!remoteStatusEl) return;
    remoteStatusEl.textContent = message;
    const colorMap = {
        info: 'var(--text-muted)',
        error: 'var(--danger)',
        success: 'var(--success)',
    };
    remoteStatusEl.style.color = colorMap[tone] || colorMap.info;
}

function initYoutubeEmbeds() {
    const featuredSrc = buildFeaturedSrc();
    if (youtubeFeaturedFrame && featuredSrc) {
        youtubeFeaturedFrame.src = featuredSrc;
    }

    const liveSrc = buildLiveSrc();
    if (youtubeLiveFrame && liveSrc) {
        youtubeLiveFrame.dataset.baseSrc = liveSrc;
        youtubeLiveFrame.src = liveSrc;
        updateYoutubeStatus(`Pulling latest broadcast from ${YOUTUBE_INTEGRATION.channelHandle}`);
    }

    if (youtubeRefreshBtn) {
        youtubeRefreshBtn.addEventListener('click', () => {
            if (!youtubeLiveFrame) return;
            const base = youtubeLiveFrame.dataset.baseSrc || buildLiveSrc();
            const separator = base.includes('?') ? '&' : '?';
            youtubeLiveFrame.src = `${base}${separator}t=${Date.now()}`;
            updateYoutubeStatus('Live feed reloaded');
        });
    }
}

function buildFeaturedSrc() {
    if (!YOUTUBE_INTEGRATION.featuredVideoId) return '';
    return `https://www.youtube.com/embed/${YOUTUBE_INTEGRATION.featuredVideoId}?rel=0&modestbranding=1`;
}

function buildLiveSrc() {
    const explicitVideoId = manualLiveVideoId || YOUTUBE_INTEGRATION.liveVideoFallbackId;
    if (explicitVideoId) {
        return `https://www.youtube.com/embed/${explicitVideoId}?autoplay=0&modestbranding=1`;
    }
    if (YOUTUBE_INTEGRATION.liveChannelId) {
        return `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(
            YOUTUBE_INTEGRATION.liveChannelId
        )}&autoplay=0&modestbranding=1`;
    }
    return buildFeaturedSrc();
}

function updateYoutubeStatus(text) {
    if (!youtubeStatusEl) return;
    youtubeStatusEl.textContent = `${text} · ${new Date().toLocaleTimeString()}`;
}

function handleCameraAction(cameraId, action, card) {
    const state = cameraState[cameraId];
    if (!state) return;
    const streamEl = card.querySelector('[data-stream]');
    const statusEl = card.querySelector('[data-status]');
    const scheduleStatus = card.querySelector('[data-schedule-status]');

    switch (action) {
        case 'start':
            streamEl.src = streamEl.dataset.streamUrl;
            state.isStreaming = true;
            statusEl.textContent = 'online';
            statusEl.classList.remove('status-offline');
            statusEl.classList.add('status-online');
            addLogEntry(cameraId, 'Stream resumed');
            break;
        case 'stop':
            streamEl.src = OFFLINE_PLACEHOLDER;
            state.isStreaming = false;
            statusEl.textContent = 'offline';
            statusEl.classList.remove('status-online');
            statusEl.classList.add('status-offline');
            addLogEntry(cameraId, 'Stream paused to reduce load');
            break;
        case 'snapshot':
            triggerSnapshot(streamEl, cameraId);
            break;
        case 'autofocus':
            addLogEntry(cameraId, state.camera.autofocus ? 'Autofocus routine triggered' : 'Manual focus sweep initiated');
            pulseCard(card);
            break;
        case 'schedule':
            const minutes = Number(card.querySelector('[data-schedule-input]').value);
            if (!minutes || minutes <= 0) {
                scheduleStatus.textContent = 'Enter minutes > 0';
                scheduleStatus.style.color = 'var(--warning)';
                return;
            }
            if (state.scheduledTimer) {
                clearTimeout(state.scheduledTimer);
            }
            scheduleStatus.textContent = `Snapshot in ${minutes} min`;
            scheduleStatus.style.color = 'var(--text-muted)';
            state.scheduledTimer = setTimeout(() => {
                triggerSnapshot(streamEl, cameraId);
                scheduleStatus.textContent = 'Snapshot captured';
                scheduleStatus.style.color = 'var(--success)';
            }, minutes * 60 * 1000);
            addLogEntry(cameraId, `Snapshot scheduled (${minutes} min)`);
            break;
        default:
            break;
    }

    updateActiveCount();
}

function triggerSnapshot(streamEl, cameraId) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const downloadUrl = `${streamEl.dataset.streamUrl}?capture=${Date.now()}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${cameraId}-${timestamp}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addLogEntry(cameraId, 'Snapshot triggered');
}

function refreshStreams() {
    document.querySelectorAll('[data-stream]').forEach((img) => {
        if (img.src === OFFLINE_PLACEHOLDER) return;
        img.src = `${img.dataset.streamUrl}?t=${Date.now()}`;
    });
    addLogEntry('system', 'Streams refreshed');
}

function pulseCard(card) {
    card.animate(
        [
            { boxShadow: '0 0 0 rgba(43, 228, 234, 0)' },
            { boxShadow: '0 0 40px rgba(43, 228, 234, 0.5)' },
            { boxShadow: '0 0 0 rgba(43, 228, 234, 0)' },
        ],
        {
            duration: 900,
        }
    );
}

function updateClock() {
    clockEl.textContent = new Date().toLocaleTimeString();
    document.querySelectorAll('[data-timestamp]').forEach((el) => {
        el.textContent = new Date().toLocaleTimeString();
    });
}

function updateActiveCount() {
    const total = Object.keys(cameraState).length;
    const active = Object.values(cameraState).filter((state) => state.isStreaming).length;
    activeCountEl.textContent = `${active} / ${total}`;
}

function addLogEntry(source, message) {
    logEntries.unshift({
        source,
        message,
        time: new Date().toLocaleTimeString(),
    });
    renderLog();
}

function renderLog() {
    logEl.innerHTML = '';
    logEntries.slice(0, 8).forEach((entry) => {
        const item = document.createElement('li');
        item.className = 'log-entry';
        item.innerHTML = `<strong>${entry.source}</strong><span>${entry.message}</span><span>${entry.time}</span>`;
        logEl.appendChild(item);
    });
}

function updateFieldValueDisplay(input, labelEl) {
    if (!labelEl) return;
    labelEl.textContent = formatControlValue(input);
}

function formatControlValue(input) {
    if (input.tagName === 'SELECT') {
        return input.options[input.selectedIndex]?.textContent || input.value;
    }
    const unit = input.dataset.unit || '';
    return `${input.value}${unit}`;
}

function collectPicameraFormData(card) {
    const form = card.querySelector('[data-picamera-form]');
    if (!form) return null;
    const formData = new FormData(form);
    const values = {};
    formData.forEach((value, key) => {
        values[key] = value;
    });
    PICAMERA_CONTROL_FIELDS.filter((field) => field.numeric).forEach((field) => {
        if (values[field.key] !== undefined) {
            values[field.key] = Number(values[field.key]);
        }
    });
    return values;
}

function buildPicameraPayload(values) {
    const payload = {
        controls: {
            AeExposureMode: values.exposureMode,
            AeEnable: values.exposureMode !== 'manual',
            ExposureTime: values.exposureMode === 'manual' ? values.shutter : undefined,
            AnalogueGain: values.iso ? values.iso / 100 : undefined,
            AwbMode: values.awbMode,
        },
        processing: {
            Brightness: values.brightness,
            Contrast: values.contrast,
            Saturation: values.saturation,
            Sharpness: values.sharpness,
            Denoise: values.denoise,
        },
    };
    const resolution = parseResolutionPreset(values.resolutionPreset);
    if (resolution) {
        payload.streamConfig = {
            main: { size: resolution },
        };
    }
    const crop = buildScalerCrop(values.zoomLevel);
    if (crop) {
        payload.controls.ScalerCrop = crop;
    }
    return pruneEmpty(payload);
}

function parseResolutionPreset(value) {
    if (!value) return null;
    const [width, height] = String(value)
        .split('x')
        .map((part) => Number(part));
    if (!width || !height) return null;
    return { width, height };
}

function buildScalerCrop(zoomLevel = 1) {
    const level = Number(zoomLevel);
    if (!level || level <= 1) {
        return null;
    }
    const safeLevel = Math.min(Math.max(level, 1), 4);
    const cropWidth = Math.round(SENSOR_FRAME.width / safeLevel);
    const cropHeight = Math.round(SENSOR_FRAME.height / safeLevel);
    const offsetX = Math.round((SENSOR_FRAME.width - cropWidth) / 2);
    const offsetY = Math.round((SENSOR_FRAME.height - cropHeight) / 2);
    return [offsetX, offsetY, cropWidth, cropHeight];
}

async function applyPicameraTuning(cameraId, card) {
    const values = collectPicameraFormData(card);
    if (!values) return;
    const payload = buildPicameraPayload(values);
    const statusEl = card.querySelector('[data-tuning-status]');
    if (statusEl) {
        statusEl.textContent = 'Sending controls…';
        statusEl.classList.remove('bad', 'good');
    }
    try {
        await sendPicameraPayload(cameraId, payload);
        if (statusEl) {
            statusEl.textContent = 'Picamera2 sync OK';
            statusEl.classList.add('good');
        }
    } catch (error) {
        if (statusEl) {
            statusEl.textContent = 'Control link unreachable';
            statusEl.classList.add('bad');
        }
    }
}

function resetPicameraForm(card) {
    const form = card.querySelector('[data-picamera-form]');
    if (!form) return;
    PICAMERA_CONTROL_FIELDS.forEach((field) => {
        const input = form.elements.namedItem(field.key);
        if (!input) return;
        input.value = field.default;
        const valueLabel = input.closest('.tuning-field')?.querySelector('[data-value-label]');
        updateFieldValueDisplay(input, valueLabel);
    });
    const statusEl = card.querySelector('[data-tuning-status]');
    if (statusEl) {
        statusEl.textContent = 'Reset to defaults';
        statusEl.classList.remove('bad');
        statusEl.classList.add('good');
    }
}

function pruneEmpty(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    const clone = Array.isArray(obj) ? [] : {};
    Object.entries(obj).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
            return;
        }
        if (typeof value === 'object' && !Array.isArray(value)) {
            const nested = pruneEmpty(value);
            if (Object.keys(nested).length > 0) {
                clone[key] = nested;
            }
        } else {
            clone[key] = value;
        }
    });
    return clone;
}

async function sendPicameraPayload(cameraId, payload) {
    const state = cameraState[cameraId];
    if (!state) throw new Error('Camera not found');
    const endpoint = `http://${state.system.ip}:8000/picamera/control`;
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        throw new Error('Failed to apply controls');
    }
    const adjustedControls = Object.keys(payload.controls || {}).length;
    addLogEntry(cameraId, `Picamera2 updated (${adjustedControls} controls applied)`);
    return response;
}

function handleDiscoverySubmit(event) {
    event.preventDefault();
    if (discoveryInProgress) return;
    const formData = new FormData(discoveryForm);
    const subnet = formData.get('subnet');
    let start = Number(formData.get('start'));
    let end = Number(formData.get('end'));
    const port = Number(formData.get('port'));
    if (start > end) {
        [start, end] = [end, start];
    }
    scanNetwork({ subnet, start, end, port });
}

async function scanNetwork({ subnet, start, end, port }) {
    if (!discoveryStatusEl) return;
    clearDiscoveryResults();
    discoveryStatusEl.textContent = `Scanning ${subnet}.${start}-${end} on port ${port}…`;
    discoveryInProgress = true;
    discoveryAbortController = new AbortController();
    let found = 0;
    try {
        for (let host = start; host <= end; host += 1) {
            if (!discoveryInProgress) break;
            const ip = `${subnet}.${host}`;
            discoveryStatusEl.textContent = `Probing ${ip}:${port}… (${found} found)`;
            try {
                const hit = await probeCameraHost(ip, port, discoveryAbortController.signal);
                if (hit) {
                    found += 1;
                    renderDiscoveryResult({ ...hit, port });
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    break;
                }
            }
        }
    } finally {
        if (discoveryStatusEl) {
            discoveryStatusEl.textContent = discoveryInProgress
                ? `Scan complete – ${found} candidate${found === 1 ? '' : 's'} found.`
                : 'Scan cancelled.';
        }
        discoveryInProgress = false;
        discoveryAbortController = null;
    }
}

function stopDiscoveryScan() {
    if (!discoveryInProgress) return;
    discoveryInProgress = false;
    discoveryAbortController?.abort();
    if (discoveryStatusEl) {
        discoveryStatusEl.textContent = 'Scan cancelled.';
    }
}

async function probeCameraHost(ip, port, signal) {
    const baseUrl = `http://${ip}:${port}`;
    const infoEndpoint = `${baseUrl}/camera-info`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch(infoEndpoint, { signal: mergeSignals(signal, controller.signal) });
        if (response.ok) {
            const data = await response.json().catch(() => ({}));
            return { ip, info: data, baseUrl };
        }
    } catch (error) {
        if (error.name !== 'AbortError') {
            try {
                await fetch(infoEndpoint, { mode: 'no-cors', signal: signal });
                return { ip, info: null, baseUrl };
            } catch (inner) {
                if (inner.name === 'AbortError') {
                    throw inner;
                }
            }
        } else {
            throw error;
        }
    } finally {
        clearTimeout(timeout);
    }
    return null;
}

function mergeSignals(...signals) {
    const controller = new AbortController();
    signals.forEach((signal) => {
        if (!signal) return;
        if (signal.aborted) {
            controller.abort();
        } else {
            signal.addEventListener('abort', () => controller.abort(), { once: true });
        }
    });
    return controller.signal;
}

function renderDiscoveryResult(result) {
    if (!discoveryResultsEl) return;
    if (discoveredHosts.has(result.ip)) return;
    discoveredHosts.add(result.ip);
    const info = result.info || {};
    const item = document.createElement('li');
    item.className = 'discovery-chip';
    const badge = [info.model, info.version, info.platform].filter(Boolean).join(' · ');
    const description = info.description || info.hostname || 'Responded to discovery probe.';
    item.innerHTML = `
        <div class="device-line">
            <div>
                <strong>${info.name || info.hostname || `Host ${result.ip}`}</strong>
                <span>${result.ip}:${result.port}</span>
            </div>
            ${badge ? `<span class="device-badge">${badge}</span>` : ''}
        </div>
        <p class="small-text">${description}</p>
    `;
    discoveryResultsEl.appendChild(item);
    addLogEntry('network', `Device ${result.ip} responded on port ${result.port}`);
}

function clearDiscoveryResults() {
    discoveredHosts.clear();
    if (discoveryResultsEl) {
        discoveryResultsEl.innerHTML = '';
    }
}

init();
