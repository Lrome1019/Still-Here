# Still-Here
Smart check-ins and caregiver alerts for people at risk of seizures or falls at home, powered by Ring cameras, sensors, and Alexa.
# Still Here 

**Seizure, fall, and inactivity awareness for independent living, built on Ring + Alexa.**

Team **Still Here** · Ring App Challenge 2026–2027

---

## About

People living with epilepsy, older adults, and anyone at risk of a sudden emergency at home share the same fear: *what if something happens and no one knows?* Today, many families cope by checking a camera feed over and over. That's exhausting for caregivers and invasive for the person being watched.

**Still Here** replaces that constant checking with smart, respectful alerts. Using Ring cameras, Ring sensors, and Alexa, the app notices when something may be wrong, checks in with the user, and lets caregivers know only when it matters.

> **Disclaimer:** Still Here is a safety-awareness tool, **not a medical device**. It does not diagnose seizures or replace medical care, and it never calls 911 without a person confirming.

---

## Core Features (MVP)

| Feature | What it does |
|---|---|
| **Event detection** | Uses Ring motion/camera events to flag possible seizures, falls, or unusual inactivity, and times how long an event lasts |
| **"Are you okay?" check-ins** | Alexa and the phone ask the user to confirm they're okay. Saying "I'm okay" cancels the alert. |
| **Escalation** | No response → notify emergency contacts → offer to call EMS after a time limit the user sets |
| **Bathroom safety timer** | A Ring contact/motion sensor (**never a camera**) starts a check-in if the user hasn't come out within their usual window |
| **EMS info display** | Event duration, current meds, rescue meds taken, allergies, and history, ready for responders |
| **Event log** | A history of events the user can share with their doctor |

**Stretch goals:** pose-based detection (e.g., MediaPipe), medication reminders, a caregiver dashboard with trends.

---

##  Challenge Focus

We're targeting the two **judge-scored** categories:
- **Most Impactful Aging App:** safety, independence, ease of use, caregiver value, Ring + Alexa integration
- **Most Inventive App:** originality, quality/UX, creative use of Ring + Amazon tech, real-world usefulness

---

##  Timeline

| Phase | Dates | Goal |
|---|---|---|
| Proposal | Submitted ✅ | — |
| **Sprint 0: Setup & Learning** | Now → Dec 14, 2026 | Team, tools, design mockups, learn REST + AWS + Ring docs |
| Finalists announced | Dec 14, 2026 | 🤞 |
| **Sprint 1: Foundations** | Dec 15 → Dec 28 | Ring sandbox connected, backend skeleton, app shell (holiday-light sprint) |
| **Sprint 2: Core Flow** | Dec 29 → Jan 11 | Detection event → check-in → alert contacts, working end to end |
| **Sprint 3: Features** | Jan 12 → Jan 25 | Bathroom timer, EMS display, event log, Alexa voice |
| **Sprint 4: Polish & Security** | Jan 26 → Feb 8 | UX polish, privacy/security review, real-device testing |
| **Certification** | Feb 9 → Feb 15 | Submit to Ring Appstore certification (recommended date: Feb 15) |
| Fixes & Go Live | Feb 16 → **Mar 1, 2027** | Pass certification and go live on the Ring Appstore (hard deadline) |
| Adoption & Demo Prep | Mar → May 1, 2027 | Real users, feedback, demo video |
| Demo Day | Early June 2027 | Ring HQ, Hawthorne, CA |

---

## Team & Roles

| Member | Role | Owns |
|---|---|---|
| Laura Romero | **Team Lead · Hardware & Backend** | Ring device setup, Ring API integration, AWS backend, detection logic, alerts |
| _[Teammate]_ | **Mobile Lead** | User + caregiver app, check-in screens, EMS display, event log UI |
| _[Teammate]_ | **Security, Design & QA** | Privacy/security design, UI mockups, Alexa voice scripts, testing, demo video support |

Everyone reviews pull requests, joins the weekly meeting, and helps test.

---

##  Tech Stack (proposed, to be confirmed once we have Ring developer docs)

- **Ring:** Ring REST APIs, Ring sandbox (synthetic devices), Ring camera + sensor from the Challenge Kit
- **Backend:** AWS (Lambda, API Gateway, DynamoDB, SNS for notifications). Language TBD (Python or Node.js).
- **Mobile:** TBD by the Mobile Lead (React Native or Flutter likely)
- **Voice:** Alexa Skills Kit
- **Tools:** GitHub (code + GitHub Projects board), Discord (communication), Figma (design)

---

## 📁 Repo Structure (planned)

```
still-here/
├── README.md
├── AGENTS.md            # Shared context for any AI coding assistant
├── docs/
│   ├── ARCHITECTURE.md  # ✅ System design, components, data flow, API spec
│   ├── ROLES.md
│   ├── SPRINTS.md
│   ├── SECURITY_PRIVACY.md
│   └── CONTRIBUTING.md
├── backend/
├── mobile/              # ✅ React Native (Expo) user + caregiver app
├── alexa/
└── design/
```

---

## How We Work

- **Communication:** Discord. Reply within 24 hours on weekdays.
- **Weekly meeting:** one weeknight, 30 minutes. Review the board and assign tasks.
- **Standups:** weekly post in `#standups` covering what I did, what's next, and what's blocking me.
- **Task board:** GitHub Projects. If it's not on the board, it isn't happening.
- **Branches:** `main` is always working. Branch as `feature/short-name`, open a PR, and get one review before merging.
- **Ask early:** stuck for more than an hour? Post in `#bugs-and-blockers`. No question is too small.
- **AI tools:** use whatever AI assistant you like (Claude, ChatGPT, Copilot, etc.). Read `AGENTS.md` first, and **understand any code before you commit it.**

---

##  Privacy Principles

1. No cameras in private spaces. Bathrooms use sensors only.
2. Caregivers get **alerts**, not unlimited live video.
3. Health and personal data are encrypted and never committed to this repo.
4. Testing uses **simulated** movements and synthetic data, never real medical events.

---

##  Resources

- Ring App Challenge: https://ring.com/appchallenge/
- Ring Developer Portal: https://developer.ring.com/
- Ring Appstore Program Requirements: https://developer.amazon.com/docs/ring/program-requirements.html
- Ring Content Policy: https://developer.amazon.com/docs/ring/content-policy.html
- Questions for Ring: ring-app-challenge@amazon.com

---

*We're students building something that could genuinely help people. Show up, communicate, and let's make it count.* 
