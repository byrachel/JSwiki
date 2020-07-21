const CategoryColor = (category) => {
    switch (category) {
        case 'Framework':
            return 'is-danger'
        case 'Librairie':
            return 'is-primary'
        case 'Software':
            return 'is-light'
        case 'Composant':
            return 'is-dark'
        case 'Autre':
            return 'is-warning'
        default:
            return 'is-light'
    }
}

export default CategoryColor;