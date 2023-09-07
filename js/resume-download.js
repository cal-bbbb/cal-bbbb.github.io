function downloadResume() {
  const link = document.createElement("a");
  link.href = "/resources/cboone_resume_2023.pdf";
  link.download = "resume_current.pdf";
  link.dispatchEvent(new MouseEvent("click"));
}