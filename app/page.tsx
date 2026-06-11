"use client";

import React, { useState, type SVGProps } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  Brain,
  Megaphone,
  HeartHandshake,
  TrendingUp,
  Workflow,
  Settings,
  Menu,
  X,
  Play,
  ArrowRight,
  Target
} from "lucide-react";

// Types for Agents
type AgentType = "Ollama" | "Gemini" | "OpenRouter" | "n8n" | "Anthropic" | "KiloCode";

interface AgentMeta {
  name: AgentType;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  placeholder: string;
  accent: string;
}

// Custom SVGs
const Ollama = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18H3M12 22H3M7 6l5-4 5 4" />
    <rect x="5" y="6" width="14" height="12" rx="2" />
    <circle cx="9" cy="11" r="1" fill="currentColor" />
    <circle cx="15" cy="11" r="1" fill="currentColor" />
    <path d="M10 14h4" />
  </svg>
);

const Gemini = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 296 298" fill="none">
    <mask
      id="gemini__a"
      width="296"
      height="298"
      x="0"
      y="0"
      maskUnits="userSpaceOnUse"
      style={{ maskType: "alpha" }}
    >
      <path
        fill="#3186FF"
        d="M141.201 4.886c2.282-6.17 11.042-6.071 13.184.148l5.985 17.37a184.004 184.004 0 0 0 111.257 113.049l19.304 6.997c6.143 2.227 6.156 10.91.02 13.155l-19.35 7.082a184.001 184.001 0 0 0-109.495 109.385l-7.573 20.629c-2.241 6.105-10.869 6.121-13.133.025l-7.908-21.296a184 184 0 0 0-109.02-108.658l-19.698-7.239c-6.102-2.243-6.118-10.867-.025-13.132l20.083-7.467A183.998 183.998 0 0 0 133.291 26.28l7.91-21.394Z"
      />
    </mask>
    <g mask="url(#gemini__a)">
      <g filter="url(#gemini__b)">
        <ellipse cx="163" cy="149" fill="#3689FF" rx="196" ry="159" />
      </g>
      <g filter="url(#gemini__c)">
        <ellipse cx="33.5" cy="142.5" fill="#F6C013" rx="68.5" ry="72.5" />
      </g>
      <g filter="url(#gemini__d)">
        <ellipse cx="19.5" cy="148.5" fill="#F6C013" rx="68.5" ry="72.5" />
      </g>
      <g filter="url(#gemini__e)">
        <path
          fill="#FA4340"
          d="M194 10.5C172 82.5 65.5 134.333 22.5 135L144-66l50 76.5Z"
        />
      </g>
      <g filter="url(#gemini__f)">
        <path
          fill="#FA4340"
          d="M190.5-12.5C168.5 59.5 62 111.333 19 112L140.5-89l50 76.5Z"
        />
      </g>
      <g filter="url(#gemini__g)">
        <path
          fill="#14BB69"
          d="M194.5 279.5C172.5 207.5 66 155.667 23 155l121.5 201 50-76.5Z"
        />
      </g>
      <g filter="url(#gemini__h)">
        <path
          fill="#14BB69"
          d="M196.5 320.5C174.5 248.5 68 196.667 25 196l121.5 201 50-76.5Z"
        />
      </g>
    </g>
    <defs>
      <filter
        id="gemini__b"
        width="464"
        height="390"
        x="-69"
        y="-46"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_69_17998"
          stdDeviation="18"
        />
      </filter>
      <filter
        id="gemini__c"
        width="265"
        height="273"
        x="-99"
        y="6"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_69_17998"
          stdDeviation="32"
        />
      </filter>
      <filter
        id="gemini__d"
        width="265"
        height="273"
        x="-113"
        y="12"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_69_17998"
          stdDeviation="32"
        />
      </filter>
      <filter
        id="gemini__e"
        width="299.5"
        height="329"
        x="-41.5"
        y="-130"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_69_17998"
          stdDeviation="32"
        />
      </filter>
      <filter
        id="gemini__f"
        width="299.5"
        height="329"
        x="-45"
        y="-153"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_69_17998"
          stdDeviation="32"
        />
      </filter>
      <filter
        id="gemini__g"
        width="299.5"
        height="329"
        x="-41"
        y="91"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_69_17998"
          stdDeviation="32"
        />
      </filter>
      <filter
        id="gemini__h"
        width="299.5"
        height="329"
        x="-39"
        y="132"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_69_17998"
          stdDeviation="32"
        />
      </filter>
    </defs>
  </svg>
);

const OpenRouter = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 512 512" fill="currentColor" stroke="currentColor">
    <defs>
      <clipPath id="openrouter_dark__clip0_205_3">
        <rect width="512" height="512" fill="none" />
      </clipPath>
    </defs>
    <g clipPath="url(#openrouter_dark__clip0_205_3)">
      <path
        d="M3 248.945C18 248.945 76 236 106 219C136 202 136 202 198 158C276.497 102.293 332 120.945 423 120.945"
        strokeWidth="90"
      />
      <path d="M511 121.5L357.25 210.268L357.25 32.7324L511 121.5Z" />
      <path
        d="M0 249C15 249 73 261.945 103 278.945C133 295.945 133 295.945 195 339.945C273.497 395.652 329 377 420 377"
        strokeWidth="90"
      />
      <path d="M508 376.445L354.25 287.678L354.25 465.213L508 376.445Z" />
    </g>
  </svg>
);

