const initialState = {
    items: [
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'http://res.cloudinary.com/dwjgvn2vp/image/upload/v1598815190/ctajidlu0uoxuoddc8j1.jpg',
        },
        {
            uid: '1',
            name: 'image.png',
            status: 'done',
            url: 'http://res.cloudinary.com/dwjgvn2vp/image/upload/v1598815190/ctajidlu0uoxuoddc8j1.jpg',
        }
    ]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'FILES:ADD_FILE':
            return {
                ...state,
                items: [
                    ...state.items,
                    payload
                ]
            };
        case 'FILES:REMOVE_FILE':
            return {
                ...state,
                items: state.items.filter(file => file._id !== payload)
            };
        default:
            return state
    }
}