function createPDF() {

  const $name = document.getElementById("name");
  const $country = document.getElementById("country");
  
  if($name.value == '' || $country.value == '') {
    alert('Please enter all the fields.')
  } else {
    const doc = new jsPDF();

    doc.setFontSize(30);
    doc.text($name.value, 20, 20);

    doc.setFontSize(20);
    doc.setTextColor('#00d1b2');
    doc.text($country.value, 20, 35);

    doc.save("my-pdf.pdf");
  }

}