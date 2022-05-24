module.exports = [
    {
        method: '*',
        path: '/{any*}',
        handler: function (request, h) {
            return '404 Error! Page Not Found!';
        }
    }
];