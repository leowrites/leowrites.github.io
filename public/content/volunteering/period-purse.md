### Overview

[Menstruation Nation](https://github.com/uoftblueprint/the-period-purse-android) is a free Android period tracker designed for Canadian youth, built in partnership with [The Period Purse](https://theperiodpurse.com/ "A non-profit organization aiming to achieve menstrual equity") — a non-profit working toward menstrual equity through education and advocacy. The app lets users track their period cycle and symptoms (flow, mood, sleep, cramps, exercise), view statistics, and access educational content — all without registration.

I contributed as a Project Lead managing the 2022-2023 team, launching our first version on the Play Store in June 2023. I led the project initial project scoping and architecture design to feature development, code reviews, and release management. I also implemented key features like the period prediction algorithm and led a major architectural refactor to improve code maintainability as the codebase grew.

![Menstruation Nation app screenshots](/content/volunteering/tpp.png#responsive)

### Period Prediction

One of the more technically interesting features I built was the [period prediction algorithm](https://github.com/uoftblueprint/the-period-purse-android/pull/181) that forecasts upcoming cycles directly in the calendar view. Given a user's logged period history, the algorithm computes the average cycle length, deduplicates overlapping date ranges, and projects future periods as highlighted predicted dates on the calendar. This gave users a forward-looking view of their cycle rather than only a historical log.

### Architecture Refactor

As the codebase grew, I led a [major architectural refactor](https://github.com/uoftblueprint/the-period-purse-android/pull/160) touching 49 files (~2,200 additions and deletions) to separate tightly coupled UI components, extract shared utilities, and eliminate duplicate logic spread across screens. This significantly reduced the cost of adding new features and was a prerequisite for the team scaling cleanly during the 2023–2024 season.

### Observability & Reliability

I integrated [Firebase Crashlytics](https://github.com/uoftblueprint/the-period-purse-android/pull/175) to give the team visibility into production crashes after launch. This was valuable for prioritizing fixes post-release and tracking regressions across app versions. Additionally, I resolved a recurring [infinite re-render bug](https://github.com/uoftblueprint/the-period-purse-android/pull/183) in the statistics screen that was causing degraded performance for users.

### Impact

The app launched on the [Google Play Store](https://play.google.com/store/apps/details?id=com.tpp.theperiodpurse&gl=CA) and reached 50+ downloads, giving Canadian youth free, private access to menstrual health tracking and education.

### Team Management

I managed a 7-person development team — running sprint planning, backlog refinement, and ticket prioritization to deliver all 8 specified use-cases and close 90+ tickets over the year.

![Issue graph](/content/volunteering/issue-graph.png#responsive)
_Graph of issues closed over the course of the project, showing a steady pace of development and feature completion leading up to our launch in June 2023_
