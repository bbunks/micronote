import { ReactElement } from "react";
import { Watcher } from "wal.js";
import { useWatcherState } from "react-state-extended";

const DEAFULT_SETTINGS: HeaderSettings = {
  showProfile: false,
  centralElement: null,
  showLogo: true,
};

export const settingsWatcher = new Watcher({ ...DEAFULT_SETTINGS });

interface HeaderSettings {
  showProfile: boolean;
  centralElement: ReactElement | null;
  showLogo: boolean;
}

export function setCentralElement(element: ReactElement | null) {
  settingsWatcher.value.centralElement = element;
  settingsWatcher.triggerListeners();
}

export function showProfile(show: boolean) {
  settingsWatcher.value.showProfile = show;
  settingsWatcher.triggerListeners();
}

export function showLogo(show: boolean) {
  settingsWatcher.value.showLogo = show;
  settingsWatcher.triggerListeners();
}

export function useHeaderHook() {
  return useWatcherState<HeaderSettings>(settingsWatcher)[0];
}
