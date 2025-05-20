# Mode Tracker App

Mood Tracker is a simple and elegant mobile app built with **React Native** and **Expo**. It allows users to record their daily mood, store mood history, and view today’s mood entry in a clean interface. This is ideal for self-reflection and emotional awareness.

## Features

- Record your current mood with a single tap
- View all mood logs in chronological order
- See today's mood if already recorded
- Mood data is saved locally using **AsyncStorage**

## Technologies

- **React Native**: Framework to build cross-platform mobile apps using JavaScript/TypeScript.
- **Expo**: A toolchain to simplify development and deployment of React Native apps.
- **TypeScript**: Adds static typing to JavaScript, improving code reliability.
- **AsyncStorage**: Used to persist mood logs on the user's device. (@react-native-async-storage/async-storage)
- **date-fns**: Lightweight date utility library used to check if a mood is already logged today.
- **timeago.js**: Library for converting timestamps to human-readable "time ago" format.
- **React Hooks**: For managing component state and side effects. (useState, useEffect)
- **Expo Status Bar**: Customizable status bar for a better UI experience.
- **StyleSheet**: React Native’s built-in style system used to define app layout and visuals.

## Clone the Repository

To clone the project, run the following commands:

```
git clone https://github.com/mehmetbacik/mood-tracker.git
```
```
cd mood-tracker
```

## Installation and Running

Install the necessary dependencies and start the local server:

```
npm install
```

```
npx expo start
```

---

## GitHub Page

GitHub Repository: [https://github.com/mehmetbacik/mood-tracker](https://github.com/mehmetbacik/mood-tracker).

## License

This project is open-source and available under the MIT License.

## Contributions

If you wish to contribute to the project, please open a pull request. Any contributions and feedback are welcome!
