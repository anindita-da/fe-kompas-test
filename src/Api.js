export const getData = () => {
    return fetch("/data.json").then(res => res.json())
}