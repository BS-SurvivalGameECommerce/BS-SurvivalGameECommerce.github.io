import contentWayPoint from 'contentWayPoint'

const install = function (Vue) {
    Vue.prototype.contentWayPoint = function () {
        console.log('test-plugin');
        contentWayPoint();
    }
}

export default { install }