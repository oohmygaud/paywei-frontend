export default (state = {}, action) => {
    switch (action.type) {

        case 'LOAD_INVOICES_SUCCEEDED':
            return { ...state, data: action.data };

        case 'CREATE_INVOICE_SUCCEEDED':
            return { ...state, created: action.data };

        case 'EDIT_INVOICE_SUCCEEDED':
            return { ...state, edited: action.data };

        case 'LOAD_INVOICE_DETAIL_SUCCEEDED':
            console.log('invoice detail', action.data)
            return { ...state, detail: action.data };

        case 'CLEAR_INVOICE_DETAILS':
            return { ...state, detail: null };
        
        case 'SHOW_GRAPH_SUCCEEDED':
                return { ...state, graph: action.data };
        
        case 'LOAD_PAYMENTS_SUCCEEDED':
            return { ...state, payments: action.data };
    
        default: return state;
    }
};