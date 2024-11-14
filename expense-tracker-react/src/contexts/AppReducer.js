export default (state, action) => {
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            return {
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            }
        case 'ADD_TRANSACTION':
            return {
                transactions: [...state.transactions, action.payload]
            }
        // case 'EDIT_TRANSACTION':
        //     return {
        //         transactions: state.transactions.map(transaction => 
        //             transaction.id === action.payload.id? {...transaction,...action.payload.transaction} : transaction
        //         )
        //     }
        default:
            return state
    }
}