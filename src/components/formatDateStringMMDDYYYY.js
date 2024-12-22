function formatDateStringDDMMYYYY(isoDateString) {
    // Create a new Date object from the ISO date string
    const date = new Date(isoDateString);
  
    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
  
    // Format the date as "dd-mm-yyyy"
    return `${day}-${month}-${year}`;
  }
  
  export default formatDateStringDDMMYYYY;