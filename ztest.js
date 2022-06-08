function dateFormatter(pDate) {
    const options = {year: 'numeric', month: 'long', day: 'numeric' };
    return pDate.toLocaleDateString('de-DE', options)
}

const date = new Date();

console.log(date)

console.log(dateFormatter(date))