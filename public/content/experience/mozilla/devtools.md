### The Problem

[Enhanced Tracking Protection (ETP)](https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop)
is great for privacy, but 'Strict' mode often breaks websites that rely on trackers for functionality
(e.g., login flows, payment gateways). The process to debug the set of blocked trackers causing
website breakage was cumbersome and time consuming. The goal is to create a new tool that will
streamline this process and drastically improve engineers' and QAs' productivity.

### Implementation

- [Adding a new panel for AntiTracking debugger behind a pref](https://bugzilla.mozilla.org/show_bug.cgi?id=1972771)

### Result

The new devtool panel cleanly displays all of the blocked requests while displaying the reason for
blocking. Engineers can easily unblock one or more requests, or even use a built-in debugger to programtically
narrow down which set of blocked requests are causing the site to break.
![Devtools Panel](/fx/devtool.png#responsive)

> **💡 Want to try it out yourself?**
>
> In Firefox, open `about:config`, search for `devtools.anti-tracking.enabled` and enable the flag. You should see the 'Anti tracking' panel in devtools.
