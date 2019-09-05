import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { getApi } from "../api";

function* loadInvoiceList(action) {
    try {
        const api = getApi()
        let url = 'invoices/?';
        console.log(action)
        if (action.options && action.options.show_archived)
            url += '&show_archived=true';
        if (action.options && action.options.page)
            url += '&page=' + action.options.page;
        const response = yield call(api.get, url)
        yield put({ type: "LOAD_INVOICES_SUCCEEDED", data: response.data })
    }
    catch (e) {
        console.log('Error loading invoices', e)
    }
}

function* loadPaymentList(action) {
    try {
        const api = getApi()
        let url = 'payments/?';
        console.log(action)
        const response = yield call(api.get, url)
        yield put({ type: "LOAD_PAYMENTS_SUCCEEDED", data: response.data })
    }
    catch (e) {
        console.log('Error loading payments', e)
    }
}

function* createInvoice(action) {
    try {
        console.log('create invoice', action)
        const api = getApi()
        const response = yield call(api.post, 'invoices/', action.data)
        yield put({ type: "CREATE_INVOICE_SUCCEEDED", data: response.data })
        yield put(push('/invoices/' + response.data.id))
    }
    catch (e) {
        console.log('Error creating invoice', e)
    }
}

function* editInvoice(action) {
    try {
        const api = getApi()
        const response = yield call(api.put, 'invoices/' + action.id + '/', action.data)
        yield put({ type: "EDIT_INVOICE_SUCCEEDED", data: response.data })
        yield put(push('/invoices/' + response.data.id))
    }
    catch (e) {
        console.log('Error editing invoice', e)
    }
}

function* loadInvoiceDetail(action) {
    try {
        const api = getApi()
        const response = yield call(api.get, 'invoices/' + action.id)
        yield put({ type: "LOAD_INVOICE_DETAIL_SUCCEEDED", data: response.data })
    }
    catch (e) {
        console.log('Error loading invoice detail', e)
    }
}

function* archiveInvoice(action) {
    try {
        const api = getApi()
        const response = yield call(api.post, 'invoices/' + action.id + '/archive/', action.data)
        yield put({ type: "ARCHIVE_INVOICE_SUCCEEDED", data: response.data })
        yield put({ type: "LOAD_INVOICE_DETAIL_SUCCEEDED", data: response.data })
        yield put(push('/invoices/'))
    }
    catch (e) {
        console.log('Error archiving invoice', e)
    }
}

function* unarchiveInvoice(action) {
    try {
        const api = getApi()
        const response = yield call(api.post, 'invoices/' + action.id + '/unarchive/', action.data)
        yield put({ type: "UNARCHIVE_INVOICE_SUCCEEDED", data: response.data })
        yield put({ type: "LOAD_INVOICE_DETAIL_SUCCEEDED", data: response.data })
        yield put(push('/invoices/'))
    }
    catch (e) {
        console.log('Error unarchiving invoice', e)
    }
}

function* agreeToInvoice(action) {
    try {
        const api = getApi()
        const response = yield call(api.post, 'invoices/' + action.id + '/agree/', action.data)
        yield put({ type: "AGREE_TO_INVOICE_SUCCEEDED", data: response.data })
        yield put({ type: "LOAD_INVOICE_DETAIL_SUCCEEDED", data: response.data })
    }
    catch (e) {
        console.log('Error agreeing to invoice', e)
    }
}

function* showGraph(action) {
    try {
        const api = getApi()
        const response = yield call(api.get, 'dashboard/')
        yield put({ type: "SHOW_GRAPH_SUCCEEDED", data: response.data })
    }
    catch (e) {
        console.log('Error showing graph', e)
    }
}


function* InvoiceSaga() {
    yield takeLatest("LOAD_INVOICES", loadInvoiceList);
    yield takeLatest("CREATE_INVOICE", createInvoice);
    yield takeLatest("EDIT_INVOICE", editInvoice);
    yield takeLatest("LOAD_INVOICE_DETAIL", loadInvoiceDetail);
    yield takeLatest("ARCHIVE_INVOICE", archiveInvoice);
    yield takeLatest("UNARCHIVE_INVOICE", unarchiveInvoice);
    yield takeLatest("AGREE_TO_INVOICE", agreeToInvoice);
    yield takeLatest("SHOW_GRAPH", showGraph);
    yield takeLatest("LOAD_PAYMENT_LIST", loadPaymentList);
}

export default InvoiceSaga;