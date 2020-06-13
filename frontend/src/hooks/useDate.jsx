export function useDate(string) {

    let newDate = new Date(string)
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    const handleMonth = month => {
        switch(month) {
            case 1 :
                return 'Janvier';
            case 2 :
                return 'Février';
            case 3 :
                return 'Mars';
            case 4 :
                return 'Avril';
            case 5 :
                return 'Mai';
            case 6 :
                return 'Juin';
            case 7 :
                return 'Juillet';
            case 8 :
                return 'Août';
            case 9 :
                return 'Septembre';
            case 10 :
                return 'Octobre';
            case 11 :
                return 'Novembre';
            case 12 :
                return 'Décembre';
            default:
                return month;
        }

    }
    
    return `${date} ${handleMonth(month)} ${year}`
}