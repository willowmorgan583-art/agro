# Visual Analytics, Complete Bilingual Kiswahili Localization & Editorial Imagery

This update elevates Agrolink Africa with rich quantitative agronomic data visualization, seamless full-interface bilingualism (English & Kiswahili), professional typography, and authentic editorial agricultural imagery across the ecosystem.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were confirmed during requirements alignment:

- **Growth vs. Yield Visualization**: Dual-axis Recharts area and line chart embedded in the `OverviewDashboard`. Plots projected vegetative growth trajectory against actual harvested yields (Metric Tonnes/Acre) across seasonal growth weeks (Week 2 to Week 16), with a secondary axis for historical soil moisture percentage and localized rainfall events. Dynamically recalibrates based on the selected pilot county (Nakuru, Kiambu, Meru).
- **Comprehensive Bilingual Localization**: Full-interface translation architecture supporting English and Kiswahili (`'en'` / `'sw'`). The `TopNav` features a single-click language toggle that updates all headings, metric labels, buttons, and module instructions. In addition, the `AgronomyChatbot` backend receives the active language token and responds in fluent, natural Kiswahili or English.
- **Editorial Imagery & Visual Polish**: High-fidelity visual cards showcasing Kenyan highland terraced farming (Meru tea & horticulture), modern solar-chilled logistics transport, and field harvest crates, supported by resilient SVG fallbacks to guarantee zero broken images.
- **Enhanced Professional Typography**: Sharpened typographic scale pairing `Plus Jakarta Sans` (display & brand headlines) with `DM Sans` (prose & UI controls) and `JetBrains Mono` (tabular numeric figures, coordinates, and KES currency values).

---

### 1. Overview & Core Concept

- **What It Delivers**: Transforms Agrolink Africa into a fully localized, publication-grade analytical cockpit. Farmers and institutional buyers can now inspect multi-factor agronomic yield curves, interact in their native language (Swahili or English), consult a bilingual AI agronomist, and experience an authentic Pan-African visual identity.
- **Target Audience / Persona**:
  - *Smallholder Farmers in Rural Kenya*: Switch to Kiswahili with one click, understanding planting advice, soil moisture indicators, and USSD commands in natural, familiar terminology.
  - *Commercial Aggregators & Extension Officers*: Review empirical yield variances (projected vs actual) against precipitation anomalies in Nakuru, Kiambu, and Meru.
- **Key Value**: Bridges linguistic barriers for grassroots farmers while delivering enterprise-grade agronomic data visualization for commercial off-takers.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Interactive Dual-Axis Yield & Soil Moisture Chart (`OverviewDashboard`)**:
   - The user views a prominent visual card: **"Projected Growth vs. Actual Harvested Yield"**.
   - Dual-axis graph shows:
     - Area chart: Soil Moisture saturation (0–100%) and precipitation bars.
     - Line 1 (Forest Green): AI Projected Biomass & Yield (MT/Acre).
     - Line 2 (Terracotta Orange): Verified Actual Farm Harvested Yield.
   - County toggle selector automatically updates the time series (e.g., Meru French beans 75-day cycle vs. Nakuru 150-day hybrid maize cycle).
2. **Global Language Switcher (`TopNav`)**:
   - Clean segmented toggle button in the top navigation: `EN | SW`.
   - Switching to `SW` instantly translates all sections (e.g. *Overview* → *Muhtasari*, *Demand AI* → *Utabiri wa Mahitaji*, *Early Warning* → *Onyo la Mapema*, *Smart Dispatch* → *Usambazaji*, *AgriFinance* → *Fedha za Kilimo*).
   - Informs the `AgronomyChatbot` so subsequent AI replies are generated in Kiswahili.
3. **Editorial Imagery & Typographic Harmony**:
   - Hero and module preview cards integrate curated editorial visuals of Kenyan agriculture.
   - High legibility with WCAG AA compliance, zero-pill metadata formatting, and crisp contrast.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual-Axis Recharts vs. D3 SVG**:
  - *Chosen Approach*: Implement a lightweight, responsive Recharts / SVG dual-axis component with smooth tooltips and milestone markers.
  - *Why*: Provides fluid responsiveness across mobile and desktop without heavy bundle bloat or manual DOM mutation bugs.
- **Decision 2: Global Bilingual Translation Dictionary (`src/locales/i18n.ts`)**:
  - *Chosen Approach*: Centralized TypeScript translation schema providing type-safe keys for both English and Kiswahili.
  - *Why*: Guarantees zero missing strings, instant client-side switching with zero network delay, and clean maintenance.
- **Decision 3: Backend Chatbot Multilingual Prompting**:
  - *Chosen Approach*: Pass `language: 'en' | 'sw'` in `POST /api/gemini/chat` request body; prompt instruct Gemini to answer in fluent Kiswahili when `'sw'` is active.
  - *Why*: Ensures the AI agronomist converses naturally in Kenyan Swahili with appropriate local farming terminology.

---

### 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                   BILINGUAL LOCALIZATION & VISUAL ANALYTICS                      │
└──────────────────────────────────────────────────────────────────────────────────┘
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
     ┌────────────────────────┐                      ┌────────────────────────┐
     │ TopNav Language Toggle │                      │ Global Language State  │
     │      [ EN | SW ]       │                      │  ('en' <--> 'sw')      │
     └────────────────────────┘                      └────────────────────────┘
                  │                                               │
                  ├───────────────────────────────────────────────┤
                  ▼                                               ▼
┌──────────────────────────────────┐            ┌──────────────────────────────────┐
│   Bilingual String Dictionary    │            │    Dual-Axis Recharts Engine     │
│   (locales/translations.ts)      │            │  (Growth vs. Soil & Yield)       │
│  - Navigation, Labels, Modals    │            │  - Nakuru, Kiambu, Meru profiles │
└──────────────────────────────────┘            └──────────────────────────────────┘
                  │                                               │
                  ├───────────────────────────────────────────────┤
                  ▼                                               ▼
┌──────────────────────────────────┐            ┌──────────────────────────────────┐
│   Bilingual Agronomy Chatbot     │            │    Curated Editorial Imagery     │
│  (/api/gemini/chat + Language)   │            │  - Highland Terraced Farms       │
│  - English / Kiswahili responses │            │  - Solar Cold-Chain Transport    │
└──────────────────────────────────┘            └──────────────────────────────────┘
```

#### Key Additions
- `src/locales/translations.ts`: Complete English and Kiswahili dictionary.
- `src/components/YieldGrowthChart.tsx`: Dual-axis Recharts area/line visualization with soil moisture overlay.
- `src/components/TopNav.tsx`: Integrated `EN | SW` language toggle.
- `server.ts`: Update `/api/gemini/chat` system instruction to support `language === 'sw'`.
