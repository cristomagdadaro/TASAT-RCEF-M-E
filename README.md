# TASAT-RCEF M&E: Farmer Survey Field Application

Offline Android application wrapped with Capacitor, powered by a Domain-Driven Design (DDD) Vue 3 frontend and a Repository-based Laravel 12 backend using SQLite as the sole data storage engine.

---

## 1. Project Overview & Objectives

In rural agricultural areas, field enumerators conduct interviews with rice farmers where cellular and internet connectivity are intermittent or completely unavailable. This application provides a reliable, offline-first mobile survey tool that:

- Authenticates enumerators locally without requiring a persistent internet connection.
- Implements the complete **Appendix A: Sample Field Questionnaire** with dynamic conditional branching.
- Persists all survey responses locally in **SQLite**, ensuring all submitted interviews survive application restarts, background termination, and device reboots.
- Provides a clean record list and detail viewer for inspecting saved interviews.
- Fully targets **Android 13+ (API level 33+)** wrapped through **Capacitor**.

---

## 2. Design & Aesthetics

In compliance with the project specifications:
- **Font**: **Roboto** is the single and exclusive font family used across the application.
- **Visual Style**: Clean, high-contrast, plain monochrome aesthetic.
- **Field Usability**: Free from decorative icons, complex gradients, or distracting colors. Designed specifically for high visibility under direct outdoor sunlight during field interviews.

---

## 3. Architectural Design

### A. Frontend: Domain-Driven Design (DDD)
The frontend (`resources/js/`) is organized strictly into four DDD layers:

```
resources/js/
├── domain/                               # Enterprise Business Rules & Entities
│   ├── entities/
│   │   ├── User.ts                       # Enumerator User Entity
│   │   ├── FarmerInformation.ts          # Block 1: Farmer Information (B1Q1 - B1Q6)
│   │   ├── RiceFarmingInformation.ts     # Block 2: Rice Farming Information (B2Q1 - B2Q7)
│   │   └── SurveyInterview.ts            # Aggregate Root combining Block 1 & Block 2
│   ├── value-objects/
│   │   ├── PhilippineProvinces.ts        # Province dropdown options
│   │   └── ChallengesList.ts             # Canonical rice production challenges
│   ├── rules/
│   │   └── SurveyValidationRules.ts      # Conditional logic & validation rules
│   └── contracts/
│       ├── IAuthRepository.ts            # Authentication repository interface
│       └── ISurveyRepository.ts          # Survey repository interface
│
├── application/                          # Application Business Rules / Use Cases
│   └── use-cases/
│       ├── LoginUseCase.ts               # Enumerator login execution
│       ├── LogoutUseCase.ts              # Session invalidation
│       ├── GetCurrentUserUseCase.ts      # Active session retrieval
│       ├── SaveSurveyInterviewUseCase.ts # Validate & persist interview to SQLite
│       ├── GetSurveyInterviewsUseCase.ts # Query survey list with optional search
│       └── GetSurveyInterviewByIdUseCase.ts # Fetch single interview by reference ID
│
├── infrastructure/                       # Persistence, Database, & External Services
│   ├── storage/
│   │   └── SQLiteStorageService.ts       # WebAssembly SQLite engine + persistent storage adapter
│   └── repositories/
│       ├── LocalSQLiteAuthRepository.ts  # IAuthRepository SQLite implementation
│       └── LocalSQLiteSurveyRepository.ts# ISurveyRepository SQLite implementation
│
└── presentation/                         # User Interface & Interaction Layer
    ├── components/
    │   ├── PlainHeader.vue               # Plain, high-contrast app header
    │   └── PlainButton.vue               # Simple button component
    ├── views/
    │   ├── LoginView.vue                 # Enumerator authentication view
    │   ├── InterviewListView.vue         # Saved interviews list view
    │   ├── InterviewFormView.vue         # Appendix A questionnaire form view
    │   └── InterviewDetailView.vue       # Read-only record viewer
    ├── router/
    │   └── index.ts                      # Vue router with navigation guards
    └── store/
        └── authStore.ts                  # Pinia reactive state coordination
```

### B. Backend: Repository-Based Architecture (Laravel)
The backend (`app/`) is architected with clear decoupling between HTTP transport, domain services, and data storage:

- **Contracts**:
  - `App\Repositories\Contracts\UserRepositoryInterface`
  - `App\Repositories\Contracts\SurveyInterviewRepositoryInterface`
- **Eloquent SQLite Implementations**:
  - `App\Repositories\Eloquent\UserRepository`
  - `App\Repositories\Eloquent\SurveyInterviewRepository`
- **Service Layer**:
  - `App\Services\AuthService`
  - `App\Services\SurveyInterviewService`
- **Validation**:
  - `App\Http\Requests\LoginRequest`
  - `App\Http\Requests\StoreSurveyInterviewRequest` (validates all Appendix A rules)
