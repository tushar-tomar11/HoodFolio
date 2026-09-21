<template>
  <div
    class="globe-container"
    aria-hidden="true"
  >
    <div class="globe-glow" />
    <div class="globe-sphere">
      <svg
        viewBox="0 0 400 400"
        class="globe-svg"
      >
        <defs>
          <radialGradient
            id="globe-fade"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop
              offset="0%"
              stop-color="#00C805"
              stop-opacity="0.6"
            />
            <stop
              offset="60%"
              stop-color="#00C805"
              stop-opacity="0.2"
            />
            <stop
              offset="100%"
              stop-color="#00C805"
              stop-opacity="0"
            />
          </radialGradient>
        </defs>
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="url(#globe-fade)"
        />
        <g
          stroke="#00C805"
          stroke-width="0.5"
          fill="none"
          opacity="0.3"
        >
          <ellipse
            cx="200"
            cy="60"
            rx="30"
            ry="8"
          />
          <ellipse
            cx="200"
            cy="100"
            rx="80"
            ry="14"
          />
          <ellipse
            cx="200"
            cy="145"
            rx="130"
            ry="18"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="155"
            ry="20"
          />
          <ellipse
            cx="200"
            cy="255"
            rx="130"
            ry="18"
          />
          <ellipse
            cx="200"
            cy="300"
            rx="80"
            ry="14"
          />
          <ellipse
            cx="200"
            cy="340"
            rx="30"
            ry="8"
          />
        </g>
        <g
          stroke="#00C805"
          stroke-width="0.5"
          fill="none"
          opacity="0.25"
        >
          <ellipse
            cx="200"
            cy="200"
            rx="20"
            ry="160"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="70"
            ry="160"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="120"
            ry="160"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="155"
            ry="160"
          />
        </g>
        <g
          fill="#00C805"
          opacity="0.5"
        >
          <circle
            cx="200"
            cy="60"
            r="2.5"
          />
          <circle
            cx="155"
            cy="100"
            r="1.8"
          />
          <circle
            cx="245"
            cy="100"
            r="1.8"
          />
          <circle
            cx="115"
            cy="155"
            r="1.5"
          />
          <circle
            cx="285"
            cy="155"
            r="1.5"
          />
          <circle
            cx="80"
            cy="200"
            r="1.5"
          />
          <circle
            cx="320"
            cy="200"
            r="1.5"
          />
          <circle
            cx="200"
            cy="340"
            r="2.5"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.globe-container {
  position: absolute;
  left: -120px;
  top: 50%;
  transform: translateY(-60%);
  width: 500px;
  height: 500px;
  pointer-events: none;
  z-index: 0;
}

.globe-glow {
  position: absolute;
  inset: 20%;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(0 200 5 / 0.12) 0%, transparent 70%);
  animation: globe-pulse 4s ease-in-out infinite;
}

.globe-sphere {
  position: absolute;
  inset: 0;
  opacity: 0.6;
}

.globe-svg {
  width: 100%;
  height: 100%;
  animation: globe-rotate 20s linear infinite;
}

@keyframes globe-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

@keyframes globe-rotate {
  0% { opacity: 0.5; }
  25% { opacity: 0.7; }
  50% { opacity: 0.5; }
  75% { opacity: 0.65; }
  100% { opacity: 0.5; }
}
</style>
