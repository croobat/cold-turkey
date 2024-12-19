# SmokeFree App Roadmap

## Overview

SmokeFree is a smoke-quitting app designed to support users through their
journey of quitting smoking. The app provides tools for tracking progress,
managing cravings, accessing community support, and celebrating milestones.

---

## Features

### 1. Home Screen

- [ ] **Main**:
  - [ ] Display dynamic motivational messages: [Quotes](https://github.com/JamesFT/Database-Quotes-JSON/blob/master/quotes.json)
  - [ ] Progress bar showing days smoke-free.
- [ ] **Quit Tracker**:
  - [ ] Real-time tracker for days, hours, and minutes since quitting.
- [ ] **Health Progress**:
  - [ ] Cards displaying health milestones achieved.
- [ ] **Daily Goal**:
  - [ ] Personalized daily goals like hydration or physical activity.
- [ ] **Navigation Bar**:
  - [ ] Tabs for Home, Journal, Health, Goal, Resources, and Profile.

---

### 2. Journal Section

- [ ] **Daily Log**:
  - [ ] Record cravings, mood, and triggers.
  - [ ] Add personal notes.
- [ ] **Mood Tracker**:
  - [ ] Interactive chart for tracking mood throughout the day.
- [ ] **Reflection**:
  - [ ] Weekly summaries of logged data.

---

### 4. Resources Section

- [ ] **Guided Programs**:
  - [ ] Step-by-step quitting guides.
  - [ ] Behavioral strategies and mindfulness exercises.
- [ ] **Educational Articles**:
  - [ ] Information on smoking effects and quitting benefits.
- [ ] **Emergency Help**:
  - [ ] "Craving SOS" section with quick distractions (e.g., breathing
        exercises, mini-games).
- [ ] **Medication Tracker**:
  - [ ] Track nicotine patches, gum, or other aids.
- [ ] **Emergency Contacts**
  - [ ] Add emergency contacts for support.

---

### 5. Profile Section

- [ ] **User Stats**:
  - [ ] Number of cigarettes avoided.
  - [ ] Money saved (customizable for local currency).
  - [ ] Time regained (based on health recovery milestones).
- [ ] **Motivation**:
  - [ ] Personalized reasons for quitting (text, images, or videos).
- [ ] **Achievements**:
  - [ ] Badges for milestones (e.g., "1 Day Smoke-Free", "1 Month Smoke-Free").
- [ ] **Settings**:
  - [ ] Notification preferences, goal customization, and profile info.

---

## Other Features

- [ ] **Push Notifications**:
  - [ ] Daily motivational quotes.
  - [ ] Reminders to log progress or check goals.
- [ ] **Widgets**:
  - [ ] Quick access to quit tracker or craving tools.
- [ ] **Gamification**:
  - [ ] Points system for completing goals and milestones.

---

## Development Phases

### Phase 0: Design and Setup

- [ ] **Tasks**:
  - [ ] Finalize app features and design guidelines.
  - [ ] Set up development environment and version control.
  - [ ] Create project structure and initial files.
  - [ ] Install necessary dependencies.
- [ ] **Timeline**: 1 week.

### Phase 1: MVP (Minimum Viable Product)

- [ ] **Features**:
  - [ ] Home screen with Quit Tracker and Health Progress.
  - [ ] Journal section with Daily Log and Mood Tracker.
  - [ ] Push notifications for motivational messages.
- [ ] **Timeline**: 4-6 weeks.

### Phase 2: Extras

- [ ] **Features**:
  - [ ] Profile section with User Stats and Achievements.
  - [ ] Resources section with Guided Programs and Educational Articles.
  - [ ] Emergency Help section with Craving SOS and Emergency Contacts.
- [ ] **Timeline**: 6-8 weeks.

### Phase 3: Advanced Tracking and Gamification

- [ ] **Features**:
  - [ ] Medication Tracker.
  - [ ] Achievements.
  - [ ] Widgets for quick access.
- [ ] **Timeline**: 8-10 weeks.

### Phase 4: Polish and Launch

- [ ] **Tasks**:
  - [ ] Refine UI/UX.
  - [ ] Implement localization and accessibility features.
  - [ ] Test and debug.
- [ ] **Timeline**: 4 weeks.

---

## Design Guidelines

- [ ] **Color Palette**:
  - [ ] Soothing tones. ![Color Palette](https://coolors.co/4db6ac-a8dadc-ff8a80)
    - Primary Color: Teal: #4DB6AC
    - Secondary Color: Pastel Blue: #A8DADC
    - Accent Color: Light Coral: #FF8A80
- [ ] **Typography**:
  - [ ] Clean and simple fonts for readability.
    - Primary Font: `Roboto` | `Inter`
- [ ] **Icons**:
  - [ ] Minimalist, easily recognizable designs.
    - Icon Library: `Feather Icons` | `Material Icons`

---

## Post-Launch Plan

- [ ] Setup donations (e.g., `Buy Me a Coffee`, via Stripe).
- [ ] Collect user feedback to improve features.
- [ ] Roll out additional languages and regions.
- [ ] Add premium features (e.g., personalized coaching, advanced analytics).
- [ ] Backup functionality for user data.

---

## Tools and Technologies

- [ ] **Frontend**: React Native (Expo)
- [ ] **Backend**: Fully offline (initially)
- [ ] **Database**: Local storage (AsyncStorage)
- [ ] **State Management**: Redux Toolkit (persisted state)
- [ ] **UI Framework**: React Native Paper
- [ ] **Internationalization**: i18next
- [ ] **Testing**: Jest, Detox

---

## Key Milestones

- [ ] **Week 4**: MVP complete.
- [ ] **Week 10**: Community and Resources sections complete.
- [ ] **Week 18**: Advanced tracking and gamification.
- [ ] **Week 22**: App launch.

---
