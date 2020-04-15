/** Just a helper function for formatting monetary values  */
const formatCurreny = (value) => {
    //Intl is a global object available in JS for formatting values in locale-specific format. 
    //It does the work of internationalizing information displayed to the user.
    let formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
      
    return formatter.format(value); /* $2,500.00 */
}

export default formatCurreny;