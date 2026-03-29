export const supportedTypes = ["PDF", "PPT", "PPTX", "DOC", "DOCX"];

const supportedExtensions = new Set(["pdf", "ppt", "pptx", "doc", "docx"]);
const maxFileSizeBytes = 25 * 1024 * 1024;

export function formatFileSize(bytes) {
  if (!bytes) return "0 KB";
  const sizeInMb = bytes / 1024 / 1024;
  if (sizeInMb >= 1) return `${sizeInMb.toFixed(1)} MB`;
  return `${Math.max(bytes / 1024, 0.1).toFixed(1)} KB`;
}

export function makeNotes(fileName) {
  const title = fileName?.replace(/\.[^/.]+$/, "") || "Selected lecture";
  return {
    summary: [
      `${title} is summarised into a readable overview for fast review.`,
      "The notes focus on concepts, not long paragraphs, so revision stays efficient.",
      "Students can use the output before class tests, assignments, and final exams.",
    ],
    keyPoints: [
      "Main definitions are rewritten in simple language.",
      "Important steps and processes are separated into bullet points.",
      "Examples from the lecture are retained as quick reference items.",
    ],
    concepts: [
      "Concept clusters are grouped by topic for easier memorisation.",
      "Technical terms are extracted and presented as study cues.",
      "Related ideas are linked so the structure of the lecture is visible.",
    ],
    revisionNotes: [
      "Read the summary once for context.",
      "Revise the key points before the exam.",
      "Use the question list to self-check understanding.",
    ],
    questions: [
      `Explain the main idea of ${title}.`,
      `List three important points from ${title}.`,
      `Create a short answer based on the most repeated concept in ${title}.`,
    ],
  };
}

export function createDocumentRecord(file) {
  return {
    name: file.name,
    extension: file.name.includes(".") ? file.name.split(".").pop().toUpperCase() : "FILE",
    sizeLabel: formatFileSize(file.size),
    updatedAt: new Date(file.lastModified).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }),
    content: makeNotes(file.name),
  };
}

export function validateLectureFile(file) {
  if (!file) {
    return "Please choose a lecture file first.";
  }

  const fileName = file.name || "";
  const extension = fileName.includes(".") ? fileName.split(".").pop().toLowerCase() : "";
  const isImageFile = file.type?.startsWith("image/") || ["png", "jpg", "jpeg", "gif", "webp", "bmp", "svg"].includes(extension);

  if (!supportedExtensions.has(extension)) {
    if (isImageFile) {
      return "Images are not supported. Please upload a PDF, PPT, PPTX, DOC, or DOCX file.";
    }
    return "Unsupported file type. Please upload a PDF, PPT, PPTX, DOC, or DOCX file.";
  }

  if (file.size > maxFileSizeBytes) {
    return "That file is too large. Please upload a file smaller than 25 MB.";
  }

  return "";
}
