const div = (a, b) => {
    return a / b;
}

const filterName = (arr, text) => {
    text = text.toLowerCase();
    return arr.filter(name => name.includes(text))
}

const checkIfAdmin = (user) => {
    if (user.role === 'admin') {
        return true;
    } else {
        return false;
    }
}

const getAverage = (arr) => {
    return arr.reduce((total, num) => total + num, 0) / arr.length;
}

const getApiData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

module.exports = {
    getApiData,
    getAverage,
    checkIfAdmin,
    filterName,
    div
};