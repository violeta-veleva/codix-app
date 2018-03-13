module.exports = {
    sendInternalErrorResponse: function (res,err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}