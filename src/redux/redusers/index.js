export const Reduser = (state = [], action) => {
    const { id, newItem, type, data } = action
    switch(type) {
        case "SET":
            return data;
        case 'ADD':
            return [...state, newItem];
        case 'DELETE':
            return state.filter(({_id}) => _id !== id);
        case 'DONE':
            return state.map((val) => val._id === id ? ({...val, isDone: !val.isDone}) : val);
        case 'MARK':
            return state.map((val) => val._id === id ? ({...val, isMarked: !val.isMarked}) : val);
        default:
            return state;
    }
}