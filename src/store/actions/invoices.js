export const loadInvoiceList = () => ({
    type: 'LOAD_INVOICES',
});

export const createInvoice = (data) => ({
    type: 'CREATE_INVOICE',
    data
});

export const editInvoice = (id, data) => ({
    type: 'EDIT_INVOICE',
    id,
    data
});

export const loadInvoiceDetail = (id) => ({
    type: 'LOAD_INVOICE_DETAIL',
    id
});

export const archiveInvoice = (id) => ({
    type: 'ARCHIVE_INVOICE',
    id
});

export const unarchiveInvoice = (id) => ({
    type: 'UNARCHIVE_INVOICE',
    id
});

export const agreeToInvoice = (id) => ({
    type: 'AGREE_TO_INVOICE',
    id
})

