import { AsyncStorage } from "react-native";
import { Data } from "./Data";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "MobileFlashCards:notifications";

AsyncStorage.setItem("decks", JSON.stringify(Data));

export const getDecks = async () => {
  let decks = {};
  try {
    let parsed = await AsyncStorage.getItem("decks");
    decks = JSON.parse(parsed);
  } catch (error) {
    console.log(error.message);
  }
  return decks;
};

export const getDeck = async (id) => {
  let decks = {};
  try {
    let parsed = await AsyncStorage.getItem("decks");
    decks = Object.values(JSON.parse(parsed)).filter(
      (card) => card.title === id
    )[0];
  } catch (error) {
    alert(error);
  }
  return decks;
};

export const saveDeckTitle = async (title) => {
  return AsyncStorage.getItem("decks").then((decks) => {
    let parsed = JSON.parse(decks);
    let newCard = {
      ...parsed,
      ...{ [title]: { title: title, questions: [] } },
    };
    AsyncStorage.setItem("decks", JSON.stringify(newCard));
  });
};

export const addCardToDeck = async ({ title, card }) => {
  return AsyncStorage.getItem("decks").then((decks) => {
    let parsed = JSON.parse(decks);
    let findDeck = Object.values(parsed).filter(
      (card) => card.title === title
    )[0];
    findDeck.questions.push(card);
    AsyncStorage.setItem("decks", JSON.stringify(parsed));
  });
};

export const deleteDeck = async ({ title }) => {
  return AsyncStorage.getItem("decks").then((decks) => {
    let parsed = JSON.parse(decks);
    delete parsed[title];
    AsyncStorage.setItem("decks", JSON.stringify(parsed));
  });
};

export function getDailyReminderValue() {
  return {
    today: "👋 Don't forget to complete atlease one quiz today!",
  };
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: "Start Quiz!",
    body: "👋 don't forget to complete atlease one quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day",
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
