# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Change

### Removed


## [5.0.1] - 2020-02-12

### Added
- **Appreciation Cards List**: Adds "Send New Card" button, fixes issue with "Team" table ([UC2-635](https://build.umusic.com/jira/browse/UC2-635)) [MINOR]
- **Departments / Events**: Added skeletons and isEmpty component ([UC2-733](https://build.umusic.com/jira/browse/UC2-733)) [MINOR]
- **Articles**: Added skeletons and isEmpty component ([UC2-852](https://build.umusic.com/jira/browse/UC2-852)) [MINOR]
- **Events**: Fixed events duplication ([UC2-868](https://build.umusic.com/jira/browse/UC2-868)) [MINOR]

## [5.0.1] - 2020-02-05

## [5.0.0] - 2020-02-04

## [4.1.1] - 2020-01-27

## Added
- **Send Appreciation Card**: Refines autosuggest query, adds back text box limit, adds email in autosuggest option ([UC2-560](https://build.umusic.com/jira/browse/UC2-560)) [MAJOR]
- **Notifications**: Notifications Filter does not work after Archiving a Notification([UC2-781](https://build.umusic.com/jira/browse/UC2-781)) [MINOR] 
- **Notifications**: Cannot read property 'drupal_id' of null error ([UC2-844](https://build.umusic.com/jira/browse/UC2-844)) [MINOR] 


## [4.1.1] - 2020-01-27

### Added
- **Appreciation Cards List**: Adds scene for appreciation cards ([UC2-635](https://build.umusic.com/jira/browse/UC2-635)) [MINOR]
- **Send Appreciation Card**: Adds form to send an appreciation card ([UC2-560](https://build.umusic.com/jira/browse/UC2-560)) [MINOR]
- **Events**: Added end date for events ([UC2-585](https://build.umusic.com/jira/browse/UC2-585)) [MINOR]
- **Appreciation card preview and notifications** [UC2-633](https://build.umusic.com/jira/browse/UC2-633) [MAJOR] Added alert for new appreciation card received for a regular user and supervisor.
- **Departments** Added new Facilities department to its proper config file.
- **Templates** Added Island Records Mini-site, based on new TemplateF [UC2-689](https://build.umusic.com/jira/browse/UC2-689) [MINOR]
- **GoogleAnalytics:** SiteCode added and stored in session Storage. ([UC2-704](https://build.umusic.com/jira/browse/UC2-704))
- **Landing page** Added skeletons for landing page components [UC2-403](https://build.umusic.com/jira/browse/UC2-403) [MINOR]
- **Links** Increase Image Links from 3 to 4 per row [UC2-746](https://build.umusic.com/jira/browse/UC2-746) [MINOR]
- **Create label page**: Personalized Experience for Label Employees ([UC2-736](https://build.umusic.com/jira/browse/UC2-736)) [MINOR]

- **Search Results page** Added skeletons for search results page components [UC2-730](https://build.umusic.com/jira/browse/UC2-730) [MINOR]
- **Appreciation Cards** archiving cards is now possible from home page and also the scenes where the table where the notifications are present [UC2-633](https://build.umusic.com/jira/browse/UC2-633) [MINOR]
- **Systems and Applications Page**: Adds new page for system and applications ([UC2-592](https://build.umusic.com/jira/browse/UC2-592)) [MAJOR]

### Changed
- **News card list** Apply different Styling on News Headline in Department pages t [UC2-794](https://build.umusic.com/jira/browse/UC2-794) [MINOR]
- **Articles/Events**: Fixes issue where sometimes you would get an articles/event blank page ([UC2-665](https://build.umusic.com/jira/browse/UC2-665)) [MINOR]
- **Manifest**: Updated manifest.json with more icon resolutions ([UC2-768](https://build.umusic.com/jira/browse/UC2-768)) [MINOR]
- **User edit**: Update profile edit url structure from userEdit to profile/edit ([UC2-755](https://build.umusic.com/jira/browse/UC2-755)) [MINOR]
- **Department/Pages**: Change resources links layout ([UC2-725](https://build.umusic.com/jira/browse/UC2-725)) [MINOR]

### Removed
- **User Profile Edit**: Removed hide on profile checkbox from get to know me and contact me edit page ([UC2-722](https://build.umusic.com/jira/browse/UC2-722)) [MINOR]

## [4.1.0] - 2020-01-09

_NOTE:_ There were a lot of changes in this release that have not been described below because developers forgot to update CHANGELOG.

### Added
- **Events**: Added end date for events ([UC2-585](https://build.umusic.com/jira/browse/UC2-585)) [MINOR]
- **Skeleton view for people search card**:POC Skeleton for people search card in search results -[UC2-402]  (https://build.umusic.com/jira/browse/UC2-402) [MAJOR]

### Changed
- **Departments**: Fixes bug where clicking an articles "read more" link wouldn't work for the departments scene
- **Drupal Ids**: Updated drupal ids for departments

## [4.0.1] - 2019-12-10

### Added
- **Tech**: New generic loadContent actions and reducers that can be used anywhere!
- **My Contacts**: Added My contacts section in user profile with remove contact and load more features. ([UC2-430](https://build.umusic.com/jira/browse/UC2-430)) [MINOR]

### Changed
- Various bugfixes.


## [4.0.0] - 2019-12-04

### Added

- **Add to Contact** [UC2-510] Create "Add to My Contacts" button for People Search results and Profile page
- **Update user Profile** Update user profile option included. ([UC2-388](https://build.umusic.com/jira/browse/UC2-388)) 
- **My Toolkit**: added front-end piece for Bookmarks and To Do Items ([UC2-431](https://build.umusic.com/jira/browse/UC2-431)) [MINOR]

### Changed

- **Massive Refactor**: Look at https://github.com/umg/umgc_delivery/pull/347 for more info. `[MAJOR]`
- **People on office**: There was a chache issue which was preventing the user to see new users when a new office was reached. [UC2-596](https://build.umusic.com/jira/browse/UC2-596) [MINOR]

## [3.0.0] - 2019-12-04

### Added

- **Search** Included additional search option Catalog and some tewak changes in search. ([UC2-493](https://build.umusic.com/jira/browse/UC2-493))
- **Search** Included additional search options Links, Documents, Departments, Offices, Pages, Knowledge Base. ([UC2-470](https://build.umusic.com/jira/browse/UC2-470))
- **Error:** Added Error Route [UC2-535](https://build.umusic.com/jira/browse/UC2-535) [MINOR]
- **Office:** Added office scene [UC2-372](https://build.umusic.com/jira/browse/UC2-372) [MAJOR]
- **MSAL Integration** integrated Oauth2 MSAL node module. ([UC2-520](https://build.umusic.com/jira/browse/UC2-520)) [MAJOR]
- **GoogleAnalytics:** Implement Google Analytics. ([UC2-132](https://build.umusic.com/jira/browse/UC2-132))
- **People:** Added people section to office scene [UC2-487](https://build.umusic.com/jira/browse/UC2-487) [MINOR]
- **People:** Added infinite scroll to people section on Office scene [UC2-487](https://build.umusic.com/jira/browse/UC2-487) [MINOR]
- **Coming Soon Splash Page** Added coming soon splash page for "Systems & Applications", "Brands & Labels" or "Artists". ([UC2-496](https://build.umusic.com/jira/browse/UC2-496))[MAJOR]
- **Office Directory page:** Added Office Directory page [UC2-371](https://build.umusic.com/jira/browse/UC2-371) [MINOR]
- **Profile:** Added Error Route [UC2-440](Delivery - Display user photos from ServiceNow) [MAJOR]

### Changed

- **JWT Token refresh Automatically** Token not refresh automatically after the expired time. ([UC2-390](https://build.umusic.com/jira/browse/UC2-390))
- **Oauth Security on SPA and Web API** Specify api scope and implemented two app registration ([UC2-296](https://build.umusic.com/jira/browse/UC2-296))
- **Profile:** Added Profile picture for Offices & people component [UC2-440](Delivery - Display user photos from ServiceNow) [MAJOR]

## [2.0.0] - 2019-11-22

### Fixed

- **Bug** Fixed Edit button visibility issue in user profile for all user. Edit button should be visible for current user only. ([UC2-532](https://build.umusic.com/jira/browse/UC2-532))

### Added

- **Events** Add to Calendar link has been added. ([UC2-65](https://build.umusic.com/jira/browse/UC2-65))
- **logging** Setting up application and access logs [UC2-295](https://build.umusic.com/jira/browse/UC2-295)
- **Page Content Type** added frontend component to show page content type ([UC2-385](https://build.umusic.com/jira/browse/UC2-385))
- **platform:** Added Healthcheck endpoints [UC2-406](https://build.umusic.com/jira/browse/UC2-406)
- **security:** Added Helmet module for security [UC2-408](https://build.umusic.com/jira/browse/UC2-408)
- **Tech** As part of every API call to our endpoints, now we pass a JWT in the request header
- **Tech:** Added Gzip Compression in expressjs [UC2-407](https://build.umusic.com/jira/browse/UC2-407)
- **tech:** Pass request url to newrelic for better monitoring [UC2-301](https://build.umusic.com/jira/browse/UC2-302)
- **User Profile:** Added Organisation Chart Card [UC2-396](https://build.umusic.com/jira/browse/UC2-396)
- **User Profile:** Added three new cards, namely People Card, Contact Me Card, Get to Know Me Card [UC2-387](https://build.umusic.com/jira/browse/UC2-387)
- Add to Calendar link has been added, when user clicks on it, .ics file will be downloaded for that event.
- Added Quick Tools to home page. Added three cards something's broken, self service password reset and time off request. [UC2-188](https://build.umusic.com/jira/browse/UC2-188)
- Article categories now showing on articles card [UC2-275](https://build.umusic.com/jira/browse/UC2-275)
- Departments Directory page [UC2-238](https://build.umusic.com/jira/browse/UC2-238)
- EmployeeService Page [UC2-377](https://build.umusic.com/jira/browse/UC2-377)
- Fetch only the article needed when loading the page directly from the article ID or when the user clicks on an article to read its details [UC2-165](https://build.umusic.com/jira/browse/UC2-165)
- Filter function on the Events and the News & Articles page including Deep Linking, so that it is possible to have a URL to a filtered version of the page (e. g. for sharing) [UC2-58](https://build.umusic.com/jira/browse/UC2-58)
- Filtering events functionality
- Front-end build of Notifications page w/ new UI elements for manually entered alerts [UC2-114](https://build.umusic.com/jira/browse/UC2-114)
- Minisite sample template 1 and its components [UC2-228](https://build.umusic.com/jira/browse/UC2-228)
- Name of logged-in user is showing at anytime in the menu bar, except for Mobile view [UC2-154](https://build.umusic.com/jira/browse/UC2-154)
- PWA now working
- Search option and search result page added. [UC2-250](https://build.umusic.com/jira/browse/UC2-250) - [UC2-251](https://build.umusic.com/jira/browse/UC2-251)
- Search results page [UC2-251](https://build.umusic.com/jira/browse/UC2-251)

### Changed

- **Tech** Changed `authorization` to `Authorization` and changed the way to add the custom header, now using axios header `common`.
- **Tech** Multistage build dockerfile with test and build and production container
- Added error types in user profile reducer to fetch error and wrote action methods for it
- API calls have been commented out at container level for easier integration.
- Created "User Profile Edit" page with respective UI Library components.
- Created appConfig hook as a util to get config variables with type check.
- Created imageUrlHandler as a util to sanitize image URLs to support multiple source types.
- Created individual functional components for Article, Event & People cards which existed as elements in searchResults component previously.
- Created route `/userEdit` for this page.
- Displayed static error page in user profile in case data there is an error
- ENV specific webpack config [UC2-171](https://build.umusic.com/jira/browse/UC2-171)
- Events sorted by date now works properly [UC2-252](https://build.umusic.com/jira/browse/UC2-252)
- Fix for issue where even when event category was sent in request response wasn't being filtered [UC2-354](https://build.umusic.com/jira/browse/UC2-354)
- Fixed error for no user content being fetched for user profile.
- Fixed issue with events not loading after changing category
- Fixed issue that wasn't allowing icons to show properly on iOS
- Fixed ui issues for user profile page. Added redirection for /profile?upn=example@umusic.com using query params in organisation chart component. Updated ui library version.
- Fixed unusable hook which couldn't be called within methods of a functional component earlier. Now, filter hooks have specific return type.
- Improves handling of refresh and being able to display artices according to url query
- Menu now uses what it's in our Bootstrap repo [UC2-169](https://build.umusic.com/jira/browse/UC2-169)
- Modifications Ui Styles [UC2-423](https://build.umusic.com/jira/browse/UC2-423)
- Now `Events` in its detail scene loads real data from the API [UC2-56](https://build.umusic.com/jira/browse/UC2-56)
- Now Azure doesn't reply with a wildcard and it is redirecting the user properly to the requested page [UC2-242](https://build.umusic.com/jira/browse/UC2-242)
- Now the events in the lading page loads real data trough our API [UC2-61](https://build.umusic.com/jira/browse/UC2-61)
- PWA Icons
- Renamed route and query format for search page from "/search-results/:query" to "/search?q=xyz".
- Typed-in search query will be highlighted as bold characters in every item of auto suggestion's drop down list. We tested it in local and dependency in web service is yet to be live.
- Update "My Links" section on Landing Page to display user-specific links [UC2-185](https://build.umusic.com/jira/browse/UC2-185)

### Removed

- Removed error component and repeated shallow render helper
- Removed JWT decode module and used react adal userinfo
- Duplicate articles from the list of articles scene [UC2-278](https://build.umusic.com/jira/browse/UC2-278)

## [1.0.0] - 2019-09-23

### Added

- **articles:** News and articles detail page with related articles. [UC2-34](https://build.umusic.com/jira/browse/UC2-34)
- **articles:** Added News & Articles list page with infinite scroll option. [UC2-39](https://build.umusic.com/jira/browse/UC2-39)

### Changed

- **tech:** Local env variables won't be part of the codebase anymore. Only the api version number. Now those variables are part of a vault key named local.
- **tech:** massive refactor, implemented [semistandard](https://github.com/standard/semistandard). ([UC2-90](https://build.umusic.com/jira/browse/UC2-90))

## [0.6.0] - 2019-09-11

### Added

- First official release, and the beginning of our changelog. This includes everything from the first sprint of our new project structure, which was mainly focused on "links". Everything prior to this release has been in flux, with a lot of PoCs, various teams, etc. This is a new start.

### Changed

- Removed all custom styles and replaced with a pure-bootstrap implementation of the temporary wireframes.

## [0.5.0] - 2019-08-23

### Removed

- This release deletes all the React Native code for mobile apps and the lerna monorepo. From now on, this is a web app only.

## [0.4.0] - 2019-08-23

### Changed

- This is a snapshot of all the changes up to this point. This includes the lerna monorepo that contains both web and native (ios and android) clients with shared code. In the next release, the project will be web-only.

[unreleased]: https://github.com/umg/umgc_delivery/compare/5.0.1...develop
[5.0.1]: https://github.com/umg/umgc_delivery/compare/5.0.0...5.0.1
[5.0.0]: https://github.com/umg/umgc_delivery/compare/4.1.1...5.0.0
[4.1.1]: https://github.com/umg/umgc_delivery/compare/4.1.0...4.1.1
[4.1.0]: https://github.com/umg/umgc_delivery/compare/4.0.1...4.1.0
[4.0.1]: https://github.com/umg/umgc_delivery/compare/4.0.0...4.0.1
[4.0.0]: https://github.com/umg/umgc_delivery/compare/3.0.0...4.0.0
[3.0.0]: https://github.com/umg/umgc_delivery/compare/2.0.0...3.0.0
[2.0.0]: https://github.com/umg/umgc_delivery/compare/1.0.0...2.0.0
[1.0.0]: https://github.com/umg/umgc_delivery/compare/0.6.0...1.0.0
[0.6.0]: https://github.com/umg/umgc_delivery/compare/0.5.0_without_native...0.6.0
[0.5.0]: https://github.com/umg/umgc_delivery/compare/0.4.0_with_native...0.5.0_without_native
[0.4.0]: https://github.com/umg/umgc_delivery/compare/poc...0.4.0_with_native
