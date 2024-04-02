function addData(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var date = new Date();
  var values = [date, data.name, getProductDetails(data.barcode)];
  sheet.appendRow(values);
  
  return "Order placed successfully.";
}

function getProductDetails(barcode) {
  var products = getProductsFromFile(); // Read products from local text file
  var productDetails = products.split(';'); // Split by semi-colon
  for (var i = 0; i < productDetails.length; i += 3) {
    if (barcode === productDetails[i]) {
      return productDetails[i + 1];
    }
  }
  return "Product not found";
}

function getProductsFromFile() {
  var file = DriveApp.getFilesByName('products.txt').next();
  var contents = file.getBlob().getDataAsString();
  return contents;
}