- **Controllers**:
  - `App\Http\Controllers\Api\AuthController`
  - `App\Http\Controllers\Api\SurveyInterviewController`
- **Provider**:
  - `App\Providers\RepositoryServiceProvider` binds interfaces to Eloquent SQLite implementations.

---

## 4. SQLite Data Persistence & App Restarts

1. **Storage Engine**: The application utilizes a client-side SQLite engine (`SQLiteStorageService`) that executes standard SQL transactions (`CREATE TABLE`, `INSERT`, `SELECT`, `UPDATE`).
2. **Surviving App Restarts**: On every insert/update transaction, the binary SQLite database snapshot is exported and committed to persistent native storage via `@capacitor/preferences`. When the app is closed, terminated by the Android OS, or restarted, the SQLite engine restores the exact database state automatically.
3. **Backend Database**: When running in Laravel web mode, the application connects to `database/database.sqlite`.

---

## 5. Questionnaire Implementation (Appendix A)

### Block 1: Farmer Information
- **B1Q1**: Farmer's Full Name (Text, Required)
- **B1Q2**: Sex (Single choice: Male, Female, Required)
- **B1Q3**: Age (Numeric whole number, Required)
- **B1Q4**: Province (Dropdown of Philippine provinces, Required)
- **B1Q5**: Municipality/City (Text, Required)
- **B1Q6**: Is the farmer currently engaged in rice farming? (Single choice: Yes, No, Required)

### Block 2: Rice Farming Information
- **Display Condition**: Automatically displayed **only if B1Q6 = Yes**.
- **B2Q1**: Total rice farm area in hectares (Decimal number, Required)
- **B2Q2**: Primary rice ecosystem (Single choice: Irrigated, Rainfed Lowland, Upland, Required)
- **B2Q3**: Rice establishment method (Single choice: Direct Seeding, Transplanting, Required)
- **B2Q4**: Does the farmer use certified rice seeds? (Single choice: Yes, No, Required)
- **B2Q5**: If yes, what seed variety does the farmer primarily use? (Text, **Required only if B2Q4 = Yes**)
- **B2Q6**: What are the farmer's main rice production challenges? (Multiple choice checkboxes: High fertilizer cost, Pest and disease, Lack of irrigation, Labor shortage, Low selling price, Others, Required)
- **B2Q7**: If Others is selected, please specify (Text, **Required only if B2Q6 includes Others**)

---

## 6. Pre-Seeded Accounts for Assessment Testing

The application supports two distinct enumerator accounts (pre-seeded in both local SQLite and backend SQLite):

| Account | Username | Email | Password | Role |
|---|---|---|---|---|
| **Enumerator 1** | `enumerator1` | `enumerator1@rcef.gov.ph` | `Password123!` | Enumerator |
| **Enumerator 2** | `enumerator2` | `enumerator2@rcef.gov.ph` | `Password123!` | Enumerator |

> **Convenience Feature**: Quick-fill buttons are provided directly on the Login screen to instantly populate these credentials for testing.

---

## 7. Data Sensitivity & Production Security Architecture

> **Assessment Requirement**: *Farmer responses are personal data. Briefly explain in the README how you’d handle this in a production version.*

Farmer interview responses constitute Personal Identifiable Information (PII) and potentially sensitive socio-economic data protected under data privacy laws (such as the **Philippine Data Privacy Act of 2012 / Republic Act No. 10173** and GDPR). In a production release, the following multi-layered security measures would be implemented:

### 1. Encryption at Rest (Local SQLite Storage)
- **SQLCipher 256-bit AES Encryption**: In production, the SQLite database file on the Android device would be encrypted at the page level using SQLCipher.
- **Hardware-Backed Key Derivation**: The database encryption key is generated using PBKDF2 with 100,000+ iterations and securely stored in the **Android Keystore System** backed by a Hardware Security Module (HSM), Trusted Execution Environment (TEE), or StrongBox Keymaster. Keys never exist in plaintext in memory or on the flash filesystem.
- **Biometric or Passcode Decryption**: Access to the Keystore entry requires enumerator authentication (Android `BiometricPrompt` or device PIN).

### 2. Encryption in Transit (Server Synchronization)
- **TLS 1.3 Transport Security**: All sync communication between the mobile client and the central government server utilizes HTTPS over TLS 1.3 with modern cipher suites.
- **Certificate Pinning**: The mobile application pins the SHA-256 fingerprint of the central server's TLS certificate in network security configurations (`network_security_config.xml`), preventing Man-in-the-Middle (MITM) attacks on untrusted public Wi-Fi or cellular networks.

### 3. Application Security & Access Control
- **Short-Lived JWT Tokens & Refresh Rotation**: Offline sessions expire after a configurable duration (e.g., 7 days of inactivity). Re-authentication is required periodically to re-encrypt session tokens.
- **Role-Based Access Control (RBAC)**: Strict segregation of duties. Enumerators can only view and edit their own assigned interview records; supervisors have read-only regional audit views.
- **Remote Wipe / Kill Switch**: If an enumerator's phone or tablet is lost or stolen in the field, an administrator can trigger an encrypted push payload or sync flag that immediately overwrites and deletes the local SQLite database.

