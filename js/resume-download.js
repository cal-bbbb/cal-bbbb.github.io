function downloadResume() {
  const link = document.createElement("a");
  link.href = "/resources/resumes/CBoone Resume Analyst.pdf";
  link.download = "Calum_Boone_Resume_2024.pdf";
  link.dispatchEvent(new MouseEvent("click"));
}