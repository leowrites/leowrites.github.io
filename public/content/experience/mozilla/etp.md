### The Problem

[Enhanced Tracking Protection (ETP)](https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop) is great for privacy, but 'Strict' mode often breaks websites that rely on trackers for functionality (e.g., login flows, payment gateways). Users would enable Strict mode, encounter broken sites, and confusingly disable ETP entirely, leaving them unprotected.

### Implementation

I implemented granular controls for Enhanced Tracking Protection (ETP), adding configuration options to 'Strict' and 'Custom' modes. This feature enables users to manage automatic exception levels, choosing between applying exceptions list entries for major website breakage or extending them to fix minor convenience issues, giving them precise control over the privacy-compatibility balance.

- [Tracking Protection exceptions UX for ETP-Strict users](https://bugzilla.mozilla.org/show_bug.cgi?id=1970632)
- [Add anti-tracking exceptions onboarding for existing ETP-Strict users](https://bugzilla.mozilla.org/show_bug.cgi?id=1975478)

### Result

In FX144, the feature was shipped to over 1.5 million [Firefox](https://www.mozilla.org/en-US/firefox/new/ "A free and open-source web browser developed by Mozilla") users. It successfully resolved over 1,000 reported site-breaking issues, significantly reducing support tickets. More importantly, it increased the adoption of Strict Tracking Protection by giving users the tool to manage exceptions granularly rather than disabling protection globally.

![Firefox Privacy Settings](/fx/fx_privacy.png)
