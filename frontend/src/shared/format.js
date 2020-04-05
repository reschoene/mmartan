const formatCurreny = (value) => {
    let formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
      
    return formatter.format(value); /* $2,500.00 */
}

export default formatCurreny;