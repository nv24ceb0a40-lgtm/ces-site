import {
  collection, getDocs, getDoc, addDoc, setDoc, updateDoc, deleteDoc,
  doc, query, orderBy, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

// ---------- helpers ----------
async function getAll(name, sortField = "order", direction = "asc") {
  const q = query(collection(db, name), orderBy(sortField, direction));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

const add = (name, data) => addDoc(collection(db, name), data);
const update = (name, id, data) => updateDoc(doc(db, name, id), data);
const remove = (name, id) => deleteDoc(doc(db, name, id));

// ---------- events (slug is the document id) ----------
export const getEvents = () => getAll("events", "date", "desc");

export const getEvent = async (id) => {
  const snap = await getDoc(doc(db, "events", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const addEvent = (id, data) => setDoc(doc(db, "events", id), data);
export const updateEvent = (id, data) => update("events", id, data);
export const deleteEvent = (id) => remove("events", id);

// ---------- team ----------
export const getTeam = () => getAll("team");

// regroups the flat docs into the shape the Team page uses
export const getTeamSections = async () => {
  const members = await getAll("team");
  const sections = [];
  for (const m of members) {
    let s = sections.find((x) => x.title === m.sectionTitle);
    if (!s) {
      s = { title: m.sectionTitle, role: m.sectionRole, photoDir: m.photoDir, members: [] };
      sections.push(s);
    }
    s.members.push(m);
  }
  return sections;
};

export const addMember = (id, data) => setDoc(doc(db, "team", id), data);
export const updateMember = (id, data) => update("team", id, data);
export const deleteMember = (id) => remove("team", id);

// ---------- settings (about, contact, join) ----------
export const getSettings = async (name) => {
  const snap = await getDoc(doc(db, "settings", name));
  return snap.exists() ? snap.data() : null;
};

export const saveSettings = (name, data) =>
  setDoc(doc(db, "settings", name), data, { merge: true });

// ---------- join form (public create, admin read) ----------
export const submitJoin = (data) =>
  add("joinRequests", { ...data, createdAt: serverTimestamp() });

export const getJoinRequests = () =>
  getAll("joinRequests", "createdAt", "desc");