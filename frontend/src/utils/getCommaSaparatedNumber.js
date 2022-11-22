const getCommaSaparatedNumber = (number) => {
    // let number=12345678912354364;
    number= Number(number).toString();
    let lastThree = number.substring(number.length-3);
    let otherNumbers = number.substring(0,number.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
}

export default getCommaSaparatedNumber;