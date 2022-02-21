import { collection, getFirestore, getDocs } from "firebase/firestore";

export interface IPeak {
  name: string;
  height: number;
  location: string;
  zahtevnost: string;
}

type IFetchPeaks = () => Promise<IPeak[]>;

export const fetchAllPeaks: IFetchPeaks = async () => {
  const db = getFirestore();
  const collectionData = await getDocs(collection(db, "peaks"));

  let peaks = <IPeak[]>[];
  collectionData.forEach((doc) => {
    const peakData = doc.data() as IPeak;
    peaks.push(peakData);
  });

  return peaks;
};
