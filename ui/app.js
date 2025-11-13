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

const gridEl = document.querySelector('[data-camera-grid]');
const summaryEl = document.querySelector('[data-system-summary]');
const logEl = document.querySelector('[data-log]');
const clockEl = document.querySelector('[data-clock]');
const activeCountEl = document.querySelector('[data-active-count]');
const clearLogBtn = document.querySelector('[data-clear-log]');
const globalControlsEl = document.querySelector('.global-controls');

function init() {
    renderSummary();
    renderCameraGrid();
    bindEvents();
    updateClock();
    setInterval(updateClock, 1000);
    updateActiveCount();
    addLogEntry('system', 'Console ready. All camera profiles loaded.');
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
                    <strong>${system.ip}</strong>
                </div>
            </div>
            <div class="stats">
                <div>
                    <span>Uptime</span>
                    <strong>${system.uptime}</strong>
                </div>
                <div>
                    <span>Chamber temp</span>
                    <strong>${system.temperature}</strong>
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
            <div>IP<br /><span>${camera.system.ip}</span></div>
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

        card.append(header, streamWrapper, meta, controls, schedule);
        gridEl.appendChild(card);
    });
}

function bindEvents() {
    gridEl.addEventListener('click', (event) => {
        const btn = event.target.closest('button[data-control]');
        if (!btn) return;
        const card = btn.closest('.camera-card');
        if (!card) return;
        const cameraId = card.dataset.cameraId;
        handleCameraAction(cameraId, btn.dataset.control, card);
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

init();
