# TASAT-RCEF M&E: Farmer Survey Field Application

Offline-first mobile field survey application for rice farmer interviews (RCEF M&E), built with a Vue 3 Domain-Driven Design (DDD) frontend, Laravel Repository-pattern backend, and packaged for Android 13+ via Capacitor.

---

## Deliverables

| Deliverable         | Location / Details                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Git Repository**  | Public Git repository with intact, granular commit history.                                                               |
| **Installable APK** | [`tasat-rcef-app-debug.apk`](./tasat-rcef-app-debug.apk) (Root directory, ~6.48 MB, debug-signed, Android 13+ / API 33+). |
| **Test Accounts**   | Documented below with one-tap quick-fill buttons on the login screen.                                                     |

---

## Test Account Credentials

Pre-seeded in both client-side SQLite and backend SQLite:

| Username      | Password       | Role       | Description                        |
| ------------- | -------------- | ---------- | ---------------------------------- |
| `enumerator1` | `Password123!` | Enumerator | Primary field enumerator account   |
| `enumerator2` | `Password123!` | Enumerator | Secondary field enumerator account |

---

## Architecture & Tech Stack

### Frontend: Domain-Driven Design (DDD)

- **Framework**: Vue 3 (Composition API) + TypeScript + Tailwind CSS (Roboto font only, plain high-contrast field aesthetic).
- **`domain/`**: Pure entities (`FarmerInformation`, `RiceFarmingInformation`, `SurveyInterview`), validation rules, and questionnaire schema.
- **`application/`**: Use cases for authentication and survey persistence.
- **`infrastructure/`**: Client-side WebAssembly SQLite (`sql.js`) with binary snapshot serialization via `@capacitor/preferences` that survives app restarts, background kills, and reboots.
- **`presentation/`**: Dynamic schema-driven questionnaire with 9-language regional support (English, Tagalog, Ilokano, Cebuano, Hiligaynon, Waray, Bikol, Kapampangan, Pangasinan). Block 2 displays dynamically only when Q6 (`B1Q6`) = "Yes".

### Backend: Repository-Based Architecture

- **Framework**: Laravel 12 + SQLite (`database/database.sqlite`).
- **Structure**: Decoupled repository contracts (`UserRepositoryInterface`, `SurveyInterviewRepositoryInterface`), Eloquent SQLite implementations, service layer, and validated request controllers.
- **Testing**: 100% passing PHPUnit feature test suite (`SurveyInterviewApiTest.php`).

### Mobile Container

- **Capacitor 8**: Configured for Android 13+ (`targetSdkVersion 36`, `compileSdkVersion 36`) with edge-to-edge safe area handling.

---

## Why PWA / Web-Hybrid Over Platform-Specific Native (Java/Kotlin, C#, Flutter)

For nationwide agricultural field surveys, a PWA / Capacitor web-hybrid architecture is superior to platform-specific native apps:

1. **Universal Multi-Platform Accessibility (Single Codebase)**: The survey is directly accessible across all platforms—whether Android, iOS, or Desktop (Windows/macOS/Linux)—from a single unified codebase, running as an installable mobile app, offline PWA, or desktop web portal without maintaining separate platform repositories.
2. **Frictionless Field Updates**: Survey schema adjustments, new questions, and dialect translations can be deployed over-the-air (OTA) without waiting for app store reviews or requiring rural enumerators to manually side-load 50MB+ APK binaries.
3. **Lightweight on Budget Hardware**: Produces a lean **~6.48 MB APK** with low RAM consumption. Unlike Flutter or .NET MAUI, it does not bundle heavy runtime engines or virtual machines, running smoothly on low-cost 2GB RAM Android devices used by field staff.
4. **Open Web Standards**: Eliminates vendor lock-in and breaking framework migrations (e.g. Xamarin to MAUI), ensuring long-term maintainability by any web developer.
5. **Seamless Offline-to-Online Flow**: The same domain entities communicate with local SQLite offline and serialize directly to REST APIs when connectivity is available.

---

## AI Tools & IDE Attribution

- **IDEs & Development Tools**:
    - **Antigravity IDE**: Primary coding and full-stack development environment.
    - **Android Studio**: Used for native Android debugging, device inspection, and APK compilation.
- **AI Assistants & Tools**:
    - **Google Gemini**: Used for initial architecture brainstorming, requirement analysis, and offline persistence strategy before the start of development.
    - **Antigravity Agent**: Used during development for pair programming, scaffolding, and implementation.
- **How Tools Contributed**:
    - Brainstorming the offline-first WebAssembly SQLite persistence model and PWA-versus-native trade-offs prior to coding.
    - Scaffolding DDD layer separation on the frontend and Repository pattern on the Laravel backend.
    - Implementing the offline SQLite WebAssembly persistent storage adapter.
    - Designing the dynamic questionnaire schema, conditional branching logic (Block 2 reveals on Q6 = Yes), and multi-dialect translation engine.
    - Android native debugging, Gradle configuration, and edge-to-edge UI padding via Android Studio.
    - Generating automated PHPUnit feature tests.

---

## Installation & Execution Guide

### Prerequisites

- PHP 8.2+ and Composer 2+ (for backend)
- Node.js 18+ and npm (for frontend)
- **Android Studio** (with Android SDK API 33+) — **Required for compiling and building the Android APK**

### A. Direct APK Installation (Fastest)

Install [`tasat-rcef-app-debug.apk`](./tasat-rcef-app-debug.apk) directly on an Android 13+ device or emulator:

```bash
adb install tasat-rcef-app-debug.apk
```

### B. Web Development Mode

```powershell
composer install
php -r "file_exists('database/database.sqlite') || touch('database/database.sqlite');"
php artisan migrate --seed
npm install
node node_modules/vite/bin/vite.js build
php artisan test
php artisan serve
```

Open `http://localhost:8000` in your browser.

### C. Recompiling the Android APK from Source

_(Requires Android Studio installed for Android SDK, build tools, and bundled Java runtime)_

```powershell
node node_modules/vite/bin/vite.js build --config vite.config.mobile.js
node node_modules/@capacitor/cli/bin/capacitor sync android
$env:JAVA_HOME="C:\Program Files\Android\Android Studio\jbr"
cd android; .\gradlew.bat assembleDebug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`.

---

## Production Data Privacy & Security

In compliance with the **Philippine Data Privacy Act of 2012 (RA 10173)**:

- **At Rest**: SQLCipher 256-bit AES encryption with keys derived via Android Keystore / Hardware Security Module (HSM).
- **In Transit**: TLS 1.3 transport security with certificate fingerprint pinning (`network_security_config.xml`).
- **Device Security**: Android `FLAG_SECURE` enabled to prevent screen capture of farmer data, with administrative remote-wipe capabilities for lost devices.

---

## Known Limitations & Future Improvements

With additional development time for RCEF M&E field deployment:

1. **Automated Cloud Sync (CRDTs)**: Background delta synchronization to automatically merge offline SQLite records into the central PhilRice database once internet is restored.
2. **RSBSA QR/Barcode Scanning**: Camera-based scanning of farmer RSBSA ID cards to auto-populate verified profiles and eliminate typos.