const n8n = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 228 120">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M204 48C192.817 48 183.42 40.3514 180.756 30H153.248C147.382 30 142.376 34.241 141.412 40.0272L140.425 45.9456C139.489 51.5648 136.646 56.4554 132.626 60C136.646 63.5446 139.489 68.4352 140.425 74.0544L141.412 79.9728C142.376 85.759 147.382 90 153.248 90H156.756C159.42 79.6486 168.817 72 180 72C193.255 72 204 82.7452 204 96C204 109.255 193.255 120 180 120C168.817 120 159.42 112.351 156.756 102H153.248C141.516 102 131.504 93.5181 129.575 81.9456L128.588 76.0272C127.624 70.241 122.618 66 116.752 66H107.244C104.58 76.3514 95.183 84 84 84C72.817 84 63.4204 76.3514 60.7561 66H47.2439C44.5796 76.3514 35.183 84 24 84C10.7452 84 0 73.2548 0 60C0 46.7452 10.7452 36 24 36C35.183 36 44.5796 43.6486 47.2439 54H60.7561C63.4204 43.6486 72.817 36 84 36C95.183 36 104.58 43.6486 107.244 54H116.752C122.618 54 127.624 49.759 128.588 43.9728L129.575 38.0544C131.504 26.4819 141.516 18 153.248 18L180.756 18C183.42 7.64864 192.817 0 204 0C217.255 0 228 10.7452 228 24C228 37.2548 217.255 48 204 48ZM204 36C210.627 36 216 30.6274 216 24C216 17.3726 210.627 12 204 12C197.373 12 192 17.3726 192 24C192 30.6274 197.373 36 204 36ZM24 72C30.6274 72 36 66.6274 36 60C36 53.3726 30.6274 48 24 48C17.3726 48 12 53.3726 12 60C12 66.6274 17.3726 72 24 72ZM96 60C96 66.6274 90.6274 72 84 72C77.3726 72 72 66.6274 72 60C72 53.3726 77.3726 48 84 48C90.6274 48 96 53.3726 96 60ZM192 96C192 102.627 186.627 108 180 108C173.373 108 168 102.627 168 96C168 89.3726 173.373 84 180 84C186.627 84 192 89.3726 192 96Z"
      fill="#ea4b71"
    />
  </svg>
);

const Anthropic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    fill="currentColor"
    fillRule="evenodd"
    style={{ flex: "none", lineHeight: "1" }}
    viewBox="0 0 24 24"
  >
    <title>Anthropic</title>
    <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" />
  </svg>
);

const KiloCode = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" fill="currentColor">
    <path d="M23,26v-2h3v-5l-2-2h-4v2h-3v5l2,2h4ZM20,20h3v3h-3v-3Z" />
    <rect x="12" y="17" width="3" height="3" />
    <polygon points="26 12 23 12 23 9 20 6 17 6 17 9 20 9 20 12 17 12 17 15 26 15 26 12" />
    <path d="M0,0v32h32V0H0ZM29,29H3V3h26v26Z" />
    <polygon points="15 26 15 23 9 23 9 17 6 17 6 23.1875 8.8125 26 15 26" />
    <rect x="12" y="6" width="3" height="3" />
    <polygon points="9 12 12 12 12 15 15 15 15 12 12 9 9 9 9 6 6 6 6 15 9 15 9 12" />
  </svg>
);

const AGENTS_CONFIG: Record<AgentType, AgentMeta> = {
  Ollama: {
    name: "Ollama",
    icon: Ollama,
    description: "Securely boot, customize, and run open weights local generative systems such as DeepSeek-R1 or Llama 3.",
    placeholder: "Design a local docker-compose configuration or shell instructions to pull and boot a deepseek-r1:1.5b model on an offline machine.",
    accent: "text-stone-800 border-stone-200 bg-stone-50/50"
  },
  Gemini: {
    name: "Gemini",
    icon: Gemini,
    description: "Accelerate automation flows with advanced multi-modal models using structured JSON schemas or Live audio/video streaming APIs.",
    placeholder: "Generate a reliable Node.js SDK route using @google/genai to stream structured JSON outputs using responseSchema.",
    accent: "text-blue-600 border-blue-200 bg-blue-50/50"
  },
  OpenRouter: {
    name: "OpenRouter",
    icon: OpenRouter,
    description: "Route payloads to any open-source or proprietary model globally through a unified proxy with fallbacks.",
    placeholder: "Outline a multi-fallback fetch wrapper in TypeScript that proxies query routes between Anthropic Claude and DeepSeek R1 via OpenRouter API Keys.",
    accent: "text-amber-600 border-amber-200 bg-amber-50/50"
  },
  n8n: {
    name: "n8n",
    icon: n8n,
    description: "Design logic nodes and scheduling triggers visual pipelines to automate complex data actions without maintenance.",
    placeholder: "Design an active webhook flow in n8n that parses incoming webhooks, queries Gemini, and writes verified logs to Google Sheets.",
    accent: "text-rose-600 border-rose-200 bg-rose-50/50"
  },
  Anthropic: {
    name: "Anthropic",
    icon: Anthropic,
    description: "Empower specialized agent workspaces with Claude's visual tools, cache system prompt instructions, and client specifications.",
    placeholder: "Draft a system prompt pattern leveraging Claude's computer use capability to navigate a web console interface reliably.",
    accent: "text-orange-600 border-orange-200 bg-orange-50/50"
  },
  KiloCode: {
    name: "KiloCode",
    icon: KiloCode,
    description: "Model robust docker networks, provision cloud boxes, and write safe configuration blueprints.",
    placeholder: "Map out a developer workspace configuration file setup in KiloCode, defining terminal configurations and custom task automations.",
    accent: "text-sky-600 border-sky-200 bg-sky-50/50"
  }
};

// Custom SVGs and SLIDES Config
const OpenClawIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 120 120" fill="none" {...props}>
    <defs>
      <linearGradient id="openclaw__lobster-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff4d4d"/>
        <stop offset="100%" stopColor="#991b1b"/>
      </linearGradient>
    </defs>
    <path d="M60 10 C30 10 15 35 15 55 C15 75 30 95 45 100 L45 110 L55 110 L55 100 C55 100 60 102 65 100 L65 110 L75 110 L75 100 C90 95 105 75 105 55 C105 35 90 10 60 10Z" fill="url(#openclaw__lobster-gradient)"/>
    <path d="M20 45 C5 40 0 50 5 60 C10 70 20 65 25 55 C28 48 25 45 20 45Z" fill="url(#openclaw__lobster-gradient)"/>
    <path d="M100 45 C115 40 120 50 115 60 C110 70 100 65 95 55 C92 48 95 45 100 45Z" fill="url(#openclaw__lobster-gradient)"/>
    <path d="M45 15 Q35 5 30 8" stroke="#ff4d4d" strokeWidth="3" strokeLinecap="round"/>
    <path d="M75 15 Q85 5 90 8" stroke="#ff4d4d" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="45" cy="35" r="6" fill="#050810"/>
    <circle cx="75" cy="35" r="6" fill="#050810"/>
    <circle cx="46" cy="34" r="2.5" fill="#00e5cc"/>
    <circle cx="76" cy="34" r="2.5" fill="#00e5cc"/>
  </svg>
);

