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
          const liveData = docSnap.data();
          const state = getLocalState();
          state.profile = liveData;
          saveLocalState(state);
          return liveData;
        } else {
          // Auto-seed profile into Firestore
          await setDoc(docRef, initialProfile);
          return initialProfile;
        }
      } catch (err) {
        console.warn("Firestore error fetching profile, using fallback:", err);
      }
    }
    return getLocalState().profile;
  },

  async updateProfile(profileData) {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, "profile", "main");
        await setDoc(docRef, { ...profileData, updatedAt: serverTimestamp() }, { merge: true });
        console.log("✅ Profile updated in Cloud Firestore!");
      } catch (err) {
        console.error("Failed to update profile in Cloud Firestore:", err);
        throw err;
      }
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
          const liveSkills = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          const state = getLocalState();
          state.skills = liveSkills;
          saveLocalState(state);
          return liveSkills;
        } else {
          // Auto-seed skills into Firestore
          for (const s of initialSkills) {
            const { id, ...data } = s;
            await setDoc(doc(db, "skills", id), data);
          }
          return initialSkills;
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
      try {
        const docRef = await addDoc(collection(db, "skills"), {
          ...skillData,
          createdAt: serverTimestamp()
        });
        newSkill.id = docRef.id;
        console.log("✅ Skill added to Cloud Firestore:", docRef.id);
      } catch (err) {
        console.error("Failed to add skill in Cloud Firestore:", err);
        throw err;
      }
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
      try {
        const docRef = doc(db, "skills", id);
        await setDoc(docRef, { ...skillData, updatedAt: serverTimestamp() }, { merge: true });
        console.log("✅ Skill updated in Cloud Firestore:", id);
      } catch (err) {
        console.error("Failed to update skill in Cloud Firestore:", err);
        throw err;
      }
    }
    const state = getLocalState();
    state.skills = state.skills.map(s => s.id === id ? { ...s, ...skillData } : s);
    saveLocalState(state);
    return { id, ...skillData };
  },

  async deleteSkill(id) {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, "skills", id));
        console.log("✅ Skill deleted from Cloud Firestore:", id);
      } catch (err) {
        console.error("Failed to delete skill in Cloud Firestore:", err);
        throw err;
      }
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
          const liveProjects = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          const state = getLocalState();
          state.projects = liveProjects;
          saveLocalState(state);
          return liveProjects;
        } else {
          // Auto-seed projects into Firestore
          for (const p of initialProjects) {
            const { id, ...data } = p;
            await setDoc(doc(db, "projects", id), data);
          }
          return initialProjects;
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
      try {
        const docRef = await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: serverTimestamp()
        });
        newProj.id = docRef.id;
        console.log("✅ Project added to Cloud Firestore:", docRef.id);
      } catch (err) {
        console.error("Failed to add project in Cloud Firestore:", err);
        throw err;
      }
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
      try {
        const docRef = doc(db, "projects", id);
        await setDoc(docRef, { ...projectData, updatedAt: serverTimestamp() }, { merge: true });
        console.log("✅ Project updated in Cloud Firestore:", id);
      } catch (err) {
        console.error("Failed to update project in Cloud Firestore:", err);
        throw err;
      }
    }
    const state = getLocalState();
    state.projects = state.projects.map(p => p.id === id ? { ...p, ...projectData } : p);
    saveLocalState(state);
    return { id, ...projectData };
  },

  async deleteProject(id) {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, "projects", id));
        console.log("✅ Project deleted from Cloud Firestore:", id);
      } catch (err) {
        console.error("Failed to delete project in Cloud Firestore:", err);
        throw err;
      }
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
          const liveExp = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          const state = getLocalState();
          state.experience = liveExp;
          saveLocalState(state);
          return liveExp;
        } else {
          for (const e of initialExperience) {
            const { id, ...data } = e;
            await setDoc(doc(db, "experience", id), data);
          }
          return initialExperience;
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
      try {
        const docRef = await addDoc(collection(db, "experience"), {
          ...expData,
          createdAt: serverTimestamp()
        });
        newExp.id = docRef.id;
        console.log("✅ Experience added to Cloud Firestore:", docRef.id);
      } catch (err) {
        console.error("Failed to add experience in Cloud Firestore:", err);
        throw err;
      }
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
      try {
        const docRef = doc(db, "experience", id);
        await setDoc(docRef, { ...expData, updatedAt: serverTimestamp() }, { merge: true });
        console.log("✅ Experience updated in Cloud Firestore:", id);
      } catch (err) {
        console.error("Failed to update experience in Cloud Firestore:", err);
        throw err;
      }
    }
    const state = getLocalState();
    state.experience = state.experience.map(e => e.id === id ? { ...e, ...expData } : e);
    saveLocalState(state);
    return { id, ...expData };
  },

  async deleteExperience(id) {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, "experience", id));
        console.log("✅ Experience deleted from Cloud Firestore:", id);
      } catch (err) {
        console.error("Failed to delete experience in Cloud Firestore:", err);
        throw err;
      }
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
          const liveEdu = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          const state = getLocalState();
          state.education = liveEdu;
          saveLocalState(state);
          return liveEdu;
        } else {
          for (const ed of initialEducation) {
            const { id, ...data } = ed;
            await setDoc(doc(db, "education", id), data);
          }
          return initialEducation;
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
      try {
        const docRef = await addDoc(collection(db, "education"), {
          ...eduData,
          createdAt: serverTimestamp()
        });
        newEdu.id = docRef.id;
        console.log("✅ Education added to Cloud Firestore:", docRef.id);
      } catch (err) {
        console.error("Failed to add education in Cloud Firestore:", err);
        throw err;
      }
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
      try {
        const docRef = doc(db, "education", id);
        await setDoc(docRef, { ...eduData, updatedAt: serverTimestamp() }, { merge: true });
        console.log("✅ Education updated in Cloud Firestore:", id);
      } catch (err) {
        console.error("Failed to update education in Cloud Firestore:", err);
        throw err;
      }
    }
    const state = getLocalState();
    state.education = state.education.map(ed => ed.id === id ? { ...ed, ...eduData } : ed);
    saveLocalState(state);
    return { id, ...eduData };
  },

  async deleteEducation(id) {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, "education", id));
        console.log("✅ Education deleted from Cloud Firestore:", id);
      } catch (err) {
        console.error("Failed to delete education in Cloud Firestore:", err);
        throw err;
      }
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
          const liveRes = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          const state = getLocalState();
          state.research = liveRes;
          saveLocalState(state);
          return liveRes;
        } else {
          for (const r of initialResearch) {
            const { id, ...data } = r;
            await setDoc(doc(db, "research", id), data);
          }
          return initialResearch;
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
      try {
        const docRef = await addDoc(collection(db, "research"), {
          ...researchData,
          createdAt: serverTimestamp()
        });
        newRes.id = docRef.id;
        console.log("✅ Research added to Cloud Firestore:", docRef.id);
      } catch (err) {
        console.error("Failed to add research in Cloud Firestore:", err);
        throw err;
      }
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
      try {
        const docRef = doc(db, "research", id);
        await setDoc(docRef, { ...researchData, updatedAt: serverTimestamp() }, { merge: true });
        console.log("✅ Research updated in Cloud Firestore:", id);
      } catch (err) {
        console.error("Failed to update research in Cloud Firestore:", err);
        throw err;
      }
    }
    const state = getLocalState();
    state.research = state.research.map(r => r.id === id ? { ...r, ...researchData } : r);
    saveLocalState(state);
    return { id, ...researchData };
  },

  async deleteResearch(id) {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, "research", id));
        console.log("✅ Research deleted from Cloud Firestore:", id);
      } catch (err) {
        console.error("Failed to delete research in Cloud Firestore:", err);
        throw err;
      }
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
          const liveMsg = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          const state = getLocalState();
          state.messages = liveMsg;
          saveLocalState(state);
          return liveMsg;
        } else {
          return initialMessages;
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
      try {
        const docRef = await addDoc(collection(db, "messages"), {
          ...msgData,
          status: "unread",
          createdAt: serverTimestamp()
        });
        newMsg.id = docRef.id;
        console.log("✅ Contact message saved directly to Cloud Firestore:", docRef.id);
      } catch (err) {
        console.error("Failed to save message in Cloud Firestore:", err);
        throw err;
      }
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
      try {
        const docRef = doc(db, "messages", id);
        await setDoc(docRef, { status }, { merge: true });
        console.log("✅ Message status updated in Cloud Firestore:", id);
      } catch (err) {
        console.error("Failed to update message status in Cloud Firestore:", err);
      }
    }
    const state = getLocalState();
    state.messages = state.messages.map(m => m.id === id ? { ...m, status } : m);
    saveLocalState(state);
    return { id, status };
  },

  async deleteMessage(id) {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, "messages", id));
        console.log("✅ Message deleted from Cloud Firestore:", id);
      } catch (err) {
        console.error("Failed to delete message in Cloud Firestore:", err);
      }
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
