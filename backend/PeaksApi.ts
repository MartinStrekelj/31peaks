import { collection, getFirestore, getDocs, addDoc, Timestamp, query, where, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const db = getFirestore();
export interface IPeak {
  id: string;
  name: string;
  height: number;
  location: string;
  zahtevnost: string;
}

export interface ISummit {
  peak: string;
  user: string;
  date: Date;
}

type IFetchPeaks = () => Promise<IPeak[]>;

export const fetchAllPeaks: IFetchPeaks = async (ignoreCache: boolean = false) => {
  if (!ignoreCache) {
    const value = await AsyncStorage.getItem("peaks");

    if (value !== null) {
      return JSON.parse(value) as IPeak[];
    }
  }

  const collectionData = await getDocs(collection(db, "peaks"));

  let peaks = <IPeak[]>[];
  collectionData.forEach((doc) => {
    const peakData = doc.data() as IPeak;
    peakData.id = doc.id;
    peaks.push(peakData);
  });

  try {
    await AsyncStorage.setItem("peaks", JSON.stringify(peaks));
  } catch (e) {
    // Ignore error for async storage
  }

  return peaks;
};

export const summitPeak = async (peakId: string, userId: string) => {
  try {
    await addDoc(collection(db, "summits"), { peak: peakId, user: userId, date: Timestamp.now() });
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
};

export const getUserSummits = async (userId: string, ignoreCache: boolean = false) => {
  if (!ignoreCache) {
    const value = await AsyncStorage.getItem("summits");

    if (value !== null) {
      return JSON.parse(value) as ISummit[];
    }
  }

  const summitsRef = collection(db, "summits");
  const q = query(summitsRef, where("user", "==", userId));
  const data = await getDocs(q);
  const summits = <ISummit[]>[];
  data.forEach((doc) => {
    const summitData = doc.data() as ISummit;
    summits.push(summitData);
  });

  await AsyncStorage.setItem("summits", JSON.stringify(summits));

  return summits;
};
