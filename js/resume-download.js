function downloadResume() {
  const link = document.createElement("a");
  link.href = "/resources/Calum Boone Resume 2024.pdf";
  link.download = "Calum_Boone_Resume_2024.pdf";
  link.dispatchEvent(new MouseEvent("click"));
}