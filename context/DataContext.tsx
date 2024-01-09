import { loadFiles, subscribeFiles } from "@/services/files";
import { loadScreens, subscribeScreens } from "@/services/screens";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Screen, File } from "@/types";
import {
  useState,
  useEffect,
  ReactNode,
  useContext,
  createContext,
} from "react";

import ModalConflict from "@/components/Modal/Conflict";

interface DataContextType {
  filesLoading: boolean;
  filesAvailable: File[];

  screensLoading: boolean;
  screensSelected: Screen[];
  screensAvailable: Screen[];

  setScreensSelected: (screens: Screen[]) => void;
}

const DataContext = createContext<DataContextType>({
  filesLoading: false,
  filesAvailable: [],

  screensLoading: false,
  screensSelected: [],
  screensAvailable: [],

  setScreensSelected: () => {},
});

export const useData = () => {
  return useContext(DataContext);
};

type DataProviderProps = {
  children: ReactNode;
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const supabase = createClientComponentClient();

  const [filesLoading, setFilesLoading] = useState(true);
  const [filesAvailable, setFilesAvailable] = useState<File[]>([]);

  const [screensLoading, setScreensLoading] = useState(true);
  const [screensSelected, setScreensSelected] = useState<Screen[]>([]);
  const [screensAvailable, setScreensAvailable] = useState<Screen[]>([]);

  const [storageLoading, setStorageLoading] = useState(true);

  const [conflictModal, setConflictModal] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      // Load initial data
      loadFiles(setFilesAvailable, supabase).then(() => setFilesLoading(false));
      loadScreens(setScreensAvailable, supabase).then(() =>
        setScreensLoading(false),
      );

      let channel = supabase.channel("schema-db-changes");

      // Subscribe to future changes
      channel = subscribeFiles(setFilesAvailable, channel);
      channel = subscribeScreens(setScreensAvailable, channel);

      channel.subscribe();

      // Unsubscribe when component is unmounted
      return () => {
        channel.unsubscribe();
      };
    };

    loadInitialData();
  }, []);

  // Load the selected screens ids in localStorage whenever it changes
  useEffect(() => {
    if (screensLoading || filesLoading || storageLoading || conflictModal)
      return;

    const screensIds = screensSelected.map((screen) => screen.id);
    const screensParsed = JSON.stringify(screensIds);

    localStorage.setItem("selected", screensParsed);

    // Check whether the selected screens have conflicting settings
    const powerpointConflict = screensSelected.some(
      (screen) => screen.powerpoint !== screensSelected[0].powerpoint,
    );

    const propertiesConflict = screensSelected.some(
      (screen) =>
        screen.index !== screensSelected[0].index ||
        screen.playing !== screensSelected[0].playing ||
        screen.interval !== screensSelected[0].interval,
    );

    // If there is a conflict in the powerpoint we don't have to worry about conflicting properties since the properties will reset on the next powerpoint change
    if (powerpointConflict) return;

    // If there is a conflict in the properties we'll reset all screens to the default settings
    if (!propertiesConflict) return;

    setConflictModal(true);

    // If there is a conflict we'll reset all screens to the default settings
    screensSelected.forEach(async (screen) => {
      await supabase
        .from("screen")
        .update({ index: 0, playing: true, interval: 30 })
        .eq("id", screen.id);
    });

    // Bit of a creative solution but I only want to trigger the conflict check if the users selects a screen and not if one of the properties changes
  }, [screensSelected.length, screensLoading, filesLoading]);

  // Load the selected screens ids back into JavaScript objects once the screens are ready
  useEffect(() => {
    if (screensLoading || filesLoading) return;

    const screenSaved = localStorage.getItem("selected");

    // If screens have been saved in localStorage, restore them
    if (screenSaved) {
      const screensIds = JSON.parse(screenSaved);
      const screensFiltered = screensAvailable.filter((screen) =>
        screensIds.includes(screen.id),
      );

      setScreensSelected(screensFiltered);
    }
    // If nothing is saved in localStorage for "selected", select all screens
    else {
      setScreensSelected(screensAvailable);

      const screensIds = screensAvailable.map((screen) => screen.id);
      const screensParsed = JSON.stringify(screensIds);

      localStorage.setItem("selected", screensParsed);
    }

    // From now on we'll keep the localStorage up-to-date
    setStorageLoading(false);
  }, [screensAvailable, screensLoading, filesLoading]);

  return (
    <DataContext.Provider
      value={{
        screensAvailable,
        filesAvailable,
        screensLoading,
        filesLoading,
        screensSelected,
        setScreensSelected,
      }}
    >
      {children}
      <ModalConflict
        open={conflictModal}
        content="Je hebt meerdere schermen geselecteerd met uiteenlopende afspeelsnelheden, speelstatussen (play/pause) of dia-indexen. Om synchronisatieproblemen te voorkomen, hebben we de instellingen van beide schermen teruggezet naar de standaardwaarden."
        onClose={() => {
          setConflictModal(false);
        }}
      />
    </DataContext.Provider>
  );
};

export default DataProvider;
