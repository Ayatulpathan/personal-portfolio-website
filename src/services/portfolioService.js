import {
  db,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  isFirebaseConfigured
} from "../firebase/firestore";
import {
  initialProfile,
  initialSkills,
  initialEducation,
  initialExperience,
  initialProjects,
  initialResearch,
  initialMessages
} from "../utils/initialData";
import { STORAGE_KEYS } from "../utils/constants";

// Helper to get local mock data state
function getLocalState() {
  const data = localStorage.getItem(STORAGE_KEYS.LOCAL_PORTFOLIO_DATA);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing local state:", e);
    }
  }
  const defaultState = {
    profile: initialProfile,
    skills: initialSkills,
    education: initialEducation,
    experience: initialExperience,
    projects: initialProjects,
    research: initialResearch,
    messages: initialMessages
  };
  localStorage.setItem(STORAGE_KEYS.LOCAL_PORTFOLIO_DATA, JSON.stringify(defaultState));
  return defaultState;
}

// Helper to save local mock data state
function saveLocalState(state) {
  localStorage.setItem(STORAGE_KEYS.LOCAL_PORTFOLIO_DATA, JSON.stringify(state));
}

export const portfolioService = {
  // -------------------------------------------------------------
  // PROFILE
  // -------------------------------------------------------------
  async getProfile() {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, "profile", "main");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data();
        }
      } catch (err) {
        console.warn("Firestore error fetching profile, using fallback:", err);
      }
    }
    return getLocalState().profile;
  },

  async updateProfile(profileData) {
    if (isFirebaseConfigured && db) {
      const docRef = doc(db, "profile", "main");
      await setDoc(docRef, { ...profileData, updatedAt: serverTimestamp() }, { merge: true });
    }
    const state = getLocalState();
    state.profile = { ...state.profile, ...profileData };
    saveLocalState(state);
    return state.profile;
  },

  // -------------------------------------------------------------
  // SKILLS
  // -------------------------------------------------------------
  async getSkills() {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, "skills"), orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn("Firestore error fetching skills:", err);
      }
    }
    return getLocalState().skills;
  },

  async addSkill(skillData) {
    let newSkill = { ...skillData };
    if (isFirebaseConfigured && db) {
      const docRef = await addDoc(collection(db, "skills"), {
        ...skillData,
        createdAt: serverTimestamp()
      });
      newSkill.id = docRef.id;
    } else {
      newSkill.id = "sk-" + Date.now();
    }
    const state = getLocalState();
    state.skills = [...state.skills, newSkill];
    saveLocalState(state);
    return newSkill;
  },

  async updateSkill(id, skillData) {
    if (isFirebaseConfigured && db) {
      await updateDoc(doc(db, "skills", id), skillData);
    }
    const state = getLocalState();
    state.skills = state.skills.map(s => s.id === id ? { ...s, ...skillData } : s);
    saveLocalState(state);
    return { id, ...skillData };
  },

  async deleteSkill(id) {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, "skills", id));
    }
    const state = getLocalState();
    state.skills = state.skills.filter(s => s.id !== id);
    saveLocalState(state);
    return id;
  },

  // -------------------------------------------------------------
  // PROJECTS
  // -------------------------------------------------------------
  async getProjects() {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn("Firestore error fetching projects:", err);
      }
    }
    return getLocalState().projects;
  },

  async addProject(projectData) {
    let newProj = { ...projectData, createdAt: new Date().toISOString() };
    if (isFirebaseConfigured && db) {
      const docRef = await addDoc(collection(db, "projects"), {
        ...projectData,
        createdAt: serverTimestamp()
      });
      newProj.id = docRef.id;
    } else {
      newProj.id = "proj-" + Date.now();
    }
    const state = getLocalState();
    state.projects = [newProj, ...state.projects];
    saveLocalState(state);
    return newProj;
  },

  async updateProject(id, projectData) {
    if (isFirebaseConfigured && db) {
      await updateDoc(doc(db, "projects", id), projectData);
    }
    const state = getLocalState();
    state.projects = state.projects.map(p => p.id === id ? { ...p, ...projectData } : p);
    saveLocalState(state);
    return { id, ...projectData };
  },

  async deleteProject(id) {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, "projects", id));
    }
    const state = getLocalState();
    state.projects = state.projects.filter(p => p.id !== id);
    saveLocalState(state);
    return id;
  },

  // -------------------------------------------------------------
  // EXPERIENCE
  // -------------------------------------------------------------
  async getExperience() {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, "experience"), orderBy("startDate", "desc"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn("Firestore error fetching experience:", err);
      }
    }
    return getLocalState().experience;
  },

  async addExperience(expData) {
    let newExp = { ...expData };
    if (isFirebaseConfigured && db) {
      const docRef = await addDoc(collection(db, "experience"), {
        ...expData,
        createdAt: serverTimestamp()
      });
      newExp.id = docRef.id;
    } else {
      newExp.id = "exp-" + Date.now();
    }
    const state = getLocalState();
    state.experience = [newExp, ...state.experience];
    saveLocalState(state);
    return newExp;
  },

  async updateExperience(id, expData) {
    if (isFirebaseConfigured && db) {
      await updateDoc(doc(db, "experience", id), expData);
    }
    const state = getLocalState();
    state.experience = state.experience.map(e => e.id === id ? { ...e, ...expData } : e);
    saveLocalState(state);
    return { id, ...expData };
  },

  async deleteExperience(id) {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, "experience", id));
    }
    const state = getLocalState();
    state.experience = state.experience.filter(e => e.id !== id);
    saveLocalState(state);
    return id;
  },

  // -------------------------------------------------------------
  // EDUCATION
  // -------------------------------------------------------------
  async getEducation() {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, "education"), orderBy("startYear", "desc"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn("Firestore error fetching education:", err);
      }
    }
    return getLocalState().education;
  },

  async addEducation(eduData) {
    let newEdu = { ...eduData };
    if (isFirebaseConfigured && db) {
      const docRef = await addDoc(collection(db, "education"), {
        ...eduData,
        createdAt: serverTimestamp()
      });
      newEdu.id = docRef.id;
    } else {
      newEdu.id = "edu-" + Date.now();
    }
    const state = getLocalState();
    state.education = [newEdu, ...state.education];
    saveLocalState(state);
    return newEdu;
  },

  async updateEducation(id, eduData) {
    if (isFirebaseConfigured && db) {
      await updateDoc(doc(db, "education", id), eduData);
    }
    const state = getLocalState();
    state.education = state.education.map(ed => ed.id === id ? { ...ed, ...eduData } : ed);
    saveLocalState(state);
    return { id, ...eduData };
  },

  async deleteEducation(id) {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, "education", id));
    }
    const state = getLocalState();
    state.education = state.education.filter(ed => ed.id !== id);
    saveLocalState(state);
    return id;
  },

  // -------------------------------------------------------------
  // RESEARCH
  // -------------------------------------------------------------
  async getResearch() {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, "research"), orderBy("year", "desc"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn("Firestore error fetching research:", err);
      }
    }
    return getLocalState().research;
  },

  async addResearch(researchData) {
    let newRes = { ...researchData };
    if (isFirebaseConfigured && db) {
      const docRef = await addDoc(collection(db, "research"), {
        ...researchData,
        createdAt: serverTimestamp()
      });
      newRes.id = docRef.id;
    } else {
      newRes.id = "res-" + Date.now();
    }
    const state = getLocalState();
    state.research = [newRes, ...state.research];
    saveLocalState(state);
    return newRes;
  },

  async updateResearch(id, researchData) {
    if (isFirebaseConfigured && db) {
      await updateDoc(doc(db, "research", id), researchData);
    }
    const state = getLocalState();
    state.research = state.research.map(r => r.id === id ? { ...r, ...researchData } : r);
    saveLocalState(state);
    return { id, ...researchData };
  },

  async deleteResearch(id) {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, "research", id));
    }
    const state = getLocalState();
    state.research = state.research.filter(r => r.id !== id);
    saveLocalState(state);
    return id;
  },

  // -------------------------------------------------------------
  // MESSAGES (Contact Inquiries)
  // -------------------------------------------------------------
  async getMessages() {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn("Firestore error fetching messages:", err);
      }
    }
    return getLocalState().messages;
  },

  async sendMessage(msgData) {
    let newMsg = {
      ...msgData,
      status: "unread",
      createdAt: new Date().toISOString()
    };
    if (isFirebaseConfigured && db) {
      const docRef = await addDoc(collection(db, "messages"), {
        ...msgData,
        status: "unread",
        createdAt: serverTimestamp()
      });
      newMsg.id = docRef.id;
    } else {
      newMsg.id = "msg-" + Date.now();
    }
    const state = getLocalState();
    state.messages = [newMsg, ...state.messages];
    saveLocalState(state);
    return newMsg;
  },

  async updateMessageStatus(id, status) {
    if (isFirebaseConfigured && db) {
      await updateDoc(doc(db, "messages", id), { status });
    }
    const state = getLocalState();
    state.messages = state.messages.map(m => m.id === id ? { ...m, status } : m);
    saveLocalState(state);
    return { id, status };
  },

  async deleteMessage(id) {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, "messages", id));
    }
    const state = getLocalState();
    state.messages = state.messages.filter(m => m.id !== id);
    saveLocalState(state);
    return id;
  },

  // -------------------------------------------------------------
  // SEED TO FIRESTORE HELPER
  // -------------------------------------------------------------
  async seedInitialDataToFirestore() {
    if (!isFirebaseConfigured || !db) {
      throw new Error("Firebase is not configured yet. Please configure your .env keys first.");
    }
    
    // Seed Profile
    await setDoc(doc(db, "profile", "main"), initialProfile);

    // Seed Skills
    for (const skill of initialSkills) {
      const { id, ...data } = skill;
      await setDoc(doc(db, "skills", id), data);
    }

    // Seed Projects
    for (const project of initialProjects) {
      const { id, ...data } = project;
      await setDoc(doc(db, "projects", id), data);
    }

    // Seed Experience
    for (const exp of initialExperience) {
      const { id, ...data } = exp;
      await setDoc(doc(db, "experience", id), data);
    }

    // Seed Education
    for (const edu of initialEducation) {
      const { id, ...data } = edu;
      await setDoc(doc(db, "education", id), data);
    }

    // Seed Research
    for (const res of initialResearch) {
      const { id, ...data } = res;
      await setDoc(doc(db, "research", id), data);
    }

    return true;
  },

  // Reset local state to default seeds
  resetLocalState() {
    const defaultState = {
      profile: initialProfile,
      skills: initialSkills,
      education: initialEducation,
      experience: initialExperience,
      projects: initialProjects,
      research: initialResearch,
      messages: initialMessages
    };
    saveLocalState(defaultState);
    return defaultState;
  }
};
