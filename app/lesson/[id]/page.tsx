import { notFound } from "next/navigation";
import { getLesson, lessons } from "@/lib/lessons";
import { LessonPlayer } from "@/components/lesson-player";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ id: lesson.id }));
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) notFound();
  return <LessonPlayer lesson={lesson} />;
}
