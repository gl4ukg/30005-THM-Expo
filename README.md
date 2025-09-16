# THM – TESS Hose Management

[[_TOC_]]

## Overview

This repo contains the source code for the THM cross-platform mobile application, written in [React Native](https://reactnative.dev/) and using [Expo](https://expo.dev) ([`create-expo-app`](https://docs.expo.dev/more/create-expo/)).

## Notable branches

☝ During initial development the `main` branch serves as the `stag` branch.

| Branch | Description |
| :-- | :-- |
| `main` | For production builds. Maps to the EAS `production` environment. Only updated through PRs from `stag`. |
| `stag` | For preview builds. Maps to the EAS `preview` environment. Only updated through PRs from `dev`. |
| `dev` | For development builds. Maps to the EAS `development` environment. Only updated through PRs from separate branches. |

All development should be performed in separate branches, using PRs for mergin with `dev`.

## Prerequisites

- Node >=20.19.2
- Yarn 1.22.22
- [Expo CLI](https://docs.expo.dev/more/expo-cli/)
- Expo Application Services (EAS) account
- [EAS CLI](https://www.npmjs.com/package/eas-cli)
- _(Optional)_ Xcode with iOS Simulator (macOS)
- _(Optional)_ Android Studio with SDK and emulator

## Getting started

1. __Verify Node.js version__

   ```bash
   node -v
   ```
   ☝ We recommend using `nvm` for managing multiple Node versions on the same OS.
   
1. __Verify Yarn version__
   
   ```bash
   yarn -v
   ```

1. __Verify Expo CLI version__
   
   ```bash
   expo --version
   ```

1. __Verify EAS CLI version__
   
   ```bash
   eas --version
   ```

1. __Clone this repo__ 

   Clone this repo using your Git client of choice, e.g.:

   ```bash
   git clone https://tess-no@dev.azure.com/tess-no/30005%20-%20THM/_git/30005%20-%20THM
   ```

1. __Install dependencies__
    
	```bash
    yarn install
    ```

1. ___(Optional)_ Configure dev environment.__

   This project uses Expo Application Services (EAS) as part of its CI/CD workflow. In cases where a [local build](https://docs.expo.dev/develop/development-builds/introduction/) is preferred during development, see the [Expo docs](https://docs.expo.dev/get-started/set-up-your-environment/) for information on how to configure your environment for use with the [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/) and/or the [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/).

1. __Log in with EAS__

   ```bash
   eas login
   ```
1. __Lauch Expo DevTools__

   ```bash
   yarn start
   ```

## Project structure

See the [Project structure](https://dev.azure.com/tess-no/30005%20-%20THM/_wiki/wikis/30005---THM.wiki/528/Project-structure) section on the project's DevOps wiki for details about how the codebase is structured.

## Environment variables

Environment variables are stored in EAS. These can be pulled for use with local development, e.g.:

```bash
eas env:pull --environment development
```

:warning: Always make sure .env files are not commited.

## Testing

Unit and component tests can be performed using Jest and React Native Testing Library.

## Code quality

- TypeScript only.
- Prettier for formatting (see [.prettierrc.js](./.prettierrc.js) for project specific rules).

## CI/CD

This project uses Azure Pipelines and EAS for CI/CD. See the [Application Lifecycle Management](https://dev.azure.com/tess-no/30005%20-%20THM/_wiki/wikis/30005---THM.wiki/517/Application-Lifecycle-Management-(ALM)) section on the project's DevOps wiki for details about the CI/CD setup.

## Manually building with EAS

If bypassing the CI/CD pipeline and triggering an EAS build manually is necessary, use the EAS CLI like so:

```bash
# internal development client
eas build -p ios --profile development
eas build -p android --profile development

# preview for QA
eas build -p ios --profile preview
eas build -p android --profile preview

eas build -p ios --profile production
eas build -p android --profile production
```
Credentials are handled by EAS. You can also provide your own.

## License

_All code belongs to TESS. No license specified._

## Troubleshooting

- Run `npx expo-doctor`.
- iOS build stuck: open Xcode, clean build folder, reset simulators.
- Android build fails on SDK: open Android Studio, install missing platforms and build tools.

## Additional resources

- [Expo documentation](https://docs.expo.dev/)  
  Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/)  
  Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