const ClaudeAI = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 257">
    <path
      fill="#D97757"
      d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z"
    />
  </svg>
);

const DeepSeekIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} style={{ flex: "none", lineHeight: "1", ...props.style }} viewBox="0 0 24 24">
    <path
      fill="#4D6BFE"
      d="M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 0 1-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 0 0-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 0 1-.465.137 9.597 9.597 0 0 0-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 0 0 1.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 0 1 1.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 0 1 .415-.287.302.302 0 0 1 .2.288.306.306 0 0 1-.31.307.303.303 0 0 1-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 0 1-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 0 1 .016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 0 1-.254-.078.253.253 0 0 1-.114-.358c.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z"
    />
  </svg>
);

const CodexIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    fill="currentColor"
    fillRule="evenodd"
    style={{ flex: "none", lineHeight: "1", ...props.style }}
    viewBox="0 0 24 24"
  >
    <title>Codex</title>
    <path
      clipRule="evenodd"
      d="M8.086.457a6.105 6.105 0 013.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 00.107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 01-.18 1.631.167.167 0 00.04.155 5.982 5.982 0 011.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 01-2.934 1.851.162.162 0 00-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 00-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 01-2.595-.622 6.058 6.058 0 01-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 01-.495-1.283 6.11 6.11 0 01-.017-3.064.166.166 0 00.008-.074.115.115 0 00-.037-.064 5.958 5.958 0 01-1.38-2.202 5.196 5.196 0 01-.333-1.589 6.915 6.915 0 01.188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 00.087-.087A6.016 6.016 0 015.635 2.31C6.315 1.464 7.132.846 8.086.457zm-.804 7.85a.848.848 0 00-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 001.46.864l1.94-3.272a.849.849 0 00.007-.854l-1.94-3.393zm5.446 6.24a.849.849 0 000 1.695h4.848a.849.849 0 000-1.696h-4.848z"
    />
  </svg>
);

const OpenCodeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 512 512" fill="none" {...props}>
    <rect width="512" height="512" fill="#131010" />
    <path d="M320 224V352H192V224H320Z" fill="#5A5858" />
    <path fillRule="evenodd" clipRule="evenodd" d="M384 416H128V96H384V416ZM320 160H192V352H320V160Z" fill="white" />
  </svg>
);

const AIAgentsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" fill="#0000EE" fillOpacity="0.1" stroke="#0000EE" />
    <circle cx="12" cy="12" r="3" fill="#0000EE" />
  </svg>
);

const SLIDES = [
  {
    name: "AI agents",
    colorClass: "text-electric-blue",
    bgClass: "bg-blue-50 border-blue-100",
    badgeTrackText: "AI agents",
    icon: AIAgentsIcon
  },
  {
    name: "OpenClaw",
    colorClass: "text-red-600",
    bgClass: "bg-red-50 border-red-100",
    badgeTrackText: "OpenClaw",
    icon: OpenClawIcon
  },
  {
    name: "Claude AI",
    colorClass: "text-[#D97757]",
    bgClass: "bg-amber-50 border-amber-100",
    badgeTrackText: "Claude AI",
    icon: ClaudeAI
  },
  {
    name: "DeepSeek",
    colorClass: "text-[#4D6BFE]",
    bgClass: "bg-indigo-50 border-indigo-100",
    badgeTrackText: "DeepSeek",
    icon: DeepSeekIcon
  },
  {
    name: "Codex",
    colorClass: "text-stone-800",
    bgClass: "bg-stone-50 border-stone-200",
    badgeTrackText: "Codex",
    icon: CodexIcon
  },
  {
    name: "OpenCode",
    colorClass: "text-stone-900",
    bgClass: "bg-stone-100 border-stone-200",
    badgeTrackText: "OpenCode",
    icon: OpenCodeIcon
  }
];

const FAQ_ITEMS = [
  {
    question: "What is agent experience?",
    answer: "Agent Experience (AX) is the modern practice of modeling and optimizing your company's public content, verification reports, and digital indexes. It ensures that conversational LLM agents (ChatGPT, Claude, Gemini, Perplexity) easily retrieve, comprehend, and prioritize citing your brand when users ask recommended questions."
  },
  {
    question: "Which AI agents and platforms do you support?",
    answer: "Our engine optimizes across all key conversational architectures including OpenAI's GPT models, Anthropic's Claude, Google's Gemini systems, Perplexity Search, and standard open-source framework models like Llama or Mistral."
  },
  {
    question: "Can't I track this with my existing analytics?",
    answer: "Traditional web analytics (like Google Analytics) only track direct user traffic to your links. They cannot see what questions LLMs are answering behind closed doors, nor can they tell you how many times your product was considered but rejected in conversational searches. We uncover this hidden discovery layer."
  },
  {
    question: "Do I need to change my product to get started?",
    answer: "No, you do not need to make changes to your codebase. All optimization is performed on public indexes, G2 files, community hubs, official docs, and reference articles where AI spiders crawl and build their knowledge base."
  },
  {
    question: "How quickly will I see results?",
    answer: "AI models crawl the web dynamically and rebuild weights regularly. Typically, once custom optimization strategies and content seeding are implemented, you will see a measurable change in LLM recommendation mentions within 1 to 2 weeks."
  },
  {
    question: "How is this different from SEO?",
    answer: "Whereas SEO focuses on securing a high link hierarchy on Page 1 of Search result lists, Agent Discovery focuses on semantic relevance. It aims to make your brand the definitive, conversational text recommendation that the AI model answers directly in its synthesis."
  }
];

