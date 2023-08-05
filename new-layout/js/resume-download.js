function downloadResume() {
    const link = document.createElement("a");
    link.href = "resources/resume_current.pdf";
    link.download = "resume_current.pdf";
    link.dispatchEvent(new MouseEvent("click"));
  }