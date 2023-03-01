export { changeHandler }

function changeHandler(e, state, setState) {
    let newValue;
    if (e.target.type === "file") {
        newValue = Object.values(e.target.files);
        console.log(state)
    } else {
        newValue = e.target.value;
        if (e.target.type !== "button") {
            if (e.target.type === "checkbox") {
                newValue = [...state.newTableRow[e.target.name]]
                if (e.target.checked) {
                    newValue.push(e.target.value)
                } else {
                    newValue = newValue.filter(data => data !== e.target.value)
                }
            }
        }

    }

    setState(prevState => ({
        ...prevState,
        newTableRow: {
            ...prevState.newTableRow,
            [e.target.name]: newValue
        }
    }))
}