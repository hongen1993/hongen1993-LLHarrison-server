module.exports = (app) => {
    app.use("/auth", require("./auth.routes"))
    app.use('/property', require('./property.routes'))
}
