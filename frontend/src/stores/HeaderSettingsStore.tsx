import { ReactElement } from "react";
import { Watcher } from "wal.js";
import { useWatcherState } from "react-state-extended";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const DEAFULT_SETTINGS: HeaderSettings = {
  showProfile: true,
  centralElement: null,
  showLogo: true,
  navToggleElement: <FontAwesomeIcon icon={faBars} className="w-6 h-6" />,
};

export const settingsWatcher = new Watcher({ ...DEAFULT_SETTINGS });

interface HeaderSettings {
  showProfile: boolean;
  centralElement: ReactElement | null;
  showLogo: boolean;
  navToggleElement: ReactElement;
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

export function resetHeader() {
  settingsWatcher.value = { ...DEAFULT_SETTINGS };
}

export function setNavToggleElement(element: ReactElement) {
  settingsWatcher.value.navToggleElement = element;
  settingsWatcher.triggerListeners();
}

export function useHeaderHook() {
  return useWatcherState<HeaderSettings>(settingsWatcher)[0];
}
