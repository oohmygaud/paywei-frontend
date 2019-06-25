import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { getApi } from "../api";

function* loadInvoiceList(action) {
    try {
        const api = getApi()
        let url = 'invoices/?';
        console.log(action)
        const response = yield call(api.get, url)
        yield put({ type: "LOAD_INVOICES_SUCCEEDED", data: response.data })
    }
    catch (e) {
        console.log('Error loading invoices', e)
    }
}

function* createInvoice(action) {
    try {
        console.log('create invoice', action)
        const api = getApi()
        const response = yield call(api.post, 'invoices/', action.data)
        yield put({ type: "CREATE_INVOICE_SUCCEEDED", data: response.data })
        yield put(push('/invoices/'+response.data.id))
    }
    catch (e) {
        console.log('Error creating invoice', e)
    }
}

function* editInvoice(action) {
    try {
        const api = getApi()
        const response = yield call(api.put, 'invoices/'+action.id+'/', action.data)
        yield put({ type: "EDIT_INVOICE_SUCCEEDED", data: response.data })
        yield put(push('/invoices/'+response.data.id))
    }
    catch(e) {
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
        const response = yield call(api.post, 'invoices/'+action.id+'/archive/', action.data)
        yield put({ type: "ARCHIVE_INVOICE_SUCCEEDED", data: response.data })
        yield put({ type: "LOAD_INVOICE_DETAIL_SUCCEEDED", data: response.data })
        yield put(push('/invoices/'))
    }
    catch(e) {
        console.log('Error archiving invoice', e)
    }
}

function* unarchiveInvoice(action) {
    try {
        const api = getApi()
        const response = yield call(api.post, 'invoices/'+action.id+'/unarchive/', action.data)
        yield put({ type: "UNARCHIVE_INVOICE_SUCCEEDED", data: response.data })
        yield put({ type: "LOAD_INVOICE_DETAIL_SUCCEEDED", data: response.data })
        yield put(push('/invoices/'))
    }
    catch(e) {
        console.log('Error unarchiving invoice', e)
    }
}


function* InvoiceSaga() {
    yield takeLatest("LOAD_INVOICES", loadInvoiceList);
    yield takeLatest("CREATE_INVOICE", createInvoice);
    yield takeLatest("EDIT_INVOICE", editInvoice);
    yield takeLatest("LOAD_INVOICE_DETAIL", loadInvoiceDetail);
    yield takeLatest("ARCHIVE_INVOICE", archiveInvoice);
    yield takeLatest("UNARCHIVE_INVOICE", unarchiveInvoice);
}

export default InvoiceSaga;