### 4. Field-Level Obfuscation & Privacy Enhancements
- **Pseudonymization**: The farmer's full name and exact coordinates are decoupled from the agronomic survey responses via an anonymized cryptographic UUID (`reference_id`).
- **Screen Privacy & Background Protection**: Enable Android `FLAG_SECURE` (`window.setFlags(WindowManager.LayoutParams.FLAG_SECURE, ...)`) to prevent screen recording, screenshots, and task-switcher previews of farmer PII.

---

## 8. Installation & Execution Guide

### Prerequisites
- PHP 8.2+
- Composer 2+
- Node.js 18+ and npm
- Android Studio (for native Android builds)

### A. Web Development Mode
1. Install backend dependencies:
   ```bash
   composer install
   ```
2. Initialize environment and migrate SQLite database:
   ```bash
   php -r "file_exists('database/database.sqlite') || touch('database/database.sqlite');"
   php artisan migrate --seed
   ```
3. Install frontend dependencies and build:
   ```bash
   npm install
   node node_modules/vite/bin/vite.js build
   ```
4. Run tests:
   ```bash
   php artisan test
   ```
5. Serve application:
   ```bash
   php artisan serve
   ```
   Open `http://localhost:8000` in your browser.

### B. Android Capacitor Build (Android 13+)
1. Build the standalone mobile assets:
   ```bash
   npm run build:mobile
   ```
2. Open in Android Studio:
   ```bash
   npm run cap:open
   ```
3. Build APK or run on connected Android 13+ device or emulator.

---

## 9. Stages of Development & Git Roadmap

This project was built following a staged methodology. You can review the stages below and push them stage by stage:

### **Stage 1: Project Foundation & Core Environment**
- Initialized latest Laravel application with SQLite as primary connection.
- Configured Vue 3, Pinia, Vue Router, and Tailwind CSS.
- Configured Roboto as the sole font family with high-contrast neutral styling.
- Scaffolding of Capacitor Android platform targeting Android 13+ (`targetSdkVersion 36`).
- Direct node script execution configured to prevent Windows path ampersand collisions.

### **Stage 2: Backend Repository-Based Architecture & SQLite Database**
- SQLite database schema created for `users` and `farmer_survey_interviews`.
- Seeded two distinct enumerator accounts (`enumerator1` & `enumerator2`).
- Defined Repository contracts: `UserRepositoryInterface` and `SurveyInterviewRepositoryInterface`.
- Implemented Eloquent SQLite repositories: `UserRepository` and `SurveyInterviewRepository`.
- Built `AuthService` and `SurveyInterviewService` with full business rule enforcement.
- Created `AuthController` and `SurveyInterviewController` with `StoreSurveyInterviewRequest`.
- Created and executed PHPUnit tests (`tests/Feature/SurveyInterviewApiTest.php`) passing 100%.

### **Stage 3: Frontend Domain-Driven Design (DDD) Architecture**
- Created Domain layer:
  - Entities: `User`, `FarmerInformation`, `RiceFarmingInformation`, and aggregate root `SurveyInterview`.
  - Value Objects: `PhilippineProvinces`, `ChallengesList`.
  - Rules: `SurveyValidationRules` enforcing Appendix A requirements.
  - Contracts: `IAuthRepository`, `ISurveyRepository`.
- Created Application layer:
  - Use Cases: `LoginUseCase`, `LogoutUseCase`, `GetCurrentUserUseCase`, `SaveSurveyInterviewUseCase`, `GetSurveyInterviewsUseCase`, `GetSurveyInterviewByIdUseCase`.
- Created Infrastructure layer:
  - `SQLiteStorageService` using WebAssembly SQLite with binary persistence surviving app restarts.
  - `LocalSQLiteAuthRepository` and `LocalSQLiteSurveyRepository`.

### **Stage 4: Presentation Layer (Appendix A Questionnaire & Records List)**
- Developed plain, minimal UI adhering to Roboto font and high-contrast guidelines.
- `LoginView.vue`: Authentication with two distinct accounts and quick-fill test buttons.
- `InterviewFormView.vue`: Full Appendix A form with dynamic display of Block 2 (if B1Q6 = Yes), conditional variety (if B2Q4 = Yes), and conditional other challenge (if B2Q6 includes Others).
- `InterviewListView.vue`: Saved interview records list loaded from SQLite with real-time search.
- `InterviewDetailView.vue`: Read-only review of completed survey responses.
- `authStore.ts` and `router/index.ts` with route guards.

### **Stage 5: Mobile Packaging, Verification & Comprehensive Documentation**
- Verified standalone mobile build (`dist/`) and synchronized with Capacitor Android.
- Verified Android 13+ compatibility.
- Comprehensive `README.md` including Data Sensitivity & Production Security architecture.