const DEPARTMENTS = [
  { id: "Content", name: "Content", description: "Design programmatic outlines, write high-authority blog drafts, automate SEO article creation, and design viral newsletters powered by Gemini's structured generation.", icon: FileText, agent: "Gemini" as AgentType },
  { id: "Admin", name: "Admin", description: "Audit dense billing lists, parse line items and invoices, review customer agreements, and log details privately on local lightweight LLMs.", icon: Settings, agent: "Ollama" as AgentType },
  { id: "Research", name: "Research", description: "Audit competitor structures, cross-check academic sources, synthesize target trends, and build automated market reviews.", icon: Brain, agent: "OpenRouter" as AgentType },
  { id: "Sales", name: "Sales", description: "Draft high-converting outbound copy, customize outreach pitches based on visitor logs, and organize leads smoothly.", icon: Target, agent: "Anthropic" as AgentType },
  { id: "Support", name: "Support", description: "Categorize multi-channel customer tickets, retrieve relevant knowledge-base answers, and suggest instant, accurate replies.", icon: HeartHandshake, agent: "Gemini" as AgentType },
  { id: "Growth", name: "Growth", description: "Map out SEO authority silos, monitor search volume metrics, and optimize brand indexing footprints.", icon: TrendingUp, agent: "Ollama" as AgentType },
  { id: "Automation", name: "Automation", description: "Configure webhooks, connect trigger relays, orchestrate multi-step data pipelines, and synchronize sheets with zero manual overhead.", icon: Workflow, agent: "n8n" as AgentType }
];

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Department Showcase State
  const [selectedDept, setSelectedDept] = useState("Content");
  
  // Active slide index for hero rotating logos style
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1); // 1 = bottom to top, -1 = top to bottom

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection(1);
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Grid Agent Selector State
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>("Ollama");
  const [agentPrompt, setAgentPrompt] = useState(AGENTS_CONFIG["Ollama"].placeholder);
  const [agentResult, setAgentResult] = useState("");
  const [loadingAgent, setLoadingAgent] = useState(false);
  const [agentError, setAgentError] = useState("");

  // Discovery Analytics Form State
  const [companyName, setCompanyName] = useState("");
  const [companyNiche, setCompanyNiche] = useState("");
  const [discoveryResult, setDiscoveryResult] = useState("");
  const [loadingDiscovery, setLoadingDiscovery] = useState(false);
  const [discoveryError, setDiscoveryError] = useState("");

  // FAQ Accordion indexes
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0]);

  // Handle agent switch
  const handleSelectAgent = (agent: AgentType) => {
    setSelectedAgent(agent);
    setAgentPrompt(AGENTS_CONFIG[agent].placeholder);
    setAgentResult("");
    setAgentError("");
  };

  // Run AI Agent request
  const handleRunAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentPrompt.trim()) return;

    setLoadingAgent(true);
    setAgentError("");
    setAgentResult("");

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "agent_work",
          agentType: selectedAgent,
          prompt: agentPrompt
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate response.");
      }

      setAgentResult(data.text || "No response text was returned.");
    } catch (err: any) {
      setAgentError(err.message || "An unexpected error occurred while communicating with the server.");
    } finally {
      setLoadingAgent(false);
    }
  };

  // Run AI Discovery Optimization planner
  const handleRunDiscovery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      setDiscoveryError("Please enter your company / product name.");
      return;
    }

    setLoadingDiscovery(true);
    setDiscoveryError("");
    setDiscoveryResult("");

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "discovery",
          companyName,
          companyNiche
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze AI potential.");
      }

      setDiscoveryResult(data.text);
    } catch (err: any) {
      setDiscoveryError(err.message || "Unable to retrieve discovery recommendation. Please try again.");
    } finally {
      setLoadingDiscovery(false);
    }
  };

  const toggleFaq = (index: number) => {
    if (openFaqIndexes.includes(index)) {
      setOpenFaqIndexes(openFaqIndexes.filter((i) => i !== index));
    } else {
      setOpenFaqIndexes([...openFaqIndexes, index]);
    }
  };

  return (
    <div className="font-sans text-stone-900 bg-white scroll-smooth pb-0">
      {/* Navbar section exactly styled as mockup with blur */}
      <nav id="navbar" className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-xl border-b border-stone-200/50 transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <a href="#" className="font-serif flex items-center gap-2 sm:gap-3 group hover:opacity-95 transition-all min-w-0">
            <img src="/logo.svg" alt="The Micro Agent Company" className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-lg" />
            <span className="flex flex-col items-start min-w-0">
              <span className="text-[9px] sm:text-[10px] italic leading-none text-stone-400 font-medium tracking-tight">the</span>
              <span className="text-[11px] sm:text-[14px] uppercase font-bold tracking-[0.14em] sm:tracking-[0.2em] text-stone-900 leading-none">
                Micro Agent
              </span>
              <span className="text-[11px] sm:text-[14px] uppercase font-bold tracking-[0.14em] sm:tracking-[0.2em] text-stone-900 leading-none mt-0.5">
                Company
              </span>
            </span>
          </a>

          {/* Links for desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/products" className="text-stone-600 font-medium text-[13px] hover:text-electric-blue transition-colors">Products</a>
            <a href="/agents" className="text-stone-600 font-medium text-[13px] hover:text-electric-blue transition-colors">Agents</a>
            <a href="/use-cases" className="text-stone-600 font-medium text-[13px] hover:text-electric-blue transition-colors">Use Cases</a>
            <a href="/pricing" className="text-stone-600 font-medium text-[13px] hover:text-electric-blue transition-colors">Pricing</a>
            <a href="/docs" className="text-stone-600 font-medium text-[13px] hover:text-electric-blue transition-colors">Docs</a>
          </div>

          <div className="flex items-center space-x-3">
            <a href="/sign-in" className="font-sans text-[12px] font-medium text-stone-800 px-4 py-2 border border-stone-200 rounded-[10px] hover:border-electric-blue hover:text-electric-blue transition-all hidden sm:inline-block">
              Sign in
            </a>
            <a href="/waitlist" className="font-sans text-[11px] sm:text-[12px] font-medium bg-pure-black text-white px-3 sm:px-5 py-2 rounded-full hover:bg-electric-blue transition-all active:scale-95 whitespace-nowrap">
              Start free trial
            </a>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-stone-700 hover:text-stone-900 p-1"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu layout */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-stone-200 py-4 px-6 space-y-3 absolute top-16 left-0 right-0 shadow-lg">
            <a href="/products" onClick={() => setMobileMenuOpen(false)} className="block text-stone-700 font-medium text-[14px]">Products</a>
            <a href="/agents" onClick={() => setMobileMenuOpen(false)} className="block text-stone-700 font-medium text-[14px]">Agents</a>
            <a href="/use-cases" onClick={() => setMobileMenuOpen(false)} className="block text-stone-700 font-medium text-[14px]">Use Cases</a>
            <a href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block text-stone-700 font-medium text-[14px]">Pricing</a>
            <a href="/docs" onClick={() => setMobileMenuOpen(false)} className="block text-stone-700 font-medium text-[14px]">Docs</a>
            <div className="pt-2 border-t border-stone-100 flex flex-col space-y-2">
              <a href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="text-center font-medium text-[13px] py-1.5 border border-stone-200 rounded-[10px]">
                Sign in
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative px-6 overflow-hidden pt-16">
        {/* HD local landscape backdrop */}
        <div
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat opacity-80 pointer-events-none"
          style={{
            backgroundImage: "url('/hero.png')"
          }}
        />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[900px] mx-auto text-center relative z-10 flex flex-col items-center pt-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-xs border border-stone-200 rounded-md px-3 py-1 mb-7 shadow-xs transition-all duration-300">
            <span className="font-sans text-[11px] font-medium text-stone-500 uppercase tracking-wider">Built by</span>
            <div className="w-1.5 h-1.5 rounded-full bg-electric-blue transition-colors duration-300" />
            <span className="font-sans text-[11px] font-bold text-electric-blue uppercase tracking-wider">
              {SLIDES[activeSlide].name}
            </span>
          </div>

          <h1 className="font-serif text-[40px] sm:text-[56px] leading-[1.2] text-stone-955 font-normal tracking-tight mb-6 min-h-[100px] sm:min-h-[140px] flex flex-col items-center justify-center">
            <span>Work like a real team with</span>
            <div className="relative overflow-hidden h-[54px] sm:h-[72px] w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={{
                    enter: { y: 30, opacity: 0 },
                    center: { y: 0, opacity: 1 },
                    exit: { y: -30, opacity: 0 }
                  }}
                  transition={{ 
                    y: { type: "spring", stiffness: 350, damping: 25 },
                    opacity: { duration: 0.15 } 
                  }}
                  className="absolute flex items-center justify-center gap-3.5 w-full"
                >
                  {React.createElement(SLIDES[activeSlide].icon, { 
                    className: "w-8 h-8 sm:w-11 sm:h-11 object-contain" 
                  })}
                  <span className={`font-serif font-bold ${SLIDES[activeSlide].colorClass}`}>
                    {SLIDES[activeSlide].name}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </h1>

          <p className="font-sans text-[15px] sm:text-[17px] leading-relaxed text-stone-600 mb-10 max-w-[620px]">
            The Micro Agent Company helps individuals, creators, freelancers, and small businesses turn AI into a working team for content, admin, research, sales, support, and growth.
          </p>

          <div className="flex flex-col items-center">
            <a 
              href="#agent-playroom" 
              className="font-sans text-[13px] font-semibold bg-pure-black text-white px-9 py-3.5 rounded-full hover:bg-electric-blue transition-all shadow-md active:scale-95 mb-4"
            >
              Start free trial
            </a>
            <span className="font-sans text-[11px] text-stone-400 tracking-wide">Small company. Smart agents. Real work done.</span>
          </div>
        </motion.div>
      </section>

      {/* "BUILT FOR REAL WORK" Grid section */}
      <section id="built-for" className="min-h-screen flex flex-col justify-center py-20 bg-stone-50/50 border-b border-stone-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-[650px] mx-auto mb-12">
            <h3 className="font-sans text-[11px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">
              Built for real work
            </h3>
            <h2 className="font-serif text-[38px] leading-[1.2] font-normal text-stone-955 mb-4">
              A collaborative team structure for your business
            </h2>
            <p className="text-stone-500 text-[14px]">
              Select a specialized functional department below to explore their workflows and active agent orchestrations.
            </p>
          </div>

          {/* Department selector grid (7 horizontal tabs responsive grid) */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 border-l border-t border-stone-200 mb-8 rounded-lg overflow-hidden shadow-xs">
            {DEPARTMENTS.map((dept) => {
              const IconComp = dept.icon;
              const isSelected = selectedDept === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => {
                    setSelectedDept(dept.id);
                  }}
                  id={`dept-tab-${dept.id.toLowerCase()}`}
                  className={`flex flex-col items-center justify-center p-6 border-r border-b border-stone-200 bg-white transition-all focus:outline-none relative group text-center cursor-pointer min-h-[120px] ${
                    isSelected 
                      ? "ring-2 ring-electric-blue ring-inset z-20 shadow-sm bg-stone-50/10" 
                      : "hover:bg-stone-50/30 hover:z-10"
                  }`}
                >
                  <IconComp className={`w-5 h-5 mb-2 transition-colors ${isSelected ? "text-electric-blue" : "text-stone-400 group-hover:text-stone-700"}`} />
                  <span className={`font-sans text-[14px] font-semibold tracking-tight text-stone-900 group-hover:text-stone-900`}>
                    {dept.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Department Details Canvas with Animation */}
          <AnimatePresence mode="wait">
            {DEPARTMENTS.map((dept) => {
              if (dept.id !== selectedDept) return null;
              const RecommendIcon = AGENTS_CONFIG[dept.agent].icon;
              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white border border-stone-200 rounded-xl p-5 sm:p-8 shadow-xs max-w-[900px] mx-auto"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 items-center">
                    <div className="md:col-span-2 space-y-4">
                      <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-[11px] font-semibold font-sans tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                        ACTIVE DEPARTMENT WORKFLOW
                      </div>
                      <h4 className="font-serif text-2xl text-stone-950 font-normal">
                        Optimizing {dept.name} with AI Agents
                      </h4>
                      <p className="font-sans text-stone-600 text-[13.5px] leading-relaxed">
                        {dept.description}
                      </p>
                    </div>

                    <div className="bg-stone-50/80 border border-stone-150 rounded-lg p-5 flex flex-col justify-between h-full min-h-[160px]">
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">
                          POWERED BY
                        </span>
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-lg bg-white border border-stone-200 text-electric-blue">
                            <RecommendIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-sans font-bold text-stone-900 text-[13.5px]">
                              {dept.agent}
                            </span>
                            <span className="text-[10px] text-stone-400 block font-mono">
                              AGENT NODE
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          handleSelectAgent(dept.agent);
                          const el = document.getElementById("agent-playroom");
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="mt-4 w-full justify-center bg-pure-black text-white hover:bg-electric-blue text-[12px] font-semibold py-2.5 px-4 rounded-lg inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
                      >
                        Activate Playroom console
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* Interactive Agent Playroom Component */}
      <section id="agent-playroom" className="min-h-screen flex flex-col justify-center py-20 bg-white border-b border-stone-100">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center max-w-[600px] mx-auto mb-12">
            <h2 className="font-serif text-3xl font-medium text-stone-950 mb-3">
              Interactive Agent Playroom
            </h2>
            <p className="text-stone-500 text-[14px]">
              Select an agent from the grid above to activate their console, edit their prompt, and see them execute real-world workflows in real time.
            </p>
          </div>

          {selectedAgent && (
            <div className="border border-stone-200 rounded-xl overflow-hidden shadow-xs bg-white">
              {/* Header */}
              <div className="bg-stone-50 border-b border-stone-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-white border border-stone-200">
                    {React.createElement(AGENTS_CONFIG[selectedAgent].icon, { className: "w-5 h-5 text-electric-blue" })}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-stone-900 text-sm">{selectedAgent} Agent</h4>
                    <p className="text-[11px] text-stone-400 flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Ready & Active
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono bg-stone-100 text-stone-500 px-2 py-1 rounded">
                  MODEL: GEMINI-3.5-FLASH
                </span>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-stone-600 text-[13px] mb-4">
                  {AGENTS_CONFIG[selectedAgent].description}
                </p>

                <form onSubmit={handleRunAgent} className="space-y-4">
                  <div>
                    <label className="block text-stone-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                      Agent Instructions / Prompt
                    </label>
                    <textarea
                      value={agentPrompt}
                      onChange={(e) => setAgentPrompt(e.target.value)}
                      rows={3}
                      className="w-full border border-stone-200 rounded-lg p-3 text-stone-800 text-[13px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue focus:outline-none placeholder-stone-400 font-sans"
                      id="agent-prompt-textarea"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => setAgentPrompt(AGENTS_CONFIG[selectedAgent].placeholder)}
                      className="text-stone-400 text-[11px] hover:text-stone-600 flex items-center gap-1"
                    >
                      Reset template prompt
                    </button>

                    <button
                      type="submit"
                      disabled={loadingAgent || !agentPrompt.trim()}
                      className="bg-pure-black hover:bg-electric-blue disabled:bg-stone-300 text-white font-sans text-[12px] font-semibold px-5 py-2.5 rounded-full inline-flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-xs"
                      id="run-agent-btn"
                    >
                      {loadingAgent ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Executing...
                        </>
                      ) : (
                        <>
                          <Play size={12} className="fill-white" />
                          Execute Agent Workflow
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Response outputs */}
                {(agentResult || loadingAgent || agentError) && (
                  <div className="mt-6 border-t border-stone-200 pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={11} className="text-electric-blue" />
                        Agent Output Console
                      </span>
                      {loadingAgent && (
                        <span className="text-[11px] text-electric-blue font-mono animate-pulse">
                          Receiving context...
                        </span>
                      )}
                    </div>

                    {loadingAgent && (
                      <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-2">
                        <div className="h-3.5 bg-stone-200 rounded animate-pulse w-3/4" />
                        <div className="h-3.5 bg-stone-200 rounded animate-pulse w-5/6" />
                        <div className="h-3.5 bg-stone-200 rounded animate-pulse w-2/3" />
                      </div>
                    )}

                    {agentError && (
                      <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 text-[13px]">
                        <p className="font-bold mb-1">Execution failed</p>
                        <p>{agentError}</p>
                      </div>
                    )}

                    {agentResult && (
                      <div className="bg-stone-900 border border-stone-950 text-stone-100 rounded-lg p-5 font-sans leading-relaxed text-[13px] shadow-inner overflow-x-auto">
                        <div className="prose prose-invert max-w-none text-stone-300">
                          {agentResult.split("\n").map((line, idx) => {
                            if (line.startsWith("#")) {
                              return <h4 key={idx} className="text-white font-bold text-sm mt-3 mb-1 first:mt-0">{line.replace(/#/g, "").trim()}</h4>;
                            }
                            if (line.startsWith("-") || line.startsWith("*")) {
                              return <li key={idx} className="ml-4 list-disc mt-1">{line.substring(1).trim()}</li>;
                            }
                            return <p key={idx} className="mt-1 pb-1">{line}</p>;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Discovery Section with editorial SaaS grid layout */}
      <section id="discovery" className="min-h-screen bg-white border-y border-stone-200 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto border-x border-stone-200/80 relative">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.18] [background-image:radial-gradient(rgba(0,0,0,0.12)_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[55%_45%] border-b border-stone-200">
            <div className="px-6 sm:px-10 lg:px-14 py-14 lg:py-16 border-b lg:border-b-0 lg:border-r border-stone-200">
              <h2 className="font-serif text-[48px] sm:text-[64px] leading-[1.02] text-stone-950 mb-5 font-normal tracking-tight">
                Discovery
              </h2>
              <p className="text-stone-500 font-sans text-[15px] leading-relaxed max-w-[390px]">
                When AI answers a question, your product should be in the answer.
              </p>
            </div>
            <div className="relative min-h-[180px] px-6 sm:px-10 lg:px-14 py-14 lg:py-16 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />
              <div className="relative z-10 font-mono text-[10px] leading-5 tracking-[0.18em] text-stone-300 select-none">
                01001001 01000001<br />
                10110100 00101101<br />
                01100001 01100111<br />
                01100101 01101110
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[55%_45%]">
            {/* Left Column */}
            <div className="relative min-h-[620px] bg-[#fafafa] border-b lg:border-b-0 lg:border-r border-stone-200 px-6 sm:px-10 lg:px-14 py-12 lg:py-16 overflow-hidden">
              <div className="absolute left-8 top-10 w-64 h-64 rounded-full border border-dashed border-stone-300/70 opacity-40" />
              <div className="absolute right-10 bottom-16 w-44 h-44 rounded-full border border-stone-300/60 opacity-35" />
              <div className="absolute inset-0 opacity-[0.20] bg-blueprint" />

              {/* Illustration Card / Interactive Form widget */}
              <div className="relative z-10 border border-stone-200 rounded-xl shadow-sm bg-white/95 backdrop-blur-sm p-6 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md max-w-[640px] mx-auto lg:mx-0">

              <div className="relative z-10 space-y-6">
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">
                    AI Search Discovery Tool
                  </h4>
                  <p className="text-[12px] text-stone-400">
                    Analyze how conversational engines crawl and cite your company.
                  </p>
                </div>

                <form onSubmit={handleRunDiscovery} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Acme CRM"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-stone-800 text-[12px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue focus:outline-none"
                        id="discovery-name-input"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                        Product Niche
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. AI-powered CRM"
                        value={companyNiche}
                        onChange={(e) => setCompanyNiche(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-stone-800 text-[12px] focus:ring-1 focus:ring-electric-blue focus:border-electric-blue focus:outline-none"
                        id="discovery-niche-input"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loadingDiscovery || !companyName.trim()}
                    className="w-full bg-pure-black hover:bg-electric-blue disabled:bg-stone-300 text-white font-sans text-[11px] font-bold px-4 py-2.5 rounded-full inline-flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
                    id="analyze-aio-btn"
                  >
                    {loadingDiscovery ? (
                      <>
                        <Sparkles size={12} className="animate-spin text-white" />
                        Generating analysis...
                      </>
                    ) : (
                      <>
                        <Sparkles size={12} className="text-white" />
                        Generate AI Optimization Plan
                      </>
                    )}
                  </button>
                </form>

                {/* Sub-card mimicking wireframe output */}
                <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm mt-4 min-h-[160px]">
                  {loadingDiscovery ? (
                    <div className="space-y-3 animate-pulse">
                      <div className="h-3.5 bg-stone-100 rounded w-1/3" />
                      <div className="h-3.5 bg-stone-100 rounded w-full" />
                      <div className="h-3.5 bg-stone-100 rounded w-5/6" />
                      <div className="h-3 bg-stone-100 rounded w-1/2" />
                    </div>
                  ) : discoveryError ? (
                    <p className="text-red-500 text-[12px]">{discoveryError}</p>
                  ) : discoveryResult ? (
                    <div className="prose prose-sm text-stone-700 text-[12.5px] max-h-[300px] overflow-y-auto pr-1">
                      {discoveryResult.split("\n").map((line, idx) => {
                        if (line.startsWith("#")) {
                          return <h5 key={idx} className="font-bold text-stone-900 mt-2.5 mb-1 first:mt-0">{line.replace(/#/g, "").trim()}</h5>;
                        }
                        return <p key={idx} className="mt-1 pb-1">{line}</p>;
                      })}
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-sans text-[15px] font-semibold text-stone-800 mb-4 flex items-center justify-between">
                        Top 5 AI-Powered CRM Tools in 2025
                        <span className="text-[10px] bg-sky-50 text-sky-600 font-semibold px-2 py-0.5 rounded-full border border-sky-100">AI Citation Target</span>
                      </h4>
                      <div className="space-y-3">
                        <p className="font-sans font-bold text-[13px] text-stone-900">Intro</p>
                        <p className="font-sans text-[12px] leading-relaxed text-stone-500">
                          When businesses ask AI tools like ChatGPT, Claude, or Gemini &quot;What&apos;s the best AI CRM for small businesses?&quot; — the answers come from a handful of trusted sources. 
                        </p>
                        <div className="inline-block bg-stone-100 text-[10px] text-stone-500 px-2 py-0.5 rounded-lg border border-stone-200 font-medium my-1">
                          Best CRM Software 2025 report by G2
                        </div>
                        <div className="relative pt-1">
                          <p className="font-sans text-[12px] leading-relaxed text-stone-500">
                            We analyzed AI responses across platforms to find the most-cited CRM tools, why they stand out...
                          </p>
                          <div className="absolute -bottom-2 right-4 bg-pure-black text-white text-[10px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                            <Sparkles size={11} className="text-white animate-pulse" />
                            Optimized CRM Index Setup
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

            {/* Right Column - Step Details */}
            <div className="flex flex-col bg-white">
              {/* Step 1 */}
              <div className="group border-b border-stone-200 px-6 sm:px-10 lg:px-14 py-12 lg:py-16 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-stone-300 hover:bg-stone-50/40">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-[3px] bg-warm-orange shadow-[0_0_0_4px_rgba(248,145,4,0.12)]" />
                <span className="font-sans text-[10px] text-stone-400 font-bold tracking-widest uppercase">
                  [ STEP 01 ]
                </span>
              </div>
              <h4 className="font-serif font-bold text-stone-950 text-[19px] mb-2">
                Find user questions
              </h4>
              <p className="text-stone-500 text-[13px] leading-relaxed">
                Find the exact conversational query lines your target demographic enters into generative chatbots.
              </p>
            </div>

              {/* Step 2 */}
              <div className="group border-b border-stone-200 px-6 sm:px-10 lg:px-14 py-12 lg:py-16 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-stone-300 hover:bg-stone-50/40">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-[3px] bg-warm-orange shadow-[0_0_0_4px_rgba(248,145,4,0.12)]" />
                <span className="font-sans text-[10px] text-stone-400 font-bold tracking-widest uppercase">
                  [ STEP 02 ]
                </span>
              </div>
              <h4 className="font-serif font-bold text-stone-950 text-[19px] mb-2">
                Generate content
              </h4>
              <p className="text-stone-500 text-[13px] leading-relaxed">
                Develop reference content optimized for structural indexers to establish your product as the leading cited source.
              </p>
            </div>

              {/* Step 3 */}
              <div className="group px-6 sm:px-10 lg:px-14 py-12 lg:py-16 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-stone-50/40">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-[3px] bg-warm-orange shadow-[0_0_0_4px_rgba(248,145,4,0.12)]" />
                <span className="font-sans text-[10px] text-stone-400 font-bold tracking-widest uppercase">
                  [ STEP 03 ]
                </span>
              </div>
              <h4 className="font-serif font-bold text-stone-950 text-[19px] mb-2">
                Increase AI traffic & mentions
              </h4>
              <p className="text-stone-500 text-[13px] leading-relaxed">
                Synthesize incoming bot index patterns and verify active mentions directly in conversational output channels.
              </p>
            </div>
          </div>

        </div>
      </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section id="faq" className="min-h-screen flex flex-col justify-center py-24 bg-stone-50/50 border-b border-stone-200">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left Block */}
          <div>
            <h2 className="font-serif text-[42px] leading-[1.1] font-normal text-stone-955 mb-4">
              Frequently asked<br className="hidden md:inline" /> questions
            </h2>
            <p className="text-stone-500 text-[13px] font-sans">
              Get clear, technical answers to the most common questions about optimizing for AI agent discovery systems.
            </p>
          </div>

          {/* Right Block Accordions */}
          <div className="border-t border-stone-250">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndexes.includes(index);
              return (
                <div 
                  key={index} 
                  className="border-b border-stone-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-5 flex justify-between items-center text-left group hover:bg-stone-50 transition-all focus:outline-none"
                    id={`faq-btn-${index}`}
                  >
                    <span className="font-sans font-semibold text-[14px] text-stone-900 group-hover:text-electric-blue transition-colors">
                      {item.question}
                    </span>
                    <span className="text-stone-400 group-hover:text-stone-900 transition-colors">
                      {isOpen ? (
                        <ChevronUp size={16} className="text-electric-blue font-bold" />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </span>
                  </button>

                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-40 py-2.5 pb-6 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="font-sans text-stone-500 text-[13px] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Premium editorial footer */}
      <footer id="footer" className="min-h-[620px] pt-20 lg:pt-24 bg-[#fafafa] relative overflow-hidden border-t border-black/[0.08]">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-100 [background-image:radial-gradient(circle,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:14px_14px]" />
        <div className="absolute top-0 bottom-0 left-1/2 z-0 w-px bg-black/[0.08] pointer-events-none" />
        <div
          className="absolute inset-0 z-0 bg-bottom bg-[length:118%_auto] bg-no-repeat opacity-50 mix-blend-multiply pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_78%,transparent)]"
          style={{ backgroundImage: "url('/footer.png')" }}
        />
        <div className="absolute inset-x-0 bottom-0 z-0 h-64 bg-gradient-to-b from-transparent via-[#fafafa]/85 to-[#fafafa] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1440px] border-x border-black/[0.08] px-6 sm:px-10 lg:px-14">
          <div className="mx-auto max-w-[820px] text-center pb-16 lg:pb-20">
            <h2 className="font-serif text-[34px] sm:text-[48px] lg:text-[56px] leading-[1.05] font-normal tracking-tight text-[#050505] mb-4">
              Get discovered & used by
            </h2>
            <p className="font-serif text-xl sm:text-2xl text-[#050505] mb-5">
              AI Agents
            </p>
            <p className="mx-auto max-w-[560px] text-[14px] sm:text-[15px] leading-relaxed text-stone-600 mb-8">
              You optimized for user experience. Now optimize for <span className="font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-blue-600">AGENT EXPERIENCE.</span>
            </p>
            <a
              href="/waitlist"
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-[13px] font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-black/85 active:translate-y-0"
            >
              Start free trial
            </a>
          </div>

          <div className="border-t border-black/[0.08] py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16">
            <div className="space-y-6">
              <div className="font-serif text-[#050505] flex flex-col items-start w-max">
                <span className="text-[12px] italic leading-none mb-1 text-stone-400">the</span>
                <span className="text-[20px] uppercase font-bold tracking-[0.2em] leading-none mb-3">
                  Micro Agent<br />Company
                </span>
              </div>
              <p className="max-w-[420px] text-[13.5px] leading-relaxed text-stone-600">
                You optimized for user experience. Now optimize for <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">AGENT EXPERIENCE.</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:justify-items-end">
              <div className="flex flex-col space-y-4">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Company</span>
                <a href="/pricing" className="text-[12px] font-medium text-stone-600 hover:text-blue-600 transition-colors">Pricing</a>
                <a href="#built-for" className="text-[12px] font-medium text-stone-600 hover:text-blue-600 transition-colors">Enterprise</a>
                <a href="#discovery" className="text-[12px] font-medium text-stone-600 hover:text-blue-600 transition-colors">Trust center</a>
                <a href="#built-for" className="text-[12px] font-medium text-stone-600 hover:text-blue-600 transition-colors">Competitor analysis</a>
                <a href="/docs" className="text-[12px] font-medium text-stone-600 hover:text-blue-600 transition-colors">Documentation</a>
                <a href="#hero" className="text-[12px] font-medium text-stone-600 hover:text-blue-600 transition-colors">Careers</a>
              </div>

              <div className="flex flex-col space-y-4">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Contact</span>
                <a href="#" className="text-[12px] font-medium text-stone-600 hover:text-blue-600 transition-colors">LinkedIn</a>
                <a href="#" className="text-[12px] font-medium text-stone-600 hover:text-blue-600 transition-colors">X / Twitter</a>
              </div>

              <div className="flex flex-col space-y-4">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Legal</span>
                <a href="#" className="text-[12px] font-medium text-stone-600 hover:text-blue-600 transition-colors">Privacy policy</a>
                <a href="#" className="text-[12px] font-medium text-stone-600 hover:text-blue-600 transition-colors">Terms of use</a>
              </div>
            </div>
          </div>

          <div className="border-t border-black/[0.08] py-6">
            <p className="text-[11px] font-medium text-stone-600">
              © 2026 The Micro Agent Company, Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
