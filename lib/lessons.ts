import lessonData from "@/data/lessons.json";

export type Lesson = (typeof lessonData)[number];

export const lessons = lessonData as Lesson[];

export function getLesson(id: string) {
  return lessons.find((lesson) => lesson.id === id);
}
