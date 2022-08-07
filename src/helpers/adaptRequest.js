function adaptRequest(req = {}) {
    return Object.freeze({
        queryParams: req.query,
        pathParams: req.params,
        body: req.body,
        method: req.method,
        path: req.path,
    })
}

module.exports = adaptRequest
