function downloadResume() {
  const link = document.createElement("a");
  link.href = "/resources/resume_2024.pdf";
  link.download = "resume_current.pdf";
  link.dispatchEvent(new MouseEvent("click"));
}