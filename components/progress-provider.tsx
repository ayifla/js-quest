"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { lessons } from "@/lib/lessons";

type ProgressState = { completedLessonIds: string[]; xp: number };
type ProgressContextValue = ProgressState & {
  completeLesson: (id: string, xp: number) => void;
  isUnlocked: (index: number) => boolean;
  resetProgress: () => void;
  level: number;
  levelProgress: number;
};

const initialState: ProgressState = { completedLessonIds: [], xp: 0 };
const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(initialState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("js-quest-progress");
    if (saved) {
      try { setState(JSON.parse(saved)); } catch { setState(initialState); }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("js-quest-progress", JSON.stringify(state));
  }, [state, loaded]);

  const value = useMemo<ProgressContextValue>(() => ({
    ...state,
    completeLesson: (id, xp) => setState((current) => current.completedLessonIds.includes(id)
      ? current
      : { xp: current.xp + xp, completedLessonIds: [...current.completedLessonIds, id] }),
    isUnlocked: (index) => index === 0 || state.completedLessonIds.includes(lessons[index - 1]?.id),
    resetProgress: () => setState(initialState),
    level: Math.floor(state.xp / 150) + 1,
    levelProgress: ((state.xp % 150) / 150) * 100
  }), [state]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used within ProgressProvider");
  return context;
}
