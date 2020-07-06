function createPDF() {

  const $name = document.getElementById("name");
  const $country = document.getElementById("country");
  
  if($name.value == '' || $country.value == '') {
    alert('Please enter all the fields.')
  } else {
    const doc = new jsPDF();

    doc.text($name.value, 10, 10);
    doc.text($country.value, 10, 25);

    doc.save("my-pdf.pdf");
  }

}